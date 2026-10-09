/* Poly-Glot knowledge-center GA4 and AI referral tracking. No cookies beyond standard GA4. */
(function () {
  'use strict';
  var measurementId = 'G-MECD55W2RG';
  if (window.__polyglotDiscoveryAnalytics) return;
  window.__polyglotDiscoveryAnalytics = true;
  var providers = [
    ['chatgpt', /(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$/],
    ['perplexity', /(^|\.)perplexity\.ai$/],
    ['copilot', /(^|\.)copilot\.microsoft\.com$/],
    ['gemini', /(^|\.)gemini\.google\.com$/],
    ['claude', /(^|\.)claude\.ai$/],
    ['grok', /(^|\.)grok\.com$/],
    ['you_com', /(^|\.)you\.com$/],
    ['poe', /(^|\.)poe\.com$/],
    ['phind', /(^|\.)phind\.com$/],
    ['mistral', /^chat\.mistral\.ai$/],
    ['duckduckgo_ai', /(^|\.)duck\.ai$/],
    ['meta_ai', /(^|\.)meta\.ai$/]
  ];
  function providerFor(host) {
    host = (host || '').toLowerCase();
    for (var i = 0; i < providers.length; i++) {
      if (providers[i][1].test(host)) return providers[i][0];
    }
    return '';
  }
  function getReferrerHost() {
    try { return new URL(document.referrer).hostname; } catch (_) { return ''; }
  }
  function send(event, params) {
    if (typeof window.gtag === 'function') window.gtag('event', event, params);
  }
  function init() {
    var externalTag = document.querySelector('script[src*="googletagmanager.com/gtag/js?id=' + measurementId + '"]');
    if (!externalTag) {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        window.gtag = function () { window.dataLayer.push(arguments); };
      }
      window.gtag('js', new Date());
      window.gtag('config', measurementId);
      var tag = document.createElement('script');
      tag.async = true;
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
      document.head.appendChild(tag);
    }
    var referrer = getReferrerHost();
    var aiProvider = providerFor(referrer);
    var detection = aiProvider ? 'referrer' : '';
    try {
      var source = (new URLSearchParams(location.search).get('utm_source') || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      var knownSources = {
        chatgpt:'chatgpt', openaichat:'chatgpt', perplexity:'perplexity',
        claude:'claude', copilot:'copilot', bingchat:'copilot',
        gemini:'gemini', grok:'grok', mistral:'mistral',
        duckduckgoai:'duckduckgo_ai', duckai:'duckduckgo_ai',
        youcom:'you_com', poe:'poe', phind:'phind', metaai:'meta_ai'
      };
      if (knownSources[source]) { aiProvider = knownSources[source]; detection = 'utm'; }
    } catch (_) {}
    if (!aiProvider && referrer && referrer !== location.hostname) {
      try { sessionStorage.removeItem('pg_ai_source'); } catch (_) {}
    }
    if (aiProvider) {
      try { sessionStorage.setItem('pg_ai_source', aiProvider); } catch (_) {}
      send('ai_referral_landing', { ai_provider: aiProvider, ai_detection: detection, landing_page: location.pathname, page_path: location.pathname, transport_type: 'beacon' });
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var target;
      try { target = new URL(a.href, location.href); } catch (_) { return; }
      if (target.hostname !== 'apps.apple.com') return;
      // The homepage already sends app_store_click; retain its existing handler.
      var onHomepage = location.pathname === '/poly-glot-site/' || location.pathname === '/poly-glot-site/index.html';
      if (!onHomepage) {
        send('app_store_click', { link_url: target.href, link_text: (a.textContent || '').trim().slice(0, 50), page_path: location.pathname, transport_type: 'beacon' });
      }
      var assistedSource = '';
      try { assistedSource = sessionStorage.getItem('pg_ai_source') || ''; } catch (_) {}
      if (assistedSource) {
        send('ai_assisted_app_store_click', { ai_provider: assistedSource, page_path: location.pathname, transport_type: 'beacon' });
      }
    }, false);
  }
  init();
})();
