#!/usr/bin/env python3
"""Functional smoke: subpage parallax, localization, links and loading hints."""
import asyncio
import http.server
import os
import re
import threading
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "connect.html", "compare-ai-tools.html", "mcp-integrations.html",
    "multilingual-ai-workspace.html", "privacy-and-pricing.html",
    "prompt-templates.html", "privacy.html", "terms.html", "support.html",
    "share.html", "seo-setup.html",
]

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

async def main():
    os.chdir(ROOT)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 8693), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        html = (ROOT / "index.html").read_text()
        assert 'no-cache, no-store, must-revalidate' not in html
        assert 'raw.githubusercontent.com/hmoses/poly-glot-site/966834' not in html
        images = re.findall(r'<img\\b[^>]*>', html, flags=re.I)
        screens = [i for i in images if 'assets/img/screenshots/' in i or 'class="mac-reference-base"' in i or 'class="duo-exact-image' in i]
        assert len(screens) == 7 and all('loading="lazy"' in i and 'fetchpriority="low"' in i for i in screens)

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True, args=["--no-sandbox"])
            for width, height, language in [(1280, 900, "ES"), (390, 844, "AR")]:
                page = await browser.new_page(viewport={"width": width, "height": height})
                errors = []
                page.on("pageerror", lambda e: errors.append(str(e)))
                for path in PAGES:
                    resp = await page.goto(f"http://127.0.0.1:8693/{path}?lang={language}", wait_until="domcontentloaded")
                    assert resp and resp.status == 200, (path, resp.status if resp else None)
                    await page.wait_for_function("window._pgI18n && document.body.classList.contains('pg-subpage-motion')", timeout=15000)
                    await page.wait_for_timeout(120)
                    result = await page.evaluate("""() => ({
                        lang: window._pgI18n.curLang(),
                        count: window._pgI18n.LANGS.length,
                        dir: document.documentElement.dir,
                        nodes: document.querySelectorAll('.pg-motion-section,.pg-motion-item,.pg-motion-card').length,
                        link: Array.from(document.querySelectorAll('a[href]')).some(a=>a.href.includes('apps.apple.com'))
                    })""")
                    assert result["lang"] == language and result["count"] == 38, (path, result)
                    if language == "AR":
                        assert result["dir"] == "rtl", (path, result)
                    assert result["nodes"] >= 1, (path, "motion classes not applied")
                    if path in ("connect.html", "compare-ai-tools.html", "prompt-templates.html"):
                        assert result["link"], (path, "App Store navigation missing")
                    print(f"PASS {width}px {language} {path} motion nodes={result['nodes']}", flush=True)
                    if path == "connect.html":
                        await page.evaluate("window.scrollTo(0, 700)")
                        await page.wait_for_timeout(200)
                        y = await page.locator(".pg-motion-section").first.evaluate("(e)=>e.style.getPropertyValue('--pg-bg-y')")
                        assert y.endswith("px"), ("parallax not updated on scroll", path, y)
                    if path == "prompt-templates.html" and width == 390:
                        cards = await page.locator("main article").evaluate_all(
                            "(els)=>els.map(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom}))"
                        )
                        for a,b in zip(cards, cards[1:]):
                            assert b["top"] >= a["bottom"], ("Arabic card overlap", cards)
                assert not errors, (language, errors[:10])
                await page.close()

            reduced = await browser.new_page(viewport={"width": 390, "height": 844}, reduced_motion="reduce")
            await reduced.goto("http://127.0.0.1:8693/connect.html?lang=EN", wait_until="domcontentloaded")
            await reduced.wait_for_function("document.body.classList.contains('pg-subpage-motion')")
            style = await reduced.locator(".guide-card").first.evaluate("(e)=>({transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity})")
            assert style == {"transform": "none", "opacity": "1"}, ("reduced-motion mismatch", style)
            await browser.close()
        print("PASS reduced motion and 7 homepage lazy images", flush=True)
    finally:
        srv.shutdown()

if __name__ == "__main__":
    asyncio.run(main())
