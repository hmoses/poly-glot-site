#!/usr/bin/env python3
"""Focused mobile-localization regression tests for the live site source."""
import asyncio, contextlib, functools, http.server, json, os, pathlib, threading
from playwright.async_api import async_playwright
ROOT=pathlib.Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass

async def main():
    os.chdir(ROOT)
    server=http.server.ThreadingHTTPServer(("127.0.0.1",8768),Quiet)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    errors=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,args=['--no-sandbox'])
        context=await browser.new_context(viewport={'width':390,'height':844},device_scale_factor=2,is_mobile=True,has_touch=True)
        page=await context.new_page()
        for locale in ("EN","FR","JA","DE","AR","HE"):
            await page.goto('http://127.0.0.1:8768/index.html?lang='+locale,wait_until="domcontentloaded")
            await page.wait_for_function("(locale) => window._pgI18n && window._pgI18n.curLang()===locale",arg=locale,timeout=15000)
            await page.wait_for_timeout(500)
            await page.evaluate("switchGallery('mac')")
            await page.wait_for_timeout(500)
            dims=await page.evaluate("""() => {
               const rect=x=>{let r=x.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}};
               let nav=document.querySelector('.nav-inner'),cta=document.querySelector('.nav-cta a'),hint=document.querySelector('#macTabHint span');
               let brand=document.querySelector('.nav-brand span'),demo=document.querySelector('#demo .section-title');
               return {viewport:innerWidth, nav:rect(nav),cta:rect(cta),brand:rect(brand),hint:rect(hint),demo:rect(demo),
                       hintText:hint.textContent,hintScroll:hint.scrollWidth,hintClient:hint.clientWidth,
                       ctaScroll:cta.scrollWidth,ctaClient:cta.clientWidth,documentScroll:document.documentElement.scrollWidth};}""")
            for el in ('cta','hint'):
                box=dims[el]
                if box['left'] < -2 or box['right'] > dims['viewport']+2:
                    errors.append([locale,el,'outside viewport',box])
            if dims['hintScroll']>dims['hintClient']+3:
                errors.append([locale,'mac hint','horizontally clipped',dims])
            if dims['ctaScroll']>dims['ctaClient']+3:
                errors.append([locale,'nav CTA','horizontally clipped',dims])
            if dims['documentScroll']>dims['viewport']+5:
                errors.append([locale,'page','horizontal overflow',dims['documentScroll']])
            if locale in ("FR","JA"):
                await page.screenshot(path='mobile-locale-'+locale.lower()+'.png',full_page=False)
            print('Mobile homepage:',locale,'PASS' if not errors or errors[-1][0]!=locale else 'FAIL',flush=True)
            if locale in ("JA","FR"):
                await page.goto('http://127.0.0.1:8768/prompt-templates.html?lang='+locale,wait_until="domcontentloaded")
                await page.wait_for_function("(locale) => window._pgI18n && window._pgI18n.curLang()===locale",arg=locale)
                await page.wait_for_function("(locale) => document.querySelector('header nav a[href=\"./#connect\"]') && (locale==='JA' ? document.querySelector('header nav a[href=\"./#connect\"]').textContent.includes('エコシステム') : document.querySelector('header nav a[href=\"./#connect\"]').textContent.includes('Écosystème'))",arg=locale,timeout=10000)
                hrefs=await page.evaluate("""() => ({mcp:document.querySelector('header nav a[href="./#connect"]').href,app:document.querySelector('header nav a[href*="apps.apple.com"]').href,labels:[...document.querySelectorAll('header nav a')].map(x=>x.textContent.trim())})""")
                if '/poly-glot-site/' not in hrefs['mcp'] and not hrefs['mcp'].endswith('/#connect'):
                    errors.append([locale,'MCP link destination',hrefs])
                if 'apps.apple.com' not in hrefs['app']:
                    errors.append([locale,'App Store destination',hrefs])
                print('Guide navigation:',locale,hrefs['labels'],flush=True)
        await browser.close()
    server.shutdown()
    pathlib.Path('mobile-locale-report.json').write_text(json.dumps({'failures':errors},ensure_ascii=False,indent=2))
    print('FAILURES',len(errors),json.dumps(errors[:3],ensure_ascii=False),flush=True)
    if errors:raise SystemExit(1)
if __name__=='__main__':asyncio.run(main())
