# 🏗️ CSS Masterclass 프로젝트 구축 가이드 (A to Z)

이 문서는 빈 폴더에서 시작하여 현재의 **CSS Masterclass** 프로젝트를 완성하기까지의 기술 설계를 기록합니다.

---

## 1. 아키텍처 개요

- **Frontend**: Vite + React기반 SPA. 샌드박스형 라이브 에디터를 통해 CSS/HTML을 동적으로 렌더링.
- **Backend**: Express 서버. SQLite 데이터베이스를 통해 동적인 계층형 메뉴 시스템 관리.
- **Editor Core**: 상위 컨트롤러(UI)와 하위 에디터(Code) 간의 양방향 상태 동기화 및 0-Side Effect 샌드박스 프리뷰.

---

## 2. 프로젝트 초기화 (Step by Step)

### Step 1: Frontend 구축 (Vite)
```bash
npm create vite@latest frontend -- --template react
cd frontend && npm install react-router-dom
```

### Step 2: Backend 구축 (Express + DB)
```bash
mkdir backend && cd backend
npm init -y
npm install express sqlite3 cors
npm install -D nodemon
```
- `backend/package.json`에 `"type": "module"` 추가 필수.

---

## 3. 디렉토리 구조 (Definitive)

```
cssStudy/
├── frontend/
│   ├── src/
│   │   ├── components/      # LiveCodeEditor, CssPropertyControls 등 핵심 엔진
│   │   ├── pages/           # 20개의 학습 모듈 (.jsx)
│   │   ├── styles/          # 디자인 시스템 관리 (main.css, components.css 등)
│   │   └── App.jsx          # 중앙 집중식 라우팅 및 테마 관리
├── backend/
│   ├── src/
│   │   ├── db/              # SQLite3 연결 설정
│   │   └── server.js        # API 및 동적 메뉴 서빙
│   ├── scripts/             # 데이터베이스 관리 (resetMenus.js, initDb.js)
│   └── database/            # SQLite 바이너리 파일
├── SQLITE_GUIDE.md          # DB 운영 지침
└── README.md / GUIDE_*.md   # 사용자 매뉴얼
```

---

## 4. 데이터베이스 및 메뉴 시스템

### 메뉴 계층 설계
초기 고정형에서 **SQLite 연동 동적 메뉴**로 고도화되었습니다.
- **Table**: `menus` (id, title, path, parent_id, order_index, icon)
- **Reset Script**: `backend/scripts/resetMenus.js`는 현재 26개의 메뉴 항목(5그룹 + 21페이지)을 일관성 있게 관리합니다.

---

## 5. 핵심 엔진: LiveCodeEditor (샌드박스 원리)

1. **상태 관리**: `HtmlTab`과 `CssTab`의 내용을 각각 상태(State)로 관리.
2. **동적 주입**: 
   - 사용자가 `Apply` 버튼 클릭 시 작성된 코드를 상위 컴포넌트로 전달.
   - Preview 영역 내의 `<style>` 태그에 CSS 주입.
   - `dangerouslySetInnerHTML`을 통해 HTML 실시간 렌더링.
3. **Viewport 시뮬레이션**: `.preview-viewport` 컨테이너를 통해 `fixed`, `sticky` 포지션이 에디터 영역 내에서만 작동하도록 격리.

---

## 6. 개발 및 실행 가이드

1. **초기 설치**: 루트에서 `npm i` (각 폴더별).
2. **DB 리셋**: `cd backend && node scripts/resetMenus.js` 실행.
3. **병렬 실행**:
   - Backend: `npm run dev` (3000포트)
   - Frontend: `npm run dev` (5173포트)

---
최종 업데이트: 2026-01-19 (커리큘럼 100% 완성 버전)
