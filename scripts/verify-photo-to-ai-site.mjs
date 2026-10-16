import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=(path)=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const page=read('index.html');
const privacyPage=read('privacy.html');
const photoPrivacyRuntime=read('assets/js/photo-ocr-policy-locales.js');
const feature=read('assets/js/photo-to-ai-site.js');
const preview=read('assets/js/ios-photo-preview-buttons.js');
const locales=read('assets/js/photo-to-ai-locales.js');
const trial=read('assets/js/trial-details-locales.js');
const uploads=read('assets/js/photo-upload-locales.js');
const handoff=read('assets/js/photo-handoff-guide-locales.js');
const chatPhoto=read('assets/js/photo-ocr-chat.js');
const motionCSS=read('assets/css/apple-card-parallax.css');
const motionJS=read('assets/js/apple-card-parallax.js');
const mcpRuntime=read('assets/js/mcp-tool-descriptions-runtime.js');
const mcpPart1=read('assets/js/mcp-tool-descriptions-1.js');
const mcpPart2=read('assets/js/mcp-tool-descriptions-2.js');
const zhTwSite=read('assets/js/zh-tw-page-polish.js');

function count(pattern,source){return [...source.matchAll(pattern)].length;}
assert.equal(count(/id="pg-ios-photo-ai-site"/g,page),1,'Only one Photo to AI promotion section');
assert.equal(count(/id="pgPhotoPrivacyPolicy"/g,privacyPage),1,'Only one Photo to AI privacy section');
assert(!privacyPage.includes('id="pgPhotoPolicy"'),'Retired redundant privacy warnings must be absent');
assert(privacyPage.includes('photo-handoff-guide-locales.js?v='),'Privacy page must load the 38-language handoff catalog');
assert(photoPrivacyRuntime.includes('PGPhotoHandoffGuideLocales'),'Privacy page must use cross-platform localized guidance');
assert(privacyPage.includes('Poly-Glot does not automatically upload photos'),'English privacy text must not promise automatic image uploads');
assert.equal(count(/id="pg-photo-demo"/g,page),1,'Only one animated Photo to AI demo');
assert(!page.includes('id="pg-ios-photo-soon-badge"'),'Obsolete Coming Soon badge must remain removed');
assert(!page.includes('id="pg-ios-photo-kicker"'),'Obsolete Photo to AI platform kicker must remain removed');
assert(page.includes('photo-to-ai-demo.js?v='),'Demo animation script must load');
assert(page.includes('photo-to-ai-demo-real-frames.css?v='),'Demo visual styling must load');
assert(page.includes('ios-photo-preview-buttons.js?v='),'Device preview updater must load');
assert.equal(count(/data-pg-photo-preview-action/g,page),5,'Expected Photo to AI preview controls');
assert(page.includes('mac-photo-preview.js?v='),'Mac preview interaction must load');
assert(page.includes('mac-photo-preview.css?v='),'Mac preview layout must load');
assert(preview.includes('translatedName()'),'Preview actions must use locale strings');
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
const uploadMatch=uploads.match(/var data=(\{[\s\S]*?\});\s*var catalog=/);
assert(uploadMatch,'Missing localized image-upload catalog');
const uploadLanguages=JSON.parse(uploadMatch[1]);
assert.deepEqual(Object.keys(uploadLanguages).sort(),Object.keys(values).sort(),'Photo-upload card must support every Photo-to-AI locale');
for(const [code,copy] of Object.entries(uploadLanguages)){
 assert(copy.length===2&&copy.every(s=>typeof s==='string'&&s.trim()),'Missing upload text in '+code);
}
const hStart=handoff.indexOf('w.PGPhotoHandoffGuideLocales=')+'w.PGPhotoHandoffGuideLocales='.length;
const hRows=JSON.parse(handoff.slice(hStart,handoff.lastIndexOf('};')+1));
assert.deepEqual(Object.keys(hRows).sort(),Object.keys(values).sort(),'Handoff guidance must cover every supported website locale');
for(const [lang,steps] of Object.entries(hRows)){
 assert.equal(steps.length,5,'Five translated handoff fields required (including Mac right-click): '+lang);
 assert(steps.every(x=>typeof x==='string'&&x.trim()),'Empty translated handoff field: '+lang);
}
assert(!/Poly-Glot copies (?:it|the image) and opens the selected AI/i.test(hRows.EN[0]),'No false photo auto-copy claim');
assert(hRows.EN[0].includes('does not attach the photo') && hRows.EN[1].includes('does not attach the image'),'OS copy must explain manual attachments');


assert(feature.includes('renderMacSteps(handoff,lang,t)'),'Mac numbered steps must use the localized handoff catalog');

assert(page.indexOf('id="demo"')<page.indexOf('id="pg-ios-photo-ai-site"'),'Photo to AI must follow workspace demo');
assert(page.indexOf('id="screenshots"')<page.indexOf('id="value"'),'App Preview must sit directly before Value section');
assert.equal(count(/id="screenshots"/g,page),1,'App Preview cannot be duplicated');
assert(page.includes('apple-card-parallax.js?v='),'Page must load scroll parallax');
assert(motionCSS.includes('prefers-reduced-motion: reduce'),'Parallax must honor reduced motion');
assert(motionJS.includes('prefers-reduced-motion: reduce'),'Parallax runtime must honor reduced motion');
assert(page.includes('mcp-tool-descriptions-runtime.js?v=20261014-all-15-38'),'Load current tool localization code');
assert(mcpRuntime.includes("mcpT")&&mcpRuntime.includes("get_custom_model_capabilities"),'MCP runtime must cover all 15 tool identifiers');
const mcpCodes=(mcpPart1+mcpPart2).match(/"ZH_TW":\[/g)||[];
assert.equal(mcpCodes.length,1,'Traditional Chinese MCP tool translations must exist');
assert(page.includes('zh-tw-page-polish.js?v='),'Traditional Chinese website completeness layer must load');
assert.equal(count(/src="assets\/js\/mcp-tool-descriptions-runtime\.js\?v=/g,page),1,'MCP localization runtime must not load more than once');
assert.equal(count(/src="assets\/js\/mcp-tool-descriptions-1\.js\?v=/g,page),1,'MCP locale bundle 1 must load exactly once');
assert.equal(count(/src="assets\/js\/mcp-tool-descriptions-2\.js\?v=/g,page),1,'MCP locale bundle 2 must load exactly once');
assert(zhTwSite.includes("mcpEcoP")&&zhTwSite.includes("mcpL5d")&&zhTwSite.includes("mcpGptSteps"),'Traditional Chinese MCP and listing copy must be complete');
assert(zhTwSite.includes("fq3a")&&zhTwSite.includes("crossDeviceP")&&zhTwSite.includes("showcaseBody"),'Traditional Chinese FAQ, cross-device and value copy must be present');


console.log('PASS: Photo to AI site — no App Store CTA in feature section, chunked copy, iPhone/iPad previews, '+Object.keys(values).length+' locales.');
