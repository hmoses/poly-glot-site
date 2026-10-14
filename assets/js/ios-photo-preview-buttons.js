/* iPhone and iPad product previews: reflect the native Photo to AI button.
 * The source of translated labels is the existing 38-language Photo-to-AI catalog.
 * Never add the control to a Mac preview or advertise a separate "coming soon" action.
 */
(function (w, d) {
  'use strict';
  var observerScheduled = false;
  var lastLanguage = '';
  function locale() {
    var l = (w._pgI18n && typeof w._pgI18n.curLang === 'function' &&
             w._pgI18n.curLang()) || localStorage.getItem('pgLang') ||
             d.documentElement.lang || navigator.language || 'EN';
    return String(l).toUpperCase().replace(/-/g, '_');
  }
  function translatedName() {
    var code = locale(), all = w.PGPhotoAILocales || {};
    var p = all[code] || all[code.split('_')[0]] || all.EN || {};
    return p.feature || 'Photo to AI';
  }
  function reconcileAction(row, name) {
    if (!row || row.children.length < 3) return;
    var action = row.querySelector('[data-pg-photo-native-preview]') ||
                 row.children[2];
    if (!action) return;
    if (!action.classList.contains('pg-photo-action-btn'))
      action.classList.add('pg-photo-action-btn');
    if (!action.hasAttribute('data-pg-photo-native-preview'))
      action.setAttribute('data-pg-photo-native-preview', '');
    var label = action.querySelector('[data-pg-photo-preview-action]') ||
                action.querySelector('strong');
    if (!label) {
      action.textContent = '📷 ';
      label = d.createElement('strong');
      action.appendChild(label);
    }
    if (!label.hasAttribute('data-pg-photo-preview-action'))
      label.setAttribute('data-pg-photo-preview-action', '');
    if (label.textContent !== name) label.textContent = name;
    var accessible = name + ' — iPhone/iPad app preview';
    if (action.getAttribute('aria-label') !== accessible)
      action.setAttribute('aria-label', accessible);
  }
  function render() {
    var title = translatedName();
    // The third action inside Ask Any AI is Photo to AI on both form factors.
    d.querySelectorAll('.hero-phone-mock .pg-phone-action-row,' +
                       '#gallery-iphone .pg-phone-action-row,' +
                       '#gallery-ipad .ipad-redesign-actions,' +
                       '#demo .pg-phone-action-row').forEach(function (row) {
      reconcileAction(row, title);
    });
    // Other previews must not show a fake, unshipped second button.
    d.querySelectorAll('.hero-phone-mock .pg-photo-preview-launch,' +
                       '#gallery-iphone .pg-photo-preview-launch,' +
                       '#gallery-ipad .pg-photo-preview-launch,' +
                       '#demo .pg-photo-preview-launch').forEach(function (node) {
      node.remove();
    });
    lastLanguage = locale();
  }
  function schedule() {
    if (observerScheduled) return;
    observerScheduled = true;
    w.setTimeout(function () {
      observerScheduled = false;
      render();
    }, 0);
  }
  function init() {
    if (!d.getElementById('pg-ios-photo-preview-label-style')) {
      var style = d.createElement('style');
      style.id = 'pg-ios-photo-preview-label-style';
      style.textContent =
        '.hero-phone-mock .pg-photo-action-btn,' +
        '#gallery-iphone .pg-photo-action-btn,' +
        '#gallery-ipad .pg-photo-action-btn,' +
        '#demo .pg-photo-action-btn{min-width:0;overflow:hidden;text-align:center}' +
        '.hero-phone-mock [data-pg-photo-preview-action],' +
        '#gallery-iphone [data-pg-photo-preview-action],' +
        '#gallery-ipad [data-pg-photo-preview-action],' +
        '#demo [data-pg-photo-preview-action]{white-space:normal;overflow-wrap:anywhere;line-height:1.16}';
      d.head.appendChild(style);
    }
    render();
    if (w.MutationObserver) {
      ['gallery-iphone', 'gallery-ipad', 'demo'].forEach(function (id) {
        var root = d.getElementById(id);
        if (!root) return;
        new w.MutationObserver(schedule).observe(root, {
          subtree: true, childList: true, characterData: true
        });
      });
    }
    w.setInterval(function () {
      if (locale() !== lastLanguage) render();
    }, 2000);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
  w.addEventListener('pg:languagechange', schedule);
  w.addEventListener('pageshow', schedule);
})(window, document);


/* iPhone and iPad Photo to AI gallery previews — parity with iOS build 870.
 * Rendered as localized HTML, not screenshots. All controls are illustrative;
 * actual photo transfer is performed only by the installed native application.
 * Keep iPad and iPhone stacked just like the real Photo to AI sheet.
 */
(function(w,d){'use strict';
 var styleId='pg-photo-device-preview-style';
 function language(){
   var raw=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())||localStorage.getItem('pgLang')||d.documentElement.lang||navigator.language||'EN';
   return String(raw).toUpperCase().replace(/-/g,'_');
 }
 function catalog(){
   var all=w.PGPhotoAILocales||{},code=language();
   return all[code]||all[code.split('_')[0]]||all.EN||{};
 }
 function element(tag,cls,text){var node=d.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
 function text(node,value){if(node&&node.textContent!==value)node.textContent=value;}
 function button(cls,key){var b=element('div','pg-photo-ui-control '+cls);b.dataset.photoKey=key;return b;}
 function actionLabel(code,t){
   var map=w.PGPhotoPreviewActionLabels||{};
   var labels=map[code]||map[code.split('_')[0]]||map.EN;
   return labels&&labels[0]||((t.share||'Share with AI')+' · '+(t.manualPhoto||'Paste photo'));
 }
 function renderFrame(device){
   var grid=d.querySelector('#gallery-'+device+' .gallery-grid');
   if(!grid||d.getElementById('pg-photo-'+device+'-card'))return;
   var card=element('div','gallery-item');card.id='pg-photo-'+device+'-card';
   var frame=element('div',device==='iphone'?'iphone-device':'ipad-device');
   if(device==='iphone')frame.appendChild(element('span','iphone-side-left'));
   var screen=element('div',device==='iphone'?'iphone-screen':'ipad-screen');
   var ui=element('div','pg-photo-ui pg-photo-ui-'+device);
   var header=element('div','pg-photo-ui-header');var brand=element('div','pg-photo-ui-brand');
   var logo=element('img');logo.src='assets/img/icon-128.png';logo.alt='';brand.appendChild(logo);
   brand.appendChild(element('span','','Poly-Glot AI Workspace'));
   header.appendChild(brand);header.appendChild(element('span','pg-photo-ui-lang','🌐'));
   ui.appendChild(header);
   var tabs=element('div','pg-photo-ui-tabs');['✏️','▦','☷','◷'].forEach(function(x){tabs.appendChild(element('span','',x));});ui.appendChild(tabs);
   var sheet=element('div','pg-photo-ui-modal');
   var title=element('div','pg-photo-ui-title');title.appendChild(element('strong','pg-photo-ui-title-copy'));title.appendChild(element('span','pg-photo-ui-close','×'));sheet.appendChild(title);
   sheet.appendChild(element('div','pg-photo-ui-privacy'));
   sheet.appendChild(button('pg-photo-ui-picker','choose'));
   sheet.appendChild(button('pg-photo-ui-camera','camera'));
   sheet.appendChild(element('div','pg-photo-ui-context-title'));
   var textarea=element('div','pg-photo-ui-textbox');textarea.setAttribute('aria-hidden','true');sheet.appendChild(textarea);
   var bullets=element('div','pg-photo-ui-guidance');var list=element('ul','pg-photo-ui-bullets');bullets.appendChild(list);sheet.appendChild(bullets);
   var providerLabel=element('div','pg-photo-ui-provider-label');sheet.appendChild(providerLabel);
   var select=element('div','pg-photo-ui-provider-select');
   select.appendChild(element('span','pg-photo-ui-provider-selected','ChatGPT'));
   select.appendChild(element('span','pg-photo-ui-provider-chevron','⌄'));sheet.appendChild(select);
   sheet.appendChild(element('div','pg-photo-ui-open-action'));
   sheet.appendChild(element('div','pg-photo-ui-native-share'));
   sheet.appendChild(button('pg-photo-ui-scan','scanText'));
   ui.appendChild(sheet);
   screen.appendChild(ui);
   screen.appendChild(element('div',device==='iphone'?'iphone-home-indicator':'ipad-home-indicator'));
   frame.appendChild(screen);card.appendChild(frame);
   card.appendChild(element('div','gallery-label pg-photo-ui-card-label'));
   var first=grid.querySelector('.gallery-item');
   if(first&&first.nextSibling)grid.insertBefore(card,first.nextSibling);else grid.appendChild(card);
 }
 function localize(){
   var t=catalog(),code=language();
   ['iphone','ipad'].forEach(function(device){
     var card=d.getElementById('pg-photo-'+device+'-card');if(!card)return;
     card.dir=/^(AR|HE)$/.test(code)?'rtl':'ltr';
     text(card.querySelector('.pg-photo-ui-title-copy'),'📷 '+(t.feature||'Photo to AI'));
     text(card.querySelector('.pg-photo-ui-privacy'),t.photoPolicy||t.privacy||'Photos leave your device only when you share them.');
     text(card.querySelector('.pg-photo-ui-picker'),'📷 '+(t.choose||'Choose photo'));
     text(card.querySelector('.pg-photo-ui-camera'),'📸 '+(t.camera||'Take photo'));
     text(card.querySelector('.pg-photo-ui-context-title'),t.context||'Add context (optional)');
     var bullets=card.querySelector('.pg-photo-ui-bullets');
     var lines=[(t.choose||'Choose photo')+' / '+(t.camera||'Take photo')+' · '+(t.context||'Add context (optional)'),t.manualPhoto||'Paste or attach the photo in your selected AI.',t.privacy||'Photos leave your device only when you share them.'];
     if(bullets){bullets.replaceChildren();lines.forEach(function(line){bullets.appendChild(element('li','',line));});}
     text(card.querySelector('.pg-photo-ui-provider-label'),t.share||'Share with AI');
     text(card.querySelector('.pg-photo-ui-open-action'),actionLabel(code,t));
     text(card.querySelector('.pg-photo-ui-native-share'),(t.share||'Share with AI')+' · iOS');
     text(card.querySelector('.pg-photo-ui-scan'),(t.scanText||'Scan text')+' (OCR)');
     text(card.querySelector('.pg-photo-ui-card-label'),t.feature||'Photo to AI');
   });
 }
 function style(){
   if(d.getElementById(styleId))return;
   var tag=element('style');tag.id=styleId;
   tag.textContent=`
/* Phone and tablet previews now follow the REAL iOS Photo to AI stacked sheet.
   No split iPad panel, placeholder paper image, or purple share button. */
.pg-photo-ui{position:absolute;inset:0;background:#090c12;color:#f7f9fc;overflow:hidden;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',sans-serif;box-sizing:border-box}
.pg-photo-ui *{box-sizing:border-box;min-width:0;overflow-wrap:anywhere}
.pg-photo-ui-header{display:flex;align-items:center;justify-content:space-between;padding:13% 5% 3%;font-size:clamp(6px,.7vw,10px);font-weight:750;flex-shrink:0}
.pg-photo-ui-ipad .pg-photo-ui-header{padding:3% 4% 1.8%;font-size:10px}
.pg-photo-ui-brand{display:flex;align-items:center;gap:5px}.pg-photo-ui-brand img{width:17px;height:17px;border-radius:4px}
.pg-photo-ui-tabs{display:flex;justify-content:space-around;padding:5px 8px;color:#bac4d7;border-bottom:1px solid #364153;font-size:10px;flex-shrink:0}
.pg-photo-ui-modal{margin:7px 6px 0;padding:9px 8px;background:#172034;border:1px solid #46516a;border-radius:12px 12px 4px 4px;flex:1;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#56657b transparent;box-shadow:0 4px 18px #0006}
.pg-photo-ui-title{display:flex;align-items:center;justify-content:space-between;gap:3px;margin-bottom:7px;font-size:clamp(10px,.9vw,14px);line-height:1.15}.pg-photo-ui-close{color:white;font-size:17px;font-weight:350}
.pg-photo-ui-privacy{color:#b9c6db;line-height:1.4;margin:0 0 10px;font-size:9px}
.pg-photo-ui-control{text-align:center;border:1px solid #63728a;background:#334155;border-radius:7px;padding:7px 4px;font-weight:700;line-height:1.25}
.pg-photo-ui-picker,.pg-photo-ui-camera{margin-bottom:6px;font-size:9px}
.pg-photo-ui-context-title{font-size:10px;color:#f3f6fd;font-weight:700;margin:11px 0 5px}
.pg-photo-ui-textbox{border:1px solid #64748b;background:#0e1728;color:#899bb6;border-radius:8px;height:55px;overflow:hidden}
.pg-photo-ui-guidance{margin:12px 0 10px;border:1px solid #526278;border-radius:8px;padding:7px 10px;color:#d4deef;font-size:8px;line-height:1.4}
.pg-photo-ui-bullets{margin:0;padding-left:12px;list-style:disc outside}.pg-photo-ui-bullets li{margin:3px 0}
.pg-photo-ui-provider-label{font-size:10px;font-weight:700;margin:9px 0 5px}
.pg-photo-ui-provider-select{display:flex;align-items:center;justify-content:space-between;background:#243247;border:2px solid #26e5a5;box-shadow:0 0 8px #26e5a533;border-radius:8px;padding:8px;color:#fff;font-size:11px;line-height:1.3}
.pg-photo-ui-provider-chevron{font-size:13px;color:#d4deef}
.pg-photo-ui-open-action{display:block;border:1px solid #64748b;border-radius:8px;text-align:center;background:transparent;color:#d4deef;padding:9px 5px;margin:8px 0;font-size:9px;line-height:1.3}
.pg-photo-ui-native-share{text-align:center;text-decoration:underline;text-underline-offset:2px;color:#a7f3d0;padding:8px 4px;margin:5px 0;font-size:9px;line-height:1.3}
.pg-photo-ui-scan{margin-top:8px;font-size:9px;padding:9px}
.pg-photo-ui-ipad .pg-photo-ui-header{font-size:10px}
.pg-photo-ui-ipad .pg-photo-ui-modal{margin:5px 14px 7px;padding:10px 13px;border-radius:11px;overflow-y:auto}
.pg-photo-ui-ipad .pg-photo-ui-title{font-size:15px}.pg-photo-ui-ipad .pg-photo-ui-privacy{font-size:10px}
.pg-photo-ui-ipad .pg-photo-ui-picker,.pg-photo-ui-ipad .pg-photo-ui-camera{font-size:11px;padding:7px}
.pg-photo-ui-ipad .pg-photo-ui-context-title,.pg-photo-ui-ipad .pg-photo-ui-provider-label{font-size:11px}
.pg-photo-ui-ipad .pg-photo-ui-textbox{height:57px}.pg-photo-ui-ipad .pg-photo-ui-guidance{font-size:10px}
.pg-photo-ui-ipad .pg-photo-ui-provider-select{font-size:12px}
.pg-photo-ui-ipad .pg-photo-ui-open-action,.pg-photo-ui-ipad .pg-photo-ui-native-share,.pg-photo-ui-ipad .pg-photo-ui-scan{font-size:11px}
#pg-photo-iphone-card .pg-photo-ui-header{font-size:7px}
#pg-photo-iphone-card .pg-photo-ui-modal{margin:5px 5px 0;padding:7px}
#pg-photo-iphone-card .pg-photo-ui-privacy{font-size:7px;margin-bottom:8px}
#pg-photo-iphone-card .pg-photo-ui-title{font-size:11px}
#pg-photo-iphone-card .pg-photo-ui-picker,#pg-photo-iphone-card .pg-photo-ui-camera{font-size:8px;padding:6px}
#pg-photo-iphone-card .pg-photo-ui-textbox{height:40px}
#pg-photo-iphone-card .pg-photo-ui-guidance{font-size:7px;margin:9px 0 8px}
#pg-photo-iphone-card .pg-photo-ui-provider-label{font-size:9px}
#pg-photo-iphone-card .pg-photo-ui-provider-select{font-size:9px;padding:6px}
#pg-photo-iphone-card .pg-photo-ui-open-action,#pg-photo-iphone-card .pg-photo-ui-native-share,#pg-photo-iphone-card .pg-photo-ui-scan{font-size:8px;padding:7px}
#pg-photo-iphone-card .pg-photo-ui-context-title{font-size:8px}
#pg-photo-iphone-card .pg-photo-ui-close{font-size:13px}
#pg-photo-iphone-card .pg-photo-ui-bullets{padding-left:10px}
#pg-photo-iphone-card .pg-photo-ui-modal{scrollbar-width:none}
.pg-photo-ui[dir="rtl"],#pg-photo-iphone-card[dir="rtl"] .pg-photo-ui-modal,#pg-photo-ipad-card[dir="rtl"] .pg-photo-ui-modal{direction:rtl;text-align:right}
#pg-photo-iphone-card[dir="rtl"] .pg-photo-ui-bullets,#pg-photo-ipad-card[dir="rtl"] .pg-photo-ui-bullets{padding-right:14px;padding-left:0}
@media(max-width:600px){#pg-photo-ipad-card .pg-photo-ui-modal{margin:4px 8px;padding:7px}#pg-photo-ipad-card .pg-photo-ui-privacy{font-size:8px}#pg-photo-ipad-card .pg-photo-ui-guidance{font-size:8px}}
@media(prefers-reduced-motion:reduce){.pg-photo-ui *{scroll-behavior:auto}}
`;
   d.head.appendChild(tag);
 }
 function init(){
   style();renderFrame('iphone');renderFrame('ipad');localize();
   w.addEventListener('pg:languagechange',localize);
   w.addEventListener('pg:photo-action-locales-ready',localize);
   w.addEventListener('pageshow',localize);
   var last=language();w.setInterval(function(){var next=language();if(next!==last){last=next;localize();}},1800);
 }
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init);else init();
})(window,document);
