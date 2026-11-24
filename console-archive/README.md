# Admin console: switched OFF (files kept)

The Supabase admin console is turned off. These three files are the original pages, unchanged:

- `login.html.txt`: the full console (startups, Settings, Navigation, Pages, Team, Highlights, Missed searches)
- `site-console.html.txt` and `site-editor.html.txt`: the earlier separate site-editing pages

They end in `.txt` on purpose. Browsers show a `.txt` file as plain text and never run it, so there is no page
at `/login` and nothing here can be opened as a working console, yet every line is still in GitHub.

The site is now controlled from the Google Sheet (see `sheet-control/SETUP.md`).
The database tables, security rules and your admin user in Supabase were not touched.

## To switch the console back ON
1. Copy `login.html.txt` to the repo root and rename it `login.html` (drop the `.txt`). Same for the other two if wanted.
2. Commit. `https://YOUR-SITE/login` works again with your existing email and password.
3. Do not run both at once for the same data: the Sheet publishes over the console's edits.
