/**
 * Home 페이지 컴포넌트
 * JavaScript Study 애플리케이션의 메인 랜딩 페이지입니다.
 * 프로젝트 소개, 학습 가이드, 그리고 주요 공용 컴포넌트(Alert, Confirm, SearchPopup)의 데모를 제공합니다.
 */
import { useState } from 'react';
import Tabs from '../components/Tabs';
import Alert from '../components/Alert';
import Confirm from '../components/Confirm';
import SearchPopup from '../components/SearchPopup';
import PageHeader from '../components/PageHeader';

function Home() {
  // --- 상태 관리 (State Management) ---
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowAlert(true);
  };

  /**
   * 탭 구성을 정의하는 배열
   */
  const tabs = [
    {
      id: 1,
      label: '소개',
      content: (
        <div className="content-section">
          <h2>JavaScript Study에 오신 것을 환영합니다!</h2>
          <p>이 웹사이트는 모던 자바스크립트를 체계적으로 학습할 수 있도록 설계되었습니다.</p>
          <ul className="feature-list">
            <li>✨ 라이브 코드 에디터</li>
            <li>📚 핵심 개념 중심 커리큘럼</li>
            <li>🎯 실전 예제와 인터랙티브 예제</li>
            <li>💡 최신 ES6+ 문법 완벽 대응</li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      label: '학습 가이드',
      content: (
        <div className="content-section">
          <h2>학습 가이드</h2>
          <ol className="guide-list">
            <li>
              <strong>JS Basics</strong>
              <p>변수, 데이터 타입, 연산자 및 기분 제어문을 학습합니다.</p>
            </li>
            <li>
              <strong>Core Logic</strong>
              <p>함수, 스코프, 객체 및 배열의 심화 활용 방법을 다룹니다.</p>
            </li>
            <li>
              <strong>Web & Async</strong>
              <p>DOM 조작, 이벤트 핸들링, 비동기 프로그래밍을 마스터합니다.</p>
            </li>
          </ol>
        </div>
      )
    },
    {
      id: 3,
      label: '컴포넌트 데모',
      content: (
        <div className="content-section">
          <h2>UI 컴포넌트 테스트</h2>
          <p>애플리케이션 내에서 공용으로 사용되는 팝업 컴포넌트들입니다:</p>
          <div className="demo-buttons">
            <button className="btn btn-primary" onClick={() => setShowAlert(true)}>
              Alert 열기
            </button>
            <button className="btn btn-secondary" onClick={() => setShowConfirm(true)}>
              Confirm 열기
            </button>
            <button className="btn btn-accent" onClick={() => setShowSearch(true)}>
              Search 열기
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="JavaScript Study"
        subtitle="원리부터 실전까지, JS를 완벽하게 정복하세요"
      />

      {/* 탭 기반 컨텐츠 영역 */}
      <Tabs tabs={tabs} />

      {/* --- 조건부 렌더링 (Modals/Popups) --- */}

      {/* 알림창 (Alert) */}
      {showAlert && (
        <Alert
          message="Alert 컴포넌트가 정상적으로 작동합니다!"
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* 확인창 (Confirm) */}
      {showConfirm && (
        <Confirm
          message="이 작업을 계속하시겠습니까?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* 검색창 (SearchPopup) */}
      {showSearch && (
        <SearchPopup
          onClose={() => setShowSearch(false)}
          onSearch={(result) => console.log('Selected:', result)}
        />
      )}
    </div>
  );
}

export default Home;


