#!/usr/bin/env python3
"""Cross-browser live GitHub Pages localization QA. Runs all 38 locales x 13 pages."""
import asyncio,json,os
from playwright.async_api import async_playwright,TimeoutError as BrowserTimeout

BASE='https://hmoses.github.io/poly-glot-site/'
PAGES=['connect.html','compare-ai-tools.html','multilingual-ai-workspace.html','prompt-templates.html','mcp-integrations.html','privacy-and-pricing.html','privacy.html','terms.html','support.html','share.html','seo-setup.html','linkedin.html','linkedin-mcp-2026.html']
ALL=['EN','ES','FR','DE','IT','PT','NL','RU','ZH','ZH_TW','JA','KO','AR','HI','BN','TR','PL','SV','NO','DA','FI','EL','HE','ID','MS','TH','VI','UK','CS','RO','HU','SK','HR','CA','AF','SW','HA','AM']
shards=[ALL[:10],ALL[10:19],ALL[19:28],ALL[28:]]
SHARD=int(os.environ.get('PG_SHARD','0'))
assert 0<=SHARD<len(shards)
CODES=shards[SHARD]
async def main():
    errors=[];checked=0
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,args=['--no-sandbox'])
        ctx=await browser.new_context(viewport={'width':390,'height':844},service_workers='block')
        page=await ctx.new_page()
        for code in CODES:
            for path in PAGES:
                target=BASE+path+'?lang='+code
                try:
                    response=await page.goto(target,wait_until='domcontentloaded',timeout=35000)
                    assert response and response.ok, 'HTTP response failed'
                    if path.startswith('linkedin'):
                        await page.wait_for_url(lambda x: str(x).split('?',1)[0].rstrip('/').endswith('/poly-glot-site'),timeout=18000)
                        await page.wait_for_function('(c)=>window._pgI18n?.curLang?.()===c',arg=code,timeout=20000)
                        data=await page.evaluate('''()=>({locale:window._pgI18n?.curLang?.(),flags:window._pgI18n?.LANGS?.length})''')
                        assert data['flags']==38 and data['locale']==code, f'redirect locale: {data}'
                    else:
                        await page.wait_for_function('(c)=>window._pgI18n?.curLang?.()===c',arg=code,timeout=20000)
                        if code!='EN':
                            await page.wait_for_function('(c)=>!!window._pgSecondaryExact?.[c]',arg=code,timeout=25000)
                        await page.wait_for_function('(c)=>window._pgSecondaryLocaleAudit?.language===c && window._pgSecondaryLocaleAudit?.complete===true',arg=code,timeout=18000)
                        data=await page.evaluate('''()=>({
                          flags:window._pgI18n?.LANGS?.length,
                          locale:window._pgI18n?.curLang?.(),
                          title:document.title,
                          audit:window._pgSecondaryLocaleAudit,
                          dir:document.documentElement.dir,
                          flagBtn:!!document.querySelector('#pgGlobalLangPicker')
                        })''')
                        assert data['flags']==38 and data['flagBtn'],f'flags/picker: {data}'
                        assert data['audit']['missing']==[],f'untranslated: {data["audit"]["missing"][:5]}'
                        assert data['title'],f'empty page title'
                        if code in ('AR','HE'):assert data['dir']=='rtl','wrong RTL direction'
                    checked+=1
                    print('LIVE OK',code,path,flush=True)
                except Exception as e:
                    errors.append({'code':code,'page':path,'error':str(e)[:650]})
                    print('LIVE FAIL',code,path,str(e)[:350],flush=True)
        # Verify state persistence without lang= in destination address.
        for code in [x for x in ('ES','AR','HE','VI','ZH_TW') if x in CODES]:
            try:
                await page.goto(BASE+'compare-ai-tools.html?lang='+code,wait_until='domcontentloaded')
                await page.locator('a[href*="prompt-templates.html"]').first.click(timeout=15000)
                await page.wait_for_url('**/prompt-templates.html*',timeout=15000)
                await page.wait_for_function('(c)=>window._pgI18n?.curLang?.()===c',arg=code,timeout=15000)
                await page.goto(BASE+'privacy.html',wait_until='domcontentloaded')
                await page.wait_for_function('(c)=>window._pgI18n?.curLang?.()===c',arg=code,timeout=15000)
                print('LIVE NAV OK',code,flush=True)
            except Exception as e:
                errors.append({'code':code,'page':'navigation','error':str(e)[:650]})
        await browser.close()
    print('RESULT',json.dumps({'shard':SHARD,'checked':checked,'total':len(CODES)*len(PAGES),'failures':errors},ensure_ascii=False),flush=True)
    if errors or checked!=len(CODES)*len(PAGES):raise SystemExit(1)
if __name__=='__main__':asyncio.run(main())
