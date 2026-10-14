/* Reuse reviewed MCP setup translations for four client-specific walkthroughs.
 * Technical configuration paths, commands, JSON keys and product names never translate.
 */
(function(w,d){'use strict';
var names=['Cursor','Goose','VS Code','Windsurf'];
function current(){var i=w._pgI18n;return String(i&&typeof i.curLang==='function'?i.curLang():localStorage.getItem('pgLang')||navigator.language||'EN').toUpperCase().replace(/-/g,'_');}
function render(){
 var l=current(),dictionary=w._pgMcpSetupCopy||{},t=dictionary[l]||dictionary[l.split('_')[0]];
 if(l==='EN'||!t||t.length!==9)return;
 var intro=d.querySelector('[data-pg-guide-intro]'),config=d.querySelectorAll('[data-pg-config-label]');
 if(intro)intro.textContent=t[1];
 config.forEach(function(e){e.textContent=t[5].replace(/^\s*[0-9٠-٩۰-۹०-९]+[.)。．:]?\s*/, '')+':'});
 d.querySelectorAll('[data-pg-client-detail]').forEach(function(el,i){
   var name=names[i]||'MCP';
   el.textContent=name+': '+t[4]+' '+t[6]+' '+t[8];
 });
 var note=d.querySelector('[data-pg-guide-note]');if(note)note.textContent=t[8]+' '+t[1];
 // Leave validated executable JSON, paths, protocol names and source links unchanged.
}
function later(){setTimeout(render,40);setTimeout(render,240)}
w.addEventListener('pg:languagechange',later);w.addEventListener('pageshow',later);
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',later,{once:true});else later();
})(window,document);
