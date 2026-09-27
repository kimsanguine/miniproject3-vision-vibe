# VISION VIBE

**라이브 데모**: https://kimsanguine.github.io/miniproject3-vision-vibe/

브라우저에서 MediaPipe와 OpenCV로 손 인식, 가위바위보, 사물 인식, 마법 지팡이, 문서 스캔을 체험하는 정적 웹앱입니다.

## 동작 방식

첫 화면은 HTML, CSS, JavaScript만 렌더링합니다. 카메라 권한, MediaPipe 모델, OpenCV.js는 해당 체험 화면에서 사용자가 `시작`을 눌렀을 때만 불러옵니다. 영상은 브라우저 안에서 처리합니다.

## 저장소 구성

| 폴더/파일 | 용도 |
|---|---|
| `index.html`, `styles/app.css`, `js/app.js` | 정적 웹앱의 화면과 탭 전환 |
| `js/magic_wand.js`, `js/doc_scanner.js` | 마법 지팡이와 문서 스캔 엔진 |
| `assets/assets/images/vision-hero.png` | 홈 화면 일러스트 |
| `lecture/` | 강의용 Jupyter 노트북, PDF, 참고 이미지. 웹앱과 무관 |
| `src/` | 강의 실습 원본 소스. 웹앱과 무관 |

GitHub Pages는 저장소 루트의 정적 파일을 제공합니다.
