# Control the site from Google Sheets (Supabase stays the backend)

You edit the Sheet. A script inside the Sheet copies each edit to Supabase within seconds. The website reads Supabase.

| Sheet tab | What it does |
|---|---|
| **Failed Startups** | The startup list. `Visible = Yes` shows it, `No` hides it, empty = a lead (not shown). |
| **Founders** | Founder directory and LinkedIn links. New names are added automatically. |
| **Settings, Nav, Pages, Team, Highlights** | All site text, menus, About/Terms/Privacy, team cards, home numbers. |
| **Missed Searches** | Searches that found nothing. Set `Status` to new / added / ignored. |
| **Submissions** | "Submit a postmortem" forms. Tick `Reviewed`. |
| **Contact** | Messages from the Contact page. `Status`: New / Replied / Done / Spam. You also get an email. |

## 1. Install the script
Sheet > Extensions > Apps Script.
- If you pasted the old single `SheetSync` file earlier, **delete that file first**.
- **Easy way:** add one script file, paste all of `SheetSync-all-in-one.gs`, save.
- **Modular way:** for every file in `apps-script/` (01 to 15) click **+ > Script**, name it like the file (without `.gs`) and paste it. One file per job, so you can change one thing without touching the rest. `15-BuyMeABeer` is only needed when you set up Razorpay.
- Reload the Sheet. The **Failed Startups** menu appears.

## 2. Connect (once)
1. **Failed Startups > 1. Connect to Supabase…** Paste the **service_role** key (Supabase > Project Settings > API Keys). It is kept privately inside the script, never in a cell or on GitHub.
2. If you see `permission denied for table`, run this once in Supabase > SQL Editor:
```sql
grant usage on schema public to service_role;
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
grant execute on all functions in schema public to service_role;
alter default privileges in schema public grant all on tables to service_role;
alter default privileges in schema public grant all on sequences to service_role;
```
3. **2. Create missing tabs**, then **Load everything FROM Supabase**, then **3. Turn auto-publish ON**.

## 3. Contact form (messages in the Sheet + email to you)
1. **Failed Startups > Contact form > Set notification email…** and enter the address that should get the emails.
2. **Deploy > New deployment** > gear icon > **Web app**. Execute as: **Me**. Who has access: **Anyone**. Deploy and allow the permissions (it asks to send email: yes). Copy the **Web app URL**.
3. In the **Settings** tab put that URL in the row `contact_form_url` (add the row if it is missing). Auto-publish sends it to the site.
4. **Contact form > Send a test message.** A row appears in the **Contact** tab and an email arrives (check Spam the first time).
5. Open your site's Contact page and send a real message to confirm.
Whenever you change the code later: Deploy > Manage deployments > pencil > Version: **New version** > Deploy. The URL does not change.
The same URL will serve Buy Me a Beer later: paste it into `support_api_url` too.

## 4. Daily use
- Edit any cell. The site updates in seconds. You see "Live: …" in the corner.
- **Duplicates** turn **yellow** in the Startup Name column (every copy). Only the first copy is on the site. Delete or rename the extra and the yellow disappears.
- **Competitors:** type `Zepto, Blinkit, Instamart` in Primary Competition. Each name becomes its own new row at the bottom (Visible empty, so not on the site). Names already in the tab are skipped. Menu > **Add competitors as new rows** does the whole tab at once.
- Hide a startup: set `Visible` to `No`. Deleting a row also removes it from the site (hidden, not erased, in Supabase).
- `Funding Amount` is free text ("$3.2M", "₹4 Cr"). The script converts it to a number. To override, add a `Funding USD` column.
- Optional extra columns on the startup tab: `Source URL`, `Funding USD`, `Notes (private)`.
- "Not available" as a Failure Reason is shown on the card but not counted in any statistic.

## Good to know
- The Sheet is the master: the next publish of a tab overwrites what is in Supabase for that tab.
- An empty tab is never published, and if the Sheet has less than half the startups the site has, nothing is hidden.
- Anyone who can open the script editor can read the service_role key. Share the Sheet carefully.
- Competitor rows are not checked for company age. Delete leads you do not want.
- The old `/login` console is switched off: `console-archive/README.md`.
