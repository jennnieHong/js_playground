/**
 * AnimationStudy 페이지 컴포넌트
 * CSS Transition과 Keyframe 애니메이션의 기본 및 실무 활용 사례를 학습하는 페이지입니다.
 * 주요 개념: Transition timing-function, @keyframes 정의, 반응형 애니메이션, 로딩 스피너 구현
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function AnimationStudy() {
  // --- 상태 관리 (State Management) ---
  // 애니메이션 속성(지속 시간, 타이밍 함수, 반복 횟수)의 실시간 변화를 제어합니다.
  const [duration, setDuration] = useState('0.3s');
  const [timingFunction, setTimingFunction] = useState('ease');
  const [animationIterationCount, setAnimationIterationCount] = useState('infinite');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Animation Study"
        subtitle="CSS로 생동감 있는 애니메이션 만들기"
      />

      {/* Animation 기초 정의 섹션 */}

      <CollapsibleSection title="CSS 애니메이션이란?">
        <p className="section-description">
          CSS 애니메이션을 사용하면 JavaScript 없이도 요소에 움직임을 부여할 수 있습니다.
        </p>
      </CollapsibleSection>

      {/* 실습 섹션: Transition (상태 변화 연출) */}
      <CollapsibleSection title="Transition">
        <div className="section-description">
          <p>상태 변화(예: Hover)를 부드럽게 연결해줍니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>duration</code>: 애니메이션이 완료되는 데 걸리는 시간 (예: 0.3s)</li>
            <li><code>timing-function</code>: 변화의 속도 곡선</li>
            <li><code>ease</code>: 천천히 시작했다가 빨라지고 다시 느려짐 (기본값)</li>
            <li><code>linear</code>: 처음부터 끝까지 일정한 속도</li>
            <li><code>cubic-bezier</code>: 사용자가 정의한 베지에 곡선으로 속도 제어</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'transition-duration',
              type: 'radio',
              value: duration,
              onChange: setDuration,
              options: ['0.1s', '0.3s', '1s', '2s']
            },
            {
              name: 'transition-timing-function',
              type: 'select',
              value: timingFunction,
              onChange: setTimingFunction,
              options: [
                'ease',
                'linear',
                'ease-in',
                'ease-out',
                'ease-in-out',
                { value: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)', label: 'bounce (cubic-bezier)' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="anim-transition"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.anim-item {
  transition: all ${duration} ${timingFunction};
}

.anim-item:hover {
  transform: scale(1.1) translateX(20px);
  background: linear-gradient(135deg, #764ba2, #f093fb);
}`}
          currentCss={`.anim-item {
  transition: all ${duration} ${timingFunction};
}

.anim-item:hover {
  transform: scale(1.1) translateX(20px);
  background: linear-gradient(135deg, #764ba2, #f093fb);
}`}
          initialHtml={`<div class="animation-demo">
  <div class="anim-item transition-demo">
    Hover Me!
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Keyframe Animation (기본 바운스 효과) */}
      <CollapsibleSection title="Keyframe Animation">
        <div className="section-description">
          <p>
            <code>@keyframes</code>는 애니메이션의 흐름(프레임)을 정의합니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>from</code> (0%): 시작 상태</li>
            <li><code>to</code> (100%): 종료 상태</li>
            <li><code>%</code>: 진행도에 따른 중간 상태 (예: 50%는 딱 중간 시점)</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="anim-bounce"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`@keyframes bounce {
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-20px); 
  }
}

.anim-item {
  animation: bounce 1s infinite;
}`}
          initialHtml={`<div class="animation-demo">
  <div class="anim-item bounce-demo">
    Bouncing!
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Rotate Animation (회전 효과) */}
      <CollapsibleSection title="Rotate Animation">
        <LiveCodeEditor
          scopeId="anim-rotate"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`@keyframes rotate {
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
}

.anim-item {
  animation: rotate 2s linear infinite;
  font-size: 3rem;
}`}
          initialHtml={`<div class="animation-demo">
  <div class="anim-item rotate-demo">
    🎨
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Fade Animation (페이드 인/아웃) */}
      <CollapsibleSection title="Fade Animation">
        <LiveCodeEditor
          scopeId="anim-fade"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`@keyframes fadeInOut {
  0%, 100% { 
    opacity: 0.3; 
  }
  50% { 
    opacity: 1; 
  }
}

.anim-item {
  animation: fadeInOut 2s ease-in-out infinite;
}`}
          initialHtml={`<div class="animation-demo">
  <div class="anim-item fade-demo">
    Fading In & Out
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Pulse Animation (심장 박동 강조 효과) */}
      <CollapsibleSection title="Pulse Animation">
        <p className="section-description">
          심장 박동처럼 커졌다 작아지는 효과입니다. 알림 아이콘, 버튼 강조 등에 사용됩니다.
        </p>
        <LiveCodeEditor
          scopeId="anim-pulse"
          previewHeight="200px"
          codeHeight="350px"
          initialCss={`@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
  }
}

