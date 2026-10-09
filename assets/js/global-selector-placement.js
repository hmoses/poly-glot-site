/* Match the homepage language-selector placement: immediately beside the brand. */
(function(){
function place(){
 var picker=document.getElementById("pgGlobalLangPicker");if(!picker)return;
 var brand=document.querySelector("nav .nav-brand, nav a[href='./'], nav a[href='/'], nav .nav-title");
 var host=brand&&brand.parentElement;
 if(!host){host=document.querySelector("nav .container, header .wrap, nav, header");}
 if(!host){host=document.body;host.insertBefore(picker,host.firstChild);}
 else if(brand&&brand.nextSibling)host.insertBefore(picker,brand.nextSibling);
 else host.appendChild(picker);
 if(host!==document.body){host.style.setProperty("display","flex","important");host.style.setProperty("align-items","center","important");host.style.setProperty("flex-wrap","wrap","important");host.style.setProperty("gap","12px","important");}
 ["position","top","right","bottom","left","margin"].forEach(function(p){picker.style.setProperty(p,p==="position"?"relative":p==="margin"?"0":"auto","important");});
 picker.style.setProperty("z-index","99999","important");
 // The homepage i18n.js owns the one canonical flag/code list.
 var api=window._pgI18n,btn=document.getElementById("pgGlobalLangBtn");
 if(api&&btn){
  var lang=api.curLang(),entry=api.LANGS.find(function(x){return x.code===lang;})||api.LANGS[0];
  var flag=document.getElementById("pgGlobalFlag"),code=document.getElementById("pgGlobalCode");
  if(flag)flag.textContent=entry.flag;
  if(code)code.textContent=entry.code;
  btn.setAttribute("aria-label","Language: "+entry.name);
  btn.setAttribute("title",entry.name);
  document.querySelectorAll("#pgGlobalLangDD .pgGlob-row").forEach(function(row){
   var value=api.LANGS.find(function(x){return x.code===row.getAttribute("data-lang");});
   if(!value)return;
   var glyph=row.querySelector(".gf");if(glyph)glyph.textContent=value.flag;
   row.setAttribute("aria-label",value.name+" ("+value.code+")");
  });
 }
 var dd=document.getElementById("pgGlobalLangDD");
 if(dd){dd.style.setProperty("z-index","2147483001","important");}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",place,{once:true});else place();
window.addEventListener("pg:languagechange",place);
/* Carry language in local links as well as localStorage; preserves existing hashes. */
document.addEventListener("click",function(ev){
 var a=ev.target.closest&&ev.target.closest("a[href]");if(!a||ev.defaultPrevented||ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey||a.target==="_blank"||a.hasAttribute("download"))return;
 var href=a.getAttribute("href");if(!href||href.startsWith("#")||href.startsWith("mailto:")||href.startsWith("javascript:"))return;
 try{
  var url=new URL(a.href,location.href);
  if(url.origin!==location.origin||!url.pathname.startsWith("/poly-glot-site/"))return;
  var code=window._pgI18n&&window._pgI18n.curLang();if(code&&code!=="EN")url.searchParams.set("lang",code);else url.searchParams.delete("lang");
  a.href=url.pathname+url.search+url.hash;
 }catch(e){}
},true);
/* Load static per-language copy for ALL secondary page surfaces.
 * The published translation catalogs are generated at build time; no visitor text
 * is sent to a translation service. */
var pgEnglishSourceReady=fetch(new URL("assets/locales/subpages/en.json",location.href),{cache:"force-cache"})
 .then(function(r){if(!r.ok)throw Error("English catalog unavailable");return r.json();})
 .then(function(source){
   if(!Array.isArray(source))throw Error("Invalid English source catalog");
   window._pgEnglishSourceSet=new Set(source);
   window._pgSecondaryLocalization?.apply();
   window.dispatchEvent(new CustomEvent("pg:secondarycatalogready",{detail:{language:lang}}));
 })
 .catch(function(e){console.warn("Poly-Glot source catalog:",e.message);});
var pgLocaleRequests={};
function pgLoadSecondaryLocale(){
 var i=window._pgI18n;if(!i)return;
 var lang=i.curLang();
 if(lang==="EN")return;
 window._pgSecondaryExact=window._pgSecondaryExact||{};
 if(pgLocaleRequests[lang]){pgLocaleRequests[lang].then(function(){window._pgSecondaryLocalization?.apply();});return;}
 var url=new URL("assets/locales/subpages/"+lang.toLowerCase()+".json",location.href);
 pgLocaleRequests[lang]=fetch(url.toString(),{cache:"no-cache"}).then(function(response){
   if(!response.ok)throw Error("Missing static translations: "+response.status);
   return response.json();
 }).then(function(dict){
   if(!dict||typeof dict!=="object"||Array.isArray(dict))throw Error("Invalid locale catalog");
   window._pgSecondaryExact[lang]=Object.assign({},dict,window._pgSecondaryExact[lang]||{}); // Preserve curated translations over generated equivalents
   window._pgSecondaryLocalization?.apply();
 }).catch(function(err){delete pgLocaleRequests[lang];console.warn("Poly-Glot secondary locale:",err.message);});
}
window.addEventListener("pg:languagechange",pgLoadSecondaryLocale);
window.addEventListener("pageshow",pgLoadSecondaryLocale);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",pgLoadSecondaryLocale,{once:true});else pgLoadSecondaryLocale();
})();