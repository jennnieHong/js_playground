/**
 * DisplayStudy 페이지 컴포넌트
 * CSS display 속성(block, inline, inline-block, none, contents)과 시각적 제어(visibility)를 학습하는 페이지입니다.
 * 주요 개념: Block vs Inline 차이, 외부 디스플레이 제어, 요소 숨기기 기법(none vs hidden vs sr-only), display: contents 활용 실무
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function DisplayStudy() {
  // --- 상태 관리 (State Management) ---
  // display 속성값의 실시간 변화를 처리하기 위한 상태들입니다.
  const [displayValue, setDisplayValue] = useState('block');
  const [inlineDisplayValue, setInlineDisplayValue] = useState('inline');
  const [visibilityValue, setVisibilityValue] = useState('block');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Display Study"
        subtitle="Understanding how elements are displayed and laid out"
      />

      {/* Display 속성 기초 정의 섹션 */}

      <CollapsibleSection title="Display 속성이란?" >
        <div className="section-description">
          <p>
            <code>display</code> 속성은 요소가 <strong>화면에 어떻게 렌더링되는지</strong>를 결정합니다.<br />
            레이아웃의 가장 기본이 되는 속성으로, 모든 HTML 요소는 기본 display 값을 가집니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>block</code>: 새 줄에서 시작하며 전체 너비를 차지 (div, p, h1 등)</li>
            <li><code>inline</code>: 줄 안에 배치되며 콘텐츠 크기만큼만 차지 (span, a, strong 등)</li>
            <li><code>inline-block</code>: inline처럼 배치되지만 block처럼 크기 조정 가능</li>
            <li><code>none</code>: 요소를 완전히 숨김 (공간도 차지하지 않음)</li>
            <li><code>contents</code>: 요소 자체는 사라지고 자식만 렌더링</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: Block vs Inline (기본 흐름 제어) */}
      <CollapsibleSection title="Block vs Inline">
        <p className="section-description">
          가장 기본적이고 중요한 두 가지 display 값입니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'display',
              type: 'radio',
              value: displayValue,
              onChange: setDisplayValue,
              options: ['block', 'inline', 'inline-block']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="display-basic"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.demo-box {
  display: ${displayValue};
  width: 200px;
  height: 80px;
  padding: 1rem;
  margin: 0.5rem;
  background-color: #667eea;
  color: #ffffff;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}`}
          currentCss={`.demo-box {
  display: ${displayValue};
  width: 200px;
  height: 80px;
  padding: 1rem;
  margin: 0.5rem;
  background-color: #667eea;
  color: white;
  border-radius: 8px;
  text-align: center;
}`}
          initialHtml={`<div style="border: 2px dashed #ccc; padding: 10px;">
  <div class="demo-box">Box 1</div>
  <div class="demo-box">Box 2</div>
  <div class="demo-box">Box 3</div>
</div>

<p style="margin-top: 1rem; color: #1e293b; font-size: 0.9rem; background: #f1f5f9; padding: 0.75rem; border-radius: 6px;">
  <strong>관찰 포인트:</strong><br/>
  • <strong>block</strong>: 각 박스가 새 줄에 배치됨<br/>
  • <strong>inline</strong>: width/height가 무시되고 한 줄에 배치됨<br/>
  • <strong>inline-block</strong>: 한 줄에 배치되지만 크기 조정 가능
</p>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Inline 요소의 박스 모델 제한 확인 */}
      <CollapsibleSection title="Inline 요소의 특성">
        <p className="section-description">
          <code>inline</code> 요소는 텍스트처럼 동작합니다. width/height를 무시하고, 위아래 margin도 적용되지 않습니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'display',
              type: 'radio',
              value: inlineDisplayValue,
              onChange: setInlineDisplayValue,
              options: ['inline', 'inline-block', 'block']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="display-inline"
          previewHeight="200px"
          codeHeight="250px"
          initialCss={`.inline-demo {
  display: ${inlineDisplayValue};
  width: 150px;
  height: 50px;
  padding: 10px 20px;
  margin: 20px; /* inline일 때 위아래 margin 무시됨 */
  background-color: #f59e0b;
  color: #ffffff;
  font-weight: 600;
  border: 2px solid #d97706;
}`}
          currentCss={`.inline-demo {
  display: ${inlineDisplayValue};
  width: 150px;
  height: 50px;
  padding: 10px 20px;
  margin: 20px;
  background-color: #f59e0b;
  color: white;
  border: 2px solid #d97706;
}`}
          initialHtml={`<p>This is a paragraph with 
  <span class="inline-demo">inline element</span> 
  inside the text flow.
</p>

<p style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>inline</strong>일 때: width/height 무시, 위아래 margin 무시<br/>
  <strong>inline-block</strong>일 때: 모든 박스 모델 속성 적용 가능
</p>`}
        />
      </CollapsibleSection>

      {/* 실전 예제: Inline 요소 언제 쓸까? */}
      <CollapsibleSection title="Inline 요소 언제 쓸까? (실사용 예제)">
        <p className="section-description">
          Inline 요소는 텍스트 흐름 안에서 스타일을 적용할 때 사용합니다. 실제로 자주 사용하는 패턴들을 확인해보세요.
        </p>

        <LiveCodeEditor
          scopeId="inline-use-cases"
          previewHeight="400px"
          codeHeight="500px"
          initialCss={`.text-content {
  max-width: 700px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.8;
  color: #1e293b;
}

/* 1. 텍스트 강조 (가장 흔한 용도) */
.highlight {
  display: inline;
  background: linear-gradient(120deg, #fef3c7 0%, #fde68a 100%);
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 600;
}

.code-inline {
  display: inline;
  background: #f1f5f9;
  color: #e11d48;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  font-size: 0.9em;
}

/* 2. 링크와 아이콘 */
.link-with-icon {
  display: inline;
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 1px solid #93c5fd;
  transition: all 0.2s;
}

.link-with-icon:hover {
  color: #1d4ed8;
  border-bottom-color: #1d4ed8;
}

.icon {
  display: inline;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-left: 4px;
}

/* 3. 배지 (Badge) - inline-block 사용 */
.badge {
  display: inline-block; /* width/height 조절 위해 inline-block */
  background: #10b981;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
}

.badge.new {
  background: #ef4444;
}

/* 4. 작은 아이콘 이미지 */
.emoji-icon {
  display: inline;
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
  margin: 0 2px;
}

/* 5. 폼 라벨 안의 필수 표시 */
.required {
  display: inline;
  color: #ef4444;
  margin-left: 2px;
}
`}
          initialHtml={`<div class="text-content">
  <h3 style="margin-top: 0;">📝 텍스트 강조 예제</h3>
  <p>
    CSS에서 <span class="highlight">inline 요소</span>는 
    <span class="code-inline">display: inline</span> 속성을 가진 요소로, 
    텍스트 흐름을 깨지 않고 스타일을 적용할 수 있습니다.
  </p>

  <h3>🔗 링크와 아이콘</h3>
  <p>
    더 알아보려면 
    <a href="#" class="link-with-icon">
      문서를 확인하세요
      <span class="icon">🔗</span>
    </a>
  </p>

  <h3>🏷️ 배지 활용</h3>
  <p>
    새로운 기능<span class="badge new">NEW</span>이 추가되었습니다. 
    프리미엄 플랜<span class="badge">PRO</span>에서 사용 가능합니다.
  </p>

  <h3>😀 이모지 아이콘</h3>
  <p>
    사용자 <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234ade80'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E" class="emoji-icon" alt="user"> 홍길동님이 
    댓글 <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2360a5fa'%3E%3Cpath d='M2 4a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2h-4l-4 4-4-4H4a2 2 0 01-2-2V4z'/%3E%3C/svg%3E" class="emoji-icon" alt="comment"> 3개를 남겼습니다.
  </p>

  <h3>📋 폼 라벨</h3>
  <p style="margin: 0;">
    <label style="font-weight: 600;">
      이름<span class="required">*</span>
    </label>
  </p>
</div>

<div style="margin-top: 1.5rem; background: #dbeafe; color: #1e3a8a; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 핵심 포인트:</strong><br/>
  • <strong>텍스트와 함께</strong> 사용할 때 inline<br/>
  • <strong>크기 조절이 필요하면</strong> inline-block (배지, 버튼 등)<br/>
  • <strong>전체 줄을 차지해야 하면</strong> block
</div>`}
        />
      </CollapsibleSection>

      {/* 의사결정 가이드: Inline vs Inline-Block vs Block */}
      <CollapsibleSection title="선택 가이드: Inline vs Inline-Block vs Block">
        <p className="section-description">
          어떤 display 값을 선택해야 할지 고민될 때 이 가이드를 참고하세요.
        </p>

        <LiveCodeEditor
          scopeId="display-decision-guide"
          previewHeight="450px"
          codeHeight="550px"
          initialCss={`.decision-container {
  max-width: 800px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  color: #1e293b;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.display-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.display-card h4 {
  margin: 0 0 1rem 0;
  color: #1e293b;
  font-size: 1.1rem;
}

.display-card.inline {
  border-color: #f59e0b;
  background: #fef3c7;
}

.display-card.inline-block {
  border-color: #8b5cf6;
  background: #ede9fe;
}

.display-card.block {
  border-color: #10b981;
  background: #d1fae5;
}

.feature-list {
  text-align: left;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #475569;
}

.feature-list li {
  margin-bottom: 0.5rem;
}

.checkmark {
  color: #10b981;
  font-weight: bold;
}

.xmark {
  color: #ef4444;
  font-weight: bold;
}

/* 실제 예제 섹션 */
.example-section {
  background: #f1f5f9;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.example-section h4 {
  margin-top: 0;
  color: #1e293b;
}

/* 예제 요소들 */
.demo-inline {
  display: inline;
  background: #fef3c7;
  border: 2px solid #f59e0b;
  padding: 4px 8px;
  margin: 4px;
}

.demo-inline-block {
  display: inline-block;
  background: #ede9fe;
  border: 2px solid #8b5cf6;
  padding: 8px 16px;
  margin: 4px;
  width: 100px;
  height: 50px;
  text-align: center;
}

.demo-block {
  display: block;
  background: #d1fae5;
  border: 2px solid #10b981;
  padding: 8px 16px;
  margin: 8px 0;
  width: 200px;
  text-align: center;
}
`}
          initialHtml={`<div class="decision-container">
  <h3 style="margin-top: 0; text-align: center;">🤔 어떤 Display를 선택할까?</h3>
  
  <div class="comparison-grid">
    <div class="display-card inline">
      <h4>Inline</h4>
      <ul class="feature-list">
        <li><span class="checkmark">✓</span> 텍스트 흐름 유지</li>
        <li><span class="xmark">✗</span> width/height 무시</li>
        <li><span class="xmark">✗</span> 상하 margin 무시</li>
        <li><span class="checkmark">✓</span> 좌우 margin OK</li>
      </ul>
      <p style="font-size: 0.8rem; color: #92400e; margin-top: 1rem; font-weight: 600;">
        📍 사용: 텍스트 강조, 링크
      </p>
    </div>

    <div class="display-card inline-block">
      <h4>Inline-Block</h4>
      <ul class="feature-list">
        <li><span class="checkmark">✓</span> 한 줄에 배치</li>
        <li><span class="checkmark">✓</span> width/height 적용</li>
        <li><span class="checkmark">✓</span> 모든 margin 적용</li>
        <li><span class="checkmark">✓</span> 모든 padding 적용</li>
      </ul>
      <p style="font-size: 0.8rem; color: #5b21b6; margin-top: 1rem; font-weight: 600;">
        📍 사용: 버튼, 배지, 카드
      </p>
    </div>

    <div class="display-card block">
      <h4>Block</h4>
      <ul class="feature-list">
        <li><span class="checkmark">✓</span> 전체 너비 차지</li>
        <li><span class="checkmark">✓</span> 새 줄에서 시작</li>
        <li><span class="checkmark">✓</span> 모든 박스 모델 적용</li>
        <li><span class="checkmark">✓</span> 레이아웃 컨테이너</li>
      </ul>
      <p style="font-size: 0.8rem; color: #065f46; margin-top: 1rem; font-weight: 600;">
        📍 사용: 섹션, 컨테이너
      </p>
    </div>
  </div>

  <div class="example-section">
    <h4>👀 시각적 비교</h4>
    <p style="margin: 0.5rem 0; font-size: 0.9rem; color: #64748b;">
      동일한 스타일을 적용했을 때의 차이:
    </p>
    
    <div style="border: 2px dashed #cbd5e1; padding: 1rem; background: white; border-radius: 6px;">
      <span class="demo-inline">inline</span>
      <span class="demo-inline">inline</span>
      <span class="demo-inline">width/height 무시됨</span>
      
      <div style="margin: 1rem 0; border-top: 1px solid #e2e8f0;"></div>
      
      <div class="demo-inline-block">inline-block</div>
      <div class="demo-inline-block">크기 적용</div>
      
      <div style="margin: 1rem 0; border-top: 1px solid #e2e8f0;"></div>
      
      <div class="demo-block">block</div>
      <div class="demo-block">전체 줄 차지</div>
    </div>
  </div>

  <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin-top: 1.5rem; border-left: 4px solid #f59e0b;">
    <strong style="color: #92400e;">🎯 빠른 선택 팁:</strong>
    <ul style="margin: 0.5rem 0 0 0; color: #92400e; font-size: 0.9rem;">
      <li>문장 안에 들어갈 거면 → <strong>inline</strong></li>
      <li>한 줄에 여러 개 + 크기 조절 필요 → <strong>inline-block</strong></li>
      <li>섹션/컨테이너/레이아웃 → <strong>block</strong></li>
    </ul>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: 요소 숨기기 방식 비교 (차지하는 공간 중심) */}
      <CollapsibleSection title="Display: None vs Visibility: Hidden">
        <p className="section-description">
          요소를 숨기는 두 가지 방법의 차이점을 확인하세요.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'Box 2 상태',
              type: 'radio',
              value: visibilityValue,
              onChange: setVisibilityValue,
              options: [
                { value: 'block', label: 'Visible (block)' },
                { value: 'none', label: 'display: none' },
                { value: 'hidden', label: 'visibility: hidden' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="display-none"
          previewHeight="200px"
          codeHeight="250px"
          initialCss={`.box {
  width: 150px;
  height: 100px;
  margin: 10px;
  background-color: #10b981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.box-2 {
  ${visibilityValue === 'none' ? 'display: none;' : visibilityValue === 'hidden' ? 'visibility: hidden;' : 'display: block;'}
  background-color: #ef4444;
}`}
          currentCss={`.box {
  width: 150px;
  height: 100px;
  margin: 10px;
  background-color: #10b981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.box-2 {
  ${visibilityValue === 'none' ? 'display: none;' : visibilityValue === 'hidden' ? 'visibility: hidden;' : 'display: block;'}
  background-color: #ef4444;
}`}
          initialHtml={`<div style="display: flex; gap: 10px;">
  <div class="box">Box 1</div>
  <div class="box box-2">Box 2</div>
  <div class="box">Box 3</div>
</div>

<p style="margin-top: 1rem; color: #666; font-size: 0.9rem;">
  <strong>display: none</strong>: 요소가 완전히 사라지고 공간도 차지하지 않음<br/>
  <strong>visibility: hidden</strong>: 요소는 안보이지만 공간은 유지됨
</p>`}
        />
      </CollapsibleSection>

      {/* 비교 섹션: 접근성 및 현대적인 숨김 처리 기법 */}
      <CollapsibleSection title="Hiding Methods (요즘 숨기기 방식)">
        <p className="section-description">
          요소를 숨기는 방식에는 여러 가지가 있으며, 각각 레이아웃과 접근성에 미치는 영향이 다릅니다.
        </p>
        <LiveCodeEditor
          scopeId="hiding-methods-comparison"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.grid-hiding {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

.item-box {
  padding: 1.5rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  text-align: center;
  border-radius: 8px;
  color: #1e293b;
}

/* 1. opacity: 0 - 투명해질 뿐 공간은 차지, 클릭 가능 */
.hide-opacity {
  opacity: 0;
}

/* 2. visibility: hidden - 공간은 차지하지만 클릭 불가 (접근성 트리에서 제외되기도 함) */
.hide-visibility {
  visibility: hidden;
}

/* 3. display: none - 아예 없는 것처럼 취급 (공간 X, 클릭 X) */
.hide-display {
  display: none;
}

/* 4. Screen Reader Only (접근성 표준) - 눈에는 안 보이지만 스크린 리더는 읽음 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
`}
          initialHtml={`<div class="grid-hiding">
  <div class="item-box hide-opacity">Opacity: 0</div>
  <div class="item-box hide-visibility">Visibility: Hidden</div>
  <div class="item-box hide-display">Display: None</div>
  
  <div class="item-box">Visible 1</div>
  <div class="item-box">Visible 2</div>
  <div class="item-box">
    SR Only
    <span class="sr-only">이 텍스트는 보이지 않지만 스크린 리더가 읽습니다.</span>
  </div>
</div>

<div style="margin-top: 1.5rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>차이점 요약:</strong><br/>
  • <strong>Opacity</strong>: 공간 OK, 탭 순서/클릭 OK<br/>
  • <strong>Visibility</strong>: 공간 OK, 탭 순서/클릭 NO<br/>
  • <strong>Display</strong>: 공간 NO, 탭 순서/클릭 NO<br/>
  • <strong>SR-Only</strong>: 접근성을 위해 매우 중요한 기법 (버튼 라벨 등)
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: display: contents를 활용한 불필요한 래퍼 제거 */}
      <CollapsibleSection title="실전 예제: Semantic Wrapper in Grid">
        <p className="section-description">
          데이터 구조상 래퍼(Wrapper)가 필요한 상황에서도 그리드 레이아웃을 망가뜨리지 않고 자식들을 직접 부모 그리드에 참여시킬 수 있습니다.
        </p>

        <LiveCodeEditor
          scopeId="display-contents-practical"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.grid-form {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 15px;
  max-width: 500px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* 이 래퍼들이 display: contents가 없으면 그리드 1:1 대응이 깨집니다 */
/* 
  이유: Grid는 직계 자식만 grid item으로 인식합니다.
  - display: contents 없이: .field-group이 grid item이 되어 1개 셀만 차지 → 2열 구조 깨짐
  - display: contents 사용: .field-group은 무시되고, .label과 .input-container가 직접 grid item이 됨 → 2열 구조 유지
*/
.field-group {
  display: contents; /* 이 줄을 주석처리하면 레이아웃이 깨집니다 */
}

.label {
  font-weight: bold;
  color: #4a5568;
  display: flex;
  align-items: center;
}

.input-container {
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  width: 100%;
}

.helper-text {
  font-size: 0.8rem;
  color: #718096;
  margin-top: 4px;
}
`}
          initialHtml={`<div class="grid-form">
  <!-- Group 1 -->
  <div class="field-group">
    <div class="label">Username</div>
    <div class="input-container">
      <input type="text" placeholder="Enter username">
      <span class="helper-text">Must be unique</span>
    </div>
  </div>

  <!-- Group 2 -->
  <div class="field-group">
    <div class="label">Email</div>
    <div class="input-container">
      <input type="email" placeholder="Enter email">
    </div>
  </div>

  <!-- Group 3 -->
  <div class="field-group">
    <div class="label">Password</div>
    <div class="input-container">
      <input type="password" placeholder="Min 8 characters">
      <span class="helper-text">Use symbols for security</span>
    </div>
  </div>
</div>

<p style="margin-top: 1.5rem; color: #1e293b; background: #e0f2fe; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 실무 팁:</strong><br/>
  프레임워크(React 등)에서 룩업 데이터나 공통 로직을 위해 컴포넌트를 나눌 때, <code>div</code>로 감싸야만 하는 경우가 있습니다.<br/>
  이때 <code>display: contents;</code>를 활용하면 불필요한 레이아웃 레벨을 제거할 수 있습니다.
</p>`}
        />
      </CollapsibleSection>
    </div >
  );
}

export default DisplayStudy;
