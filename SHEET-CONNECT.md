# Connect your Google Sheet (fixes "no information is getting fetched")

## Why the site shows placeholders
The website reads its text from tabs in your Google Sheet. Right now only the **Failed Startups** tab is connected
(`GIDS` in site.js has only `graveyard:"2022120840"`). The other five tabs are blank in `GIDS`, so the site falls back to
built-in defaults. That is why the Team page shows "Founder Name" and the footer had no real email.
Nothing is broken in the code. The tabs just have not been created and connected yet.

## Step 1: add the 5 tabs (about 5 minutes)
In your Google Sheet, for each file in the `sheet-templates` folder: File > Import > Upload > pick the file >
**Insert new sheet(s)**. Then rename each new tab exactly:
| File | Tab name |
|---|---|
| settings.csv | Settings |
| nav.csv | Nav |
| pages.csv | Pages |
| team.csv | Team |
| highlights.csv | Highlights |
Edit the cells to your real content (at least `contact_email` in Settings and your row in Team).

## Step 2: publish
File > Share > **Publish to web** > choose **Entire document** > Web page or CSV > Publish.
(If you published only the "Failed Startups" tab before, the other tabs stay private and cannot load.)
Your published link should still start with the `2PACX-1vSnzz7...` id that is already in site.js.

## Step 3: copy each tab's gid into site.js
Open each tab and look at the address bar: `...edit#gid=123456789`. The number after `gid=` is that tab's gid.
In site.js find the line starting `const GIDS={` and fill the numbers in, keeping the quotes:
`const GIDS={graveyard:"2022120840",settings:"111",nav:"222",pages:"333",team:"444",highlights:"555"};`
Commit and deploy.

## Check it worked
Open any page of your site with `?debug` on the end, for example `yoursite/team?debug`.
A small box lists every tab as **live (N rows)** or tells you what failed.
Changes in the Sheet show up on the site after Google refreshes the published copy (usually within about 5 minutes).
