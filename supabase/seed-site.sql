-- Seed from the Sheet tabs. Run AFTER phaseC.sql, once only (nav/pages/team/highlights are plain inserts).
insert into public.site_settings(key,value) values
($q$site_name$q$,$q$Failed Startups$q$),
($q$tagline$q$,$q$India's startup ledger and news in one place$q$),
($q$hero_eyebrow$q$,$q$Vol. 01 — Live Feed$q$),
($q$hero_title$q$,$q$Know who is building$q$),
($q$hero_accent$q$,$q$India's next.$q$),
($q$hero_subtext$q$,$q$A living register of Indian startups and the news that moves them.$q$),
($q$cta1_label$q$,$q$Explore the Ledger$q$),
($q$cta1_url$q$,$q$ledger.html$q$),
($q$cta2_label$q$,$q$Read the news$q$),
($q$cta2_url$q$,$q$news.html$q$),
($q$about_title$q$,$q$About us$q$),
($q$about_intro$q$,$q$Why Useful Startups exists and what we are building.$q$),
($q$team_title$q$,$q$The team$q$),
($q$team_intro$q$,$q$The people behind the ledger.$q$),
($q$contact_title$q$,$q$Get in touch$q$),
($q$contact_intro$q$,$q$Questions corrections or partnerships — we read everything.$q$),
($q$terms_title$q$,$q$Terms of Use$q$),
($q$terms_intro$q$,$q$The rules for using this website.$q$),
($q$privacy_title$q$,$q$Privacy Policy$q$),
($q$privacy_intro$q$,$q$What we collect and why.$q$),
($q$legal_updated$q$,$q$8 October 2026$q$),
($q$contact_email$q$,$q$usefulstartups@gmail.com$q$),
($q$contact_phone$q$,$q$77 88 99 0390$q$),
($q$address$q$,$q$101, Aairah Terrazo,
Ground Floor,
17, Shankar Sheth Road,
Behind Meera Hospital,
Pune 411002$q$),
($q$linkedin$q$,$q$www.linkedin.com/in/useful-startups$q$),
($q$twitter$q$,$q$https://x.com/usefulstartups$q$),
($q$instagram$q$,$q$https://www.instagram.com/usefulstartups/$q$),
($q$youtube$q$,$q$https://www.youtube.com/@UsefulStartups$q$),
($q$contact_form_url$q$,$q$https://script.google.com/macros/s/AKfycbyz2D_uaFk-ZBxDaurPjNB_xpWLsu9smXjO1AQfnKf54x5gdComP5iAhgRAPFkMfjSE/exec$q$),
($q$logo_url$q$,$q$https://drive.google.com/file/d/1BoNPEyuN1lyERPxJgcF2--ZHbwWH09b1/view?usp=sharing$q$),
($q$footer_blurb$q$,$q$Tracking India's startups one row at a time.$q$),
($q$copyright$q$,$q$© 2026 Failed Startups. All rights reserved.$q$),
($q$facebook$q$,$q$https://www.facebook.com/profile.php?id=61595419463109$q$)
on conflict (key) do update set value=excluded.value;

insert into public.site_nav(label,url,location,sort_order,visible) values
($q$Home$q$,$q$index.html$q$,$q$header$q$,1,true),
($q$Ledger$q$,$q$ledger.html$q$,$q$both$q$,2,true),
($q$News$q$,$q$news.html$q$,$q$both$q$,3,true),
($q$About$q$,$q$about.html$q$,$q$both$q$,4,true),
($q$Team$q$,$q$team.html$q$,$q$both$q$,5,true),
($q$Contact$q$,$q$contact.html$q$,$q$both$q$,6,true),
($q$Terms$q$,$q$terms.html$q$,$q$footer$q$,7,true),
($q$Privacy$q$,$q$privacy.html$q$,$q$footer$q$,8,true);

insert into public.site_pages(page,sort_order,heading,body,link,visible) values
($q$home$q$,1,$q$The Active Ledger$q$,$q$Search, filter and compare startups by sector, tech and investors.$q$,$q$ledger.html$q$,true),
($q$home$q$,2,$q$The Runway$q$,$q$Fresh startup and business news refreshed every hour.$q$,$q$news.html$q$,true),
($q$home$q$,3,$q$Suggest a startup$q$,$q$Know one that belongs here? Send it in for review.$q$,$q$ledger.html$q$,true),
($q$about$q$,1,$q$Our mission$q$,$q$Our mission is to make India's startup ecosystem easier to discover, understand and trust.

Good startups are often hard to find, and useful information is scattered across hundreds of websites. We want anyone, from a first-time founder to a seasoned investor, to find the right startups, backers and stories in minutes.$q$,$q$$q$,true),
($q$terms$q$,1,$q$1. Acceptance of these terms$q$,$q$Replace with your lawyer-reviewed terms.$q$,$q$$q$,true),
($q$terms$q$,2,$q$2. What the site is$q$,$q$Useful Startups, operated by Oak Sprouts, is an information directory and news aggregator about startups, investors and the wider startup ecosystem in India. We may change, suspend or remove any part of the site at any time.$q$,$q$$q$,true),
($q$terms$q$,3,$q$3. No advice$q$,$q$Everything on this site is for general information only. It is not investment, financial, legal, tax or business advice, and a listing is not an endorsement or recommendation of any startup, investor or product. Do your own research and speak to a qualified professional before making any decision.$q$,$q$$q$,true),
($q$terms$q$,4,$q$4. Accuracy of information$q$,$q$Listing details such as funding, team size and founders come from public sources and from submissions. We try to keep them correct and current, but we do not guarantee that they are complete, accurate or up to date. Please verify important facts with the startup directly.$q$,$q$$q$,true),
($q$terms$q$,5,$q$5. News and third-party content$q$,$q$Our news feed shows headlines and short summaries from third-party publishers and links to the original articles. The articles and the websites they sit on belong to their respective owners. We do not control or endorse their content.$q$,$q$$q$,true),
($q$terms$q$,6,$q$6. What you submit$q$,$q$When you send a startup suggestion, a comment or a message, you confirm that the information is accurate to the best of your knowledge and that you have the right to share it. You allow us to review, edit, publish and display it on the site. We may decline or remove any submission at our discretion.$q$,$q$$q$,true),
($q$terms$q$,7,$q$7. Acceptable use$q$,$q$You agree not to:

- Post false, misleading, defamatory, unlawful or infringing content.
- Scrape, copy or republish large parts of the directory without our written permission.
- Attempt to disrupt, overload or gain unauthorised access to the site or its data.
- Use the site to send spam or to harass others.$q$,$q$$q$,true),
($q$terms$q$,8,$q$8. Intellectual property$q$,$q$The site design, code, original text and the compiled directory are owned by Oak Sprouts or its licensors. Company names, logos and trademarks shown in listings belong to their owners and appear for identification only. You may share links to our pages, but you may not reproduce the site's content for commercial use without permission.$q$,$q$$q$,true),
($q$terms$q$,9,$q$9. Corrections and removal requests$q$,$q$If you are a founder or publisher and want a listing corrected, updated or removed, email team.oaksprouts@gmail.com with the details and we will review it promptly.$q$,$q$$q$,true),
($q$terms$q$,10,$q$10. Disclaimer$q$,$q$The site is provided "as is" and "as available". To the fullest extent permitted by law, we make no warranties of any kind, express or implied, including about accuracy, availability or fitness for a particular purpose.$q$,$q$$q$,true),
($q$terms$q$,11,$q$11. Limitation of liability$q$,$q$To the fullest extent permitted by law, Oak Sprouts is not liable for any loss or damage arising from your use of, or reliance on, the site or its content, including any investment or business decision you make based on it.$q$,$q$$q$,true),
($q$terms$q$,12,$q$12. Governing law$q$,$q$These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Pune, Maharashtra.$q$,$q$$q$,true),
($q$terms$q$,13,$q$13. Changes to these terms$q$,$q$We may update these terms from time to time. The "Last updated" date shows the latest version. Continued use of the site after a change means you accept the new terms.$q$,$q$$q$,true),
($q$terms$q$,14,$q$14. Contact$q$,$q$Questions about these terms? Email team.oaksprouts@gmail.com.$q$,$q$$q$,true),
($q$privacy$q$,1,$q$1. Who we are$q$,$q$This website is operated by Oak Sprouts, Pune, Maharashtra, India ("we", "us"). You can reach us at team.oaksprouts@gmail.com. This policy explains what personal information we collect when you use the site and how we handle it.$q$,$q$$q$,true),
($q$privacy$q$,2,$q$2. What we collect$q$,$q$We only collect what we need:

- **Contact form:** your name, email address and message.
- **Startup suggestions:** your name, email, your relationship to the startup, and the startup details you submit.
- **Searches with no results:** the search term, without your name or any other identity, so we can see what listings are missing.
- **Comments and reactions:** if you post on the news feed, whatever you choose to write, along with a display name if you give one.
- **Technical data:** our hosting provider may log standard information such as your IP address, browser type and the pages you visit, for security and reliability.$q$,$q$$q$,true),
($q$privacy$q$,3,$q$3. How we use it$q$,$q$We use your information to reply to your messages, review startup suggestions, improve the directory and news feed, keep the site secure, and meet legal obligations. We do not sell your personal information and we do not send marketing emails unless you ask us to.$q$,$q$$q$,true),
($q$privacy$q$,4,$q$4. Services we rely on$q$,$q$To run the site we use trusted third parties, which may process data on our behalf:

- Google Sheets, Google Drive and Google Apps Script, which store the directory content and the messages and suggestions you send us.
- Netlify, which hosts the website.
- Supabase, which stores news articles and community activity.
- Google Fonts, which delivers the typefaces we use.

These providers have their own privacy policies and may process data outside India.$q$,$q$$q$,true),
($q$privacy$q$,5,$q$5. Cookies and local storage$q$,$q$We do not use advertising or tracking cookies. Your browser may save small amounts of data on your device, such as a cached copy of site content so pages load faster. You can clear this at any time in your browser settings.$q$,$q$$q$,true),
($q$privacy$q$,6,$q$6. Sharing your information$q$,$q$We share personal information only with the service providers above, when the law requires it, or to protect our rights and the safety of others. Anything you post publicly, such as a comment, can be seen by other visitors.$q$,$q$$q$,true),
($q$privacy$q$,7,$q$7. How long we keep it and how we protect it$q$,$q$We keep messages and suggestions only as long as needed to respond and to keep our records accurate. We use reasonable safeguards, such as access-controlled sheets and encrypted connections, but no system is completely secure and we cannot guarantee absolute security.$q$,$q$$q$,true),
($q$privacy$q$,8,$q$8. Your rights$q$,$q$Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may ask us to confirm what personal data we hold about you, correct it, or delete it, and you may withdraw consent you have given. Email us at team.oaksprouts@gmail.com and we will respond within a reasonable time.$q$,$q$$q$,true),
($q$privacy$q$,9,$q$9. Children$q$,$q$This site is not intended for children under 18, and we do not knowingly collect their personal information. If you think a child has sent us information, please contact us and we will delete it.$q$,$q$$q$,true),
($q$privacy$q$,10,$q$10. Links to other websites$q$,$q$Our news feed and directory link to external websites. We are not responsible for their content or privacy practices.$q$,$q$$q$,true),
($q$privacy$q$,11,$q$11. Changes to this policy$q$,$q$We may update this policy from time to time. The "Last updated" date at the top shows when it last changed. Continued use of the site after an update means you accept the revised policy.$q$,$q$$q$,true),
($q$privacy$q$,12,$q$12. Contact us$q$,$q$Questions or requests about your privacy? Email team.oaksprouts@gmail.com or write to Oak Sprouts, 101, Aairah Terrazo, 17, Shankar Sheth Road, Pune 411002.$q$,$q$$q$,true);

insert into public.site_team(name,role,bio,photo_url,linkedin,sort_order,visible) values
($q$Amit Hapse$q$,$q$Founder$q$,$q$Amit has been very active in the field of investment advisory and has rich and varied experience in the fields of Investments, Tax Planning and Corporate Compliances.He is a trusted professional focused on the financial well being of clients.$q$,$q$https://drive.google.com/file/d/10Fd17v3B5BQV7dJXnIZJXo3GjX_HFVDp/view?usp=drive_link$q$,$q$https://www.linkedin.com/in/amithapse/$q$,1,true),
($q$Chaitanya Dhodapkar$q$,$q$Co - Founder$q$,$q$Chaitanya has over 5+ years of experience in the field of accountancy, taxation, auditing for start-ups, across various sectors. He strives to apply his learning to serve early–stage startups grow and create value for the stakeholders.
During his time off, you will find him reading a book or tuning into a podcast.$q$,$q$https://drive.google.com/file/d/1DlF_KW-L5mJHuiG7WZ9Eh9qrC9NB1EyN/view?usp=drive_link$q$,$q$https://www.linkedin.com/in/chaitanya-d-os/$q$,2,true),
($q$Varun Sharma$q$,$q$Co - Founder$q$,$q$Varun works as a Project Analyst, supporting project planning, research, data analysis, Execution and performance monitoring. He tracks project progress, prepares reports, and provides data-driven insights to improve efficiency and support decision-making$q$,$q$https://drive.google.com/file/d/16eQ4J8wJVKsp-6RQD8YeKR9DSnCqvfVP/view?usp=drive_link$q$,$q$https://www.linkedin.com/in/7905-varunsharma/$q$,3,true);

insert into public.site_highlights(value,label,sort_order,visible) values
($q$auto:startups$q$,$q$Startups tracked$q$,1,false),
($q$Hourly$q$,$q$News refresh$q$,2,true),
($q$100%$q$,$q$Free to browse$q$,3,true);
