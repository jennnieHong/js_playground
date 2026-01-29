# 📔 CSS Masterclass 사용자 가이드

이 가이드는 **CSS Masterclass** 애플리케이션을 통해 모던 CSS를 효과적으로 학습하는 방법을 설명합니다.

---

## 🎯 학습 목표
단순히 이론을 읽는 것이 아니라, **직접 코드를 수정(Live Edit)**하고 **동적 컨트롤(Interactive Controls)**을 조작하며 각 속성이 레이아웃에 미치는 효과를 시각적으로 이해하는 것입니다.

## 🖥️ 주요 인터페이스 구성

### 1. 네비게이션 트리 (Left Side)
20개 이상의 학습 주제가 5개의 논리적 그룹으로 체계화되어 있습니다.
- **CSS Basics**: 기본 레이아웃 (Flex, Grid, Animation, Responsive, Position)
- **Advanced Topics**: 심화 기술 (Container Queries, z-index, Performance, Selectors)
- **CSS Foundations**: 하부 구조 (Display, Box Model, Logical Properties, Float)
- **Visual & Design**: 시각 요소 (Colors, Typography)
- **Interaction**: 상호작용 (States, Pseudo-classes, Form Styling, A11y)
- **JS Curriculum**: 자바스크립트 핵심 문법 및 고급 기법 (Basics, Objects, Modern JS, Async, DOM)

### 2. 통합 라이브 에디터 (Center)
- **CSS/HTML 탭**: 예제의 스타일과 구조를 자유롭게 편집합니다.
- **Apply 버튼**: 수정한 코드를 화면에 즉시 반영합니다 (단축키: Ctrl/Cmd + S 지원 예정).
- **Reset 버튼**: 언제든지 초기 연습용 코드로 되돌릴 수 있습니다.
- **Preview**: 편집한 내용이 담긴 실시간 샌드박스 영역입니다.

---

## 📚 학습 모듈 가이드 (핵심 포인트)

### 📏 Layout & Foundations
- **Flexbox & Grid**: 1차원/2차원 레이아웃의 정렬과 배치를 마스터합니다.
- **Logical Properties**: `left/right`를 넘어 글로벌 대응이 가능한 논리적 여백 설정을 익힙니다.
- **Box Model (+ aspect-ratio)**: `border-box`의 중요성과 이미지 비율 고정법을 배웁니다.
- **Position**: `relative`, `absolute`의 관계와 `fixed` 포지션 트랩 해결법을 다룹니다.

### 🎨 Visuals & Interaction
- **Typography & Writing Mode**: 시스템 폰트 설계와 세로 쓰기 레이아웃을 학습합니다.
- **Colors & Glassmorphism**: 현대적 디자인 트렌드인 배경 필터와 그라데이션을 실험합니다.
- **Form Styling**: 브라우저 기본 스타일을 제거하고 접근성 있는 커스텀 폼을 만듭니다.
- **Interaction & :has()**: CSS의 게임 체인저인 `:has()` 선택자를 이용한 부모 요소 제어를 경험합니다.

### 🚀 Performance & Advanced
- **Performance & Rendering**: Repaint/Reflow를 줄이는 최적화와 화면 밖 렌더링 스킵(`content-visibility`)을 배웁니다.
- **Container Queries**: 브라우저 크기가 아닌 부모 요소 크기에 반응하는 컴포넌트를 설계합니다.
- **Modern Selectors**: `:is()`, `:where()`를 통해 선택자의 우선순위(Specificity)를 정밀하게 관리합니다.
- **Stacking Context**: 레이어가 꼬이는 원인(z-index)을 완벽히 격파합니다.

### 🟨 JavaScript Curriculum
- **Basics & Logic**: 변수, 데이터 타입(BigInt 포함), 연산자, 루프 등 핵심 논리를 다룹니다.
- **Objects & Data**: 참조 타입의 동작 원리, Map/Set, 스프레드 연산자 등 데이터 구조를 이해합니다.
- **Advanced Mechanics**: 클로저, 프로토타입 상속, 제너레이터, 커링 등 심화 기법을 마스터합니다.
- **Browser & Async**: DOM 조작, 이벤트 시스템, 비동기 처 및 브라우저 스토리지 활용법을 배웁니다.
- **JS + CSS**: 자바스크립트로 CSS 변수와 애니메이션 시점을 정밀하게 제어하는 법을 익힙니다.

---

## ❓ 문제 해결 및 팁

- **화면이 하얗게 나오거나 메뉴가 없나요?**: 
  - 백엔드(`/backend`) 서버가 실행 중인지 확인하세요.
  - `node scripts/resetMenus.js`로 DB를 초기화했는지 확인하세요.
- **코드가 적용이 안 돼요**: 
  - 반드시 `Apply` 버튼을 눌러야 반영됩니다.
- **성능 학습 팁**: 
  - 개발자 도구(F12)의 'Rendering' 탭을 켜고 'Paint flashing'을 확인하며 'Performance' 페이지 예제를 실행해보세요.

---
CSS Masterclass와 함께 실무 수준의 CSS 전문가로 거듭나세요! 🚀
