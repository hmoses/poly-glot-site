#!/usr/bin/env python3
"""Regression for mobile Mac showcase captions and live site locale transitions."""
import asyncio,os,threading,http.server
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
async def main():
    os.chdir(ROOT)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',8877),Handler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    async with async_playwright() as pw:
        browser=await pw.chromium.launch(headless=True,args=['--no-sandbox'])
        page=await browser.new_page(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        await page.goto('http://127.0.0.1:8877/?lang=FR',wait_until='domcontentloaded',timeout=30000)
        await page.wait_for_function('window._pgI18n&&window._pgDeviceUI&&window._pgI18n.curLang()==="FR"',timeout=15000)
        await page.locator('#screenshots').scroll_into_view_if_needed()
        await page.evaluate("switchGallery('mac')")
        await page.wait_for_timeout(1200)
        async def check(code,tab,word):
            await page.evaluate("(x)=>window.switchMacTab(x)",tab)
            await page.wait_for_timeout(550)
            data=await page.evaluate("""() => ({
              lang:window._pgI18n.curLang(),
              active:document.querySelector('#gallery-mac .mac-reference-tab.active')?.id,
              caption:document.querySelector('#macTabLabel')?.textContent?.trim(),
              title:document.querySelector('#demo [data-i18n="demoH"]')?.textContent?.trim(),
              expected:window._pgI18n.gt('demoH',window._pgI18n.curLang()),
              macLanguage:document.querySelector('#gallery-mac .mac-reference-interactive')?.getAttribute('data-pg-mac-locale')
            })""")
            assert data['lang']==code,(code,data)
            assert data['active']=='macTab-'+tab,(code,tab,data)
            assert word.lower() in (data['caption'] or '').lower(),(code,tab,data)
            assert data['title']==data['expected'],(code,tab,data)
            assert data['macLanguage']==code,(code,tab,data)
            print('PASS',code,tab,data['caption'][:70],flush=True)
        await check('FR','askanyai','Demandez')
        await check('FR','templates','Modèles')
        await check('FR','howtouse','utilis')
        await check('FR','history','Histor')
        heading=page.locator('#demo .section-title[data-i18n="demoH"]')
        await heading.scroll_into_view_if_needed()
        await page.wait_for_timeout(350)
        await page.screenshot(path='mobile-french-localization-check.png',full_page=False)
        dims=await heading.evaluate('(e)=>({scroll:e.scrollWidth,client:e.clientWidth,rect:e.getBoundingClientRect().toJSON()})')
        assert dims['scroll']<=dims['client']+4,dims
        await page.evaluate("window._pgI18n.setLang('EN','🇺🇸')")
        await check('EN','askanyai','Ask Any AI')
        await page.evaluate("window._pgI18n.setLang('FR','🇫🇷')")
        await check('FR','templates','Modèles')
        assert not errors,errors[:6]
        await browser.close()
    server.shutdown()
    print('PASS: mobile locale transitions, 4 Mac tabs, heading fit and FR-EN-FR switches')
if __name__=='__main__':asyncio.run(main())
