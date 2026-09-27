# VISION VIBE Static Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Flutter 런타임 없이 현재 비전 체험을 정적 웹앱으로 제공한다.

**Architecture:** `index.html`이 화면 구조와 기존 캔버스를 소유한다. `styles/app.css`는 반응형 UI를 제공하고 `js/app.js`는 탭과 기존 전역 비전 함수를 연결한다. MediaPipe와 OpenCV는 사용자가 시작할 때만 로드한다.

**Tech Stack:** HTML, CSS, vanilla JavaScript, MediaPipe Tasks Vision, OpenCV.js, GitHub Pages.

## Global Constraints

- `lecture/`와 `src/`는 수정하지 않는다.
- 첫 화면에 Flutter, CanvasKit, 정적 MediaPipe/OpenCV 스크립트를 추가하지 않는다.
- 탭 이동 시 이전 카메라를 stop 한다.
- `prefers-reduced-motion`을 존중한다.

---

### Task 1: 정적 앱 셸

**Files:**
- Modify: `index.html`
- Create: `styles/app.css`

**Produces:** 키보드로 조작 가능한 탭 버튼과 `data-panel` 화면 패널.

- [ ] 홈, 여섯 체험, 재활용 안내의 DOM 구조를 만든다.
- [ ] 기존 캔버스와 video id를 유지해 비전 엔진 계약을 보존한다.
- [ ] Flutter bootstrap, manifest, Flutter 서비스 워커 참조를 제거한다.
- [ ] 작은 화면에서 카드와 카메라 캔버스가 가로 폭을 넘지 않는 CSS를 작성한다.

### Task 2: 탭과 비전 엔진 연결

**Files:**
- Create: `js/app.js`

**Produces:** `activateTab(tabName)`와 각 status event를 화면에 반영하는 이벤트 연결.

- [ ] 탭 클릭과 URL hash로 활성 패널을 바꾼다.
- [ ] 탭 이동 전에 이전 기능의 stop 함수를 호출한다.
- [ ] 시작, 중지, 손 모드, RPS 판정, Magic Wand 액션, 문서 스캔 버튼을 기존 window 함수에 연결한다.
- [ ] 각 비전 status CustomEvent를 해당 패널 상태에 표시한다.

### Task 3: 검증과 배포

**Files:**
- Modify: `README.md`

**Produces:** Flutter가 없는 GitHub Pages 정적 앱 배포본.

- [ ] HTML과 JavaScript 문법을 검사한다.
- [ ] 로컬 정적 서버에서 첫 화면과 탭 DOM을 검사한다.
- [ ] Flutter 산출물과 CanvasKit을 제거하고 변경 파일만 커밋한다.
- [ ] GitHub Pages 푸시 후 라이브 페이지에서 UI와 콘솔을 확인한다.
