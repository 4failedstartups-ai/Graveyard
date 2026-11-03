/* The Gazette: obituary-style home sections for the Graveyard.
   Called by site.js:  GZ.home(rows, settings, root)   (rows = visible Failed Startups rows) */
(function(){
"use strict";
const $=(s,r)=>(r||document).querySelector(s), $$=(s,r)=>[...(r||document).querySelectorAll(s)];
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cl=v=>{v=(v||"").trim();return v==="-"?"":v};
const pc=v=>String(v||"").trim().toLowerCase().replace(/(^|[\s\-'’.(\/])([a-zÀ-ɏ])/g,(m,a,b)=>a+b.toUpperCase());
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const fine=matchMedia("(hover:hover) and (pointer:fine)").matches;
const yr=r=>({b:parseInt(r["Founded In"]),d:parseInt(r["Shutdown Year"])});
const causes=r=>cl(r["Failure Reason"]).split(/[;|,]/).map(s=>pc(s)).filter(Boolean);
const nm=r=>cl(r["Startup Name"]);
const epi=r=>cl(r["Epitaph / Key Lesson"]);
const tick=(el,to,ms=900,pre="",suf="")=>{if(reduce){el.textContent=pre+to.toLocaleString("en-IN")+suf;return}
  let t0;const f=t=>{t0=t0||t;const p=Math.min((t-t0)/ms,1);el.textContent=pre+Math.round(to*(1-Math.pow(1-p,3))).toLocaleString("en-IN")+suf;if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)};

/* ---------- hero: tombstone yard with flickering candles, mist and pointer parallax ---------- */
function yard(hero){
  const stone=(x,w,h,k,d)=>{
    const t=k==="cross"?`<path d="M${x+w/2-5} 300v-${h}h-14v-12h14v-16h12v16h14v12h-14v${h}z"/>`
      :k==="round"?`<path d="M${x} 300v-${h-w/2}a${w/2} ${w/2} 0 0 1 ${w} 0v${h-w/2}z"/>`
      :`<path d="M${x} 300v-${h}h${w}v${h}z"/>`;
    return `<g class="gz-stone" style="--d:${d}s">${t}<path class="gz-rip" d="M${x+w*.28} ${300-h*.62}h${w*.44}M${x+w*.34} ${300-h*.52}h${w*.32}"/></g>`};
  const flame=(x,y,d)=>`<g class="gz-flame" style="--d:${d}s" transform="translate(${x} ${y})"><rect x="-4" y="0" width="8" height="16" rx="2" class="gz-wax"/><path class="gz-fl" d="M0 -3c5-6 5-12 0-19-5 7-5 13 0 19z"/><circle r="22" cy="-10" class="gz-glow"/></g>`;
  hero.insertAdjacentHTML("afterbegin",`<div class="gz-yard" aria-hidden="true"><div class="gz-mist"></div><div class="gz-mist m2"></div>
  <svg viewBox="0 0 520 320" preserveAspectRatio="xMaxYMax meet"><g class="gz-far">${stone(40,64,118,"round",0)}${stone(330,58,100,"flat",.3)}${stone(450,50,126,"round",.6)}</g>
  <g class="gz-near">${stone(120,78,150,"round",.15)}${stone(236,70,176,"cross",.4)}${stone(380,86,132,"flat",.7)}${flame(158,284,.2)}${flame(272,286,.9)}${flame(422,284,1.6)}</g>
  <path class="gz-ground" d="M0 300h520"/></svg></div>`);
  if(fine&&!reduce)hero.addEventListener("mousemove",e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    hero.style.setProperty("--px",x.toFixed(3));hero.style.setProperty("--py",y.toFixed(3))},{passive:true});
}

/* ---------- main ---------- */
function home(rows,S,root){
  const hero=$(".ul-hero",root||document);if(hero)yard(hero);
  const wrap=$("#gzAnchor");if(!wrap)return;
  const sec=$(".ul-sec");
  const html=rows&&rows.length?front(rows)+autopsy(rows)+wall(rows)+where():"";
  const box=document.createElement("div");box.id="gzRoot";box.innerHTML=html;
  (sec&&sec.parentNode?sec.parentNode:wrap.parentNode).insertBefore(box,sec||wrap);
  const sup=document.createElement("section");sup.className="ul-sec gz-supsec";sup.id="support";
  sup.innerHTML=`<div class="ul-wrap"><div id="gzSupport"></div></div>`;wrap.parentNode.insertBefore(sup,wrap);
  if(rows&&rows.length){wireFront(rows);wireAutopsy(rows);wireWall(rows)}
  magnet();
}

/* 1 / front page: obituary of the day + death toll by year */
function front(rows){
  const d=new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  return `<section class="ul-sec gz-front"><div class="ul-wrap">
  <div class="gz-dateline rv"><span>The Graveyard Gazette</span><i></i><span>${esc(d)}</span><i></i><span>${rows.length} laid to rest</span></div>
  <div class="gz-cols">
   <article class="gz-obit rv" id="gzObit"></article>
   <div class="gz-toll rv"><div class="ul-eyebrow">Death toll by year</div><h2>When the lights went out</h2>
    <div class="gz-chart" id="gzChart"></div><div class="gz-yearbox" id="gzYearBox"><p>Tap a year to see who went down.</p></div></div>
  </div></div></section>`;
}
function wireFront(rows){
  const pool=rows.filter(r=>epi(r)||cl(r["Tagline / Description"]));const list=pool.length?pool:rows;
  const doy=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);let i=doy%list.length;
  const lives=rows.map(r=>{const y=yr(r);return y.b&&y.d&&y.d>=y.b?y.d-y.b:0});const maxLife=Math.max(8,...lives);
  const box=$("#gzObit");
  const draw=(dir)=>{const r=list[i],y=yr(r),life=y.b&&y.d&&y.d>=y.b?y.d-y.b:null,cs=causes(r);
    box.classList.remove("swap");void box.offsetWidth;box.style.setProperty("--dir",dir||1);box.classList.add("swap");
    box.innerHTML=`<div class="gz-obit-top"><span>Obituary of the day</span><span>${i+1} / ${list.length}</span></div>
    <h3>${esc(pc(nm(r)))}</h3>
    <div class="gz-sub">${[cl(r.Sector),cl(r.Headquarters),cl(r["Funding Stage"])].filter(Boolean).map(esc).join(" · ")}</div>
    <div class="gz-life"><b>${y.b||"?"}</b><div class="gz-lifebar"><i style="--w:${life!=null?Math.max(6,life/maxLife*100):30}%"></i><em>${life!=null?life+" yr"+(life===1?"":"s"):"—"}</em></div><b>${y.d||"?"}</b></div>
    ${cl(r["Tagline / Description"])?`<p class="gz-desc">${esc(cl(r["Tagline / Description"]))}</p>`:""}
    ${epi(r)?`<blockquote>“${esc(epi(r))}”</blockquote>`:""}
    <div class="gz-cod"><span class="gz-stamp">Cause of death</span>${cs.length?cs.map(c=>`<span class="gz-chip">${esc(c)}</span>`).join(""):'<span class="gz-chip">Unknown</span>'}</div>
    <div class="gz-act"><button class="gz-candle" type="button" aria-pressed="false"><svg viewBox="0 0 24 34"><rect x="8" y="14" width="8" height="18" rx="2" class="wx"/><path class="fl" d="M12 11c4-5 4-9 0-14-4 5-4 9 0 14z"/></svg><span>Light a candle</span></button>
    <button class="gz-next" type="button">Another obituary →</button><a class="ul-link" href="graveyard.html">Full autopsy →</a></div><div class="gz-rip-msg" aria-live="polite"></div>`;
    $(".gz-candle",box).onclick=function(){const on=this.getAttribute("aria-pressed")!=="true";this.setAttribute("aria-pressed",on);
      $("span",this).textContent=on?"Candle lit":"Light a candle";$(".gz-rip-msg",box).textContent=on?"Rest in peace, "+pc(nm(r))+".":"";if(on)embers(this)};
    $(".gz-next",box).onclick=()=>{i=(i+1)%list.length;draw(1)};
  };draw(1);
  // death toll chart
  const by={};rows.forEach(r=>{const y=yr(r).d;if(y){(by[y]=by[y]||[]).push(r)}});
  const ys=Object.keys(by).map(Number).sort((a,b)=>a-b);const ch=$("#gzChart");
  if(!ys.length){ch.innerHTML="<p class='gz-empty'>No shutdown years in the sheet yet.</p>";return}
  const full=[];for(let y=ys[0];y<=ys[ys.length-1];y++)full.push(y);
  const mx=Math.max(...ys.map(y=>by[y].length)),peak=ys.find(y=>by[y].length===mx);
  const step=full.length>12?2:1;
  ch.innerHTML=full.map((y,k)=>{const n=(by[y]||[]).length;return `<button type="button" class="gz-col${y===peak?" peak":""}${n?"":" zero"}" data-y="${y}" style="--h:${n/mx*100}%;--k:${k}" aria-label="${y}: ${n} startups"><span class="n">${n||""}</span><i></i><span class="y">${k%step?"":"’"+String(y).slice(-2)}</span></button>`}).join("");
  const showYear=y=>{const rs=by[y]||[];$$(".gz-col",ch).forEach(b=>b.classList.toggle("on",+b.dataset.y===y));
    $("#gzYearBox").innerHTML=`<p><b>${y}</b> · ${rs.length} startup${rs.length===1?"":"s"} shut down${rs.length?":":"."}</p><div class="gz-pills">${rs.slice(0,14).map(r=>`<span>${esc(pc(nm(r)))}</span>`).join("")}${rs.length>14?`<span class="more">+${rs.length-14} more</span>`:""}</div>`};
  ch.onclick=e=>{const b=e.target.closest(".gz-col");if(b)showYear(+b.dataset.y)};
  showYear(peak);
}

/* 2 / autopsy: cause of death */
function autopsy(rows){
  return `<section class="ul-sec gz-aut"><div class="ul-wrap"><div class="gz-head rv"><div><div class="ul-eyebrow">The autopsy</div><h2>What actually kills startups</h2>
  <p class="ul-lead" style="margin-top:8px">Cause of death across every startup in the graveyard. Tap a cause to see the victims.</p></div></div>
  <div class="gz-causes rv" id="gzCauses"></div></div></section>`;
}
function wireAutopsy(rows){
  const m={};rows.forEach(r=>causes(r).forEach(c=>{(m[c]=m[c]||[]).push(r)}));
  const top=Object.entries(m).sort((a,b)=>b[1].length-a[1].length).slice(0,7);const el=$("#gzCauses");
  if(!top.length){el.innerHTML="<p class='gz-empty'>No failure reasons in the sheet yet.</p>";return}
  const mx=top[0][1].length;
  el.innerHTML=top.map(([c,rs],i)=>`<div class="gz-cause" style="--i:${i}"><button type="button" aria-expanded="false"><span class="rk">${String(i+1).padStart(2,"0")}</span><span class="nm">${esc(c)}</span>
   <span class="bar"><i style="--w:${rs.length/mx*100}%"></i></span><span class="ct">${rs.length}</span><span class="pc">${Math.round(rs.length/rows.length*100)}%</span></button>
   <div class="vic"><div>${rs.slice(0,12).map(r=>`<span>${esc(pc(nm(r)))}</span>`).join("")}${rs.length>12?`<span class="more">+${rs.length-12} more</span>`:""}</div></div></div>`).join("");
  el.onclick=e=>{const b=e.target.closest(".gz-cause button");if(!b)return;const p=b.parentNode,on=!p.classList.contains("open");
    $$(".gz-cause.open",el).forEach(x=>{x.classList.remove("open");$("button",x).setAttribute("aria-expanded","false")});if(on){p.classList.add("open");b.setAttribute("aria-expanded","true")}};
}

/* 3 / epitaph wall */
function wall(rows){
  return `<section class="ul-sec gz-wall"><div class="ul-wrap"><div class="gz-head rv"><div><div class="ul-eyebrow">Epitaph wall</div><h2>Last words, carved in paper</h2></div>
  <button class="ul-btn ghost gz-shuf" type="button">Shuffle ↻</button></div><div class="gz-slips" id="gzSlips"></div></div></section>`;
}
function wireWall(rows){
  const pool=rows.filter(epi);const box=$("#gzSlips");if(!pool.length){box.closest("section").hidden=true;return}
  const pick=()=>pool.slice().sort(()=>Math.random()-.5).slice(0,6);
  const draw=()=>{box.innerHTML=pick().map((r,i)=>`<figure class="gz-slip" style="--i:${i};--r:${((i*37)%7-3)*.6}deg"><blockquote>“${esc(epi(r))}”</blockquote><figcaption><b>${esc(pc(nm(r)))}</b><span>${esc(cl(r["Shutdown Year"]))}${causes(r)[0]?" · "+esc(causes(r)[0]):""}</span></figcaption></figure>`).join("")};
  draw();$(".gz-shuf").onclick=draw;
  box.addEventListener("mousemove",e=>{const s=e.target.closest(".gz-slip");if(!s)return;const r=s.getBoundingClientRect();s.style.setProperty("--mx",e.clientX-r.left+"px");s.style.setProperty("--my",e.clientY-r.top+"px")});
}

/* 4 / heat map teaser */
function where(){
  const dots=Array.from({length:60},(_,i)=>`<i style="--d:${(i*53%17)/10}s;--o:${.15+((i*29)%10)/14}"></i>`).join("");
  return `<section class="ul-sec"><div class="ul-wrap"><a class="gz-map rv" href="graveyard.html#heatmap"><div class="gz-dots" aria-hidden="true">${dots}</div>
  <div><div class="ul-eyebrow">Geography of failure</div><h2>Where do Indian startups die?</h2><p class="ul-lead">State by state, city by city. Open the heat map and find out which ecosystems have the biggest graveyards.</p><span class="ul-more" style="display:inline-block;margin-top:18px;font:600 13px var(--mono);color:var(--gold)">Open the heat map →</span></div></a></div></section>`;
}

/* ---------- shared fx ---------- */
function embers(btn){if(reduce)return;const r=btn.getBoundingClientRect();
  for(let k=0;k<10;k++){const e=document.createElement("i");e.className="gz-ember";const a=(k/10)*Math.PI*2;
    e.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+8}px;--x:${Math.cos(a)*(22+Math.random()*26)}px;--y:${-30-Math.random()*50}px`;document.body.appendChild(e);setTimeout(()=>e.remove(),1100)}}
function magnet(){if(!fine||reduce)return;
  document.addEventListener("mousemove",e=>{const b=e.target.closest&&e.target.closest(".ul-btn:not(.ghost),.bb-pay");
    $$(".gz-mag").forEach(x=>{if(x!==b){x.style.transform="";x.classList.remove("gz-mag")}});
    if(!b||b.disabled)return;const r=b.getBoundingClientRect();b.classList.add("gz-mag");
    b.style.transform=`translate(${((e.clientX-r.left)/r.width-.5)*8}px,${((e.clientY-r.top)/r.height-.5)*6}px)`},{passive:true});}

window.GZ={home,tick,embers};
})();
