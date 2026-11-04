/* Adapted from Logic Editor: help/unified-hover-hints.js and settings/hover-delay-setting.js. */
window.ToybileHints=(()=>{'use strict';
const key='portfolio-hover-hints-v1',defaults={hoverDelaySeconds:.5,hoverHintsEnabled:true};
let ui={...defaults};try{Object.assign(ui,JSON.parse(localStorage.getItem(key))||{});}catch{}
const save=()=>{try{localStorage.setItem(key,JSON.stringify(ui));}catch{}};
const en=()=>document.documentElement.lang==='en';
const enabled=()=>ui.hoverHintsEnabled!==false;
const normalize=value=>Math.round(Math.max(.01,Math.min(1,Number.isFinite(value)?value:.5))*100)/100;
const tip=document.createElement('div');tip.id='lp-shared-hover-hint';tip.className='lp-decoration-alt-hint lp-unified-hint';tip.setAttribute('popover','manual');tip.setAttribute('role','tooltip');tip.setAttribute('translate','no');document.body.append(tip);
let pending=null,anchor=null,visibleAnchor=null;
function bodyKeys(container,value){
 const pattern=/\b(?:duplo clique|double[- ]click|clique|click|Esc)\b/giu;
 for(const sentence of String(value).split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý])/u)){
  if(!sentence.trim())continue;
  const line=document.createElement('span');line.className='lp-hint-line';let last=0;
  for(const match of sentence.matchAll(pattern)){line.append(document.createTextNode(sentence.slice(last,match.index)));const kbd=document.createElement('kbd');kbd.textContent=match[0];line.append(kbd);last=match.index+match[0].length;}
  line.append(document.createTextNode(sentence.slice(last)));container.append(line);
 }
}
function hide(){clearTimeout(pending);pending=null;if(tip.matches(':popover-open'))tip.hidePopover();visibleAnchor?.removeAttribute('aria-describedby');visibleAnchor=null;}
function position(){
 if(!visibleAnchor?.isConnected){hide();return;}
 const b=visibleAnchor.getBoundingClientRect(),size=tip.getBoundingClientRect();
 const left=Math.max(12,Math.min(innerWidth-size.width-12,b.left+b.width/2-size.width/2)),below=b.bottom+9+size.height<=innerHeight-12;
 tip.dataset.side=below?'bottom':'top';tip.style.left=left+'px';
 tip.style.top=Math.max(12,Math.min(innerHeight-size.height-12,below?b.bottom+9:b.top-size.height-9))+'px';
 tip.style.setProperty('--hint-pointer',Math.max(14,Math.min(size.width-24,b.left+b.width/2-left-4))+'px');
}
function show(element){
 if(!enabled()||!element?.isConnected)return;
 hide();
 const info=element.hintContent?.();if(!info?.title)return;
 const heading=document.createElement('span'),icon=document.createElement('span'),title=document.createElement('span');
 heading.className='lp-hint-heading';icon.className='lp-hint-icon';icon.setAttribute('aria-hidden','true');
 const svg=element.querySelector('.hub-icon')||element.querySelector('svg');if(svg)icon.append(svg.cloneNode(true));else icon.textContent='?';
 title.textContent=info.title;heading.append(icon,title);tip.replaceChildren(heading);tip.dataset.compact=String(!info.body);
 if(info.body){const body=document.createElement('span');body.className='lp-hint-body';bodyKeys(body,info.body);tip.append(body);}
 visibleAnchor=element;element.setAttribute('aria-describedby',tip.id);tip.showPopover();position();
}
function schedule(element){
 if(!enabled())return;
 if(anchor===element&&(pending||visibleAnchor===element))return;
 hide();anchor=element;pending=setTimeout(()=>{pending=null;show(element);},normalize(ui.hoverDelaySeconds)*1000);
}
const target=node=>node instanceof Element?node.closest('[data-hint]'):null;
const reset=()=>{hide();anchor=null;};
document.addEventListener('pointerover',event=>{if(event.pointerType!=='mouse')return;const element=target(event.target);if(!element||element.contains(event.relatedTarget))return;schedule(element);});
document.addEventListener('pointerout',event=>{if(anchor&&!anchor.contains(event.relatedTarget)&&anchor.contains(event.target))reset();});
document.addEventListener('pointerdown',reset,true);document.addEventListener('keydown',reset,true);addEventListener('scroll',reset,true);addEventListener('resize',hide);addEventListener('blur',hide);
function mountSettings(root){
 if(root.querySelector('#hover-delay-range'))return;
 const setting=document.createElement('section');setting.className='hy-setting hy-hover-delay-setting';
 setting.innerHTML='<div class="hy-setting-heading"><label for="hover-delay-range"></label><button type="button" id="hover-hints-toggle" role="switch" aria-checked="true" class="hy-hints-toggle"><span aria-hidden="true"></span></button></div><div class="hy-hover-delay-control"><div class="hy-size-range hy-hover-delay-track"><input id="hover-delay-range" type="range" min="0.01" max="1" step="0.01"></div><div class="hy-hover-delay-value"><input id="hover-delay-number" type="number" min="0.01" max="1" step="0.01" inputmode="decimal"><span aria-hidden="true">s</span></div></div>';
 root.querySelector('#settings-appearance').append(setting);
 const range=setting.querySelector('[type=range]'),number=setting.querySelector('[type=number]'),label=setting.querySelector('label'),toggle=setting.querySelector('[role=switch]');
 const update=source=>{const value=ui.hoverDelaySeconds=normalize(Number(ui.hoverDelaySeconds)),name=en()?'Hover hint delay in seconds':'Tempo das dicas em segundos';range.value=String(value);if(source!=='number')number.value=String(value);range.style.setProperty('--range-fill',((value-.01)/.99)*100+'%');label.textContent=en()?'Hover hints':'Dicas de hover';range.setAttribute('aria-label',name);number.setAttribute('aria-label',name);range.setAttribute('aria-valuetext',value+' s');toggle.setAttribute('aria-checked',String(enabled()));toggle.setAttribute('aria-label',en()?'Enable hover hints':'Ativar dicas de hover');range.disabled=number.disabled=!enabled();setting.dataset.disabled=String(!enabled());};
 const set=(value,source)=>{ui.hoverDelaySeconds=normalize(value);update(source);save();reset();};
 range.oninput=()=>set(range.valueAsNumber,'range');
 number.oninput=()=>{const value=number.valueAsNumber;if(Number.isFinite(value)&&value>=.01&&value<=1)set(value,'number');};
 number.onchange=number.onblur=()=>{if(number.value==='')update();else set(number.valueAsNumber,'commit');};
 number.onkeydown=event=>{if(event.key==='Enter'){event.preventDefault();number.onchange();}};
 toggle.onclick=()=>{ui.hoverHintsEnabled=!enabled();update();save();reset();};
 root.querySelector('#settings-default')?.addEventListener('click',()=>{ui={...defaults};update();save();reset();});
 new MutationObserver(()=>update()).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});update();
}
return{hide:reset,mountSettings};
})();
