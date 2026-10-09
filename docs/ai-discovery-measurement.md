# Poly-Glot AI discovery and indexing measurement

Updated: 2026-10-09. Covers the GitHub Pages site, not native-app usage or MCP tool counts.

## GA4 implementation

Property measurement ID: `G-MECD55W2RG`. The homepage already had Google tag + `app_store_click`; do not add a second homepage GA4 configuration or duplicate that event.

The five SEO/AEO knowledge-center HTML pages now use the same Google tag: `compare-ai-tools.html`, `multilingual-ai-workspace.html`, `prompt-templates.html`, `mcp-integrations.html`, `privacy-and-pricing.html`. Each automatically emits GA4 `page_view`.

`assets/js/discovery-analytics.js` is shared by the homepage and these five pages. It emits:
- `ai_referral_visit` when an external referring domain or a recognized `utm_source` identifies an AI assistant; parameters `ai_source`, `ai_detection` (referrer/utm), `page_path`, `content_group`.
- `app_store_click` on each knowledge page's App Store links; preserves the existing homepage's event without duplicating it.
- `ai_assisted_app_store_click` on App Store links if a recognizable AI source referred that visitor, including subsequent internal pages within the same browser tab/session.

Recognized sources: ChatGPT, Perplexity, Claude, Gemini, Copilot, Grok, Mistral, Poe, You.com, Meta AI, DuckDuckGo AI, and Phind. Other referrals stay unknown; do not falsely attribute Google searches/AI Overviews to Gemini. Some AI clients suppress the `Referer` header, so these are **known-attributed visits**, not all AI-origin traffic.

Only the provider label, attribution method, page path, and link information are sent as event parameters; no prompts or full referring URLs are tracked by this script. The existing Google tag still has its own privacy/consent considerations. `sessionStorage` attribution is optional and fails safely where unavailable.

### Set up GA4 reporting (property administrator action)

1. In GA4 **Admin > Data display > Custom definitions**, add **event-scoped custom dimensions** for `ai_source`, `ai_detection`, `content_group`, and `page_path`. Do not create event-scoped dimensions for reserved GA4 parameters.
2. Use **Reports > Realtime** (and DebugView if enabled) to verify a knowledge page's `page_view`, `app_store_click`, and a test `ai_referral_visit` from `?utm_source=chatgpt&utm_medium=ai`. A simulated visit counts as test traffic in a production property unless excluded.
3. In **Explore**, break down `ai_referral_visit` and `ai_assisted_app_store_click` by `ai_source` and landing page. Compare against all `page_view` and `app_store_click` events. GA4 custom dimensions may take 24–48 hours to populate reports.
4. In **Reports > Acquisition > Traffic acquisition**, separately inspect session source/medium for `chatgpt.com / referral`, `perplexity.ai / referral`, etc., and tracked UTM campaigns. AI-source parameters provide an additional explicit channel, not a replacement for source/medium.
5. If tracking app-store conversions as key events, mark **only** `app_store_click` as the primary click conversion. Do not also mark the AI-assisted subset as a key event and sum both (double-counting).

Tracking clicks is *not* the same as proving an App Store install or subscription. Keep App Store Connect reporting separate.

## SEO/GEO index checks and sitemap submission (owner sign-in required)

Canonical sitemap: https://hmoses.github.io/poly-glot-site/sitemap.xml
Robots: https://hmoses.github.io/poly-glot-site/robots.txt
AI discovery: https://hmoses.github.io/poly-glot-site/llms.txt

### Google Search Console

At https://search.google.com/search-console open the verified property `https://hmoses.github.io/poly-glot-site/` (or an appropriate URL-prefix property).
1. Open **Indexing > Sitemaps** and submit the complete sitemap URL above (or `sitemap.xml` if the form uses a property-relative path).
2. Verify status is **Success**; use **URL Inspection** to check live/indexed status of the homepage and all five topic pages. For changed pages, choose **Request indexing** where available.
3. Review **Performance > Search results** by page, query, impressions, CTR, and indexed coverage; this measures Google search, **not guaranteed AI citations**.

### Bing Webmaster Tools

At https://www.bing.com/webmasters select the verified site, open **Sitemaps > Submit sitemap**, and paste the same canonical sitemap. Verify Bing's processing status. Use URL Inspection for the five knowledge pages. Bing also supports IndexNow, which requires a verifiable key hosted at an authorized site path; do not claim it was submitted before successful verification.

### Indexing evidence log

As of 2026-10-09, repository presence and source-file correctness were inspected. Google/Bing ownership dashboards were **not connected** in this ChatGPT session. No Google or Bing sitemap submission, per-URL indexed status, or ranking improvement is claimed until the authenticated dashboards show it.

## AI citation monitoring (separate from site analytics)

AI citation appearances do not automatically produce a GA4 visit. For each test, record: date/time and locale, AI engine (ChatGPT/Perplexity/Gemini/Copilot), repeatable informational query (e.g., `multilingual AI comparison app 38 languages`), whether Poly-Glot was named, whether an exact clickable source URL was provided, and the URL/screenshot if verified. Record answer presence without a linked source separately from **verified citation**.

Suggested weekly monitoring queries:
- `What apps compare responses from ChatGPT Claude and Gemini in one workspace?`
- `AI prompt templates and comparison tools in 38 languages`
- `Poly-Glot AI Workspace MCP integration setup`
- `AI apps for comparing assistants on Mac iPhone and iPad`

Do not equate a Google-indexed page with an LLM answer citation. Do not assume an AI result seen once is consistent across users. Mark citation status `unverified` until independently observed.

| Audit date | Engine | Query | Poly-Glot named | Clickable Poly-Glot source URL | Evidence |
| --- | --- | --- | --- | --- | --- |
| 2026-10-09 | Not yet inspected in authenticated AI answers | — | Unknown | Unverified | Awaiting repeatable tests |

## Safeguards

No changes to app purchases, subscriptions, MCP transport, API endpoints, localization, CSS, SEO canonical tags, sitemap routing, or the existing homepage Google Tag. Measure post-deployment GA4 hits and Google/Bing status independently.
