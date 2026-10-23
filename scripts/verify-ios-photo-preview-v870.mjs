/* iOS v1.1.8 (942) Photo to AI App Preview contract.
 * iPhone/iPad are STATIC native-screen replicas. The existing global lightbox
 * enlarges the exact device frame; only the Mac Photo to AI modal is interactive.
 */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const renderer = read('assets/js/ios-photo-preview-buttons.js');
const index = read('index.html');
const mac = read('assets/js/mac-photo-preview.js');
assert.doesNotThrow(() => new vm.Script(renderer), 'Photo to AI gallery JavaScript must parse');
assert(index.includes('ios-photo-preview-buttons.js?v=20261017-static-native-942'),
  'Updated JS cache-buster is required');
assert(index.includes('mac-photo-preview.js?v=20261017-image-only-v4'),
  'Existing interactive Mac preview must remain loaded');
assert(index.includes('function openDevice(device)') &&
       index.includes('freezeComputedTree(device,clone)') &&
       index.includes("target.closest('.iphone-device,.ipad-device,.demo-iphone-frame,[data-device-frame]')"),
  'iPhone/iPad lightbox must still clone the exact device frame');
const mobile = renderer.slice(renderer.indexOf('/* Static Photo to AI gallery cards'));
assert(mobile.length > 3000, 'Missing static iPhone/iPad Photo to AI gallery renderer');
for(const token of [
  "addGalleryFrame('iphone')", "addGalleryFrame('ipad')",
  'pg-photo-picker','pg-photo-picker-icon','pg-photo-picker-sources',
  'pg-photo-choose-actions','pg-photo-choose','pg-photo-take',
  'pg-photo-provider-label','pg-photo-provider-selected','pg-photo-open',
  'pg-photo-notes','pg-photo-privacy'
]) assert(mobile.includes(token),'Missing current iOS photo interface: '+token);
assert(mobile.includes('Tap to choose photo') &&
       mobile.includes('Photo Library · Camera · Files') &&
       mobile.includes('Long-press') &&
       mobile.includes('ChatGPT'),
  'iPhone native screenshot labels differ');
for(const obsolete of ['pg-photo-ui-context-title','pg-photo-ui-textbox',
  'pg-photo-ui-native-share','pg-photo-ui-scan','pg-photo-ui-guidance']) {
  assert(!mobile.includes(obsolete), 'Old Mac-style/870 UI still present: '+obsolete);
}
assert(!mobile.includes('.addEventListener(') ||
       mobile.match(/\.addEventListener\(/g).length <= 6,
  'Mobile preview should only listen for localization, not taps');
assert(!mobile.includes("addEventListener('click'") &&
       !mobile.includes("addEventListener('change'") &&
       !mobile.includes("addEventListener('keydown'") &&
       !mobile.includes("type='file'"),
  'iPhone/iPad must retain global lightbox rather than become interactive');
assert(mobile.includes('pointer-events:none'), 'Static UI must leave clicks to global lightbox');
assert(mobile.includes('aspect-ratio:440/956') &&
       mobile.includes('aspect-ratio:4/3') &&
       mobile.includes('overflow:hidden!important'),
  'Device-specific aspect ratios and clipping boundaries missing');
assert(mobile.includes('pg-photo-ipad-card') && mobile.includes('pg-photo-iphone-card'),
  'Both phone and tablet sized layouts are required');
assert(mac.includes("action.addEventListener('click',open)") &&
       mac.includes("el('pgMacDemoAI').addEventListener('change',relabel)"),
  'Mac preview must remain interactive with a provider selector');
const globals = {window:{},localStorage:{getItem:()=>null},navigator:{language:'en'},_uiLang:'EN'};
vm.createContext(globals);
vm.runInContext(read('assets/js/photo-to-ai-locales.js'),globals);
const catalog = globals.window.PGPhotoAILocales;
assert.equal(Object.keys(catalog).length,39,'English and 38 translated locale catalogs required');
const match = mac.match(/var macActionLocales=(\{[^;]+\});/);
assert(match,'39-language action labels must remain in Mac preview');
const actions = JSON.parse(match[1]);
assert.deepEqual(Object.keys(actions).sort(),Object.keys(catalog).sort());
for(const [code, pack] of Object.entries(catalog)){
  for(const key of ['feature','photoPolicy','choose','camera','share','manualPhoto','locked'])
    assert(pack[key]?.trim(),code+' missing '+key);
  assert(actions[code][0]?.trim(),code+' missing localized open action');
}
console.log('PASS: iPhone and iPad static Photo to AI v942 UI, correctly clipped device frames, 39-language labels, preserved iOS lightbox and interactive Mac preview.');
