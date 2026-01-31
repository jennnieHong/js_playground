# CSS Study Project

CSS 개념(Flexbox, Grid, Animation, Position 등)을 인터랙티브하게 학습할 수 있는 웹 애플리케이션입니다. React 프론트엔드와 Node.js 백엔드로 구성되어 있습니다.

## 🚀 주요 기능 (Key Features)

- **Live Code Editor**: CSS와 HTML을 직접 수정하고 실시간으로 결과를 확인할 수 있는 에디터
- **Interactive Controls**: 라디오 버튼, 드롭다운 등으로 CSS 속성값을 변경하여 즉각적인 변화 확인
- **Study Modules**:
  - **Flexbox**: 주축/교차축 정렬, 방향 등
  - **Grid**: 그리드 템플릿, 간격, 영역 배치 등
  - **Animation**: Transition, Keyframes, 변형(Rotate/Scale/Fade)
  - **Position**: Static, Relative, Absolute, Fixed 및 부모-자식 관계 시각화
  - **CSS Architecture & Variables**: BEM, OOCSS, CSS 변수 등 고급/구조적 개념

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express, SQLite (sqlite3)
- **Database**: SQLite (메뉴 구조 및 메타데이터 저장)

## 📦 설치 및 실행 (Installation & Run)

이 프로젝트는 `backend`와 `frontend`가 분리되어 있습니다. 각각의 터미널에서 실행해야 합니다.

### 1. 사전 준비 (Prerequisites)
- [Node.js](https://nodejs.org/) (v16 이상 권장)

### 2. 의존성 설치 (Install Dependencies)

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. 데이터베이스 초기화 (Initialize Database)
최초 실행 시 데이터베이스 파일이 필요합니다.

```bash
cd backend
node scripts/initDb.js
# Position 메뉴가 보이지 않는다면 추가 스크립트 실행
nav node scripts/addPositionMenu.js 
```

### 4. 개발 서버 실행 (Run Development Servers)

**Backend (Port: 3000):**
```bash
cd backend
npm run dev
```

**Frontend (Port: 5173):**
```bash
cd frontend
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 📚 문서 (Documentation)

자세한 사용 가이드는 다음 파일들을 참고하세요:
- [GUIDE_KR.md](./GUIDE_KR.md) (한국어 가이드)
- [GUIDE_EN.md](./GUIDE_EN.md) (English Guide)
- [project_init.md](./project_init.md) (프로젝트 생성/구조 설명 A to Z)

---
Created by CSS Study Team.
