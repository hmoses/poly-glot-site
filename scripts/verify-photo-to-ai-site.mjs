import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const page=read('index.html');
const feature=read('assets/js/photo-to-ai-site.js');
const preview=read('assets/js/ios-photo-preview-buttons.js');
const locales=read('assets/js/photo-to-ai-locales.js');
const trial=read('assets/js/trial-details-locales.js');

function count(pattern,source){return [...source.matchAll(pattern)].length;}
assert.equal(count(/id="pg-ios-photo-ai-site"/g,page),1,'Only one iOS photo promotion section');
assert.equal(count(/id="pg-ios-photo-title"/g,page),1,'Only one Photo-to-AI heading');
assert.equal(count(/id="pg-photo-input-soon"/g,page),0,'No duplicate text inside Multiple Input Options');
assert(!trial.includes('2026 Photo-to-AI product announcement'),'Trial localization must not render a second promo');
assert(page.includes('photo-to-ai-site.js?v='),'Product feature localization must load');
assert(page.includes('ios-photo-preview-buttons.js?v='),'iOS device preview updater must load');
assert(page.includes('pg-photo-feature-chunks'),'Feature details must be chunked');

const ids=[
 'pg-ios-photo-kicker','pg-ios-photo-title',
 'pg-ios-photo-scan-title','pg-ios-photo-scan-copy',
 'pg-ios-photo-share-title','pg-ios-photo-share-copy',
 'pg-ios-photo-trial','pg-ios-photo-privacy',
 'pg-ios-photo-install'
];
for (const id of ids){
 assert.equal(count(new RegExp('id="'+id+'"','g'),page),1,'Missing or duplicated element: '+id);
 assert(feature.includes(id),'Missing localization binding for '+id);
}
assert.equal(count(/data-pg-photo-preview-action/g,page),4,'iPhone/iPad preview actions must show Photo to AI');
assert(preview.includes('translatedName()'),'Preview actions must use locale strings');
assert(!/id="pg-ios-photo-title"[^>]*>[^<]*Coming soon/i.test(page),'Coming soon should only appear in the kicker');
const m=locales.match(/var data=(\{[\s\S]*?\});\s*var cols=(\[[^\]]+\])/);
assert(m,'Photo-to-AI locale catalog was changed unexpectedly');
const values=JSON.parse(m[1]),columns=JSON.parse(m[2]);
assert(Object.keys(values).length>=38,'Missing supported localization');
for (const [lang,row] of Object.entries(values)){
 assert.equal(row.length,columns.length,'Incomplete '+lang+' localization');
 for(const key of ['feature','scanText','context','share','ocrMeaning','photoCompatibility','privacy','locked']){
  assert(row[columns.indexOf(key)]?.trim(),'Missing '+lang+'.'+key);
 }
}
console.log('PASS: Photo to AI site — no redundant banners, chunked copy, iPhone/iPad previews, '+Object.keys(values).length+' locales.');
