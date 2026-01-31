# SQLite 사용 가이드 - CSS Study 프로젝트

## 목차
1. [SQLite 기본 개념](#sqlite-기본-개념)
2. [Node.js에서 SQLite 사용하기](#nodejs에서-sqlite-사용하기)
3. [프로젝트 데이터베이스 구조](#프로젝트-데이터베이스-구조)
4. [일반적인 사용 패턴](#일반적인-사용-패턴)
5. [스크립트 사용법](#스크립트-사용법)
6. [베스트 프랙티스](#베스트-프랙티스)
7. [문제 해결](#문제-해결)

---

## SQLite 기본 개념

### SQLite란?
- **파일 기반** 관계형 데이터베이스
- 서버가 필요 없음 (Serverless)
- 단일 파일로 전체 데이터베이스 저장
- 작은 프로젝트, 개발 환경, 모바일 앱에 적합

### 주요 특징
```
✅ 장점:
- 설치/설정 불필요
- 빠른 읽기 성능
- 트랜잭션 지원
- 크로스 플랫폼

❌ 단점:
- 대규모 동시 쓰기에 취약
- 네트워크 접근 불가
- 복잡한 권한 관리 부족
```

---

## Node.js에서 SQLite 사용하기

### 1. 라이브러리 설치
```bash
npm install sqlite3
```

### 2. 기본 연결
```javascript
import sqlite3 from 'sqlite3';
import path from 'path';

// 데이터베이스 파일 경로
const dbPath = path.join(__dirname, '../database/cssStudy.db');

// 데이터베이스 연결
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});
```

### 3. 메모리 vs 파일 데이터베이스
```javascript
// 파일 데이터베이스 (영구 저장)
const db = new sqlite3.Database('./mydata.db');

// 메모리 데이터베이스 (임시, 재시작 시 삭제)
const db = new sqlite3.Database(':memory:');
```

---

## 프로젝트 데이터베이스 구조

### 파일 위치
```
backend/
├── database/
│   └── cssStudy.db          # SQLite 데이터베이스 파일
├── scripts/
│   ├── initDb.js            # 초기화 스크립트
│   ├── addFullCurriculum.js # 메뉴 추가 (주의: 중복 가능)
│   └── resetMenus.js        # 메뉴 리셋 (권장)
└── src/
    └── db/
        └── sqlite.js        # DB 연결 관리 모듈
```

### 테이블 구조: `menus`
```sql
CREATE TABLE IF NOT EXISTS menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,           -- 메뉴 제목
  path TEXT,                      -- URL 경로 (null이면 그룹)
  parent_id INTEGER,              -- 부모 메뉴 ID (null이면 최상위)
  order_index INTEGER,            -- 정렬 순서
  icon TEXT,                      -- 아이콘 이모지
  FOREIGN KEY (parent_id) REFERENCES menus(id)
);
```

### 데이터 예시
```
id | title          | path              | parent_id | order_index | icon
---|----------------|-------------------|-----------|-------------|-----
1  | CSS Basics     | null              | null      | 1           | 🎨
2  | Flexbox Study  | /flexbox          | 1         | 1           | 📦
3  | Grid Study     | /grid             | 1         | 2           | ⚡
7  | Advanced Topics| null              | null      | 2           | 🚀
8  | Custom Props   | /custom-properties| 7         | 1           | 🎛️
```

---

## 일반적인 사용 패턴

### 1. 단일 쿼리 실행 (`db.run`)
```javascript
// INSERT, UPDATE, DELETE
db.run('DELETE FROM menus WHERE id = ?', [5], function(err) {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Deleted rows:', this.changes);
    console.log('Last inserted ID:', this.lastID);
  }
});
```

### 2. 단일 행 조회 (`db.get`)
```javascript
// 하나의 결과만 필요할 때
db.get('SELECT * FROM menus WHERE id = ?', [1], (err, row) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Menu:', row.title, row.path);
  }
});
```

### 3. 여러 행 조회 (`db.all`)
```javascript
// 모든 결과가 필요할 때
db.all('SELECT * FROM menus ORDER BY order_index', [], (err, rows) => {
  if (err) {
    console.error('Error:', err);
  } else {
    rows.forEach(row => {
      console.log(`${row.id}: ${row.title}`);
    });
  }
});
```

### 4. Prepared Statement (반복 실행)
```javascript
const stmt = db.prepare('INSERT INTO menus (title, path, icon) VALUES (?, ?, ?)');

const menus = [
  ['Flexbox', '/flexbox', '📦'],
  ['Grid', '/grid', '⚡'],
  ['Animation', '/animation', '🎬']
];

menus.forEach(menu => {
  stmt.run(menu, (err) => {
    if (err) console.error('Error:', err);
  });
});

stmt.finalize(); // 반드시 호출!
```

### 5. 트랜잭션 (`db.serialize`)
```javascript
// 여러 쿼리를 순서대로 실행
db.serialize(() => {
  db.run('DELETE FROM menus');
  db.run('INSERT INTO menus ...');
  db.run('INSERT INTO menus ...');
  // 모두 순차적으로 실행됨
});
```

### 6. 병렬 실행 (`db.parallelize`)
```javascript
// 여러 쿼리를 병렬로 실행 (순서 보장 안됨)
db.parallelize(() => {
  db.run('SELECT * FROM table1');
  db.run('SELECT * FROM table2');
  // 동시에 실행 가능
});
```

---

## 스크립트 사용법

### 1. 초기화: `initDb.js`
**목적:** 테이블 생성 + 초기 데이터 삽입

```bash
node backend/scripts/initDb.js
```

**동작:**
- `menus` 테이블이 없으면 생성
- 기본 메뉴 데이터 삽입 (이미 있으면 스킵)

**코드 구조:**
```javascript
db.run('CREATE TABLE IF NOT EXISTS menus ...', (err) => {
  // 테이블 생성
});

db.get('SELECT COUNT(*) as count FROM menus', (err, row) => {
  if (row.count === 0) {
    // 데이터가 없을 때만 삽입
  }
});
```

### 2. 메뉴 추가: `addFullCurriculum.js`
**⚠️ 주의: 중복 체크 없이 계속 추가됨!**

```bash
node backend/scripts/addFullCurriculum.js
```

**문제점:**
```javascript
// 현재 최대 ID를 찾고
db.get('SELECT MAX(id) as maxId FROM menus', ...)

// 그 다음부터 추가 (중복 체크 없음!)
newMenus.forEach(menu => {
  currentId++;
  stmt.run(menu.title, menu.path, ...); // 계속 추가됨!
});
```

**결과:** 실행할 때마다 메뉴가 중복으로 추가됨!

### 3. 메뉴 리셋: `resetMenus.js` (권장)
**목적:** 기존 메뉴 삭제 후 깨끗하게 재설정

```bash
node backend/scripts/resetMenus.js
```

**동작:**
```javascript
db.serialize(() => {
  // 1. 모든 메뉴 삭제
  db.run('DELETE FROM menus');
  
  // 2. Auto-increment 리셋
  db.run('DELETE FROM sqlite_sequence WHERE name="menus"');
  
  // 3. 모든 메뉴 다시 삽입
  const stmt = db.prepare('INSERT INTO menus ...');
  allMenus.forEach(menu => stmt.run(...));
  stmt.finalize();
});
```

**장점:**
- ✅ 중복 없음
- ✅ 깨끗한 상태로 리셋
- ✅ ID가 1부터 다시 시작

---

## 베스트 프랙티스

### 1. Prepared Statement 사용
**❌ 나쁜 예 (SQL Injection 위험)**
```javascript
const title = userInput;
db.run(`INSERT INTO menus (title) VALUES ('${title}')`);
// 만약 userInput = "'; DROP TABLE menus; --" 이면?
```

**✅ 좋은 예**
```javascript
db.run('INSERT INTO menus (title) VALUES (?)', [userInput]);
// 자동으로 이스케이프 처리됨
```

### 2. 에러 처리
```javascript
db.run('INSERT INTO menus ...', (err) => {
  if (err) {
    console.error('Database error:', err.message);
    return;
  }
  console.log('Success!');
});
```

### 3. 연결 종료
```javascript
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  }
});
```

### 4. 중복 방지
**방법 1: UNIQUE 제약 조건**
```sql
CREATE TABLE menus (
  id INTEGER PRIMARY KEY,
  title TEXT UNIQUE NOT NULL  -- 중복 불가
);
```

**방법 2: INSERT OR IGNORE**
```javascript
db.run('INSERT OR IGNORE INTO menus (title, path) VALUES (?, ?)', 
  [title, path]);
// 이미 있으면 무시
```

**방법 3: INSERT OR REPLACE**
```javascript
db.run('INSERT OR REPLACE INTO menus (id, title, path) VALUES (?, ?, ?)',
  [id, title, path]);
// 이미 있으면 업데이트
```

### 5. 트랜잭션 사용
```javascript
db.serialize(() => {
  db.run('BEGIN TRANSACTION');
  
  try {
    db.run('DELETE FROM menus');
    db.run('INSERT INTO menus ...');
    db.run('COMMIT');
  } catch (err) {
    db.run('ROLLBACK');
  }
});
```

---

## 문제 해결

### 문제 1: 메뉴가 중복으로 보임
**원인:** `addFullCurriculum.js`를 여러 번 실행

**해결:**
```bash
node backend/scripts/resetMenus.js
```

### 문제 2: "database is locked" 에러
**원인:** 여러 프로세스가 동시에 쓰기 시도

**해결:**
```javascript
// 타임아웃 증가
const db = new sqlite3.Database(dbPath);
db.configure('busyTimeout', 5000); // 5초 대기
```

### 문제 3: 메뉴가 화면에 안 보임
**원인:** 
1. 데이터베이스에 메뉴 없음
2. 프론트엔드가 캐시 사용 중

**해결:**
```bash
# 1. 데이터베이스 확인
node backend/scripts/resetMenus.js

# 2. 프론트엔드 재시작
Ctrl+C (npm run dev 중지)
npm run dev (다시 시작)

# 3. 브라우저 새로고침 (F5)
```

### 문제 4: "Cannot find module 'sqlite3'"
**해결:**
```bash
cd backend
npm install sqlite3
```

---

## 실전 예제

### 예제 1: 특정 그룹의 메뉴만 조회
```javascript
db.all(
  'SELECT * FROM menus WHERE parent_id = ? ORDER BY order_index',
  [1],  // CSS Basics 그룹
  (err, rows) => {
    if (err) console.error(err);
    else console.log('Menus:', rows);
  }
);
```

### 예제 2: 메뉴 순서 변경
```javascript
db.run(
  'UPDATE menus SET order_index = ? WHERE id = ?',
  [5, 10],  // ID 10번 메뉴의 순서를 5로 변경
  (err) => {
    if (err) console.error(err);
    else console.log('Order updated');
  }
);
```

### 예제 3: 메뉴와 부모 정보 함께 조회
```javascript
db.all(`
  SELECT 
    m.id, 
    m.title, 
    m.path, 
    p.title as parent_title
  FROM menus m
  LEFT JOIN menus p ON m.parent_id = p.id
  ORDER BY m.parent_id, m.order_index
`, [], (err, rows) => {
  if (err) console.error(err);
  else console.table(rows);
});
```

---

## 요약

### ✅ 올바른 사용법
```bash
# 최초 설정
node backend/scripts/initDb.js

# 메뉴 리셋 (중복 방지)
node backend/scripts/resetMenus.js

# 서버 실행
npm run dev
```

### ❌ 피해야 할 것
- `addFullCurriculum.js`를 반복 실행 (중복 발생!)
- Prepared Statement 없이 사용자 입력 사용
- 에러 처리 없이 쿼리 실행
- `db.close()` 없이 스크립트 종료

### 📚 더 알아보기
- [SQLite 공식 문서](https://www.sqlite.org/docs.html)
- [node-sqlite3 GitHub](https://github.com/TryGhost/node-sqlite3)
- [SQL Tutorial](https://www.w3schools.com/sql/)
