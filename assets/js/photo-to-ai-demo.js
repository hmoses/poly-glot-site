(function(d,w){
'use strict';
function init(){
const root=d.getElementById('pg-photo-demo'); if(!root)return;
const screen=root.querySelector('.pg-photo-phone-screen'),caption=root.querySelector('[data-pg-demo-caption]'),progress=root.querySelector('[data-pg-progress]'),pause=root.querySelector('[data-pg-demo-pause]'),replay=root.querySelector('[data-pg-demo-replay]');
let cursor=root.querySelector('.pg-photo-tap');if(!cursor){cursor=d.createElement('span');cursor.className='pg-photo-tap';screen.append(cursor);}
let viewport=screen.querySelector('.pg-demo-stage-viewport');if(!viewport){viewport=d.createElement('div');viewport.className='pg-demo-stage-viewport';screen.insertBefore(viewport,cursor);}
const dir='assets/img/photo-demo/';
const real=n=>dir+'frame-'+String(n).padStart(2,'0')+'.jpg';
const stages=[
[1,80,77,'Start on the real Ask Any AI screen.',3300],
[3,80,77,'Tap Photo to AI.',3000],
[4,50,26,'Photo to AI opens.',3200],
[6,50,26,'Tap Choose photo.',3200],
[7,49,29,'Choose Photo Library.',3200],
['library',50,40,'Tap the Poly-Glot Ask Any AI screenshot.',3500],
['library',90,7,'Tap the blue checkmark.',3100],
[10,50,65,'The selected screenshot appears in Photo to AI.',3300],
[10,47,65,'Tap Add context.',2600],
['typing',18,63,'Type: Describe this photo.',4800],
[15,54,88,'Dismiss the keyboard.',2800],
[16,50,84,'Tap Share with AI.',3000],
[17,45,66,'The AI provider menu opens.',2600],
[18,36,49,'Choose ChatGPT.',3100],
[19,50,72,'ChatGPT is selected; the menu closes.',3000],
[19,50,79,'Tap Open selected AI.',3100],
['chat',45,57,'ChatGPT opens. Tap the message field.',3600],
['prompt',44,57,'Paste “Describe this photo.” into ChatGPT.',4200],
['photo',15,56,'Tap again to paste the screenshot into ChatGPT.',5400]
];
let ix=0,timer=0,paused=false,visible=true,started=false,motion=null,tapTimer=0,runToken=0,position=null;
const reduce=!!(w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches);
function clear(){
 w.clearTimeout(timer);timer=0;
 w.clearTimeout(tapTimer);tapTimer=0;
 runToken++;
 if(motion){motion.cancel();motion=null}
}
function chatMarkup(mode){
 const text=mode==='prompt'||mode==='photo'?'Describe this photo.':'';
 const photo=mode==='photo'?'<img class="pg-demo-attachment" src="'+real(1)+'" alt="Poly-Glot screenshot attached to ChatGPT">':'';
 return '<div class="pg-demo-chatgpt"><div class="pg-demo-chat-status">7:16 ▰　⌁　▣</div><div class="pg-demo-browser-app"><strong>ChatGPT</strong><span>Open</span></div><div class="pg-demo-chat-bar"><span>☰</span><strong>ChatGPT</strong><span>Log in</span></div><div class="pg-demo-chat-question">What are you working on?</div><div class="pg-demo-chat-input"><div class="pg-demo-attachments">'+photo+'</div><div class="pg-demo-chat-line"><span>＋</span><div>'+ (text||'Ask ChatGPT')+'</div><span>●</span></div></div><div class="pg-demo-chat-bottom">chatgpt.com</div></div>';
}
function render(){
 const [frame,x,y,title,ms]=stages[ix];
 if(typeof frame==='number')viewport.innerHTML='<img class="pg-demo-real-frame" src="'+real(frame)+'" alt="Real Poly-Glot iPhone recording frame" draggable="false">';
 else if(frame==='library')viewport.innerHTML='<img class="pg-demo-real-frame" src="'+dir+'frame-library-single.png" alt="Photo library displaying only the Poly-Glot screenshot" draggable="false">';
 else if(frame==='typing')viewport.innerHTML='<img class="pg-demo-real-frame" src="'+real(10)+'" alt="Photo to AI Add context field" draggable="false"><span class="pg-demo-typing"></span>';
 else viewport.innerHTML=chatMarkup(frame);
 screen.append(cursor);
 caption.textContent=title;progress.style.width=(((ix+1)/stages.length)*100).toFixed(2)+'%';
 cursor.classList.add('pg-demo-pointer-visible');
 cursor.classList.remove('pg-demo-click');
 const token=++runToken;
 const start=position||{x,y};
 const duration=reduce?0:Math.min(1550,Math.max(750,Math.hypot(x-start.x,y-start.y)*30));
 if(motion){motion.cancel();motion=null}
 // Move along a subtle arc rather than jumping diagonally in a straight line.
 if(duration&&cursor.animate&&position){
   const dx=x-start.x,dy=y-start.y;
   const arc=Math.min(3.5,Math.hypot(dx,dy)*.09);
   const bend=dx===0&&dy===0?0:(dx>0?-arc:arc);
   motion=cursor.animate([
     {left:start.x+'%',top:start.y+'%',offset:0},
     {left:(start.x+dx*.52+bend)+'%',top:(start.y+dy*.52-arc)+'%',offset:.5},
     {left:x+'%',top:y+'%',offset:1}
   ],{duration,easing:'cubic-bezier(.36,.05,.22,1)',fill:'forwards'});
   cursor.style.left=x+'%';cursor.style.top=y+'%';
 }else{cursor.style.left=x+'%';cursor.style.top=y+'%';}
 position={x,y};
 tapTimer=w.setTimeout(()=>{
   if(token!==runToken||paused||!visible)return;
   if(motion){motion.finish();motion.cancel();motion=null}
   cursor.classList.remove('pg-demo-click');
   void cursor.offsetWidth;
   if(!reduce)cursor.classList.add('pg-demo-click');
 },duration+220);
 if(frame==='typing'){
  const el=viewport.querySelector('.pg-demo-typing');let k=0;
  const letters='Describe this photo.';
  const typing=w.setInterval(()=>{if(!viewport.contains(el)){w.clearInterval(typing);return;}el.textContent=letters.slice(0,++k);if(k===letters.length)w.clearInterval(typing);},95);
 }
 timer=w.setTimeout(()=>{if(!paused&&visible){ix=(ix+1)%stages.length;render()}},reduce?Math.max(ms,2500):ms);
}
function play(){if(!visible||paused)return;clear();render()}
replay.addEventListener('click',()=>{ix=0;paused=false;pause.textContent='Ⅱ Pause';pause.setAttribute('aria-pressed','false');visible=true;play()});
pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'▶ Play':'Ⅱ Pause';pause.setAttribute('aria-pressed',String(paused));clear();if(!paused)play()});
d.addEventListener('visibilitychange',()=>{if(d.hidden)clear();else if(!paused)play()});
if('IntersectionObserver' in w){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){started=true;if(!paused)play()}else clear()},{threshold:.1}).observe(root);}
else {visible=true;started=true;play();}
render(); if(!visible)clear();
}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',init,{once:true});else init();
})(document,window);
