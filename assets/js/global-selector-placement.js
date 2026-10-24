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
/* Smooth cross-page navigation without delaying links or hiding content. */
(function(){
 if(document.getElementById("pgSmoothTransitions"))return;
 var style=document.createElement("style");style.id="pgSmoothTransitions";
 style.textContent="@media (prefers-reduced-motion: no-preference){html{scroll-behavior:smooth}body{animation:pgPageEnter .22s ease-out both}@keyframes pgPageEnter{from{opacity:.72;transform:translateY(3px)}to{opacity:1;transform:none}}a,button{transition:background-color .16s ease,color .16s ease,border-color .16s ease,box-shadow .16s ease} }@media (prefers-reduced-motion: reduce){html{scroll-behavior:auto!important}body{animation:none!important}}";
 document.head.appendChild(style);
 if("startViewTransition" in document){
  document.addEventListener("click",function(e){
   var a=e.target.closest?.("a[href]");if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target==="_blank"||a.hasAttribute("download"))return;
   try{var u=new URL(a.href,location.href);if(u.origin!==location.origin||u.pathname!==location.pathname||!u.hash)return;
    var target=document.getElementById(decodeURIComponent(u.hash.slice(1)));if(!target)return;
    // Native anchor scrolling stays in control; CSS smooth scrolling handles motion.
   }catch(_){}
  },false);
 }
})();
/* Load static per-language copy for ALL secondary page surfaces.
 * The published translation catalogs are generated at build time; no visitor text
 * is sent to a translation service. */
/* Defensive locale application for cached pages and late-rendered cards.
 * Uses the existing 38 reviewed locale catalogs, not machine translation.
 * Never changes URLs, MCP configuration, code blocks or interactive inputs. */
var pgDirectOriginal=new WeakMap(),pgDirectNodes=new Set(),pgCurrentCatalogs={};
function pgTrim(v){return String(v||"").replace(/\s+/g," ").trim();}
function pgApplyCatalogFallback(lang,dict){
 if(!document.body)return;
 var noTranslate="script,style,noscript,pre,code,textarea,svg,.code-block,.hljs,.language-json,#pgGlobalLangDD,#pgGlobalLangPicker,#pgChat,[data-no-translate],[data-i18n],[data-i18n-html],[data-pg-tech],[data-pg-funnel],[contenteditable]";
 var nodes=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),node;
 while((node=nodes.nextNode())){
  var parent=node.parentElement;if(!parent||parent.closest(noTranslate))continue;
  var old=pgDirectOriginal.get(node),english=old?old.key:pgTrim(node.nodeValue);
  if(!english||!/[A-Za-z]/.test(english)||/^https?:/i.test(english))continue;
  if(!old&&!(dict&&Object.prototype.hasOwnProperty.call(dict,english)))continue;
  if(!old){old={raw:node.nodeValue,key:english};pgDirectOriginal.set(node,old);pgDirectNodes.add(node);}
  var value=lang!=="EN"&&dict&&dict[old.key];
  if(typeof value!=="string"||!pgTrim(value))value=null;
  var target=old.raw;
  if(value){
    var space=old.raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
    target=(space?space[1]:"")+value+(space?space[3]:"");
  }
  if(node.nodeValue!==target)node.nodeValue=target;
 }
 // Include nodes whose current text no longer matches the English source.
 pgDirectNodes.forEach(function(n){
  if(!n.isConnected){pgDirectNodes.delete(n);return;}
  var info=pgDirectOriginal.get(n),parent=n.parentElement;
  if(!info||!parent||parent.closest(noTranslate))return;
  var translated=lang!=="EN"&&dict&&dict[info.key];
  var match=info.raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
  var next=typeof translated==="string"&&pgTrim(translated)?(match?match[1]:"")+translated+(match?match[3]:""):info.raw;
  if(n.nodeValue!==next)n.nodeValue=next;
 });
}
function pgApplySecondaryLocale(lang){
 if(window._pgI18n&&window._pgI18n.curLang()!==lang)return;
 if(window._pgSecondaryLocalization&&typeof window._pgSecondaryLocalization.apply==="function")window._pgSecondaryLocalization.apply();
 pgApplyCatalogFallback(lang,pgCurrentCatalogs[lang]||null);
}
var pgEnglishSourceReady=fetch(new URL("assets/locales/subpages/en.json",location.href),{cache:"force-cache"})
 .then(function(r){if(!r.ok)throw Error("English catalog unavailable");return r.json();})
 .then(function(source){
   if(!Array.isArray(source))throw Error("Invalid English source catalog");
   window._pgEnglishSourceSet=new Set(source);
   window._pgSecondaryLocalization?.apply();
   window.dispatchEvent(new CustomEvent("pg:secondarycatalogready",{detail:{language:window._pgI18n?.curLang?.()||"EN"}}));
 })
 .catch(function(e){console.warn("Poly-Glot source catalog:",e.message);});
var pgLocaleRequests={};
function pgLoadSecondaryLocale(){
 var i=window._pgI18n;if(!i)return;
 var lang=i.curLang();
 if(lang==="EN"){pgApplySecondaryLocale("EN");return;}
 window._pgSecondaryExact=window._pgSecondaryExact||{};
 if(pgLocaleRequests[lang]){pgLocaleRequests[lang].then(function(){pgApplySecondaryLocale(lang);});return;}
 var url=new URL("assets/locales/subpages/"+lang.toLowerCase()+".json",location.href);
 pgLocaleRequests[lang]=fetch(url.toString(),{cache:"no-cache"}).then(function(response){
   if(!response.ok)throw Error("Missing static translations: "+response.status);
   return response.json();
 }).then(function(dict){
   if(!dict||typeof dict!=="object"||Array.isArray(dict))throw Error("Invalid locale catalog");
   window._pgSecondaryExact[lang]=Object.assign({},dict,window._pgSecondaryExact[lang]||{}); // Preserve curated translations over generated equivalents
   pgCurrentCatalogs[lang]=window._pgSecondaryExact[lang];
   pgApplySecondaryLocale(lang);
 }).catch(function(err){delete pgLocaleRequests[lang];console.warn("Poly-Glot secondary locale:",err.message);});
}
window.addEventListener("pg:languagechange",pgLoadSecondaryLocale);
window.addEventListener("pageshow",pgLoadSecondaryLocale);
window.addEventListener("pg:secondarycatalogready",function(){pgLoadSecondaryLocale();});
window.addEventListener("pg:languagechange",function(){var lang=window._pgI18n?.curLang?.()||"EN";setTimeout(function(){pgApplySecondaryLocale(lang);},200);});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",pgLoadSecondaryLocale,{once:true});else pgLoadSecondaryLocale();
})();