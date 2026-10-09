# Poly-Glot search visibility and AI discovery measurement

GA4 measurement ID: G-MECD55W2RG. The homepage keeps its existing GA4 tag and App Store click listener. The shared discovery-analytics.js file adds GA4 pageview collection on five topic pages and uses the existing GA4 tag on the homepage.

## GA4 events
- app_store_click: existing homepage event; now also on the five topic pages
- ai_referral_landing: identifiable incoming AI referrer (not a citation count)
- ai_assisted_app_store_click: subsequent outbound App Store clicks in the same tab session after an identifiable AI referral

GA4 event parameters: ai_provider, landing_page, page_path, link_url. Register ai_provider, ai_detection and page_path as event-scoped custom dimensions if needed for reporting.

AI referral sources omit invisible or stripped referrers; GA4 acquisition reports remain the source of truth for attribution. Bing referrers may represent ordinary Bing search and must not automatically be treated as Copilot. Google AI Overviews cannot be separated from regular Google organic traffic here. AI referrals do not establish citations, recommendations, or indexing.

## Search engine setup
Published sitemap (Google/Bing submission status not yet verified): https://hmoses.github.io/poly-glot-site/sitemap.xml
Robots: https://hmoses.github.io/poly-glot-site/robots.txt
Machine readable: https://hmoses.github.io/poly-glot-site/llms.txt

In Google Search Console, use Sitemaps to submit the sitemap and URL Inspection to check individual pages. Check indexed/not indexed status and crawl errors after Google refreshes. In Bing Webmaster Tools, import the site from Search Console or verify property ownership; submit the same sitemap. IndexNow requires a validated API key hosted at the website root and should not be treated as confirmed indexing from HTTP 202 alone.

## Suggested weekly dashboard
GA4: active users, engaged sessions, page path, source/medium, app_store_click, ai_referral_landing, ai_assisted_app_store_click.
GSC: clicks, impressions, CTR, average position, indexing coverage for five topic pages.
Bing: indexing, impressions, searches, referral visits.
Manual AI visibility: track dates, the exact questions asked of each assistant, cited URL, response, and whether the assistant actually cites Poly-Glot. Separate brand mentions from source citations.
