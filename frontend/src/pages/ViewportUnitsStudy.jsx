import { useState, useEffect } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function ViewportUnitsStudy() {
  const [showAddressBar, setShowAddressBar] = useState(true);

  return (
    <div className="page-container">
      <PageHeader
        title="Modern Viewport Units"
        subtitle="모바일 브라우저의 전설적인 '주소창 문제'와 svh, lvh, dvh 완벽 가이드"
      />

      {/* 섹션 1: vh의 한계와 모바일 주소창 트러블 */}
      <CollapsibleSection title="🚨 100vh의 배신: 모바일 주소창 문제">
        <div className="section-description">
          <p>
            과거에는 <code>100vh</code>가 "화면 높이의 100%"를 의미한다고 믿었습니다. 하지만 모바일 브라우저(Safari, Chrome)에서 실제로는 <strong>주소창(Address Bar) 영역을 고려하지 않고</strong> 높이를 계산합니다.
          </p>
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1.2rem', 
            background: '#fff1f2', 
            borderRadius: '12px', 
            border: '1px solid #fecdd3',
            color: '#9f1239'
          }}>
            <strong>⚠️ 발생하는 문제:</strong><br />
            하단에 딱 붙어 있어야 할 버튼이 주소창에 가려지거나, 전체 화면 레이아웃에서 원치 않는 스크롤이 발생합니다.
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: 현대적인 해결책 (svh, lvh, dvh) */}
      <CollapsibleSection title="✨ 현대적인 해결책: svh, lvh, dvh">
        <div className="section-description">
          <p>2022년 말부터 모든 주요 브라우저에서 사용할 수 있게 된 새로운 단위들입니다.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#0f172a' }}>📏 svh (Small Viewport Height)</h4>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                주소창이 <strong>확장되어 있을 때</strong>(가장 작은 화면 상태) 기준입니다.<br />
                안전하게 요소를 다 보여주고 싶을 때 최적입니다.
              </p>
            </div>
            <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#0f172a' }}>📏 lvh (Large Viewport Height)</h4>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>
                주소창이 <strong>축소되어 있을 때</strong>(가장 큰 화면 상태) 기준입니다.<br />
                기존의 <code>100vh</code>와 거의 동일하게 작동합니다.
              </p>
            </div>
            <div style={{ padding: '1.2rem', background: '#ecfeff', borderRadius: '12px', border: '1px solid #06b6d4', fontWeight: 'bold' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>🔥 dvh (Dynamic Viewport Height)</h4>
              <p style={{ fontSize: '0.9rem', color: '#0e7490' }}>
                주소창 상태에 따라 <strong>실시간으로 변하는</strong> 동적인 단위입니다.<br />
                사용자의 스크롤에 맞춰 높이가 부드럽게 재계산됩니다.
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 3: 시각적 시뮬레이션 */}
      <CollapsibleSection title="📱 모바일 뷰포트 시뮬레이션 (Click to Toggle)">
        <div className="section-description text-center">
          <p>아래 시뮬레이터에서 주소창 유무에 따른 단위별 높이 변화를 관찰해보세요.</p>
          <button 
            onClick={() => setShowAddressBar(!showAddressBar)}
            style={{
              padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              background: '#3b82f6', color: 'white', fontWeight: 'bold', marginBottom: '1.5rem'
            }}
          >
            {showAddressBar ? '주소창 숨기기 (스크롤 다운)' : '주소창 보이기 (스크롤 업)'}
          </button>

          <div style={{ 
            display: 'flex', justifyContent: 'center', gap: '20px', 
            height: '500px', background: '#1e293b', padding: '40px', borderRadius: '24px' 
          }}>
            {/* 시뮬레이션 기기 */}
            <div style={{ 
              width: '280px', height: '100%', background: '#fff', borderRadius: '20px', 
              position: 'relative', overflow: 'hidden', border: '8px solid #334155'
            }}>
              {/* 주소창 */}
              <div style={{ 
                height: showAddressBar ? '60px' : '0', 
                background: '#f1f5f9', borderBottom: showAddressBar ? '1px solid #cbd5e1' : 'none',
                transition: 'height 0.4s ease', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'
              }}>
                browser.url/study
              </div>

              {/* 콘텐츠 영역 */}
              <div style={{ height: '100%', position: 'relative' }}>
                {/* 100vh 박스 - 주소창이 있으면 밖으로 나감 */}
                <div style={{ 
                  position: 'absolute', top: 0, left: '5%', width: '25%', 
                  height: '100%', background: 'rgba(239, 68, 68, 0.3)',
                  border: '2px solid #ef4444', color: '#ef4444', fontSize: '0.6rem', padding: '5px'
                }}>
                  100vh (고정)
                </div>

                {/* dvh 박스 - 주소창 크기에 맞춰 자동 조절 */}
                <div style={{ 
                  position: 'absolute', top: 0, left: '37.5%', width: '25%', 
                  height: showAddressBar ? 'calc(100% - 60px)' : '100%', 
                  background: 'rgba(16, 185, 129, 0.3)',
                  border: '2px solid #10b981', color: '#10b981', fontSize: '0.6rem', padding: '5px',
                  transition: 'height 0.4s ease'
                }}>
                  100dvh (유동)
                </div>

                {/* svh 박스 - 주소창이 항상 있을 때 기준 */}
                <div style={{ 
                  position: 'absolute', top: 0, left: '70%', width: '25%', 
                  height: 'calc(100% - 60px)', 
                  background: 'rgba(59, 130, 246, 0.3)',
                  border: '2px solid #3b82f6', color: '#3b82f6', fontSize: '0.6rem', padding: '5px'
                }}>
                  100svh (최소)
                </div>
              </div>
            </div>

            {/* 설명 패널 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white', textAlign: 'left', width: '300px' }}>
              <div style={{ marginBottom: '1rem', borderLeft: '4px solid #ef4444', paddingLeft: '1rem' }}>
                <strong>vh (Red)</strong>: 주소창이 나타나면 화면 아래로 박스가 뚫고 나갑니다. (스크롤 발생 원인)
              </div>
              <div style={{ marginBottom: '1rem', borderLeft: '4px solid #10b981', paddingLeft: '1rem' }}>
                <strong>dvh (Green)</strong>: 주소창 변화에 실시간으로 반응하여 항상 화면에 꽉 찹니다.
              </div>
              <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
                <strong>svh (Blue)</strong>: 주소창 유무와 관계없이 가장 보수적인(작은) 화면을 기준으로 고정됩니다.
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 4: 실전 코드 실습 */}
      <CollapsibleSection title="🛠️ 실무 활용: 하단 고정 바 & 중앙 정렬">
        <div className="section-description">
          <p>모바일 앱 스타일의 UI 구현 시 <code>dvh</code>를 사용하는 가장 흔한 패턴들입니다.</p>
        </div>

        <LiveCodeEditor
          scopeId="modern-viewport-demo"
          previewHeight="450px"
          codeHeight="450px"
          initialCss={`.mobile-screen {
  width: 100%;
  height: 400px; /* 시뮬레이션용 고정 높이 */
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
}

.hero-section {
  /* 실제 모바일이라면 100dvh 사용 */
  height: 100%; 
  background: linear-gradient(135deg, #6366f1, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
}

.bottom-bar {
  /* 모바일 하단 탭바: dvh를 쓰면 주소창 위로 딱 붙음 */
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  color: #6366f1;
}

.title { font-size: 1.5rem; margin-bottom: 0.5rem; }
.desc { font-size: 0.9rem; opacity: 0.9; }
`}
          initialHtml={`<div class="mobile-screen">
  <div class="hero-section">
    <div>
      <h2 class="title">Modern App UI</h2>
      <p class="desc">100dvh를 사용하여 메인 화면을 채우면<br/>주소창에 가려지지 않는 경험을 제공합니다.</p>
    </div>
  </div>
  
  <div class="bottom-bar">
    <span>Home</span>
    <span>Search</span>
    <span>Profile</span>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #e0f2fe; border-radius: 8px; font-size: 0.9rem; color: #0369a1;">
  <strong>💡 실무 팁:</strong><br/>
  대부분의 풀스크린 작업에는 <code>dvh</code>가 가장 직관적이지만, 너무 잦은 레이아웃 리플로우(Reflow)가 걱정된다면 <code>svh</code>를 사용하는 것도 좋은 전략입니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: 주소창을 실제로 숨기는 방법 */}
      <CollapsibleSection title="🎯 Q&A: 주소창을 완전히 없애는 방법은?">
        <div className="section-description">
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#0f172a', marginTop: 0 }}>1️⃣ 자동 스크롤로 주소창 숨기기 (기본 동작)</h4>
            <p>
              모바일 브라우저(Safari, Chrome)는 사용자가 <strong>아래로 스크롤</strong>하면 주소창을 자동으로 숨깁니다. 
              이때 화면이 더 넓어지면서 <code>dvh</code>와 <code>lvh</code> 단위가 반응합니다.
            </p>
            <div style={{ 
              padding: '1rem', background: '#f1f5f9', borderRadius: '8px', 
              border: '1px solid #cbd5e1', fontSize: '0.9rem', marginTop: '1rem'
            }}>
              <strong>📌 작동 원리:</strong><br />
              • 페이지를 처음 열면 주소창이 보입니다 (Small Viewport).<br />
              • 스크롤을 조금만 내리면 주소창이 위로 올라가며 숨겨집니다 (Large Viewport).<br />
              • 위로 스크롤하면 다시 주소창이 나타납니다.<br />
              → 이 동작은 <strong>브라우저가 자동으로</strong> 처리하며, CSS나 JavaScript로 강제할 수 없습니다.
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#0f172a' }}>2️⃣ PWA (앱처럼 완전히 주소창 없애기)</h4>
            <p>
              모바일에서 "홈 화면에 추가" 후 앱처럼 실행하면 주소창이 <strong>완전히 사라집니다</strong>. 
              이것이 바로 <strong>PWA (Progressive Web App)</strong>의 Standalone 모드입니다.
            </p>
            
            <div style={{ 
              padding: '1.2rem', background: '#ecfeff', borderRadius: '12px', 
              border: '1px solid #06b6d4', marginTop: '1rem'
            }}>
              <strong style={{ color: '#0891b2' }}>✅ 필수 설정: manifest.json</strong>
              <pre style={{ 
                background: '#0f172a', color: '#e2e8f0', padding: '1rem', 
                borderRadius: '8px', overflow: 'auto', marginTop: '0.5rem', fontSize: '0.85rem'
              }}>
{`{
  "name": "My App",
  "short_name": "App",
  "display": "standalone",  // 🔥 핵심!
  "start_url": "/",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}`}
              </pre>
              <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#0e7490' }}>
                <code>display: "standalone"</code>를 설정하면 홈 화면에서 실행 시 주소창과 브라우저 UI가 모두 사라집니다.
              </p>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#0f172a' }}>3️⃣ Standalone 모드 감지하기 (CSS)</h4>
            <p>앱 모드인지 웹 모드인지를 CSS로 구분하여 스타일을 달리 적용할 수 있습니다.</p>
            <pre style={{ 
              background: '#0f172a', color: '#e2e8f0', padding: '1rem', 
              borderRadius: '8px', overflow: 'auto', marginTop: '0.5rem', fontSize: '0.85rem'
            }}>
{`/* 일반 브라우저 모드 */
.header {
  height: 60px;
}

/* PWA 앱 모드 (주소창 없음) */
@media (display-mode: standalone) {
  .header {
    height: 80px; /* 더 넓게 사용 가능 */
    padding-top: 20px; /* Safe Area 고려 */
  }
}`}
            </pre>
          </div>

          <div style={{ 
            marginTop: '2rem', padding: '1.2rem', background: '#fef3c7', 
            borderRadius: '12px', border: '1px solid #f59e0b'
          }}>
            <strong style={{ color: '#92400e' }}>💡 요약</strong>
            <ul style={{ marginTop: '0.5rem', color: '#78350f', fontSize: '0.9rem', lineHeight: '1.7' }}>
              <li><strong>웹 브라우저 모드:</strong> 스크롤로 주소창이 숨겨지고 나타나는 것은 브라우저의 기본 동작입니다. <code>dvh</code>가 이 변화를 자동 추적합니다.</li>
              <li><strong>앱 모드 (PWA):</strong> manifest.json의 <code>display: standalone</code> 설정으로 "홈 화면에 추가" 후 완전히 주소창 없는 앱처럼 실행할 수 있습니다.</li>
              <li><strong>감지:</strong> <code>@media (display-mode: standalone)</code>로 앱 모드를 구분할 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

export default ViewportUnitsStudy;
