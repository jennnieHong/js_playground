/**
 * ResponsiveStudy 페이지 컴포넌트
 * 미디어 쿼리, 유동적 단위(%, vw, vh), 현대적인 반응형 함수(clamp, min, max) 등을 학습하는 페이지입니다.
 * 주요 개념: Mobile First, Responsive Typography, Fluid Layout, Grid auto-fit
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function ResponsiveStudy() {
  // --- 상태 관리 (State Management) ---
  // 유동적 단위(rem, vw, vh)의 변화를 실시간으로 테스트하기 위한 상태입니다.
  const [fluidUnit, setFluidUnit] = useState('rem');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Responsive Design"
        subtitle="Modern techniques: Media Queries, clamp(), fluid units, Container Queries"
      />

      {/* 기초 섹션: 반응형 디자인의 역사와 진화 */}

      <CollapsibleSection title="반응형 디자인 진화">
        <div className="section-description">
          <p>
            반응형 디자인은 단순히 Media Query를 넘어 더 정교한 기술로 진화했습니다:
          </p>
          <ul className="description-list">
            <li><strong>Media Queries</strong>: 뷰포트 크기 기반 (전통적)</li>
            <li><strong>Fluid Units</strong>: %, vw, vh로 유연한 크기</li>
            <li><strong>clamp()</strong>: 최소/최대 값을 가진 유동적 크기</li>
            <li><strong>Container Queries</strong>: 컨테이너 크기 기반 (현대적)</li>
          </ul>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Media Queries 기본">
        <p className="section-description">
          뷰포트 크기에 따라 스타일을 변경하는 가장 기본적인 방법입니다.
        </p>

        <LiveCodeEditor
          scopeId="media-queries"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`/* Mobile First 접근 */
.responsive-box {
  width: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
}

/* Tablet (768px 이상) */
@media (min-width: 768px) {
  .responsive-box {
    padding: 2rem;
    font-size: 1.2rem;
  }
}

/* Desktop (1024px 이상) */
@media (min-width: 1024px) {
  .responsive-box {
    padding: 3rem;
    font-size: 1.5rem;
  }
}`}
          initialHtml={`<div class="responsive-box">
  Resize your browser window!
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Breakpoints:</strong><br/>
  • Mobile: ~ 767px<br/>
  • Tablet: 768px ~ 1023px<br/>
  • Desktop: 1024px+
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: clamp() (미디어 쿼리 없는 반응형 타이포그래피) */}
      <CollapsibleSection title="clamp() - 반응형의 게임 체인저">
        <div className="section-description">
          <p>
            <code>clamp(최소값, 선호값, 최대값)</code>은 반응형 타이포그래피의 혁명입니다.<br />
            Media Query 없이 유동적인 크기를 만들 수 있습니다!
          </p>
        </div>

        <LiveCodeEditor
          scopeId="clamp-demo"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.clamp-demo {
  /* 최소 16px, 뷰포트 기준 유동, 최대 32px */
  font-size: clamp(1rem, 2vw + 1rem, 2rem);
  
  /* 최소 300px, 뷰포트의 80%, 최대 800px */
  width: clamp(300px, 80vw, 800px);
  
  margin: 0 auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  color: #1e293b;
  line-height: 1.6;
}

.clamp-demo h3 {
  margin: 0 0 1rem 0;
  /* 제목도 clamp로 반응형 */
  font-size: clamp(1.5rem, 3vw + 1rem, 3rem);
}`}
          initialHtml={`<div class="clamp-demo">
  <h3>Responsive Typography</h3>
  <p>
    이 텍스트는 clamp()를 사용하여 브라우저 크기에 맞춰 
    자동으로 크기가 조정됩니다. Media Query가 전혀 필요 없습니다!
  </p>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>브라우저 크기를 바꿔보세요!</strong><br/>
  폰트 크기와 너비가 부드럽게 변경됩니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: min() & max() (조건부 레이아웃 제어) */}
      <CollapsibleSection title="min() & max() - 조건부 크기 제어">
        <div className="section-description">
          <p>
            <code>min()</code>과 <code>max()</code>는 여러 값 중에서 자동으로 선택해주는 똑똑한 함수입니다.
          </p>
          <ul className="description-list">
            <li>
              <strong>min(A, B)</strong>: A와 B 중 <strong>작은 값</strong>을 선택
              <br />
              <span className="example-text">
                → 예: <code>width: min(90vw, 600px)</code> = "화면이 작으면 90vw, 크면 600px로 제한"
              </span>
            </li>
            <li>
              <strong>max(A, B)</strong>: A와 B 중 <strong>큰 값</strong>을 선택
              <br />
              <span className="example-text">
                → 예: <code>min-height: max(300px, 50vh)</code> = "최소 300px는 보장, 화면이 크면 50vh"
              </span>
            </li>
          </ul>
          <p className="highlight-box">
            💡 <strong>핵심 개념</strong>: 미디어 쿼리 없이도 "최대 너비 제한" 또는 "최소 높이 보장"을 구현할 수 있습니다!
          </p>
        </div>

        <LiveCodeEditor
          scopeId="min-max"
          previewHeight="450px"
          codeHeight="450px"
          initialCss={`.min-max-demo {
  /* min(): 두 값 중 작은 값 선택 */
  /* 작은 화면: 90vw (화면의 90%) */
  /* 큰 화면: 600px (최대 너비 제한) */
  width: min(90vw, 600px);
  
  /* max(): 두 값 중 큰 값 선택 */
  /* 작은 화면: 300px (최소 높이 보장) */
  /* 큰 화면: 50vh (화면 높이의 50%) */
  min-height: max(300px, 50vh);
  
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-align: center;
  flex-direction: column;
  gap: 1rem;
}`}
          initialHtml={`<div class="min-max-demo">
  <div>
    <strong>width: min(90vw, 600px)</strong><br/>
    → 화면 너비의 90% 또는 600px 중 작은 값
  </div>
  <div>
    <strong>min-height: max(300px, 50vh)</strong><br/>
    → 300px 또는 화면 높이의 50% 중 큰 값
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>브라우저 크기를 조절해보세요!</strong><br/>
  • 작은 화면: 너비가 화면에 맞춰 줄어들고, 높이는 최소 300px 유지<br/>
  • 큰 화면: 너비는 600px로 제한되고, 높이는 화면의 50%로 증가
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Fluid Units (뷰포트 기반 유동 단위) */}
      <CollapsibleSection title="Fluid Units (%, vw, vh)">
        <p className="section-description">
          뷰포트 단위로 진정한 유동적 레이아웃을 만듭니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'Unit',
              type: 'radio',
              value: fluidUnit,
              onChange: setFluidUnit,
              options: [
                { value: 'rem', label: 'Fixed (rem)' },
                { value: 'vw', label: 'Viewport Width (vw)' },
                { value: 'vh', label: 'Viewport Height (vh)' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="fluid-units"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.fluid-demo {
  ${fluidUnit === 'rem' ? 'width: 20rem; height: 10rem;' :
              fluidUnit === 'vw' ? 'width: 50vw; height: 20vw;' :
                'width: 50vw; height: 30vh;'}
  
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
  margin: 0 auto;
}`}
          currentCss={`.fluid-demo {
  ${fluidUnit === 'rem' ? 'width: 20rem; height: 10rem;' :
              fluidUnit === 'vw' ? 'width: 50vw; height: 20vw;' :
                'width: 50vw; height: 30vh;'}
  
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 8px;
  margin: 0 auto;
}`}
          initialHtml={`<div class="fluid-demo">
  ${fluidUnit === 'rem' ? 'Fixed Size (rem)' :
              fluidUnit === 'vw' ? 'Viewport Width (vw)' :
                'Viewport Height (vh)'}
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  브라우저 크기를 변경하면서 차이를 확인하세요!
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 반응형 카드 그리드 (실무 패턴) */}
      <CollapsibleSection title="실전: 반응형 카드 그리드">
        <div className="section-description">
          <p>
            지금까지 배운 모든 기법을 조합하여 <strong>미디어 쿼리 없이</strong> 완벽한 반응형 카드 그리드를 만듭니다!
          </p>
          
          <div style={{ 
            marginTop: '1.5rem', padding: '1.5rem', background: '#f0f9ff', 
            borderRadius: '12px', border: '1px solid #0ea5e9' 
          }}>
            <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>🎯 사용된 현대적 기법</h4>
            <ul style={{ marginBottom: 0, color: '#075985', lineHeight: '1.8' }}>
              <li>
                <strong>auto-fit</strong> - 화면 크기에 맞춰 자동으로 열 개수 조정<br />
                <small style={{ color: '#0284c7' }}>
                  예: 큰 화면은 3열, 중간 화면은 2열, 작은 화면은 1열
                </small>
              </li>
              <li>
                <strong>minmax(250px, 1fr)</strong> - 각 카드의 최소/최대 너비 지정<br />
                <small style={{ color: '#0284c7' }}>
                  예: 최소 250px 보장, 남는 공간은 균등 분배
                </small>
              </li>
              <li>
                <strong>clamp(1rem, 2vw, 2rem)</strong> - 카드 사이 간격을 유동적으로<br />
                <small style={{ color: '#0284c7' }}>
                  예: 작은 화면 1rem, 큰 화면 2rem, 중간은 부드럽게 증가
                </small>
              </li>
              <li>
                <strong>min(100%, 1200px)</strong> - 그리드 전체 너비 제한<br />
                <small style={{ color: '#0284c7' }}>
                  예: 작은 화면은 100%, 큰 화면은 최대 1200px
                </small>
              </li>
            </ul>
          </div>

          <div style={{ 
            marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', 
            borderRadius: '10px', border: '1px solid #f59e0b' 
          }}>
            <strong style={{ color: '#92400e' }}>💡 핵심 원리</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7' }}>
              <code>repeat(auto-fit, minmax(250px, 1fr))</code>의 의미:<br />
              • <strong>repeat</strong>: 열을 반복 생성<br />
              • <strong>auto-fit</strong>: 공간에 맞춰 자동으로 열 개수 결정 (1열, 2열, 3열...)<br />
              • <strong>minmax(250px, 1fr)</strong>: 각 카드는 최소 250px, 남는 공간은 균등 분배<br />
              → 결과: 화면 크기가 변해도 자동으로 최적의 레이아웃!
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="responsive-grid"
          previewHeight="350px"
          codeHeight="550px"
          initialCss={`.responsive-grid {
  display: grid;
  /* auto-fit: 자동으로 열 개수 조정 */
  /* minmax: 최소 250px, 최대 1fr */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 2rem);
  width: min(100%, 1200px);
  margin: 0 auto;
}

.grid-card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.grid-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #1e293b;
}

.grid-card p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
}`}
          initialHtml={`<div class="responsive-grid">
  <div class="grid-card">
    <h4>Card 1</h4>
    <p>Automatically responsive with auto-fit and minmax!</p>
  </div>
  <div class="grid-card">
    <h4>Card 2</h4>
    <p>No media queries needed for this grid.</p>
  </div>
  <div class="grid-card">
    <h4>Card 3</h4>
    <p>Resize the window to see magic happen.</p>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Production-ready!</strong> 이 패턴을 실제 프로젝트에 바로 사용하세요.
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default ResponsiveStudy;
