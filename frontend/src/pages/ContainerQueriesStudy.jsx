/**
 * ContainerQueriesStudy.jsx
 * 뷰포트가 아닌 부모 요소의 크기에 반응하는 컨테이너 쿼리(Container Queries) 실습 페이지
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function ContainerQueriesStudy() {
  // 상태 관리: 컨테이너 박스의 너비 전환 (column, row)
  const [cardLayout, setCardLayout] = useState('column');

  return (
    <div className="page-container">
      <PageHeader
        title="Container Queries"
        subtitle="뷰포트를 넘어 요소 중심의 반응형 디자인으로"
      />

      {/* 섹션 1: 컨테이너 쿼리의 등장 배경과 필요성 */}
      <CollapsibleSection title="미디어 쿼리의 한계를 극복하다">
        <div className="section-description">
          <p>
            과거에는 라우저 창(Viewport) 크기만 알 수 있었지만, 이제는 <strong>특정 부모 요소의 크기</strong>를 기준으로 스타일을 바꿀 수 있습니다.
            이것이 가능한 이유는 <code>@container</code> 덕분입니다.
          </p>
          <ul className="description-list">
            <li><strong>독립성</strong>: 컴포넌트가 어디에 위치하든 자기 자신의 너비에 맞춰 레이아웃 변경</li>
            <li><strong>재사용성</strong>: 사이드바든 메인 영역이든 하나의 컴포넌트 코드로 대응</li>
            <li><strong>정교함</strong>: 뷰포트와 상관없이 실제 공간에 최적화된 스타일 적용</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: 컨테이너 기준점 선언 및 탐색 메커니즘 */}
      <CollapsibleSection title="기본 메커니즘: Containment">
        <div className="section-description">
          <p>컨테이너 쿼리를 쓰려면 부모를 <strong>기준점(Container)</strong>으로 정의해야 하며, 브라우저는 다음과 같은 규칙으로 기준을 찾습니다.</p>
          <div className="info-box" style={{ background: '#f8fafc', borderLeft: '4px solid #3b82f6', marginTop: '1rem' }}>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.8' }}>
              <li><strong>기준점 선언</strong>: 조상 요소에 <code>container-type: inline-size</code>를 설정해야 합니다.</li>
              <li><strong>가장 가까운 조상 탐색</strong>: <code>@container</code>는 DOM 트리를 타고 상승하며 <strong>가장 가까운 컨테이너 요소</strong>를 자동으로 찾아 크기를 측정합니다.</li>
              <li><strong>이름 기반 탐색</strong>: <code>@container이름 (min-width: 450px)</code>처럼 이름을 지정하면, 여러 컨테이너가 겹쳐 있어도 정확히 해당 이름을 가진 조상을 찾아갑니다.</li>
            </ul>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Container Width',
              type: 'radio',
              value: cardLayout,
              onChange: setCardLayout,
              options: [
                { value: 'column', label: 'Narrow (300px)' },
                { value: 'row', label: 'Wide (650px)' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="cq-basic-demo"
          previewHeight="450px"
          codeHeight="600px"
          initialCss={`.parent-box {
  /* 1. 컨테이너 타입을 정의합니다 (주로 inline-size) */
  container-type: inline-size;
  container-name: card-wrapper;
  
  width: ${cardLayout === 'column' ? '300px' : '650px'};
  background: #f1f5f9;
  padding: 20px;
  border-radius: 12px;
  transition: 0.4s ease;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.image {
  width: 100%;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 6px;
}

/* 2. 컨테이너 크기에 따른 쿼리 작성 */
@container card-wrapper (min-width: 450px) {
  .card {
    flex-direction: row; /* 넓어지면 가로로 배치 */
    align-items: center;
  }
  .image {
    width: 200px;
    aspect-ratio: 1;
  }
  .desc { font-size: 1.1rem; }
}

.title { margin: 0; color: #1e293b; }
.desc { margin: 0.5rem 0 0; color: #64748b; font-size: 0.9rem; }`}
          currentCss={`.parent-box {
  /* 1. 컨테이너 타입을 정의합니다 (주로 inline-size) */
  container-type: inline-size;
  container-name: card-wrapper;
  
  width: ${cardLayout === 'column' ? '300px' : '650px'};
  background: #f1f5f9;
  padding: 20px;
  border-radius: 12px;
  transition: 0.4s ease;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.image {
  width: 100%;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 6px;
}

/* 2. 컨테이너 크기에 따른 쿼리 작성 */
@container card-wrapper (min-width: 450px) {
  .card {
    flex-direction: row; /* 넓어지면 가로로 배치 */
    align-items: center;
  }
  .image {
    width: 200px;
    aspect-ratio: 1;
  }
  .desc { font-size: 1.1rem; }
}

.title { margin: 0; color: #1e293b; }
.desc { margin: 0.5rem 0 0; color: #64748b; font-size: 0.9rem; }`}
          initialHtml={`<div class="parent-box">
  <div class="card">
    <div class="image"></div>
    <div class="info">
      <h3 class="title">스마트 컴포넌트</h3>
      <p class="desc">부모의 너비가 450px을 넘어가면 자동으로 가로 레이아웃으로 변신합니다!</p>
    </div>
  </div>
</div>

<div class="info-box">
  위의 라디오 버튼으로 부모 박스의 크기를 조절해보세요. <br/>
  브라우저 전체 창을 줄이지 않아도 <strong>요소 내부적으로</strong> 반응형이 작동합니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: 컨테이너 크기에 비례하는 상대 단위 (CQ Units) */}
      <CollapsibleSection title="CQ Units: 컨테이너 전용 단위">
        <div className="section-description">
          <p>뷰포트 단위(vw) 대신 컨테이너 너비에 비례하는 <code>cqw</code> 단위를 쓰면 폰트 크기까지 완벽하게 스케일링됩니다.</p>
        </div>

        <LiveCodeEditor
          scopeId="cq-units-demo"
          previewHeight="400px"
          codeHeight="500px"
          initialCss={`.responsive-container {
  container-type: inline-size;
  border: 4px dashed #cbd5e1;
  padding: 2rem;
  resize: horizontal; /* 직접 조절해보세요! */
  overflow: hidden;
  min-width: 200px;
  max-width: 100%;
}

.cq-text {
  /* 컨테이너 너비의 8%로 폰트 크기 설정 */
  font-size: 8cqw; 
  font-weight: 800;
  text-align: center;
  background: linear-gradient(to right, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.cq-info {
  font-size: 3cqw;
  color: #64748b;
  text-align: center;
}`}
          initialHtml={`<div class="responsive-container">
  <h1 class="cq-text">SCALING TEXT</h1>
  <p class="cq-info">Container Query Units (cqw)</p>
</div>

<div class="info-box">
  오른쪽 하단 모서리를 잡고 박스 너비를 조절해보세요. <br/>
  (일부 브라우저에서는 Resize 핸들이 보이지 않을 수 있습니다. 뷰포트 크기를 조절해도 컨테이너가 가변적이라면 변화를 확인할 수 있습니다.)
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3-1: Resize 핸들 상세 설명 */}
      <CollapsibleSection title="Resize 핸들 구현 원리">
        <div className="section-description">
          <p>
            위 예제에서 사용한 <code>resize</code> 속성은 CSS만으로 사용자가 요소 크기를 조절할 수 있게 만듭니다.
            JavaScript 없이 순수 CSS 기능으로 작동합니다.
          </p>
          <div className="info-box" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', marginTop: '1rem' }}>
            <p style={{ margin: 0, lineHeight: '1.8' }}>
              <strong>⚡ 핵심 조건:</strong> <code>resize</code>가 작동하려면 <code>overflow</code>가 <code>visible</code>이 아니어야 합니다!<br />
              → <code>overflow: hidden</code>, <code>auto</code>, 또는 <code>scroll</code> 필수
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="resize-property-demo"
          previewHeight="550px"
          codeHeight="600px"
          initialCss={`/* Resize 속성의 모든 옵션 */

/* 1. resize: both - 가로/세로 모두 조절 */
.resize-both {
  width: 200px;
  height: 150px;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  resize: both;          /* 핵심: both */
  overflow: hidden;      /* 필수 조건! */
  margin: 1rem;
  
  /* 크기 제한 */
  min-width: 150px;
  max-width: 400px;
  min-height: 100px;
  max-height: 300px;
}

/* 2. resize: horizontal - 가로만 조절 */
.resize-horizontal {
  width: 250px;
  height: 100px;
  padding: 1rem;
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: white;
  border-radius: 8px;
  resize: horizontal;    /* 가로만 */
  overflow: auto;        /* auto도 가능 */
  margin: 1rem;
  min-width: 150px;
  max-width: 450px;
}

/* 3. resize: vertical - 세로만 조절 */
.resize-vertical {
  width: 250px;
  height: 100px;
  padding: 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 8px;
  resize: vertical;      /* 세로만 */
  overflow: scroll;      /* scroll도 가능 */
  margin: 1rem;
  min-height: 80px;
  max-height: 250px;
}

/* 4. resize: none - 조절 불가 (기본값) */
.resize-none {
  width: 250px;
  height: 100px;
  padding: 1rem;
  background: #94a3b8;
  color: white;
  border-radius: 8px;
  resize: none;          /* 핸들 없음 */
  overflow: hidden;
  margin: 1rem;
}

/* ❌ 작동 안하는 예시 */
.resize-broken {
  width: 250px;
  height: 100px;
  padding: 1rem;
  background: #ef4444;
  color: white;
  border-radius: 8px;
  resize: both;
  overflow: visible;     /* visible이면 작동 안함! */
  margin: 1rem;
  border: 2px dashed #fca5a5;
}

/* 실무 활용: 컨테이너 쿼리와 조합 */
.resize-with-cq {
  container-type: inline-size;
  width: 300px;
  padding: 1.5rem;
  background: #f8fafc;
  border: 2px solid #cbd5e1;
  border-radius: 8px;
  resize: horizontal;
  overflow: hidden;
  margin: 1rem;
  min-width: 200px;
  max-width: 500px;
}

.responsive-content {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
}

.responsive-title {
  font-size: 6cqw;  /* 컨테이너 너비의 6% */
  font-weight: bold;
  color: #1e293b;
  margin: 0;
}

.responsive-desc {
  font-size: 3cqw;  /* 컨테이너 너비의 3% */
  color: #64748b;
  margin: 0.5rem 0 0;
}

@container (max-width: 300px) {
  .responsive-content {
    background: #fef3c7;
  }
  .responsive-title {
    color: #78350f;
  }
}

@container (min-width: 400px) {
  .responsive-content {
    background: #dbeafe;
  }
  .responsive-title {
    color: #1e40af;
  }
}
`}
          initialHtml={`<div style="color: #1d1f22ff;background: white; padding: 1.5rem; border-radius: 12px;">
  <h4 style="margin-top: 0;">🎯 Resize 속성 전체 옵션</h4>
  <p style=" font-size: 0.9rem; margin-bottom: 1.5rem;">
    우측 하단 핸들(⋰)을 드래그하여 크기를 조절해보세요!
  </p>
  
  <div class="resize-both">
    <strong>resize: both</strong><br/>
    가로/세로 모두 조절 가능<br/>
    (핸들이 보이면 드래그해보세요!)
  </div>
  
  <div class="resize-horizontal">
    <strong>resize: horizontal</strong><br/>
    가로만 조절 가능
  </div>
  
  <div class="resize-vertical">
    <strong>resize: vertical</strong><br/>
    세로만 조절 가능
  </div>
  
  <div class="resize-none">
    <strong>resize: none</strong><br/>
    조절 불가 (핸들 없음)
  </div>
  
  <div class="resize-broken">
    <strong>❌ resize: both + overflow: visible</strong><br/>
    작동 안함! (overflow가 visible이라 핸들이 안 보임)
  </div>

  <hr style="margin: 2rem 0; border: 1px solid #e5e7eb;">

  <h4 style="color: #1d1f22ff; ">🔥 실무 활용: Resize + Container Queries</h4>
  <p style="font-size: 0.9rem;">
    크기를 조절하면 텍스트와 배경색이 자동으로 변합니다!
  </p>
  
  <div class="resize-with-cq">
    <div class="responsive-content">
      <h3 class="responsive-title">RESIZE ME!</h3>
      <p class="responsive-desc">Container Query Units (cqw) 적용</p>
    </div>
  </div>
</div>

<div style="color: #1d1f22ff; background: #dbeafe; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #3b82f6;">
  <strong>📐 Resize 속성 요약:</strong><br/><br/>
  
  • <code>resize: both</code> → 가로/세로 모두<br/>
  • <code>resize: horizontal</code> → 가로만<br/>
  • <code>resize: vertical</code> → 세로만<br/>
  • <code>resize: none</code> → 조절 불가 (기본값)<br/><br/>
  
  <strong>⚠️ 필수 조건:</strong> <code>overflow</code>가 <code>visible</code>이 아니어야 함!<br/>
  <strong>💡 실무 팁:</strong> <code>min-width/max-width</code>로 크기 범위 제한 가능
</div>

<div style="color: #1d1f22ff; background: #fef3c7; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #f59e0b;">
  <strong>📱 브라우저 호환성:</strong><br/>
  • ✅ 모든 모던 브라우저 지원<br/>
  • ⚠️ 모바일에서는 핸들이 보이지 않거나 작동하지 않을 수 있음 (터치 인터페이스 한계)<br/>
  • 💡 데스크톱에서 테스트하면 가장 잘 보입니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: 그리드 시스템 내에서의 컴포넌트 독립성 확보 */}
      <CollapsibleSection title="실전 활용: 그리드와의 시너지">
        <div className="section-description">
          <p>
            동일한 카드가 그리드의 너비에 따라 각기 다른 스타일로 보여야 할 때
            컨테이너 쿼리는 최고의 선택입니다.
          </p>
        </div>
        <LiveCodeEditor
          scopeId="cq-grid-synergy"
          previewHeight="250px"
          codeHeight="550px"
          initialCss={`.grid-layout {
  display: grid;
  grid-template-columns: 200px 1fr; /* 사이드바와 메인 */
  gap: 1rem;
}

/* 모든 그리드 아이템을 컨테이너로 설정 */
.grid-item {color: #1d1f22ff;
  container-type: inline-size;
}

.mini-card {
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

/* 컨테이너 너비가 좁을 때 (사이드바) */
@container (max-width: 250px) {
  .mini-card .content { display: none; }
  .mini-card h4 { font-size: 0.8rem; margin: 0; text-align: center; }
}

/* 컨테이너 너비가 넓을 때 (메인 영역) */
@container (min-width: 251px) {
  .mini-card { display: flex; gap: 1rem; align-items: center; }
  .mini-card .icon { font-size: 2rem; }
}
`}
          initialHtml={`<div class="grid-layout">
  <div class="grid-item">
    <div class="mini-card">
      <div class="icon">📁</div>
      <div class="content">
        <h4>사이드바 파일</h4>
        <p>좁아서 간략히 보임</p>
      </div>
    </div>
  </div>
  
  <div class="grid-item">
    <div class="mini-card">
      <div class="icon">📄</div>
      <div class="content">
        <h4>메인 뉴스레터 리포트</h4>
        <p>충분한 공간이 있어 내용을 모두 표시합니다.</p>
      </div>
    </div>
  </div>
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default ContainerQueriesStudy;
