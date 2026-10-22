/* Shared localized subscription disclosure for product and MCP subpages. */
(function(){'use strict';
var root=document.getElementById('pg-pricing-policy-summary');if(!root)return;
var policy=window._pgSubscriptionPolicy||{};
function render(){
 var code=window._pgI18n&&window._pgI18n.curLang?window._pgI18n.curLang():'EN';
 var p=policy[code]||policy.EN;
 if(!p||p.length<4)return;
 root.lang=code==='ZH_TW'?'zh-Hant':code.toLowerCase();
 root.dir=/^(AR|HE|FA|UR)$/.test(code)?'rtl':'ltr';
 root.replaceChildren();
 var h=document.createElement('h2');h.textContent=(window._pgI18n&&window._pgI18n.dictionary&&window._pgI18n.dictionary[code]&&window._pgI18n.dictionary[code].prEye)||'Subscription and pricing';root.appendChild(h);
 [p[0],p[1],p[2],p[3]].forEach(function(s){var t=document.createElement('p');t.textContent=s;root.appendChild(t)});
 var d=window._pgI18n&&window._pgI18n.dictionary&&(window._pgI18n.dictionary[code]||window._pgI18n.dictionary.EN)||{};var price=document.createElement('p');price.textContent=(d.prTier2||'Pro Monthly')+': US$9.99 · '+(d.prTier3||'Pro Annual')+': US$79.99';root.appendChild(price);
 var a=document.createElement('a');a.href='privacy-and-pricing.html';a.textContent=(window._pgI18n&&window._pgI18n.dictionary&&window._pgI18n.dictionary[code]&&window._pgI18n.dictionary[code].prEye)||'Pricing details';root.appendChild(a);
}
window.addEventListener('pg:languagechange',render);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();
