import { useState } from 'react';
// 탭 컴포넌트
// 재사용성 높은 컴포넌트
// 1. props로 탭 데이터 전달 <Tabs tabs={tabs} /> label / content / id 전부 외부에서 주입
// 2. content에 JSX를 직접 넣을 수 있음. Tabs는 UI 틀만 담당. 컨텐츠 자유도 올라감. 실무에서 “레이아웃 컴포넌트” 설계 방식
// 3. 상태 관리 useState로 활성 탭 관리
// 4. 키보드 이벤트 핸들러
// 5. 접근성 표준
// 6. 불필요한 렌더링 방지
function Tabs({ tabs }) {
  // 상태 관리
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 0);

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e, tabId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // 기본 동작 방지. 하지 않으면 enter 키를 눌러도 탭이 변경되지 않음
      setActiveTab(tabId); // 활성 탭 업데이트
    }
  };

  // 접근성 표준 속성이 포함된 탭 컴포넌트
  return (
    <div className="tabs-container">
      {/* 탭 헤더 */}
      <div className="tabs-header" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} // 활성 탭 스타일
            onClick={() => setActiveTab(tab.id)} // 탭 클릭 핸들러
            onKeyDown={(e) => handleKeyDown(e, tab.id)} // 키보드 이벤트 핸들러
            role="tab" // 접근성 표준
            aria-selected={activeTab === tab.id} // 선택된 탭 여부
            aria-controls={`panel-${tab.id}`} // 컨텐츠 영역 ID
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* 탭 컨텐츠 */}
      <div className="tabs-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`} // 컨텐츠 영역 ID
            className={`tab-panel ${activeTab === tab.id ? 'active' : ''}`} // 활성 탭 스타일
            role="tabpanel" // 접근성 표준
            aria-labelledby={`tab-${tab.id}`} // 탭 버튼 ID
          >
            {/* 활성 탭의 컨텐츠. 활성 탭만 DOM에 렌더링됨. 불필요한 렌더링 방지 {activeTab === tab.id ? tab.content : null} 와 동일 {tab.content} 이렇게 하면 랜더링되어서 화면에 없어도 랜더링되어 메모리점유 불필요한 작업일어남 */}
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
