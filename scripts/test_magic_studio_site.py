"""Check the Magic Studio demo and chat across all 38 languages."""
import asyncio, http.server, json, os, threading
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
async def main():
    os.chdir(ROOT)
    catalog=json.JSONDecoder().raw_decode((ROOT/'assets/js/magic-studio-site.js').read_text().split('const locales=',1)[1])[0]
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),Quiet)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        page=await browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce')
        await page.goto('http://127.0.0.1:'+str(server.server_port)+'/?lang=EN',wait_until='domcontentloaded')
        await page.wait_for_function('window._pgMagicStudioChatLookup && window._pgI18n')
        for code,t in catalog.items():
            await page.evaluate('(c)=>window._pgI18n.setLang(c,window._pgI18n.LANGS.find(x=>x.code===c)?.flag)',code)
            await page.wait_for_function("(c)=>document.querySelector('#magic-studio').lang===(c==='ZH_TW'?'zh-Hant':c.toLowerCase())",arg=code)
            result=await page.evaluate("""()=>{const r=document.querySelector('#magic-studio');return {steps:[...r.querySelectorAll('.ms-step strong')].map(x=>x.textContent),styles:[...r.querySelectorAll('.ms-feature-overview [data-ms-theme]')].map(x=>x.textContent),actions:[...r.querySelectorAll('.ms-feature-overview [data-ms-action]')].map(x=>x.textContent),dir:r.dir,chat:window._pgMagicStudioChatLookup('Magic Studio'),overflow:[...r.querySelectorAll('.ms-style,.ms-action,.ms-step,.ms-provider-grid')].filter(x=>x.clientWidth&&x.scrollWidth>x.clientWidth+3).length}}""")
            assert result['steps']==[x[0] for x in t['steps']],(code,'steps')
            assert result['styles']==t['themes'][:9],(code,'styles')
            assert result['actions']==t['actions'][:10],(code,'actions')
            assert result['dir']==('rtl' if code in ['AR','HE'] else 'ltr'),(code,'direction')
            assert all(x[0] in result['chat'] for x in t['steps']),(code,'chat')
            badge=await page.locator('#ms-available-badge').text_content()
            assert badge in result['chat'] and 'Poly-Glot AI Workspace' in badge,(code,'availability')
            assert 'Coming Soon' not in result['chat'],(code,'stale availability')
            assert await page.locator('#magic-studio [data-ms-scene="3"] [data-ms-sd="3"]').text_content()==t['steps'][3][1],(code,'demo prompt')
            assert not result['overflow'],(code,'overflow',result['overflow'])
            for n in range(8):
                await page.evaluate('(n)=>document.querySelectorAll("#magic-studio .ms-step")[n].click()',n)
                assert await page.locator('#ms-count').text_content()==f'{n+1} / 8'
                assert await page.locator('#magic-studio .ms-scene:not([hidden])').count()==1
            print('PASS',code,'8 stages, 8 themes, 10 actions, chat, mobile layout',flush=True)
        await page.evaluate("window._pgI18n.setLang('EN','🇺🇸')")
        await page.locator('#magic-studio').scroll_into_view_if_needed()
        await page.evaluate("document.querySelectorAll('#magic-studio .ms-step')[2].click()")
        await page.locator('#magic-studio .ms-demo').first.screenshot(path='/tmp/magic-site-preview.png')
        await browser.close()
    server.shutdown()
asyncio.run(main())
