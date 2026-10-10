/* Localize every visible MCP troubleshooting text node in 38 site languages.
 * Preserve all HTML and Apple-style motion cards, anchors, code, summary and details.
 * Static English remains available to no-JS visitors and search crawlers.
 */
(function(){
"use strict";
var root=null,items=[],original=new WeakMap(),cache=new Map(),serial=0;
function current(){var i=window._pgI18n;return i&&typeof i.curLang==="function"?i.curLang():"EN";}
function translatable(el){
 var walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
 var nodes=[],node;
 while((node=walker.nextNode())){
  if(!node.nodeValue.trim())continue;
  var ancestor=node.parentElement;
  if(ancestor&&ancestor.closest("code,pre,script,style,textarea,svg,[data-no-translate]"))continue;
  nodes.push(node);
 }
 return nodes;
}
function collect(){
 root=document.getElementById("mcp-troubleshooting");
 if(!root||items.length)return;
 root.querySelectorAll("[data-mcp-tr]").forEach(function(el){
  var nodes=translatable(el);
  nodes.forEach(function(n){original.set(n,n.nodeValue);});
  items.push({key:el.getAttribute("data-mcp-tr"),nodes:nodes,el:el});
 });
}
function setLanguage(code,dict){
 collect();if(!root||code!==current())return;
 var completed=0;
 items.forEach(function(item){
  var strings=dict&&dict[item.key],usable=Array.isArray(strings)&&strings.length===item.nodes.length&&strings.every(function(t){return typeof t==="string"&&!!t.trim();});
  if(usable)completed++;
  // Current Claude setup is rendered by the dedicated 38-language guide.
  // Keep it in coverage accounting but do not overwrite the current UI path.
  if(item.key==="clientClaude"&&window._pgClaudeGuide)return;
  item.nodes.forEach(function(node,i){
   var raw=original.get(node);
   if(raw==null)return;
   var match=raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
   var translated=code!=="EN"&&usable?strings[i]:null;
   var value=translated!=null?match[1]+translated+match[3]:raw;
   if(node.nodeValue!==value)node.nodeValue=value;
  });
 });
 root.setAttribute("dir",code==="AR"||code==="HE"?"rtl":"ltr");
 root.setAttribute("data-mcp-translation",code==="EN"?"english":completed===items.length?"complete":"partial");
 root.setAttribute("data-mcp-translation-count",String(completed));
 root.setAttribute("data-mcp-active-language",code);
 // The visible translated labels also label the endpoint group and button
 // for screen readers; raw HTTPS configuration text is never translated.
 var group=root.querySelector(".mcp-endpoint");
 var endpoint=root.querySelector('[data-mcp-tr="endpointLabel"]');
 if(group&&endpoint)group.setAttribute("aria-label",endpoint.textContent.trim());
 var button=root.querySelector("#pgMcpTroubleCopy");
 if(button)button.setAttribute("aria-label",button.textContent.trim());

}
function load(code){
 if(cache.has(code))return cache.get(code);
 var file="assets/locales/mcp-troubleshooting/"+code.toLowerCase()+".json?v=20261010-2";
 var p=fetch(file,{cache:"no-store"}).then(function(resp){
  if(!resp.ok)throw Error("Missing "+code+" locale: HTTP "+resp.status);
  return resp.json();
 }).then(function(data){
  if(data.language!==code||!data.strings||typeof data.strings!=="object")throw Error("Invalid locale file "+code);
  return data.strings;
 }).catch(function(e){console.warn("[Poly-Glot troubleshooting locale]",e.message);cache.delete(code);return null;});
 cache.set(code,p);return p;
}
function apply(){
 collect();if(!root)return;
 var code=current(),request=++serial;
 if(code==="EN"){setLanguage(code,null);return;}
 load(code).then(function(dict){if(serial===request)setLanguage(code,dict);});
}
function copy(){
 var el=document.getElementById("pgMcpTroubleEndpoint"),message=document.getElementById("pgMcpTroubleCopyStatus");if(!el)return;
 var value=el.textContent.trim(),code=current(),labels={"EN":"Copied","ES":"Copiado","FR":"Copié","DE":"Kopiert","IT":"Copiato","PT":"Copiado","NL":"Gekopieerd","RU":"Скопировано","ZH":"已复制","ZH_TW":"已複製","JA":"コピーしました","KO":"복사됨","AR":"تم النسخ","HI":"कॉपी किया गया","BN":"কপি হয়েছে","TR":"Kopyalandı","PL":"Skopiowano","SV":"Kopierat","NO":"Kopiert","DA":"Kopieret","FI":"Kopioitu","EL":"Αντιγράφηκε","HE":"הועתק","ID":"Tersalin","MS":"Disalin","TH":"คัดลอกแล้ว","VI":"Đã sao chép","UK":"Скопійовано","CS":"Zkopírováno","RO":"Copiat","HU":"Másolva","SK":"Skopírované","HR":"Kopirano","CA":"Copiat","AF":"Gekopieer","SW":"Imenakiliwa","HA":"An kwafa","AM":"ተቀድቷል"};
 function done(ok){if(message)message.textContent=ok?(labels[code]||labels.EN):"✕ "+(document.getElementById("pgMcpTroubleCopy")?.textContent.trim()||"Copy"); }
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(value).then(function(){done(true);},function(){done(false);});return;}
 var field=document.createElement("textarea");field.value=value;field.style.position="fixed";field.style.left="-10000px";document.body.appendChild(field);field.select();var success=false;try{success=document.execCommand("copy");}catch(_e){}field.remove();done(success);
}
function start(){collect();var btn=document.getElementById("pgMcpTroubleCopy");if(btn&&!btn.__pgBound){btn.addEventListener("click",copy);btn.__pgBound=true;}apply();}
window.addEventListener("pg:languagechange",function(){setTimeout(apply,0);setTimeout(apply,180);});
window.addEventListener("pageshow",apply);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
window._pgMcpTroubleshootLocale={apply:apply,language:current,count:function(){return items.length;},coverage:function(){return root&&root.getAttribute("data-mcp-translation-count");}};
})();