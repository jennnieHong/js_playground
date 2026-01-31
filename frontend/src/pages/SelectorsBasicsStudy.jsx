/**
 * SelectorsBasicsStudy 페이지 컴포넌트
 * CSS 선택자의 다양한 조합 방법(.container.item vs .container .item)과
 * 클래스 네이밍 컨벤션(BEM, OOCSS 등)을 학습하는 페이지입니다.
 */
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function SelectorsBasicsStudy() {
  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="CSS Selectors & Naming"
        subtitle="선택자 조합과 클래스 네이밍 컨벤션 마스터하기"
      />

      {/* 선택자 조합 소개 섹션 */}
      <CollapsibleSection title="선택자 조합이란?">
        <div className="section-description">
          <p>
            CSS 선택자는 <strong>다양한 방법으로 조합</strong>하여 정확한 요소를 타겟팅할 수 있습니다.
            <br />
            같은 클래스명을 사용해도 조합 방법에 따라 완전히 다른 의미를 가집니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>.container.item</code> - 두 클래스를 <strong>모두</strong> 가진 요소</li>
            <li><code>.container .item</code> - container <strong>안의</strong> 모든 item (자손)</li>
            <li><code>.container &gt; .item</code> - container의 <strong>직계 자식</strong> item만</li>
            <li><code>.container + .item</code> - container <strong>바로 다음</strong> 형제 item</li>
            <li><code>.container ~ .item</code> - container <strong>이후 모든</strong> 형제 item</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 1. 다중 클래스 vs 자손 선택자 */}
      <CollapsibleSection title="핵심 차이: .container.item vs .container .item">
        <p className="section-description">
          가장 헷갈리는 두 패턴의 차이를 명확하게 이해해보세요.
        </p>

        <LiveCodeEditor
          scopeId="multi-class-vs-descendant"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`/* 1. .container.item (띄어쓰기 없음) - 같은 요소에 두 클래스 모두 */
.container.item {
  background: #fbbf24;
  color: #78350f;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
}

/* 2. .container .item (띄어쓰기 있음) - container 안의 모든 .item */
.container .item {
  background: #60a5fa;
  color: #1e3a8a;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  margin: 0.5rem 0;
}

/* 비교를 위한 기본 스타일 */
.container {
  background: #f3f4f6;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 2px solid #d1d5db;
}

.item {
  background: #d1fae5;
  color: #065f46;
  padding: 1rem;
  border-radius: 8px;
  margin: 0.5rem 0;
}
`}
          initialHtml={`<div style="background: white; padding: 1.5rem; border-radius: 8px;">
  <h4 style="margin-top: 0;">📍 패턴 1: .container.item (띄어쓰기 없음)</h4>
  <p style="color: #64748b; font-size: 0.9rem;">→ class="container item" 두 개 모두 있는 요소에만 적용</p>
  
  <div class="container item">
    나는 container와 item 클래스를 모두 가지고 있어요! ✨
  </div>
  
  <div class="container">
    container만 있어요
  </div>
  
  <div class="item">
    item만 있어요
  </div>

  <hr style="margin: 2rem 0; border: 1px solid #e5e7eb;">

  <h4>📍 패턴 2: .container .item (띄어쓰기 있음)</h4>
  <p style="color: #64748b; font-size: 0.9rem;">→ .container 안에 있는 모든 .item 요소에 적용</p>
  
  <div class="container">
    <div class="item">나는 container 안의 item이에요! 🎯</div>
    <div class="item">나도 container 안의 item! 🎯</div>
    
    <div style="background: #fef3c7; padding: 1rem; border-radius: 6px; margin-top: 0.5rem;">
      <div class="item">중첩된 div 안의 item도 선택돼요! 🎯</div>
    </div>
  </div>
  
  <div class="item">
    container 밖의 item이라 스타일 안 적용됨 ❌
  </div>
</div>

<div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #f59e0b;">
  <strong>🎯 핵심 정리:</strong><br/>
  • <code>.container.item</code> → <strong>동일 요소</strong>에 두 클래스 모두<br/>
  • <code>.container .item</code> → container <strong>안의</strong> item (자손 관계)
</div>`}
        />
      </CollapsibleSection>

      {/* 2. 모든 선택자 조합 비교 */}
      <CollapsibleSection title="선택자 조합 완전 정복">
        <p className="section-description">
          자손, 자식, 형제 선택자의 차이를 시각적으로 확인하세요.
        </p>

        <LiveCodeEditor
          scopeId="all-selector-combinations"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`/* 비교를 위한 공통 스타일 */
.parent {
  background: #f3f4f6;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 2px dashed #9ca3af;
}

.box {
  background: #e5e7eb;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 6px;
  color: #1e293b;
}

/* 1. 자손 선택자 (Descendant): 공백 */
.parent .child {
  background: #bfdbfe;
  color: #1e3a8a;
  border-left: 4px solid #3b82f6;
}

/* 2. 직계 자식 선택자 (Direct Child): > */
.parent > .direct-child {
  background: #fde68a;
  color: #78350f;
  border-left: 4px solid #f59e0b;
}

/* 3. 인접 형제 선택자 (Adjacent Sibling): + */
.trigger + .adjacent {
  background: #d1fae5;
  color: #065f46;
  border-left: 4px solid #10b981;
}

/* 4. 일반 형제 선택자 (General Sibling): ~ */
.trigger ~ .sibling {
  background: #fce7f3;
  color: #831843;
  border-left: 4px solid #ec4899;
}
`}
          initialHtml={`<div style="background: white; padding: 1.5rem; border-radius: 8px;">
  <h4 style="margin-top: 0;">1️⃣ 자손 선택자: .parent .child</h4>
  <p style="color: #64748b; font-size: 0.9rem;">parent 안의 <strong>모든 깊이</strong>의 child 선택</p>
  
  <div class="parent">
    <div class="child">직계 자식 ✅</div>
    <div class="box">
      일반 박스
      <div class="child">중첩된 자식도 선택됨 ✅</div>
    </div>
  </div>

  <hr style="margin: 2rem 0; border: 1px solid #e5e7eb;">

  <h4>2️⃣ 직계 자식 선택자: .parent > .direct-child</h4>
  <p style="color: #64748b; font-size: 0.9rem;">parent의 <strong>바로 아래 자식</strong>만 선택</p>
  
  <div class="parent">
    <div class="direct-child">직계 자식 ✅</div>
    <div class="box">
      일반 박스
      <div class="direct-child">중첩된 건 선택 안됨 ❌</div>
    </div>
    <div class="direct-child">직계 자식 ✅</div>
  </div>

  <hr style="margin: 2rem 0; border: 1px solid #e5e7eb;">

  <h4>3️⃣ 인접 형제 선택자: .trigger + .adjacent</h4>
  <p style="color: #64748b; font-size: 0.9rem;">trigger <strong>바로 다음</strong> 형제만 선택</p>
  
  <div style="background: #f9fafb; padding: 1rem; border-radius: 6px;">
    <div class="box trigger">🎯 Trigger 요소</div>
    <div class="box adjacent">바로 다음 형제 ✅</div>
    <div class="box adjacent">두 번째 형제는 선택 안됨 ❌</div>
  </div>

  <hr style="margin: 2rem 0; border: 1px solid #e5e7eb;">

  <h4>4️⃣ 일반 형제 선택자: .trigger ~ .sibling</h4>
  <p style="color: #64748b; font-size: 0.9rem;">trigger <strong>이후 모든</strong> 형제 선택</p>
  
  <div style="background: #f9fafb; padding: 1rem; border-radius: 6px;">
    <div class="box sibling">trigger 이전 형제 ❌</div>
    <div class="box trigger">🎯 Trigger 요소</div>
    <div class="box sibling">이후 형제 1 ✅</div>
    <div class="box sibling">이후 형제 2 ✅</div>
    <div class="box sibling">이후 형제 3 ✅</div>
  </div>
</div>

<div style="background: #dbeafe; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
  <strong>📚 선택자 요약:</strong><br/>
  • <code>A B</code> → A 안의 모든 B (자손)<br/>
  • <code>A > B</code> → A의 직계 자식 B만<br/>
  • <code>A + B</code> → A 바로 다음 B만<br/>
  • <code>A ~ B</code> → A 이후 모든 B
</div>`}
        />
      </CollapsibleSection>

      {/* 3. 선택자 우선순위 */}
      <CollapsibleSection title="선택자 우선순위 (Specificity)">
        <p className="section-description">
          같은 요소를 여러 선택자가 타겟팅할 때 어떤 스타일이 적용될까요?
        </p>

        <LiveCodeEditor
          scopeId="specificity-demo"
          previewHeight="450px"
          codeHeight="500px"
          initialCss={`/* Specificity 계산: (inline, ID, Class, Element) */

/* (0, 0, 0, 1) - 가장 약함 */
div {
  background: #e5e7eb;
  color: #1e293b;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 6px;
  border-left: 4px solid #9ca3af;
}

/* (0, 0, 1, 0) - 중간 */
.base-class {
  background: #bfdbfe;
  color: #1e3a8a;
  border-left-color: #3b82f6;
}

/* (0, 0, 2, 0) - 더 강함 */
.container .item {
  background: #fde68a;
  color: #78350f;
  border-left-color: #f59e0b;
}

/* (0, 0, 3, 0) - 매우 강함 */
.wrapper .container .item {
  background: #d1fae5;
  color: #065f46;
  border-left-color: #10b981;
}

/* (0, 1, 0, 0) - 가장 강함 */
#unique-item {
  background: #fce7f3;
  color: #831843;
  border-left-color: #ec4899;
}

/* !important - 최우선 (권장하지 않음) */
.force-style {
  background: #fef3c7 !important;
  color: #78350f !important;
  border-left-color: #f59e0b !important;
}

/* 비교용 컨테이너 */
.demo-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.specificity-label {
  font-family: 'Consolas', monospace;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}
`}
          initialHtml={`<div class="demo-container">
  <h4 style="margin-top: 0;">🎯 Specificity 우선순위 테스트</h4>
  
  <div class="specificity-label">div (0,0,0,1)</div>
  <div>Element 선택자만</div>
  
  <div class="specificity-label">.base-class (0,0,1,0)</div>
  <div class="base-class">Class 선택자</div>
  
  <div class="specificity-label">.container .item (0,0,2,0)</div>
  <div class="container">
    <div class="item">2개 Class 조합</div>
  </div>
  
  <div class="specificity-label">.wrapper .container .item (0,0,3,0)</div>
  <div class="wrapper">
    <div class="container">
      <div class="item">3개 Class 조합</div>
    </div>
  </div>
  
  <div class="specificity-label">#unique-item (0,1,0,0)</div>
  <div id="unique-item" class="wrapper container item base-class">
    ID 선택자 (다른 클래스들 무시됨)
  </div>
  
  <div class="specificity-label">.force-style with !important</div>
  <div id="unique-item" class="force-style wrapper container item">
    !important로 강제 적용 (ID보다 우선)
  </div>
</div>

<div style="background: #fef3c7; padding: 1rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
  <strong>⚡ Specificity 우선순위:</strong><br/>
  1. <code>!important</code> (가급적 사용 자제)<br/>
  2. Inline 스타일 (style="...")<br/>
  3. ID 선택자 (#id)<br/>
  4. Class, 속성, 유사 클래스 (.class, [attr], :hover)<br/>
  5. Element, 유사 요소 (div, ::before)<br/>
  <br/>
  <strong>💡 팁:</strong> 같은 레벨이면 개수가 많을수록 우선순위 높음!<br/>
  예: <code>.a .b .c</code> (0,0,3,0) > <code>.a .b</code> (0,0,2,0)
</div>`}
        />
      </CollapsibleSection>

      {/* 4. BEM 네이밍 컨벤션 */}
      <CollapsibleSection title="BEM 네이밍 컨벤션">
        <p className="section-description">
          <strong>BEM (Block Element Modifier)</strong>은 가장 인기 있는 CSS 네이밍 방법론입니다.
          컴포넌트 기반 개발과 팀 협업에 최적화되어 있습니다.
        </p>

        <LiveCodeEditor
          scopeId="bem-methodology"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`/* BEM 네이밍 규칙:
   Block__Element--Modifier
   
   예: .card__title--highlighted
*/

/* Block: 독립적인 컴포넌트 */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin: 1rem 0;
}

/* Element: Block의 일부 (Block__ 접두사) */
.card__header {
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.card__title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.card__subtitle {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.card__body {
  color: #475569;
  line-height: 1.6;
}

.card__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
}

/* Modifier: 변형/상태 (Block--modifier 또는 Element--modifier) */
.card--featured {
  border: 3px solid #3b82f6;
  background: linear-gradient(135deg, #dbeafe 0%, white 100%);
}

.card--featured .card__title {
  color: #1e40af;
}

.card__title--large {
  font-size: 1.5rem;
  color: #7c3aed;
}

/* Button 컴포넌트 (BEM 적용) */
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.button--primary {
  background: #3b82f6;
  color: white;
}

.button--primary:hover {
  background: #2563eb;
}

.button--secondary {
  background: #e5e7eb;
  color: #1e293b;
}

.button--secondary:hover {
  background: #d1d5db;
}

.button--small {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}
`}
          initialHtml={`<div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px;">
  <h4 style="margin-top: 0;">📦 BEM 구조 예제</h4>
  
  <!-- 일반 카드 -->
  <div class="card">
    <div class="card__header">
      <h3 class="card__title">일반 카드</h3>
      <p class="card__subtitle">기본 스타일</p>
    </div>
    <div class="card__body">
      BEM을 사용하면 클래스명만 보고도 구조를 파악할 수 있습니다.
      card는 Block, title/body는 Element입니다.
    </div>
    <div class="card__footer">
      <button class="button button--primary button--small">확인</button>
      <button class="button button--secondary button--small">취소</button>
    </div>
  </div>
  
  <!-- Featured 카드 (Modifier 적용) -->
  <div class="card card--featured">
    <div class="card__header">
      <h3 class="card__title card__title--large">
        추천 카드 ⭐
      </h3>
      <p class="card__subtitle">Modifier로 변형</p>
    </div>
    <div class="card__body">
      --featured Modifier를 추가하여 스타일을 변형했습니다.
      기본 card 스타일은 유지하면서 시각적 강조만 추가!
    </div>
    <div class="card__footer">
      <button class="button button--primary">자세히 보기</button>
    </div>
  </div>
</div>

<div style="background: #dbeafe; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
  <strong>📐 BEM 네이밍 규칙:</strong><br/>
  • <code>.block</code> → 독립적인 컴포넌트<br/>
  • <code>.block__element</code> → 블록의 일부<br/>
  • <code>.block--modifier</code> → 블록의 변형<br/>
  • <code>.block__element--modifier</code> → 요소의 변형<br/>
  <br/>
  <strong>✅ 장점:</strong> 구조 명확, 충돌 방지, 재사용성 높음<br/>
  <strong>❌ 단점:</strong> 클래스명이 길어질 수 있음
</div>`}
        />
      </CollapsibleSection>

      {/* 5. 기타 네이밍 컨벤션 */}
      <CollapsibleSection title="다양한 네이밍 컨벤션">
        <p className="section-description">
          BEM 외에도 여러 네이밍 방법론이 있습니다. 프로젝트에 맞는 방식을 선택하세요.
        </p>

        <LiveCodeEditor
          scopeId="naming-conventions"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`/* 1. OOCSS (Object-Oriented CSS) - 구조와 스킨 분리 */
.btn {
  /* 구조 (Structure) */
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  /* 스킨 (Skin) */
  background: #3b82f6;
  color: white;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

/* 2. Utility-First (Tailwind 스타일) - 기능 단위 클래스 */
.mt-4 { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.p-4 { padding: 1rem; }
.text-center { text-align: center; }
.text-blue { color: #3b82f6; }
.bg-gray { background: #f3f4f6; }
.rounded { border-radius: 0.5rem; }
.shadow { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

/* 3. SMACSS - 카테고리 기반 */
/* Base - 기본 스타일 (태그 선택자) */
/* Layout - 레이아웃 (l- 접두사) */
.l-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.l-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* Module - 재사용 가능한 모듈 */
.box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* State - 상태 (is- 접두사) */
.is-active {
  border: 2px solid #3b82f6;
  background: #dbeafe;
}

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* 4. 한국 실무에서 자주 쓰는 방식 - kebab-case */
.product-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.product-card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.product-card-price {
  color: #ef4444;
  font-size: 1.25rem;
  font-weight: bold;
}
`}
          initialHtml={`<div style="background: #f9fafb; padding: 1.5rem; border-radius: 8px;">
  <h4 style="margin-top: 0;">🎨 다양한 네이밍 방식 비교</h4>
  
  <div class="l-grid">
    <!-- OOCSS 스타일 -->
    <div class="box">
      <h5 style="margin-top: 0; color: #7c3aed;">OOCSS 방식</h5>
      <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">
        구조와 스킨을 분리하여 조합
      </p>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-primary btn-large">Large</button>
    </div>
    
    <!-- Utility-First 스타일 -->
    <div class="box">
      <h5 style="margin-top: 0; color: #7c3aed;">Utility-First</h5>
      <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">
        기능별 클래스를 조합
      </p>
      <div class="bg-gray p-4 rounded shadow text-center">
        <p class="text-blue mb-4">여러 Utility 클래스 조합</p>
      </div>
    </div>
    
    <!-- SMACSS 스타일 -->
    <div class="box is-active">
      <h5 style="margin-top: 0; color: #7c3aed;">SMACSS 방식</h5>
      <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">
        카테고리와 상태 구분
      </p>
      <p style="margin: 0; font-size: 0.9rem;">
        <code>.is-active</code> 상태 적용됨
      </p>
    </div>
    
    <!-- 한국 실무 스타일 -->
    <div class="box">
      <h5 style="margin-top: 0; color: #7c3aed;">한국 실무 (kebab-case)</h5>
      <div class="product-card">
        <div class="product-card-title">상품명</div>
        <div class="product-card-price">29,900원</div>
      </div>
    </div>
  </div>
</div>

<div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #f59e0b;">
  <strong>🎯 어떤 방식을 선택할까?</strong><br/><br/>
  
  <strong>BEM</strong>: 컴포넌트 중심 프로젝트 (React, Vue)<br/>
  <strong>OOCSS</strong>: 스타일 재사용이 중요한 프로젝트<br/>
  <strong>Utility-First</strong>: 빠른 개발, 프로토타이핑<br/>
  <strong>SMACSS</strong>: 대규모 레거시 프로젝트<br/>
  <strong>kebab-case</strong>: 간단한 프로젝트, 팀 선호도<br/><br/>
  
  <strong>💡 중요한 건 일관성!</strong> 팀과 합의한 방식을 프로젝트 전체에 일관되게 적용하세요.
</div>`}
        />
      </CollapsibleSection>

      {/* 6. 실무 팁 */}
      <CollapsibleSection title="실무 네이밍 가이드">
        <p className="section-description">
          좋은 클래스명을 작성하는 실무 팁과 피해야 할 안티패턴을 알아보세요.
        </p>

        <LiveCodeEditor
          scopeId="naming-best-practices"
          previewHeight="450px"
          codeHeight="500px"
          initialCss={`/* ✅ 좋은 예: 의미 있고 명확한 이름 */
.user-profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.notification-badge {
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.search-input-container {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 0.5rem;
}

/* ❌ 나쁜 예: 너무 짧거나 의미 없는 이름 */
.box1 {
  background: #e5e7eb;
  padding: 1rem;
}

.tb {
  margin-bottom: 1rem;
}

.redtext {
  color: #ef4444;
}

/* ✅ 좋은 예: 상태 표현이 명확 */
.button-loading {
  opacity: 0.6;
  pointer-events: none;
}

.message-success {
  background: #d1fae5;
  color: #065f46;
  border-left: 4px solid #10b981;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 6px;
}

/* ❌ 나쁜 예: 스타일을 클래스명에 포함 */
.margin-top-20px {
  margin-top: 20px;
}

.font-size-16 {
  font-size: 16px;
}

/* ✅ 좋은 예: 목적 기반 네이밍 */
.section-spacing {
  margin-top: 2rem;
}

.body-text {
  font-size: 1rem;
  line-height: 1.6;
}

/* 시연용 컨테이너 */
.demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.example-box {
  padding: 1rem;
  border-radius: 6px;
  border: 2px solid #e5e7eb;
}

.good-example {
  background: #d1fae5;
  border-color: #10b981;
}

.bad-example {
  background: #fee2e2;
  border-color: #ef4444;
}
`}
          initialHtml={`<div class="demo-grid">
  <div class="example-box good-example">
    <h5 style="margin-top: 0; color: #065f46;">✅ 좋은 네이밍</h5>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.8;">
      <li><code>.user-profile-avatar</code></li>
      <li><code>.notification-badge</code></li>
      <li><code>.search-input-container</code></li>
      <li><code>.button-loading</code></li>
      <li><code>.message-success</code></li>
    </ul>
    <p style="margin-top: 1rem; margin-bottom: 0; font-size: 0.85rem; color: #065f46;">
      <strong>특징:</strong> 역할이 명확하고 의미 파악이 쉬움
    </p>
  </div>
  
  <div class="example-box bad-example">
    <h5 style="margin-top: 0; color: #991b1b;">❌ 나쁜 네이밍</h5>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.8;">
      <li><code>.box1</code> (의미 불명확)</li>
      <li><code>.tb</code> (약어 과다)</li>
      <li><code>.redtext</code> (스타일 직접 표현)</li>
      <li><code>.margin-top-20px</code> (수치 포함)</li>
      <li><code>.font-size-16</code> (스타일 명시)</li>
    </ul>
    <p style="margin-top: 1rem; margin-bottom: 0; font-size: 0.85rem; color: #991b1b;">
      <strong>문제:</strong> 유지보수 어렵고 변경에 취약
    </p>
  </div>
</div>

<div style="background: white; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
  <h5 style="margin-top: 0;">📋 실무 네이밍 체크리스트</h5>
  
  <div style="background: #f3f4f6; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
    <strong>✅ 해야 할 것:</strong>
    <ul style="margin: 0.5rem 0 0 0; padding-left: 1.25rem; line-height: 1.8;">
      <li>역할과 목적을 명확히 표현</li>
      <li>팀의 네이밍 규칙 일관되게 따르기</li>
      <li>의미 있는 단어 사용 (약어 최소화)</li>
      <li>계층 구조를 이름에 반영 (BEM 등)</li>
    </ul>
  </div>
  
  <div style="background: #fef2f2; padding: 1rem; border-radius: 6px;">
    <strong>❌ 피해야 할 것:</strong>
    <ul style="margin: 0.5rem 0 0 0; padding-left: 1.25rem; line-height: 1.8;">
      <li>스타일 속성을 클래스명에 포함 (.red, .big)</li>
      <li>숫자만으로 구분 (.box1, .box2)</li>
      <li>과도한 약어 (.btn-pr-lg-rd)</li>
      <li>너무 일반적인 이름 (.container, .wrapper 남발)</li>
    </ul>
  </div>
</div>

<div style="background: #dbeafe; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #3b82f6;">
  <strong>💬 팀 협업 팁:</strong><br/>
  클래스명만 보고도 다른 개발자가 <strong>"어디에 쓰이는 스타일인지"</strong> 알 수 있어야 합니다.
  문서화보다 코드 자체가 문서가 되도록 작성하세요!
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default SelectorsBasicsStudy;
