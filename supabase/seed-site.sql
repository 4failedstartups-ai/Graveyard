-- Failed Startups: default site text. Run AFTER phaseC.sql.

-- This REPLACES the contents of Settings (listed keys), Navigation, Pages, Team and Highlights with the defaults below.

-- Re-running it resets those tabs to these defaults, so run it once, then edit in the console.

insert into public.site_settings(key,value) values
($q$site_name$q$,$q$Failed Startups$q$),
($q$tagline$q$,$q$A record of the Indian startups that didn't make it.$q$),
($q$hero_eyebrow$q$,$q$Vol. 01 — Postmortems$q$),
($q$hero_title$q$,$q$Learn from the startups$q$),
($q$hero_accent$q$,$q$that didn't make it.$q$),
($q$hero_subtext$q$,$q$What they raised, how long they lasted and why they folded. The point isn't the failure, it's the pattern underneath it.$q$),
($q$cta1_label$q$,$q$Browse failed startups$q$),
($q$cta1_url$q$,$q$graveyard.html$q$),
($q$cta2_label$q$,$q$Share a story$q$),
($q$cta2_url$q$,$q$contact.html$q$),
($q$about_title$q$,$q$About us$q$),
($q$about_intro$q$,$q$Why Failed Startups exists and what we hope it teaches.$q$),
($q$team_title$q$,$q$The team$q$),
($q$team_intro$q$,$q$The people behind Failed Startups.$q$),
($q$contact_title$q$,$q$Get in touch$q$),
($q$contact_intro$q$,$q$A correction, a story or a postmortem to share — we read everything.$q$),
($q$terms_title$q$,$q$Terms of Use$q$),
($q$terms_intro$q$,$q$The rules for using this website.$q$),
($q$privacy_title$q$,$q$Privacy Policy$q$),
($q$privacy_intro$q$,$q$What we collect, why we collect it and how we protect it.$q$),
($q$legal_updated$q$,$q$23 November 2026$q$),
($q$contact_email$q$,$q$usefulstartups@gmail.com$q$),
($q$contact_phone$q$,$q$77 88 99 0390$q$),
($q$address$q$,$q$101, Aairah Terrazo,
Ground Floor,
17, Shankar Sheth Road,
Behind Meera Hospital,
Pune 411002$q$),
($q$linkedin$q$,$q$$q$),
($q$twitter$q$,$q$$q$),
($q$instagram$q$,$q$$q$),
($q$facebook$q$,$q$$q$),
($q$youtube$q$,$q$$q$),
($q$discord$q$,$q$$q$),
($q$blog$q$,$q$$q$),
($q$whatsapp$q$,$q$$q$),
($q$contact_form_url$q$,$q$$q$),
($q$logo_url$q$,$q$gy-mark.png$q$),
($q$support_title$q$,$q$Buy me a beer$q$),
($q$support_intro$q$,$q$Good things take support. Raise a glass to the people keeping Failed Startups open.$q$),
($q$footer_blurb$q$,$q$A record of the startups that didn't make it, and the lessons they left behind.$q$),
($q$copyright$q$,$q$© 2026 Failed Startups. All rights reserved.$q$)
on conflict (key) do update set value=excluded.value, updated_at=now();

delete from public.site_nav;
insert into public.site_nav(label,url,location,grp,sort_order,visible) values
($q$Home$q$,$q$index.html$q$,$q$header$q$,$q$$q$,1,true),
($q$Startups$q$,$q$graveyard.html$q$,$q$both$q$,$q$Directories$q$,2,true),
($q$About$q$,$q$about.html$q$,$q$both$q$,$q$Company$q$,3,true),
($q$Team$q$,$q$team.html$q$,$q$both$q$,$q$Company$q$,4,true),
($q$Contact$q$,$q$contact.html$q$,$q$both$q$,$q$Company$q$,5,true),
($q$Buy me a beer$q$,$q$support.html$q$,$q$both$q$,$q$Company$q$,5.5,true),
($q$Useful Startups ↗$q$,$q$https://usefulstartups.com/$q$,$q$footer$q$,$q$Resources$q$,6,true),
($q$Terms$q$,$q$terms.html$q$,$q$footer$q$,$q$Resources$q$,6.5,true),
($q$Privacy$q$,$q$privacy.html$q$,$q$footer$q$,$q$Resources$q$,7,true);

delete from public.site_pages;
insert into public.site_pages(page,sort_order,heading,body,link,visible) values
($q$home$q$,1,$q$Every failed startup$q$,$q$Search, filter and compare startups by sector, failure reason and underlying tech.$q$,$q$graveyard.html$q$,true),
($q$home$q$,2,$q$Spot the patterns$q$,$q$See which reasons, sectors and investors show up again and again.$q$,$q$graveyard.html$q$,true),
($q$home$q$,3,$q$Submit a postmortem$q$,$q$Know a startup that shut down? Tell us its story for review.$q$,$q$graveyard.html$q$,true),
($q$about$q$,1,$q$Why Failed Startups exists$q$,$q$Most startup advice comes from the survivors. We think the startups that failed have more to teach.

Failed Startups is a record of Indian startups that shut down: what they raised, how long they lasted and why they folded. The point is not the failure, it is the pattern underneath it.$q$,$q$$q$,true),
($q$about$q$,2,$q$How it works$q$,$q$- Every entry is checked by hand before it goes live.
- Know a startup that shut down? [Share its story](contact.html).
- Spotted a mistake? Tell us and we will correct it.$q$,$q$$q$,true),
($q$terms$q$,1,$q$1. Acceptance of these terms$q$,$q$By using Failed Startups (the "site") you agree to these terms. If you do not agree with them, please do not use the site.$q$,$q$$q$,true),
($q$terms$q$,2,$q$2. What the site is$q$,$q$Failed Startups, operated by Oak Sprouts, is an information directory of Indian startups that have shut down: what they raised, how long they lasted and, where it is known, why they folded. Visitors can also submit postmortems, send us messages and voluntarily support the site. We may change, suspend or remove any part of the site at any time.$q$,$q$$q$,true),
($q$terms$q$,3,$q$3. No advice$q$,$q$Everything on this site is for general information only. It is not investment, financial, legal, tax or business advice, and a listing is not an endorsement or recommendation of any startup, founder, investor or product. Do your own research and speak to a qualified professional before making any decision.$q$,$q$$q$,true),
($q$terms$q$,4,$q$4. Accuracy of information and opinion$q$,$q$Details such as funding, team size, founders, shutdown dates and reasons for failure come from public sources and from submissions, and they can be incomplete or out of date. A stated reason for failure is our reading of public information and is not a statement of fact about any person or company. We try to keep entries correct, but we do not guarantee that they are complete, accurate or up to date. Please verify important facts directly.$q$,$q$$q$,true),
($q$terms$q$,5,$q$5. What you submit$q$,$q$When you submit a postmortem, a startup suggestion or a message, you confirm that the information is accurate to the best of your knowledge, that it is not defamatory or unlawful, and that you have the right to share it. You allow us to review, edit, publish and display it on the site. Nothing you submit goes live until we have reviewed it, and we may decline or remove any submission at our discretion.$q$,$q$$q$,true),
($q$terms$q$,6,$q$6. Buy me a beer (voluntary support)$q$,$q$Support payments are voluntary contributions processed by Razorpay. They are not a purchase of goods or services and they give you no rights in the site. A payment that fails or is not completed is not charged, or is returned by your bank. Otherwise, payments are not refundable unless the law requires it. The name you enter may appear on the public leaderboard; tick the anonymous option to appear as "Anonymous Drinker". We may remove a leaderboard name that is offensive, misleading or unlawful.$q$,$q$$q$,true),
($q$terms$q$,7,$q$7. Acceptable use$q$,$q$You agree not to:

- Post false, misleading, defamatory, unlawful or infringing content.
- Scrape, copy or republish large parts of the directory without our written permission.
- Attempt to disrupt, overload or gain unauthorised access to the site, its database or the admin area.
- Use the site to send spam or to harass others.$q$,$q$$q$,true),
($q$terms$q$,8,$q$8. Intellectual property$q$,$q$The site design, code, original text, name, logo and the compiled directory are owned by Oak Sprouts or its licensors. Company names, logos and trademarks shown in listings belong to their owners and appear for identification only. You may share links to our pages, but you may not reproduce the site's content for commercial use without permission.$q$,$q$$q$,true),
($q$terms$q$,9,$q$9. Corrections and removal requests$q$,$q$If you are a founder, company, investor or publisher named on the site and you want an entry corrected, updated or removed, email team.oaksprouts@gmail.com with the details and we will review it promptly.$q$,$q$$q$,true),
($q$terms$q$,10,$q$10. Third-party links and content$q$,$q$The site links to external websites, including news and company pages. Those sites belong to their respective owners. We do not control or endorse their content and are not responsible for it.$q$,$q$$q$,true),
($q$terms$q$,11,$q$11. Disclaimer$q$,$q$The site is provided "as is" and "as available". To the fullest extent permitted by law, we make no warranties of any kind, express or implied, including about accuracy, availability or fitness for a particular purpose.$q$,$q$$q$,true),
($q$terms$q$,12,$q$12. Limitation of liability$q$,$q$To the fullest extent permitted by law, Oak Sprouts is not liable for any loss or damage arising from your use of, or reliance on, the site or its content, including any investment or business decision you make based on it.$q$,$q$$q$,true),
($q$terms$q$,13,$q$13. Governing law$q$,$q$These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Pune, Maharashtra.$q$,$q$$q$,true),
($q$terms$q$,14,$q$14. Changes to these terms$q$,$q$We may update these terms from time to time. The "Last updated" date shows the latest version. Continued use of the site after a change means you accept the new terms.$q$,$q$$q$,true),
($q$terms$q$,15,$q$15. Contact$q$,$q$Questions about these terms? Email team.oaksprouts@gmail.com.$q$,$q$$q$,true),
($q$privacy$q$,1,$q$1. Who we are$q$,$q$This website is operated by Oak Sprouts, Pune, Maharashtra, India ("we", "us"). You can reach us at team.oaksprouts@gmail.com. This policy explains what personal information we collect when you use the site and how we handle it.$q$,$q$$q$,true),
($q$privacy$q$,2,$q$2. What we collect$q$,$q$We only collect what we need:

- **Contact form:** your name, email address and message.
- **Postmortem and startup submissions:** your name and email if you give them, your relationship to the startup, and the details you submit.
- **Searches with no results:** the search term only, with a count. We do not store your name, IP address or any other identity with it, so we can see which startups are missing.
- **Buy me a beer:** the display name you type, the amount and the payment reference. Your card, UPI or bank details are handled by Razorpay and never reach us.
- **Technical data:** our hosting provider may log standard information such as your IP address, browser type and the pages you visit, for security and reliability.$q$,$q$$q$,true),
($q$privacy$q$,3,$q$3. How we use it$q$,$q$We use your information to reply to your messages, review submissions, show the supporter leaderboard, improve the directory, keep the site secure, and meet legal obligations. We do not sell your personal information and we do not send marketing emails unless you ask us to.$q$,$q$$q$,true),
($q$privacy$q$,4,$q$4. Services we rely on$q$,$q$To run the site we use trusted third parties, which may process data on our behalf:

- Supabase, which stores the directory, submissions and no-result search terms.
- Cloudflare, which hosts the website.
- Razorpay, which processes Buy me a beer payments.
- Google Sheets and Google Apps Script, which we use to record supporter payments and may use to receive messages.
- Google Fonts, which delivers the typefaces we use.

These providers have their own privacy policies and may process data outside India.$q$,$q$$q$,true),
($q$privacy$q$,5,$q$5. Cookies and local storage$q$,$q$We do not use advertising or tracking cookies. Your browser may save small amounts of data on your device, such as a cached copy of site content so pages load faster, or the fact that you closed a banner. You can clear this at any time in your browser settings.$q$,$q$$q$,true),
($q$privacy$q$,6,$q$6. Information about startups and founders$q$,$q$The directory publishes business information about companies and about the people who founded or backed them, taken from public sources such as company websites, news reports and public professional profiles. If you are named and want something corrected or removed, email team.oaksprouts@gmail.com and we will review it promptly.$q$,$q$$q$,true),
($q$privacy$q$,7,$q$7. Sharing your information$q$,$q$We share personal information only with the service providers above, when the law requires it, or to protect our rights and the safety of others. Anything you choose to show publicly, such as a leaderboard name, can be seen by other visitors.$q$,$q$$q$,true),
($q$privacy$q$,8,$q$8. How long we keep it and how we protect it$q$,$q$We keep messages and submissions only as long as needed to respond and to keep our records accurate. We use reasonable safeguards, such as access-controlled databases and encrypted connections, but no system is completely secure and we cannot guarantee absolute security.$q$,$q$$q$,true),
($q$privacy$q$,9,$q$9. Your rights$q$,$q$Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may ask us to confirm what personal data we hold about you, correct it, or delete it, and you may withdraw consent you have given. Email us at team.oaksprouts@gmail.com and we will respond within a reasonable time.$q$,$q$$q$,true),
($q$privacy$q$,10,$q$10. Children$q$,$q$This site is not intended for children under 18, and we do not knowingly collect their personal information. If you think a child has sent us information, please contact us and we will delete it.$q$,$q$$q$,true),
($q$privacy$q$,11,$q$11. Links to other websites$q$,$q$The site links to external websites. We are not responsible for their content or privacy practices.$q$,$q$$q$,true),
($q$privacy$q$,12,$q$12. Changes to this policy$q$,$q$We may update this policy from time to time. The "Last updated" date at the top shows when it last changed. Continued use of the site after an update means you accept the revised policy.$q$,$q$$q$,true),
($q$privacy$q$,13,$q$13. Contact us$q$,$q$Questions or requests about your privacy? Email team.oaksprouts@gmail.com or write to Oak Sprouts, 101, Aairah Terrazo, 17, Shankar Sheth Road, Pune 411002.$q$,$q$$q$,true);

delete from public.site_team;
insert into public.site_team(name,role,bio,photo_url,linkedin,sort_order,visible) values
($q$Amit Hapse$q$,$q$Founder$q$,$q$Amit has been very active in the field of investment advisory and has rich and varied experience in the fields of Investments, Tax Planning and Corporate Compliances. He is a trusted professional focused on the financial well being of clients.$q$,$q$https://drive.google.com/file/d/10Fd17v3B5BQV7dJXnIZJXo3GjX_HFVDp/view?usp=drive_link$q$,$q$https://www.linkedin.com/in/amithapse/$q$,1,true),
($q$Chaitanya Dhodapkar$q$,$q$Co-Founder$q$,$q$Chaitanya has over 5+ years of experience in the field of accountancy, taxation, auditing for start-ups, across various sectors. He strives to apply his learning to serve early-stage startups grow and create value for the stakeholders. During his time off, you will find him reading a book or tuning into a podcast.$q$,$q$https://drive.google.com/file/d/1DlF_KW-L5mJHuiG7WZ9Eh9qrC9NB1EyN/view?usp=drive_link$q$,$q$https://www.linkedin.com/in/chaitanya-d-os/$q$,2,true),
($q$Varun Sharma$q$,$q$Co-Founder$q$,$q$Varun works as a Project Analyst, supporting project planning, research, data analysis, execution and performance monitoring. He tracks project progress, prepares reports, and provides data-driven insights to improve efficiency and support decision-making.$q$,$q$https://drive.google.com/file/d/16eQ4J8wJVKsp-6RQD8YeKR9DSnCqvfVP/view?usp=drive_link$q$,$q$https://www.linkedin.com/in/7905-varunsharma/$q$,3,true);

delete from public.site_highlights;
insert into public.site_highlights(value,label,sort_order,visible) values
($q$auto:startups$q$,$q$Startups buried$q$,1,true),
($q$auto:avglife$q$,$q$Avg. lifespan$q$,2,true),
($q$100%$q$,$q$Free to browse$q$,3,true);
