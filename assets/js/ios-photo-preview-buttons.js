/* Website iPhone/iPad screenshots are live HTML previews, not bitmap files.
 * Mirror the single native "Photo to AI" button in Ask Any AI only.
 * Keep macOS, Templates, How to Use and History screens unchanged.
 * Labels use the product's localized Photo-to-AI catalog.
 */
(function(w,d){'use strict';
var selector=[
 '.hero-phone-mock .pg-phone-action-row>div:last-child',
 '#gallery-iphone .pg-phone-action-row>div:last-child',
 '#gallery-ipad .ipad-redesign-actions>.ipad-redesign-action-btn:last-child',
 '#demo .pg-phone-action-row>div:last-child'
].join(',');
var extras=[
 '.hero-phone-mock .pg-photo-preview-launch',
 '#gallery-iphone .pg-photo-preview-launch',
 '#gallery-ipad .pg-photo-preview-launch',
 '#demo .pg-photo-preview-launch'
].join(',');
function localizedFeature(){
 var lang=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())
   ||localStorage.getItem('pgLang')||navigator.language||'EN';
 var code=String(lang).toUpperCase().replace(/-/g,'_');
 var dict=w.PGPhotoAILocales||{};
 var t=dict[code]||dict[code.split('_')[0]]||dict.EN||{};
 return t.feature||'Photo to AI';
}
function render(){
 var feature=localizedFeature();
 d.querySelectorAll(selector).forEach(function(cell){
   // Existing previews previously rendered the separate OCR-only Scan action.
   // Preserve the 3-button layout; this is a replacement, not a fourth button.
   var strong=cell.querySelector('strong');
   if(!strong)return;
   if(!cell.hasAttribute('data-pg-photo-native-preview')){
     cell.setAttribute('data-pg-photo-native-preview','');
     cell.classList.add('pg-photo-action-btn');
     strong.setAttribute('data-pg-photo-preview-action','');
   }
   if(strong.textContent!==feature)strong.textContent=feature;
   cell.setAttribute('aria-label',feature+' (iPhone/iPad app preview)');
 });
 // Old marketing code inserted a fourth, fictitious "Coming Soon" button.
 // Remove only those preview-only elements; keep the separate product notice.
 d.querySelectorAll(extras).forEach(function(el){el.remove();});
}
function init(){
 if(!d.getElementById('pg-ios-photo-action-button-style')){
   var css=d.createElement('style');
   css.id='pg-ios-photo-action-button-style';
   css.textContent=[
    '.hero-phone-mock .pg-photo-action-btn,#gallery-iphone .pg-photo-action-btn,#gallery-ipad .pg-photo-action-btn,#demo .pg-photo-action-btn{display:flex!important;align-items:center!important;justify-content:center!important;flex-wrap:wrap!important;gap:2px!important;min-width:0!important;max-width:100%!important;white-space:normal!important;text-align:center!important;line-height:1.1!important;overflow-wrap:anywhere!important}',
    '.pg-photo-action-btn [data-pg-photo-preview-action]{display:inline-block;max-width:100%;min-width:0;line-height:1.15;overflow-wrap:anywhere}'
   ].join('\n');
   (d.head||d.documentElement).appendChild(css);
 }
 render();
 ['gallery-iphone','gallery-ipad'].forEach(function(id){
   var root=d.getElementById(id);
   if(!root||!w.MutationObserver)return;
   var queued=false;
   new MutationObserver(function(){
     if(queued)return;
     queued=true;
     w.setTimeout(function(){queued=false;render();},0);
   }).observe(root,{childList:true,subtree:true});
 });
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
w.addEventListener('pg:languagechange',function(){render();w.setTimeout(render,80);});
w.addEventListener('pageshow',render);
})(window,document);
