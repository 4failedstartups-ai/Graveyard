/* Loading screen: shows the logo until the page is ready. Add ONE line to the <head> of every page:
   <script src="preloader.js"></script>
   Shows once per visit (not on every page click). Add ?splash to the address to see it again. */
(function(){
  var KEY='gy_splash';
  try{ if(/[?&]splash\b/.test(location.search)) sessionStorage.removeItem(KEY); if(sessionStorage.getItem(KEY)) return; }catch(e){}
  var base=(document.currentScript&&document.currentScript.src||'').replace(/[^\/]*$/,'');
  var css='#ulSplash{position:fixed;inset:0;z-index:2147483000;background:#E8E1D3;display:grid;place-items:center;transition:opacity .55s ease,visibility .55s}'
   +'#ulSplash.out{opacity:0;visibility:hidden}'
   +'#ulSplash::before{content:"";position:absolute;width:70vmin;height:70vmin;border-radius:50%;background:radial-gradient(circle,rgba(140,59,46,.20),rgba(140,59,46,.06) 45%,transparent 68%);animation:ulsp-glow 3.2s ease-in-out infinite}'
   +'#ulSplash .in{position:relative;display:flex;flex-direction:column;align-items:center;gap:30px;animation:ulsp-in .8s cubic-bezier(.2,.8,.2,1) both}'
   +'#ulSplash img{width:min(270px,60vw);height:auto;display:block;animation:ulsp-float 2.6s ease-in-out infinite;filter:drop-shadow(0 12px 30px rgba(140,59,46,.25))}'
   +'#ulSplash .bar{width:min(170px,44vw);height:3px;border-radius:3px;background:rgba(34,30,26,.12);overflow:hidden}'
   +'#ulSplash .bar i{display:block;height:100%;width:42%;border-radius:3px;background:linear-gradient(90deg,#C1543C,#8C3B2E,#6b2c22);animation:ulsp-bar 1.25s cubic-bezier(.4,0,.2,1) infinite}'
   +'@keyframes ulsp-in{from{opacity:0;transform:scale(.94)}}'
   +'@keyframes ulsp-float{50%{transform:translateY(-7px)}}'
   +'@keyframes ulsp-glow{50%{transform:scale(1.12);opacity:.8}}'
   +'@keyframes ulsp-bar{0%{transform:translateX(-110%)}100%{transform:translateX(260%)}}'
   +'@media(prefers-reduced-motion:reduce){#ulSplash *,#ulSplash::before{animation:none!important}}';
  var st=document.createElement('style'); st.textContent=css; (document.head||document.documentElement).appendChild(st);
  var d=document.createElement('div'); d.id='ulSplash'; d.setAttribute('role','status'); d.setAttribute('aria-label','Loading');
  d.innerHTML='<div class="in"><img src="'+base+'gy-logo-full-light.png" alt="The Startup Graveyard"><div class="bar"><i></i></div></div>';
  document.documentElement.appendChild(d);
  var html=document.documentElement; html.style.overflow='hidden';
  var t0=Date.now(),loaded=false,ready=false,done=false;
  function out(){
    if(done) return; done=true;
    setTimeout(function(){
      d.className='out'; html.style.overflow='';
      try{ sessionStorage.setItem(KEY,'1'); }catch(e){}
      setTimeout(function(){ if(d.parentNode) d.parentNode.removeChild(d); },700);
    },Math.max(0,1000-(Date.now()-t0)));   // always visible for at least 1 second, so it never just flashes
  }
  function check(){ if(loaded&&ready) out(); }
  window.addEventListener('load',function(){ loaded=true; setTimeout(function(){ ready=true; check(); },2500); check(); });
  document.addEventListener('ul:ready',function(){ ready=true; check(); });
  setTimeout(out,7000);                      // safety net: never get stuck
})();
