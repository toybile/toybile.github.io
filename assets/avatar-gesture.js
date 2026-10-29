(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('avatar-gesture-trail');
  svg.setAttribute('aria-hidden', 'true');
  document.body.append(svg);
  const avatar = new Image();
  avatar.src = new URL('favicon.svg?v=profile-avatar1', document.currentScript.src).href;
  avatar.alt = '';
  avatar.className = 'avatar-gesture-image';
  avatar.setAttribute('aria-hidden', 'true');
  let drawing = null, frame = 0, avatarAnimation = null, suppressClick = false;

  function background(target, x, y) {
    if (!(target instanceof Element) || document.querySelector('dialog[open]')) return false;
    if (target.closest('button,a,summary,input,textarea,select,dialog,[role="button"],[contenteditable="true"],.hub-tile,.hub-section h2')) return false;
    // Empty portions of a header are usable; actual text remains selectable.
    if (target.closest('header')) {
      const walker = document.createTreeWalker(target.closest('header'), NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (!walker.currentNode.nodeValue.trim()) continue;
        const range = document.createRange();
        range.selectNodeContents(walker.currentNode);
        for (const box of range.getClientRects()) {
          if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) return false;
        }
      }
    }
    return target === root || target === document.body || !!target.closest('.hero,.columns,.page,.hub-product');
  }

  function resemblesCircle(points) {
    if (points.length < 12) return false;
    const xs = points.map(p => p.x), ys = points.map(p => p.y);
    const width = Math.max(...xs) - Math.min(...xs), height = Math.max(...ys) - Math.min(...ys);
    const diameter = Math.max(width, height);
    if (Math.min(width, height) < 36 || width / height < .45 || width / height > 2.2) return false;
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    let distance = 0, winding = 0, previousAngle = null;
    const radii = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i], angle = Math.atan2(p.y - cy, p.x - cx);
      radii.push(Math.hypot(p.x - cx, p.y - cy));
      if (i) distance += Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y);
      if (previousAngle !== null) winding += Math.atan2(Math.sin(angle - previousAngle), Math.cos(angle - previousAngle));
      previousAngle = angle;
    }
    const average = radii.reduce((a, b) => a + b, 0) / radii.length;
    const deviation = Math.sqrt(radii.reduce((sum, radius) => sum + (radius - average) ** 2, 0) / radii.length);
    const gap = Math.hypot(points[0].x - points.at(-1).x, points[0].y - points.at(-1).y);
    return Math.abs(winding) > 4.1 && distance > diameter * 2 && gap < diameter * .8 && deviation / average < .6;
  }

  function revealAvatar() {
    if (avatarAnimation) return;
    document.body.append(avatar);
    const scale = Math.hypot(innerWidth, innerHeight) * 1.1 / 14;
    avatarAnimation = avatar.animate(reduced.matches ? [
      { opacity: 0, transform: 'translate(-50%,-50%) scale(8)' },
      { opacity: .8, transform: 'translate(-50%,-50%) scale(8)', offset: .3 },
      { opacity: 0, transform: 'translate(-50%,-50%) scale(8)' }
    ] : [
      { opacity: 0, transform: 'translate(-50%,-50%) scale(.2)' },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1)', offset: .1 },
      { opacity: 1, transform: `translate(-50%,-50%) scale(${scale})`, offset: .72 },
      { opacity: 0, transform: `translate(-50%,-50%) scale(${scale * 1.04})` }
    ], { duration: reduced.matches ? 650 : 2600, easing: 'cubic-bezier(.35,0,.2,1)', fill: 'forwards' });
    const clear = () => { avatar.remove(); avatarAnimation = null; };
    avatarAnimation.onfinish = clear;
    avatarAnimation.oncancel = clear;
  }

  function paint() {
    frame = 0;
    if (drawing) drawing.path.setAttribute('d', drawing.points.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));
  }

  function finish() {
    if (!drawing) return;
    paint();
    const { path, moved } = drawing;
    drawing = null;
    root.classList.remove('avatar-gesture-drawing');
    if (moved) {
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
    }
    const fade = path.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, fill: 'forwards' });
    fade.onfinish = () => path.remove();
  }

  document.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || !background(event.target, event.clientX, event.clientY)) return;
    finish();
    const path = document.createElementNS(svg.namespaceURI, 'path');
    svg.append(path);
    drawing = { id: event.pointerId, points: [{ x: event.clientX, y: event.clientY }], path, moved: false, recognized: false };
  }, { passive: true });
  document.addEventListener('pointermove', event => {
    if (!drawing || event.pointerId !== drawing.id) return;
    const last = drawing.points.at(-1);
    if (Math.hypot(last.x - event.clientX, last.y - event.clientY) < 2) return;
    drawing.points.push({ x: event.clientX, y: event.clientY });
    if (drawing.points.length > 900) drawing.points = drawing.points.filter((_, i) => i % 2 === 0);
    if (!drawing.moved && Math.hypot(event.clientX - drawing.points[0].x, event.clientY - drawing.points[0].y) > 8) {
      drawing.moved = true;
      root.classList.add('avatar-gesture-drawing');
    }
    if (!frame) frame = requestAnimationFrame(paint);
    if (!drawing.recognized && resemblesCircle(drawing.points)) {
      drawing.recognized = true;
      revealAvatar();
    }
  }, { passive: true });
  document.addEventListener('pointerup', event => { if (drawing?.id === event.pointerId) finish(); }, { passive: true });
  document.addEventListener('pointercancel', finish, { passive: true });
  window.addEventListener('blur', finish);
  window.addEventListener('resize', finish);
  document.addEventListener('scroll', finish, { passive: true, capture: true });
  document.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
})();
