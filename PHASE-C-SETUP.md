# Phase C setup: site editor + missed-search log

What you get: editable Settings, Nav, Pages, Team and Highlights in a hidden admin page, plus a list of searches that found nothing (like "pet toys").
Time needed: about 10 minutes. Do the steps in order.

---

## Step 1. Run the SQL in Supabase

Supabase → **SQL Editor → New query**.

1. Paste the contents of `supabase/phaseC.sql` → **Run**. It should say "Success".
2. New query → paste `supabase/seed-site.sql` → **Run**. It is safe to run again: it only fills empty tables.

Both files are already in your repo's `supabase/` folder.

Check it worked: **Table Editor** should now show `site_settings`, `site_nav`, `site_pages`, `site_team`, `site_highlights` and `search_misses`. `site_settings` should have about 33 rows.

If step 1 fails with an error mentioning `is_admin`, tell me the exact error text.

---

## Step 2. The editor page is already in the repo

`site-console.html` is included with your key already filled in. Open `https://YOUR-SITE/site-console.html` and sign in with your admin email and password. Rename the file if you want a less guessable address. Do not link to it from any page.

Tabs: Settings, Navigation, Pages, Team, Highlights, Missed searches.

---

## Step 3. Missed searches (already done in this version)

`graveyard.html` now sends searches that find nothing to Supabase instead of the old Google Apps Script. Nothing to edit.

---

## Step 4. Test it (2 minutes)

1. Open the Graveyard page and search for something you know does not exist, such as `pet toys`. Wait 2 seconds.
2. Open the editor → **Missed searches**. "pet toys" should appear with a count of 1.
3. Edit any Settings value in the editor and click **Save all settings**. It should say "Settings saved".

If step 2 shows nothing: open the browser console on the Graveyard page (F12 → Network) and look for a failed request to `log_search_miss`. Send me the status code.

---

## Notes

- The public site does not read Settings, Nav, Pages, Team or Highlights from Supabase yet. It still reads them from the Google Sheet. Editing them in the editor will not change the live site until the next step, where I switch the site over. Until then, keep editing the Sheet for those.
- Missed searches are the only part that is live right away.
- Missed searches store only the search text and a count. No names, IPs or accounts.
- Team photo and logo links are Google Drive "view" links. The editor previews them, but the public site may need the direct form later.
