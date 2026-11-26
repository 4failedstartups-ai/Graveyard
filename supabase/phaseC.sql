-- Phase C: site-editing tables + missed-search log. Safe to run more than once.
-- Needs public.is_admin() (from schema.sql). Adapts the site_* tables schema.sql already created.
do $$ begin
  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='site_nav'   and column_name='sort') then alter table public.site_nav   rename column sort to sort_order; end if;
  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='site_pages' and column_name='sort') then alter table public.site_pages rename column sort to sort_order; end if;
end $$;
create table if not exists public.site_settings(key text primary key, value text not null default '', updated_at timestamptz default now());
alter table public.site_settings add column if not exists updated_at timestamptz default now();
create table if not exists public.site_nav(id bigint generated always as identity primary key, label text not null, url text not null, location text not null default 'both' check (location in ('header','footer','both')), grp text, sort_order int not null default 0, visible boolean not null default true);
alter table public.site_nav add column if not exists grp text;
create table if not exists public.site_pages(id bigint generated always as identity primary key, page text not null, sort_order int not null default 0, heading text not null, body text not null default '', link text default '', visible boolean not null default true);
create table if not exists public.site_team(id bigint generated always as identity primary key, name text not null, role text default '', bio text default '', photo_url text default '', linkedin text default '', sort_order int not null default 0, visible boolean not null default true);
create table if not exists public.site_highlights(id bigint generated always as identity primary key, value text not null, label text not null, sort_order int not null default 0, visible boolean not null default true);

-- Missed searches: one row per distinct term, hit counter, no personal data stored.
create table if not exists public.search_misses(
  term text primary key check (char_length(term) between 2 and 80),
  hits int not null default 1,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','added','ignored'))
);

alter table public.site_settings enable row level security;
alter table public.site_nav enable row level security;
alter table public.site_pages enable row level security;
alter table public.site_team enable row level security;
alter table public.site_highlights enable row level security;
alter table public.search_misses enable row level security;

do $$ declare t text; begin
  foreach t in array array['site_settings','site_nav','site_pages','site_team','site_highlights'] loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (%s)', t, case when t='site_settings' then 'true' else 'visible' end);
    execute format('create policy "admin write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "admin all misses" on public.search_misses;
create policy "admin all misses" on public.search_misses for all using (public.is_admin()) with check (public.is_admin());

-- Visitors cannot read or write the table directly; they call this function only.
create or replace function public.log_search_miss(p_term text) returns void
language plpgsql security definer set search_path=public as $$
declare t text := lower(regexp_replace(trim(p_term), '\s+', ' ', 'g'));
begin
  if char_length(t) < 2 or char_length(t) > 80 then return; end if;
  insert into public.search_misses(term) values (t)
  on conflict (term) do update set hits = search_misses.hits + 1, last_seen = now();
end $$;
revoke all on function public.log_search_miss(text) from public;
grant execute on function public.log_search_miss(text) to anon, authenticated;

grant select on public.site_settings, public.site_nav, public.site_pages, public.site_team, public.site_highlights to anon, authenticated;
grant insert, update, delete on public.site_settings, public.site_nav, public.site_pages, public.site_team, public.site_highlights, public.search_misses to authenticated;
grant select on public.search_misses to authenticated;

-- schema.sql also made an empty, unused team_members table; remove it only if nothing is in it.
do $$ declare n bigint; begin
  if to_regclass('public.team_members') is not null then
    execute 'select count(*) from public.team_members' into n;
    if n = 0 then execute 'drop table public.team_members'; end if;
  end if;
end $$;
