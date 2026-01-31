/**
 * FlexboxStudy 페이지 컴포넌트
 * CSS Flexbox 레이아웃의 다양한 속성들을 인터랙티브하게 학습할 수 있는 페이지입니다.
 * 주요 속성: justify-content, align-items, flex-direction, flex-wrap, gap, align-content, flex (grow/shrink/basis)
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function FlexboxStudy() {
  // --- 상태 관리 (State Management) ---
  // Flexbox 레이아웃 제어를 위한 CSS 속성 값들을 상태로 관리합니다.
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [flexDirection, setFlexDirection] = useState('row');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [gap, setGap] = useState('1rem');
  const [alignContent, setAlignContent] = useState('stretch');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Flexbox Study"
        subtitle="유연한 레이아웃을 만드는 Flexbox"
      />

      {/* Flexbox 정의 섹션 */}

      <CollapsibleSection title="Flexbox란?">
        <p className="section-description">
          Flexbox는 1차원 레이아웃 시스템으로, 요소들을 행 또는 열로 배치할 수 있습니다.
        </p>
      </CollapsibleSection>

      {/* 실습 섹션: 기본 예제 */}
      <CollapsibleSection title="기본 예제">
        <LiveCodeEditor
          scopeId="flexbox-basic"
          codeHeight="300px"
          initialCss={`.flex-demo {
  display: flex;
  gap: 1rem;
}`}
          initialHtml={`<div class="flex-demo flex-row">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Justify Content (수평 정렬) */}
      <CollapsibleSection title="Justify Content">
        <div className="section-description">
          <p><strong>주축(Main Axis)</strong>을 따라 아이템을 어떻게 배치할지 결정합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>flex-start</code>: 아이템을 시작점(왼쪽/위)으로 정렬합니다. (기본값)</li>
            <li><code>flex-end</code>: 아이템을 끝점(오른쪽/아래)으로 정렬합니다.</li>
            <li><code>center</code>: 아이템을 가운데로 정렬합니다.</li>
            <li><code>space-between</code>: 첫 아이템은 시작점에, 마지막 아이템은 끝점에 두고 나머지는 균등 분배합니다.</li>
            <li><code>space-around</code>: 모든 아이템 주위에 균등한 여백을 줍니다.</li>
            <li><code>space-evenly</code>: 아이템 사이와 양 끝의 여백이 모두 완전히 똑같게 배분됩니다.</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'justify-content',
              type: 'radio',
              value: justifyContent,
              onChange: setJustifyContent,
              options: [
                'flex-start',
                'flex-end',
                'center',
                'space-between',
                'space-around',
                'space-evenly'
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="flexbox-justify"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`.flex-demo {
  display: flex;
  justify-content: ${justifyContent};
  gap: 1rem;
  min-height: 100px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          currentCss={`.flex-demo {
  display: flex;
  justify-content: ${justifyContent};
  gap: 1rem;
  min-height: 100px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          initialHtml={`<div class="flex-demo">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Align Items (수직 정렬) */}
      <CollapsibleSection title="Align Items">
        <div className="section-description">
          <p><strong>교차축(Cross Axis)</strong>을 따라 아이템을 어떻게 배치할지 결정합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>stretch</code>: 아이템을 컨테이너 높이만큼 늘립니다. (기본값, height가 auto일 때)</li>
            <li><code>flex-start</code>: 교차축의 시작점으로 정렬합니다.</li>
            <li><code>flex-end</code>: 교차축의 끝점으로 정렬합니다.</li>
            <li><code>center</code>: 교차축의 가운데로 정렬합니다.</li>
            <li><code>baseline</code>: 아이템 내 텍스트의 기준선(baseline)에 맞춰 정렬합니다.</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'align-items',
              type: 'radio',
              value: alignItems,
              onChange: setAlignItems,
              options: [
                'stretch',
                'flex-start',
                'flex-end',
                'center',
                'baseline'
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="flexbox-align"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.flex-demo {
  display: flex;
  align-items: ${alignItems};
  min-height: 200px;
  gap: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          currentCss={`.flex-demo {
  display: flex;
  align-items: ${alignItems};
  min-height: 200px;
  gap: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          initialHtml={`<div class="flex-demo">
  <div class="flex-item" style="height: auto">Auto</div>
  <div class="flex-item" style="height: 80px">80px</div>
  <div class="flex-item" style="height: 40px">40px</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Baseline 정렬 (심화) */}
      <CollapsibleSection title="Baseline 정렬: 텍스트 기준선 맞추기">
        <div className="section-description">
          <p>
            <code>align-items: baseline</code>은 아이템들의 <strong>텍스트 기준선(baseline)</strong>을 맞춰 정렬합니다.
          </p>
          <p className="highlight-box">
            💡 <strong>핵심 개념</strong>: 폰트 크기나 padding이 달라도 텍스트의 밑줄이 일직선으로 맞춰집니다!
            <br />
            이는 다양한 크기의 텍스트를 자연스럽게 정렬할 때 유용합니다.
          </p>
          <p>
            <strong>실제 사용 빈도:</strong> 낮음 (5-10%) - 하지만 특정 상황에서는 필수!
          </p>
          <ul className="description-list">
            <li>
              <strong>가격 표시</strong> (가장 흔함)
              <br />
              <span className="example-text">
                → 큰 가격($99)과 작은 단위(/month)를 자연스럽게 정렬
              </span>
            </li>
            <li>
              <strong>아이콘 + 텍스트</strong>
              <br />
              <span className="example-text">
                → 아이콘과 텍스트의 기준선을 맞춤
              </span>
            </li>
            <li>
              <strong>네비게이션 메뉴</strong>
              <br />
              <span className="example-text">
                → 로고(큰 텍스트)와 메뉴 아이템(작은 텍스트) 정렬
              </span>
            </li>
          </ul>
        </div>

        <LiveCodeEditor
          scopeId="flexbox-baseline"
          previewHeight="400px"
          codeHeight="500px"
          initialCss={`.baseline-demo {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #3498db;
}

.small-text {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 6px;
  font-weight: 600;
}

.medium-text {
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  border-radius: 6px;
  font-weight: 600;
}

.large-text {
  font-size: 2.5rem;
  padding: 0.25rem 1rem;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  border-radius: 6px;
  font-weight: 600;
}

/* 비교: center 정렬 */
.center-demo {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: #fff3cd;
  border-radius: 8px;
  margin-top: 1rem;
  border: 2px dashed #f39c12;
}`}
          initialHtml={`<!-- baseline 정렬 -->
<div class="baseline-demo">
  <div class="small-text">작은 텍스트</div>
  <div class="medium-text">중간 텍스트</div>
  <div class="large-text">큰 텍스트</div>
</div>

<!-- 비교: center 정렬 -->
<div class="center-demo">
  <div class="small-text">작은 텍스트</div>
  <div class="medium-text">중간 텍스트</div>
  <div class="large-text">큰 텍스트</div>
</div>

<div class="info-box">
  <strong>차이점 확인:</strong><br/>
  • 위 (baseline): 텍스트의 밑줄이 일직선으로 정렬됨<br/>
  • 아래 (center): 박스의 중앙이 정렬됨<br/><br/>
  <strong>언제 사용?</strong><br/>
  다양한 폰트 크기가 섞인 텍스트를 자연스럽게 정렬할 때 유용합니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Flex Direction (축 방향) */}
      <CollapsibleSection title="Flex Direction">
        <div className="section-description">
          <p>아이템이 배치되는 <strong>축의 방향</strong>을 결정합니다.</p>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'flex-direction',
              type: 'radio',
              value: flexDirection,
              onChange: setFlexDirection,
              options: [
                'row',
                'row-reverse',
                'column',
                'column-reverse'
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="flexbox-direction"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.flex-demo {
  display: flex;
  flex-direction: ${flexDirection};
  gap: 1rem;
  min-height: 200px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          currentCss={`.flex-demo {
  display: flex;
  flex-direction: ${flexDirection};
  gap: 1rem;
  min-height: 200px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          initialHtml={`<div class="flex-demo">
  <div class="flex-item">One</div>
  <div class="flex-item">Two</div>
  <div class="flex-item">Three</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Flex Wrap (줄바꿈) */}
      <CollapsibleSection title="Flex Wrap">
        <div className="section-description">
          <p>아이템이 컨테이너를 넘어갈 때 <strong>줄바꿈 여부</strong>를 결정합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>nowrap</code>: 줄바꿈 없이 한 줄에 모두 배치 (기본값, 넘치면 축소)</li>
            <li><code>wrap</code>: 넘치면 다음 줄로 이동</li>
            <li><code>wrap-reverse</code>: 넘치면 위쪽으로 줄바꿈</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'flex-wrap',
              type: 'radio',
              value: flexWrap,
              onChange: setFlexWrap,
              options: ['nowrap', 'wrap', 'wrap-reverse']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="flexbox-wrap"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.flex-demo {
  display: flex;
  flex-wrap: ${flexWrap};
  gap: 1rem;
  min-height: 150px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.flex-item {
  min-width: 120px;
}`}
          currentCss={`.flex-demo {
  display: flex;
  flex-wrap: ${flexWrap};
  gap: 1rem;
  min-height: 150px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.flex-item {
  min-width: 120px;
}`}
          initialHtml={`<div class="flex-demo">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
  <div class="flex-item">Item 4</div>
  <div class="flex-item">Item 5</div>
  <div class="flex-item">Item 6</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Gap (간격) */}
      <CollapsibleSection title="Gap (간격)">
        <div className="section-description">
          <p>아이템들 사이의 <strong>간격</strong>을 설정합니다. <code>margin</code> 보다 간결하고 직관적입니다.</p>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'gap',
              type: 'radio',
              value: gap,
              onChange: setGap,
              options: ['0', '0.5rem', '1rem', '2rem', '3rem']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="flexbox-gap"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.flex-demo {
  display: flex;
  flex-wrap: wrap;
  gap: ${gap};
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          currentCss={`.flex-demo {
  display: flex;
  flex-wrap: wrap;
  gap: ${gap};
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}`}
          initialHtml={`<div class="flex-demo">
  <div class="flex-item">A</div>
  <div class="flex-item">B</div>
  <div class="flex-item">C</div>
  <div class="flex-item">D</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Align Content (여러 줄 정렬) */}
      <CollapsibleSection title="Align Content">
        <div className="section-description">
          <p><strong>여러 줄</strong>이 있을 때 줄 사이의 간격을 조정합니다. <code>flex-wrap: wrap</code>이 필요합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>stretch</code>: 줄들이 컨테이너를 채우도록 늘어남 (기본값)</li>
            <li><code>flex-start</code>: 시작점에 모음</li>
            <li><code>flex-end</code>: 끝점에 모음</li>
            <li><code>center</code>: 가운데에 모음</li>
            <li><code>space-between</code>: 줄 사이 균등 배치</li>
            <li><code>space-around</code>: 줄 주위 균등 여백</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'align-content',
              type: 'radio',
              value: alignContent,
              onChange: setAlignContent,
              options: ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="flexbox-align-content"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.flex-demo {
  display: flex;
  flex-wrap: wrap;
  align-content: ${alignContent};
  gap: 0.5rem;
  min-height: 250px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.flex-item {
  min-width: 80px;
  height: 50px;
}`}
          currentCss={`.flex-demo {
  display: flex;
  flex-wrap: wrap;
  align-content: ${alignContent};
  gap: 0.5rem;
  min-height: 250px;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.flex-item {
  min-width: 80px;
  height: 50px;
}`}
          initialHtml={`<div class="flex-demo">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
  <div class="flex-item">4</div>
  <div class="flex-item">5</div>
  <div class="flex-item">6</div>
  <div class="flex-item">7</div>
  <div class="flex-item">8</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Flex 축약 속성 */}
      <CollapsibleSection title="Flex 축약 속성">
        <div className="section-description">
          <p>
            <code>flex</code>는 세 가지 속성을 한 번에 설정하는 축약형입니다.
          </p>
          <ul className="description-list">
            <li>
              <strong>첫 번째 숫자</strong> = <code>flex-grow</code> (늘어나는 비율)
              <br />
              <span className="example-text">
                → 0이면 절대 안 늘어남, 1이면 남는 공간 차지, 2면 2배 더 차지
              </span>
            </li>
            <li>
              <strong>두 번째 숫자</strong> = <code>flex-shrink</code> (줄어드는 비율)
              <br />
              <span className="example-text">
                → 0이면 절대 안 줄어듦, 1이면 공간 부족 시 축소
              </span>
              <br />
              <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#fef3c7', borderRadius: '8px', fontSize: '0.9rem' }}>
                <strong>💡 언제 중요한가?</strong><br />
                • 체크박스나 아이콘 같은 <strong>고정 크기 요소</strong>를 절대 찌그러뜨리지 않고 싶을 때<br />
                • 사이드바의 너비를 반응형에서도 유지하고 싶을 때<br />
                • 폼 레이아웃에서 라벨이나 버튼이 줄어들지 않게 할 때<br />
                <br />
                <code style={{ background: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>flex-shrink: 0</code>을 설정하면 
                <strong>컨테이너가 좁아져도 원래 크기 유지!</strong>
              </div>
            </li>
            <li>
              <strong>세 번째 값</strong> = <code>flex-basis</code> (기본 크기)
              <br />
              <span className="example-text">
                → 늘어나거나 줄어들기 전의 시작 크기 (px, %, auto 등)
              </span>
            </li>
          </ul>
          <p className="highlight-box">
            💡 <strong>자주 쓰는 패턴:</strong><br />
            • <code>flex: 1</code> = <code>flex: 1 1 0</code> (공간 균등 분배)<br />
            • <code>flex: 0 0 200px</code> = 고정 200px<br />
            • <code>flex: 1 1 200px</code> = 기본 200px, 늘어나고 줄어듦
          </p>
        </div>

        <LiveCodeEditor
          scopeId="flex-shorthand"
          previewHeight="700px"
          codeHeight="600px"
          initialCss={`.container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 2px solid #dee2e6;
}

/* flex: 1 (공간 균등 분배) */
.flex-1 {
  flex: 1; /* = flex: 1 1 0 */
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
}

/* flex: 0 0 150px (고정 크기) */
.flex-fixed {
  flex: 0 0 150px; /* grow: 0, shrink: 0, basis: 150px */
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
}

/* flex: 2 1 100px (2배 더 늘어남) */
.flex-2 {
  flex: 2 1 100px; /* grow: 2, shrink: 1, basis: 100px */
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
}

/* flex: 1 1 200px (기본 200px, 유연함) */
.flex-basis {
  flex: 1 1 200px; /* grow: 1, shrink: 1, basis: 200px */
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  text-align: center;
}`}
          initialHtml={`<!-- 예제 1: flex: 1 (균등 분배) -->
<div class="container">
  <div class="flex-1">flex: 1</div>
  <div class="flex-1">flex: 1</div>
  <div class="flex-1">flex: 1</div>
</div>

<!-- 예제 2: 고정 + 유연 -->
<div class="container">
  <div class="flex-fixed">고정<br/>150px</div>
  <div class="flex-1">flex: 1<br/>(남는 공간)</div>
  <div class="flex-fixed">고정<br/>150px</div>
</div>

<!-- 예제 3: 다른 비율 -->
<div class="container">
  <div class="flex-1">flex: 1</div>
  <div class="flex-2">flex: 2<br/>(2배 더 큼)</div>
  <div class="flex-1">flex: 1</div>
</div>

<!-- 예제 4: flex-basis 활용 -->
<div class="container">
  <div class="flex-basis">flex: 1 1 200px</div>
  <div class="flex-basis">flex: 1 1 200px</div>
</div>

<div class="info-box">
  <strong>각 예제 설명:</strong><br/>
  1. 세 개 모두 <code>flex: 1</code> → 공간 균등 분배<br/>
  2. 고정 크기(150px) + 유연한 중앙 영역<br/>
  3. <code>flex: 2</code>는 <code>flex: 1</code>보다 2배 더 큼<br/>
  4. <code>flex-basis: 200px</code>로 시작, 공간에 따라 조절
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Flex-grow vs Flex-shrink */}
      <CollapsibleSection title="Flex-grow vs Flex-shrink: 공간 차지의 비밀">
        <div className="section-description">
          <p>
            <code>flex-grow</code>와 <code>flex-shrink</code>는 Flexbox의 핵심입니다.
            <strong>내용물이 없어도 공간을 차지할지</strong> 여부를 결정합니다.
          </p>
          <ul className="description-list">
            <li>
              <strong>flex-grow</strong>: 남는 공간이 있을 때 <strong>얼마나 늘어날지</strong> 결정
              <br />
              <span className="example-text">
                → 값이 0이면 늘어나지 않음, 1 이상이면 남는 공간을 비율대로 차지
              </span>
            </li>
            <li>
              <strong>flex-shrink</strong>: 공간이 부족할 때 <strong>얼마나 줄어들지</strong> 결정
              <br />
              <span className="example-text">
                → 값이 0이면 절대 줄어들지 않음, 1 이상이면 비율대로 축소
              </span>
            </li>
            <li>
              <strong>flex-basis</strong>: 늘어나거나 줄어들기 <strong>전의 기본 크기</strong>
              <br />
              <span className="example-text">
                → auto(기본값), px, %, rem 등 사용 가능
              </span>
            </li>
          </ul>
          <p className="highlight-box">
            💡 <strong>핵심</strong>: <code>flex: 1</code>은 <code>flex-grow: 1; flex-shrink: 1; flex-basis: 0</code>의 축약형입니다!
          </p>
        </div>

        <LiveCodeEditor
          scopeId="flex-grow-shrink"
          previewHeight="600px"
          codeHeight="550px"
          initialCss={`/* 컨테이너 */
.flex-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* flex-grow: 0 (기본값) - 내용물만큼만 차지 */
.no-grow {
  flex-grow: 0;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
}

/* flex-grow: 1 - 남는 공간 차지 */
.grow-1 {
  flex-grow: 1;
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
}

/* flex-grow: 2 - 2배 더 많이 차지 */
.grow-2 {
  flex-grow: 2;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
}

/* flex-shrink 예제 */
.shrink-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #fff3cd;
  border-radius: 8px;
  width: 250px; /* 좁은 컨테이너: 250px */
  border: 2px dashed #f39c12;
}

.no-shrink {
  flex-shrink: 0;
  width: 200px; /* 고정 너비 200px */
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.can-shrink {
  flex-shrink: 1;
  width: 200px; /* 초기 너비 200px */
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  padding: 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}`}
          initialHtml={`<!-- flex-grow 비교 -->
<div class="flex-container">
  <div class="no-grow">grow: 0<br/>(내용만큼)</div>
  <div class="grow-1">grow: 1<br/>(남는 공간 차지)</div>
  <div class="grow-2">grow: 2<br/>(2배 더 차지)</div>
</div>

<!-- flex-shrink 비교 -->
<div class="shrink-container">
  <div class="no-shrink">shrink: 0<br/>(200px 유지)</div>
  <div class="can-shrink">shrink: 1<br/>(줄어듦!)</div>
</div>

<div class="info-box">
  <strong>위 예제 설명:</strong><br/>
  • grow: 0은 내용물 크기만큼만 차지<br/>
  • grow: 1은 남는 공간을 균등하게 차지<br/>
  • grow: 2는 grow: 1보다 2배 더 차지<br/><br/>
  <strong>shrink 예제 (중요!):</strong><br/>
  • 컨테이너: 250px (좁음)<br/>
  • 두 아이템: 각각 200px = 총 400px + gap<br/>
  • 공간 부족! → shrink: 1인 아이템만 줄어듦<br/>
  • shrink: 0인 아이템은 200px 유지 (넘쳐도 OK)
</div>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="빈 요소도 공간 차지하기">
        <div className="section-description">
          <p>
            <code>flex-grow: 1</code>의 가장 큰 장점: <strong>내용물이 거의 없거나 없어도 공간을 차지</strong>합니다!
          </p>
          <p className="highlight-box">
            💡 <strong>핵심 차이</strong>: <code>flex-grow: 0</code>은 내용물만큼만 차지하지만,
            <code>flex-grow: 1</code>은 빈 공간도 채웁니다!
          </p>
        </div>

        <LiveCodeEditor
          scopeId="flex-empty-content"
          previewHeight="600px"
          codeHeight="500px"
          initialCss={`/* 비교 컨테이너 */
.comparison {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  min-height: 120px;
  border: 2px solid #dee2e6;
}

/* grow: 0 - 내용물만큼만 차지 */
.no-grow-box {
  flex-grow: 0;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* grow: 1 - 빈 공간도 채움! */
.grow-box {
  flex-grow: 1;
  background: linear-gradient(135deg, #27ae60, #229954);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 고정 크기 박스 */
.fixed-box {
  flex: 0 0 150px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}`}
          initialHtml={`<!-- 예제 1: grow: 0 (내용물만큼) -->
<div class="comparison">
  <div class="fixed-box">고정<br/>150px</div>
  <div class="no-grow-box">grow: 0<br/>(작음)</div>
  <div class="fixed-box">고정<br/>150px</div>
</div>

<!-- 예제 2: grow: 1 (공간 채움) -->
<div class="comparison">
  <div class="fixed-box">고정<br/>150px</div>
  <div class="grow-box">grow: 1 (남는 공간 모두 차지!)</div>
  <div class="fixed-box">고정<br/>150px</div>
</div>

<div class="info-box">
  <strong>차이점 확인:</strong><br/>
  • 위 예제: <code>flex-grow: 0</code> → 텍스트만큼만 차지 (좁음)<br/>
  • 아래 예제: <code>flex-grow: 1</code> → 남는 공간 모두 차지 (넓음)<br/><br/>
  <strong>실전 활용:</strong><br/>
  사이드바는 고정 크기, 메인 영역은 <code>flex: 1</code>로 설정하면<br/>
  메인 영역이 내용물과 관계없이 남는 공간을 모두 채웁니다!
</div>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="실전 예제: 네비게이션 바">
        <p className="section-description">
          Flexbox를 사용한 실제 네비게이션 바 레이아웃입니다. 로고는 왼쪽, 메뉴는 오른쪽에 배치합니다.
        </p>

        <LiveCodeEditor
          scopeId="flexbox-navbar"

          codeHeight="750px"
          initialCss={`.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: rgba(333,100,255,0.9);
}`}
          initialHtml={`<nav class="navbar">
  <div class="logo">🚀 MyApp</div>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="실전 예제: 카드 레이아웃">
        <div className="section-description">
          <p>
            Flexbox로 반응형 카드 그리드를 만듭니다. <code>flex-wrap: wrap</code>과 <code>flex-basis</code>를 활용합니다.
          </p>
          <p className="highlight-box">
            💡 <strong>핵심</strong>: <code>flex: 1 1 200px</code>는
            "기본 200px로 시작하되, 공간이 남으면 늘어나고 부족하면 줄어든다"는 의미입니다!
            <br />
            • <code>flex-grow: 1</code> - 남는 공간 차지
            <br />
            • <code>flex-shrink: 1</code> - 공간 부족하면 축소
            <br />
            • <code>flex-basis: 200px</code> - 기본 크기 200px
          </p>
        </div>

        <LiveCodeEditor
          scopeId="flexbox-cards"
          codeHeight="750px"
          initialCss={`.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
  background-color: #f1f5f9;
  border-radius: 12px;
}

.card {
  flex: 1 1 200px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
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
}`}
          initialHtml={`<div class="card-container">
  <div class="card">
    <div class="card-icon">⚡</div>
    <div class="card-title">빠른 속도</div>
    <div class="card-desc">최적화된 성능으로 빠른 로딩</div>
  </div>
  <div class="card">
    <div class="card-icon">🔒</div>
    <div class="card-title">보안</div>
    <div class="card-desc">안전한 데이터 보호</div>
  </div>
  <div class="card">
    <div class="card-icon">🎨</div>
    <div class="card-title">디자인</div>
    <div class="card-desc">모던한 UI/UX</div>
  </div>
  <div class="card">
    <div class="card-icon">📱</div>
    <div class="card-title">반응형</div>
    <div class="card-desc">모든 기기에서 완벽하게</div>
  </div>
</div>`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="실전 예제: 센터링 마스터">
        <p className="section-description">
          Flexbox로 요소를 완벽하게 가운데 정렬하는 가장 쉬운 방법입니다.
        </p>

        <LiveCodeEditor
          scopeId="flexbox-center"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 12px;
}

.centered-box {
  background: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  text-align: center;
}

.centered-box h3 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.centered-box p {
  margin: 0;
  color: #64748b;
}`}
          initialHtml={`<div class="center-container">
  <div class="centered-box">
    <h3>완벽한 센터링!</h3>
    <p>justify-content + align-items = ❤️</p>
  </div>
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default FlexboxStudy;
