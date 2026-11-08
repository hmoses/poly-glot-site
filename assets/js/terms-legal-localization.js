/* Critical Terms of Use paragraphs: explicit 38-language localization.
 * Uses published static catalogs only. No visitor text is sent to translators.
 * This protects subscription and warranty disclosures against legacy DOM rewrites.
 */
(function(){
"use strict";
var source={
  renewal:"There is no recurring free Send or free-template allowance after the trial. Apple manages billing and renewal; cancel in your Apple subscription settings to prevent future renewals. Legacy app-managed trials require separate Apple subscription authorization before any charges.",
  disclaimer:"The App is provided as-is without warranty of any kind. AI-generated responses are produced by third-party services and may contain errors. Poly-Glot is not responsible for AI output. Templates are provided for informational purposes only and do not constitute professional advice (legal, medical, financial, or otherwise)."
};
var ids={renewal:"pgTermsRenewalCopy",disclaimer:"pgTermsDisclaimerCopy"};
var pending={},sequence=0;
function lang(){
 var code=window._pgI18n&&window._pgI18n.curLang&&window._pgI18n.curLang();
 if(!code){try{code=new URLSearchParams(location.search).get("lang")||localStorage.getItem("pgLang");}catch(e){}}
 return String(code||"EN").replace("-","_").toUpperCase();
}
function load(code){
 if(code==="EN")return Promise.resolve(null);
 var existing=window._pgSecondaryExact&&window._pgSecondaryExact[code];
 if(existing&&typeof existing[source.renewal]==="string"&&typeof existing[source.disclaimer]==="string")return Promise.resolve(existing);
 if(!pending[code]){
  pending[code]=fetch("assets/locales/subpages/"+code.toLowerCase()+".json",{cache:"no-cache"}).then(function(r){
   if(!r.ok)throw Error("Terms locale "+code+" HTTP "+r.status);
   return r.json();
  }).catch(function(err){delete pending[code];console.warn("Terms locale unavailable:",err.message);return null;});
 }
 return pending[code];
}
function apply(){
 var code=lang(),ticket=++sequence;
 load(code).then(function(dict){
  if(ticket!==sequence||lang()!==code)return;
  Object.keys(ids).forEach(function(key){
   var el=document.getElementById(ids[key]);if(!el)return;
   var translated=code==="EN"?source[key]:dict&&dict[source[key]];
   if(typeof translated!=="string"||!translated.trim())return;
   if(el.textContent.trim()!==translated.trim())el.textContent=translated;
   el.setAttribute("dir",code==="AR"||code==="HE"?"rtl":"ltr");
  });
 }).catch(function(err){console.warn("Terms localization:",err.message);});
}
function schedule(){
 apply();
 setTimeout(apply,150);
 setTimeout(apply,700);
 setTimeout(apply,1800);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",schedule,{once:true});else schedule();
window.addEventListener("pg:languagechange",schedule);
window.addEventListener("pageshow",schedule);
window.addEventListener("pg:secondarycatalogready",schedule);
window._pgTermsLegalLocalization={apply:apply,keys:Object.keys(source)};
})();