/* Shared 38-language knowledge-guide localization; product facts remain unchanged. */
(function(){
"use strict";
var I=window._pgI18n;if(!I)return;
var mapping={
"compare-ai-tools.html":{title:"sc1H",lead:"sc1P",articles:[["fq4q","fq4a"],["fq5q","fq5a"],[null,null],[null,null]]},
"multilingual-ai-workspace.html":{title:"f5",lead:"f5p",articles:[["f5","f5p"],[null,null],[null,null],[null,null]]},
"prompt-templates.html":{title:"tplH",lead:"tplSub",articles:[["f1","f1p"],[null,null],[null,null],[null,null]]},
"mcp-integrations.html":{title:"mcpH",lead:"mcpSub",articles:[["fq10q","fq10a"],[null,null],[null,null],[null,null]]},
"privacy-and-pricing.html":{title:"prH",lead:"prSub",articles:[["fq3q",null],[null,null],["fq6q","fq6a"],[null,null]]}
};
var file=location.pathname.split("/").pop(),config=mapping[file];if(!config)return;
var linked=["sc1H","f5","tplH","mcpH","prH"];
var base=null;
function set(el,key,lang){if(!el||!key)return;var val=I.gt(key,lang);if(val)el.textContent=val.replace(/^[^\\p{L}\\p{N}]+/u,"").trim();}
function apply(){
var lang=I.curLang(),rtl=(lang==="AR"||lang==="HE");
document.documentElement.lang=lang==="ZH_TW"?"zh-Hant":lang.toLowerCase().replace("_","-");
document.querySelector("main")?.setAttribute("dir",rtl?"rtl":"ltr");
document.querySelector("footer")?.setAttribute("dir",rtl?"rtl":"ltr");
document.querySelector("nav")?.setAttribute("dir",rtl?"rtl":"ltr");
if(!base){base={title:document.querySelector("main h1")?.textContent,lead:document.querySelector("main .lead")?.textContent,nav:[...document.querySelectorAll("header nav a")].map(e=>e.textContent),faq:[...document.querySelectorAll("main article")].map(e=>[e.querySelector("h2")?.textContent,e.querySelector("p")?.textContent]),related:[...document.querySelectorAll(".related a")].map(e=>e.textContent)};}
var en=lang==="EN";
if(en){document.querySelector("main h1").textContent=base.title;document.querySelector("main .lead").textContent=base.lead;}
else{set(document.querySelector("main h1"),config.title,lang);set(document.querySelector("main .lead"),config.lead,lang);}
var nav=[...document.querySelectorAll("header nav a")],nk=["ftProd","ftConnect","ftSupp","navCTA"];nav.forEach(function(e,i){if(en)e.textContent=base.nav[i];else if(i>0)set(e,nk[i],lang);});
var articles=[...document.querySelectorAll("main article")];
articles.forEach(function(e,i){var keys=config.articles[i]||[];var h=e.querySelector("h2"),p=e.querySelector("p");if(en){h.textContent=base.faq[i][0];p.textContent=base.faq[i][1];}else{if(keys[0])set(h,keys[0],lang);if(keys[1])set(p,keys[1],lang);}});
var links=[...document.querySelectorAll(".related a")];links.forEach(function(e,i){if(en)e.textContent=base.related[i];else set(e,linked[i],lang);});
if(!en){set(document.querySelector(".related h2"),"ftProd",lang);set(document.querySelector(".eyebrow"),"fqH",lang);}
else{document.querySelector(".related h2").textContent="Explore related topics";document.querySelector(".eyebrow").textContent="Poly-Glot knowledge center";}
document.querySelector("section[aria-label]")?.setAttribute("aria-label",en?"Frequently asked questions":I.gt("fqH",lang));
}
function start(){apply();window.addEventListener("pg:languagechange",apply);}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});else start();
})();