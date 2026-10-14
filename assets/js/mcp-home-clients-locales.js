/* Reuse the site's 38-language MCP setup translations for home client cards. */
(function(w,d){'use strict';
var defaults=[];
function init(){d.querySelectorAll('[data-pg-mcp-client]').forEach(function(card){var desc=card.querySelector('[data-pg-mcp-home-detail]'),link=card.querySelector('[data-pg-mcp-home-link]');if(desc&&link)defaults.push([desc,desc.textContent,link,link.textContent]);});apply();}
function apply(){var i=w._pgI18n,code=String(i&&typeof i.curLang==='function'?i.curLang():'EN').toUpperCase().replace(/-/g,'_'),t=(w._pgMcpSetupCopy||{})[code];defaults.forEach(function(a){if(code==='EN'||!t||t.length!==9){a[0].textContent=a[1];a[2].textContent=a[3];return;}a[0].textContent=t[4]+' '+t[6];a[2].textContent=t[2];});}
w.addEventListener('pg:languagechange',function(){setTimeout(apply,30);setTimeout(apply,350)});
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);