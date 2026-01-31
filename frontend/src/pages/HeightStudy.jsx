/**
 * HeightStudy.jsx
 * 요소의 높이 계산 방식(px, %, auto, vh)과 높이 붕괴 해결 방안 실습 페이지
 */
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function HeightStudy() {
  return (
    <div className="page-container">
      <PageHeader
        title="Height & Sizing"
        subtitle="Container 높이 계산 규칙: %, px, auto, vh의 차이점"
      />

      {/* 섹션 1: 다양한 높이 단위(px, %, vh, auto)의 특성 이해 */}
      <CollapsibleSection title="높이 단위 기본">
        <div className="section-description">
          <p>
            CSS에서 높이를 설정하는 방법은 여러 가지가 있으며, 각각 다르게 동작합니다.
          </p>
          <ul className="description-list">
            <li><strong>px (픽셀)</strong>: 고정된 절대 크기</li>
            <li><strong>% (퍼센트)</strong>: 부모 요소의 높이를 기준으로 계산</li>
            <li><strong>vh (뷰포트 높이)</strong>: 브라우저 창 높이의 백분율</li>
            <li><strong>auto (자동)</strong>: 내부 콘텐츠에 맞춰 자동 계산</li>
          </ul>
        </div>

        <LiveCodeEditor
          scopeId="height-units"
          previewHeight="500px"
          codeHeight="400px"
          initialCss={`.container {
  border: 3px solid #667eea;
  margin-bottom: 1rem;
  background: #f8f9fa;
}

.px-height {
  height: 200px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.vh-height {
  height: 30vh;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.auto-height {
  height: auto;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  padding: 2rem;
  font-weight: 600;
  text-align: center;
}`}
          initialHtml={`<div class="container">
  <div class="px-height">
    height: 200px (고정 크기)
  </div>
</div>

<div class="container">
  <div class="vh-height">
    height: 30vh (뷰포트의 30%)
  </div>
</div>

<div class="container">
  <div class="auto-height">
    height: auto<br/>
    (내용물에 맞춰 자동 조정)
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 2: 퍼센트(%) 높이가 적용되지 않는 이유와 조건 */}
      <CollapsibleSection title="퍼센트 높이의 함정">
        <div className="section-description">
          <p>
            <strong>중요:</strong> <code>height: 50%</code>가 작동하려면 <strong>부모 요소에 명시적인 높이</strong>가 있어야 합니다!
          </p>
          <p className="highlight-box">
            💡 <strong>핵심 규칙</strong>: 부모가 <code>height: auto</code>면 자식의 <code>%</code> 높이는 무시됩니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="percent-height"
          previewHeight="600px"
          codeHeight="500px"
          initialCss={`/* ❌ 작동하지 않음: 부모에 높이 없음 */
.parent-no-height {
  border: 3px dashed #e74c3c;
  background: #ffe6e6;
  margin-bottom: 2rem;
}

.child-percent-fail {
  height: 50%;
  background: #e74c3c;
  color: white;
  padding: 1rem;
  text-align: center;
}

/* ✅ 작동함: 부모에 명시적 높이 */
.parent-with-height {
  height: 300px;
  border: 3px solid #27ae60;
  background: #e8f8f5;
  margin-bottom: 2rem;
  box-sizing: content-box;
}

.child-percent-success {
  height: 50%;
  background: #27ae60;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}`}
          initialHtml={`<div class="parent-no-height">
  <div class="child-percent-fail">
    ❌ height: 50% (작동 안 함)<br/>
    부모에 높이가 없어서 무시됨
  </div>
</div>

<div class="parent-with-height">
  <div class="child-percent-success">
    ✅ height: 50% (150px)<br/>
    부모 높이(300px)의 50%
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: 콘텐츠에 따라 결정되는 자동(Auto) 높이 계산 원리 */}
      <CollapsibleSection title="Auto 높이: 자식 요소의 합">
        <div className="section-description">
          <p>
            <code>height: auto</code>인 컨테이너는 <strong>자식 요소들의 높이 합</strong>으로 자동 계산됩니다.
          </p>
          <ul className="description-list">
            <li>자식들이 <code>px</code>, <code>rem</code> 등 절대 단위 → 합산</li>
            <li>자식이 <code>margin</code>을 가지면 → 마진도 포함</li>
            <li>자식이 <code>position: absolute</code> → 높이 계산에서 제외</li>
          </ul>
        </div>

        <LiveCodeEditor
          scopeId="auto-height"
          previewHeight="600px"
          codeHeight="500px"
          initialCss={`.auto-container {
  height: auto;
  border: 3px solid #3498db;
  background: #ebf5fb;
  padding: 1rem;
}

.child-box {
  height: 80px;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
}

.child-box:last-child {
  margin-bottom: 0;
}

.info-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}`}
currentCss={`.auto-container {
  height: auto;
  border: 3px solid #3498db;
  background: #ebf5fb;
  padding: 1rem;
}

.child-box {
  height: 80px;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
}

.child-box:last-child {
  margin-bottom: 0;
}

.info-box {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}`}
          initialHtml={`<div class="auto-container">
  <div class="child-box">Box 1 (80px)</div>
  <div class="child-box">Box 2 (80px)</div>
  <div class="child-box">Box 3 (80px)</div>
</div>

<div class="info-box">
  <strong>컨테이너 높이 계산:</strong><br/>
  80px + 1rem(margin) + 80px + 1rem + 80px + 2rem(padding) = 자동 계산
</div>`}
currentHtml={`<div class="auto-container">
  <div class="child-box">Box 1 (80px)</div>
  <div class="child-box">Box 2 (80px)</div>
  <div class="child-box">Box 3 (80px)</div>
</div>

<div class="info-box">
  <strong>컨테이너 높이 계산:</strong><br/>
  80px + 1rem(margin) + 80px + 1rem + 80px + 2rem(padding) = 자동 계산
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: 유연한 레이아웃 환경(Flexbox)에서의 높이 동작 */}
      <CollapsibleSection title="Flexbox에서의 높이">
        <div className="section-description">
          <p>
            Flexbox는 높이 계산 방식이 다릅니다. <code>flex-grow</code>와 <code>flex-shrink</code>로 유연하게 조절됩니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="flex-height"
          previewHeight="600px"
          codeHeight="500px"
          initialCss={`.flex-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 3px solid #9b59b6;
  background: #f4ecf7;
  gap: 1rem;
  padding: 1rem;
}

.flex-fixed {
  height: 100px;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
}

.flex-grow {
  flex-grow: 1;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
}`}
          initialHtml={`<div class="flex-container">
  <div class="flex-fixed">
    고정 높이: 100px
  </div>
  <div class="flex-grow">
    flex-grow: 1<br/>
    (남은 공간 모두 차지)
  </div>
  <div class="flex-fixed">
    고정 높이: 100px
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: 전체 높이(Full Height) 구현 시 발생하는 일반적인 문제와 해결책 */}
      <CollapsibleSection title="100% 높이가 안 될 때">
        <div className="section-description">
          <p>
            가장 흔한 실수: <code>height: 100%</code>를 사용했는데 작동하지 않는 경우
          </p>
          <p className="highlight-box">
            💡 <strong>해결책</strong>: 모든 부모 요소에 <code>height: 100%</code>를 설정하거나, <code>vh</code> 단위를 사용하세요.
          </p>
        </div>

<LiveCodeEditor
  scopeId="full-height"
  previewHeight="700px"
  codeHeight="650px"
  initialCss={`/* ❌ 작동 안 함 */
.wrong-full-height {
  height: 100%;
  background: #e74c3c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* ✅ 해결책 1: vh 사용 */
.correct-vh {
  height: 30vh;
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 1rem;
  border-radius: 8px;
}

/* ✅ 해결책 2: 부모에 명시적 높이 */
.parent-explicit {
  height: 200px;
  border: 3px solid #3498db;
  background: #ebf5fb;
  margin-bottom: 1rem;
}

.child-100-percent {
  height: 100%;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

/* ✅ 실무 패턴 1: flex 기반 전체 높이 레이아웃 */
.flex-layout {
  height: 300px;
  display: flex;
  flex-direction: column;
  border: 3px solid #8e44ad;
  margin-bottom: 1rem;
}

.flex-header {
  background: #9b59b6;
  color: white;
  padding: 0.5rem;
  font-weight: 600;
}

.flex-body {
  flex: 1;
  background: #f5eef8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #333;
}

/* ✅ 실무 패턴 2: position absolute + inset */
.absolute-parent {
  position: relative;
  height: 200px;
  border: 3px solid #f39c12;
  margin-bottom: 1rem;
}

.absolute-child {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #f39c12, #d68910);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

/* ✅ 실무 패턴 3: min-height 활용 */
.min-height-box {
  min-height: 150px;
  background: linear-gradient(135deg, #16a085, #138d75);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
}

/* ✅ 실무 패턴 4: 모바일 대응 dvh */
.viewport-safe {
  height: 20dvh;
  background: linear-gradient(135deg, #34495e, #2c3e50);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 1rem;
}`}
  initialHtml={`<div class="wrong-full-height">
  ❌ height: 100%
</div>

<div class="correct-vh">
  ✅ height: 30vh
</div>

<div class="parent-explicit">
  <div class="child-100-percent">
    ✅ 부모 height + 자식 100%
  </div>
</div>

<div class="flex-layout">
  <div class="flex-header">Header</div>
  <div class="flex-body">
    ✅ flex: 1 전체 채우기
  </div>
</div>

<div class="absolute-parent">
  <div class="absolute-child">
    ✅ position: absolute + inset: 0
  </div>
</div>

<div class="min-height-box">
  ✅ min-height 기반 안전한 높이
</div>

<div class="viewport-safe">
  ✅ height: dvh (모바일 안전)
</div>`}
/>


      </CollapsibleSection>

      {/* 섹션 6: 실전 예제 - vh 단위를 활용한 화면 가득 찬 히어로 섹션 */}
      <CollapsibleSection title="실전 예제: 풀스크린 히어로 섹션">
        <p className="section-description">
          <code>100vh</code>(또는 최신 <code>100dvh</code>)를 활용하여 화면을 가득 채우는 첫 화면 레이아웃입니다.
        </p>

        <LiveCodeEditor
          scopeId="height-practical-hero"
          previewHeight="450px"
          codeHeight="450px"
          initialCss={`.hero-section {
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
              url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
}

.hero-section h1 {
  font-size: clamp(2rem, 8vw, 4rem);
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  animation: bounce 2s infinite;
  font-size: 2rem;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}`}
          initialHtml={`<div class="hero-section">
  <h1>Nature is Beautiful</h1>
  <p>Discover the unseen beauty of our planet through our lens.</p>
  <div class="scroll-indicator">↓</div>
</div>

<p style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 높이 활용 팁:</strong><br/>
  • <strong>100vh</strong>: 뷰포트 높이의 100%를 의미합니다.<br/>
  • <strong>dvh (Dynamic Viewport Height)</strong>: 모바일 브라우저의 주소창 유무에 따라 동적으로 변하는 높이 단위입니다. 
</p>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default HeightStudy;
