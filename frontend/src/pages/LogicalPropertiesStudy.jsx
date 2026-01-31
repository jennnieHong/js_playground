/**
 * LogicalPropertiesStudy.jsx
 * 다국어 및 글 흐름(RTL/LTR)에 대응하는 논리적 속성(Logical Properties) 실습 페이지
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function LogicalPropertiesStudy() {
  // 상태 관리: 읽기 방향 (ltr: 왼쪽에서 오른쪽, rtl: 오른쪽에서 왼쪽)
  const [direction, setDirection] = useState('ltr');

  return (
    <div className="page-container">
      <PageHeader
        title="Logical Properties"
        subtitle="Writing direction-agnostic layouts for the global web"
      />

      {/* 섹션 1: 논리적 속성(Logical)과 물리적 속성(Physical)의 개념 차이 */}
      <CollapsibleSection title="논리적 속성이란? (Logical vs Physical)">
        <div className="section-description">
          <p>
            기존의 <code>top, right, bottom, left</code>는 물리적인 방향을 의미합니다.
            하지만 세계에는 오른쪽에서 왼쪽(RTL)으로 읽는 언어도 있습니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><strong>Physical</strong>: 위, 아래, 왼쪽, 오른쪽 (고정)</li>
            <li><strong>Logical</strong>: 글의 시작/끝, 블록의 시작/끝 (흐름 기반)</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: 흐름 기반의 여백 설정 (Margin & Padding) */}
      <CollapsibleSection title="Margin & Padding (Logical)">
        <p className="section-description">
          <code>left / right</code> 대신 <code>inline-start / inline-end</code>를 사용하세요.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'Reading Direction',
              type: 'radio',
              value: direction,
              onChange: setDirection,
              options: [
                { value: 'ltr', label: 'LTR (English/Korean)' },
                { value: 'rtl', label: 'RTL (Arabic/Hebrew)' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="logical-spacing"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.demo-container {
  direction: ${direction};
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 4px solid #3b82f6;
}

.item {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 8px;
  
  /* 논리적 여백: 텍스트가 시작되는 방향에 여백 */
  margin-inline-end: 2rem;
}

.text-group {
  /* 논리적 보더: 텍스트 시작 지점에 선 */
  border-inline-start: 4px solid #ef4444;
  padding-inline-start: 1rem;
}`}
          currentCss={`.demo-container {
  direction: ${direction};
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 4px solid #3b82f6;
}

.item {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  border-radius: 8px;
  
  margin-inline-end: 2rem;
}

.text-group {
  border-inline-start: 4px solid #ef4444;
  padding-inline-start: 1rem;
}`}
          initialHtml={`<div class="demo-container">
  <div class="item">
    <div class="icon"></div>
    <div class="text-group">
      <strong>Modern Spacing</strong>
      <p style="margin: 0; font-size: 0.9rem;">
        방향을 바꾸면 여백의 위치도 자동으로 바뀝니다!
      </p>
    </div>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>inline-start</strong>: 시작 방향 (왼쪽 또는 오른쪽)<br/>
  <strong>inline-end</strong>: 끝 방향 (오른쪽 또는 왼쪽)
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: 흐름 기반의 크기 설정 (inline-size & block-size) */}
      <CollapsibleSection title="Size (Logical)">
        <p className="section-description">
          <code>width / height</code> 대신 <code>inline-size / block-size</code>를 사용합니다.
        </p>

        <LiveCodeEditor
          scopeId="logical-sizes"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.size-box {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  
  /* 가로 너비 (글의 흐름 방향) */
  inline-size: min(100%, 400px);
  
  /* 세로 높이 (블록 쌓임 방향) */
  block-size: 150px;
  
  overflow: auto;
}

.writing-mode-switcher {
  writing-mode: horizontal-tb; /* 기본값 */
}

.writing-mode-switcher.vertical {
  writing-mode: vertical-rl; /* 세로 쓰기 */
}`}
          initialHtml={`<div style="background: white; padding: 2rem; border-radius: 8px;">
  <div class="size-box">
    <h3>Inline vs Block</h3>
    <p>세로 쓰기 모드가 되면 너비와 높이의 개념이 뒤바뀝니다.</p>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>inline-size</strong>: 가로 언어에서는 width, 세로 언어에서는 height가 됩니다.<br/>
  글로벌 서비스를 준비한다면 이제 물리적 속성(width)보다 논리적 속성을 선호하세요.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: 논리적 위치 지정 (inset) */}
      <CollapsibleSection title="Inset (Logical Position)">
        <p className="section-description">
          <code>top, right, bottom, left</code>를 한 번에 또는 논리적으로 제어합니다.
        </p>

        <LiveCodeEditor
          scopeId="logical-inset"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`.floating-badge {
  position: absolute;
  background: #ef4444;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  
  /* 물리적: top: 0; right: 0; */
  /* 논리적: */
  inset-block-start: -10px;
  inset-inline-end: -10px;
}

.container {
  position: relative;
  width: 200px;
  height: 300px;
  background: #f1f5f9;
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  margin: 2rem;
}`}
          initialHtml={`<div class="container">
  <div class="floating-badge">99+</div>
  <div style="display: flex; height: 100%; align-items: center; justify-content: center; color: #64748b;">
    Card Container
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <code>inset: 0</code>은 top, right, bottom, left를 모두 0으로 만드는 단축 속성이기도 합니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: 실전 예제 - RTL/LTR에 완벽히 대응하는 글로벌 디자인 카드 */}
      <CollapsibleSection title="실전 예제: 다국어 지원 글로벌 카드">
        <p className="section-description">
          물리적 속성(Left/Right) 대신 논리적 속성(Start/End)을 사용하여 LTR과 RTL 환경 모두에 완벽히 대응하는 카드입니다.
        </p>

        <LiveCodeEditor
          scopeId="logical-practical-card"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`/* 컨테이너의 direction에 따라 방향이 전환됩니다 */
.global-card {
  direction: ltr; /* rtl로 바꿔보세요! */
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.avatar {
  width: 60px;
  height: 60px;
  background: #f1f5f9;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  
  /* 예전 방식: margin-right: 1.5rem; */
  /* 논리적 방식: (flex gap이 있으므로 생략 가능하나 학습용으로 기재) */
  margin-inline-end: 0.5rem;
}

.content {
  flex-grow: 1;
  /* 텍스트 시작 지점에 브랜드 컬러 라인 추가 */
  border-inline-start: 4px solid #6366f1;
  padding-inline-start: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.text {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
}
`}
          initialHtml={`<div class="global-card">
  <div class="avatar">👤</div>
  <div class="content">
    <h3 class="title">Global User</h3>
    <p class="text">
      이 카드는 논리적 속성을 사용합니다. CSS 코드 상단의 <code>direction: ltr</code>를 
      <code>rtl</code>로 변경해보세요. 모든 여백과 테두리 방향이 거울처럼 반전됩니다.
    </p>
  </div>
</div>

<div style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 실전 팁:</strong> 최근의 글로벌 웹 서비스들은 <code>Left/Right</code> 대신 
  <code>inline-start / inline-end</code> 사용을 강력히 권장하고 있습니다.
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default LogicalPropertiesStudy;
