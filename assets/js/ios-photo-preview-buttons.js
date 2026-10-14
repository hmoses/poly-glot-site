/* iPhone/iPad marketing screenshots. Native iOS offers BOTH Scan (OCR)
 * and Photo to AI; do not replace Scan, and never add a macOS scanner.
 * All labels follow the shared 38-language Photo-to-AI locale catalog.
 */
(function(w,d){'use strict';
function copy(){
 var lang=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())||
   localStorage.getItem('pgLang')||navigator.language||'EN';
 var key=String(lang).toUpperCase().replace(/-/g,'_');
 var values=w.PGPhotoAILocales||{};
 return values[key]||values[key.split('_')[0]]||values.EN||{};
}
function render(){
 var t=copy();
 var title=t.feature||'Photo to AI',soon=t.comingSoon||'Coming soon';
 var name='📸 '+title+' · '+soon;
 // Templates, How to Use and History are localized HTML device images.
 // Attach a Photo to AI button within iOS screenshots only, after heading.
 d.querySelectorAll('#gallery-iphone .pg-device-static-localized,#gallery-ipad .pg-device-static-localized').forEach(function(panel){
  if(panel.querySelector('.pg-photo-preview-launch'))return;
  var body=panel.querySelector('.pgdsl-body');if(!body)return;
  var action=d.createElement('div');
  action.className='pg-photo-preview-launch pg-photo-preview-gallery';
  action.setAttribute('data-no-translate','');
  var heading=body.querySelector('.pgdsl-title');
  if(heading)heading.insertAdjacentElement('afterend',action);
  else body.insertBefore(action,body.firstChild);
 });
 // Existing Ask Any AI iOS images, home hero, and demo retain OCR Scan.
 // Only the extra Photo to AI element is localized here.
 d.querySelectorAll('.hero-phone-mock .pg-photo-preview-launch,#gallery-iphone .pg-photo-preview-launch,#gallery-ipad .pg-photo-preview-launch,#demo .pg-photo-preview-launch').forEach(function(el){
  if(el.textContent!==name)el.textContent=name;
  el.setAttribute('aria-label',title+' — '+soon+' (iPhone/iPad preview)');
 });
}
function init(){
 var css=d.getElementById('pg-ios-photo-gallery-style');
 if(!css){
  css=d.createElement('style');css.id='pg-ios-photo-gallery-style';
  css.textContent=[
   '#gallery-iphone .pg-device-static-localized .pg-photo-preview-gallery,#gallery-ipad .pg-device-static-localized .pg-photo-preview-gallery{box-sizing:border-box;display:block!important;max-width:calc(100% - 12px)!important;margin:5px 6px 7px!important;padding:7px 5px!important;border-radius:8px!important;text-align:center;box-shadow:0 2px 12px rgba(82,41,169,.24)}',
   '#gallery-iphone .pg-device-static-localized .pg-photo-preview-gallery{font-size:clamp(8px,.69vw,10px)!important}',
   '#gallery-ipad .pg-device-static-localized .pg-photo-preview-gallery{font-size:clamp(8px,.65vw,11px)!important}',
   '#gallery-iphone .pg-photo-preview-launch,#gallery-ipad .pg-photo-preview-launch{direction:inherit;unicode-bidi:plaintext;white-space:normal;word-break:normal;overflow-wrap:anywhere}'
  ].join('\n');
  (d.head||d.documentElement).appendChild(css);
 }
 render();
 ['gallery-iphone','gallery-ipad'].forEach(function(id){
  var panel=d.getElementById(id);if(!panel||!w.MutationObserver)return;
  var queued=false;
  new MutationObserver(function(){
   if(queued)return;queued=true;
   w.setTimeout(function(){queued=false;render();},0);
  }).observe(panel,{childList:true,subtree:true});
 });
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);
else init();
w.addEventListener('pg:languagechange',function(){render();w.setTimeout(render,80);});
w.addEventListener('pageshow',render);
})(window,document);
