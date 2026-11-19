# The Startup Graveyard

Static site (plain HTML/CSS/JS) backed by Supabase. Deploy the whole folder as-is (Cloudflare Workers static assets).

```
/                  pages the browser opens: index, graveyard, about, team, contact, support, terms, privacy,
                   login (hidden admin console, not linked anywhere), favicon.ico, site.webmanifest
assets/css/        site, gazette, support, graveyard-theme stylesheets
assets/js/         site.js (shell), data.js (Supabase reads), preloader, gazette, support, graveyard-extras
assets/img/        logos, favicons, app icons, og-image
backend/           support-backend.gs  (Buy Me a Beer, Google Apps Script — still outside Supabase)
supabase/          SQL, run in the order given in docs/SUPABASE-SETUP.md
docs/              setup notes
tools/             make_seed.py (one-time CSV -> seed.sql helper)
.github/workflows/ keepalive.yml (pings the database so the free plan never pauses)
```

Add `?debug` to any page address to see which data sources loaded.
