-- Run AFTER schema.sql and BEFORE seed.sql. Safe to run more than once.
alter table public.startups add column if not exists funding_usd numeric;     -- clean number, replaces guessing from text
alter table public.startups drop constraint if exists startups_status_check;
alter table public.startups add constraint startups_status_check
  check (status in ('published','pending','hidden','lead'));                 -- lead = a competitor name waiting to be researched
alter table public.startups add column if not exists notes text;               -- private admin notes, never shown publicly
create table if not exists public.app_settings (key text primary key, value text);   -- private dashboard settings
alter table public.app_settings enable row level security;
drop policy if exists "admin all app_settings" on public.app_settings;
create policy "admin all app_settings" on public.app_settings for all using (public.is_admin()) with check (public.is_admin());
insert into public.app_settings (key,value) values ('max_age_years','10') on conflict (key) do nothing;
-- Keep-alive target: anyone can read this one harmless row (stops the free project from pausing).
insert into public.site_settings (key,value) values ('keepalive','ok') on conflict (key) do nothing;
