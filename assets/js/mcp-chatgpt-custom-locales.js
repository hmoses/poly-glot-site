/* ChatGPT MCP card: localized instructions from the established 38-language setup corpus.
 * Does not imply publication in the public ChatGPT Plugin Directory.
 */
(function(w,d){'use strict';var original=[];
function ready(){var root=d.querySelector('[data-pg-chatgpt-connection]');if(!root)return;
var nodes=[root.querySelector('[data-pg-chat-description]'),root.querySelector('[data-pg-chat-step="1"]'),root.querySelector('[data-pg-chat-step="2"]'),root.querySelector('[data-pg-chat-step="3"]'),root.querySelector('[data-pg-chat-link]')];
original=nodes.map(function(n){return n?n.textContent:''});
function apply(){var i=w._pgI18n,l=i&&typeof i.curLang==='function'?i.curLang():'EN',a=(w._pgMcpSetupCopy||{})[l];if(l==='EN'||!a||a.length!==9){nodes.forEach(function(n,j){if(n)n.textContent=original[j]});return;}
var replacements=[a[1],a[4],a[6],a[8],a[2]];
nodes.forEach(function(n,j){if(n)n.textContent=replacements[j]});}
w.addEventListener('pg:languagechange',function(){setTimeout(apply,30);setTimeout(apply,260)});apply();}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})(window,document);