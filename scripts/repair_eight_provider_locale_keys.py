#!/usr/bin/env python3
"""Re-key 38-language subpage translations after removal of Copilot as an AI provider.

Other use of GitHub Copilot as an MCP *client* is not a built-in Poly-Glot
provider and must remain untouched.
"""
import json,re,difflib
from pathlib import Path
root=Path(__file__).resolve().parents[1]/"assets/locales/subpages"
en=json.loads((root/"en.json").read_text(encoding="utf-8"))
assert isinstance(en,list)
valid=set(en)
def change(s):
    s=re.sub(r"\bMicrosoft\s+Copilot,?\s*", "", s, flags=re.I)
    s=re.sub(r",\s*Copilot(?:a|o)?\b", "", s, flags=re.I)
    s=re.sub(r"\bCopilot(?:a|o)?,\s*", "", s, flags=re.I)
    s=re.sub(r"([·•])\s*Copilot(?:a|o)?\b", "", s, flags=re.I)
    s=s.replace("2–9","2–8").replace("2-9","2–8")
    s=re.sub(r"\b9(?=\s+(?:AI|providers|apps|assistants|built-in))", "8", s, flags=re.I)
    s=re.sub(r"\b(?:of|any)\s+9\s+(?=(?:AI|apps|providers))",lambda m:m.group().replace("9","8"),s,flags=re.I)
    s=re.sub(r"\bnine(?=\s+(?:AI|apps|providers|built-in))","eight",s,flags=re.I)
    s=re.sub(r"\s+,",",",s)
    s=re.sub(r",\s*,",",",s)
    return s.strip()
changed=[]
for file in sorted(root.glob("*.json")):
    if file.name in {"en.json","report.json"}:continue
    data=json.loads(file.read_text(encoding="utf-8"))
    if not isinstance(data,dict):continue
    count=0
    for k,v in list(data.items()):
        newkey=change(k)
        if newkey!=k and newkey in valid and newkey not in data:
            data[newkey]=change(v)
            count+=1
    if count:
        file.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        changed.append((file.name,count))
print("Migrated translation keys:",len(changed),"language files")
print(changed)
# Verify the English copy introduced by the eight-provider rollout is mapped.
old_keys=[
 "Stage a prompt across 2–9 AI providers for comparison",
 "Compare across any 2–9 providers: ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, Mistral, HuggingChat, and DuckDuckGo AI.",
 "Poly-Glot lists ChatGPT, Claude, Gemini, Grok, Perplexity, Copilot, Mistral, HuggingChat, and DuckDuckGo AI. Provider availability and capabilities may change.",
 "Claude, Gemini, Microsoft Copilot, Mistral, DuckDuckGo, HuggingChat",
]
for old in old_keys:
    assert change(old) in valid,(old,change(old))
for file in root.glob("*.json"):
    if file.name in {"en.json","report.json"}:continue
    d=json.loads(file.read_text(encoding="utf-8"))
    for key in old_keys:
        if key in d:
            assert change(key) in d,(file.name,key)
