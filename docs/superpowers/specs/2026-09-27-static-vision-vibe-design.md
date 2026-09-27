# VISION VIBE 정적 웹앱 전환 설계

## 목표
Flutter Web 런타임을 제거하고, 현재 VISION VIBE의 홈과 6개 체험을 HTML, CSS, JavaScript로 제공한다. 첫 화면은 비전 모델, OpenCV, 카메라를 요청하지 않는다.

## 경계
기존 MediaPipe, Magic Wand, 문서 스캔 JavaScript와 모델 URL은 유지한다. 강의 자료와 `src/`는 수정하지 않는다. UI는 현재 어두운 VISION VIBE 디자인과 기능 이름을 보존한다.

## 구조
`index.html`은 접근 가능한 탭 버튼과 각 패널의 캔버스 컨테이너를 제공한다. `js/app.js`는 탭 전환, 상태 메시지, 카메라 정지, 손 모드 전환, RPS 점수판, 액션 버튼을 담당한다. `styles/app.css`는 반응형 레이아웃과 시각 스타일만 담당한다.

탭 변경 때 `app.js`는 이전 탭의 전역 stop 함수를 호출한다. MediaPipe와 OpenCV는 이미 각 시작 함수 안에서 지연 로드되며 이 특성을 유지한다.

## 성공 기준
- 홈 HTML에 Flutter bootstrap, `main.dart.js`, CanvasKit 의존성이 없다.
- 첫 화면은 MediaPipe와 OpenCV의 정적 script를 포함하지 않는다.
- 홈, 손 조작, 가위바위보, 사물 인식, 마법 지팡이, 문서 스캔, 재활용 분류 탭이 렌더링된다.
- 탭 이동 시 이전 카메라 스트림의 stop 함수가 호출된다.
- GitHub Pages 라이브 페이지에서 UI 렌더링과 콘솔 오류 없음을 확인한다.
