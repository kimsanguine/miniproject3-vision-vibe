(() => {
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  let active = 'home';
  let rpsTimer = null;
  let rpsRemaining = 5;
  let rpsRequested = false;

  const setStatus = (name, text) => document.querySelector(`[data-status="${name}"]`)?.replaceChildren(text);
  const setRpsCountdown = (text) => document.getElementById('rps-countdown')?.replaceChildren(text);
  const clearRpsTimer = () => {
    if (rpsTimer !== null) window.clearInterval(rpsTimer);
    rpsTimer = null;
    rpsRemaining = 5;
  };
  const playRpsRound = () => {
    if (typeof window.playRpsRound !== 'function') return setStatus('rps', '판정 기능을 준비하는 중입니다.');
    window.playRpsRound();
  };
  const beginRpsTimer = () => {
    if (!rpsRequested || rpsTimer !== null) return;
    rpsRemaining = 5;
    setRpsCountdown(`다음 자동 판정까지 ${rpsRemaining}초`);
    rpsTimer = window.setInterval(() => {
      rpsRemaining -= 1;
      if (rpsRemaining > 0) return setRpsCountdown(`다음 자동 판정까지 ${rpsRemaining}초`);
      playRpsRound();
      rpsRemaining = 5;
      setRpsCountdown(`자동 판정 완료, 다음 판까지 ${rpsRemaining}초`);
    }, 1000);
  };
  const startRps = () => {
    rpsRequested = true;
    setRpsCountdown('카메라와 손 모양을 확인하는 중...');
    window.startRps?.();
  };
  const stopRps = () => {
    rpsRequested = false;
    clearRpsTimer();
    setRpsCountdown('자동 판정이 멈췄습니다.');
    window.stopRps?.();
  };
  const stops = {
    hand: () => { window.stopHandOnly?.(); window.stopHandFace?.(); },
    rps: stopRps,
    object: () => window.stopObjectOnly?.(),
    magic: () => window.stopMagicWand?.(),
    scan: () => window.stopDocScanner?.(),
  };
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
    if (action === 'startRps') return startRps();
    if (action === 'stopRps') return stopRps();
    if (action === 'playRpsRound') { playRpsRound(); if (rpsTimer !== null) { rpsRemaining = 5; setRpsCountdown(`수동 판정 완료, 다음 자동 판정까지 ${rpsRemaining}초`); } return; }
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
  Object.entries(statusEvents).forEach(([eventName, name]) => window.addEventListener(eventName, (event) => {
    const status = event.detail?.status || '상태를 확인할 수 없습니다.';
    setStatus(name, status);
    if (eventName === 'rpsStatus' && status.startsWith('인식 중')) beginRpsTimer();
  }));
  window.addEventListener('rpsRoundResult', (event) => {
    const { player, ai, result } = event.detail || {};
    document.getElementById('rps-round-result')?.replaceChildren(`이번 판: 나 ${player || '인식 안 됨'}, AI ${ai || '-'}, ${result || '판정불가'}`);
    const key = { 승리: 'wins', 패배: 'losses', 무승부: 'draws' }[result];
    if (!key) return;
    const node = document.getElementById(`rps-${key}`);
    node.textContent = String(Number(node.textContent) + 1);
  });
  window.addEventListener('hashchange', () => activate(location.hash.slice(1), false));
  activate(location.hash.slice(1) || 'home', false);
})();
