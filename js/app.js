(() => {
  const stops = { hand: () => { window.stopHandOnly?.(); window.stopHandFace?.(); }, rps: () => window.stopRps?.(), object: () => window.stopObjectOnly?.(), magic: () => window.stopMagicWand?.(), scan: () => window.stopDocScanner?.() };
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  let active = 'home';
  const setStatus = (name, text) => document.querySelector(`[data-status="${name}"]`)?.replaceChildren(text);
  const activate = (name, updateHash = true) => {
    if (!panels.some((panel) => panel.dataset.panel === name)) name = 'home';
    if (name !== active) stops[active]?.();
    active = name;
    tabs.forEach((button) => button.setAttribute('aria-selected', String(button.dataset.tab === name)));
    panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== name; });
    if (updateHash) history.replaceState(null, '', `#${name}`);
    document.querySelector('.app-shell')?.scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  tabs.forEach((button) => button.addEventListener('click', () => activate(button.dataset.tab)));
  document.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => activate(button.dataset.go)));
  document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'stopHand') return stops.hand();
    const fn = window[action];
    if (typeof fn !== 'function') return setStatus(active, '기능 준비 중입니다. 잠시 후 다시 눌러주세요.');
    try { fn(); } catch (error) { setStatus(active, `오류: ${error.message || error}`); }
  }));
  document.querySelectorAll('[data-hand-mode]').forEach((button) => button.addEventListener('click', () => {
    const face = button.dataset.handMode === 'face';
    stops.hand();
    document.querySelector('[data-hand-mode="only"]').classList.toggle('active', !face);
    document.querySelector('[data-hand-mode="face"]').classList.toggle('active', face);
    document.getElementById('mp-root-hand').hidden = face;
    document.getElementById('mp-root-handface').hidden = !face;
    setStatus('hand', '대기 중');
    document.querySelector('[data-action="startHandOnly"]').dataset.action = face ? 'startHandFace' : 'startHandOnly';
  }));
  const statusEvents = { handOnlyStatus: 'hand', handFaceStatus: 'hand', rpsStatus: 'rps', objectOnlyStatus: 'object', magicWandStatus: 'magic', docScannerStatus: 'scan' };
  Object.entries(statusEvents).forEach(([eventName, name]) => window.addEventListener(eventName, (event) => setStatus(name, event.detail?.status || '상태를 확인할 수 없습니다.')));
  window.addEventListener('rpsRoundResult', (event) => { const key = { 승리: 'wins', 패배: 'losses', 무승부: 'draws' }[event.detail?.result]; if (!key) return; const node = document.getElementById(`rps-${key}`); node.textContent = String(Number(node.textContent) + 1); });
  window.addEventListener('hashchange', () => activate(location.hash.slice(1), false));
  activate(location.hash.slice(1) || 'home', false);
})();
