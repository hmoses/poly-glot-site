#!/usr/bin/env node
/**
 * Poly-Glot AI Workspace secondary-page localization integrity audit.
 *
 * Usage: node scripts/audit_subpage_localization.mjs
 *        node scripts/audit_subpage_localization.mjs --strict
 *
 * The default report is informational because the site also uses curated
 * runtime dictionaries for legal/MCP text. --strict fails if there is
 * missing catalog data, obviously malformed machine output, or source drift.
 * This does NOT replace in-browser, native-speaker, or legal-text review.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = [
  'connect.html','compare-ai-tools.html','multilingual-ai-workspace.html',
  'prompt-templates.html','mcp-integrations.html','privacy-and-pricing.html',
  'privacy.html','terms.html','support.html','share.html','seo-setup.html',
  'linkedin.html','linkedin-mcp-2026.html'
];
const languages = [
  'ES','FR','DE','IT','PT','NL','RU','ZH','ZH_TW','JA','KO','AR','HI','BN',
  'TR','PL','SV','NO','DA','FI','EL','HE','ID','MS','TH','VI','UK','CS',
  'RO','HU','SK','HR','CA','AF','SW','HA','AM'
];
const read = file => readFileSync(resolve(root,file),'utf8');
const source = JSON.parse(read('assets/locales/subpages/en.json'));
if (!Array.isArray(source)) throw Error('English source catalog must be an array');
const compact = s => String(s).replace(/\s+/g, ' ').trim();
const decode = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"')
  .replace(/&#(?:39|x27);/gi,"'").replace(/&nbsp;/g,' ')
  .replace(/&gt;/g,'>').replace(/&lt;/g,'<');
const sourceSet = new Set(source);
const report = { date: new Date().toISOString(), pages: [], languages: [], totals: {} };

for (const page of pages) {
  if (!existsSync(resolve(root,page))) { report.pages.push({page,error:'missing HTML file'}); continue; }
  const html = read(page);
  const scriptsOK = ['assets/js/i18n.js','assets/js/global-selector-placement.js','assets/js/secondary-page-localization.js'].every(s=>html.includes(s));
  const clean = html.replace(/<!--[\s\S]*?-->/g,'')
    .replace(/<(script|style|noscript|svg|pre|code|textarea|template)\b[^>]*>[\s\S]*?<\/\1>/gi,'')
    .replace(/<div[^>]*class=["'][^"']*(?:code-block|hljs|language-json)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi,'');
  const texts = [...clean.matchAll(/>([^<>]+)</g)]
    .map(match=>compact(decode(match[1])))
    .filter(s=>s.length>3 && /[A-Za-z]/.test(s) && !/^https?:/i.test(s));
  const drift = [...new Set(texts)].filter(s=>!sourceSet.has(s));
  report.pages.push({page,localizationScriptsConnected:scriptsOK,
    visibleSourceStrings:new Set(texts).size,notInEnglishCatalog:drift.length,
    possibleUncoveredText:drift.slice(0,15)});
}

for (const lang of languages) {
  const filename = 'assets/locales/subpages/'+lang.toLowerCase()+'.json';
  if (!existsSync(resolve(root,filename))) {report.languages.push({lang,error:'missing catalog'});continue;}
  let dict;
  try {dict=JSON.parse(read(filename));} catch (e) {report.languages.push({lang,error:'invalid JSON: '+e.message});continue;}
  const missing = source.filter(s=>typeof dict[s]!=='string' || !compact(dict[s]));
  const unchanged = source.filter(s=>dict[s]===s);
  const outliers = source.filter(s=>typeof dict[s]==='string' && dict[s].length > Math.max(120,s.length*5));
  report.languages.push({lang,sourceKeys:source.length,catalogKeys:Object.keys(dict).length,
    missingCount:missing.length,missing:missing.slice(0,15),
    unchangedCount:unchanged.length,possibleCorruptionCount:outliers.length,
    possibleCorruption:outliers.slice(0,15).map(s=>({source:s,translationLength:dict[s].length}))});
}

report.totals = {pages:pages.length,languageVariants:languages.length+1,
  sourceStrings:source.length,
  pagesWithoutWiring:report.pages.filter(p=>!p.localizationScriptsConnected).length,
  pageSourceDrift:report.pages.reduce((n,p)=>n+(p.notInEnglishCatalog||0),0),
  missingLocaleEntries:report.languages.reduce((n,l)=>n+(l.missingCount||0),0),
  suspectedCorruptLocaleEntries:report.languages.reduce((n,l)=>n+(l.possibleCorruptionCount||0),0)};
console.log(JSON.stringify(report,null,2));
if (process.argv.includes('--strict') && (
  report.pages.some(p=>!p.localizationScriptsConnected||p.notInEnglishCatalog>0) ||
  report.languages.some(l=>l.error||l.missingCount>0||l.possibleCorruptionCount>0)
)) process.exitCode=1;
