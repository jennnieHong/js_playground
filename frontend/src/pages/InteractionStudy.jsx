/**
 * InteractionStudy.jsx
 * CSS 인터랙션 및 상태(Pseudo-classes) 관리 실습 페이지
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';

function InteractionStudy() {
  // 상태 관리: 커서 타입 및 포인터 이벤트 제어
  const [cursorType, setCursorType] = useState('pointer');
  const [pointerEvents, setPointerEvents] = useState('auto');

  return (
    <div className="page-container">
      <PageHeader
        title="States & Pseudo-classes"
        subtitle="Making interfaces responsive to user interaction"
      />

      {/* 섹션 1: 사용자 상호작용 개요 */}
      <section className="study-section">
        <h2 className="section-title">사용자 상호작용이란?</h2>
        <div className="section-description">
          <p>
            좋은 UI는 사용자의 행동에 <strong>즉각적으로 반응</strong>합니다.
            CSS 의사 클래스(pseudo-class)를 사용하여 다양한 상태를 표현할 수 있습니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>:hover</code>: 마우스 올림 (가장 기본적인 피드백)</li>
            <li><code>:active</code>: 클릭 중 (버튼을 누르는 순간)</li>
            <li><code>:focus</code>: 키보드 포커스 (접근성 중요!)</li>
            <li><code>:disabled</code>: 비활성 상태</li>
            <li><code>:has()</code>: 자식 요소 기반 스타일링 (게임 체인저!)</li>
          </ul>
        </div>
      </section>

      {/* 섹션 2: 기본 의사 클래스 (:hover, :active, :focus) */}
      <section className="study-section">
        <h2 className="section-title">:hover, :active, :focus</h2>
        <p className="section-description">
          버튼의 기본 3대 상태입니다. 항상 함께 정의하세요!
        </p>

        <LiveCodeEditor
          scopeId="basic-states"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`.interactive-btn {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin: 0.5rem;
}

/* Hover: 마우스 올렸을 때 */
.interactive-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  background: linear-gradient(135deg, #5568d3, #6a3f8f);
}

/* Active: 클릭하는 순간 */
.interactive-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Focus: 키보드로 접근했을 때 */
.interactive-btn:focus {
  outline: 3px solid #f093fb;
  outline-offset: 2px;
}`}
          initialHtml={`<div style="background: #ffffff; padding: 2rem; border-radius: 8px; text-align: center;">
  <button class="interactive-btn">Hover Me!</button>
  <button class="interactive-btn">Click Me!</button>
  <button class="interactive-btn">Tab to Focus</button>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Try it:</strong><br/>
  • 마우스를 올려보세요 (hover)<br/>
  • 클릭해보세요 (active)<br/>
  • Tab 키로 포커스를 이동해보세요 (focus)
</div>`}
        />
      </section>

      {/* 섹션 3: 접근성을 고려한 :focus-visible */}
      <section className="study-section">
        <h2 className="section-title">:focus-visible (현대적 접근)</h2>
        <div className="section-description">
          <p>
            <code>:focus-visible</code>은 <strong>키보드 사용자에게만</strong> 포커스 스타일을 보여줍니다.<br />
            마우스 클릭 시에는 포커스 링이 나타나지 않아 더 깔끔합니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="focus-visible"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.focus-demo {
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  font-weight: 600;
  border: 2px solid #3b82f6;
  border-radius: 6px;
  background: #dbeafe;
  color: #1e3a8a;
  cursor: pointer;
  transition: all 0.2s;
}

/* 기존 방식: 클릭해도 포커스 링 표시 */
.focus-old:focus {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}

/* 현대 방식: 키보드에서만 포커스 링 표시 */
.focus-new:focus-visible {
  outline: 3px solid #10b981;
  outline-offset: 2px;
}`}
          initialHtml={`<div style="background: #ffffff; padding: 1.5rem; border-radius: 8px;">
  <button class="focus-demo focus-old">
    :focus (항상 표시)
  </button>
  
  <button class="focus-demo focus-new">
    :focus-visible (키보드만)
  </button>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  마우스로 클릭 vs Tab 키로 포커스 차이를 확인하세요!