.anim-item {
  animation: pulse 2s ease-in-out infinite;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}`}
          initialHtml={`<div class="animation-demo">
  <div class="anim-item pulse-demo">
    🔔 New!
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Shake Animation (경고/에러 떨림 효과) */}
      <CollapsibleSection title="Shake Animation">
        <p className="section-description">
          좌우로 떨리는 효과입니다. 에러 알림이나 주의 환기에 효과적입니다.
        </p>
        <LiveCodeEditor
          scopeId="anim-shake"
          previewHeight="200px"
          codeHeight="350px"
          initialCss={`@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.anim-item {
  animation: shake 0.8s ease-in-out infinite;
  background: linear-gradient(135deg, #ef4444, #f97316);
}`}
          initialHtml={`<div class="animation-demo">
  <div class="anim-item shake-demo">
    ⚠️ Error!
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Slide Animation (슬라이드 인/아웃) */}
      <CollapsibleSection title="Slide Animation">
        <p className="section-description">
          슬라이드 인/아웃 효과입니다. 모달, 드로어, 토스트 알림 등에 사용됩니다.
        </p>
        <div style={{ marginBottom: '1rem', background: '#f0f9ff', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid #0ea5e9' }}>
          <h4 style={{ margin: '0 0 0.8rem 0', color: '#0369a1', fontSize: '1rem' }}>🤔 Deep Dive: 왜 토글은 Transition이 나을까요?</h4>

          <div style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.5rem' }}>❌ Animation의 구조적 문제 (토글 시)</strong>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
              <li><strong>되돌리기 어렵다</strong>: 닫기용 애니메이션(slideOut)을 따로 만들어 클래스로 교체해야 함</li>
              <li><strong>상태 기반이 아님</strong>: 시간(Time) 기반이라 중간에 멈추거나 취소가 까다로움</li>
              <li><strong>결론</strong>: "사용자가 수시로 열고 닫는 패널"에는 부적합!</li>
            </ul>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: '#10b981', display: 'block', marginBottom: '0.5rem' }}>⭕ Animation이 딱 맞는 경우</strong>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#334155', lineHeight: '1.6', marginBottom: '0.8rem' }}>
              <li>자동 캐러셀 / 배너가 주기적으로 흘러갈 때</li>
              <li>튜토리얼 가이드 / 페이지 진입 시 Intro 연출 (1회성)</li>
              <li>👉 <strong>사용자 입력과 무관하게 시스템이 보여줄 때</strong></li>
            </ul>
            <div style={{ background: 'white', padding: '0.8rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #e2e8f0' }}>
              <code style={{ color: '#059669' }}>
                .hero {'{'} animation: autoSlide 0.8s ease-out forwards; {'}'}
              </code>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>🧠 철학적 차이 (느낌)</h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: '#2563eb' }}>Transition (슬라이드)</strong>
                <div style={{ marginTop: '0.3rem', color: '#475569' }}>
                  "내가 눌렀다 → 바로 반응"<br />
                  즉각성 / 신뢰감 / 조작 가능<br />
                  <span style={{ fontSize: '0.8em', color: '#94a3b8' }}>👉 메뉴, 패널, 사이드바</span>
                </div>
              </div>
              <div>
                <strong style={{ color: '#db2777' }}>Animation (슬라이드)</strong>
                <div style={{ marginTop: '0.3rem', color: '#475569' }}>
                  "시스템이 보여준다"<br />
                  연출 / 흐름 / 제어 불가<br />
                  <span style={{ fontSize: '0.8em', color: '#94a3b8' }}>👉 인트로, 배너, 데모</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="anim-slide"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`@keyframes slideInRight {
  from { 
    transform: translateX(100%);
    opacity: 0;
  }
  to { 
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInUp {
  from { 
    transform: translateY(100%);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}

.slide-right {
  animation: slideInRight 0.5s ease-out forwards;
  background: linear-gradient(135deg, #10b981, #34d399);
}

.slide-up {
  animation: slideInUp 0.5s ease-out 0.3s forwards;
  opacity: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}`}
          initialHtml={`<div class="animation-demo" style="flex-direction: column; gap: 1rem;">
  <div class="anim-item slide-right">
    ➡️ Slide Right
  </div>
  <div class="anim-item slide-up">
    ⬆️ Slide Up
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Loading Spinner (다양한 로딩 효과 구현) */}
      <CollapsibleSection title="Loading Spinner">
        <p className="section-description">
          다양한 로딩 스피너 스타일을 비교해보세요.
        </p>
        <LiveCodeEditor
          scopeId="anim-loading"
          previewHeight="300px"
          codeHeight="500px"
          initialCss={`@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes dots {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.spinners {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
  background: #1e293b;
  border-radius: 12px;
}

.spinner-box {
  text-align: center;
  color: white;
}

.spinner-label {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #94a3b8;
}

/* Border Spinner */
.spinner-border {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Dual Ring */
.spinner-dual {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top-color: #10b981;
  border-bottom-color: #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Dots */
.spinner-dots {
  display: flex;
  gap: 6px;
}
.spinner-dots div {
  width: 12px;
  height: 12px;
  background: #f59e0b;
  border-radius: 50%;
  animation: dots 1.4s ease-in-out infinite;
}
.spinner-dots div:nth-child(2) { animation-delay: 0.16s; }
.spinner-dots div:nth-child(3) { animation-delay: 0.32s; }`}
          initialHtml={`<div class="spinners">
  <div class="spinner-box">
    <div class="spinner-border"></div>
    <div class="spinner-label">Border</div>
  </div>
  <div class="spinner-box">
    <div class="spinner-dual"></div>
    <div class="spinner-label">Dual Ring</div>
  </div>
  <div class="spinner-box">
    <div class="spinner-dots">
      <div></div><div></div><div></div>
    </div>
    <div class="spinner-label">Dots</div>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Animation 속성 조절 (반복 횟수 제어) */}
      <CollapsibleSection title="Animation 속성 조절">
        <p className="section-description">
          <code>animation-iteration-count</code>로 반복 횟수를 조절합니다.
        </p>
        <p className="section-description">
          <code>animation-iteration-count</code>로 반복 횟수를 조절합니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'animation-iteration-count',
              type: 'radio',
              value: animationIterationCount,
              onChange: setAnimationIterationCount,
              options: ['1', '3', 'infinite']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="anim-iteration"
          previewHeight="200px"
          codeHeight="350px"
          initialCss={`@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.anim-item {
  animation: wiggle 0.5s ease-in-out;
  animation-iteration-count: ${animationIterationCount};
}`}
          currentCss={`@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
}

.anim-item {
  animation: wiggle 0.5s ease-in-out;
  animation-iteration-count: ${animationIterationCount};
}`}
          initialHtml={`<div class="animation-demo">
  <div class="anim-item">
    🎭 Wiggle!
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 갤러리 섹션: 애니메이션 비교 갤러리 */}
      <CollapsibleSection title="🎬 애니메이션 비교 갤러리">
        <p className="section-description">
          모든 애니메이션을 한눈에 비교해보세요. 각 카드에 마우스를 올려 효과를 확인할 수 있습니다.
        </p>
        <LiveCodeEditor
          scopeId="anim-gallery"
          previewHeight="450px"
          codeHeight="550px"
          initialCss={`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes rotate { to { transform: rotate(360deg); } }
@keyframes fade { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1e1e2e, #2d2d44);
  border-radius: 16px;
}

.gallery-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: white;
  transition: background 0.3s;
}

.gallery-item:hover { background: rgba(255,255,255,0.1); }

.gallery-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
.gallery-label { font-size: 0.85rem; color: #a1a1aa; margin-top: 0.5rem; }

.bounce-anim .gallery-icon { animation: bounce 1s infinite; }
.pulse-anim .gallery-icon { animation: pulse 1.5s infinite; }
.shake-anim .gallery-icon { animation: shake 0.5s infinite; }
.rotate-anim .gallery-icon { animation: rotate 2s linear infinite; }
.fade-anim .gallery-icon { animation: fade 2s infinite; }
.float-anim .gallery-icon { animation: float 3s ease-in-out infinite; }`}
          initialHtml={`<div class="gallery">
  <div class="gallery-item bounce-anim">
    <div class="gallery-icon">🚀</div>
    <div class="gallery-label">Bounce</div>
  </div>
  <div class="gallery-item pulse-anim">
    <div class="gallery-icon">❤️</div>
    <div class="gallery-label">Pulse</div>
  </div>
  <div class="gallery-item shake-anim">
    <div class="gallery-icon">🔔</div>
    <div class="gallery-label">Shake</div>
  </div>
  <div class="gallery-item rotate-anim">
    <div class="gallery-icon">⚙️</div>
    <div class="gallery-label">Rotate</div>
  </div>
  <div class="gallery-item fade-anim">
    <div class="gallery-icon">✨</div>
    <div class="gallery-label">Fade</div>
  </div>
  <div class="gallery-item float-anim">
    <div class="gallery-icon">🎈</div>
    <div class="gallery-label">Float</div>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 알림 배지 & 장바구니 애니메이션 (종합 예제) */}
      <CollapsibleSection title="실전 예제: 알림 배지 & 장바구니 애니메이션">
        <p className="section-description">
          사용자의 시선을 끌어야 하는 알림 배지에 <code>pulse</code>와 <code>bounce</code>를 조합하여 생동감을 불어넣습니다.
        </p>

        <LiveCodeEditor
          scopeId="animation-practical-badge"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.cart-wrapper {
  position: relative;
  display: inline-block;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  cursor: pointer;
}

.cart-icon {
  font-size: 2.5rem;
}

.badge {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #ef4444;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid white;
  
  /* 배지 강조 애니메이션 */
  animation: badge-pulse 2s infinite;
}

@keyframes badge-pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { transform: scale(1.2); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.cart-wrapper:hover .cart-icon {
  animation: cart-bounce 0.5s ease-in-out infinite;
}

@keyframes cart-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px) rotate(-5deg); }
}
`}
          initialHtml={`<div style="background: #f8fafc; padding: 3rem; display: flex; justify-content: center; border-radius: 12px;">
  <div class="cart-wrapper">
    <div class="cart-icon">🛒</div>
    <div class="badge">3</div>
  </div>
</div>

<div class="info-box" style="margin-top: 1.5rem;">
  <strong>💡 실전 팁:</strong><br/>
  • <strong>배지(Badge)</strong>: <code>pulse</code> 효과로 새로운 소식이 있음을 은은하게 알립니다.<br/>
  • <strong>호버(Hover)</strong>: 사용자가 아이콘에 마우스를 올렸을 때 <code>bounce</code> 효과를 주어 피드백을 강화합니다.
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default AnimationStudy;

