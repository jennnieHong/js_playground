/**
 * PerformanceStudy.jsx
 * CSS 성능 최적화 및 렌더링 파이프라인 실습 페이지
 */
import {  } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';

function PerformanceStudy() {
  return (
    <div className="page-container">
      <PageHeader
        title="Performance & Rendering"
        subtitle="Optimizing CSS for smooth 60FPS experiences"
      />

      {/* 섹션 1: 브라우저 렌더링 파이프라인의 이해 */}
      <section className="study-section">
        <h2 className="section-title">브라우저 렌더링 파이프라인</h2>
        <div className="section-description">
          <p>
            CSS 속성이 변경될 때 브라우저는 세 가지 단계를 거칩니다. 각 단계가 무거울수록 성능이 저하됩니다:
          </p>
          <ol style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            <li><strong>Layout (Reflow)</strong>: 요소의 크기나 위치 계산 (가장 무거움!)</li>
            <li><strong>Paint (Repaint)</strong>: 색상, 그림자 등 픽셀을 채우는 과정</li>
            <li><strong>Composite</strong>: 레이어를 합쳐 화면에 표시 (가장 빠름 - GPU 가속)</li>
          </ol>
        </div>
      </section>

      {/* 섹션 2: 성능을 고려한 애니메이션 속성 선택 (Layout vs Composite) */}
      <section className="study-section">
        <h2 className="section-title">Layout vs Composite 애니메이션</h2>
        <p className="section-description">
          <code>left/top</code> 대신 <code>transform</code>을 사용해야 하는 이유를 확인하세요.
        </p>

        <LiveCodeEditor
          scopeId="rendering-pipeline"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`/* Layout 유발 속성 (비권장 애니메이션) */
.box-layout {
  position: relative;
  left: 0;
  animation: move-layout 2s infinite alternate;
  background: #ef4444;
}

@keyframes move-layout {
  from { left: 0; }
  to { left: 100px; }
}

/* Composite 만 사용 (권장 애니메이션) */
.box-composite {
  transform: translateX(0);
  animation: move-composite 2s infinite alternate;
  background: #10b981;
}

@keyframes move-composite {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}

.box {
  width: 80px;
  height: 80px;
  margin: 1rem 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}`}
          initialHtml={`<div style="background: white; padding: 2rem; border-radius: 8px;">
  <div class="box box-layout">Layout</div>
  <div class="box box-composite">Composite</div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Layout</strong>: Left 값 변경 시 브라우저는 전체 레이아웃을 다시 계산합니다.<br/>
  <strong>Composite</strong>: Transform은 레이아웃 계산 없이 GPU가 위치만 옮깁니다. (부드러움)
</div>`}
        />
      </section>

      {/* 섹션 3: 렌더링 성능의 혁신, content-visibility */}
      <section className="study-section">
        <h2 className="section-title">content-visibility (렌더링 스킵)</h2>
        <p className="section-description">
          화면 밖에 있는 무거운 요소의 렌더링을 완전히 생략하여 초기 로딩 속도를 혁명적으로 개선합니다.
        </p>

        <LiveCodeEditor
          scopeId="content-visibility"
          previewHeight="300px"
          codeHeight="350px"
          initialCss={`.heavy-item {
  /* 화면 밖에 있을 때 렌더링 비용을 거의 0으로 만듬 */
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* 렌더링 전 Placeholder 크기 */
  
  margin-bottom: 2rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.item-header {
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.item-body {
  padding: 1.5rem;
  color: #1e293b;
}`}
          initialHtml={`<div style="max-height: 400px; overflow-y: auto; background: #f8fafc; padding: 1rem; border-radius: 8px;">
  <div class="heavy-item">
    <div class="item-header"></div>
    <div class="item-body">
      <h3>Item 1</h3>
      <p>Scroll down to see more heavy items...</p>
    </div>
  </div>
  
  <div class="heavy-item">
    <div class="item-header"></div>
    <div class="item-body">
      <h3>Item 100 (Deeply Nested)</h3>
      <p>This item is rendered only when needed.</p>
    </div>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>현대 웹의 필수 기술:</strong> 수천 개의 상품 목록이 있는 쇼핑몰 등에서 
  <code>content-visibility: auto</code>는 브라우저 부하를 획기적으로 줄여줍니다.
</div>`}
        />
      </section>

      {/* 섹션 4: 브라우저에 최적화 힌트 제공 (will-change) */}
      <section className="study-section">
        <h2 className="section-title">will-change (GPU 힌트)</h2>
        <p className="section-description">
          애니메이션이 일어날 요소를 브라우저에게 미리 알려 최적화합니다. (주의: 남용 금지!)
        </p>

        <LiveCodeEditor
          scopeId="will-change"
          previewHeight="350px"
          codeHeight="400px"
          initialCss={`.demo-container {
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 3rem;
  border-radius: 8px;
}

.box {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 일반 박스 (will-change 없음) */
.normal-box {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.normal-box:hover {
  transform: scale(1.5) rotate(45deg);
}

/* GPU 가속 박스 (will-change 사용) */
.accelerated-box {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  
  /* 브라우저가 미리 GPU 메모리에 레이어를 준비함 */
  will-change: transform;
}

.accelerated-box:hover {
  transform: scale(1.5) rotate(45deg);
}`}
          initialHtml={`<div class="demo-container">
  <div class="demo">
    <div class="box normal-box">
      <div style="position: relative; width: 100%; height: 100%;">
        <div style="position: absolute; top: 10px; right: 10px; font-size: 1.5rem;">➤</div>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
          ❌<br/>일반<br/>박스
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #991b1b;">
      <strong>will-change 없음</strong>
    </div>
  </div>
  
  <div class="demo">
    <div class="box accelerated-box">
      <div style="position: relative; width: 100%; height: 100%;">
        <div style="position: absolute; top: 10px; right: 10px; font-size: 1.5rem;">➤</div>
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
          ✅<br/>GPU<br/>가속
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #1e40af;">
      <strong>will-change: transform</strong>
    </div>
  </div>
</div>

<div style="margin-top: 1.5rem; color: #1e293b; background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>🎯 실습 가이드:</strong><br/>
  각 원에 마우스를 올려보세요! <strong>오른쪽 위 화살표(➤)가 회전</strong>하는 것을 보세요.<br/>
  둘 다 같은 애니메이션이지만, 오른쪽(GPU 가속)이 더 부드럽게 느껴질 수 있습니다.
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fee2e2; padding: 1rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>⚠️ 골든 룰 (Gold Rule):</strong><br/>
  1. <strong>평소에는 쓰지 마세요.</strong> 브라우저는 이미 똑똑합니다.<br/>
  2. <strong>성능 문제가 확실히 발생할 때</strong> 최후의 수단으로 쓰세요.<br/>
  3. 애니메이션이 끝나면 제거해주는 것이 좋습니다.<br/>
  4. 남용하면 오히려 메모리 낭비로 성능이 나빠집니다!
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #d1fae5; padding: 1rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>💡 어떻게 작동하나요?</strong><br/>
  • <code>will-change: transform</code>을 선언하면 브라우저가 미리 GPU에 레이어를 생성<br/>
  • 실제 애니메이션이 시작될 때 이미 준비된 레이어를 사용 → 빠름<br/>
  • 하지만 메모리를 미리 차지하므로 <strong>꼭 필요한 경우만</strong> 사용!
</div>`}
        />
      </section>

      {/* 섹션 5: 실무 최적화 예제 - 고성능 스켈레톤 UI */}
      <section className="study-section">
        <h2 className="section-title">실전 예제: 고성능 스켈레톤 UI</h2>
        <p className="section-description">
          데이터를 불러오는 동안 사용자에게 시각적 피드백을 주는 스켈레톤 UI입니다.
          <code>transform</code>과 <code>opacity</code>만을 사용하여 CPU 부하 없이 부드러운 애니메이션을 제공합니다.
        </p>

        <LiveCodeEditor
          scopeId="performance-practical-skeleton"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.skeleton-card {
  width: 300px;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  overflow: hidden;
  position: relative;
}

.skeleton-box {
  background: #f1f5f9;
  border-radius: 4px;
}

.skeleton-image {
  width: 100%;
  height: 160px;
  margin-bottom: 1rem;
}

.skeleton-text {
  height: 1rem;
  margin-bottom: 0.5rem;
}

.skeleton-text.short {
  width: 60%;
}

/* 💡 핵심: Composite 단계만 사용하는 무한 루프 애니메이션 */
.skeleton-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.5) 50%, 
    rgba(255,255,255,0) 100%
  );
  /* background-position 대신 transform을 사용하면 훨씬 빠릅니다 */
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
`}
          initialHtml={`<div class="skeleton-card">
  <div class="skeleton-box skeleton-image"></div>
  <div class="skeleton-box skeleton-text"></div>
  <div class="skeleton-box skeleton-text"></div>
  <div class="skeleton-box skeleton-text short"></div>
</div>

<div class="info-box" style="margin-top: 1.5rem;">
  <strong>💡 성능 최적화 팁:</strong><br/>
  이 애니메이션은 <code>transform</code> 속성만 사용하여 <strong>Composite</strong> 단계에서 처리됩니다.<br/>
  복잡한 페이지에서 수십 개의 스켈레톤이 동시에 움직여도 브라우저가 버벅이지 않는 이유입니다.
</div>`}
        />
      </section>
    </div>
  );
}

export default PerformanceStudy;