</div>`}
        />
      </section>

      {/* 섹션 4: 활성/비활성 상태 (:disabled, :enabled) */}
      <section className="study-section">
        <h2 className="section-title">:disabled & :enabled</h2>
        <p className="section-description">
          폼 요소의 활성/비활성 상태를 시각적으로 표현합니다.
        </p>

        <LiveCodeEditor
          scopeId="disabled-state"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.form-btn {
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.form-btn:enabled {
  background-color: #10b981;
  color: #ffffff;
}

.form-btn:enabled:hover {
  background-color: #059669;
  transform: scale(1.05);
}

.form-btn:disabled {
  background-color: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}`}
          initialHtml={`<div style="background: #ffffff; padding: 1.5rem; border-radius: 8px;">
  <button class="form-btn" type="button">Enabled Button</button>
  <button class="form-btn" type="button" disabled>Disabled Button</button>
  
  <br/><br/>
  
  <input type="text" placeholder="Enabled Input" style="padding: 0.5rem; margin: 0.5rem; border: 2px solid #3b82f6; border-radius: 4px; font-size: 1rem;"/>
  <input type="text" placeholder="Disabled Input" disabled style="padding: 0.5rem; margin: 0.5rem; border: 2px solid #e5e7eb; border-radius: 4px; background: #f3f4f6; color: #9ca3af; font-size: 1rem;"/>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>:disabled</strong> 상태에서는 cursor: not-allowed와 낮은 opacity를 사용하세요.
</div>`}
        />
      </section>

      {/* 섹션 5: 부모 선택자 :has()의 강력한 활용 */}
      <section className="study-section">
        <h2 className="section-title">:has() - The Game Changer! 🚀</h2>
        <div className="section-description">
          <p>
            <code>:has()</code>는 <strong>부모 선택자</strong>의 역할을 합니다.
            "특정 자식을 가진 부모"를 선택할 수 있어 CSS의 판도를 바꿨습니다!
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li>JavaScript 없이 부모 스타일 변경 가능</li>
            <li>폼 유효성 검사 UI 구현</li>
            <li>조건부 레이아웃 만들기</li>
          </ul>
        </div>

        <LiveCodeEditor
          scopeId="has-selector"
          previewHeight="350px"
          codeHeight="400px"
          initialCss={`/* 체크박스가 체크되면 카드 배경색 변경 */
.card {
  padding: 1.5rem;
  margin: 1rem 0;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  transition: all 0.3s;
}

.card:has(input[type="checkbox"]:checked) {
  background: #d1fae5;
  border-color: #10b981;
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
}

.card label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-weight: 600;
  color: #1e293b;
}

.card input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}`}
          initialHtml={`<div>
  <div class="card">
    <label>
      <input type="checkbox" />
      ✅ Task 1: Learn CSS Basics
    </label>
  </div>
  
  <div class="card">
    <label>
      <input type="checkbox" />
      ✅ Task 2: Master :has() selector
    </label>
  </div>
  
  <div class="card">
    <label>
      <input type="checkbox" />
      ✅ Task 3: Build awesome UI
    </label>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Magic!</strong> 체크박스를 체크하면 부모인 .card의 배경색이 변합니다!<br/>
  이전에는 JavaScript가 필요했던 기능입니다.
</div>`}
        />
      </section>

      {/* 섹션 6: 사용자 정의 스크롤바 디자인 */}
      <section className="study-section">
        <h2 className="section-title">Custom Scrollbar</h2>
        <p className="section-description">
          <code>::webkit-scrollbar</code> 의사 요소를 사용하여 지루한 기본 스크롤바를 멋지게 디자인합니다.
        </p>
        <LiveCodeEditor
          scopeId="custom-scrollbar"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.scroll-container {
  max-height: 200px;
  overflow-y: scroll;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
}

/* 스크롤바 전체 너비 */
.scroll-container::-webkit-scrollbar {
  width: 12px;
}

/* 스크롤바 트랙 (배경) */
.scroll-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

/* 스크롤바 핸들 (움직이는 부분) */
.scroll-container::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #667eea, #764ba2);
  border-radius: 10px;
  border: 3px solid #f1f5f9; /* 핸들 주변 여백 효과 */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #5568d3, #6a3f8f);
}
`}
          initialHtml={`<div class="scroll-container">
  <h4 style="margin-top:0">Scroll down to see the magic!</h4>
  <p>CSS scrollbars are a great way to add personality to your site.</p>
  <p>You can customize the track, the thumb, and even the corner.</p>
  <p>Modern browsers make this easier with standard properties, but webkit-specific ones still offer the most control.</p>
  <p>Keep scrolling to test the gradient thumb!</p>
  <p>Almost there...</p>
  <p>This is the end of the scrollable content.</p>
