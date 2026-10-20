(() => {
  'use strict';
  // The original scene's independent 46–65 second, left-to-right float.
  const settings = {
    chichen: { duration: 52000, start: .05, bob: 15, phase: 0 },
    colosseum: { duration: 46000, start: .28, bob: 22, phase: 1.2 },
    petra: { duration: 58000, start: .70, bob: 18, phase: 2.4 },
    taj: { duration: 50000, start: .52, bob: 20, phase: 3.1 },
    christ: { duration: 62000, start: .12, bob: 15, phase: 4.2 },
    machu: { duration: 56000, start: .45, bob: 21, phase: 5.2 },
    greatwall: { duration: 65000, start: .76, bob: 24, phase: 6.1 }
  };
  // Approved concept-sheet artwork; no product photography or print-ready claim.
  const designs = {
    chichen: 'Shadow Cube',
    christ: 'Halo Over Rio',
    colosseum: 'Arena Cutaway',
    greatwall: 'Winding Ridge',
    machu: 'Terrace Island',
    petra: 'Canyon Reveal',
    taj: 'Lotus Court'
  };
  const designCrop = document.getElementById('dialog-design-crop');
  const designImage = document.getElementById('dialog-design-image');
  const designName = document.getElementById('dialog-design-name');
  const field = document.querySelector('.wonder-field');
  const scene = document.querySelector('.sky-stage');
  const dialog = document.getElementById('wonder-dialog');
  const closeButton = document.getElementById('dialog-close');
  const toggle = document.getElementById('motion-toggle');
  const chooseWonder = document.getElementById('choose-wonder');
  const selectionStatus = document.getElementById('selection-status');
  if (!field || !scene || !dialog || !closeButton) return;
  const wonders = [...field.querySelectorAll('.wonder')].filter(el => settings[el.id]);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionOverride = null;
  let elapsed = 0;
  let lastTime = null;
  let keyboardNavigation = false;
  let opener = null;
  const motionEnabled = () => motionOverride ?? !reducedMotion.matches;

  function updateMotionState() {
    scene.dataset.motion = motionEnabled() ? 'playing' : 'paused';
    scene.dataset.interactionPaused = String(dialog.open || keyboardNavigation);
    if (toggle) {
      toggle.hidden = false;
      toggle.textContent = motionEnabled() ? 'Pause animation' : 'Play animation';
    }
  }
  // Respect the system by default; Play is an explicit, reversible opt-in.
  toggle?.addEventListener('click', () => {
    motionOverride = !motionEnabled();
    updateMotionState();
  });
  chooseWonder?.addEventListener('click', () => {
    motionOverride = false;
    updateMotionState();
    if (selectionStatus) selectionStatus.textContent = 'The wonders are paused. Choose a landmark to view its charm.';
    const visibleWonders = wonders.filter(el => !el.disabled);
    // Position first, then scroll the scene rather than its clipped interior.
    visibleWonders.forEach((el, index) => stillLayout(el, index, visibleWonders.length, field.clientWidth, field.clientHeight));
    scene.scrollIntoView({ block: 'start', behavior: 'auto' });
    visibleWonders[0]?.focus({ preventScroll: true });
  });
  const preferenceChanged = () => {
    motionOverride = null;
    updateMotionState();
  };
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', preferenceChanged);
  else reducedMotion.addListener(preferenceChanged);

  wonders.forEach(el => {
    const img = el.querySelector('img');
    if (img) {
      const hideFailedImage = () => { el.disabled = true; };
      img.addEventListener('error', hideFailedImage);
      if (img.complete && img.naturalWidth === 0) hideFailedImage();
    }
    el.addEventListener('focus', () => {
      keyboardNavigation = el.matches(':focus-visible');
      updateMotionState();
    });
    el.addEventListener('blur', () => {
      keyboardNavigation = false;
      updateMotionState();
    });
    el.addEventListener('click', () => {
      opener = el;
      document.getElementById('dialog-title').textContent = el.dataset.title;
      document.getElementById('dialog-location').textContent = el.dataset.location;
      if (designCrop && designImage && designName) {
        designCrop.dataset.design = el.id;
        designImage.alt = `${el.dataset.title} keychain charm design preview: ${designs[el.id]}.`;
        designName.textContent = designs[el.id];
      }
      if (!dialog.open) dialog.showModal();
      updateMotionState();
    });
  });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    if (opener && document.activeElement !== opener) opener.focus({ preventScroll: true });
    keyboardNavigation = Boolean(opener?.matches(':focus-visible'));
    updateMotionState();
  });
  document.addEventListener('visibilitychange', () => { lastTime = null; });

  function stillLayout(el, index, count, width, height) {
    // Do not freeze the animated entrance positions offscreen.
    const gap = 12, top = 64, bottom = 96, rows = Math.ceil(count / 2);
    const cellWidth = Math.max(1, (width - gap * 3) / 2);
    const cellHeight = Math.max(1, (height - top - bottom - gap * (rows - 1)) / rows);
    const elWidth = el.offsetWidth || 200;
    const elHeight = el.offsetHeight || elWidth * 2 / 3;
    const scale = Math.min(1, cellWidth / elWidth, cellHeight / elHeight);
    const lastSingle = count % 2 === 1 && index === count - 1;
    const cellX = lastSingle ? (width - cellWidth) / 2 : gap + (index % 2) * (cellWidth + gap);
    const x = cellX + (cellWidth - elWidth * scale) / 2;
    const y = top + Math.floor(index / 2) * (cellHeight + gap) +
      (cellHeight - elHeight * scale) / 2 - el.offsetTop;
    el.style.transformOrigin = 'top left';
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }

  function animate(now) {
    const dt = lastTime === null ? 0 : Math.min(Math.max(now - lastTime, 0), 100);
    lastTime = now;
    const still = !motionEnabled() || keyboardNavigation;
    if (!still && !dialog.open && !document.hidden) elapsed += dt;
    if (!dialog.open) {
      const width = field.clientWidth, height = field.clientHeight;
      const visibleWonders = wonders.filter(el => !el.disabled);
      visibleWonders.forEach((el, index) => {
        if (still) {
          stillLayout(el, index, visibleWonders.length, width, height);
          return;
        }
        const s = settings[el.id], elWidth = el.offsetWidth || 200;
        const cycle = (elapsed / s.duration + s.start) % 1;
        const x = -elWidth - 40 + (width + elWidth + 80) * cycle;
        const y = Math.sin(elapsed * .001 + s.phase) * s.bob;
        const rotation = Math.sin(elapsed * .00065 + s.phase) * .8;
        const scale = 1 + Math.sin(elapsed * .00045 + s.phase) * .012;
        el.style.transformOrigin = 'center';
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
      });
    }
    requestAnimationFrame(animate);
  }
  updateMotionState();
  requestAnimationFrame(animate);
})();
