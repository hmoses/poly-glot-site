/* iPhone/iPad product gallery: mirror the native Photo to AI entry point.
 * Renders only inside website preview devices; never adds a macOS scanner.
 * Uses the existing 38-language Photo-to-AI catalog. Images remain identified
 * as upcoming marketing previews until the App Store release is live.
 */
(function(w,d){'use strict';
function translation(){
  var lang=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())
    ||localStorage.getItem('pgLang')||navigator.language||'EN';
  var code=String(lang).toUpperCase().replace(/-/g,'_');
  var dict=w.PGPhotoAILocales||{};
  return dict[code]||dict[code.split('_')[0]]||dict.EN||{};
}
function render(){
  var catalog=translation();
  var name=catalog.feature||'Photo to AI';
  var upcoming=catalog.comingSoon||'Coming soon';
  var label='📸 '+name+' · '+upcoming;
  // These are the actual iOS gallery views: Ask, Templates, How to Use,
  // and History. The localized static panels replace legacy bitmap screenshots.
  d.querySelectorAll('#gallery-iphone .pg-device-static-localized,#gallery-ipad .pg-device-static-localized').forEach(function(panel){
    if(panel.querySelector('.pg-photo-preview-launch'))return;
    var body=panel.querySelector('.pgdsl-body');
    if(!body)return;
    var node=d.createElement('div');
    node.className='pg-photo-preview-launch pg-photo-preview-gallery';
    node.setAttribute('data-no-translate','');
    node.setAttribute('role','img');
    node.setAttribute('aria-label',name+' — '+upcoming+' (iPhone/iPad preview)');
    var heading=body.querySelector('.pgdsl-title');
    if(heading)heading.insertAdjacentElement('afterend',node);
    else body.insertBefore(node,body.firstChild);
  });
  // Hero, Ask Any AI, gallery, and demo are already editable UI previews.
  // Update every visible iPhone/iPad label, without touching Mac or its images.
  d.querySelectorAll('.hero-phone-mock .pg-photo-preview-launch,#gallery-iphone .pg-photo-preview-launch,#gallery-ipad .pg-photo-preview-launch,#demo .pg-photo-preview-launch').forEach(function(node){
    if(node.textContent!==label)node.textContent=label;
    node.setAttribute('aria-label',name+' — '+upcoming+' (iPhone/iPad preview)');
  });
}
function init(){
  if(!d.getElementById('pg-ios-photo-preview-style')){
    var style=d.createElement('style');
    style.id='pg-ios-photo-preview-style';
    style.textContent=[
      '#gallery-iphone .pg-device-static-localized .pg-photo-preview-gallery,#gallery-ipad .pg-device-static-localized .pg-photo-preview-gallery{box-sizing:border-box;display:block!important;width:calc(100% - 8px);max-width:none!important;margin:5px 4px 7px!important;padding:7px 5px!important;border-radius:8px!important;text-align:center;box-shadow:0 2px 12px rgba(82,41,169,.24)}',
      '#gallery-iphone .pg-device-static-localized .pg-photo-preview-gallery{font-size:clamp(8px,.69vw,10px)!important}',
      '#gallery-ipad .pg-device-static-localized .pg-photo-preview-gallery{font-size:clamp(8px,.65vw,11px)!important}',
      '#gallery-iphone .iphone-live-preview .pg-photo-preview-launch,#gallery-ipad .ipad-live-preview .pg-photo-preview-launch{box-sizing:border-box;display:block!important;min-height:24px;max-width:calc(100% - 18px)!important}',
      '#gallery-iphone .pg-photo-preview-launch,#gallery-ipad .pg-photo-preview-launch{direction:inherit;unicode-bidi:plaintext;white-space:normal;word-break:normal;overflow-wrap:anywhere}'
    ].join('\n');
    (d.head||d.documentElement).appendChild(style);
  }
  render();
  // Device translation bundles can rebuild the static HTML panels after load.
  // Observe only iOS preview panels; content updates are idempotent.
  ['gallery-iphone','gallery-ipad'].forEach(function(id){
    var gallery=d.getElementById(id);
    if(!gallery||!w.MutationObserver)return;
    var scheduled=false;
    var obs=new MutationObserver(function(){
      if(scheduled)return;
      scheduled=true;
      w.setTimeout(function(){scheduled=false;render();},0);
    });
    obs.observe(gallery,{childList:true,subtree:true});
  });
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);
else init();
w.addEventListener('pg:languagechange',render);
w.addEventListener('pageshow',render);
})(window,document);