</div>`}
        />
      </section>

      {/* 섹션 7: 브랜드 컬러 적용 (accent-color) */}
      <section className="study-section">
        <h2 className="section-title">Accent Color</h2>
        <p className="section-description">
          <code>accent-color</code> 속성 한 줄로 체크박스, 라디오, 프로그레스 바의 브랜드 컬러를 일괄 변경할 수 있습니다.
        </p>
        <LiveCodeEditor
          scopeId="accent-color-demo"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`.accent-pink {
  accent-color: #f093fb;
}

.accent-green {
  accent-color: #10b981;
}

.controls-group {
  display: flex;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
}

input {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
`}
          initialHtml={`<div class="controls-group" style="color: #1e293b;">
  <div class="accent-pink">
    <h4 style="color: #1e293b;">Pink Accent</h4>
    <label><input type="checkbox" checked /> Checkbox</label><br/><br/>
    <label><input type="radio" checked /> Radio</label><br/><br/>
    <input type="range" />
  </div>

  <div class="accent-green">
    <h4 style="color: #1e293b;">Green Accent</h4>
    <label><input type="checkbox" checked /> Checkbox</label><br/><br/>
    <label><input type="radio" checked /> Radio</label><br/><br/>
    <input type="range" />
  </div>
</div>
`}
        />
      </section>

      {/* 섹션 8: Perspective를 활용한 3D 카드 플립 */}
      <section className="study-section">
        <h2 className="section-title">3D Flip Card Effect</h2>
        <p className="section-description">
          <code>perspective</code>와 <code>transform-style: preserve-3d</code>를 사용하여 깊이감 있는 인터랙션을 만듭니다.
        </p>
        <LiveCodeEditor
          scopeId="3d-flip-card"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.flip-card {
  background-color: transparent;
  width: 250px;
  height: 200px;
  perspective: 1000px; /* 3D 효과의 깊이 */
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d; /* 자식 요소의 3D 공간 유지 */
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-front, .flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 뒷면을 숨김 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 1rem;
}

.flip-front {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.flip-back {
  background: #1e293b;
  color: white;
  transform: rotateY(180deg);
}
`}
          initialHtml={`<div style="display: flex; justify-content: center; padding: 2rem; background: #f1f5f9; border-radius: 12px;">
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-front">
        <h2 style="margin:0">FRONT SIDE</h2>
        <p>Hover to flip! 🔄</p>
      </div>
      <div class="flip-back">
        <h2 style="margin:0">BACK SIDE</h2>
        <p>Check out the 3D effect!</p>
        <button style="padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer;">Action</button>
      </div>
    </div>
  </div>
</div>`}
        />
      </section>

      {/* 섹션 9: 사용자 경험을 완성하는 Cursor 속성 */}
      <section className="study-section">
        <h2 className="section-title">Cursor 속성</h2>
        <p className="section-description">
          마우스 커서 모양으로 요소의 상호작용 가능성을 암시합니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'cursor',
              type: 'radio',
              value: cursorType,
              onChange: setCursorType,
              options: [
                { value: 'pointer', label: 'pointer' },
                { value: 'not-allowed', label: 'not-allowed' },
                { value: 'grab', label: 'grab' },
                { value: 'text', label: 'text' },
                { value: 'help', label: 'help' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="cursor-demo"
          previewHeight="150px"
          codeHeight="250px"
          initialCss={`.cursor-box {
  cursor: ${cursorType};
  padding: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 8px;
  user-select: none;
}`}
          currentCss={`.cursor-box {
  cursor: ${cursorType};
  padding: 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 8px;
  user-select: none;
}`}
          initialHtml={`<div class="cursor-box">
  Hover to see: cursor: ${cursorType}
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>주요 cursor 값:</strong><br/>
  pointer (링크/버튼), not-allowed (비활성), grab (드래그 가능), text (텍스트 선택), help (도움말)
</div>`}
        />
      </section>

      {/* 섹션 10: 이벤트 제어 (pointer-events) */}
      <section className="study-section">
        <h2 className="section-title">pointer-events</h2>
        <p className="section-description">
          요소의 클릭/호버 이벤트를 완전히 무시하게 만듭니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'pointer-events',
              type: 'radio',
              value: pointerEvents,
              onChange: setPointerEvents,
              options: ['auto', 'none']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="pointer-events"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.overlay {
  position: relative;
  background: #dbeafe;
  padding: 2rem;
  border-radius: 8px;
}

.overlay-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 8px;
  pointer-events: ${pointerEvents};
}

.overlay button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`}
          currentCss={`.overlay {
  position: relative;
  background: #dbeafe;
  padding: 2rem;
  border-radius: 8px;
}

.overlay-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 8px;
  pointer-events: ${pointerEvents};
}

