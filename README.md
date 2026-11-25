# Failed Startups

Static website (plain HTML, CSS and JavaScript) with Supabase as the database. The Google Sheet is the control panel.
Deploy the whole repo as it is (Cloudflare Workers static assets). The page addresses (`/graveyard.html`, `/about.html` …) never change.

```
index.html, graveyard.html, about.html, team.html,
contact.html, support.html, terms.html, privacy.html   the website pages
favicon.ico                                            browsers look for this at the root
assets/
  css/   site, gazette, support, graveyard-theme       styles
  js/    site, data, gazette, support, graveyard-extras, preloader
  img/   logos, favicons, app icons, social image
  site.webmanifest
sheet-control/    Google Sheet control panel: SETUP.md, apps-script/ (one file per job), all-in-one copy
supabase/         database setup SQL (schema, patches, default site text, 103-startup seed)
console-archive/  the old /login admin console, switched off (files kept)
docs/             setup notes; docs/old/ = outdated notes kept for reference
tools/            helper scripts (seed builder, Apps Script all-in-one builder)
.github/          keep-alive job so the free database never pauses
.assetsignore     keeps non-website folders off the public site
```

- Edit content in the Google Sheet: see `sheet-control/SETUP.md`.
- Add `?debug` to any page address to see which data sources loaded.
- Buy Me a Beer: `docs/SUPPORT-SETUP.md` (Razorpay not set up yet).
