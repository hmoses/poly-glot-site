import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const page=read('index.html');
const feature=read('assets/js/photo-to-ai-site.js');
const preview=read('assets/js/ios-photo-preview-buttons.js');
const locales=read('assets/js/photo-to-ai-locales.js');
const trial=read('assets/js/trial-details-locales.js');
const uploads=read('assets/js/photo-upload-locales.js');
const motionCSS=read('assets/css/apple-card-parallax.css');
const motionJS=read('assets/js/apple-card-parallax.js');
const mcpRuntime=read('assets/js/mcp-tool-descriptions-runtime.js');
const mcpPart1=read('assets/js/mcp-tool-descriptions-1.js');
const mcpPart2=read('assets/js/mcp-tool-descriptions-2.js');

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
 'pg-ios-photo-trial','pg-ios-photo-privacy'
];
for (const id of ids){
 assert.equal(count(new RegExp('id="'+id+'"','g'),page),1,'Missing or duplicated element: '+id);
 assert(feature.includes(id),'Missing localization binding for '+id);
}
// The Photo-to-AI product section is informational: no App Store button/link.
const start=page.indexOf('id="pg-ios-photo-ai-site"');
const end=page.indexOf('</section>',start);
assert(start>=0 && end>start,'Missing iPhone/iPad Photo-to-AI section');
const photoSection=page.slice(start,end);
assert(!/<a\b/i.test(photoSection),'No App Store link or button in Photo-to-AI section');
assert(!photoSection.includes('pg-ios-photo-install'),'Retired feature-specific App Store CTA must be absent');
assert(!feature.includes('pg-ios-photo-install'),'Localization runtime must not recreate retired App Store CTA');
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
// Changes requested for the mobile page must not break the tabbed Mac preview.
assert.equal(count(/class="pg-photo-motion-card"/g,page),3,'All three Photo-to-AI cards require independent motion');
for(const id of ['pg-ios-photo-upload-title','pg-ios-photo-upload-copy']){
 assert.equal(count(new RegExp('id="'+id+'"','g'),page),1,'Missing image-upload card element '+id);
 assert(feature.includes(id),'Image-upload card must update from selected locale');
}
const uploadMatch=uploads.match(/var data=(\{[\s\S]*?\});\s*var catalog=/);
assert(uploadMatch,'Missing localized image-upload catalog');
const uploadLanguages=JSON.parse(uploadMatch[1]);
assert.deepEqual(Object.keys(uploadLanguages).sort(),Object.keys(values).sort(),'Photo-upload card must support every Photo-to-AI locale');
for(const [code,copy] of Object.entries(uploadLanguages)){
 assert(copy.length===2&&copy.every(s=>typeof s==='string'&&s.trim()),'Missing upload text in '+code);
}
assert(page.indexOf('id="pg-ios-photo-ai-site"')<page.indexOf('id="screenshots"'),'App Preview must follow Photo to AI');
assert(page.indexOf('id="screenshots"')<page.indexOf('id="value"'),'App Preview must sit directly before Value section');
assert.equal(count(/id="screenshots"/g,page),1,'App Preview cannot be duplicated');
assert(page.includes('apple-card-parallax.js?v='),'Page must load scroll parallax');
assert(motionCSS.includes('prefers-reduced-motion: reduce'),'Parallax must honor reduced motion');
assert(motionJS.includes('prefers-reduced-motion: reduce'),'Parallax runtime must honor reduced motion');
assert(page.includes('mcp-tool-descriptions-runtime.js?v=20261014-all-15-38'),'Load current tool localization code');
assert(mcpRuntime.includes("mcpT")&&mcpRuntime.includes("get_custom_model_capabilities"),'MCP runtime must cover all 15 tool identifiers');
const mcpCodes=(mcpPart1+mcpPart2).match(/"ZH_TW":\[/g)||[];
assert.equal(mcpCodes.length,1,'Traditional Chinese MCP tool translations must exist');

console.log('PASS: Photo to AI site — no App Store CTA in feature section, chunked copy, iPhone/iPad previews, '+Object.keys(values).length+' locales.');
