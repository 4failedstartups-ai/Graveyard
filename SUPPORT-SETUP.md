# Redesign + Buy Me a Beer: install and setup

## 1. Install (same folder as your graveyard.html)
Copy every file from this zip over your existing ones. NEW files: gazette.js, gazette.css, support.js, support.css, support.html, support-backend.gs.
Then redo the one step from before: copy your own `const GIDS={...}` line from your current site.js into the new site.js
(it only knows the Failed Startups tab: graveyard:"2022120840"). Your 4 graveyard.html edits stay as they were.

## 2. What changed on the home page ("The Gazette")
Tombstone-yard hero with flickering candles | dateline strip | Obituary of the day (rotates daily, "Light a candle", "Another obituary") |
Death toll by year (tap a bar to see the startups) | The autopsy: causes of death, tap to expand | Epitaph wall with shuffle |
Heat map teaser (links to graveyard.html#heatmap) | Explore cards | Buy me a beer + Top 5 | footer.
It reads these Sheet columns: Startup Name, Founded In, Shutdown Year, Failure Reason, Sector, Headquarters, Funding Stage,
Tagline / Description, Epitaph / Key Lesson. Several failure reasons in one cell: separate them with ; or , .
A "Buy me a beer" link is added to the default nav. If you use a Nav tab, add a row: Label = Buy me a beer, URL = support.html, Location = both.
Also available as its own page: support.html.

## 3. Buy Me a Beer: DEMO mode (works immediately)
With no setup, payments are SIMULATED in the visitor's browser and the board shows sample names. No money moves. Use it to preview.

## 4. Go live (real payments, automatic leaderboard)
1. Create a Razorpay account (KYC needed for live keys). Dashboard > Account & Settings > API Keys. Start with TEST keys.
2. Open the Google Sheet you want to store supporters in > Extensions > Apps Script. Paste support-backend.gs.
3. Project Settings > Script properties: add RZP_KEY_ID and RZP_KEY_SECRET. Keep the secret ONLY here, never in the website files.
4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Authorize, copy the /exec URL.
5. In your site's Settings tab add a row: Key = support_api_url, Value = that URL. (Optional: support_message to change the intro text.)
6. Make a test payment with Razorpay test mode (test UPI/card). A "Supporters" tab appears in the sheet and the board updates.
7. Swap in LIVE keys in Script properties and redeploy a new version.

How it stays safe: the browser never decides who paid. The script checks Razorpay's signature, asks Razorpay for the payment, confirms it is captured, for that order and for one of the 5 allowed amounts, then writes the row. A payment ID can only count once.
Leaderboard totals are per name (not case sensitive). Someone could type another supporter's name, which just adds to that name's total.

## 5. Not covered
Your graveyard.html (the list page) was not in the zip, so it is not redesigned. Send it and I'll give it the same Gazette look.
Test mode and live mode were not run against real Razorpay from here; I tested the full flow with a mocked API. Do step 6 before you announce it.
