/* Responsive, localized Copy buttons for every block snippet and MCP tool ID.
 * Never mutate technical values or i18n source strings; always copy exact code. */
(()=>{
'use strict';
const copyLocales=Object.assign({EN:['Copy','Copied!']},{"ES":["Copiar","Copiado"],"FR":["Copier","Copié"],"DE":["Kopieren","Kopiert"],"IT":["Copia","Copiato"],"PT":["Copiar","Copiado"],"NL":["Kopiëren","Gekopieerd"],"RU":["Копировать","Скопировано"],"ZH":["复制","已复制"],"ZH_TW":["複製","已複製"],"JA":["コピー","コピーしました"],"KO":["복사","복사됨"],"AR":["نسخ","تم النسخ"],"HI":["कॉपी करें","कॉपी किया गया"],"BN":["কপি করুন","কপি হয়েছে"],"TR":["Kopyala","Kopyalandı"],"PL":["Kopiuj","Skopiowano"],"SV":["Kopiera","Kopierat"],"NO":["Kopier","Kopiert"],"DA":["Kopiér","Kopieret"],"FI":["Kopioi","Kopioitu"],"EL":["Αντιγραφή","Αντιγράφηκε"],"HE":["העתק","הועתק"],"ID":["Salin","Tersalin"],"MS":["Salin","Disalin"],"TH":["คัดลอก","คัดลอกแล้ว"],"VI":["Sao chép","Đã sao chép"],"UK":["Копіювати","Скопійовано"],"CS":["Kopírovat","Zkopírováno"],"RO":["Copiază","Copiat"],"HU":["Másolás","Másolva"],"SK":["Kopírovať","Skopírované"],"HR":["Kopiraj","Kopirano"],"CA":["Copia","Copiat"],"AF":["Kopieer","Gekopieer"],"SW":["Nakili","Imenakiliwa"],"HA":["Kwafi","An kwafa"],"AM":["ቅዳ","ተቀድቷል"]});
const blocks='[data-pg-code-block], .code-block';
const tokenSelectors='#connect .pg-mcp-tools-grid .pg-mcp-motion-card > code, .mcp-tool-list li > code, .tools-table tbody tr > td:first-child, code[data-pg-copy-token]';
let current='EN';
function lang(){
  const fromI18n=window._pgI18n && typeof window._pgI18n.curLang==='function' ? window._pgI18n.curLang() : '';
  const fromQuery=new URLSearchParams(location.search).get('lang');
  const val=String(fromI18n||fromQuery||document.documentElement.lang||'EN').replace('-','_').toUpperCase();
  return copyLocales[val]?val:'EN';
}
function phrase(code,which){return (copyLocales[code]||copyLocales.EN)[which];}
function updateLabel(button){
  if(button.dataset.pgCopyState==='copied')return;
  button.textContent=phrase(current,0);
  button.setAttribute('aria-label',phrase(current,0)+' code');
  button.title=phrase(current,0);
}
function makeButton(){
  const button=document.createElement('button');
  button.type='button';
  button.className='pg-code-copy';
  button.setAttribute('data-pg-copy-button','');
  button.setAttribute('data-no-translate','');
  updateLabel(button);
  return button;
}
function enhanceBlock(block){
  if(block.dataset.pgCodeReady)return;
  block.classList.add('pg-code-snippet');
  let button=Array.from(block.children).find(e=>e.matches('[data-pg-copy-button],.copy-btn'));
  let content=Array.from(block.children).find(e=>e.matches('.pg-code-snippet-content'));
  if(!content){
    content=document.createElement('div');
    content.className='pg-code-snippet-content';
    // Preserve exact whitespace and embedded <pre> JSON; move original DOM nodes.
    Array.from(block.childNodes).forEach(node=>{
      if(node.nodeType===1&&node===button)return;
      content.appendChild(node);
    });
    block.prepend(content);
  }
  if(!button){button=makeButton();block.appendChild(button);}
  button.removeAttribute('onclick');
  button.removeAttribute('data-i18n');
  button.setAttribute('data-no-translate','');
  button.type='button';
  button.classList.add('pg-code-copy');
  button.setAttribute('data-pg-copy-button','');
  button.dataset.pgCopyMode='block';
  content.setAttribute('data-no-translate','');
  block.dataset.pgCodeReady='1';
  updateLabel(button);
}
function enhanceToken(item){
  if(item.closest('.pg-tool-code-row,[data-mcp-tr]'))return;
  let code=item;
  if(item.matches('td')){
    if(!/^\w{3,80}$/.test(item.textContent.trim()))return;
    code=document.createElement('code');
    code.textContent=item.textContent.trim();
    item.textContent='';
    item.appendChild(code);
  }
  const wrapper=document.createElement('span');
  wrapper.className='pg-tool-code-row';
  code.parentNode.insertBefore(wrapper,code);
  wrapper.appendChild(code);
  wrapper.setAttribute('data-pg-code-token','');
  wrapper.setAttribute('data-no-translate','');
  const button=makeButton();
  button.dataset.pgCopyMode='token';
  wrapper.appendChild(button);
}
function enhance(){
  document.querySelectorAll(blocks).forEach(enhanceBlock);
  document.querySelectorAll(tokenSelectors).forEach(enhanceToken);
  // A pre/code sample placed on its own becomes copyable; inline instructions
  // remain clean and unmodified. Exclude the dedicated localized MCP endpoint,
  // which already has a working Copy button.
  document.querySelectorAll('pre').forEach(el=>{
    if(el.closest('.pg-code-snippet,.mcp-endpoint,[data-mcp-tr]'))return;
    const wrapper=document.createElement('div');
    wrapper.setAttribute('data-pg-code-block','');
    el.parentNode.insertBefore(wrapper,el);
    wrapper.appendChild(el);
    enhanceBlock(wrapper);
  });
  refresh();
}
function refresh(){
  current=lang();
  document.querySelectorAll('[data-pg-copy-button]').forEach(updateLabel);
}
function value(button){
  const block=button.closest('.pg-code-snippet');
  if(block){
    const el=Array.from(block.children).find(e=>e.classList.contains('pg-code-snippet-content'));
    return (el?.textContent||'').replace(/\u00a0/g,' ').trim();
  }
  const row=button.closest('.pg-tool-code-row');
  if(row)return (row.querySelector('code')?.textContent||'').trim();
  return '';
}
async function copy(text){
  if(navigator.clipboard && typeof navigator.clipboard.writeText==='function'){
    await navigator.clipboard.writeText(text);
    return;
  }
  const area=document.createElement('textarea');
  area.value=text;
  area.readOnly=true;
  area.style.cssText='position:fixed;left:-10000px;top:0;opacity:0;';
  document.body.appendChild(area);
  area.select();
  let ok=false;
  try{ok=!!document.execCommand('copy');}finally{area.remove();}
  if(!ok)throw new Error('Clipboard unavailable');
}
document.addEventListener('click',async event=>{
  const button=event.target.closest('[data-pg-copy-button]');
  if(!button || !button.closest('.pg-code-snippet,.pg-tool-code-row'))return;
  event.preventDefault();
  event.stopPropagation();
  const text=value(button);
  if(!text)return;
  try{
    await copy(text);
    button.dataset.pgCopyState='copied';
    button.textContent=phrase(lang(),1);
  }catch(err){
    button.dataset.pgCopyState='error';
    button.textContent='!';
    button.title='Copy unavailable';
  }
  const token=String(Number(button.dataset.pgCopyGeneration||0)+1);
  button.dataset.pgCopyGeneration=token;
  window.setTimeout(()=>{
    if(button.dataset.pgCopyGeneration!==token)return;
    button.removeAttribute('data-pg-copy-state');
    refresh();
  },1800);
},true);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance,{once:true});
else enhance();
window.addEventListener('pg:languagechange',()=>window.setTimeout(refresh,40));
window.addEventListener('pageshow',refresh);
window._pgCodeCopy={enhance,refresh,copy,value};
})();