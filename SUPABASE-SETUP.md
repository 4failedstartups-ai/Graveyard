# Supabase setup (do these in order)

Your project: `https://uveospgmehgarerlquav.supabase.co` (already wired into `data.js` and `login.html`).

1. **Supabase → SQL Editor → New query.** Paste `supabase/schema.sql`, Run. (Skip if you already ran it.)
2. New query → paste `supabase/patch-01.sql`, Run.
3. New query → paste `supabase/seed.sql`, Run. This loads 103 published startups, 232 competitor leads and 196 founders. Safe to run twice.
4. **Authentication → Users → Add user** → your email and a strong password, tick "Auto confirm".
5. **Authentication → Sign In / Providers → turn OFF "Allow new users to sign up".**
6. New query, with your email:
   `insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';`
7. Upload the changed files to GitHub, wait for the deploy, open `https://YOUR-SITE/login`.
8. Keep-alive: `.github/workflows/keepalive.yml` pings the database every 3 days (GitHub → Actions must be enabled).

Never share the `service_role` key or the database password. The anon key in the code is meant to be public: it can only read published startups.
The login page is not linked anywhere and is marked noindex, but security comes from the password plus the admin check in the database, not from the hidden address.
