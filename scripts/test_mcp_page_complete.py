#!/usr/bin/env python3
"""Browser localization regression for the complete MCP integrations guide."""
import http.server, threading, os, json, re
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
os.chdir(ROOT)
class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=http.server.ThreadingHTTPServer(("127.0.0.1",8767),Handler)
threading.Thread(target=server.serve_forever,daemon=True).start()
langs="EN ES FR DE IT PT NL RU ZH ZH_TW JA KO AR HI BN TR PL SV NO DA FI EL HE ID MS TH VI UK CS RO HU SK HR CA AF SW HA AM".split()
def state(page):
    return page.evaluate("""() => {
      let qs=Array.from(document.querySelectorAll('main section[aria-label="Frequently asked questions"] > article'));
      let guide=document.querySelector('#mcp-troubleshooting');
      let claude=document.querySelector('#claude-tools-guide-support');
      return {lang:window._pgI18n?.curLang?.(),
       faq:qs.map(a=>({q:a.querySelector('h2')?.textContent.trim(),a:a.querySelector(':scope > p')?.textContent.trim()})),
       eyebrow:document.querySelector('main .eyebrow')?.textContent.trim(),
       title:document.querySelector('main h1')?.textContent.trim(),
       lead:document.querySelector('main .lead')?.textContent.trim(),
       guide:guide?.dataset.mcpTranslation, keys:guide?.dataset.mcpTranslationCount,
       guideTitle:guide?.querySelector('h2')?.textContent.trim(),
       accordionTitle:claude?.querySelector('summary')?.textContent.trim(),
       guideCoverage:document.documentElement.dataset.pgClaudeGuideCoverage,
       techCoverage:document.documentElement.dataset.pgTechnicalL10n,
       failures:document.querySelector('main p:not([data-mcp-tr]):not([data-pg-tech])')?.textContent.trim().slice(0,200)
      };
    }""")
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,args=["--no-sandbox"])
    page=browser.new_page(viewport={"width":1160,"height":800})
    errors=[]
    page.on("pageerror",lambda e: errors.append(str(e)))
    baseline=None
    failures=[]
    for code in langs:
        page.goto("http://127.0.0.1:8767/mcp-integrations.html?lang="+code,wait_until="domcontentloaded")
        try:
            page.wait_for_function("""code => {
              let root=document.querySelector('#mcp-troubleshooting');
              let faq=document.querySelectorAll('main section[aria-label="Frequently asked questions"] > article');
              return window._pgI18n?.curLang?.()===code &&
                 root?.dataset.mcpActiveLanguage===code &&
                 document.documentElement.dataset.pgClaudeGuideLanguage===code &&
                 faq.length===4;
            }""",arg=code,timeout=12000)
        except Exception as e: failures.append((code,"load timeout",str(e)[:90]));continue
        if code!='EN':page.wait_for_timeout(120)
        x=state(page)
        if code=="EN":baseline=x
        else:
            for i in range(4):
                if x["faq"][i]["a"]==baseline["faq"][i]["a"] or not x["faq"][i]["a"]:
                    failures.append((code,"FAQ"+str(i+1)+" answer remained English"))
                if x["faq"][i]["q"]==baseline["faq"][i]["q"]:
                    failures.append((code,"FAQ"+str(i+1)+" question remained English"))
            for key in ["title","lead","guideTitle","accordionTitle"]:
                if x[key]==baseline[key] or not x[key]:
                    failures.append((code,key+" remained English"))
            if x["guide"]!="complete":failures.append((code,"troubleshooting coverage: "+str(x["guide"])+"/"+str(x["keys"])))
            if x["guideCoverage"]!="complete":failures.append((code,"Claude guide coverage: "+str(x["guideCoverage"])))
        if code in ("EN","ES","NL","ZH_TW","AR","VI"):
            print("SAMPLE",code,json.dumps(x,ensure_ascii=False)[:2800],flush=True)
        print("CHECK",code,x["guide"],x["keys"],x["guideCoverage"],x["techCoverage"],flush=True)
    print("BROWSER ERRORS",errors[:12],flush=True)
    print("FAILURES",json.dumps(failures,ensure_ascii=False)[:12000],flush=True)
    browser.close()
    assert not errors,"JavaScript browser errors"
    assert not failures,str(failures[:15])
