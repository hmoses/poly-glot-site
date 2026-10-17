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


/* Static Photo to AI gallery cards — iOS/iPadOS v1.1.8 (942) screen reference.
 * iPhone/iPad remain NON-INTERACTIVE: the existing global gallery lightbox
 * enlarges the whole device. Mac retains its separate interactive modal.
 * No native app launches, requests, photo access or paid-product changes.
 */
(function (w, d) {
  'use strict';
  var styleId = 'pg-photo-ios-static-v942';
  function language() {
    var raw = (w._pgI18n && typeof w._pgI18n.curLang === 'function' && w._pgI18n.curLang()) ||
      localStorage.getItem('pgLang') || d.documentElement.lang || navigator.language || 'EN';
    return String(raw).toUpperCase().replace(/-/g, '_');
  }
  function dictionary() {
    var all = w.PGPhotoAILocales || {}, code = language();
    return all[code] || all[code.split('_')[0]] || all.EN || {};
  }
  function node(tag, cls, content) {
    var result = d.createElement(tag);
    if (cls) result.className = cls;
    if (content !== undefined) result.textContent = content;
    return result;
  }
  function set(card, selector, value) {
    var target = card.querySelector(selector);
    if (target && target.textContent !== value) target.textContent = value;
  }
  function openAction(code) {
    var all = w.PGPhotoPreviewActionLabels || {};
    var entry = all[code] || all[code.split('_')[0]] || all.EN;
    // Mac's 39-language label adds "(paste photo)"; iOS's native screenshot does not.
    return entry && entry[0] ? entry[0].replace(/\s*[\(（][^\)）]*[\)）]\s*$/, '').trim() : 'Open selected AI';
  }
  function addGalleryFrame(device) {
    var grid = d.querySelector('#gallery-' + device + ' .gallery-grid');
    if (!grid || d.getElementById('pg-photo-' + device + '-card')) return;
    var card = node('div', 'gallery-item pg-photo-static-card');
    card.id = 'pg-photo-' + device + '-card';
    var frame = node('div', device === 'iphone' ? 'iphone-device' : 'ipad-device');
    frame.setAttribute('aria-label', device === 'iphone' ? 'Photo to AI iPhone app preview' : 'Photo to AI iPad app preview');
    if (device === 'iphone') frame.appendChild(node('span', 'iphone-side-left'));
    var screen = node('div', device === 'iphone' ? 'iphone-screen' : 'ipad-screen');
    var ui = node('div', 'pg-photo-static pg-photo-static-' + device);
    var back = node('div', 'pg-photo-bg');
    var status = node('div', 'pg-photo-status');
    status.appendChild(node('strong', '', '1:14'));
    status.appendChild(node('span', '', '▰  ◉  ▣'));
    back.appendChild(status);
    var bar = node('div', 'pg-photo-appbar');
    var logo = node('img');
    logo.src = 'assets/img/icon-128.png'; logo.alt = '';
    bar.appendChild(logo);
    bar.appendChild(node('span', '', 'Poly-Glot AI Workspace'));
    back.appendChild(bar);
    back.appendChild(node('div', 'pg-photo-underlay', "What's New in v1.1.8 (942)"));
    ui.appendChild(back);
    ui.appendChild(node('div', 'pg-photo-shade'));
    var sheet = node('div', 'pg-photo-sheet');
    var heading = node('div', 'pg-photo-heading');
    heading.appendChild(node('strong', 'pg-photo-title'));
    heading.appendChild(node('span', 'pg-photo-close', '×'));
    sheet.appendChild(heading);
    sheet.appendChild(node('p', 'pg-photo-privacy'));
    var drop = node('div', 'pg-photo-picker');
    drop.appendChild(node('div', 'pg-photo-picker-icon', '📷'));
    drop.appendChild(node('strong', 'pg-photo-picker-title'));
    drop.appendChild(node('small', 'pg-photo-picker-sources'));
    sheet.appendChild(drop);
    var actions = node('div', 'pg-photo-choose-actions');
    actions.appendChild(node('div', 'pg-photo-choose'));
    actions.appendChild(node('div', 'pg-photo-take'));
    sheet.appendChild(actions);
    sheet.appendChild(node('strong', 'pg-photo-provider-label'));
    var selected = node('div', 'pg-photo-provider-selected');
    selected.appendChild(node('span', '', 'ChatGPT'));
    selected.appendChild(node('span', 'pg-photo-provider-caret', '⌃\n⌄'));
    sheet.appendChild(selected);
    sheet.appendChild(node('div', 'pg-photo-open'));
    var notes = node('div', 'pg-photo-notes');
    notes.appendChild(node('div', 'pg-photo-step-one'));
    notes.appendChild(node('div', 'pg-photo-step-two'));
    notes.appendChild(node('div', 'pg-photo-step-three'));
    sheet.appendChild(notes);
    ui.appendChild(sheet);
    screen.appendChild(ui);
    screen.appendChild(node('div', device === 'iphone' ? 'iphone-home-indicator' : 'ipad-home-indicator'));
    frame.appendChild(screen);
    card.appendChild(frame);
    card.appendChild(node('div', 'gallery-label pg-photo-label'));
    var first = grid.querySelector('.gallery-item');
    if (first && first.nextSibling) grid.insertBefore(card, first.nextSibling);
    else grid.appendChild(card);
  }
  function localize() {
    var code = language(), t = dictionary(), isEnglish = code === 'EN' || code.indexOf('EN_') === 0;
    ['iphone', 'ipad'].forEach(function (device) {
      var card = d.getElementById('pg-photo-' + device + '-card');
      if (!card) return;
      card.dir = /^(AR|HE)(_|$)/.test(code) ? 'rtl' : 'ltr';
      set(card, '.pg-photo-title', '📷 ' + (t.feature || 'Photo to AI'));
      set(card, '.pg-photo-privacy', t.photoPolicy || 'Photos leave your device only when you share them. When you share a photo, the selected app can process or store it under its own privacy policy.');
      set(card, '.pg-photo-picker-title', isEnglish ? 'Tap to choose photo' : (t.choose || 'Choose photo'));
      set(card, '.pg-photo-picker-sources', isEnglish ? 'Photo Library · Camera · Files' : (t.choose || 'Choose photo') + ' · ' + (t.camera || 'Take photo'));
      set(card, '.pg-photo-choose', '📷 ' + (t.choose || 'Choose photo'));
      set(card, '.pg-photo-take', '📸 ' + (t.camera || 'Take photo'));
      set(card, '.pg-photo-provider-label', t.share || 'Share with AI');
      set(card, '.pg-photo-open', '📷 ' + openAction(code));
      set(card, '.pg-photo-step-one', isEnglish ? '• Choose a photo, select your AI, then tap "Open selected AI".' : '• ' + (t.choose || 'Choose photo') + ' · ' + (t.share || 'Share with AI'));
      set(card, '.pg-photo-step-two', isEnglish ? '• Long-press → Paste the photo in the AI chat. Type your instructions and send.' : '• ' + (t.manualPhoto || 'Paste or attach the photo in the selected AI chat.'));
      set(card, '.pg-photo-step-three', '• ' + (t.locked || 'Pro required after your 3-day trial.'));
      set(card, '.pg-photo-label', t.feature || 'Photo to AI');
    });
  }
  function style() {
    if (d.getElementById(styleId)) return;
    var el = node('style'); el.id = styleId;
    el.textContent = \`
/* iPhone/iPad static lightbox content: no pointer listeners, no fake controls.
   All content is bounded by the native-screen mask for each aspect ratio. */
#gallery-iphone .pg-photo-static-card,#gallery-ipad .pg-photo-static-card{min-width:0;max-width:100%;overflow:visible!important;box-shadow:none!important;border:0!important;background:transparent!important}
#gallery-iphone .pg-photo-static-card .iphone-device,#gallery-ipad .pg-photo-static-card .ipad-device{max-width:100%;margin-inline:auto;cursor:zoom-in}
#gallery-iphone .pg-photo-static-card .iphone-screen{aspect-ratio:440/956!important;height:auto!important;overflow:hidden!important}
#gallery-ipad .pg-photo-static-card .ipad-screen{aspect-ratio:4/3!important;height:auto!important;overflow:hidden!important}
.pg-photo-static{position:absolute;inset:0;overflow:hidden;background:#04070d;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',sans-serif;pointer-events:none;box-sizing:border-box}
.pg-photo-static *{box-sizing:border-box;min-width:0;overflow-wrap:anywhere}
.pg-photo-bg{position:absolute;inset:0;background:#05070b}
.pg-photo-status{display:flex;justify-content:space-between;align-items:center;padding:5% 9% 0;color:#fff;font-size:3.2cqw;font-weight:700;white-space:nowrap}
.pg-photo-appbar{display:flex;align-items:center;gap:5px;margin:14% 8% 0;font-size:3.2cqw;color:#8991a0}
.pg-photo-appbar img{width:17px;height:17px;border-radius:4px;opacity:.65}
.pg-photo-underlay{position:absolute;bottom:8%;left:6%;right:6%;font-size:3.7cqw;font-weight:800;color:#727b91}
.pg-photo-shade{position:absolute;inset:0;background:#000b}
.pg-photo-sheet{position:absolute;top:9%;left:3.5%;right:3.5%;height:70%;display:flex;flex-direction:column;gap:2.4%;background:#192337;border:1px solid #495674;border-radius:16px;padding:5% 4.2% 3.5%;overflow:hidden;box-shadow:0 8px 25px #0008}
.pg-photo-heading{display:flex;justify-content:space-between;align-items:center;gap:5px;flex:0 0 auto}
.pg-photo-title{font-weight:750;font-size:4.6cqw;line-height:1.12;color:#fff}
.pg-photo-close{font-size:6.6cqw;line-height:1;color:#fff;font-weight:350}
.pg-photo-privacy{margin:0;color:#bcc7dd;font-size:2.75cqw;line-height:1.38;flex:0 0 auto}
.pg-photo-picker{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6%;height:30%;min-height:0;flex-shrink:1;border:2px solid #485772;border-radius:11px;background:#0b1324;text-align:center}
.pg-photo-picker-icon{font-size:8cqw;line-height:1.1}
.pg-photo-picker-title{font-size:3.6cqw;line-height:1.18;color:#fff}
.pg-photo-picker-sources{font-size:2.7cqw;line-height:1.16;color:#98a8c3}
.pg-photo-choose-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3%;height:10%;flex:0 0 auto}
.pg-photo-choose,.pg-photo-take{display:flex;justify-content:center;align-items:center;text-align:center;line-height:1.2;padding:2px 4px;border:1px solid #7384a0;border-radius:10px;background:#35445e;font-size:3cqw;font-weight:700;color:#f8faff}
.pg-photo-provider-label{font-size:3.3cqw;line-height:1.15;flex:0 0 auto;color:#fff}
.pg-photo-provider-selected{display:flex;justify-content:space-between;align-items:center;min-height:0;height:10%;flex:0 0 auto;padding:1% 3.5%;border:2px solid #28df9f;border-radius:10px;box-shadow:0 0 7px #0ab98255;background:#253349;font-size:3.4cqw}
.pg-photo-provider-caret{font-size:3.2cqw;white-space:pre;line-height:.52;color:#0c1827}
.pg-photo-open{height:12%;min-height:0;flex:0 0 auto;display:flex;align-items:center;justify-content:center;padding:1% 2%;background:linear-gradient(115deg,#09bd90,#00a276);border:2px solid #00b78c;border-radius:11px;box-shadow:0 0 10px #03b98666;color:#fff;font-size:3.6cqw;font-weight:750;text-align:center;line-height:1.15}
.pg-photo-notes{margin-top:1%;display:flex;flex-direction:column;gap:2px;color:#9aabc7;font-size:2.7cqw;line-height:1.3;overflow:hidden;flex:1 1 auto}
.pg-photo-label{text-align:center}
#pg-photo-iphone-card .pg-photo-static{container-type:size}
#pg-photo-iphone-card .pg-photo-sheet{gap:2.35%;padding:5% 4%;height:76%}
#pg-photo-iphone-card .pg-photo-picker{height:29%}
#pg-photo-iphone-card .pg-photo-notes{font-size:2.5cqw}
#pg-photo-ipad-card .pg-photo-static{container-type:size}
#pg-photo-ipad-card .pg-photo-sheet{top:5%;height:90%;left:5%;right:5%;padding:2.8% 3.5%;gap:1.8%;border-radius:13px}
#pg-photo-ipad-card .pg-photo-title{font-size:3.2cqw}
#pg-photo-ipad-card .pg-photo-close{font-size:4cqw}
#pg-photo-ipad-card .pg-photo-privacy{font-size:1.7cqw;line-height:1.26}
#pg-photo-ipad-card .pg-photo-picker{height:22%;flex-shrink:1;border-width:1px;border-radius:8px;gap:0}
#pg-photo-ipad-card .pg-photo-picker-icon{font-size:4.4cqw}
#pg-photo-ipad-card .pg-photo-picker-title{font-size:2.3cqw}
#pg-photo-ipad-card .pg-photo-picker-sources{font-size:1.9cqw}
#pg-photo-ipad-card .pg-photo-choose-actions{height:10%;gap:2%}
#pg-photo-ipad-card .pg-photo-choose,#pg-photo-ipad-card .pg-photo-take{font-size:2.2cqw;border-radius:7px}
#pg-photo-ipad-card .pg-photo-provider-label{font-size:2.4cqw}
#pg-photo-ipad-card .pg-photo-provider-selected{height:10%;font-size:2.4cqw;border-width:2px;border-radius:8px}
#pg-photo-ipad-card .pg-photo-provider-caret{font-size:2.2cqw}
#pg-photo-ipad-card .pg-photo-open{height:12%;font-size:2.4cqw;border-radius:8px}
#pg-photo-ipad-card .pg-photo-notes{font-size:1.8cqw;line-height:1.18;gap:0;overflow:hidden}
#pg-photo-ipad-card .pg-photo-underlay{font-size:2.4cqw}
.pg-photo-static-card[dir="rtl"] .pg-photo-sheet{direction:rtl;text-align:right}
.pg-photo-static-card[dir="rtl"] .pg-photo-notes{text-align:right}
@media(max-width:650px){
 #pg-photo-ipad-card .pg-photo-sheet{padding:2.2% 3%;gap:1.2%}
 #pg-photo-ipad-card .pg-photo-privacy{font-size:1.5cqw}
 #pg-photo-ipad-card .pg-photo-notes{font-size:1.55cqw}
}
@supports not (font-size:1cqw){
 .pg-photo-title{font-size:13px}.pg-photo-privacy{font-size:9px}
 .pg-photo-picker-title,.pg-photo-open{font-size:10px}
 .pg-photo-provider-label,.pg-photo-provider-selected{font-size:9px}
 .pg-photo-notes,.pg-photo-picker-sources{font-size:8px}
}
\`;
    d.head.appendChild(el);
  }
  function init() {
    style(); addGalleryFrame('iphone'); addGalleryFrame('ipad'); localize();
    w.addEventListener('pg:languagechange', localize);
    w.addEventListener('pg:photo-action-locales-ready', localize);
    w.addEventListener('pageshow', localize);
    var current = language();
    w.setInterval(function () {
      var next = language();
      if (next !== current) { current = next; localize(); }
    }, 1800);
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);
  else init();
})(window, document);
