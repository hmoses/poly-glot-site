/* Localize website FAQ updates and post-trial access notice without changing entitlements. */
(function(){
"use strict";
var AFTER={"ES":"Después de la prueba de 3 días:","FR":"Après l’essai de 3 jours :","DE":"Nach der 3-tägigen Testphase:","IT":"Dopo la prova di 3 giorni:","PT":"Após o teste de 3 dias:","NL":"Na de proefperiode van 3 dagen:","RU":"После 3-дневной пробы:","ZH":"3 天试用结束后：","ZH_TW":"3 天試用結束後：","JA":"3 日間の試用後：","KO":"3일 체험 후:","AR":"بعد التجربة لمدة 3 أيام:","HI":"3 दिन के ट्रायल के बाद:","BN":"৩ দিনের ট্রায়ালের পর:","TR":"3 günlük denemeden sonra:","PL":"Po 3-dniowej próbie:","SV":"Efter 3 dagars provperiod:","NO":"Etter 3 dagers prøveperiode:","DA":"Efter 3 dages prøveperiode:","FI":"Kolmen päivän kokeilun jälkeen:","EL":"Μετά τη δοκιμή 3 ημερών:","HE":"לאחר ניסיון של 3 ימים:","ID":"Setelah uji coba 3 hari:","MS":"Selepas percubaan 3 hari:","TH":"หลังทดลองใช้ฟรี 3 วัน:","VI":"Sau 3 ngày dùng thử:","UK":"Після триденної пробної версії:","CS":"Po 3denní zkoušce:","RO":"După testul de 3 zile:","HU":"A 3 napos próba után:","SK":"Po 3-dňovej skúške:","HR":"Nakon 3 dana probe:","CA":"Després de la prova de 3 dies:","AF":"Ná die proeftydperk van 3 dae:","SW":"Baada ya majaribio ya siku 3:","HA":"Bayan gwajin kwanaki 3:","AM":"ከ3 ቀናት ሙከራ በኋላ:"};
var EN=["What remains free after the 3-day trial?","25 featured free templates and one shared single-AI Send every rolling 24 hours remain free. Compare Mode and Pro templates require a Pro subscription after the trial.","How many MCP tools are available?","Poly-Glot currently provides 15 MCP tools covering template search and prompt building, Compare Mode preparation, language detection and translation, transcription, subscription status, workspace launch, and Bring Your Own Model workflows."];
var els,priceText;
function question(el,v){if(!el)return;var n=Array.from(el.childNodes).find(function(x){return x.nodeType===3;});if(n){if(n.nodeValue!==v)n.nodeValue=v;}else el.insertBefore(document.createTextNode(v),el.firstChild);}
function render(){
 if(!els)return;
 var code=window._pgI18n?.curLang?.()||"EN",data=code==="EN"?EN:(window._pgHomepageFaq||{})[code]||EN;
 question(els[0],data[0]);if(els[1])els[1].textContent=data[1];
 question(els[2],data[2]);if(els[3])els[3].textContent=data[3];
 var p=els[4];if(p){var strong=p.querySelector("strong");if(strong)strong.textContent=AFTER[code]||"After the 3-day trial:";
 var n=Array.from(p.childNodes).find(function(x){return x.nodeType===3&&x.nodeValue.trim();});
 if(n)n.nodeValue=" "+(code==="EN"?priceText:data[1]);}
}
function init(){
 els=["fqFreeQ","fqFreeA","fqMcpCountQ","fqMcpCountA"].map(function(k){return document.querySelector('[data-i18n="'+k+'"]');});
 els.push(document.querySelector(".free-after-trial-disclosure"));
 var p=els[4],n=p&&Array.from(p.childNodes).find(function(x){return x.nodeType===3&&x.nodeValue.trim();});
 priceText=n?n.nodeValue.trim():"";render();
}
window.addEventListener("pg:languagechange",function(){setTimeout(render,0)});
window._pgSiteFaqLocalization={render:render};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();