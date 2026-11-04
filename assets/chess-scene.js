/* Small vector scene: grasp, lift, advance, knock over the opposing king. */
(()=>{'use strict';
 const hand='<svg class="chess-scene-hand" viewBox="0 0 200 240" aria-hidden="true"><path d="m123-25 90 45-43 105-61-26Z" fill="#3d526e" stroke="#25364d" stroke-width="3"/><path d="m112 76 62 25-13 33-62-26Z" fill="#f5f2e9" stroke="#7e7065" stroke-width="3"/><path d="M105 107c-15 5-29 12-34 25l-25 53c-4 12 11 18 17 6l19-32-4 37c-1 13 16 14 19 1l9-34 16-3 6 26c3 12 20 7 16-6l-3-38c-3-18-16-31-36-35Z" fill="#dfc4aa" stroke="#8b6d58" stroke-width="3" stroke-linejoin="round"/><path d="m84 151 14 9m22-17 13 7" fill="none" stroke="#ad8a70" stroke-width="2" stroke-linecap="round"/></svg>';
 window.PortfolioChessScene=(target,reveal,onFinish)=>{
  const en=document.documentElement.lang.startsWith('en'),scene=document.createElement('dialog');scene.className='chess-capture-scene';scene.setAttribute('aria-label',en?'A chess piece knocks over the opposing king. Click or press Escape to skip.':'Uma peça derruba o rei adversário. Clique ou pressione Escape para pular.');
  scene.innerHTML='<div class="chess-capture-stage" aria-hidden="true"><div class="chess-scene-board"></div><div class="chess-scene-shadow"></div><div class="chess-scene-mover"><img class="chess-scene-piece" src="assets/chesscom-neo-queen.png" alt="">'+hand+'</div><div class="chess-scene-king"><img class="chess-scene-piece" src="assets/chesscom-neo-black-king.png" alt=""></div><span class="chess-scene-caption">'+(en?'One move. A different outcome.':'Um movimento. Outro desfecho.')+'</span></div>';
  document.body.append(scene);scene.showModal();document.documentElement.style.overflow='hidden';
  const unbind=window.PortfolioAudio?.bind(scene),stopSound=window.PortfolioAudio?.sequence([{name:'lift',delay:.32,volume:.7},{name:'move',delay:1.64,volume:.62},{name:'fall',delay:2.23,volume:.70}]);
  let done=false,staged=false,fade;
  const stage=()=>{if(staged)return;staged=true;reveal();};
  const finish=()=>{if(done)return;done=true;clearTimeout(stageTimer);clearTimeout(endTimer);fade?.cancel();stopSound?.();stage();window.PortfolioTransitions.promote(target);scene.close();scene.remove();unbind?.();onFinish();};
  const stageTimer=setTimeout(stage,2450);
  const endTimer=setTimeout(()=>{fade=scene.animate([{opacity:1},{opacity:0}],{duration:360,easing:'ease-out',fill:'forwards'});fade.onfinish=finish;},2930);
  scene.addEventListener('click',event=>{if(event.button===0)finish();});scene.addEventListener('cancel',event=>{event.preventDefault();finish();});
  return {finish,stopSound};
 };
})();
