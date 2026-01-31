/**
 * AnimationsStudy2 페이지 컴포넌트
 * CSS Animation의 심화 개념(Trigger, Interactive 속성, 3D transform 등)을 학습하는 페이지입니다.
 * 주요 개념: Transition vs Animation 차이점, Animation Trigger 조건, @keyframes 고급 활용, Card Flip 효과
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function AnimationsStudy() {
  // --- 상태 관리 (State Management) ---
  // 실시간으로 애니메이션 속성을 변경하며 변화를 관찰하기 위한 상태입니다.
  // Transition states
  const [transDuration, setTransDuration] = useState('0.4s');
  const [transTiming, setTransTiming] = useState('ease');

  // Animation states
  const [animDuration, setAnimDuration] = useState('1s');
  const [animTiming, setAnimTiming] = useState('ease-in-out');
  const [animIteration, setAnimIteration] = useState('infinite');
  const [animDirection, setAnimDirection] = useState('normal');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="CSS Animations Study"
        subtitle="@keyframes와 animation으로 생동감 있는 UI 만들기"
      />

      {/* 실습 섹션: Transition vs Animation 비교 */}
      <CollapsibleSection title="실습 섹션: Transition vs Animation 비교">
        <div className="section-description">
          <p>
            CSS 애니메이션은 요소의 스타일을 시간에 따라 변화시켜 움직임을 만듭니다.
          </p>
          <p className="highlight-box">
            💡 <strong>Transition vs Animation</strong><br />
            • <code>transition</code>: A ↔ B 자동 왕복 (호버 해제 시에도 부드럽게 복귀)<br />
            • <code>animation</code>: A → B 복잡한 단계 (끝나면 원래대로 스냅되거나 멈춤)
          </p>
          <div style={{ marginTop: '1rem', background: '#e0f2fe', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0369a1' }}>🤔 실무에서의 쓰임새는 이렇게 갈립니다</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'white', padding: '0.8rem', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                <strong style={{ display: 'block', color: '#2563eb', marginBottom: '0.5rem' }}>Transition을 쓰는 경우</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155' }}>
                  <li>버튼 hover 효과</li>
                  <li>Dropdown 열고 닫기</li>
                  <li>Input focus 강조</li>
                  <li>토글 스위치 UI</li>
                </ul>
                <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#1e40af', fontSize: '0.85rem' }}>👉 “사용자 입력에 즉각 반응”</div>
              </div>
              <div style={{ background: 'white', padding: '0.8rem', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                <strong style={{ display: 'block', color: '#db2777', marginBottom: '0.5rem' }}>Animation을 쓰는 경우</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155' }}>
                  <li>로딩 스피너 (Spin/Loading)</li>
                  <li>Skeleton UI (Loading state)</li>
                  <li>반복되는 장식 효과 (Pulse)</li>
                  <li>페이지 로드 시 자동 재생 동작</li>
                </ul>
                <div style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#9d174d', fontSize: '0.85rem' }}>👉 “시간이 흐른다는 느낌”</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', background: '#fff5f5', padding: '1rem', borderLeft: '4px solid #f56565', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#c53030' }}>🔥 핵심 질문: 왜 Transition으로 스피너를 못 만들까요?</h4>
          <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6', color: '#4a5568' }}>
            <strong>1. "시작과 끝"이 있어야만 함 (Trigger 필수)</strong><br />
            Transition은 반드시 <code>State A</code>에서 <code>State B</code>로 변하는 <strong>사건</strong>이 필요합니다. (hover, class change 등)<br />
            반면 스피너는 사건 없이 <strong>혼자서 영원히</strong> 돌아야 합니다.<br /><br />
            <strong>2. "Loop(반복)" 속성이 없음</strong><br />
            Transition은 목적지에 도착하면 <strong>끝</strong>입니다. 다시 처음으로 돌아가서 실행하려면 누군가(JS나 사용자)가 상태를 강제로 되돌려야 합니다.<br />
            Animation은 <code>infinite</code> 속성 하나로 스스로 무한 반복합니다.
          </p>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'transition-duration',
              type: 'radio',
              value: transDuration,
              onChange: setTransDuration,
              options: ['0.2s', '0.4s', '1s', '2s']
            },
            {
              name: 'transition-timing-function',
              type: 'select',
              value: transTiming,
              onChange: setTransTiming,
              options: ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.68, -0.6, 0.32, 1.6)']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="transition-vs-animation"
          previewHeight="350px"
          codeHeight="550px"
          initialCss={`.compare-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.box {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
}

/* 1. Transition: 상태 변화를 부드럽게 왕복 */
.transition-box {
  background: #667eea;
  transition: transform 0.4s ease;
}
.transition-box:hover {
  transform: rotate(45deg) scale(1.1);
}

/* 2. Animation: 정의된 흐름대로 실행 */
@keyframes rotateAnim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(45deg) scale(1.1); }
}
.animation-box {
  background: #f5576c;
}
.animation-box:hover {
  animation: rotateAnim 0.4s ease forwards;
}

.label {
  text-align: center;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #64748b;
}`}
          currentCss={`.compare-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.box {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
}

/* 1. Transition: 상태 변화를 부드럽게 왕복 */
.transition-box {
  background: #667eea;
  transition: transform ${transDuration} ${transTiming};
}
.transition-box:hover {
  transform: rotate(45deg) scale(1.1);
}

/* 2. Animation: 정의된 흐름대로 실행 */
@keyframes rotateAnim {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(45deg) scale(1.1); }
}
.animation-box {
  background: #f5576c;
}
.animation-box:hover {
  animation: rotateAnim ${transDuration} ${transTiming} forwards;
}

.label {
  text-align: center;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #64748b;
}`}
          initialHtml={`<div class="compare-container">
  <div>
    <div class="box transition-box">Transition</div>
    <div class="label">부드러운 왕복</div>
  </div>
  <div>
    <div class="box animation-box">Animation</div>
    <div class="label">딱딱한 복귀</div>
  </div>
</div>

<div class="info-box">
  <strong>직접 비교해보세요:</strong><br/>
  1. 위 옵션 버튼으로 <strong>시간(Duration)</strong>과 <strong>속도 곡선(Timing)</strong>을 바꿔보세요.<br/>
  2. 두 박스에 마우스를 올렸다 <strong>순식간에 떼어보세요.</strong><br/>
  3. <strong>Transition(파랑)</strong>: 돌아올 때도 부드럽게 제자리로 수렴합니다.<br/>
  4. <strong>Animation(빨강)</strong>: 마우스를 떼는 순간 동작이 중단되고 원래대로 "탁!" 하고 스냅됩니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Timing Functions (속도 곡선) */}
      <CollapsibleSection title="Timing Functions (속도 곡선) 이해하기">
        <div className="section-description">
          <p>
            <code>animation-timing-function</code> (또는 <code>transition-timing-function</code>)은
            <strong>시간 변화 곡선(Time-Variation Curve)</strong>을 정의합니다.<br />
            같은 시간(Duration) 동안 이동하더라도, <strong>가속도</strong>가 다르면 전혀 다른 느낌을 줍니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="timing-functions-race"
          previewHeight="400px"
          codeHeight="500px"
          initialCss={`/* 2초 동안 왼쪽에서 오른쪽으로 이동 */
@keyframes race {
  from { left: 0; }
  to { left: calc(100% - 50px); }
}

.track {
  position: relative;
  height: 50px;
  background: #e2e8f0;
  margin-bottom: 25px;
  border-radius: 25px;
  padding: 5px;
}

.racer {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: absolute;
  top: 5px;
  left: 5px;
  
  /* 공통 애니메이션 설정 */
  animation-name: race;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* 각기 다른 속도 곡선 적용 */
.linear { 
  animation-timing-function: linear; 
  background: #ef4444; /* Red */
}

.ease { 
  /* 기본값. 시작은 빠르고 끝은 천천히 */
  animation-timing-function: ease; 
  background: #f59e0b; /* Orange */
}

.ease-in { 
  /* 천천히 시작해서 가속 */
  animation-timing-function: ease-in; 
  background: #10b981; /* Green */
}

.ease-out { 
  /* 빠르게 시작해서 감속 (브레이크 느낌) */
  animation-timing-function: ease-out; 
  background: #6366f1; /* Indigo */
}

.cubic {
  /* 커스텀 베지에 곡선: 뒤로 갔다 앞으로 팅겨나감 */
  animation-timing-function: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  background: #8b5cf6; /* Purple */
}

.label-text {
  position: absolute;
  top: -20px;
  left: 5px;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 600;
}`}
          initialHtml={`<div style="padding: 1rem;">
  <!-- 1. Linear: 등속도 -->
  <div class="track">
    <div class="label-text">linear <span style="font-weight:normal; font-size:0.7em; color:#94a3b8;">cubic-bezier(0, 0, 1, 1)</span></div>
    <div class="racer linear">1</div>
  </div>

  <!-- 2. Ease: 자연스러움 (기본값) -->
  <div class="track">
    <div class="label-text">ease <span style="font-weight:normal; font-size:0.7em; color:#94a3b8;">cubic-bezier(0.25, 0.1, 0.25, 1.0)</span></div>
    <div class="racer ease">2</div>
  </div>

  <!-- 3. Ease-In: 가속 (출발!) -->
  <div class="track">
    <div class="label-text">ease-in <span style="font-weight:normal; font-size:0.7em; color:#94a3b8;">cubic-bezier(0.42, 0, 1.0, 1.0)</span></div>
    <div class="racer ease-in">3</div>
  </div>

  <!-- 4. Ease-Out: 감속 (도착!) -->
  <div class="track">
    <div class="label-text">ease-out <span style="font-weight:normal; font-size:0.7em; color:#94a3b8;">cubic-bezier(0, 0, 0.58, 1.0)</span></div>
    <div class="racer ease-out">4</div>
  </div>
  
  <!-- 5. Cubic Bezier: 텐션감 -->
  <div class="track">
    <div class="label-text">cubic-bezier (팅겨나가는 효과)</div>
    <div class="racer cubic">5</div>
  </div>
</div>`}
        />

        <div style={{ marginTop: '1.5rem', background: '#f1f5f9', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#334155' }}>
          <strong>💡 Shorthand 팁:</strong> 아래 두 코드는 완전히 동일합니다.
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ background: '#e2e8f0', padding: '0.5rem', borderRadius: '4px' }}>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>/* 개별 속성 */</div>
              <code style={{ fontSize: '0.85rem' }}>
                animation-name: race;<br />
                animation-duration: 2s;<br />
                animation-iteration-count: infinite;<br />
                animation-direction: alternate;
              </code>
            </div>
            <div style={{ background: '#e2e8f0', padding: '0.5rem', borderRadius: '4px' }}>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>/* Shorthand */</div>
              <code style={{ fontSize: '0.85rem' }}>
                animation: race 2s ease 0s infinite alternate;
              </code>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: 애니메이션 트리거 (실행 시점) 조건 */}
      <CollapsibleSection title="실습 섹션: 애니메이션 트리거 (실행 시점) 조건">
        <div className="section-description">
          <p>
            CSS 애니메이션이 실제로 **실행되는 시점**을 이해하는 것이 중요합니다.
          </p>
          <ul className="description-list">
            <li>
              <strong>1. 페이지 로드 시 (자동 실행)</strong>
              <br />
              <span className="example-text">
                → 요소에 `animation` 속성이 있으면 DOM에 추가될 때 즉시 실행<br />
                → 예: 페이지 열자마자 슬라이드 인, 스피너 회전
              </span>
            </li>
            <li>
              <strong>2. 클래스 추가/제거 시 (JavaScript 제어)</strong>
              <br />
              <span className="example-text">
                → `element.classList.add('animate')`로 클래스 추가 시 실행<br />
                → 예: 버튼 클릭 시 모달 페이드 인
              </span>
            </li>
            <li>
              <strong>3. :hover, :focus 등 상태 변화 시</strong>
              <br />
              <span className="example-text">
                → 마우스 올리거나 포커스 받을 때 실행<br />
                → 예: 버튼 호버 시 shake, pulse 효과
              </span>
            </li>
            <li>
              <strong>4. 미디어 쿼리 조건 만족 시</strong>
              <br />
              <span className="example-text">
                → 화면 크기 변화 등으로 조건 만족 시 실행<br />
                → 예: 모바일에서만 특정 애니메이션 실행
              </span>
            </li>
          </ul>
          <p className="highlight-box">
            💡 <strong>핵심</strong>: `animation` 속성이 요소에 **적용되는 순간** 애니메이션이 시작됩니다!<br />
            • CSS에 직접 작성 → 페이지 로드 시 즉시<br />
            • :hover에 작성 → 마우스 올릴 때<br />
            • JS로 클래스 추가 → 클래스 추가 시점
          </p>
        </div>

        <LiveCodeEditor
          scopeId="animation-triggers"
          previewHeight="500px"
          codeHeight="650px"
          initialCss={`/* 1. 페이지 로드 시 자동 실행 */
@keyframes autoSlide {
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.auto-box {
  width: 150px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  
  /* 페이지 로드 시 즉시 실행! */
  animation: autoSlide 1s ease-out;
}

/* 2. 호버 시 실행 - transition 사용 */
.hover-box {
  width: 150px;
  height: 80px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  /* transition으로 부드러운 변화 */
  transition: transform 0.3s ease-in-out;
}

.hover-box:hover {
  /* 마우스 올릴 때 위로 이동! */
  transform: translateY(-10px);
}

.container {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}`}
          initialHtml={`<div class="container">
  <div class="auto-box">
    자동 실행<br/>(로드 시)
  </div>
  
  <div class="hover-box">
    마우스 올려보세요!<br/>(호버 시)
  </div>
</div>

<div class="info-box">
  <strong>실행 시점 확인:</strong><br/>
  • 위 박스: 페이지 열자마자 슬라이드 인 (자동)<br/>
  • 아래 박스: 마우스 올릴 때만 바운스 (호버)<br/><br/>
  <strong>Apply 버튼을 눌러 다시 실행해보세요!</strong>
</div>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="스피너 만들기 (실전 예제)">
        <div className="section-description">
          <p>
            로딩 중임을 알리는 다양한 스피너 스타일을 만들어봅시다. 실제 많은 서비스에서 사용하는 패턴들입니다.
          </p>
          <p className="highlight-box">
            💡 <strong>핵심</strong>: <code>animation: spin 0.8s linear infinite</code> (회전) 또는 <code>dots 1.4s infinite</code> (박동)
          </p>
        </div>

        <LiveCodeEditor
          scopeId="spinner-variations"
          previewHeight="400px"
          codeHeight="600px"
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

/* 1. Border Spinner (기본) */
.spinner-border {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s ease infinite;
}

/* 2. Dual Ring (이중 링) */
.spinner-dual {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top-color: #10b981;
  border-bottom-color: #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 3. Dots (도트 점프) */
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

      {/* 갤러리 섹션: 다양한 애니메이션 효과 비교 */}
      <CollapsibleSection title="🎬 애니메이션 비교 갤러리">
        <div className="section-description">
          <p>
            자주 쓰이는 다양한 애니메이션 효과들을 한눈에 비교해보세요.
          </p>
        </div>
        <LiveCodeEditor
          scopeId="anim-gallery"
          previewHeight="500px"
          codeHeight="600px"
          initialCss={`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes rotate { to { transform: rotate(360deg); } }
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
}

.gallery-icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
.gallery-label { font-size: 0.85rem; color: #a1a1aa; }

.bounce-anim .gallery-icon { animation: bounce 1s infinite; }
.pulse-anim .gallery-icon { animation: pulse 1s infinite; }
.shake-anim .gallery-icon { animation: shake 0.5s infinite; }
.rotate-anim .gallery-icon { animation: rotate 2s linear infinite; }
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
  <div class="gallery-item float-anim">
    <div class="gallery-icon">🎈</div>
    <div class="gallery-label">Float</div>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: 애니메이션 속성 조절 (대화형 인터페이스) */}
      <CollapsibleSection title="animation 속성 조절 (Interactive)">
        <div className="section-description">
          <p>
            <code>animation</code> 속성을 직접 조절하며 어떻게 움직임이 변하는지 확인해보세요.
          </p>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'animation-duration',
              type: 'radio',
              value: animDuration,
              onChange: setAnimDuration,
              options: ['0.5s', '1s', '2s', '3s']
            },
            {
              name: 'animation-timing-function',
              type: 'select',
              value: animTiming,
              onChange: setAnimTiming,
              options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.175, 0.885, 0.32, 1.275)']
            },
            {
              name: 'animation-iteration-count',
              type: 'radio',
              value: animIteration,
              onChange: setAnimIteration,
              options: ['1', '3', 'infinite']
            },
            {
              name: 'animation-direction',
              type: 'select',
              value: animDirection,
              onChange: setAnimDirection,
              options: ['normal', 'reverse', 'alternate', 'alternate-reverse']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="animation-properties-interactive"
          previewHeight="400px"
          codeHeight="550px"
          initialCss={`@keyframes wiggle {
  0%, 100% { transform: rotate(0deg) translateX(0); }
  25% { transform: rotate(-10deg) translateX(-10px); }
  75% { transform: rotate(10deg) translateX(10px); }
}

.wiggle-box {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 auto;
  
  /* 위 옵션 버튼들에 연동됩니다 */
  animation-name: wiggle;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: normal;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  background: #f8f9fa;
  border-radius: 12px;
}`}
          currentCss={`@keyframes wiggle {
  0%, 100% { transform: rotate(0deg) translateX(0); }
  25% { transform: rotate(-10deg) translateX(-10px); }
  75% { transform: rotate(10deg) translateX(10px); }
}

.wiggle-box {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 2rem;
  margin: 0 auto;
  
  /* 위 옵션 버튼들에 연동됩니다 */
  animation-name: wiggle;
  animation-duration: ${animDuration};
  animation-timing-function: ${animTiming};
  animation-iteration-count: ${animIteration};
  animation-direction: ${animDirection};
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  background: #f8f9fa;
  border-radius: 12px;
}`}
          initialHtml={`<div class="container">
  <div class="wiggle-box">🎭</div>
</div>

<div class="info-box">
  <strong>직접 조절해보세요:</strong><br/>
  • <strong>Duration</strong>: 애니메이션이 한 주기 도는 시간<br/>
  • <strong>Timing</strong>: 속도 감속/가속 (Cubic-bezier는 팅기는 효과가 있습니다)<br/>
  • <strong>Iteration</strong>: 반복 횟수<br/>
  • <strong>Direction</strong>: 정방향, 역방향, 왔다갔다(Alternate) 등
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: 페이드 인/아웃 효과 */}
      <CollapsibleSection title="실습 섹션: 페이드 인/아웃 효과">
        <div className="section-description">
          <p>
            투명도를 조절하여 부드럽게 나타나고 사라지는 효과를 만듭니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="fade-animation"
          previewHeight="400px"
          codeHeight="550px"
          initialCss={`@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.fade-container {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  justify-content: center;
}

.fade-in-box {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  animation: fadeIn 2s ease-in;
}

.fade-out-box {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #fa709a, #fee140);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  animation: fadeOut 2s ease-out forwards;
} `}
          initialHtml={`<div class="fade-container">
  <div class="fade-in-box">Fade In</div>
  <div class="fade-out-box">Fade Out</div>
</div>

<div class="info-box">
  <strong>페이드 효과:</strong><br/>
  • fadeIn: opacity 0 → 1<br/>
  • fadeOut: opacity 1 → 0<br/>
  • forwards: 애니메이션 끝 상태 유지
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: 호버 기반 애니메이션 연출 */}
      <CollapsibleSection title="실습 섹션: 호버 기반 애니메이션 연출">
        <div className="section-description">
          <p>
            마우스를 올렸을 때 애니메이션을 실행할 수 있습니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="hover-animation"
          previewHeight="400px"
          codeHeight="600px"
          initialCss={`@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.hover-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.shake-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.shake-btn:hover {
  animation: shake 0.5s ease-in-out;
}

.pulse-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.pulse-btn:hover {
  animation: pulse 0.6s ease-in-out infinite;
} `}
          initialHtml={`<div class="hover-container">
  <button class="shake-btn">Hover me (Shake)</button>
  <button class="pulse-btn">Hover me (Pulse)</button>
</div>

<div class="info-box">
  <strong>호버 애니메이션:</strong><br/>
  • :hover 상태에서 animation 실행<br/>
  • shake: 좌우로 흔들기<br/>
  • pulse: 크기 변화 (무한 반복)
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 3D 카드 플립 효과 */}
      <CollapsibleSection title="실전 예제: 카드 플립">
        <div className="section-description">
          <p>
            3D 회전 효과로 카드를 뒤집는 애니메이션입니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="card-flip-pro"
          previewHeight="450px"
          codeHeight="700px"
          initialCss={`.card-container {
  perspective: 1000px;
  display: flex;
  justify-content: center;
  padding: 3rem;
  background: #f1f5f9;
  border-radius: 12px;
}

/* 카드 전체 */
.flip-card {
  width: 200px;
  height: 280px;
  cursor: pointer;
}

/* 회전하는 내부 판 */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d; /* 자식 요소들의 3D 위치 보존 */
}

/* 마우스 올리면 판 전체 회전 */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* 앞면과 뒷면 공통 스타일 */
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari 지원 */
  backface-visibility: hidden; /* 뒤집혔을 때 안보이게 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* 앞면 */
.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* 뒷면 (미리 뒤집어둠) */
.card-back {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  transform: rotateY(180deg); /* 뒤집힌 상태로 대기 */
} `}
          initialHtml={`<div class="card-container">
  <div class="flip-card">
    <div class="flip-card-inner">
      <!-- 앞면 -->
      <div class="card-front">
        카드 앞면 🃏
      </div>
      <!-- 뒷면 -->
      <div class="card-back">
        짜잔! 뒷면 🎁
      </div>
    </div>
  </div>
</div>

<div class="info-box">
  <strong>양면 카드 구현 전략:</strong><br/>
  1. <strong>Backface-visibility</strong>를 양면에 모두 적용<br/>
  2. <strong>뒷면(Back)</strong>은 미리 180도 뒤집어 두기<br/>
  3. <strong>Inner</strong> 판을 한꺼번에 뒤집어버리기!
</div>`}
        />
      </CollapsibleSection>
    </div >
  );
}

export default AnimationsStudy;
