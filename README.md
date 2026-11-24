# Failed Startups

Static site (plain HTML/CSS/JS) backed by Supabase. Deploy the whole folder as-is (Cloudflare Workers static assets).

- Startups, site text (Settings, Navigation, Pages, Team, Highlights), submissions and missed searches all live in Supabase.
- `login.html` is the hidden admin console (not linked anywhere). Setup: see `PHASE-C-SETUP.md` and `SUPABASE-SETUP.md`.
- `graveyard.html` is the startup list page. The file name stays the same so existing links keep working.
- Buy Me a Beer: see `SUPPORT-SETUP.md`.
- Add `?debug` to any page address to see which data sources loaded.
- `.github/workflows/keepalive.yml` pings the database so the free Supabase plan never pauses.
