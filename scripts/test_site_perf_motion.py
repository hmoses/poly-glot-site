#!/usr/bin/env python3
"""Smoke test load and Apple-style scroll effects without changing existing page workflows."""
import asyncio, http.server, os, threading
from pathlib import Path
from playwright.async_api import async_playwright
ROOT = Path(__file__).resolve().parents[1]
PAGES = ['connect.html','compare-ai-tools.html','multilingual-ai-workspace.html','prompt-templates.html','mcp-integrations.html','privacy-and-pricing.html','privacy.html','terms.html','support.html','share.html','seo-setup.html']
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

async def main():
    os.chdir(ROOT)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',8878),Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    try:
        async with async_playwright() as pw:
            browser=await pw.chromium.launch(headless=True,args=['--no-sandbox'])
            for width in (390,1280):
                page=await browser.new_page(viewport={'width':width,'height':844})
                for path in PAGES:
                    errors=[]
                    page.on('pageerror',lambda e: errors.append(str(e)))
                    await page.goto(f'http://127.0.0.1:8878/{path}?lang=ES',wait_until='domcontentloaded')
                    await page.wait_for_function("Boolean(window._pgI18n?.LANGS?.length === 38 && document.body.classList.contains('pg-subpage-motion'))",timeout=20000)
                    await page.evaluate("window.scrollTo(0,Math.min(document.body.scrollHeight-600,420))")
                    await page.wait_for_timeout(220)
                    result=await page.evaluate("""() => ({
                      motion:document.body.classList.contains('pg-subpage-motion'),
                      styles:[...document.querySelectorAll('link[rel=stylesheet]')].some(x=>x.href.includes('section-motion.css?v=8')),
                      runtime:[...document.scripts].some(x=>x.src.includes('section-motion.js?v=8')),
                      lang:window._pgI18n.curLang(),
                      count:window._pgI18n.LANGS.length,
                      head:Array.from(document.querySelectorAll('.pg-motion-item')).length,
                      card:Array.from(document.querySelectorAll('.pg-motion-card')).length,
                      section:Array.from(document.querySelectorAll('.pg-motion-section')).length,
                      htmlWidth:document.documentElement.scrollWidth,
                      windowWidth:window.innerWidth
                    })""")
                    assert result['motion'] and result['styles'] and result['runtime'],(path,result)
                    assert result['lang']=='ES' and result['count']==38,(path,result)
                    assert (result['head']+result['card']+result['section'])>0,(path,result)
                    assert not errors,(path,errors[:5])
                    print('PASS',width,path,'motion',result['section'],result['card'],result['head'],flush=True)
                await page.close()
            analytics=await browser.new_page(viewport={'width':390,'height':844})
            await analytics.goto('http://127.0.0.1:8878/go/stats/',wait_until='domcontentloaded')
            await analytics.wait_for_function("document.body.classList.contains('pg-subpage-motion')")
            assert await analytics.locator('.grid > .card.pg-motion-card').count()>=1
            await analytics.close()
            home=await browser.new_page(viewport={'width':390,'height':844})
            await home.goto('http://127.0.0.1:8878/?lang=FR',wait_until='domcontentloaded')
            await home.wait_for_function("Boolean(window._pgI18n?.LANGS?.length === 38 && window.switchGallery)",timeout=35000)
            # The interactive gallery can replace image nodes after boot. Verify lazy
            # loading against the source HTML, which is what the browser initially parses.
            static_home=(ROOT/'index.html').read_text()
            assert static_home.count('loading="lazy" decoding="async" fetchpriority="low"')>=7
            assert await home.locator('img.duo-exact-image[src="assets/img/iphone-duo-simulator.jpg"]').count()==1
            assert await home.locator('link[href="assets/css/section-motion.css?v=7"]').count()==1
            await home.evaluate("switchGallery('mac')")
            assert await home.locator('#gallery-mac').count()==1
            await home.evaluate("window._pgI18n.setLang('EN','🇺🇸')")
            await home.wait_for_function("window._pgI18n.curLang()==='EN'",timeout=15000)
            print('PASS homepage lazy images, Mac gallery, 38 languages and homepage CSS',flush=True)
            await browser.close()
    finally:
        server.shutdown()
if __name__=='__main__':asyncio.run(main())
