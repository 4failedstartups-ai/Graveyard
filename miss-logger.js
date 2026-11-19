// Add to ledger.html (after the Supabase client exists). Call logMiss(term) whenever a search returns 0 results.
// SB_URL / SB_KEY = same project URL and anon key already used in data.js.
(function(){
  var seen = {};
  window.logMiss = function(term){
    try{
      term = (term||'').trim().toLowerCase();
      if(term.length < 2 || term.length > 80 || seen[term]) return;
      seen[term] = 1;                       // once per term per page visit
      fetch(SB_URL + '/rest/v1/rpc/log_search_miss', {
        method:'POST',
        headers:{'Content-Type':'application/json', apikey:SB_KEY, Authorization:'Bearer '+SB_KEY},
        body: JSON.stringify({p_term: term}), keepalive:true
      });
    }catch(e){}
  };
})();
// Usage: in your search handler, after filtering:
//   if(results.length === 0) { clearTimeout(window._mt); window._mt = setTimeout(function(){ logMiss(query); }, 1200); }
// The 1.2s wait stops half-typed words ("pe", "pet", "pet t") from being logged.