.overlay button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`}
          initialHtml={`<div class="overlay">
  <button>Click Me (Behind Overlay)</button>
  <div class="overlay-layer">
    Overlay (pointer-events: ${pointerEvents})
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>auto</strong>: 오버레이가 클릭을 차단<br/>
  <strong>none</strong>: 오버레이를 "투과"하여 아래 버튼 클릭 가능!
</div>`}
        />
      </section>

      {/* 섹션 11: 텍스트 선택 제어 (user-select) */}
      <section className="study-section">
        <h2 className="section-title">user-select</h2>
        <p className="section-description">
          텍스트 선택 가능 여부를 제어합니다. 버튼, 아이콘 등에 유용합니다.
        </p>

        <LiveCodeEditor
          scopeId="user-select"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.selectable {
  padding: 1rem;
  margin: 0.5rem 0;
  background: #d1fae5;
  color: #065f46;
  font-weight: 600;
  border-radius: 6px;
  user-select: text; /* 선택 가능 (기본값) */
}

.non-selectable {
  padding: 1rem;
  margin: 0.5rem 0;
  background: #fecaca;
  color: #7f1d1d;
  font-weight: 600;
  border-radius: 6px;
  user-select: none; /* 선택 불가 */
  cursor: default;
}`}
          initialHtml={`<div>
  <div class="selectable">
    ✅ This text is selectable (user-select: text)
  </div>
  
  <div class="non-selectable">
    ❌ Try to select this text (user-select: none)
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Use case:</strong> 버튼 텍스트, 아이콘, UI 컨트롤에 user-select: none을 사용하여 
  더블클릭 시 텍스트가 선택되는 것을 방지하세요.
</div>`}
        />
      </section>

      {/* 섹션 12: 실전 마이크로 인터랙션 버튼 시스템 */}
      <section className="study-section">
        <h2 className="section-title">실전 예제: 마이크로 인터랙션 버튼 시스템</h2>
        <p className="section-description">
          호버, 클릭, 로딩 상태를 직관적으로 전달하는 정교한 인터랙션 버튼입니다.
        </p>

        <LiveCodeEditor
          scopeId="interaction-practical-btn"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.magic-btn {
  position: relative;
  padding: 1rem 2.5rem;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 10px;
}

.magic-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.magic-btn:hover {
  background: #3b82f6;
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.magic-btn:hover::before {
  left: 100%;
}

.magic-btn:active {
  transform: scale(0.95);
}

.magic-btn .icon {
  transition: transform 0.3s ease;
}

.magic-btn:hover .icon {
  transform: translateX(5px) rotate(15deg);
}
`}
          initialHtml={`<div style="background: white; padding: 3rem; display: flex; justify-content: center; border-radius: 12px;">
  <button class="magic-btn">
    Get Started
    <span class="icon">🚀</span>
  </button>
</div>

<div class="info-box" style="margin-top: 1.5rem;">
  <strong>💡 인터랙션 요소:</strong><br/>
  1. <strong>Shimmer</strong>: 호버 시 <code>::before</code>가 왼쪽에서 오른쪽으로 흐릅니다.<br/>
  2. <strong>Scale</strong>: 클릭(active) 시 살짝 작아졌다가 돌아오며 누르는 재미를 줍니다.<br/>
  3. <strong>Icon Animation</strong>: 호버 시 아이콘만 따로 움직여 활력을 더합니다.
</div>`}
        />
      </section>
    </div>
  );
}

export default InteractionStudy;
