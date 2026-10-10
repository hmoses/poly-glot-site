/* Poly-Glot MCP troubleshooting: 38-language site selector and curated static locale catalogs.
 * English HTML remains server-rendered for bots, accessibility and no-JS visitors.
 * Each full translated catalog is keyed by the stable data-mcp-tr identifiers.
 */
(function(){
"use strict";
var root=document.getElementById("mcp-troubleshooting");
var elements=[],base=new Map(),renderVersion=0,activeLanguage="",loading=new Map();
function ready(){root=document.getElementById("mcp-troubleshooting");return !!root;}
function locale(){var p=window._pgI18n;return p&&typeof p.curLang==="function"?p.curLang():"EN";}
function preserve(){
  if(!ready()||elements.length)return;
  elements=Array.from(root.querySelectorAll("[data-mcp-tr]"));
  elements.forEach(function(el){base.set(el,el.innerHTML);});
}
function translatedKeyCount(dict){return elements.filter(function(el){return typeof dict[el.dataset.mcpTr]==="string"&&dict[el.dataset.mcpTr].trim();}).length;}
function applyLanguage(code,data){
  if(!ready())return;
  preserve();
  if(locale()!==code)return;
  root.setAttribute("dir",(code==="AR"||code==="HE")?"rtl":"ltr");
  elements.forEach(function(el){
    var translated=data&&data[el.dataset.mcpTr];
    if(code!=="EN"&&typeof translated==="string"&&translated.trim()){
      // textContent prevents a machine-translated string from becoming executable markup.
      if(el.textContent!==translated)el.textContent=translated;
    } else if(el.innerHTML!==base.get(el)) el.innerHTML=base.get(el);
  });
  activeLanguage=code;
  root.setAttribute("data-mcp-translation",code==="EN"?"english":(data&&translatedKeyCount(data)===elements.length?"complete":"partial"));
  root.setAttribute("data-mcp-translation-count",String(data?translatedKeyCount(data):0));
  // The site language picker remains the only language source of truth.
}
function load(code){
  if(code==="EN")return Promise.resolve(null);
  if(loading.has(code))return loading.get(code);
  var file="assets/locales/mcp-troubleshooting/"+code.toLowerCase()+".json?v=20261010-full1";
  var p=fetch(file,{cache:"no-cache"}).then(function(res){
    if(!res.ok)throw new Error("MCP guide locale not published: "+code+" / HTTP "+res.status);
    return res.json();
  }).then(function(obj){
    if(!obj||obj.language!==code||!obj.strings||typeof obj.strings!=="object")throw new Error("Invalid locale payload "+code);
    return obj.strings;
  }).catch(function(){return null;});
  loading.set(code,p);
  return p;
}
function apply(){
  if(!ready())return;
  preserve();
  var code=locale(),version=++renderVersion;
  if(code==="EN"){applyLanguage(code,null);return;}
  load(code).then(function(data){if(version===renderVersion)applyLanguage(code,data);});
}
function copyEndpoint(){
  var el=document.getElementById("pgMcpTroubleEndpoint"),result=document.getElementById("pgMcpTroubleCopyStatus");
  if(!el)return;
  var content=el.textContent.trim();
  var text=locale()==="ES"?"Copiado":locale()==="FR"?"Copié":locale()==="DE"?"Kopiert":locale()==="AR"?"تم النسخ":locale()==="HE"?"הועתק":locale()==="ZH"?"已复制":locale()==="ZH_TW"?"已複製":locale()==="JA"?"コピーしました":locale()==="KO"?"복사됨":"Copied";
  function setStatus(ok){if(result)result.textContent=ok?text:"Select and copy the URL above";}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(content).then(function(){setStatus(true);},function(){setStatus(false);});return;}
  var input=document.createElement("textarea");input.value=content;input.style.position="fixed";input.style.left="-9999px";document.body.appendChild(input);input.select();
  var ok=false;try{ok=document.execCommand("copy");}catch(_e){}input.remove();setStatus(ok);
}
function start(){if(!ready())return;preserve();var btn=document.getElementById("pgMcpTroubleCopy");if(btn&&!btn.__pgBound){btn.addEventListener("click",copyEndpoint);btn.__pgBound=true;}apply();}
window.addEventListener("pg:languagechange",function(){setTimeout(apply,30);setTimeout(apply,200);});
window.addEventListener("pageshow",apply);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
window._pgMcpTroubleshootLocale={apply:apply,language:function(){return activeLanguage;},count:function(){return elements.length;},coverage:function(){return root?root.getAttribute("data-mcp-translation-count"):null;}};
})();