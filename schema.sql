-- =====================================================================
-- The Startup Graveyard: Supabase schema
-- Paste this whole file into Supabase > SQL Editor > New query > Run.
-- Safe to run once on a fresh project.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- who is an admin ----------
-- After you create your login user (Authentication > Users > Add user),
-- run the line at the bottom of this file to make that user the admin.
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- startups ----------
-- status: published = shown on the website (this replaces the old "Visible = Yes")
--         pending   = waiting for your review (AI additions, visitor submissions)
--         hidden    = kept but not shown
create table if not exists public.startups (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  name_key         text generated always as (lower(regexp_replace(name, '[^a-zA-Z0-9]+', '', 'g'))) stored,
  tagline          text,
  headquarters     text,
  founded_year     int,
  shutdown_year    int,
  funding_amount   text,
  funding_stage    text,
  business_model   text,
  founders         text[] not null default '{}',
  sector           text,
  team_size        text,
  competitors      text,
  key_investors    text,
  user_base        text,
  logo_url         text,
  website_url      text,
  status_text      text,                 -- the old "Status" column (e.g. Failed)
  tags             text[] not null default '{}',
  underlying_tech  text,
  failure_reason   text,
  epitaph          text,
  postmortem_url   text,
  source_url       text,                 -- where a fact came from (required for AI additions)
  status           text not null default 'pending' check (status in ('published','pending','hidden')),
  added_by         text not null default 'manual',   -- manual | import | ai | submission | competitor
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
-- one row per company, ignoring case, spaces and punctuation ("Zilingo", "zilingo ", "Zi-lingo")
create unique index if not exists startups_name_key_uidx on public.startups (name_key);
create index if not exists startups_status_idx on public.startups (status);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists startups_touch on public.startups;
create trigger startups_touch before update on public.startups for each row execute function public.touch_updated_at();

-- ---------- founders (optional directory with LinkedIn links) ----------
create table if not exists public.founders (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  linkedin_url text,
  created_at timestamptz not null default now()
);

-- ---------- visitor submissions ("Submit a postmortem") ----------
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  payload jsonb not null,
  created_at timestamptz not null default now(),
  reviewed boolean not null default false
);

-- ---------- Buy Me a Beer supporters (written only by the payment function) ----------
create table if not exists public.supporters (
  id uuid primary key default gen_random_uuid(),
  payment_id text not null unique,
  order_id text not null,
  name text not null,
  amount int not null check (amount >= 10 and amount <= 100000),
  created_at timestamptz not null default now()
);

-- ---------- site text that used to live in the Settings / Nav / Pages / Team tabs ----------
create table if not exists public.site_settings (key text primary key, value text);
create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  page text not null, sort int not null default 0, heading text, body text, link text,
  visible boolean not null default true
);
create table if not exists public.site_nav (
  id uuid primary key default gen_random_uuid(),
  label text not null, url text not null, location text not null default 'both', grp text,
  sort int not null default 0, visible boolean not null default true
);
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null, role text, bio text, photo_url text, linkedin_url text,
  sort int not null default 0, visible boolean not null default true
);

-- ---------- audit trail for the dashboard ----------
create table if not exists public.activity_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor text, action text, detail jsonb
);

-- =====================================================================
-- SECURITY: Row Level Security. The public website key can ONLY read published content.
-- Only the admin account can write. Nobody but the server can touch supporters.
-- =====================================================================
alter table public.admins          enable row level security;
alter table public.startups        enable row level security;
alter table public.founders        enable row level security;
alter table public.submissions     enable row level security;
alter table public.supporters      enable row level security;
alter table public.site_settings   enable row level security;
alter table public.site_pages      enable row level security;
alter table public.site_nav        enable row level security;
alter table public.team_members    enable row level security;
alter table public.activity_log    enable row level security;

-- public (website) reads
create policy "public reads published startups" on public.startups     for select using (status = 'published');
create policy "public reads founders"           on public.founders     for select using (true);
create policy "public reads settings"           on public.site_settings for select using (true);
create policy "public reads visible pages"      on public.site_pages   for select using (visible);
create policy "public reads visible nav"        on public.site_nav     for select using (visible);
create policy "public reads visible team"       on public.team_members for select using (visible);
-- visitors may drop a submission, nothing else
create policy "public can submit"               on public.submissions  for insert with check (jsonb_typeof(payload) = 'object' and pg_column_size(payload) < 20000);

-- admin: full control
create policy "admin all startups"     on public.startups      for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all founders"     on public.founders      for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all submissions"  on public.submissions   for all using (public.is_admin()) with check (public.is_admin());
create policy "admin reads supporters" on public.supporters    for select using (public.is_admin());
create policy "admin all settings"     on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all pages"        on public.site_pages    for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all nav"          on public.site_nav      for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all team"         on public.team_members  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin all log"          on public.activity_log  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin sees admins"      on public.admins        for select using (public.is_admin());

-- Public leaderboard: only names + totals, never payment ids. Readable by anyone.
create or replace view public.top_supporters with (security_invoker = false) as
  select min(name) as name, sum(amount)::int as total, count(*)::int as rounds
  from public.supporters group by lower(name) order by total desc limit 5;
grant select on public.top_supporters to anon, authenticated;

-- =====================================================================
-- AFTER you create your login user (Authentication > Users > Add user),
-- replace the email below with yours and run this ONE line:
--
--   insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';
-- =====================================================================
