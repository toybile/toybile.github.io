/* Original local sound effects, started only by portal interactions. */
(()=>{
 'use strict';
 const key='portfolio-sound-v1',active=new Set(),buttons=new Set(),soundPanes=new Set();let muted=false;
 try{muted=localStorage.getItem(key)==='muted';}catch{}
 const sources={move:'audio/chesscom-move-self.mp3',fall:'audio/chesscom-capture.mp3',urnKeys:'audio/urn-keypad.wav',urnConfirm:'urna-confirmacao.mp3',vortexTouch:'audio/worldline-touch.wav',shiftOriginal:'audio/worldline-original.mp3',urnTap:'audio/urn-tap.wav',unlock:'audio/private-unlock.wav'};
 const base=new URL('.',document.currentScript.src),cached={};
 for(const[name,path]of Object.entries(sources)){const sound=new Audio(new URL(path,base));sound.preload='auto';cached[name]=sound;}
 function play(name,{delay=0,volume=.55}={}){
  if(muted||!cached[name])return()=>{};
  const sound=cached[name].cloneNode();sound.volume=Math.min(1,Math.max(0,volume));let timer,stopped=false;
  const stop=()=>{if(stopped)return;stopped=true;clearTimeout(timer);sound.pause();sound.removeAttribute('src');sound.load();active.delete(stop);};
  active.add(stop);sound.addEventListener('ended',stop,{once:true});sound.addEventListener('error',stop,{once:true});
  const start=()=>{if(stopped||muted){stop();return;}sound.play().catch(stop);};
  if(delay)timer=setTimeout(start,delay*1000);else start();return stop;
 }
 function sequence(events){const stops=events.map(({name,...options})=>play(name,options));return()=>stops.forEach(stop=>stop());}
 const speaker='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4Z"/><path class="portal-speaker-waves" d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/><path class="portal-speaker-muted" d="m16 9 5 6m0-6-5 6"/></svg>';
 function refresh(){const en=document.documentElement.lang.startsWith('en');for(const button of buttons){button.dataset.muted=String(muted);button.setAttribute('aria-label',en?(muted?'Enable sound effects':'Mute sound effects'):(muted?'Ativar efeitos sonoros':'Silenciar efeitos sonoros'));if(button.classList.contains('portal-audio-setting')){button.setAttribute('aria-checked',String(!muted));button.querySelector('strong').textContent=en?'Sound effects':'Efeitos sonoros';button.querySelector('small').textContent=en?'A different sound for each hidden area.':'Um som diferente para cada área especial.';button.querySelector('.portal-audio-state').textContent=en?(muted?'Off':'On'):(muted?'Desativado':'Ativado');}}for(const{label,heading}of soundPanes){label.textContent=en?'Sounds':'Sons';heading.textContent=en?'Sounds':'Sons';}}
 function setMuted(value){muted=value;try{localStorage.setItem(key,muted?'muted':'on');}catch{}if(muted)for(const stop of [...active])stop();refresh();}
 function bind(scene){const button=document.createElement('button');button.type='button';button.className='portal-sound-toggle';button.setAttribute('translate','no');button.innerHTML=speaker;button.onclick=e=>{e.stopPropagation();setMuted(!muted);};scene.append(button);buttons.add(button);refresh();return()=>buttons.delete(button);}
 const setting=document.createElement('button');setting.type='button';setting.className='surface-control portal-audio-setting';setting.setAttribute('role','switch');setting.setAttribute('translate','no');setting.innerHTML='<span class="surface-copy"><strong class="surface-title"></strong><small class="surface-description"></small></span><span class="portal-audio-state surface-state"></span><span class="surface-track" aria-hidden="true"><span></span></span>';setting.onclick=()=>setMuted(!muted);document.querySelector('#cursor-settings')?.before(setting);buttons.add(setting);
 function mountSettings(root){
  if(root.querySelector('#settings-sounds'))return;
  const appearance=root.querySelector('#settings-appearance'),appearanceTab=root.querySelector('#settings-appearance-tab'),tabs=root.querySelector('.hy-settings-tabs');
  const tab=document.createElement('button');tab.type='button';tab.id='settings-sounds-tab';tab.setAttribute('role','tab');tab.setAttribute('aria-controls','settings-sounds');tab.setAttribute('translate','no');tab.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4Z"/><path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg><span></span>';
  const pane=document.createElement('section');pane.id='settings-sounds';pane.className='hy-settings-panel';pane.setAttribute('role','tabpanel');pane.setAttribute('aria-labelledby',tab.id);
  const heading=document.createElement('h3');heading.className='hy-theme-group-title';heading.setAttribute('translate','no');pane.append(heading,setting);tabs.append(tab);root.querySelector('.hy-settings-pages').append(pane);soundPanes.add({label:tab.lastElementChild,heading});
  const choices=[appearanceTab,tab],panes=[appearance,pane];
  const select=(index,focus=false)=>{choices.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;panes[i].hidden=i!==index;});if(focus)choices[index].focus();};
  choices.forEach((button,index)=>{button.onclick=()=>select(index);button.onkeydown=event=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();select(event.key==='Home'?0:event.key==='End'?1:1-index,true);};});select(0);refresh();
 }
 document.querySelector('#appearance-reset')?.addEventListener('click',()=>setMuted(false));
 new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 window.PortfolioAudio={play,sequence,bind,mountSettings,resetSettings:()=>setMuted(false),get muted(){return muted;}};refresh();
})();
