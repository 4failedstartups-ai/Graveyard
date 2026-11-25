/* Failed Startups: public data layer (Supabase, read-only, published rows only).
   The anon key below is MEANT to be public. Row Level Security lets it read only
   published startups, so it can never change or expose anything else. */
(function(){
var CFG=window.GY_CFG=window.GY_CFG||{
  url:"https://uveospgmehgarerlquav.supabase.co",
  key:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2ZW9zcGdtZWhnYXJlcmxxdWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwMTk4NDAsImV4cCI6MjExMDU5NTg0MH0.yM4-8cod1TkXtxJHZNXqyWOsaL7EPZqkEk07Sb9XrCc"
};
function get(path){
  return fetch(CFG.url+"/rest/v1/"+path,{headers:{apikey:CFG.key,Authorization:"Bearer "+CFG.key},cache:"no-store"})
    .then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json()});
}
function j(a){return Array.isArray(a)?a.join(", "):(a||"")}
// Turn a database row into the shape the pages already understand.
function toRow(s){
  return {
    "Startup Name":s.name,"Tagline / Description":s.tagline||"","Headquarters":s.headquarters||"",
    "Founded In":s.founded_year!=null?String(s.founded_year):"","Shutdown Year":s.shutdown_year!=null?String(s.shutdown_year):"",
    "Funding Amount":s.funding_amount||"","Funding USD":s.funding_usd!=null?Number(s.funding_usd):null,
    "Funding Stage":s.funding_stage||"","Business Model":s.business_model||"","Founders":j(s.founders),
    "Sector":s.sector||"","Team Size":s.team_size||"","Primary Competition":s.competitors||"",
    "Key Investors":s.key_investors||"","User Base":s.user_base||"","Logo URL":s.logo_url||"","Website URL":s.website_url||"",
    "Status":s.status_text||"Failed","Tags":j(s.tags),"Underlying Tech":s.underlying_tech||"",
    "Failure Reason":s.failure_reason||"","Epitaph / Key Lesson":s.epitaph||"","Post-Mortem URL":s.postmortem_url||"",
    "Visible":"Yes"
  };
}
var GY=window.GY_DB={
  startups:function(){
    return get("startups?select=*&status=eq.published&order=name.asc&limit=5000").then(function(a){
      var rows=a.map(toRow);try{localStorage.setItem("gy_db_rows",JSON.stringify(rows))}catch(e){}return rows;
    });
  },
  cached:function(){try{return JSON.parse(localStorage.getItem("gy_db_rows"))||[]}catch(e){return[]}},
  founders:function(){
    return get("founders?select=name,linkedin_url&limit=5000").then(function(a){
      var m={};a.forEach(function(f){m[f.name.toLowerCase()]={displayName:f.name,linkedin:f.linkedin_url||"",businesses:[]}});return m;
    });
  },
  // Site text (Settings, Nav, Pages, Team, Highlights) edited from the console. Returned in the same
  // shape the Google Sheet tabs used, so the page code does not care where the text came from.
  site:function(name){
    var T={settings:"site_settings",nav:"site_nav",pages:"site_pages",team:"site_team",highlights:"site_highlights"}[name];
    if(!T)return Promise.reject(new Error("unknown tab "+name));
    var ctl=window.AbortController?new AbortController():null,timer=ctl&&setTimeout(function(){ctl.abort()},5000);
    return fetch(CFG.url+"/rest/v1/"+T+"?select=*&limit=2000",{headers:{apikey:CFG.key,Authorization:"Bearer "+CFG.key},cache:"no-store",signal:ctl&&ctl.signal})
      .then(function(r){clearTimeout(timer);if(!r.ok)throw new Error("HTTP "+r.status);return r.json()})
      .then(function(a){
        var o=function(r){return r.sort_order!=null?r.sort_order:(r.sort!=null?r.sort:99)};
        var v=function(r){return r.visible===false?"No":"Yes"};
        if(name==="settings")return a.map(function(r){return{Key:r.key,Value:r.value==null?"":r.value}});
        if(name==="nav")return a.map(function(r){return{Label:r.label,URL:r.url,Location:r.location,Group:r.grp||"",Order:o(r),Visible:v(r)}});
        if(name==="pages")return a.map(function(r){return{Page:r.page,Order:o(r),Heading:r.heading||"",Body:r.body||"",Link:r.link||"",Visible:v(r)}});
        if(name==="team")return a.map(function(r){return{Name:r.name,Role:r.role||"",Bio:r.bio||"","Photo URL":r.photo_url||"",LinkedIn:r.linkedin||"",Order:o(r),Visible:v(r)}});
        return a.map(function(r){return{Value:r.value,Label:r.label,Order:o(r),Visible:v(r)}});
      });
  },
  // value for the "Capital burned" stat: sums only real USD numbers
  usd:function(r){return typeof r["Funding USD"]==="number"&&isFinite(r["Funding USD"])?r["Funding USD"]:0}
};
})();
