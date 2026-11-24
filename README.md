# Failed Startups

Static site (plain HTML/CSS/JS) backed by Supabase. Deploy the whole folder as-is (Cloudflare Workers static assets).

- Startups, site text (Settings, Navigation, Pages, Team, Highlights), submissions and missed searches all live in Supabase (the website's backend).
- **The Google Sheet is the control panel.** An Apps Script copies Sheet edits to Supabase. Setup: `sheet-control/SETUP.md`.
- The old `/login` admin console is switched OFF. Its files are kept in `console-archive/` (see the README there to turn it back on).
- `graveyard.html` is the startup list page. The file name stays the same so existing links keep working.
- Buy Me a Beer: see `SUPPORT-SETUP.md`.
- Add `?debug` to any page address to see which data sources loaded.
- `.github/workflows/keepalive.yml` pings the database so the free Supabase plan never pauses.
