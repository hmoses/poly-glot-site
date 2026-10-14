import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=(file)=>readFileSync(new URL('../'+file,import.meta.url),'utf8');
const renderer=read('assets/js/ios-photo-preview-buttons.js');
const index=read('index.html');
const mac=read('assets/js/mac-photo-preview.js');
assert(index.includes('ios-photo-preview-buttons.js?v=20261014-native-stacked-870'));
assert(index.includes('mac-photo-preview.js?v=20261014-action-locale-bridge'));
assert(renderer.includes("renderFrame('iphone');renderFrame('ipad')"));
assert(!renderer.includes('pg-photo-ui-layout'),'Legacy iPad split screen must be removed');
assert(!renderer.includes('pg-photo-ui-image'),'Mock paper photo must not appear before photo selected');
assert(!renderer.includes('pg-photo-ui-share{background:#6d28d9'),'Purple share button must be removed');
const required=['pg-photo-ui-picker','pg-photo-ui-camera','pg-photo-ui-context-title','pg-photo-ui-textbox','pg-photo-ui-guidance','pg-photo-ui-provider-label','pg-photo-ui-provider-select','pg-photo-ui-open-action','pg-photo-ui-native-share','pg-photo-ui-scan'];
let locations=required.map(token=>renderer.indexOf("'"+token+"'"));
assert(locations.every(x=>x>=0),'Missing a native Photo to AI UI control');
assert(locations.every((x,i)=>i===0||x>locations[i-1]),'Photo to AI UI order differs from iOS build 870');
assert(renderer.includes('overflow-y:auto'),'iPhone and iPad modals must scroll, not crop');
assert(renderer.includes('border:2px solid #26e5a5'),'Neon green provider selector missing');
assert(renderer.includes('pg:languagechange')&&renderer.includes('pg:photo-action-locales-ready'),'Language-switch and action-label localization missing');
const c={window:{},localStorage:{getItem:()=>null},navigator:{language:'en'},_uiLang:'EN'};vm.createContext(c);vm.runInContext(read('assets/js/photo-to-ai-locales.js'),c);
const dict=c.window.PGPhotoAILocales;
assert.equal(Object.keys(dict).length,39);
const actionJSON=mac.match(/var macActionLocales=(\{[^;]+\});/);
assert(actionJSON,'Missing localized paste-photo action names');
const actions=JSON.parse(actionJSON[1]);
assert.deepEqual(Object.keys(actions).sort(),Object.keys(dict).sort());
for(const [locale,data] of Object.entries(dict)){
 for(const key of ['feature','photoPolicy','choose','camera','context','manualPhoto','privacy','share','scanText']){
  assert(data[key]?.trim(),`${locale} missing ${key}`);
 }
 assert(actions[locale][0]?.trim(),`${locale} missing Open selected AI translation`);
}
console.log('PASS: iOS Photo to AI real UI preview — stacked iPhone/iPad, correct button order, green selector, no purple sharing button, 39 localized languages.');
