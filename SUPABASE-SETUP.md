# Moving from Google Sheets to Supabase (step 1: create the database)

Nothing on your live site changes until we switch it over. These steps only create the empty database.
Takes about 10 minutes. Everything here is free.

## 1. Create the project
1. Go to https://supabase.com and sign up (GitHub login is easiest).
2. New project. Name: `graveyard`. Region: **Mumbai (ap-south-1)** if offered, otherwise Singapore.
3. Set a database password and SAVE it in a password manager. You rarely need it, but you cannot see it again.
4. Wait about 2 minutes while it is created.

## 2. Create the tables
1. Left menu: **SQL Editor** > **New query**.
2. Open `supabase/schema.sql` from this folder, copy everything, paste, click **Run**.
3. You should see "Success. No rows returned". If you see a red error, copy it to me.

## 3. Create your admin login
1. Left menu: **Authentication** > **Users** > **Add user** > **Create new user**.
2. Enter your email and a strong password. Tick **Auto Confirm User**.
3. Left menu: **Authentication** > **Sign In / Providers** > Email: turn **OFF** "Allow new users to sign up".
   (This stops anyone else creating an account. You are the only user.)
4. Go back to **SQL Editor** and run this ONE line, with your own email:
   `insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';`

## 4. Send me three things (none are secret)
Left menu: **Project Settings** > **API**. Copy:
- **Project URL** (looks like `https://abcd1234.supabase.co`)
- **anon public** key (a long string starting `eyJ...`). It is designed to be public and can only read published startups.
- Do NOT send the `service_role` key or your database password. Never put those in the website.

Also send:
- Your Failed Startups tab as a file: Google Sheets > File > Download > **CSV** (current sheet).
- Your Apps Script code (Extensions > Apps Script > copy each file), so I can port the founder splitting, competitor discovery and the 10-year rule exactly.
- Any other tab you still use (Founders list, form responses).

## 5. What I build next (after you send those)
1. Import your ~100 startups (duplicates merged, founders split).
2. Make the website read from Supabase.
3. The hidden `/login` and dashboard.
4. AI import (paste flow first, then the daily job).
5. Move the Buy Me a Beer leaderboard to Supabase.

## Keep it awake
Free Supabase projects pause after about a week without activity. I will add a free daily ping so the site never goes blank.
