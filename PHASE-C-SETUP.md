> **Console switched off.** The `/login` console described below is archived in `console-archive/` and the Google Sheet is the control panel now (`sheet-control/SETUP.md`). Everything below is kept for reference and for turning the console back on.

# Update: Failed Startups name, logo, search, console-controlled site text

## 1. Supabase (SQL Editor, in this order)

1. Paste `supabase/phaseC.sql` and Run. Safe to run again.
2. Paste `supabase/seed-site.sql` and Run.
   **This replaces** Settings, Navigation, Pages, Team and Highlights with the real defaults (Failed Startups text, the default home numbers, new Terms and Privacy). The dummy values from the Useful Startups sheet are removed. Run it once, then edit in the console. Running it again resets those tabs to the defaults.

Check in Table Editor: `site_settings` about 40 rows, `site_nav` 9, `site_pages` 33, `site_team` 3, `site_highlights` 3.

## 2. GitHub

Replace every file in the repo with the files from this zip (keep the `.git` folder). Then wait for the deploy and hard refresh (Ctrl+Shift+R). The loading screen and icons are cached, so on a phone you may need to clear the site data once.

## 3. How editing works now

Open `https://YOUR-SITE/login`, sign in, and use the tabs **Settings, Navigation, Pages, Team, Highlights**. Save, then reload any page of the site: the change is there. If the database cannot be reached, the site shows the last copy saved in the visitor's browser, then the built-in defaults.

Highlights: `auto:startups` is the live startup count and `auto:avglife` the live average lifespan. Keep those if you want the numbers to update on their own.

## 4. What to check after deploying

- Home page: the search box under the headline. Try a startup name, a sector (`fintech`), a page (`terms`) and nonsense (`pet toys`).
- Graveyard page: the search box is at the top. `graveyard.html?q=fintech` opens with it filled in.
- The dark announcement bar at the top shows its text on both pages.
- Console, Missed searches tab: `pet toys` appears after a search that finds nothing.

## 5. Things to review

- Settings, Contact: email, phone and address were taken from your Graveyard Settings tab. Social links are blank (the ones in the sheet were Useful Startups accounts). Add yours in the console.
- Terms and Privacy are a careful first draft written for this site. Terms use `team.oaksprouts@gmail.com` for corrections and privacy requests; change it in Pages if you prefer another inbox. Have a lawyer review both before relying on them.
- File names such as `graveyard.html` and the repo name are unchanged on purpose, so no links break.
