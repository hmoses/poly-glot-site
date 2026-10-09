/* Poly-Glot AI-discovery attribution. No prompt, email, or full referring URL is collected. */
(function () {
  'use strict';
  if (window.__pgDiscoveryAnalytics) return;
  window.__pgDiscoveryAnalytics = true;
  var pagePath = window.location.pathname;
  var knowledgePage = /\/(?:compare-ai-tools|multilingual-ai-workspace|prompt-templates|mcp-integrations|privacy-and-pricing)\.html$/.test(pagePath);
  var contentGroup = knowledgePage ? 'knowledge_center' : 'site';
  var storageKey = 'pg_ai_referral_source_v1';
  function sourceFromHost(host, path) {
    host = (host || '').toLowerCase().replace(/^www\./, '');
    path = (path || '').toLowerCase();
    function matches(domain) { return host === domain || host.endsWith('.' + domain); }
    if (matches('chatgpt.com') || host === 'chat.openai.com') return 'chatgpt';
    if (matches('perplexity.ai')) return 'perplexity';
    if (matches('claude.ai')) return 'claude';
    if (host === 'gemini.google.com') return 'gemini';
    if (host === 'copilot.microsoft.com' || (matches('bing.com') && path.indexOf('/chat') === 0)) return 'copilot';
    if (matches('grok.com')) return 'grok';
    if (host === 'chat.mistral.ai') return 'mistral';
    if (matches('poe.com')) return 'poe';
    if (matches('you.com')) return 'you';
    if (matches('meta.ai')) return 'meta_ai';
    if (matches('duck.ai') || (matches('duckduckgo.com') && path.indexOf('/duckai') === 0)) return 'duckduckgo_ai';
    if (matches('phind.com')) return 'phind';
    return '';
  }
  function sourceFromCampaign(raw) {
    var key = (raw || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    var known = {
      chatgpt: 'chatgpt', openaichat: 'chatgpt', perplexity: 'perplexity',
      claude: 'claude', gemini: 'gemini', copilot: 'copilot', bingchat: 'copilot',
      grok: 'grok', mistral: 'mistral', poe: 'poe', youcom: 'you',
      metaai: 'meta_ai', duckduckgoai: 'duckduckgo_ai', duckai: 'duckduckgo_ai',
      phind: 'phind'
    };
    return known[key] || '';
  }
  function send(eventName, params) {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
  }
  var source = '';
  var detection = '';
  var externalReferrer = false;
  try {
    var campaign = new URL(window.location.href).searchParams.get('utm_source');
    source = sourceFromCampaign(campaign);
    if (source) detection = 'utm';
  } catch (err) {}
  try {
    if (document.referrer) {
      var referringUrl = new URL(document.referrer);
      externalReferrer = referringUrl.origin !== window.location.origin;
      if (!source && externalReferrer) {
        source = sourceFromHost(referringUrl.hostname, referringUrl.pathname);
        if (source) detection = 'referrer';
      }
    }
  } catch (err) {}
  var carried = '';
  try {
    if (source) window.sessionStorage.setItem(storageKey, source);
    else if (externalReferrer) window.sessionStorage.removeItem(storageKey);
    else carried = window.sessionStorage.getItem(storageKey) || '';
  } catch (err) {}
  var attributedSource = source || carried;
  if (source) {
    send('ai_referral_visit', {
      ai_source: source, ai_detection: detection,
      page_path: pagePath, content_group: contentGroup
    });
  }
  document.addEventListener('click', function (event) {
    var target = event.target;
    var link = target && typeof target.closest === 'function' ? target.closest('a[href]') : null;
    if (!link) return;
    var url;
    try { url = new URL(link.href, window.location.href); } catch (err) { return; }
    if (url.hostname !== 'apps.apple.com') return;
    var details = {
      link_url: url.href,
      link_text: (link.textContent || '').trim().slice(0, 50),
      page_path: pagePath,
      content_group: contentGroup
    };
    // The homepage already has its own app_store_click handler. Never count it twice.
    if (knowledgePage) send('app_store_click', details);
    if (attributedSource) {
      details.ai_source = attributedSource;
      send('ai_assisted_app_store_click', details);
    }
  }, false);
})();
