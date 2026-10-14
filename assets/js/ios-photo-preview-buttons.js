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


/* Photo-to-AI native-screen previews. Rendered as HTML rather than flattened
 * screenshots so that all 38 UI languages can update text without asset forks.
 * Illustrative preview of the released-in-source UI, not a working uploader.
 */
(function(w,d) {'use strict';
  var cssId='pg-photo-device-preview-style';
  function lang() {
    var a=(w._pgI18n&&typeof w._pgI18n.curLang==='function'&&w._pgI18n.curLang())||
      localStorage.getItem('pgLang')||d.documentElement.lang||navigator.language||'EN';
    return String(a).toUpperCase().replace(/-/g,'_');
  }
  function catalog() {
    var all=w.PGPhotoAILocales||{},l=lang();
    return all[l]||all[l.split('_')[0]]||all.EN||{};
  }
  function node(tag,cls,content) {
    var e=d.createElement(tag);if(cls)e.className=cls;
    if(content!==undefined)e.textContent=content;return e;
  }
  function renderFrame(device) {
    var grid=d.querySelector('#gallery-'+device+' .gallery-grid');
    if(!grid || d.getElementById('pg-photo-'+device+'-card'))return;
    var card=node('div','gallery-item');card.id='pg-photo-'+device+'-card';
    var frame=node('div',device==='iphone'?'iphone-device':'ipad-device');
    if(device==='iphone')frame.appendChild(node('span','iphone-side-left'));
    var screen=node('div',device==='iphone'?'iphone-screen':'ipad-screen');
    var ui=node('div','pg-photo-ui pg-photo-ui-'+device);
    var top=node('div','pg-photo-ui-header');
    var brand=node('div','pg-photo-ui-brand');
    var logo=d.createElement('img');logo.src='assets/img/icon-128.png';logo.alt='';brand.appendChild(logo);
    brand.appendChild(node('span','', 'Poly-Glot AI Workspace'));
    top.appendChild(brand);top.appendChild(node('span','pg-photo-ui-lang','🌐'));
    ui.appendChild(top);
    var tabs=node('div','pg-photo-ui-tabs');
    ['✏️','▦','☷','◷'].forEach(function(x){tabs.appendChild(node('span','',x));});
    ui.appendChild(tabs);
    var body=node('div','pg-photo-ui-modal');
    var title=node('div','pg-photo-ui-title');
    title.appendChild(node('strong','pg-photo-l10n','Photo to AI'));
    title.appendChild(node('span','pg-photo-ui-close','×'));body.appendChild(title);
    body.appendChild(node('div','pg-photo-ui-privacy pg-photo-l10n','Photos leave your device only when you share them.'));
    var layout=node('div','pg-photo-ui-layout'),left=node('div','pg-photo-ui-left'),right=node('div','pg-photo-ui-right');
    left.appendChild(node('div','pg-photo-ui-picker pg-photo-l10n','Choose photo'));
    left.appendChild(node('div','pg-photo-ui-camera pg-photo-l10n','Take photo'));
    var preview=node('div','pg-photo-ui-image');
    preview.setAttribute('aria-hidden','true');
    preview.innerHTML='<div class="pg-photo-ui-paper"><div class="pg-photo-ui-paper-bar"></div><div class="pg-photo-ui-paper-line"></div><div class="pg-photo-ui-paper-line short"></div><div class="pg-photo-ui-paper-line"></div><div class="pg-photo-ui-paper-line short"></div></div>';
    left.appendChild(preview);
    right.appendChild(node('div','pg-photo-ui-context-title pg-photo-l10n','Add context (optional)'));
    right.appendChild(node('div','pg-photo-ui-textbox','································'));
    var actions=node('div','pg-photo-ui-buttons');
    actions.appendChild(node('div','pg-photo-ui-scan pg-photo-l10n','Scan text (OCR)'));
    actions.appendChild(node('div','pg-photo-ui-share pg-photo-l10n','Share with AI'));
    right.appendChild(actions);layout.appendChild(left);layout.appendChild(right);
    body.appendChild(layout);ui.appendChild(body);screen.appendChild(ui);
    screen.appendChild(node('div',device==='iphone'?'iphone-home-indicator':'ipad-home-indicator'));
    frame.appendChild(screen);card.appendChild(frame);card.appendChild(node('div','gallery-label pg-photo-l10n','Photo to AI'));
    var first=grid.querySelector('.gallery-item');
    if(first && first.nextSibling)grid.insertBefore(card,first.nextSibling);else grid.appendChild(card);
  }
  function localize(){
    var t=catalog(),codes=['feature','privacy','choose','camera','context','scanText','share','feature'];
    ['iphone','ipad'].forEach(function(device){
      var card=d.getElementById('pg-photo-'+device+'-card');if(!card)return;
      var els=card.querySelectorAll('.pg-photo-l10n');
      els.forEach(function(el,i){
        var key=codes[i], fallback={feature:'Photo to AI',privacy:'Photos leave your device only when you share them.',choose:'Choose photo',camera:'Take photo',context:'Add context (optional)',scanText:'Scan text',share:'Share with AI'}[key];
        var val=t[key]||fallback;
        if(key==='scanText')val+=' (OCR)';
        if(el.textContent!==val)el.textContent=val;
      });
      card.dir=/^(AR|HE)$/.test(lang())?'rtl':'ltr';
    });
  }
  function style(){
    if(d.getElementById(cssId))return;
    var tag=d.createElement('style');tag.id=cssId;
    tag.textContent=
      '.pg-photo-ui{position:absolute;inset:0;background:#0d101a;color:#f8fafc;overflow:hidden;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,sans-serif;box-sizing:border-box}' +
      '.pg-photo-ui *{box-sizing:border-box;min-width:0;overflow-wrap:anywhere}' +
      '.pg-photo-ui-header{display:flex;align-items:center;justify-content:space-between;padding:13% 5% 4%;font-size:clamp(6px,.7vw,10px);font-weight:750}' +
      '.pg-photo-ui-ipad .pg-photo-ui-header{padding:3% 4% 1.8%;font-size:10px}' +
      '.pg-photo-ui-brand{display:flex;align-items:center;gap:5px}' +
      '.pg-photo-ui-brand img{width:17px;height:17px;border-radius:4px}' +
      '.pg-photo-ui-tabs{display:flex;justify-content:space-around;padding:5px 8px;color:#bac4d7;border-bottom:1px solid #364153;font-size:10px}' +
      '.pg-photo-ui-modal{margin:8px 7px 0;padding:11px 9px;background:#172034;border:1px solid #46516a;border-radius:12px;flex:1;overflow:hidden;box-shadow:0 4px 18px #0006}' +
      '.pg-photo-ui-title{display:flex;align-items:flex-start;justify-content:space-between;gap:3px;margin-bottom:5px;font-size:clamp(10px,.9vw,14px);line-height:1.15}' +
      '.pg-photo-ui-close{color:#b9c4d8;font-size:16px}' +
      '.pg-photo-ui-privacy{font-size:9px;line-height:1.3;color:#aab8ce;margin-bottom:9px}' +
      '.pg-photo-ui-layout{display:flex;flex-direction:column;gap:7px}' +
      '.pg-photo-ui-picker,.pg-photo-ui-camera{border:1px solid #63728a;background:#334155;text-align:center;border-radius:8px;padding:6px 4px;font-size:10px;font-weight:650;margin-bottom:5px}' +
      '.pg-photo-ui-image{height:92px;margin-top:3px;background:linear-gradient(145deg,#313c55,#0a1325);border:1px solid #4a556e;border-radius:7px;display:grid;place-items:center}' +
      '.pg-photo-ui-paper{width:58%;height:79%;border-radius:2px;background:#e6e8ed;padding:9px 9px 2px;box-shadow:0 3px 12px #0007;transform:rotate(-3deg)}' +
      '.pg-photo-ui-paper-bar{height:5px;width:68%;border-radius:3px;background:#495b7c;margin-bottom:8px}' +
      '.pg-photo-ui-paper-line{height:3px;background:#aab3c4;margin:5px 0;border-radius:2px}.pg-photo-ui-paper-line.short{width:60%}' +
      '.pg-photo-ui-context-title{font-size:9px;color:#e8edf8;font-weight:700;margin:3px 0 4px}' +
      '.pg-photo-ui-textbox{border:1px solid #64748b;background:#0e1728;color:#899bb6;border-radius:8px;padding:8px;height:42px;font-size:10px;overflow:hidden}' +
      '.pg-photo-ui-buttons{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:7px}' +
      '.pg-photo-ui-scan,.pg-photo-ui-share{text-align:center;padding:8px 3px;border-radius:7px;font-size:9px;font-weight:750;line-height:1.17;border:1px solid #64748b;background:#334155}' +
      '.pg-photo-ui-share{background:#6d28d9;border-color:#6d28d9}' +
      '.pg-photo-ui-ipad .pg-photo-ui-modal{margin:5px 14px 12px;padding:10px 16px}' +
      '.pg-photo-ui-ipad .pg-photo-ui-privacy{font-size:10px;margin-bottom:6px}' +
      '.pg-photo-ui-ipad .pg-photo-ui-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:16px}' +
      '.pg-photo-ui-ipad .pg-photo-ui-image{height:100px}' +
      '.pg-photo-ui-ipad .pg-photo-ui-textbox{height:64px}' +
      '.pg-photo-ui-ipad .pg-photo-ui-picker,.pg-photo-ui-ipad .pg-photo-ui-camera{font-size:11px;padding:6px}' +
      '.pg-photo-ui-ipad .pg-photo-ui-buttons{margin-top:11px}' +
      '.pg-photo-ui-ipad .pg-photo-ui-buttons>div{font-size:11px;padding:11px 3px}' +
      '#pg-photo-iphone-card .pg-photo-ui-header{font-size:7px}' +
      '#pg-photo-iphone-card .pg-photo-ui-image{height:78px}' +
      '#pg-photo-iphone-card .pg-photo-ui-modal{margin:6px 6px 0;padding:8px}' +
      '#pg-photo-iphone-card .pg-photo-ui-privacy{font-size:7px}' +
      '#pg-photo-iphone-card .pg-photo-ui-picker,#pg-photo-iphone-card .pg-photo-ui-camera{font-size:8px;padding:5px}' +
      '#pg-photo-iphone-card .pg-photo-ui-textbox{height:35px}' +
      '#pg-photo-iphone-card .pg-photo-ui-context-title,#pg-photo-iphone-card .pg-photo-ui-buttons>div{font-size:8px}' +
      '@media(max-width:600px){#pg-photo-ipad-card .pg-photo-ui-modal{margin:5px 9px;padding:8px}#pg-photo-ipad-card .pg-photo-ui-layout{gap:8px}#pg-photo-ipad-card .pg-photo-ui-privacy{font-size:8px}}';
    d.head.appendChild(tag);
  }
  function init(){
    style();renderFrame('iphone');renderFrame('ipad');localize();
    w.addEventListener('pg:languagechange',localize);
    w.addEventListener('pageshow',localize);
    var last=lang();w.setInterval(function(){var next=lang();if(next!==last){last=next;localize();}},1800);
  }
  if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(window,document);
