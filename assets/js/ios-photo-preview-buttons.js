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
                       '#gallery-ipad .ipad-redesign-action-row,' +
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
