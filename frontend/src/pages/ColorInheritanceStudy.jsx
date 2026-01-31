/**
 * ColorInheritanceStudy 페이지 컴포넌트
 * CSS 색상 상속과 적용 우선순위를 학습하는 페이지입니다.
 * 주요 개념: 상속, 중첩 요소 우선순위, color가 적용되지 않는 케이스
 */
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function ColorInheritanceStudy() {
  return (
    <div className="page-container">
      <PageHeader
        title="Color 상속과 적용"
        subtitle="왜 내 색상이 적용 안 되지? 상속, 중첩, 예외 케이스 완벽 이해"
      />

      {/* 섹션 1: 핵심 개념 - CSS 상속이란? */}
      <CollapsibleSection title="🎯 핵심 개념: CSS 상속이란?">
        <div className="section-description">
          <p>
            CSS의 일부 속성은 <strong>부모 요소에서 자식 요소로 자동 전달</strong>됩니다.
            이것을 <strong>상속(Inheritance)</strong>이라고 합니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#065f46' }}>✅ 상속되는 속성</h4>
              <ul style={{ marginBottom: 0, color: '#047857', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li><code>color</code> - 글자 색상</li>
                <li><code>font-family</code> - 글꼴</li>
                <li><code>font-size</code> - 글자 크기</li>
                <li><code>font-weight</code> - 글자 굵기</li>
                <li><code>line-height</code> - 줄 높이</li>
                <li><code>text-align</code> - 텍스트 정렬</li>
                <li><code>visibility</code> - 가시성</li>
                <li><code>cursor</code> - 커서 모양</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>❌ 상속되지 않는 속성</h4>
              <ul style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li><code>margin</code>, <code>padding</code></li>
                <li><code>border</code></li>
                <li><code>background</code></li>
                <li><code>width</code>, <code>height</code></li>
                <li><code>position</code></li>
                <li><code>display</code></li>
                <li><code>opacity</code></li>
                <li><code>transform</code></li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>💡 기억하세요!</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#075985', lineHeight: '1.7' }}>
              주로 <strong>텍스트 관련 속성</strong>이 상속됩니다.<br/>
              <strong>박스 모델 관련 속성</strong>(margin, padding, border, background 등)은 상속되지 않습니다.
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="inheritance-basic"
          previewHeight="300px"
          codeHeight="300px"
          initialCss={`.parent {
  color: blue;           /* ✅ 상속됨 */
  font-size: 18px;       /* ✅ 상속됨 */
  background: #f0f0f0;   /* ❌ 상속 안됨 */
  padding: 20px;         /* ❌ 상속 안됨 */
  border: 3px solid red; /* ❌ 상속 안됨 */
  border-radius: 12px;
}

.child {
  /* 아무 스타일도 지정하지 않았지만... */
  /* color와 font-size는 부모에게서 상속받음! */
}`}
          initialHtml={`<div class="parent">
  부모 요소의 텍스트 (파란색, 18px)
  
  <div class="child">
    <p>자식 요소의 텍스트</p>
    <p>color와 font-size가 상속됨!</p>
    <p>하지만 background, padding, border는 상속 안됨</p>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; font-size: 0.9rem; color: #92400e;">
  <strong>관찰:</strong> 자식 요소는 파란색 글자와 18px 크기를 상속받았지만, 
  회색 배경, 패딩, 빨간 테두리는 상속받지 않았습니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 2: 중첩 요소에서 color 적용 우선순위 */}
      <CollapsibleSection title="📊 중첩 요소에서 color 우선순위">
        <div className="section-description">
          <p>
            여러 요소가 중첩되어 있을 때, <strong>가장 가까운 조상의 color</strong>가 적용됩니다.
            물론 명시도(Specificity)가 더 높으면 그것이 우선됩니다!
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
            <h4 style={{ marginTop: 0, color: '#fbbf24' }}>🎯 Color 적용 우선순위 (높은 것 → 낮은 것)</h4>
            <ol style={{ marginBottom: 0, lineHeight: '2', fontSize: '0.95rem' }}>
              <li><span style={{ color: '#ef4444' }}>!important</span></li>
              <li><span style={{ color: '#f59e0b' }}>인라인 스타일</span> <code style={{ color: '#94a3b8' }}>style="color: ..."</code></li>
              <li><span style={{ color: '#10b981' }}>ID 선택자</span> <code style={{ color: '#94a3b8' }}>#id</code></li>
              <li><span style={{ color: '#3b82f6' }}>클래스 선택자</span> <code style={{ color: '#94a3b8' }}>.class</code></li>
              <li><span style={{ color: '#8b5cf6' }}>태그 선택자</span> <code style={{ color: '#94a3b8' }}>p, div</code></li>
              <li><span style={{ color: '#64748b' }}>상속된 값</span> (가장 낮음)</li>
            </ol>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>⚠️ 핵심 포인트</strong>
            <p style={{ marginTop: '0.25rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7' }}>
              상속된 color는 <strong>가장 낮은 우선순위</strong>를 가집니다.<br/>
              태그 선택자 <code>p {'{ color: black; }'}</code>만 있어도 상속을 이깁니다!
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="inheritance-priority"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`/* 조상 요소들에 각각 다른 색상 */
.grandparent {
  color: red;
  padding: 1rem;
  border: 2px solid red;
  border-radius: 12px;
  background: #fef2f2;
}

.parent {
  color: blue;
  padding: 1rem;
  margin-top: 0.5rem;
  border: 2px solid blue;
  border-radius: 8px;
  background: #eff6ff;
}

.child {
  color: green;
  padding: 1rem;
  margin-top: 0.5rem;
  border: 2px solid green;
  border-radius: 6px;
  background: #f0fdf4;
}

/* 상속 vs 직접 지정 */
.inherited-test {
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 6px;
  background: white;
}

/* 태그 선택자가 상속을 이김! */
p {
  color: purple;
}`}
          initialHtml={`<div class="grandparent">
  할아버지 (color: red)
  
  <div class="parent">
    부모 (color: blue)
    
    <div class="child">
      자식 (color: green) - 가장 가까운 color가 적용됨!
    </div>
  </div>
</div>

<div class="grandparent" style="margin-top: 1rem;">
  할아버지 (color: red)
  
  <div class="inherited-test">
    <p>이 텍스트는 무슨 색일까요?</p>
    <span>span은 상속받은 빨간색</span>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #475569; line-height: 1.7;">
  <strong>관찰:</strong><br/>
  • &lt;p&gt;: 보라색 (태그 선택자 > 상속)<br/>
  • &lt;span&gt;: 빨간색 (상속된 값, 태그 선택자 없음)
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: Color가 적용되지 않는 케이스 */}
      <CollapsibleSection title="⚠️ Color가 적용되지 않는 케이스">
        <div className="section-description">
          <p>
            <code>color</code> 속성을 설정했는데 적용되지 않는 경우가 있습니다.
            이런 케이스들을 알아봅시다!
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>1. &lt;a&gt; 링크 태그</h4>
              <p style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.7', fontSize: '0.9rem' }}>
                브라우저 기본 스타일(<code>a {'{ color: blue; }'}</code>)이 있어서 
                <strong>상속이 무시</strong>됩니다.<br/>
                직접 <code>a</code>에 color를 지정해야 합니다!
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>2. &lt;button&gt; 버튼 태그</h4>
              <p style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.7', fontSize: '0.9rem' }}>
                브라우저 기본 스타일이 있어서 상속이 무시됩니다.<br/>
                <code>button {'{ color: inherit; }'}</code>로 상속 강제 가능!
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>3. &lt;input&gt; 입력 필드</h4>
              <p style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.7', fontSize: '0.9rem' }}>
                폼 요소들은 브라우저 기본 스타일이 강력합니다.<br/>
                직접 선택하거나 <code>color: inherit</code>을 사용하세요.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>4. SVG 요소</h4>
              <p style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.7', fontSize: '0.9rem' }}>
                SVG는 <code>color</code> 대신 <code>fill</code>을 사용합니다.<br/>
                <code>fill: currentColor</code>로 부모 color 사용 가능!
              </p>
            </div>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="color-exceptions"
          previewHeight="450px"
          codeHeight="500px"
          initialCss={`.test-container {
  color: red;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
}

.test-container h4 {
  margin-top: 0;
  color: #1e293b;
}

/* 기본: 상속이 안 되는 요소들 */

/* 해결책 1: 직접 선택 */
.test-container a {
  color: red;
}

/* 해결책 2: inherit 사용. color: inherit;로 부모 color를 상속받음 */
.test-container button.fixed {
  color: inherit;
  background: transparent;
  border: 1px solid currentColor;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

/* 해결책 3: currentColor 활용 */
.test-container svg.fixed {
  fill: currentColor;
}

.row {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.label {
  width: 120px;
  font-weight: 600;
  color: #64748b !important;
  font-size: 0.85rem;
}`}
          initialHtml={`<div class="test-container">
  <h4>부모 요소: color: red</h4>
  
  <div class="row">
    <span class="label">일반 텍스트:</span>
    <span>빨간색 (상속 O)</span>
  </div>
  
  <div class="row">
    <span class="label">&lt;a&gt; 기본:</span>
    <a href="#">파란색 (상속 X)</a>
  </div>
  
  <div class="row">
    <span class="label">&lt;button&gt; 기본:</span>
    <button>검은색 (상속 X)</button>
  </div>
  
  <div class="row">
    <span class="label">&lt;input&gt; 기본:</span>
    <input type="text" value="검은색 (상속 X)" style="padding: 0.25rem;">
  </div>
  
  <hr style="margin: 1.5rem 0; border: none; border-top: 2px dashed #e2e8f0;">
  
  <h4 style="color: green !important;">해결된 버전 (직접 스타일링 또는 inherit)</h4>
  
  <div class="row">
    <span class="label">&lt;a&gt; 수정:</span>
    <a href="#" style="color: inherit;">빨간색 (color: inherit)</a>
  </div>
  
  <div class="row">
    <span class="label">&lt;button&gt; 수정:</span>
    <button class="fixed">빨간색 (color: inherit)</button>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: inherit, initial, unset 키워드 */}
      <CollapsibleSection title="🔧 inherit, initial, unset, revert 키워드">
        <div className="section-description">
          <p>
            CSS는 상속을 제어하기 위한 특별한 키워드를 제공합니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>inherit</h4>
              <p style={{ marginBottom: 0, color: '#0e7490', lineHeight: '1.7', fontSize: '0.9rem' }}>
                <strong>부모의 값을 강제로 상속</strong>받습니다.<br/>
                상속되지 않는 속성도 상속받게 할 수 있습니다.
              </p>
              <code style={{ display: 'block', marginTop: '0.75rem', padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                button {'{ color: inherit; }'}
              </code>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h4 style={{ marginTop: 0, color: '#b45309' }}>initial</h4>
              <p style={{ marginBottom: 0, color: '#92400e', lineHeight: '1.7', fontSize: '0.9rem' }}>
                속성의 <strong>CSS 기본값</strong>으로 리셋합니다.<br/>
                브라우저 기본 스타일이 아닌 CSS 스펙 기본값!
              </p>
              <code style={{ display: 'block', marginTop: '0.75rem', padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                color: initial; /* → 검은색 */
              </code>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#059669' }}>unset</h4>
              <p style={{ marginBottom: 0, color: '#047857', lineHeight: '1.7', fontSize: '0.9rem' }}>
                <strong>상속되는 속성</strong>이면 inherit 처럼,<br/>
                <strong>상속 안 되는 속성</strong>이면 initial 처럼 동작!
              </p>
              <code style={{ display: 'block', marginTop: '0.75rem', padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                all: unset; /* 모든 속성 리셋 */
              </code>
            </div>

            <div style={{ padding: '1.5rem', background: '#fce7f3', borderRadius: '12px', border: '2px solid #ec4899' }}>
              <h4 style={{ marginTop: 0, color: '#be185d' }}>revert</h4>
              <p style={{ marginBottom: 0, color: '#9d174d', lineHeight: '1.7', fontSize: '0.9rem' }}>
                <strong>브라우저 기본 스타일</strong>로 되돌립니다.<br/>
                사용자 스타일시트 → 브라우저 기본값 순서로 롤백.
              </p>
              <code style={{ display: 'block', marginTop: '0.75rem', padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                button {'{ all: revert; }'}
              </code>
            </div>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="inherit-keywords"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.demo {
  color: blue;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.demo p {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
}

/* inherit: 부모 색상 강제 상속 */
.text-inherit { color: inherit; }

/* initial: CSS 기본값 (보통 검은색) */
.text-initial { color: initial; }

/* unset: 상속 속성이므로 inherit처럼 동작 */
.text-unset { color: unset; }

/* 버튼에 all: unset 적용 */
.btn-unset {
  all: unset;
  cursor: pointer;
  color: blue;
}`}
          initialHtml={`<div class="demo">
  <strong>부모: color: blue</strong>
  
  <p class="text-inherit">color: inherit → 파란색 (부모 색상 상속)</p>
  <p class="text-initial">color: initial → 검은색 (CSS 기본값)</p>
  <p class="text-unset">color: unset → 파란색 (상속 속성이므로 inherit)</p>
  
  <p style="margin-top: 1rem;">
    <button>일반 버튼</button>
    <button class="btn-unset">all: unset 버튼</button>
  </p>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; font-size: 0.9rem; color: #075985;">
  <strong>💡 all: unset</strong>은 모든 CSS 속성을 리셋해서 
  버튼의 기본 스타일(배경, 테두리, 패딩 등)이 모두 사라집니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: currentColor 활용 */}
      <CollapsibleSection title="🎨 currentColor - color 값 재사용">
        <div className="section-description">
          <p>
            <code>currentColor</code>는 현재 요소의 <code>color</code> 값을 다른 속성에서 사용할 수 있게 해줍니다.
            border, box-shadow, SVG fill 등에서 유용합니다!
          </p>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#d1fae5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>💡 currentColor 사용 예시</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#047857', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li><code>border: 1px solid currentColor</code> - 글자색과 같은 테두리</li>
              <li><code>box-shadow: 0 4px 12px currentColor</code> - 글자색 그림자</li>
              <li><code>fill: currentColor</code> - SVG에 글자색 적용</li>
              <li><code>background: currentColor</code> - 글자색 배경</li>
            </ul>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="current-color"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.btn-primary {
  color: #3b82f6;
  background: transparent;
  border: 2px solid currentColor;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  color: white;
  background: #3b82f6;
}

.btn-danger {
  color: #ef4444;
  background: transparent;
  border: 2px solid currentColor;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.icon-text {
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-text svg {
  fill: currentColor;
  width: 24px;
  height: 24px;
}`}
          initialHtml={`<div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1.5rem; background: white; border-radius: 12px;">
  
  <div>
    <p style="margin: 0 0 0.75rem; color: #64748b; font-size: 0.9rem;">버튼 테두리에 currentColor 사용:</p>
    <button class="btn-primary">Primary Button</button>
    <button class="btn-danger" style="margin-left: 0.5rem;">Danger Button</button>
  </div>
  
  <div class="icon-text">
    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    <span>SVG fill: currentColor (초록색 글자 → 초록색 아이콘)</span>
  </div>
  
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; font-size: 0.9rem; color: #92400e; line-height: 1.7;">
  <strong>✨ 장점:</strong> color 값만 바꾸면 border, SVG도 자동으로 같이 변경됩니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 6: 실전 팁 */}
      <CollapsibleSection title="💼 실전 팁: 색상 상속 전략">
        <div className="section-description">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>1️⃣ body에 기본 color 설정</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: '0.5rem 0 0' }}>
{`body {
  color: #1e293b;  /* 기본 글자색 */
  font-family: sans-serif;
}`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h4 style={{ marginTop: 0, color: '#b45309' }}>2️⃣ 폼 요소에 inherit 선언</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: '0.5rem 0 0' }}>
{`button, input, select, textarea {
  color: inherit;
  font: inherit;
}`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#059669' }}>3️⃣ 링크 기본 스타일 리셋</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: '0.5rem 0 0' }}>
{`a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#fce7f3', borderRadius: '12px', border: '2px solid #ec4899' }}>
              <h4 style={{ marginTop: 0, color: '#be185d' }}>4️⃣ currentColor로 일관성 유지</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: '0.5rem 0 0' }}>
{`.icon-button {
  color: var(--primary);
  border: 2px solid currentColor;
}
.icon-button svg {
  fill: currentColor;
}`}
              </pre>
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

export default ColorInheritanceStudy;
