#!/usr/bin/env python3
"""Playwright smoke coverage for all 38 languages on all public subpages."""
import asyncio, http.server, threading, os, json
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
CATALOGS=ROOT/'assets'/'locales'/'subpages'
PAGES=['connect.html','compare-ai-tools.html','multilingual-ai-workspace.html','prompt-templates.html','mcp-integrations.html','privacy-and-pricing.html','privacy.html','terms.html','support.html','share.html','seo-setup.html','linkedin.html','linkedin-mcp-2026.html']
CODES=['EN','ES','FR','DE','IT','PT','NL','RU','ZH','ZH_TW','JA','KO','AR','HI','BN','TR','PL','SV','NO','DA','FI','EL','HE','ID','MS','TH','VI','UK','CS','RO','HU','SK','HR','CA','AF','SW','HA','AM']
class Handler(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
async def main():
 files=list(CATALOGS.glob('*.json'))
 if len(files)<39:
  raise SystemExit(f'Translation catalogs not yet generated: found {len(files)} of 39 JSON artifacts')
 os.chdir(ROOT)
 server=http.server.ThreadingHTTPServer(('127.0.0.1',8765),Handler)
 threading.Thread(target=server.serve_forever,daemon=True).start()
 failures=[]
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True,args=['--no-sandbox'])
  context=await browser.new_context()
  page=await context.new_page()
  for code in CODES:
   for path in PAGES:
    url='http://127.0.0.1:8765/'+path+'?lang='+code
    await page.goto(url,wait_until='domcontentloaded',timeout=20000)
    if path in ('linkedin.html','linkedin-mcp-2026.html'):
     try:
      await page.wait_for_url(lambda url: str(url).startswith('http://127.0.0.1:8765/?lang='+code),timeout=10000)
     except Exception:failures.append((path,code,'redirect did not preserve language',page.url))
     try:await page.wait_for_function('window._pgI18n && window._pgI18n.curLang()==='+json.dumps(code),timeout=7000)
     except Exception:pass
     data=await page.evaluate('''() => ({locale:window._pgI18n?.curLang?.(),flagCount:window._pgI18n?.LANGS?.length})''')
     if data['locale']!=code or data['flagCount']!=38:
      failures.append((path,code,'redirect locale mismatch',data))
     print(code,path,'REDIRECT VERIFIED',flush=True)
     continue
    try:
     await page.wait_for_function('window._pgSecondaryLocaleAudit && window._pgSecondaryLocaleAudit.language==='+json.dumps(code),timeout=7000)
     if code!='EN':
      await page.wait_for_function('(code) => Boolean(window._pgSecondaryExact && window._pgSecondaryExact[code])',arg=code,timeout=15000)
      await page.wait_for_function('(code) => window._pgSecondaryLocaleAudit && window._pgSecondaryLocaleAudit.language === code',arg=code,timeout=4000)
      await page.wait_for_timeout(100) # Allow catalog-driven apply() to settle.
    except Exception:pass
    data=await page.evaluate('''() => ({audit:window._pgSecondaryLocaleAudit||null,locale:window._pgI18n?.curLang?.(),dir:document.documentElement.dir,flagCount:window._pgI18n?.LANGS?.length})''')
    audit=data['audit']
    if data['locale']!=code:failures.append((path,code,'language selection not restored',data))
    if data['flagCount']!=38:failures.append((path,code,'not all flags',data))
    if not audit or code!='EN' and audit['missing']:
     failures.append((path,code,'missing translations',{'sample':audit['missing'][:8] if audit else [],'count':len(audit['missing']) if audit else 'unknown'}))
    if code in ('AR','HE') and data['dir']!='rtl':failures.append((path,code,'RTL layout',data))
    print(code,path,'OK' if not failures or failures[-1][0:2]!=(path,code) else 'FAIL',flush=True)
  # Exercise a dynamically changing counter on every localized subpage.
  for code in CODES:
   await page.goto('http://127.0.0.1:8765/seo-setup.html?lang='+code,wait_until='domcontentloaded')
   if code!='EN':
    await page.wait_for_function('(c) => !!window._pgSecondaryExact?.[c]',arg=code,timeout=15000)
    await page.wait_for_timeout(150)
   box=page.locator('.check input[type="checkbox"]').first
   if await box.count():
    await box.set_checked(True)
    label=(await page.locator('#progressText').inner_text()).strip()
    if not label or (code!='EN' and label.lower().endswith(' complete')):
     failures.append(('seo-setup.html',code,'dynamic progress label untranslated',label))
    print('DYNAMIC',code,label,flush=True)
  # The selector must persist on an actual internal navigation, not only query URLs.
  for code in ('ES','AR','HE','VI','ZH_TW'):
   await page.goto('http://127.0.0.1:8765/compare-ai-tools.html?lang='+code,wait_until='domcontentloaded')
   await page.wait_for_function('(code) => window._pgI18n?.curLang?.() === code',arg=code)
   await page.locator('a[href*="prompt-templates.html"]').first.click()
   await page.wait_for_url('**/prompt-templates.html*')
   await page.wait_for_function('(code) => window._pgI18n?.curLang?.() === code',arg=code)
   nav=await page.evaluate('''() => ({language:window._pgI18n?.curLang?.(),saved:localStorage.getItem('pgLang')})''')
   if nav['language']!=code or nav['saved']!=code:failures.append(('navigation',code,'locale not persistent',nav))
   await page.goto('http://127.0.0.1:8765/terms.html',wait_until='domcontentloaded')
   await page.wait_for_function('(code) => window._pgI18n?.curLang?.() === code',arg=code)
   print('NAVIGATION',code,'PASSED',flush=True)
  await browser.close()
 server.shutdown()
 report={'checked':len(CODES)*len(PAGES),'failures':failures}
 (ROOT/'localization-browser-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'checked':report['checked'],'failures':len(failures),'examples':failures[:10]},ensure_ascii=False))
 if failures:raise SystemExit(1)
if __name__=='__main__':asyncio.run(main())
