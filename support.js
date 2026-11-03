/* Buy Me a Beer + Top 5 Beer Supporters.
   GYSupport.mount(element, settings)
   Live mode:  Settings tab key  support_api_url  = your Apps Script web-app URL (see SUPPORT-SETUP.md)
   Demo mode:  no support_api_url -> payments are simulated in this browser only (no money moves). */
(function(){
"use strict";
const $=(s,r)=>(r||document).querySelector(s), $$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const inr=n=>"₹"+Number(n).toLocaleString("en-IN");
const MSG="Good things take support! Your contributions keep us motivated to keep this website running, growing and bringing you more valuable content. Every little contribution makes a difference. ❤️";
const TIERS=[
 {amt:10,   title:"Buy Me a Beer",         icon:"🍺",fill:.24,line:"A cold one for the cause."},
 {amt:50,   title:"Buy Me a Round",        icon:"🍻",fill:.44,line:"Enough for the whole table."},
 {amt:100,  title:"Keep the Cheers Coming",icon:"🥂",fill:.62,line:"Keeping the taps running."},
 {amt:500,  title:"Party Sponsor",         icon:"🎉",fill:.82,line:"Now it's a proper party."},
 {amt:5000, title:"Sponsor the Bar",       icon:"👑",fill:1,  line:"The whole bar is on you."}];
const TITLES=["Head Brewer","Round Master","Bar Regular","Rising Sipper","Rising Sipper"];
const DEMO_SEED=[{name:"Aarav K.",total:1500,count:4},{name:"Meera S.",total:650,count:3},{name:"Rohan P.",total:300,count:2},{name:"Isha N.",total:110,count:2},{name:"Dev M.",total:60,count:2}];
const clean=n=>String(n||"").replace(/[^\p{L}\p{N} ._@-]/gu,"").replace(/\s+/g," ").trim().slice(0,20);

function glass(){return `<svg class="bb-svg" viewBox="0 0 200 230" aria-hidden="true"><defs><clipPath id="bbclip"><path d="M44 52h92l-8 138a10 10 0 0 1-10 9H62a10 10 0 0 1-10-9z"/></clipPath>
 <linearGradient id="bbbeer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0BE55"/><stop offset="1" stop-color="#B9791A"/></linearGradient></defs>
 <ellipse cx="90" cy="214" rx="62" ry="8" class="bb-shadow"/>
 <path d="M136 78h16a20 20 0 0 1 20 20v28a20 20 0 0 1-20 20h-18" class="bb-handle"/>
 <g clip-path="url(#bbclip)"><g class="bb-liq" id="bbLiq"><rect x="30" y="0" width="130" height="220" fill="url(#bbbeer)"/>
  <path class="bb-wave" d="M30 0q16-9 32 0t32 0 32 0 32 0 32 0 32 0V-14H30z" fill="#F6EFD9"/><circle cx="62" cy="-10" r="9" fill="#F6EFD9"/><circle cx="96" cy="-14" r="11" fill="#F6EFD9"/><circle cx="128" cy="-9" r="8" fill="#F6EFD9"/></g>
  <g class="bb-bub">${[0,1,2,3,4,5,6].map(i=>`<circle cx="${58+i*11}" cy="196" r="${2+i%3}" style="--d:${(i*.55).toFixed(2)}s;--x:${(i%2?6:-6)}px"/>`).join("")}</g>
  <path d="M58 60l-4 130" class="bb-shine"/></g>
 <path d="M44 52h92l-8 138a10 10 0 0 1-10 9H62a10 10 0 0 1-10-9z" class="bb-outline"/></svg>`}

const medal=r=>r<3?`<span class="bb-medal m${r+1}"><svg viewBox="0 0 32 40"><path d="M9 0h5l3 12h-6zM23 0h-5l-3 12h6z" class="rb"/><circle cx="16" cy="25" r="13" class="cn"/><circle cx="16" cy="25" r="9.5" class="rg"/></svg><b>${r+1}</b></span>`
  :`<span class="bb-medal plain"><b>${r+1}</b></span>`;

function mount(el,S){
  if(!el)return;
  const API=(S&&S.support_api_url)||window.GY_SUPPORT_API||"";const demo=!API;
  const message=(S&&S.support_message)||MSG;
  let sel=1,busy=false,rows=[],lastKey="";
  const DK="gy_support_demo";
  const demoGet=()=>{try{return JSON.parse(localStorage.getItem(DK))||DEMO_SEED.slice()}catch(e){return DEMO_SEED.slice()}};
  const demoSet=a=>{try{localStorage.setItem(DK,JSON.stringify(a))}catch(e){}};

  el.innerHTML=`<div class="bb" id="bbRoot">
  <div class="bb-intro rv"><div class="ul-eyebrow">Support the graveyard</div><h2>Buy me a beer <span class="bb-emo">🍺</span></h2><p class="ul-lead">${esc(message)}</p></div>
  <div class="bb-grid">
   <div class="bb-card rv">
    <div class="bb-stage"><div class="bb-glass" id="bbGlass">${glass()}</div><div class="bb-tag"><span id="bbIcon">🍺</span><b id="bbAmt">₹50</b><em id="bbLine"></em></div></div>
    <form class="bb-form" id="bbForm" autocomplete="off" novalidate>
     <div class="bb-lbl" id="bbLbl">Pick your round</div>
     <div class="bb-tiers" id="bbTiers" role="radiogroup" aria-labelledby="bbLbl"><i class="bb-pill" id="bbPill"></i>
      ${TIERS.map((t,i)=>`<button type="button" role="radio" aria-checked="${i===sel}" data-i="${i}" class="bb-tier${i===sel?" on":""}"><span class="ic">${t.icon}</span><span class="tt">${esc(t.title)}</span><span class="pr">${inr(t.amt)}</span></button>`).join("")}
     </div>
     <label class="bb-field"><span>Name on the leaderboard</span><input id="bbName" maxlength="20" placeholder="e.g. Kunal" aria-describedby="bbHint"></label>
     <label class="bb-chk"><input type="checkbox" id="bbAnon"><i></i><span>Keep me anonymous (shows as “Anonymous Drinker”)</span></label>
     <button class="bb-pay" id="bbPay" type="submit"><span class="bb-pay-in"><span class="bb-pay-ic">🍺</span><span class="bb-pay-t">Buy Me a Beer</span><span class="bb-pay-a" id="bbPayAmt">₹50</span></span></button>
     <div class="bb-status" id="bbStatus" role="status" aria-live="polite"></div>
     <p class="bb-note" id="bbHint">${demo?'<b class="bb-demo">Demo mode</b> Payments are simulated in this browser. No money moves.':"Secure checkout by Razorpay · UPI, cards, netbanking, wallets"}</p>
    </form>
   </div>
   <aside class="bb-board rv" aria-labelledby="bbBt">
    <div class="bb-bhead"><div><div class="ul-eyebrow">Hall of fame</div><h3 id="bbBt">Top 5 Beer Supporters</h3></div><span class="bb-live"><i></i>${demo?"Sample":"Live"}</span></div>
    <ol class="bb-list" id="bbList"></ol>
    <p class="bb-bfoot">${demo?"Sample names. Connect your backend to go live.":"Rankings update automatically after every successful payment."}</p>
   </aside>
  </div></div>`;

  const root=$("#bbRoot",el),liq=$("#bbLiq",el),list=$("#bbList",el),status=$("#bbStatus",el),pill=$("#bbPill",el);
  const ROW=72;

  /* ----- tier selection: sliding pill + glass fills ----- */
  const movePill=()=>{const b=$(".bb-tier.on",el);if(!b)return;pill.style.transform=`translateY(${b.offsetTop}px)`;pill.style.height=b.offsetHeight+"px"};
  const setTier=(i,quiet)=>{sel=i;const t=TIERS[i];
    $$(".bb-tier",el).forEach((b,k)=>{b.classList.toggle("on",k===i);b.setAttribute("aria-checked",k===i);b.tabIndex=k===i?0:-1});
    movePill();
    liq.style.transform=`translateY(${196-t.fill*138}px)`;
    $("#bbIcon",el).textContent=t.icon;$("#bbLine",el).textContent=t.line;$("#bbPay",el).classList.toggle("big",i===4);
    tickAmt($("#bbAmt",el),t.amt);tickAmt($("#bbPayAmt",el),t.amt);$(".bb-pay-ic",el).textContent=t.icon;
    if(!quiet){const g=$("#bbGlass",el);g.classList.remove("clink");void g.offsetWidth;g.classList.add("clink")}
  };
  const amtState=new WeakMap();
  function tickAmt(node,to){const from=amtState.get(node)||0;amtState.set(node,to);if(reduce||!from){node.textContent=inr(to);return}
    let t0;const f=t=>{t0=t0||t;const p=Math.min((t-t0)/450,1),e=1-Math.pow(1-p,3);node.textContent=inr(Math.round(from+(to-from)*e));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
  $("#bbTiers",el).addEventListener("click",e=>{const b=e.target.closest(".bb-tier");if(b)setTier(+b.dataset.i)});
  $("#bbTiers",el).addEventListener("keydown",e=>{const k={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(!k)return;e.preventDefault();
    const n=(sel+k+TIERS.length)%TIERS.length;setTier(n);$$(".bb-tier",el)[n].focus()});
  setTier(1,true);addEventListener("resize",movePill);(document.fonts&&document.fonts.ready||Promise.resolve()).then(movePill);
  new IntersectionObserver((es,o)=>{if(es.some(x=>x.isIntersecting)){movePill();o.disconnect()}}).observe(root);

  /* ----- leaderboard: FLIP re-ordering, number tickers, new-entry glow ----- */
  const norm=a=>a.slice().sort((x,y)=>y.total-x.total).slice(0,5);
  function renderBoard(next,hl){
    const prev=new Map(rows.map((r,i)=>[r.name.toLowerCase(),{i,t:r.total}]));rows=norm(next);list.style.height=ROW*5+"px";
    const keep=new Set(rows.map(r=>r.name.toLowerCase()));
    $$(".bb-row",list).forEach(n=>{if(!keep.has(n.dataset.k)){n.classList.add("out");setTimeout(()=>n.remove(),400)}});
    rows.forEach((r,i)=>{const k=r.name.toLowerCase();let n=$(`.bb-row[data-k="${CSS.escape(k)}"]:not(.out)`,list);const was=prev.get(k);
      if(!n){n=document.createElement("li");n.className="bb-row new";n.dataset.k=k;n.style.transform=`translateY(${i*ROW}px)`;list.appendChild(n);setTimeout(()=>n.classList.remove("new"),900)}
      n.innerHTML=`${medal(i)}<div class="bb-who"><b>${esc(r.name)}</b><span>${TITLES[i]}${r.count?` · ${r.count} round${r.count===1?"":"s"}`:""}</span><i class="bb-meter"><u style="width:${rows[0].total?r.total/rows[0].total*100:0}%"></u></i></div><div class="bb-tot"><b>${inr(was?was.t:0)}</b>${was&&was.i>i?'<em class="up">▲</em>':was&&was.i<i?'<em class="dn">▼</em>':""}</div>`;
      n.className="bb-row r"+(i+1)+(hl&&hl.toLowerCase()===k?" hit":"")+(n.classList.contains("new")?" new":"");
      requestAnimationFrame(()=>{n.style.transform=`translateY(${i*ROW}px)`});
      const tn=$(".bb-tot b",n);const to=r.total,from=was?was.t:0;
      if(reduce||from===to){tn.textContent=inr(to)}else{let t0;const f=t=>{t0=t0||t;const p=Math.min((t-t0)/900,1);tn.textContent=inr(Math.round(from+(to-from)*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
    });
    if(!rows.length)list.innerHTML=`<li class="bb-empty">Nobody yet. Be the first name on the wall.</li>`;
  }
  async function api(body){const r=await fetch(API,body?{method:"POST",body:JSON.stringify(body),headers:{"Content-Type":"text/plain;charset=utf-8"}}:{cache:"no-store"});return r.json()}
  async function refresh(hl){try{if(demo){renderBoard(demoGet(),hl);return}const j=await api();if(j&&j.ok)renderBoard(j.top||[],hl)}catch(e){}}
  refresh();
  if(!demo){setInterval(()=>{if(!document.hidden&&!busy)refresh()},45000);document.addEventListener("visibilitychange",()=>{if(!document.hidden&&!busy)refresh()})}

  /* ----- pay ----- */
  const say=(m,k)=>{status.className="bb-status "+(k||"");status.textContent=m||""};
  const lock=b=>{busy=b;$("#bbPay",el).disabled=b;$("#bbPay",el).classList.toggle("busy",b)};
  const nameNow=()=>$("#bbAnon",el).checked?"Anonymous Drinker":clean($("#bbName",el).value);
  $("#bbAnon",el).onchange=function(){$("#bbName",el).disabled=this.checked;$("#bbName",el).closest(".bb-field").classList.toggle("off",this.checked)};
  $("#bbForm",el).onsubmit=async e=>{e.preventDefault();if(busy)return;const t=TIERS[sel],name=nameNow();
    if(name.length<2){say("Add a name (2 to 20 characters) or tick “Keep me anonymous”.","err");$("#bbName",el).focus();return}
    say("");lock(true);
    try{
      if(demo){say("Pouring…","");await new Promise(r=>setTimeout(r,900));const a=demoGet(),k=name.toLowerCase(),m=a.find(x=>x.name.toLowerCase()===k);
        if(m){m.total+=t.amt;m.count=(m.count||0)+1}else a.push({name,total:t.amt,count:1});demoSet(a);done(name,t);renderBoard(a,name)}
      else{
        const o=await api({action:"order",amount:t.amt,name});if(!o.ok)throw new Error(o.error||"order");
        await loadRzp();
        await new Promise((res,rej)=>{const z=new Razorpay({key:o.keyId,amount:o.amount,currency:"INR",order_id:o.orderId,name:(S&&S.site_name)||"The Startup Graveyard",description:t.title+" · "+inr(t.amt),theme:{color:"#8C3B2E"},
          modal:{ondismiss:()=>rej(new Error("dismissed"))},
          handler:async r=>{try{say("Confirming your payment…","");const v=await api({action:"verify",orderId:r.razorpay_order_id,paymentId:r.razorpay_payment_id,signature:r.razorpay_signature});
            if(!v.ok)throw new Error(v.error||"verify");done(name,t);renderBoard(v.top||rows,name);res()}catch(er){rej(er)}}});
          z.on("payment.failed",()=>rej(new Error("failed")));z.open()});
      }
    }catch(er){say(er.message==="dismissed"?"Payment cancelled. No charge was made.":"That didn't go through. You have not been charged, or the payment will be refunded by your bank. Please try again.","err")}
    lock(false)};
  function loadRzp(){return window.Razorpay?Promise.resolve():new Promise((res,rej)=>{const s=document.createElement("script");s.src="https://checkout.razorpay.com/v1/checkout.js";s.onload=res;s.onerror=()=>rej(new Error("rzp"));document.head.appendChild(s)})}
  function done(name,t){say(`Cheers, ${name}! ${inr(t.amt)} received. You're on the wall.`,"ok");confetti();$("#bbName",el).value="";
    const g=$("#bbGlass",el);g.classList.remove("cheers");void g.offsetWidth;g.classList.add("cheers");
    if(!reduce&&!(window.innerWidth<900))list.scrollIntoView({behavior:"smooth",block:"nearest"})}
  function confetti(){if(reduce)return;const b=$("#bbPay",el).getBoundingClientRect(),cols=["#E3AE45","#C58A1F","#8C3B2E","#F6EFD9","#5B6670"];
    for(let i=0;i<46;i++){const p=document.createElement("i");p.className="bb-conf";const a=Math.random()*Math.PI-Math.PI,v=90+Math.random()*190;
      p.style.cssText=`left:${b.left+b.width/2}px;top:${b.top+b.height/2}px;background:${cols[i%5]};--x:${Math.cos(a)*v}px;--y:${Math.sin(a)*v-40}px;--r:${Math.random()*720-360}deg;width:${i%3?7:10}px;height:${i%3?10:6}px;border-radius:${i%4?1:50}%;animation-delay:${Math.random()*.08}s`;
      document.body.appendChild(p);setTimeout(()=>p.remove(),1500)}}
}
window.GYSupport={mount,TIERS};
})();
