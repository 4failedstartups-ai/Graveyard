# Graveyard update: install steps

Put every file in this zip into the SAME folder as your graveyard.html (replace the ones that already exist).

## 1. Keep your sheet numbers (do this first)
Open your CURRENT site.js, copy its line that starts with `const GIDS={` and paste it over the same line in the NEW site.js.
(The new file only knows the Failed Startups tab: graveyard:"2022120840".)

## 2. Four edits in graveyard.html
a) In <head>, right under the <meta name="viewport" ...> line, add:
   <script src="preloader.js"></script>
b) Search for:  ALL = results.data.filter
   Replace that whole line with:
   ALL = results.data.filter(r => clean(r['Startup Name']) && !/^(no|false|0|hide|hidden)$/i.test((r['Visible'] || '').trim()));
c) At the very bottom, just above </body>, make sure these two lines exist, in this order:
   <script src="graveyard-extras.js" defer></script>
   <script src="site.js" defer></script>
d) In the .controls CSS rule, `top:` must be:  top: var(--ul-nav-h, 0px);

## 3. Google Sheet
- Failed Startups tab: add a column headed exactly  Visible  (Yes / No dropdown). Blank = shown, No = hidden.
- Check the header spelled "Funding Stage" (capital S).
- Settings tab: you can add  logo_url  (default is the new tombstone mark), facebook, discord, blog, whatsapp keys as on the other site.
- Nav tab: the Group column puts links in the footer columns (Company / Directories / Resources).

## 4. What you get
Heat map of India (failed startups by state, top states, top cities) | Visible switch | founders and cities in Proper Case |
website favicon shown when a startup has no logo | new look for the list page | tombstone logo, favicons, loading screen |
slow constant-speed tape on the home page | footer icon alignment fix.
Replace the tombstone logo any time by overwriting gy-mark.png, gy-logo-full-light.png and the favicon/icon files with your own.
