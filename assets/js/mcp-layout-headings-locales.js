/* Localized section headings using the existing reviewed 38-language MCP setup lexicon. */
(function(w,d){'use strict';var saved={};function init(){d.querySelectorAll('[data-pg-mcp-section]').forEach(function(n){saved[n.getAttribute('data-pg-mcp-section')]=n.textContent});render();}
function render(){var i=w._pgI18n,l=i&&typeof i.curLang==='function'?i.curLang():'EN',t=(w._pgMcpSetupCopy||{})[l];var copy={directories:t?t[2]:null,directoriesNote:t?t[1]:null,clients:t?t[0]:null,clientsNote:t?t[4]+' '+t[6]:null};
d.querySelectorAll('[data-pg-mcp-section]').forEach(function(n){var k=n.getAttribute('data-pg-mcp-section');n.textContent=l==='EN'||!copy[k]?saved[k]:copy[k]});}
w.addEventListener('pg:languagechange',function(){setTimeout(render,40);setTimeout(render,250)});if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);