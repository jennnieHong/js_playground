/**
 * GridStudy 페이지 컴포넌트
 * CSS Grid 레이아웃의 기본 개념과 고급 활용법(Grid Areas 등)을 학습할 수 있는 페이지입니다.
 * 주요 속성: grid-template-columns, gap, justify-items, align-items, grid-template-areas, grid-auto-flow, display: contents
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function GridStudy() {
  // --- 상태 관리 (State Management) ---
  // Grid 레이아웃의 동적 변화를 관찰하기 위해 각 속성들을 상태로 관리합니다.
  const [gridTemplateColumns, setGridTemplateColumns] = useState('repeat(3, 1fr)');
  const [gap, setGap] = useState('1rem');
  const [justifyItems, setJustifyItems] = useState('stretch');
  const [alignItems, setAlignItems] = useState('stretch');
  const [wrapperDisplay, setWrapperDisplay] = useState('block');
  const [autoFlow, setAutoFlow] = useState('row');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Grid Study"
        subtitle="강력한 2차원 레이아웃 시스템"
      />

      {/* Grid 정의 섹션 */}

      <CollapsibleSection title="CSS Grid란?">
        <p className="section-description">
          CSS Grid는 2차원 레이아웃 시스템으로, 행과 열을 동시에 제어할 수 있습니다.
        </p>
      </CollapsibleSection>

      {/* 실습 섹션: 기본 그리드 설정 */}
      <CollapsibleSection title="기본 그리드">
        <div className="section-description">
          <p><code>grid-template-columns</code>로 열(Column)의 크기와 개수를 정의합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>repeat(3, 1fr)</code>: 1fr(fraction) 크기의 열을 3개 반복합니다. 균등 분할됩니다.</li>
            <li><code>200px 1fr 1fr</code>: 첫 열은 200px 고정, 나머지는 남은 공간을 균등하게 나눕니다.</li>
            <li><code>1fr 2fr 1fr</code>: 두 번째 열이 첫 번째, 세 번째 열보다 2배 더 넓어집니다.</li>
            <li><code>repeat(auto-fit, minmax(100px, 1fr))</code>: 반응형 패턴입니다. 최소 100px을 보장하되 남는 공간은 늘어납니다.</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'grid-template-columns',
              type: 'select',
              value: gridTemplateColumns,
              onChange: setGridTemplateColumns,
              options: [
                { value: 'repeat(3, 1fr)', label: '3 Columns (Equal)' },
                { value: '200px 1fr 1fr', label: 'Fixed 200px + 2 Flexible' },
                { value: '1fr 2fr 1fr', label: '1:2:1 Ratio' },
                { value: 'repeat(auto-fit, minmax(100px, 1fr))', label: 'Responsive Auto Fit' }
              ]
            },
            {
              name: 'gap',
              type: 'radio',
              value: gap,
              onChange: setGap,
              options: ['0', '0.5rem', '1rem', '2rem']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="grid-basic"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.grid-demo {
  display: grid;
  grid-template-columns: ${gridTemplateColumns};
  gap: ${gap};
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}`}
          currentCss={`.grid-demo {
  display: grid;
  grid-template-columns: ${gridTemplateColumns};
  gap: ${gap};
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}`}
          initialHtml={`<div class="grid-demo">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: 그리드 아이템 정렬 (Alignment) */}
      <CollapsibleSection title="Alignment">
        <div className="section-description">
          <p>그리드 셀 내부에서 아이템의 정렬 방식을 지정합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>justify-items</code>: 가로(행 축) 방향 정렬 (start, end, center, stretch)</li>
            <li><code>align-items</code>: 세로(열 축) 방향 정렬 (start, end, center, stretch)</li>
            <li><code>stretch</code>는 아이템이 셀 가득 채워지도록 늘립니다.</li>
            <li><code>center</code>는 셀의 정중앙에 위치시킵니다.</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'justify-items',
              label: 'justify-items (Horizontal)',
              type: 'radio',
              value: justifyItems,
              onChange: setJustifyItems,
              options: ['stretch', 'start', 'end', 'center']
            },
            {
              name: 'align-items',
              label: 'align-items (Vertical)',
              type: 'radio',
              value: alignItems,
              onChange: setAlignItems,
              options: ['stretch', 'start', 'end', 'center']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="grid-alignment"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`.grid-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;
  gap: 1rem;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          currentCss={`.grid-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;
  gap: 1rem;
  justify-items: ${justifyItems};
  align-items: ${alignItems};
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          initialHtml={`<div class="grid-demo">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Grid Areas (시각적 레이아웃 정의) */}
      <CollapsibleSection title="Grid Template Areas (영역 레이아웃)">
        <div className="section-description">
          <p>
            <code>grid-template-areas</code>는 그리드 레이아웃을 <strong>시각적으로 정의</strong>하는 강력한 방법입니다.
            문자열로 영역 이름을 작성하여 직관적으로 레이아웃 구조를 표현할 수 있습니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            <li><strong>각 문자열 = 하나의 행(row)</strong></li>
            <li><strong>공백으로 구분된 각 단어 = 하나의 셀(cell)</strong></li>
            <li><strong>같은 이름의 셀들이 하나의 영역을 형성</strong></li>
            <li><strong>점(.) = 빈 셀</strong></li>
          </ul>
        </div>

        <LiveCodeEditor
          scopeId="grid-areas-intro"
          previewHeight="250px"
          codeHeight="500px"
          initialCss={`/* 1. 그리드 컨테이너에 영역 정의 */
.grid-demo {
  display: grid;
  
  /* 영역 이름으로 레이아웃 정의 */
  grid-template-areas:
    "header header header"   /* 1행: header가 3칸 차지 */
    "sidebar main main"      /* 2행: sidebar 1칸, main 2칸 */
    "footer footer footer";  /* 3행: footer가 3칸 차지 */
  
  /* 열 크기 정의: 3개 열 */
  grid-template-columns: 200px 1fr 1fr;
  
  /* 행 크기 정의: 3개 행 */
  grid-template-rows: 80px 200px 60px;
  
  gap: 1rem;
  background: #1e293b;
  padding: 1rem;
  border-radius: 12px;
}

/* 2. 각 아이템에 어떤 영역을 차지할지 지정 */
.header { 
  grid-area: header; 
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.2rem;
}

.sidebar { 
  grid-area: sidebar; 
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.main { 
  grid-area: main; 
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.footer { 
  grid-area: footer; 
  background: linear-gradient(135deg, #64748b, #475569);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}`}
          initialHtml={`<div class="grid-demo">
  <div class="header">📌 Header (80px 높이)</div>
  <div class="sidebar">
    📁 Sidebar<br/>(200px 높이)<br/>(200px 너비)
  </div>
  <div class="main">
    📄 Main Content<br/>
    (200px 높이)<br/>
    (1fr + 1fr = 남은 공간)
  </div>
  <div class="footer">🔗 Footer (60px 높이)</div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #dbeafe; padding: 1rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.8;">
  <strong>📐 크기 계산 방법:</strong><br/><br/>
  
  <strong>열(Columns) 너비:</strong><br/>
  → grid-template-columns: 200px 1fr 1fr<br/>
  → 1열: 200px 고정<br/>
  → 2~3열: 남은 공간을 1:1로 분할<br/><br/>
  
  <strong>행(Rows) 높이:</strong><br/>
  → grid-template-rows: 80px 200px 60px<br/>
  → 1행(header): 80px<br/>
  → 2행(sidebar/main): 200px<br/>
  → 3행(footer): 60px<br/><br/>
  
  <strong>⚠️ 중요:</strong> areas의 행 개수와 rows의 개수가 일치해야 합니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Grid Areas 요소를 활용한 자동 높이 계산 */}
      <CollapsibleSection title="Grid Areas: 높이 자동 계산 (auto)">
        <p className="section-description">
          <code>grid-template-rows: auto</code>를 사용하면 <strong>콘텐츠 크기에 맞춰 높이가 자동으로 결정</strong>됩니다.
        </p>

        <LiveCodeEditor
          scopeId="grid-areas-auto"
          previewHeight="300px"
          codeHeight="450px"
          initialCss={`.grid-auto-demo {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  
  grid-template-columns: 200px 1fr;
  
  /* auto: 콘텐츠 높이만큼 자동 조정 */
  grid-template-rows: auto 1fr auto;
  
  min-height: 400px;  /* 최소 높이 지정 */
  gap: 1rem;
  background: #0f172a;
  padding: 1rem;
  border-radius: 12px;
}

.header { 
  grid-area: header; 
  background: rgba(236, 72, 153, 0.3);
  border: 2px solid #ec4899;
  color: white;
  padding: 1rem;
  border-radius: 8px;
}

.sidebar { 
  grid-area: sidebar; 
  background: rgba(16, 185, 129, 0.3);
  border: 2px solid #10b981;
  color: white;
  padding: 1rem;
  border-radius: 8px;
}

.main { 
  grid-area: main; 
  background: rgba(99, 102, 241, 0.3);
  border: 2px solid #6366f1;
  color: white;
  padding: 1rem;
  border-radius: 8px;
}

.footer { 
  grid-area: footer; 
  background: rgba(100, 116, 139, 0.3);
  border: 2px solid #64748b;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}`}
          initialHtml={`<div class="grid-auto-demo">
  <div class="header">
    📌 Header (auto → 콘텐츠 높이만큼)
  </div>
  <div class="sidebar">
    📁 Sidebar<br/><br/>
    (1fr → 남은 공간 차지)
  </div>
  <div class="main">
    📄 Main<br/><br/>
    여기에 긴 콘텐츠를 추가하면<br/>
    sidebar와 함께 늘어납니다.<br/>
    왜냐하면 둘 다 같은 행(2행)에 속하기 때문입니다.
  </div>
  <div class="footer">
    🔗 Footer (auto → 콘텐츠 높이만큼)
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 1rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.8;">
  <strong>🎯 auto vs 1fr vs 고정값:</strong><br/><br/>
  
  • <strong>auto</strong>: 콘텐츠 크기만큼 (최소 크기)<br/>
  • <strong>1fr</strong>: 남은 공간을 차지 (유연한 크기)<br/>
  • <strong>200px</strong>: 정확히 200px (고정 크기)<br/><br/>
  
  <strong>💡 패턴:</strong> grid-template-rows: auto 1fr auto<br/>
  → 헤더/푸터는 콘텐츠만큼, 메인은 남은 공간 전부!
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Grid Areas 빈 공간 정의 (.) */}
      <CollapsibleSection title="Grid Areas: 빈 공간 (.) 사용하기">
        <p className="section-description">
          점(.)을 사용하여 <strong>빈 셀</strong>을 만들 수 있습니다. 불규칙한 레이아웃 구성에 유용합니다.
        </p>

        <LiveCodeEditor
          scopeId="grid-areas-empty"
          previewHeight="300px"
          codeHeight="450px"
          initialCss={`.grid-empty-demo {
  display: grid;
  grid-template-areas:
    "logo . . search"      /* 로고 왼쪽, 검색 오른쪽, 중간 빈 공간 */
    "sidebar content content content"
    ". footer footer .";   /* 양옆 빈 공간, 중앙에 footer */
  
  grid-template-columns: 150px 1fr 1fr 150px;
  grid-template-rows: 60px 250px 60px;
  gap: 1rem;
  background: #1e293b;
  padding: 1rem;
  border-radius: 12px;
}

.logo { 
  grid-area: logo; 
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 700;
}

.search { 
  grid-area: search; 
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.sidebar { 
  grid-area: sidebar; 
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  padding: 1rem;
  border-radius: 8px;
}

.content { 
  grid-area: content; 
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.footer { 
  grid-area: footer; 
  background: linear-gradient(135deg, #64748b, #475569);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}`}
          initialHtml={`<div class="grid-empty-demo">
  <div class="logo">🎨 LOGO</div>
  <div class="search">🔍 Search</div>
  <div class="sidebar">📁 Menu</div>
  <div class="content">📄 Main Content Area</div>
  <div class="footer">© 2024 Footer</div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #d1fae5; padding: 1rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.8;">
  <strong>📍 빈 셀(.) 활용:</strong><br/><br/>
  
  1행: [logo] [.] [.] [search]<br/>
  → 로고와 검색 사이가 비어있음<br/><br/>
  
  2행: [sidebar] [content 3칸]<br/><br/>
  
  3행: [.] [footer 2칸] [.]<br/>
  → footer가 중앙에 위치<br/><br/>
  
  <strong>💡 Tip:</strong> 점(.)으로 레이아웃에 여백을 만들 수 있습니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: 그리드 자동 흐름 (Auto Flow) */}
      <CollapsibleSection title="Grid Auto Flow">
        <div className="section-description">
          <p>아이템이 <strong>자동으로 배치되는 방향</strong>을 결정합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>row</code>: 행 방향으로 순서대로 배치 (기본값)</li>
            <li><code>column</code>: 열 방향으로 순서대로 배치</li>
            <li><code>dense</code>: 빈 공간을 채우도록 재배치 (Masonry 효과)</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'grid-auto-flow',
              type: 'radio',
              value: autoFlow,
              onChange: setAutoFlow,
              options: ['row', 'column', 'row dense']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="grid-auto-flow"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.grid-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px;
  grid-auto-flow: ${autoFlow};
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.grid-item:nth-child(2) {
  grid-column: span 2;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.grid-item:nth-child(5) {
  grid-row: span 2;
  background: linear-gradient(135deg, #f093fb, #f5576c);
}`}
          currentCss={`.grid-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 80px;
  grid-auto-flow: ${autoFlow};
  gap: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.grid-item:nth-child(2) {
  grid-column: span 2;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.grid-item:nth-child(5) {
  grid-row: span 2;
  background: linear-gradient(135deg, #f093fb, #f5576c);
}`}
          initialHtml={`<div class="grid-demo">
  <div class="grid-item">1</div>
  <div class="grid-item">2 (span 2)</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5 (span 2 rows)</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Display: Contents (레이아웃 트리 최적화) */}
      <CollapsibleSection title="Display: Contents">
        <div className="section-description">
          <p>
            <code>display: contents</code>를 사용하면 해당 요소를 <strong>레이아웃 트리에서 제거</strong>한 것처럼 동작하게 합니다.<br />
            자신은 사라지고, 자신의 <strong>자식 요소들이 상위 그리드(또는 플렉스) 컨테이너의 직접적인 자식인 것처럼</strong> 배치됩니다.
            <br />
            시맨틱 태그 등 구조적인 이유로 감싸는 태그가 필요하지만, 레이아웃에는 영향을 주지 않아야 할 때 유용합니다.
          </p>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Wrapper Display',
              type: 'radio',
              value: wrapperDisplay,
              onChange: setWrapperDisplay,
              options: ['block', 'contents']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="grid-contents"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: #f1f3f5;
  padding: 1rem;
}

.item {
  background-color: #fff;
  border: 1px solid #dee2e6;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.wrapper {
  display: ${wrapperDisplay}; /* block vs contents */
  border: 2px dashed #fa5252; /* contents일 때는 이 테두리도 사라집니다! */
  background-color: rgba(255, 0, 0, 0.1);
  padding: 10px;
}`}
          currentCss={`.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background-color: #f1f3f5;
  padding: 1rem;
}

.item {
  background-color: #fff;
  border: 1px solid #dee2e6;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}

.wrapper {
  display: ${wrapperDisplay};
  border: 2px dashed #fa5252;
  background-color: rgba(255, 0, 0, 0.1);
  padding: 10px;
}`}
          initialHtml={`<div class="grid-container">
  <div class="item">1</div>
  <div class="item">2</div>
  
  <!-- Wrapper -->
  <div class="wrapper">
    <div class="item">3 (Inside Wrapper)</div>
    <div class="item">4 (Inside Wrapper)</div>
  </div>
  
  <div class="item">5</div>
  <div class="item">6</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: Photo Gallery (복합 배치) */}
      <CollapsibleSection title="실전 예제: Photo Gallery">
        <p className="section-description">
          <code>grid-column</code>과 <code>grid-row</code>로 다양한 크기의 이미지를 배치하는 Masonry 스타일 갤러리입니다.
        </p>
        <LiveCodeEditor
          scopeId="grid-gallery"
          previewHeight="600px"
          codeHeight="500px"
          initialCss={`.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 100px;
  gap: 0.75rem;
  padding: 1rem;
  background: #1e293b;
  border-radius: 12px;
}

.gallery-item {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  z-index: 10;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Featured (large) */
.gallery-item.featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Tall */
.gallery-item.tall {
  grid-row: span 2;
}

/* Wide */
.gallery-item.wide {
  grid-column: span 2;
}

/* Placeholder colors for demo */
.gallery-item:nth-child(1) { background: linear-gradient(135deg, #667eea, #764ba2); }
.gallery-item:nth-child(2) { background: linear-gradient(135deg, #f093fb, #f5576c); }
.gallery-item:nth-child(3) { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.gallery-item:nth-child(4) { background: linear-gradient(135deg, #43e97b, #38f9d7); }
.gallery-item:nth-child(5) { background: linear-gradient(135deg, #fa709a, #fee140); }
.gallery-item:nth-child(6) { background: linear-gradient(135deg, #a8edea, #fed6e3); }
.gallery-item:nth-child(7) { background: linear-gradient(135deg, #ff9a9e, #fecfef); }
.gallery-item:nth-child(8) { background: linear-gradient(135deg, #ffecd2, #fcb69f); }`}
          initialHtml={`<div class="gallery">
  <div class="gallery-item featured">📷 Featured</div>
  <div class="gallery-item">🌅</div>
  <div class="gallery-item tall">🏔️ Tall</div>
  <div class="gallery-item">🌸</div>
  <div class="gallery-item wide">🌊 Wide</div>
  <div class="gallery-item">🌺</div>
  <div class="gallery-item">🍃</div>
  <div class="gallery-item">✨</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: Dashboard Layout (영역 활용) */}
      <CollapsibleSection title="실전 예제: Dashboard Layout">
        <p className="section-description">
          <code>grid-template-areas</code>를 활용한 대시보드 레이아웃입니다. 직관적인 영역 이름으로 배치합니다.
        </p>
        <LiveCodeEditor
          scopeId="grid-dashboard"
          previewHeight="450px"
          codeHeight="550px"
          initialCss={`.dashboard {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar stats stats"
    "sidebar chart chart"
    "sidebar footer footer";
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 1fr 1fr auto;
  gap: 1rem;
  height: 400px;
  padding: 1rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 16px;
}

.dashboard > div {
  padding: 1rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
}

.header {
  grid-area: header;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar {
  grid-area: sidebar;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.stats {
  grid-area: stats;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.chart {
  grid-area: chart;
  background: rgba(244, 114, 182, 0.2);
  border: 1px solid rgba(244, 114, 182, 0.3);
}

.footer {
  grid-area: footer;
  background: rgba(255,255,255,0.05);
  text-align: center;
  color: #94a3b8;
}`}
          initialHtml={`<div class="dashboard">
  <div class="header">
    <span>📊 Dashboard</span>
    <span>👤 User</span>
  </div>
  <div class="sidebar">
    📁 Navigation<br/><br/>
    • Home<br/>
    • Analytics<br/>
    • Settings
  </div>
  <div class="stats">
    <div>📈 1,234</div>
    <div>👥 5,678</div>
    <div>💰 $9,012</div>
  </div>
  <div class="chart">
    📉 Chart Area
  </div>
  <div class="footer">
    © 2024 Dashboard Example
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: Card Grid (반응형 패턴) */}
      <CollapsibleSection title="실전 예제: Card Grid">
        <p className="section-description">
          <code>auto-fit</code>과 <code>minmax</code>를 활용한 완벽한 반응형 카드 그리드입니다.
        </p>
        <LiveCodeEditor
          scopeId="grid-cards"
          previewHeight="300px"
          codeHeight="450px"
          initialCss={`.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 16px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0,0,0,0.1);
}

.card-emoji {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
}

.card-badge {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 0.75rem;
  border-radius: 20px;
}`}
          initialHtml={`<div class="card-grid">
  <div class="card">
    <div class="card-emoji">🚀</div>
    <div class="card-title">빠른 성능</div>
    <div class="card-desc">최적화된 코드로 빛처럼 빠른 로딩</div>
    <span class="card-badge">NEW</span>
  </div>
  <div class="card">
    <div class="card-emoji">🔒</div>
    <div class="card-title">보안</div>
    <div class="card-desc">최신 보안 기술로 데이터 보호</div>
  </div>
  <div class="card">
    <div class="card-emoji">📱</div>
    <div class="card-title">반응형</div>
    <div class="card-desc">모든 기기에서 완벽한 경험</div>
  </div>
  <div class="card">
    <div class="card-emoji">🎨</div>
    <div class="card-title">커스텀</div>
    <div class="card-desc">원하는 대로 스타일링 가능</div>
    <span class="card-badge">PRO</span>
  </div>
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default GridStudy;

