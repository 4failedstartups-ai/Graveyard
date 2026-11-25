/* Shared site shell: nav + footer on every page, plus Home/About/Team/Contact/Terms/Privacy.
   Text comes from Supabase (edit it in the console: Settings, Navigation, Pages, Team, Highlights).
   If the database cannot be reached, the last saved copy is used, then the built-in defaults below. */
(function(){
const DEF={
settings:{site_name:"Failed Startups",tagline:"A record of the Indian startups that didn't make it.",hero_eyebrow:"Vol. 01 — Postmortems",hero_title:"Learn from the startups",hero_accent:"that didn't make it.",hero_subtext:"What they raised, how long they lasted and why they folded. The point isn't the failure, it's the pattern underneath it.",cta1_label:"Browse failed startups",cta1_url:"graveyard.html",cta2_label:"Share a story",cta2_url:"contact.html",about_title:"About us",about_intro:"Why Failed Startups exists and what we hope it teaches.",team_title:"The team",team_intro:"The people behind Failed Startups.",contact_title:"Get in touch",contact_intro:"A correction, a story or a postmortem to share — we read everything.",terms_title:"Terms of Use",terms_intro:"The rules for using this website.",privacy_title:"Privacy Policy",privacy_intro:"What we collect, why we collect it and how we protect it.",legal_updated:"23 November 2026",contact_email:"usefulstartups@gmail.com",contact_phone:"77 88 99 0390",address:"101, Aairah Terrazo,\nGround Floor,\n17, Shankar Sheth Road,\nBehind Meera Hospital,\nPune 411002",linkedin:"",twitter:"",instagram:"",facebook:"",youtube:"",discord:"",blog:"",whatsapp:"",contact_form_url:"",logo_url:"assets/img/gy-mark.png",support_title:"Buy me a beer",support_intro:"Good things take support. Raise a glass to the people keeping Failed Startups open.",footer_blurb:"A record of the startups that didn't make it, and the lessons they left behind.",copyright:"© 2026 Failed Startups. All rights reserved."},
nav:[{Label:"Home",URL:"index.html",Location:"header",Order:1},{Label:"Startups",URL:"graveyard.html",Location:"both",Group:"Directories",Order:2},{Label:"About",URL:"about.html",Location:"both",Group:"Company",Order:3},{Label:"Team",URL:"team.html",Location:"both",Group:"Company",Order:4},{Label:"Contact",URL:"contact.html",Location:"both",Group:"Company",Order:5},{Label:"Buy me a beer",URL:"support.html",Location:"both",Group:"Company",Order:5.5},{Label:"Useful Startups ↗",URL:"https://usefulstartups.com/",Location:"footer",Group:"Resources",Order:6},{Label:"Terms",URL:"terms.html",Location:"footer",Group:"Resources",Order:6.5},{Label:"Privacy",URL:"privacy.html",Location:"footer",Group:"Resources",Order:7}],
highlights:[{Value:"auto:startups",Label:"Startups buried",Order:1},{Value:"auto:avglife",Label:"Avg. lifespan",Order:2},{Value:"100%",Label:"Free to browse",Order:3}],
team:[{Name:"Amit Hapse",Role:"Founder",Bio:"Amit has been very active in the field of investment advisory and has rich and varied experience in the fields of Investments, Tax Planning and Corporate Compliances. He is a trusted professional focused on the financial well being of clients.","Photo URL":"https://drive.google.com/file/d/10Fd17v3B5BQV7dJXnIZJXo3GjX_HFVDp/view?usp=drive_link",LinkedIn:"https://www.linkedin.com/in/amithapse/",Order:1},{Name:"Chaitanya Dhodapkar",Role:"Co-Founder",Bio:"Chaitanya has over 5+ years of experience in the field of accountancy, taxation, auditing for start-ups, across various sectors. He strives to apply his learning to serve early-stage startups grow and create value for the stakeholders. During his time off, you will find him reading a book or tuning into a podcast.","Photo URL":"https://drive.google.com/file/d/1DlF_KW-L5mJHuiG7WZ9Eh9qrC9NB1EyN/view?usp=drive_link",LinkedIn:"https://www.linkedin.com/in/chaitanya-d-os/",Order:2},{Name:"Varun Sharma",Role:"Co-Founder",Bio:"Varun works as a Project Analyst, supporting project planning, research, data analysis, execution and performance monitoring. He tracks project progress, prepares reports, and provides data-driven insights to improve efficiency and support decision-making.","Photo URL":"https://drive.google.com/file/d/16eQ4J8wJVKsp-6RQD8YeKR9DSnCqvfVP/view?usp=drive_link",LinkedIn:"https://www.linkedin.com/in/7905-varunsharma/",Order:3}],
pages:[
{Page:"home",Order:1,Heading:"Every failed startup",Body:"Search, filter and compare startups by sector, failure reason and underlying tech.",Link:"graveyard.html"},
{Page:"home",Order:2,Heading:"Spot the patterns",Body:"See which reasons, sectors and investors show up again and again.",Link:"graveyard.html"},
{Page:"home",Order:3,Heading:"Submit a postmortem",Body:"Know a startup that shut down? Tell us its story for review.",Link:"graveyard.html"},
{Page:"about",Order:1,Heading:"Why Failed Startups exists",Body:"Most startup advice comes from the survivors. We think the startups that failed have more to teach.\n\nFailed Startups is a record of Indian startups that shut down: what they raised, how long they lasted and why they folded. The point is not the failure, it is the pattern underneath it."},
{Page:"about",Order:2,Heading:"How it works",Body:"- Every entry is checked by hand before it goes live.\n- Know a startup that shut down? [Share its story](contact.html).\n- Spotted a mistake? Tell us and we will correct it."},
{Page:"terms",Order:1,Heading:"1. Acceptance of these terms",Body:"By using Failed Startups (the \"site\") you agree to these terms. If you do not agree with them, please do not use the site."},
{Page:"terms",Order:2,Heading:"2. What the site is",Body:"Failed Startups, operated by Oak Sprouts, is an information directory of Indian startups that have shut down: what they raised, how long they lasted and, where it is known, why they folded. Visitors can also submit postmortems, send us messages and voluntarily support the site. We may change, suspend or remove any part of the site at any time."},
{Page:"terms",Order:3,Heading:"3. No advice",Body:"Everything on this site is for general information only. It is not investment, financial, legal, tax or business advice, and a listing is not an endorsement or recommendation of any startup, founder, investor or product. Do your own research and speak to a qualified professional before making any decision."},
{Page:"terms",Order:4,Heading:"4. Accuracy of information and opinion",Body:"Details such as funding, team size, founders, shutdown dates and reasons for failure come from public sources and from submissions, and they can be incomplete or out of date. A stated reason for failure is our reading of public information and is not a statement of fact about any person or company. We try to keep entries correct, but we do not guarantee that they are complete, accurate or up to date. Please verify important facts directly."},
{Page:"terms",Order:5,Heading:"5. What you submit",Body:"When you submit a postmortem, a startup suggestion or a message, you confirm that the information is accurate to the best of your knowledge, that it is not defamatory or unlawful, and that you have the right to share it. You allow us to review, edit, publish and display it on the site. Nothing you submit goes live until we have reviewed it, and we may decline or remove any submission at our discretion."},
{Page:"terms",Order:6,Heading:"6. Buy me a beer (voluntary support)",Body:"Support payments are voluntary contributions processed by Razorpay. They are not a purchase of goods or services and they give you no rights in the site. A payment that fails or is not completed is not charged, or is returned by your bank. Otherwise, payments are not refundable unless the law requires it. The name you enter may appear on the public leaderboard; tick the anonymous option to appear as \"Anonymous Drinker\". We may remove a leaderboard name that is offensive, misleading or unlawful."},
{Page:"terms",Order:7,Heading:"7. Acceptable use",Body:"You agree not to:\n\n- Post false, misleading, defamatory, unlawful or infringing content.\n- Scrape, copy or republish large parts of the directory without our written permission.\n- Attempt to disrupt, overload or gain unauthorised access to the site, its database or the admin area.\n- Use the site to send spam or to harass others."},
{Page:"terms",Order:8,Heading:"8. Intellectual property",Body:"The site design, code, original text, name, logo and the compiled directory are owned by Oak Sprouts or its licensors. Company names, logos and trademarks shown in listings belong to their owners and appear for identification only. You may share links to our pages, but you may not reproduce the site's content for commercial use without permission."},
{Page:"terms",Order:9,Heading:"9. Corrections and removal requests",Body:"If you are a founder, company, investor or publisher named on the site and you want an entry corrected, updated or removed, email team.oaksprouts@gmail.com with the details and we will review it promptly."},
{Page:"terms",Order:10,Heading:"10. Third-party links and content",Body:"The site links to external websites, including news and company pages. Those sites belong to their respective owners. We do not control or endorse their content and are not responsible for it."},
{Page:"terms",Order:11,Heading:"11. Disclaimer",Body:"The site is provided \"as is\" and \"as available\". To the fullest extent permitted by law, we make no warranties of any kind, express or implied, including about accuracy, availability or fitness for a particular purpose."},
{Page:"terms",Order:12,Heading:"12. Limitation of liability",Body:"To the fullest extent permitted by law, Oak Sprouts is not liable for any loss or damage arising from your use of, or reliance on, the site or its content, including any investment or business decision you make based on it."},
{Page:"terms",Order:13,Heading:"13. Governing law",Body:"These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Pune, Maharashtra."},
{Page:"terms",Order:14,Heading:"14. Changes to these terms",Body:"We may update these terms from time to time. The \"Last updated\" date shows the latest version. Continued use of the site after a change means you accept the new terms."},
{Page:"terms",Order:15,Heading:"15. Contact",Body:"Questions about these terms? Email team.oaksprouts@gmail.com."},
{Page:"privacy",Order:1,Heading:"1. Who we are",Body:"This website is operated by Oak Sprouts, Pune, Maharashtra, India (\"we\", \"us\"). You can reach us at team.oaksprouts@gmail.com. This policy explains what personal information we collect when you use the site and how we handle it."},
{Page:"privacy",Order:2,Heading:"2. What we collect",Body:"We only collect what we need:\n\n- **Contact form:** your name, email address and message.\n- **Postmortem and startup submissions:** your name and email if you give them, your relationship to the startup, and the details you submit.\n- **Searches with no results:** the search term only, with a count. We do not store your name, IP address or any other identity with it, so we can see which startups are missing.\n- **Buy me a beer:** the display name you type, the amount and the payment reference. Your card, UPI or bank details are handled by Razorpay and never reach us.\n- **Technical data:** our hosting provider may log standard information such as your IP address, browser type and the pages you visit, for security and reliability."},
{Page:"privacy",Order:3,Heading:"3. How we use it",Body:"We use your information to reply to your messages, review submissions, show the supporter leaderboard, improve the directory, keep the site secure, and meet legal obligations. We do not sell your personal information and we do not send marketing emails unless you ask us to."},
{Page:"privacy",Order:4,Heading:"4. Services we rely on",Body:"To run the site we use trusted third parties, which may process data on our behalf:\n\n- Supabase, which stores the directory, submissions and no-result search terms.\n- Cloudflare, which hosts the website.\n- Razorpay, which processes Buy me a beer payments.\n- Google Sheets and Google Apps Script, which we use to record supporter payments and may use to receive messages.\n- Google Fonts, which delivers the typefaces we use.\n\nThese providers have their own privacy policies and may process data outside India."},
{Page:"privacy",Order:5,Heading:"5. Cookies and local storage",Body:"We do not use advertising or tracking cookies. Your browser may save small amounts of data on your device, such as a cached copy of site content so pages load faster, or the fact that you closed a banner. You can clear this at any time in your browser settings."},
{Page:"privacy",Order:6,Heading:"6. Information about startups and founders",Body:"The directory publishes business information about companies and about the people who founded or backed them, taken from public sources such as company websites, news reports and public professional profiles. If you are named and want something corrected or removed, email team.oaksprouts@gmail.com and we will review it promptly."},
{Page:"privacy",Order:7,Heading:"7. Sharing your information",Body:"We share personal information only with the service providers above, when the law requires it, or to protect our rights and the safety of others. Anything you choose to show publicly, such as a leaderboard name, can be seen by other visitors."},
{Page:"privacy",Order:8,Heading:"8. How long we keep it and how we protect it",Body:"We keep messages and submissions only as long as needed to respond and to keep our records accurate. We use reasonable safeguards, such as access-controlled databases and encrypted connections, but no system is completely secure and we cannot guarantee absolute security."},
{Page:"privacy",Order:9,Heading:"9. Your rights",Body:"Under applicable Indian law, including the Digital Personal Data Protection Act, 2023, you may ask us to confirm what personal data we hold about you, correct it, or delete it, and you may withdraw consent you have given. Email us at team.oaksprouts@gmail.com and we will respond within a reasonable time."},
{Page:"privacy",Order:10,Heading:"10. Children",Body:"This site is not intended for children under 18, and we do not knowingly collect their personal information. If you think a child has sent us information, please contact us and we will delete it."},
{Page:"privacy",Order:11,Heading:"11. Links to other websites",Body:"The site links to external websites. We are not responsible for their content or privacy practices."},
{Page:"privacy",Order:12,Heading:"12. Changes to this policy",Body:"We may update this policy from time to time. The \"Last updated\" date at the top shows when it last changed. Continued use of the site after an update means you accept the revised policy."},
{Page:"privacy",Order:13,Heading:"13. Contact us",Body:"Questions or requests about your privacy? Email team.oaksprouts@gmail.com or write to Oak Sprouts, 101, Aairah Terrazo, 17, Shankar Sheth Road, Pune 411002."}]
};

// ====== helpers ======
const $=(s,r)=>(r||document).querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const url=u=>/^\s*(javascript|data|vbscript):/i.test(u)?"#":u;
const clean=v=>{v=(v||"").trim();return v==="-"?"":v};
const NA=/^(not\s+available|not\s+applicable|not\s+found|not\s+publicly\s+available|n\/?a|unknown|undisclosed|unavailable)$/i; // "Not available" = insufficient information, never counted as a reason
const pc=v=>String(v==null?"":v).trim().toLowerCase().replace(/(^|[\s\-'’.(\/])([a-z\u00c0-\u024f])/g,(m,a,b)=>a+b.toUpperCase());
const vis=r=>!/^(no|false|0|hide|hidden)$/i.test((r.Visible||"").trim());
// Startups: shown ONLY when Visible is exactly "Yes" (blank / No / anything else = hidden).
const visStartup=r=>/^yes$/i.test((r.Visible||"").trim());
const by=(a,b)=>(parseFloat(a.Order)||99)-(parseFloat(b.Order)||99);
const inline=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,t,u)=>`<a href="${url(u)}">${t}</a>`);
function md(t){const o=[];let ul=false;String(t||"").split(/\r?\n/).forEach(l=>{l=l.trim();
 if(/^[-•]\s+/.test(l)){if(!ul){o.push("<ul>");ul=true}o.push("<li>"+inline(l.replace(/^[-•]\s+/,""))+"</li>")}
 else{if(ul){o.push("</ul>");ul=false}if(/^##\s+/.test(l))o.push("<h3>"+inline(l.slice(3))+"</h3>");else if(l)o.push("<p>"+inline(l)+"</p>")}});
 if(ul)o.push("</ul>");return o.join("")}
function drive(u){u=clean(u);if(!u)return"";const m=u.match(/\/d\/([\w-]+)/)||u.match(/id=([\w-]+)/);return m?`https://drive.google.com/thumbnail?id=${m[1]}&sz=w600`:/^[\w.-]+\.(png|jpe?g|svg|ico|webp|gif)$/i.test(u)?"assets/img/"+u:u}
const initials=n=>String(n||"?").split(/\s+/).map(w=>w[0]).slice(0,2).join("").toUpperCase();
function loadJs(src){return new Promise(res=>{const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=res;document.head.appendChild(s)})}
const dbReady=()=>window.GY_DB?Promise.resolve():(dbReady.p=dbReady.p||loadScript("assets/js/data.js"));
function loadScript(src){return new Promise((res,rej)=>{if(window.Papa&&/papaparse/i.test(src))return res();const s=document.createElement("script");s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s)})}

const STATUS=window.GY_STATUS={};
function tab(name){
 const ck="gy_tab_"+name;
 return dbReady().then(()=>GY_DB.site(name))
  .then(d=>{STATUS[name]="live ("+d.length+" rows, database)";try{localStorage.setItem(ck,JSON.stringify(d))}catch(e){}return d})
  .catch(e=>{STATUS[name]="FAILED to load from database. Using "+(localStorage.getItem(ck)?"last saved copy":"built-in defaults");console.warn("[failed-startups] "+name+": "+STATUS[name]);try{return JSON.parse(localStorage.getItem(ck))}catch(e){return null}});
}
async function get(name){const d=await tab(name);return d&&d.length?d:null}
async function getSettings(){const d=await get("settings");const s=Object.assign({},DEF.settings);
 if(d)d.forEach(r=>{const k=clean(r.Key);if(k&&r.Value!=null)s[k]=String(r.Value).trim()});return s}

// ====== shell ======
function head(){
 const add=(tag,attrs)=>{const e=document.createElement(tag);Object.assign(e,attrs);document.head.appendChild(e)};
 window.GY_BUILD="7";if(!document.querySelector('link[href*="site.css"]'))add("link",{rel:"stylesheet",href:"assets/css/site.css?v=7"});
 if(/^(home|support)$/.test(document.body.dataset.page||""))["gazette.css","support.css"].forEach(h=>add("link",{rel:"stylesheet",href:"assets/css/"+h+"?v=6"}));
 add("link",{rel:"icon",type:"image/png",sizes:"48x48",href:"assets/img/favicon-48.png"});
 add("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"assets/img/favicon-32.png"});
 add("link",{rel:"apple-touch-icon",href:"assets/img/apple-touch-icon.png"});
 add("link",{rel:"manifest",href:"assets/site.webmanifest"});
 add("meta",{name:"theme-color",content:"#E8E1D3"});
 add("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"});
 add("style",{textContent:"@view-transition{navigation:none}.ul-nav{view-transition-name:none!important}.ul-nav-in{height:64px!important;max-height:64px}"});
}
function shell(S,nav){
 const here=location.pathname.split("/").pop()||"index.html";
 const items=nav.filter(vis).sort(by);
 const link=(r,cls)=>{const u=clean(r.URL)||"#";const on=u.split("/").pop()===here||(here==="index.html"&&(u==="/"||u==="index.html"));
  return `<a href="${esc(url(u))}"${/^https?:/.test(u)&&!u.includes(location.host)?' target="_blank" rel="noopener"':""} class="${on?"on":""}">${esc(r.Label)}</a>`};
 const loc=(r,w)=>{const l=(r.Location||"header").toLowerCase();return l==="both"||l===w};
 const mark=S.logo_url?`<img src="${esc(drive(S.logo_url))}" alt="" width="34" height="34">`:esc(initials(S.site_name).charAt(0));
 const brand=`<a class="ul-brand" href="index.html"><span class="ul-mark">${mark}</span><span>${esc(S.site_name)}</span></a>`;
 const nv=document.createElement("div");nv.className="ul-nav";
 nv.innerHTML=`<div class="ul-nav-in">${brand}<nav class="ul-links" id="ulLinks">${items.filter(r=>loc(r,"header")).map(link).join("")}</nav><button class="ul-burger" aria-label="Menu" id="ulBurger">☰</button></div>`;
 document.body.insertBefore(nv,document.body.firstChild);
 try{if(!sessionStorage.getItem("gy_us_bar")){const bar=document.createElement("div");bar.className="ul-usbar";
  bar.innerHTML='<a href="https://usefulstartups.com/" target="_blank" rel="noopener"><span class="ul-us-dot"></span><span>Looking for startups that actually <b>work</b>? Explore <u>Useful Startups</u> →</span></a><button type="button" aria-label="Dismiss">×</button>';
  bar.querySelector("button").onclick=()=>{bar.remove();try{sessionStorage.setItem("gy_us_bar","1")}catch(e){}};
  document.body.insertBefore(bar,nv)}}catch(e){}
 addEventListener("scroll",()=>nv.classList.toggle("scrolled",scrollY>8),{passive:true});
 $("#ulBurger").onclick=()=>$("#ulLinks").classList.toggle("open");
 const sv=(p,f)=>`<svg viewBox="0 0 24 24" ${f?'fill="currentColor"':'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}>${p}</svg>`;
 const WA=sv('<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.41-1.35a9.86 9.86 0 0 0 4.63 1.15h.01c5.46 0 9.9-4.45 9.9-9.9C21.96 6.45 17.51 2 12.04 2zm5.8 14.18c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.14.14-.29.29-.13.58.17.29.75 1.24 1.62 2.01 1.12.99 2.06 1.3 2.35 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.94.29.14.48.21.55.33.07.12.07.68-.17 1.36z"/>',1);
 const SOC=[["linkedin","LinkedIn",sv('<path d="M6.94 5a2 2 0 1 1-4-.01 2 2 0 0 1 4 .01zM7 8.48H3V21h4V8.48zm6.32 0H9.35V21h3.97v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48z"/>',1)],
  ["twitter","X",sv('<path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.5 22H1.4l8.1-9.3L1 2h7l4.9 6.3L18.9 2zm-1.2 18h1.9L7.4 4H5.4l12.3 16z"/>',1)],
  ["instagram","Instagram",sv('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>')],
  ["facebook","Facebook",sv('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>')],
  ["youtube","YouTube",sv('<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><path d="m9.75 15.02 5.75-3.27-5.75-3.27z"/>')],
  ["discord","Discord",sv('<path d="M20.3 4.4A17 17 0 0 0 16 3l-.2.4a15 15 0 0 1 3.8 1.9 13 13 0 0 0-11.2 0A15 15 0 0 1 12.2 3.4L12 3a17 17 0 0 0-4.3 1.4C5 8.4 4.3 12.3 4.6 16.1a17 17 0 0 0 5.2 2.6l.9-1.4a11 11 0 0 1-1.5-.7l.4-.3a12 12 0 0 0 10.8 0l.4.3c-.5.3-1 .5-1.5.7l.9 1.400a17 17 0 0 0 5.2-2.600c.4-4.4-.7-8.3-3.1-11.700zM9.5 13.800c-.9 0-1.6-.8-1.6-1.800s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.800zm5 0c-.9 0-1.6-.8-1.6-1.800s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.800z"/>',1)],
  ["blog","Blog",sv('<path d="M4 6h16M4 12h10M4 18h14"/>')]];
 const soc=SOC.filter(x=>S[x[0]]).map(x=>`<a class="ul-soc" href="${esc(url(S[x[0]]))}" target="_blank" rel="noopener" aria-label="${x[1]}">${x[2]}</a>`).join("");
 const groups={};items.filter(r=>loc(r,"footer")).forEach(r=>{const g=clean(r.Group)||"Company";(groups[g]=groups[g]||[]).push(r)});
 const cols=Object.keys(groups).map(g=>`<div><h4>${esc(g)}</h4>${groups[g].map(link).join("")}</div>`).join("");
 const wa=S.whatsapp?(/^https?:/.test(S.whatsapp)?S.whatsapp:"https://wa.me/"+S.whatsapp.replace(/\D/g,"")):"";
 const ctRows=[[S.contact_email&&"mailto:"+S.contact_email,S.contact_email,sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>')],
  [S.contact_phone&&"tel:"+S.contact_phone.replace(/\s/g,""),S.contact_phone,sv('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>')],
  [wa,wa&&"Chat on WhatsApp",WA],
  [S.address&&"-",S.address,sv('<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>')]];
 const ct=ctRows.filter(r=>r[1]).map(r=>{const inner=`<i>${r[2]}</i><span>${esc(r[1])}</span>`;return r[0]==="-"?`<div class="ul-ct">${inner}</div>`:`<a class="ul-ct" href="${esc(url(r[0]))}"${/^https/.test(r[0])?' target="_blank" rel="noopener"':""}>${inner}</a>`}).join("");
 const ft=document.createElement("div");ft.className="ul-foot";
 ft.innerHTML=`<div class="ul-foot-in"><div class="ul-fb">${brand}<p>${esc(S.footer_blurb)}</p><div class="ul-socs">${soc}</div></div>
 <div class="ul-groups">${cols}</div><div><h4>Get in touch</h4>${ct}</div></div>
 <div class="ul-copy"><span>${esc(S.copyright)}</span><a href="#" style="display:inline" onclick="window.scrollTo({top:0,behavior:'smooth'});return false">Back to top</a></div>`;
 document.body.appendChild(ft);
 // Nav height is fixed at 64px (+1px border). Never trust a measurement taken before the stylesheet has loaded.
 const fixNav=()=>{const h=nv.offsetHeight;document.documentElement.style.setProperty("--ul-nav-h",(h>=48&&h<=96?h:65)+"px")};
 fixNav();const sl=document.querySelector('link[href*="site.css"]');if(sl){sl.addEventListener("load",fixNav);if(sl.sheet)fixNav()}
 addEventListener("load",fixNav);
}

// ====== pages ======
const sections=(rows,p)=>rows.filter(r=>(r.Page||"").toLowerCase()===p&&vis(r)).sort(by);
function pageHead(S,k){return `<div class="ul-pagehead"><div class="ul-aurora"></div><div class="ul-wrap"><div class="ul-eyebrow">${esc(S.site_name)}</div><h1>${esc(S[k+"_title"])}</h1><p class="ul-lead">${esc(S[k+"_intro"])}</p></div></div>`}
function textPage(k,S,P){
 const rows=sections(P,k);const upd=S.legal_updated&&(k==="terms"||k==="privacy")?`<p style="font:12px var(--mono);color:var(--gold2)">Last updated: ${esc(S.legal_updated)}</p>`:"";
 return pageHead(S,k)+`<div class="ul-doc">${upd}${rows.map(r=>`<section class="rv">${clean(r.Heading)?`<h2>${esc(r.Heading)}</h2>`:""}${md(r.Body)}</section>`).join("")||"<p>No content yet.</p>"}</div>`;
}
function teamPage(S,T){
 const m=T.filter(vis).sort(by);
 if(!m.length)return pageHead(S,"team")+`<div class="ul-wrap" style="padding:50px 24px 90px"><p class="ul-lead">The team page is being put together. Check back soon.</p></div>`;
 return pageHead(S,"team")+`<div class="ul-wrap ul-team" style="padding-bottom:90px"><div class="ul-grid">${m.map(r=>{const ph=drive(r.Photo||r["Photo URL"]);
  return `<div class="ul-card tilt rv"><div class="ul-photo">${ph?`<img src="${esc(ph)}" alt="${esc(pc(r.Name))}" onerror="this.remove()">`:esc(initials(pc(r.Name)))}</div><div class="ul-body"><h3>${esc(pc(r.Name))}</h3><div class="ul-role">${esc(r.Role)}</div><p>${inline(r.Bio)}</p>${clean(r.LinkedIn)?`<a class="ul-more" href="${esc(url(r.LinkedIn))}" target="_blank" rel="noopener">LinkedIn →</a>`:""}</div></div>`}).join("")}</div></div>`;
}
function contactPage(S){
 const row=(l,v)=>v?`<div><label>${l}</label>${v}</div>`:"";
 return pageHead(S,"contact")+`<div class="ul-wrap"><div class="ul-contact"><div class="ul-info rv">
 ${row("Email",S.contact_email&&`<a href="mailto:${esc(S.contact_email)}">${esc(S.contact_email)}</a>`)}${row("Phone",esc(S.contact_phone))}${row("Address",esc(S.address))}
 ${row("Follow",["linkedin","twitter","instagram","facebook","youtube","discord"].filter(k=>S[k]).map(k=>`<a href="${esc(url(S[k]))}" target="_blank" rel="noopener">${k}</a>`).join(" · "))}</div>
 <form class="ul-form rv" id="ulForm"><label>Your name</label><input name="fname" required><label>Your email</label><input type="email" name="femail" required>
 <label>Message</label><textarea name="fmsg" required></textarea><div class="ul-hp"><input name="hp" tabindex="-1" autocomplete="off"></div>
 <button class="ul-btn" type="submit">Send message</button><div class="ul-status" id="ulStatus"></div></form></div></div>`;
}
function wireForm(S){
 const f=$("#ulForm");if(!f)return;const st=$("#ulStatus");const t0=Date.now();
 const ok=()=>{st.style.color="#6fbf73";st.textContent="Thanks — your message has been sent.";f.reset()};
 const bad=()=>{st.style.color="#C1543C";st.textContent="Couldn't send that. Please email us directly."};
 f.onsubmit=e=>{e.preventDefault();if(f.hp.value)return ok();if(Date.now()-t0<2500){st.style.color="#C1543C";st.textContent="Please take a moment to fill out the form.";return}
  const d={formType:"contact",name:f.fname.value.trim(),email:f.femail.value.trim(),message:f.fmsg.value.trim()};
  if(S.contact_form_url){st.textContent="Sending…";fetch(S.contact_form_url,{method:"POST",body:JSON.stringify(d),headers:{"Content-Type":"text/plain;charset=utf-8"}}).then(r=>r.json()).then(j=>j.ok?ok():bad()).catch(bad)}
  else location.href="mailto:"+S.contact_email+"?subject="+encodeURIComponent("Message from "+d.name)+"&body="+encodeURIComponent(d.message+"\n\n"+d.email);};
}

const words=(t,n)=>String(t).split(/\s+/).filter(Boolean).map((w,i)=>`<span class="w"><span style="--i:${n+i}">${esc(w)}</span></span>`).join(" ");
async function homePage(S,P,H){
 const cards=sections(P,"home");
 const stats=H.filter(vis).sort(by);
 const out=`<section class="ul-hero"><div class="ul-aurora"></div><div class="ul-wrap"><div class="ul-eyebrow">${esc(S.hero_eyebrow)}</div>
 <h1>${words(S.hero_title,0)} <em>${words(S.hero_accent,S.hero_title.split(/\s+/).length)}</em></h1><p class="ul-lead">${esc(S.hero_subtext)}</p>
 <form class="ul-search" id="ulSearch" role="search" autocomplete="off" onsubmit="return false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
  <input id="ulSearchIn" type="search" placeholder="Search startups, sectors, reasons, pages…" aria-label="Search the site" aria-controls="ulSr" aria-expanded="false" role="combobox" autocomplete="off" spellcheck="false">
  <div class="ul-sr" id="ulSr" role="listbox" hidden></div></form>
 <div class="ul-cta"><a class="ul-btn" href="${esc(url(S.cta1_url))}">${esc(S.cta1_label)}</a>${S.cta2_label?`<a class="ul-btn ghost" href="${esc(url(S.cta2_url))}">${esc(S.cta2_label)}</a>`:""}</div><div class="ul-tape" id="ulTape" hidden><div class="ul-tape-in" id="ulTapeIn"></div></div></div></section>
 <div class="ul-wrap" style="padding-top:60px"><div class="ul-stats rv" id="ulStats">${stats.map(r=>`<div class="ul-stat"><b data-v="${esc(r.Value)}">${/^auto:/.test(r.Value)?"…":esc(r.Value)}</b><span>${esc(r.Label)}</span></div>`).join("")}</div></div>
 <section class="ul-sec"><div class="ul-wrap"><div class="ul-eyebrow">Explore</div><h2>Everything in one place</h2><div class="ul-grid">${cards.map(r=>`<a class="ul-card rv" href="${esc(url(clean(r.Link)||"#"))}"><h3>${esc(r.Heading)}</h3><p>${inline(r.Body)}</p><span class="ul-more">Open →</span></a>`).join("")}</div></div></section>
 <div id="gzAnchor"></div>`;
 return out;
}
async function homeData(){
 let rows=[];
 try{await dbReady();rows=await GY_DB.startups();STATUS.graveyard="live ("+rows.length+" rows, database)"}
 catch(e){try{rows=window.GY_DB?GY_DB.cached():[]}catch(x){rows=[]}STATUS.graveyard="FAILED to load from database"+(rows.length?". Using last saved copy":"");console.warn("[graveyard] "+STATUS.graveyard)}
 const life=r=>{const a=parseInt(r["Founded In"]),b=parseInt(r["Shutdown Year"]);return a&&b&&b>=a?b-a:null};
 document.querySelectorAll("#ulStats b[data-v^='auto:']").forEach(b=>{const k=b.dataset.v;
  if(k==="auto:startups"){b.dataset.v=rows.length?String(rows.length):"—";b.textContent=b.dataset.v}
  else if(k==="auto:avglife"){const l=rows.map(life).filter(x=>x!==null);b.removeAttribute("data-v");b.textContent=l.length?(l.reduce((a,c)=>a+c,0)/l.length).toFixed(1)+" yr":"—"}});
 const tp=$("#ulTapeIn");
 if(tp&&rows.length){const h=rows.slice(0,80).map(r=>`<span><b>${esc(r["Startup Name"])}</b>${esc((NA.test(clean(r["Failure Reason"]))?"":clean(r["Failure Reason"]))||"Shut down")}${clean(r["Shutdown Year"])?" · "+esc(clean(r["Shutdown Year"])):""}</span>`).join("");tp.innerHTML=h+h;$("#ulTape").hidden=false;
  const speed=()=>{const w=tp.scrollWidth/2;if(w)tp.style.animationDuration=Math.max(w/38,24)+"s"};speed();
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(speed)}

 return rows;
}

// ====== site search (home page): startups, sectors, failure reasons, pages and team ======
function wireSearch(rows,NAV,P,TEAM,S){
 const inp=$("#ulSearchIn"),box=$("#ulSr");if(!inp||!box)return;
 const flat=t=>String(t||"").replace(/\*\*|\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/^[-•]\s+/gm,"").replace(/\s+/g," ").trim();
 const nm=r=>clean(r["Startup Name"]);
 const PAGEFILE={about:"about.html",terms:"terms.html",privacy:"privacy.html",contact:"contact.html",team:"team.html",support:"support.html"};
 const LABEL={about:"About",terms:"Terms",privacy:"Privacy",contact:"Contact",team:"Team",support:"Support"};
 const pages=[];
 NAV.filter(vis).forEach(r=>{const u=clean(r.URL);if(u&&r.Label)pages.push({t:r.Label.replace(/\s*↗$/,""),x:"",u,k:"Page",ext:/^https?:/.test(u)&&!u.includes(location.host)})});
 P.filter(vis).forEach(r=>{const k=(r.Page||"").toLowerCase();if(!PAGEFILE[k]||!clean(r.Heading))return;pages.push({t:r.Heading,x:flat(r.Body),u:PAGEFILE[k],k:LABEL[k]})});
 TEAM.filter(vis).forEach(r=>{if(clean(r.Name))pages.push({t:pc(r.Name),x:flat(r.Role+" "+r.Bio),u:"team.html",k:"Team"})});
 pages.push({t:"Heat map of failures by state",x:"where do indian startups die geography city state map",u:"graveyard.html#heatmap",k:"Page"},
  {t:"Submit a postmortem",x:"suggest add a startup share a story",u:"graveyard.html",k:"Page"},
  {t:"Buy me a beer leaderboard",x:"support donate supporters",u:"support.html",k:"Page"});
 const cnt={};const bump=(m,v)=>{v=pc(v);if(v)m[v]=(m[v]||0)+1};
 const sec={},rea={};rows.forEach(r=>{bump(sec,clean(r.Sector));clean(r["Failure Reason"]).split(/[;|,]/).forEach(v=>{if(!NA.test(v.trim()))bump(rea,v)})});
 const hay=r=>[r["Startup Name"],r.Founders,r["Key Investors"],r["Tagline / Description"],r.Tags,r["Underlying Tech"],r.Sector,r["Failure Reason"],r.Headquarters].join(" ").toLowerCase();
 const idx=rows.map(r=>({r,h:hay(r),n:nm(r).toLowerCase()}));
 const toks=q=>q.toLowerCase().split(/\s+/).filter(Boolean);
 const hit=(h,tk)=>tk.every(t=>h.includes(t));
 const mark=(txt,tk)=>{txt=String(txt);const re=new RegExp("("+tk.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")","gi");return txt.split(re).map((p,i)=>i%2?"<mark>"+esc(p)+"</mark>":esc(p)).join("")};
 function search(q){
  const tk=toks(q);if(!tk.length)return null;const full=q.trim().toLowerCase();
  const st=idx.filter(o=>hit(o.h,tk)).map(o=>({o,s:o.n===full?0:o.n.startsWith(full)?1:tk.every(t=>o.n.includes(t))?2:3})).sort((a,b)=>a.s-b.s||a.o.n.localeCompare(b.o.n));
  const cat=[];[["Sector",sec],["Failure reason",rea]].forEach(([k,m])=>Object.keys(m).forEach(v=>{if(hit(v.toLowerCase(),tk))cat.push({k,v,n:m[v]})}));
  const pg=pages.map(p=>({p,s:p.t.toLowerCase().includes(full)?0:hit(p.t.toLowerCase(),tk)?1:hit((p.t+" "+p.x).toLowerCase(),tk)?2:9})).filter(a=>a.s<9).sort((a,b)=>a.s-b.s);
  return{tk,st,cat:cat.sort((a,b)=>b.n-a.n).slice(0,4),pg:pg.slice(0,5).map(a=>a.p)};
 }
 let items=[],act=-1,last="";
 const go=el=>{if(!el)return;if(el.ext)window.open(el.href,"_blank","noopener");else location.href=el.href};
 function paint(){
  box.querySelectorAll(".ul-sr-i").forEach((e,i)=>{e.classList.toggle("on",i===act);e.setAttribute("aria-selected",i===act)});
  const on=box.querySelector(".ul-sr-i.on");if(on)on.scrollIntoView({block:"nearest"});
 }
 function render(){
  const q=inp.value.trim();if(q.length<1){box.hidden=true;inp.setAttribute("aria-expanded","false");items=[];return}
  const R=search(q);items=[];let h="";
  const row=(href,title,meta,ext)=>{items.push({href,ext});return`<a class="ul-sr-i" role="option" href="${esc(url(href))}"${ext?' target="_blank" rel="noopener"':""} data-i="${items.length-1}"><b>${mark(title,R.tk)}</b>${meta?`<span>${mark(meta,R.tk)}</span>`:""}</a>`};
  if(R.st.length){h+=`<div class="ul-sr-h">Startups <i>${R.st.length}</i></div>`;
   R.st.slice(0,6).forEach(({o})=>{const r=o.r;h+=row("graveyard.html#s="+encodeURIComponent(nm(r)),pc(nm(r)),[pc(clean(r.Sector)),clean(r["Shutdown Year"])&&"shut "+clean(r["Shutdown Year"])].filter(Boolean).join(" · "))});
   if(R.st.length>6)h+=row("graveyard.html?q="+encodeURIComponent(q),"See all "+R.st.length+" startups matching “"+q+"”","")}
  if(R.cat.length){h+=`<div class="ul-sr-h">Sectors and reasons</div>`;R.cat.forEach(c=>{h+=row("graveyard.html?q="+encodeURIComponent(c.v),c.v,c.k+" · "+c.n+" startup"+(c.n===1?"":"s"))})}
  if(R.pg.length){h+=`<div class="ul-sr-h">Pages</div>`;R.pg.forEach(p=>{h+=row(p.u,p.t,p.k+(p.x?" · "+p.x.slice(0,70)+(p.x.length>70?"…":""):""),p.ext)})}
  if(!items.length){h=`<div class="ul-sr-none"><b>Nothing found for “${esc(q)}”.</b><span>We have not covered that yet. We have noted your search so we can add it.</span></div>`;logMiss(q)}
  box.innerHTML=h;box.hidden=false;inp.setAttribute("aria-expanded","true");act=-1;
 }
 // searches that find nothing are counted (term only, no identity) so the owner can see what is missing
 let mt=null;const sent=new Set();
 function logMiss(q){clearTimeout(mt);q=q.trim().toLowerCase();if(q.length<2||sent.has(q)||!window.GY_CFG)return;
  mt=setTimeout(()=>{sent.add(q);const c=window.GY_CFG;fetch(c.url+"/rest/v1/rpc/log_search_miss",{method:"POST",headers:{"Content-Type":"application/json",apikey:c.key,Authorization:"Bearer "+c.key},body:JSON.stringify({p_term:q}),keepalive:true}).catch(()=>{})},1200)}
 inp.addEventListener("input",()=>{last=inp.value;render()});
 inp.addEventListener("focus",()=>{if(inp.value.trim())render()});
 inp.addEventListener("keydown",e=>{
  const els=box.querySelectorAll(".ul-sr-i");
  if(e.key==="ArrowDown"){e.preventDefault();if(box.hidden)render();else{act=(act+1)%els.length;paint()}}
  else if(e.key==="ArrowUp"){e.preventDefault();if(els.length){act=(act-1+els.length)%els.length;paint()}}
  else if(e.key==="Escape"){box.hidden=true;inp.setAttribute("aria-expanded","false")}
  else if(e.key==="Enter"){e.preventDefault();const q=inp.value.trim();if(!q)return;
   if(act>=0)return go(items[act]);
   const R=search(q);if(R&&R.st.length)location.href="graveyard.html?q="+encodeURIComponent(q);else if(items.length)go(items[0])}});
 box.addEventListener("mousemove",e=>{const a=e.target.closest(".ul-sr-i");if(a){act=+a.dataset.i;paint()}});
 document.addEventListener("click",e=>{if(!e.target.closest("#ulSearch")){box.hidden=true;inp.setAttribute("aria-expanded","false")}});
 document.addEventListener("keydown",e=>{if(e.key==="/"&&!/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement||{}).tagName||"")){e.preventDefault();inp.focus()}});
}

function fx(){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);e.target.querySelectorAll&&e.target.querySelectorAll("b[data-v]").forEach(count)}}),{threshold:.12});
 const watch=()=>document.querySelectorAll(".rv:not(.in)").forEach(el=>io.observe(el));watch();new MutationObserver(watch).observe(document.body,{childList:true,subtree:true});
 document.addEventListener("mousemove",e=>{const c=e.target.closest&&e.target.closest(".ul-card,.ul-hero,.ul-pagehead");if(!c)return;const r=c.getBoundingClientRect();
  const a=c.classList.contains("ul-card")?c:c.querySelector(".ul-aurora")||c;a.style.setProperty("--mx",(e.clientX-r.left)+"px");a.style.setProperty("--my",(e.clientY-r.top)+"px")});
}
function count(el){const v=el.dataset.v||"";const m=v.match(/^(\D*)([\d.,]+)(.*)$/);if(!m||/^auto:/.test(v)){el.textContent=v;return}
 const n=parseFloat(m[2].replace(/,/g,""));let t0;const f=t=>{t0=t0||t;const p=Math.min((t-t0)/1200,1);el.textContent=m[1]+Math.round(n*(1-Math.pow(1-p,3))).toLocaleString("en-IN")+m[3];if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}

// ====== boot ======
function themes(){
 const add=h=>{const l=document.createElement("link");l.rel="stylesheet";l.href=h;document.head.appendChild(l)};
 if(document.getElementById("countPill")&&document.getElementById("grid"))add("assets/css/graveyard-theme.css");
}
async function boot(){
 try{await boot0()}finally{document.dispatchEvent(new Event("ul:ready"))}
}
async function boot0(){
 head();themes();
 const [S,nav,pages,team,hl]=await Promise.all([getSettings(),get("nav"),get("pages"),get("team"),get("highlights")]);
 const NAV=nav||DEF.nav,P=pages||DEF.pages;
 shell(S,NAV);
 // the ledger page carries the same site-wide search box as the home page
 if($("#ulSearchIn")&&!document.body.dataset.page)homeData().then(rows=>wireSearch(rows,NAV,P,team||DEF.team,S)).catch(()=>{});
 const key=document.body.dataset.page;if(!key)return;
 document.body.classList.add("ul-page");
 const root=$("#ul-root");
 const T=key==="home"?S.site_name:(S[key+"_title"]||key)+" — "+S.site_name;document.title=T;
 if(key==="home"){root.innerHTML=await homePage(S,P,hl||DEF.highlights);fx();
  const rows=await homeData();await loadJs("assets/js/gazette.js");await loadJs("assets/js/support.js");GZ.home(rows,S,root);GYSupport.mount($("#gzSupport"),S);wireSearch(rows,NAV,P,team||DEF.team,S)}
 else if(key==="support"){root.innerHTML=pageHead(S,"support")+'<div class="ul-wrap"><div id="gzSupport" class="gz-solo"></div></div>';fx();await loadJs("assets/js/support.js");GYSupport.mount($("#gzSupport"),S)}
 else if(key==="team"){root.innerHTML=teamPage(S,team||DEF.team);fx()}
 else if(key==="contact"){root.innerHTML=contactPage(S);wireForm(S);fx()}
 else{root.innerHTML=textPage(key,S,P);fx()}
 if(/[?&]debug\b/.test(location.search))debugPanel(S)
}
function debugPanel(S){const d=document.createElement("div");d.style.cssText="position:fixed;z-index:99999;right:12px;bottom:12px;max-width:380px;background:#221E1A;color:#E8E1D3;font:12px/1.6 monospace;padding:14px 16px;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.4)";
 d.innerHTML="<b>Build "+window.GY_BUILD+" · nav "+(document.querySelector(".ul-nav")||{}).offsetHeight+"px</b><br><b>Data connection</b><br>"+["graveyard","settings","nav","pages","team","highlights"].map(k=>k+": "+esc(STATUS[k]||"not requested on this page")).join("<br>")+"<br><br>Add ?debug to any page address to see this.";document.body.appendChild(d)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
