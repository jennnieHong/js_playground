/**
 * BoxModelStudy 페이지 컴포넌트
 * CSS 박스 모델(Content, Padding, Border, Margin)과 box-sizing 속성을 학습하는 페이지입니다.
 * 주요 개념: Box Model 구성, box-sizing (content-box vs border-box), Margin Collapse, Outline, aspect-ratio
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function BoxModelStudy() {
  // --- 상태 관리 (State Management) ---
  // 박스 모델의 각 요소들을 동적으로 조절하기 위한 상태값들입니다.
  const [boxSizing, setBoxSizing] = useState('content-box');
  const [padding, setPadding] = useState('20px');
  const [border, setBorder] = useState('5px');
  const [margin, setMargin] = useState('10px');
  const [layerView, setLayerView] = useState('3D Layers'); // 심화 학습 섹션의 탭 상태
  const [margin1, setMargin1] = useState('50px'); // Margin Collapse용 Box 1 마진
  const [margin2, setMargin2] = useState('30px'); // Margin Collapse용 Box 2 마진

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Box Model Study"
        subtitle="Understanding the CSS Box Model - the foundation of layout"
      />

      {/* Box Model 기초 정의 섹션 */}

      <CollapsibleSection title="Box Model이란?">
        <div className="section-description">
          <p>
            모든 HTML 요소는 <strong>사각형 박스</strong>로 렌더링됩니다. 이 박스는 4개의 영역으로 구성됩니다:
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><strong>Content</strong>: 실제 콘텐츠(텍스트, 이미지 등)가 들어가는 영역</li>
            <li><strong>Padding</strong>: Content와 Border 사이의 안쪽 여백</li>
            <li><strong>Border</strong>: 요소의 테두리</li>
            <li><strong>Margin</strong>: 요소와 다른 요소 사이의 바깥쪽 여백</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            <strong>중요:</strong> <code>width</code>와 <code>height</code>가 어디까지 포함되는지는 <code>box-sizing</code> 속성에 따라 달라집니다!
          </p>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: Box Model 시각화 (개발자 도식) */}
      <CollapsibleSection title="Box Model 시각화">
        <div className="section-description">
          <p>
            박스 모델의 4가지 영역을 <strong>Chrome 개발자 도구</strong>와 동일한 색상으로 시각화했습니다.
            안쪽부터 바깥쪽 순서로 확인해보세요.
          </p>
          <ul style={{
            marginTop: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            listStyle: 'none',
            padding: '1rem',
            background: '#fff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 16, height: 16, background: '#60a5fa', border: '1px solid #bfdbfe', borderRadius: '4px' }}></span>
              <strong>Content</strong> (내용)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 16, height: 16, background: '#4ade80', border: '1px solid #bbf7d0', borderRadius: '4px' }}></span>
              <strong>Padding</strong> (안쪽 여백)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 16, height: 16, background: '#fcd34d', border: '1px solid #fde68a', borderRadius: '4px' }}></span>
              <strong>Border</strong> (테두리)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: 16, height: 16, background: '#fdba74', border: '1px solid #fed7aa', borderRadius: '4px' }}></span>
              <strong>Margin</strong> (바깥 여백)
            </li>
          </ul>
        </div>

        <LiveCodeEditor
          scopeId="box-model-visual"
          previewHeight="600px"
          codeHeight="500px"
          initialCss={`.margin-container {
  /* Margin 영역 시각화 (주황색 배경) */
  background-color: #fdba74; 
  padding: 1px; /* 마진 영역 표시를 위한 최소한의 컨테이너 처리 */
  display: inline-block; /* 중요! Block이면 한 줄을 다 차지해서 마진 영역이 왜곡됨 부모 박스가 자식 콘텐츠 + 마진 크기만큼만 딱 맞게 줄어들도록 강제 */
  border: 1px dashed #c2410c;
}

.box-model-demo {
  box-sizing: content-box; /* 브라우저 기본값이지만, global style로 인해 명시가 필요함 */
  width: 200px;
  height: 100px;
  
  /* --- 2. Padding (안쪽 여백: 초록색) --- */
  padding: 30px; 
  
  /* --- 3. Border (테두리: 노란색) --- */
  border: 10px solid #fcd34d; 
  
  /* --- 4. Margin (바깥 여백: 주황색 배경이 보임) --- */
  margin: 40px; 
  
  /* ★ 시각화 마법 (배경색 분리) ★ */
  /* Content(파랑)와 Padding(초록)을 시각적으로 분리하는 기법 */
  background: 
    linear-gradient(#60a5fa, #60a5fa) content-box, /* Content 영역만 파랗게 */
    linear-gradient(#4ade80, #4ade80) padding-box; /* Padding 영역까지 초록색 */
    
  /* 텍스트 스타일 */
  color: #1e293b; /* 가독성을 위해 어두운 색으로 변경 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}`}
          initialHtml={`<div class="margin-container">
  <div class="box-model-demo">
    Content Area
  </div>
</div>

<div style="margin-top: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
  <h4 style="margin-top: 0; color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">📏 크기 계산기 (box-sizing: content-box 기준)</h4>
  
  <div style="display: grid; grid-template-columns: 1fr auto; gap: 8px; font-family: monospace; font-size: 1rem; max-width: 400px; color: #334155;">
    <!-- Content -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 12px; height: 12px; background: #60a5fa; border-radius: 2px;"></span>
      <span>Width (Content)</span>
    </div>
    <div>200px</div>
    
    <!-- Padding -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 12px; height: 12px; background: #4ade80; border-radius: 2px;"></span>
      <span>Padding (30×2)</span>
    </div>
    <div>+ 60px</div>
    
    <!-- Border -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="width: 12px; height: 12px; background: #fcd34d; border-radius: 2px;"></span>
      <span>Border (10×2)</span>
    </div>
    <div>+ 20px</div>
    
    <!-- Total Width -->
    <div style="border-top: 2px dashed #cbd5e1; padding-top: 8px; font-weight: bold; margin-top: 4px;">
      📦 요소 전체 너비
    </div>
    <div style="border-top: 2px dashed #cbd5e1; padding-top: 8px; font-weight: bold; margin-top: 4px; color: #3b82f6;">
      = 280px
    </div>
    
    <!-- Margin -->
    <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px; color: #ea580c;">
      <span style="width: 12px; height: 12px; background: #fdba74; border-radius: 2px;"></span>
      <span>Margin (40×2)</span>
    </div>
    <div style="margin-top: 8px; color: #ea580c;">+ 80px</div>
    
    <!-- Layout Space -->
    <div style="border-top: 2px solid #94a3b8; padding-top: 8px; font-weight: bold; margin-top: 4px;">
      📐 총 차지 공간
    </div>
    <div style="border-top: 2px solid #94a3b8; padding-top: 8px; font-weight: bold; margin-top: 4px; color: #0f172a;">
      = 360px
    </div>
  </div>

  <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
    <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.9rem' }}>
      <h5 style={{ marginTop: 0, color: '#475569' }}>❓ 왜 364px (너비) 인가요?</h5>
      <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0', lineHeight: '1.6' }}>
        <li>자식 Content(200) + Padding(60) + Border(20) = <strong>280px</strong></li>
        <li>자식 Margin(40×2) = <strong>80px</strong></li>
        <li>부모 Border+Padding(2×2) = <strong>4px</strong></li>
        <li>합계: 280 + 80 + 4 = <strong>364px</strong></li>
      </ul>
    </div>
    <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '8px', fontSize: '0.9rem' }}>
      <h5 style={{ marginTop: 0, color: '#475569' }}>❓ 왜 264px (높이) 인가요?</h5>
      <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0', lineHeight: '1.6' }}>
        <li>자식 Content(100) + Padding(60) + Border(20) = <strong>180px</strong></li>
        <li>자식 Margin(40×2) = <strong>80px</strong></li>
        <li>부모 Border+Padding(2×2) = <strong>4px</strong></li>
        <li>합계: 180 + 80 + 4 = <strong>264px</strong></li>
      </ul>
    </div>
  </div>

  <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#ecfdf5', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
    <h5 style={{ margin: '0 0 0.5rem 0', color: '#065f46' }}>💡 실전 Tip: border-box가 만능은 아닙니다!</h5>
    <p style={{ margin: 0, fontSize: '0.9rem', color: '#065f46', lineHeight: '1.6' }}>
      <code>box-sizing: border-box</code>는 <strong>너비(width)를 고정했을 때</strong> 내부로 깎아먹는 속성입니다.<br/>
      위 예시처럼 너비를 정하지 않은(auto) 상태에서는, 내부 콘텐츠를 다 보여주기 위해 박스가 알아서 늘어납니다.<br/>
      즉, <strong>"고정 너비가 없으면 border-box도 줄어들 공간이 없다"</strong>는 것을 기억하세요!
    </p>
  </div>

  <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
    <h5 style={{ margin: '0 0 0.5rem 0', color: '#475569' }}>🚀 실무에선 어떻게 쓰나요? (Margin vs Padding)</h5>
    <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
      • <strong>Margin</strong>: 다른 요소와의 <strong>거리</strong>를 벌릴 때 씁니다. (배경색 영향 X)<br/>
      • <strong>Padding</strong>: 내 몸체 <strong>내부의 여백</strong>을 줄 때 씁니다. (배경색 영향 O)<br/><br/>
      현대적인 레이아웃(Flex/Grid)에서는 요소마다 Margin을 덕지덕지 붙이기보다는, 부모에게 <code>gap</code> 속성을 주어 간격을 일괄 제어하는 방식을 선호합니다. 그래야 박스 모델 계산이 꼬이지 않거든요!
    </p>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 이론 섹션: Display vs Box-Sizing 차이점 (사용자 Q&A 반영) */}
      <CollapsibleSection title="Q&A: Display와 Box-Sizing의 차이?">
        <div className="section-description">
          <p>
            CSS를 처음 접할 때 가장 헷갈리는 부분입니다. 두 속성은 <strong>역할이 완전히 다릅니다.</strong>
          </p>

          <div style={{ marginTop: '1.5rem', display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>🪑</span> display
              </h4>
              <p style={{ fontWeight: 'bold', color: '#1e293b' }}>"자리를 어떻게 잡을까?"</p>
              <ul style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
                <li><strong>역할</strong>: 박스가 다른 박스들과 어떻게 어우러질지, 내 자식들을 어떻게 줄 세울지 결정합니다.</li>
                <li><strong>비유</strong>: 자리 배치 담당</li>
                <li><strong>대표 값</strong>:
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li><code>block</code>: 한 줄 다 차지할래</li>
                    <li><code>inline-block</code>: 내 크기만큼만 차지할래</li>
                    <li><code>flex</code>: 내 자식들을 자유롭게 정렬할래</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#d97706', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>📐</span> box-sizing
              </h4>
              <p style={{ fontWeight: 'bold', color: '#1e293b' }}>"크기를 어떻게 잴까?"</p>
              <ul style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
                <li><strong>역할</strong>: width/height를 계산할 때 테두리와 패딩을 포함할지 말지 결정합니다.</li>
                <li><strong>비유</strong>: 신체검사 (옷 입고? 벗고?)</li>
                <li><strong>대표 값</strong>:
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li><code>content-box</code>: 내용물만 크기로 칠래 (기본값)</li>
                    <li><code>border-box</code>: 테두리까지 포함해서 크기로 칠래 (권장)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', background: '#f1f5f9', padding: '1rem', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#334155' }}>💡 상황별 추천 설정</h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>
                <strong>박스 안의 글자를 가운데 정렬하고 싶다?</strong> 👉 <code>display: flex</code> (부모에 설정)
              </li>
              <li>
                <strong>박스를 내용물 크기만큼만 딱 맞게 줄이고 싶다?</strong> 👉 <code>display: inline-block</code> 또는 <code>width: fit-content</code>
              </li>
              <li>
                <strong>패딩을 줬더니 박스가 뚱뚱해져서 레이아웃이 깨진다?</strong> 👉 <code>box-sizing: border-box</code>
              </li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 심화 학습: 박스 모델의 계층 구조 (Layer Stacking) */}
      <CollapsibleSection title="심화: 박스 모델의 3D 레이어 구조 (Layer Stacking)">
        <div className="section-description">
          <p>
            "왜 배경색을 칠하면 Margin 영역만 항상 투명하게 보일까요?"<br />
            CSS 박스 모델은 사실 여러 겹의 투명한 종이를 겹쳐놓은 것과 같습니다. 배경색이 어디까지 덮이는지 3D 시각화로 직접 확인해보세요.
          </p>

          <div style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ marginTop: 0, color: '#334155', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              🎨 배경 레이어 구조 (Stacking Layers)
            </h4>

            {/* 버튼형 컨트롤 */}
            <CssPropertyControls
              properties={[
                {
                  name: 'View Layer',
                  type: 'radio',
                  value: layerView,
                  onChange: setLayerView,
                  options: ['3D Layers', 'Margin', 'Border', 'Padding & Content']
                }
              ]}
            />

            <LiveCodeEditor
              scopeId="deep-dive-layers"
              previewHeight="400px"
              codeHeight="400px"
              currentCss={(() => {
                switch (layerView) {
                  case '3D Layers':
                    return `.scene {
  width: 100%;
  height: 100%;
  perspective: 1400px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px; /* 여유 공간 확보 */
}

.box-3d-stack {
  width: 200px;
  height: 120px;
  transform-style: preserve-3d;
  transform: rotateX(60deg) rotateZ(-30deg) scale(0.5); /* scale 추가로 잘림 방지 */
  transition: transform 0.5s ease;
}

.layer {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* 1. Margin (가장 바깥, 투명한 가상 영역) */
.layer-margin {
  padding: 40px;
  margin: -40px; /* 시각적 중앙을 위해 */
  border: 2px dashed #fdba74;
  background: rgba(253, 186, 116, 0.1);
  transform: translateZ(0px);
  color: #ea580c;
}

/* 2. Border (박스의 몸체 시작) */
.layer-border {
  background: #fcd34d;
  border: 1px solid #d97706;
  transform: translateZ(40px);
  color: #92400e;
}

/* 3. Padding (내용과의 유격) */
.layer-padding {
  background: #4ade80;
  margin: 10px; /* Border보다 작게 */
  transform: translateZ(80px);
  color: #166534;
}

/* 4. Content (가장 위, 실제 내용) */
.layer-content {
  background: #60a5fa;
  margin: 30px; /* Padding보다 더 작게 */
  transform: translateZ(120px);
  color: #1e3a8a;
  border: 2px solid white;
}

.scene:hover .box-3d-stack {
  transform: rotateX(50deg) rotateZ(-10deg);
}`;
                  case 'Margin':
                    return `.margin-view-container {
  background-color: #fff7ed; /* 부모 배경 (연한 주황) */
  border: 2px dashed #fdba74;
  padding: 40px;
  text-align: center;
}

.margin-child {
  /* Margin 영역은 투명해서 부모 배경이 보입니다 */
  margin: 40px;
  
  background-color: white;
  border: 1px solid #fdba74;
  border-radius: 8px;
  padding: 20px;
  color: #c2410c;
  font-weight: bold;
  position: relative;
}

.margin-label {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: #ea580c;
  font-size: 0.9rem;
}`;
                  case 'Border':
                    return `.border-view-box {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  
  /* 1. 배경색 (파랑) */
  background-color: #3b82f6;
  
  /* 2. 테두리 (반투명 노랑) */
  /* 반투명해서 배경이 밑에 깔린게 보입니다! */
  border: 20px solid rgba(252, 211, 77, 0.6);
  
  /* 테두리 영역까지 배경을 칠함 (기본값) */
  background-clip: border-box;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}`;
                  case 'Padding & Content':
                  default:
                    return `.clip-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  /* 부모 배경을 어둡게 해서 비어있는(clipped) 영역이 잘 보이게 함 */
  background: #334155; 
  padding: 20px;
  border-radius: 12px;
}

.clip-box {
  width: 140px;
  height: 140px;
  padding: 30px; /* 패딩이 있어야 차이가 보임 */
  border: 4px dashed rgba(255,255,255,0.3);
  background-color: #8b5cf6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 0.8rem;
}

.is-padding-box {
  background-clip: padding-box;
}

.is-content-box {
  background-clip: content-box;
}
.is-border-box {
  background-clip: border-box;
}`;
                }
              })()}
              currentHtml={(() => {
                switch (layerView) {
                  case '3D Layers':
                    return `<div class="scene">
  <div class="box-3d-stack">
    <div class="layer layer-margin">Margin (Empty Space)</div>
    <div class="layer layer-border">Border</div>
    <div class="layer layer-padding">Padding</div>
    <div class="layer layer-content">Content</div>
  </div>
</div>
<p style="text-align: center; color: #64748b; margin-top: 1rem; font-size: 0.9rem;">
  <b>Body 영역</b>: Border + Padding + Content (여기에 배경이 칠해집니다)<br/>
  <b>Margin 영역</b>: 요소 외부의 여백 (항상 투명합니다)
</p>`;
                  case 'Margin':
                    return `<div class="margin-view-container">
  <div class="margin-child">
    <span class="margin-label">⬆️ Margin (투명)</span>
    Content Area
  </div>
</div>`;
                  case 'Border':
                    return `<div class="border-view-box">
  Border Box
</div>
<p style="text-align: center; color: #64748b; margin-top: 1rem; font-size: 0.9rem;">
  테두리를 반투명하게 만들어서<br/>
  배경색이 테두리 밑까지 칠해진 것을<br/>
  확인해보세요.
</p>`;
                  case 'Padding & Content':
                  default:
                    return `<div class="clip-container">
  <div class="clip-box is-padding-box">
    padding-box<br/>(패딩까지 색칠)
  </div>
  <div class="clip-box is-content-box">
    content-box<br/>(내용만 색칠)
  </div>
  <div class="clip-box is-border-box">
    border-box<br/>(테두리까지 색칠)
  </div>
</div>
<p style="text-align: center; color: #64748b; margin-top: 1rem; font-size: 0.9rem;">
  <b>padding-box</b>: 배경이 패딩 영역까지 채워집니다.<br/>
  <b>content-box</b>: 배경이 내용 영역으로 제한되어, 패딩 영역은 투명하게 보입니다.<br/>
  <b>border-box</b>: 배경이 테두리 영역까지 채워집니다.
</p>`;
                }
              })()}
              initialCss=""
              initialHtml=""
            />

          </div>

          <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #6366f1' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#475569' }}>💡 개발자 팁: <code>background-clip</code></h4>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: '#334155' }}>
              위의 'Box Model 시각화' 예제처럼 Content와 Padding의 색을 다르게 하려면, <strong>배경을 여러 겹(Layer)</strong> 쌓고 <code>background-clip</code> 속성을 씁니다.<br /><br />
              <code>background-clip: content-box</code> (내용까지만 칠하기)<br />
              <code>background-clip: padding-box</code> (패딩까지 칠하기)<br />
              <code>background-clip: border-box</code> (테두리까지 칠하기 - 기본값)
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: Box-Sizing 비교 (가장 중요한 레이아웃 설정) */}
      <CollapsibleSection title="Box-Sizing: Content-Box vs Border-Box">
        <div className="section-description">
          <p>
            <strong>가장 중요한 개념!</strong> <code>box-sizing</code>은 width/height가 <strong>어느 영역까지 포함하는지</strong>를 결정합니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>content-box</code> (기본값): width/height는 <strong>Content만</strong> 포함. Padding과 Border는 추가됨.</li>
            <li><code>border-box</code> (권장): width/height는 <strong>Content + Padding + Border</strong> 모두 포함. 크기 예측이 쉬움!</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'box-sizing',
              type: 'radio',
              value: boxSizing,
              onChange: setBoxSizing,
              options: ['content-box', 'border-box']
            },
            {
              name: 'padding',
              type: 'radio',
              value: padding,
              onChange: setPadding,
              options: ['0px', '20px', '40px']
            },
            {
              name: 'border',
              type: 'radio',
              value: border,
              onChange: setBorder,
              options: ['0px', '5px', '10px', '20px']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="box-sizing"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.sized-box {
  box-sizing: ${boxSizing};
  
  /* 모든 박스에 동일한 width 지정 */
  width: 200px;
  height: 100px;
  
  padding: ${padding};
  border: ${border} solid #8b5cf6;
  margin: 10px;
  
  background-color: #ddd6fe;
  color: #5b21b6;
  
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}`}
          currentCss={`.sized-box {
  box-sizing: ${boxSizing};
  width: 200px;
  height: 100px;
  padding: ${padding};
  border: ${border} solid #8b5cf6;
  margin: 10px;
  background-color: #ddd6fe;
  color: #3b0764;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}`}
          currentHtml={(() => {
            const p = parseInt(padding);
            const b = parseInt(border);
            const intrinsicHeight = p * 2 + b * 2;
            const totalWidth = 200 + p * 2 + b * 2;
            const totalHeight = 100 + p * 2 + b * 2;
            const isHeightExpanded = boxSizing === 'border-box' && intrinsicHeight > 100;

            const explanationText = boxSizing === 'content-box'
              ? `<strong>content-box (기본값)</strong>: 내용물(200x100)만 크기로 칩니다.<br />
                     • 실제 총 너비: 200 + (${p}×2) + (${b}×2) = <strong>${totalWidth}px</strong><br />
                     • 실제 총 높이: 100 + (${p}×2) + (${b}×2) = <strong>${totalHeight}px</strong>`
              : `<strong>border-box (권장)</strong>: 테두리까지 포함해서 200x100으로 맞춥니다.<br />
                     • 실제 총 너비: <strong>200px</strong><br />
                     • 실제 총 높이: <strong>${isHeightExpanded ? `${intrinsicHeight}px (🚨 주의!)` : '100px'}</strong>
                     ${isHeightExpanded ? `
                      <div style="margin-top: 0.5rem; padding: 0.5rem; background: #fffbeb; border-radius: 4px; border: 1px solid #fde68a; font-size: 0.85rem">
                        <strong style="color: #92400e">⚠️ 왜 100px보다 커지나요?</strong><br />
                        Padding(${p * 2}px) + Border(${b * 2}px) = ${intrinsicHeight}px입니다.<br />
                        이미 설정한 높이(100px)를 초과했기 때문에, 박스가 패딩을 수용하기 위해 <strong>강제로 확장</strong>되었습니다.
                      </div>` : ''}`;

            return `<div style="display: flex; gap: 20px;">
  <div class="sized-box">Box A</div>
  <div class="sized-box">Box B</div>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
  <p style="margin: 0; font-size: 0.95rem; color: #78350f; line-height: 1.6;">
    <strong>현재: box-sizing: ${boxSizing}</strong><br/>
    ${explanationText}
  </p>
</div>`;
          })()}
          initialHtml=""
        />
      </CollapsibleSection>

      {/* 실습 섹션: Margin Collapse (마진 상쇄 현상) */}
      <CollapsibleSection title="Margin Collapse (마진 상쇄)">
        <div className="section-description">
          <p>
            수직 방향의 margin은 <strong>겹쳐질 때 큰 쪽 하나만 적용</strong>되는 특이한 동작을 합니다. (수평 margin은 항상 합쳐짐)
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li>인접한 형제 요소의 margin-bottom과 margin-top이 만나면 둘 중 큰 값만 적용</li>
            <li>부모와 첫 번째/마지막 자식의 margin도 상쇄될 수 있음</li>
            <li>빈 블록의 margin-top과 margin-bottom도 상쇄됨</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Box 1 margin-bottom',
              type: 'radio',
              value: margin1,
              onChange: setMargin1,
              options: ['0px', '20px', '50px', '80px']
            },
            {
              name: 'Box 2 margin-top',
              type: 'radio',
              value: margin2,
              onChange: setMargin2,
              options: ['0px', '20px', '50px', '80px']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="margin-collapse"
          previewHeight="400px"
          codeHeight="350px"
          currentCss={`.collapse-box {
  width: 100%;
  padding: 1.5rem;
  background-color: #a5f3fc;
  border: 4px solid #0891b2;
  color: #164e63;
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 8px;
}

.box-1 {
  margin-bottom: ${margin1};
}

.box-2 {
  margin-top: ${margin2};
  background-color: #fcd34d;
  border-color: #f59e0b;
  color: #78350f;
}`}
          currentHtml={(() => {
            const m1 = parseInt(margin1);
            const m2 = parseInt(margin2);
            const actualGap = Math.max(m1, m2);

            return `
<div class="collapse-box box-1">
  Box 1 (margin-bottom: ${margin1})
</div>

<div style="background: #fee2e2; border: 1px dashed #ef4444; height: ${actualGap}px; display: flex; align-items: center; justify-content: center; position: relative; margin: 0;">
  <div style="position: absolute; left: 10px; color: #b91c1c; font-weight: bold; font-size: 0.8rem;">
    상쇄된 실제 간격: ${actualGap}px
  </div>
  <div style="width: 100%; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(239, 68, 68, 0.1) 10px, rgba(239, 68, 68, 0.1) 20px);"></div>
</div>

<div class="collapse-box box-2">
  Box 2 (margin-top: ${margin2})
</div>

<div style="margin-top: 1.5rem; padding: 1.5rem; background: #fffbeb; border-radius: 12px; border: 1px solid #fde68a;">
  <h4 style="margin: 0 0 1rem 0; color: #92400e;">🧪 Margin Collapse 실시간 분석</h4>
  <p style="margin: 0; font-size: 1rem; color: #78350f; line-height: 1.6;">
    현재 상단 박스의 <code>margin-bottom</code>은 <strong>${margin1}</strong>이고,<br/>
    하단 박스의 <code>margin-top</code>은 <strong>${margin2}</strong>입니다.<br/><br/>
    
    서로 더해져서 ${m1 + m2}px이 되는 것이 아니라,<br/>
    <strong>둘 중 더 큰 값인 <code>${actualGap}px</code></strong>만 실제 간격으로 적용되었습니다!
  </p>
</div>`;
          })()}
          initialHtml=""
          initialCss=""
        />
      </CollapsibleSection>

      {/* 실습 섹션: Outline vs Border (레이아웃 영향도 비교) */}
      <CollapsibleSection title="Outline vs Border">
        <p className="section-description">
          <code>outline</code>은 <code>border</code>와 달리 공간을 차지하지 않으며, 요소의 외곽에 그려집니다. 포커스 표시 등에 주로 사용됩니다.
        </p>
        <LiveCodeEditor
          scopeId="outline-vs-border"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.box-container {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
}

.base-box {
  width: 100px;
  height: 100px;
  background: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #1e293b;
}

.has-border {
  border: 10px solid #3b82f6;
}

.has-outline {
  outline: 10px solid #ef4444;
  outline-offset: 5px; /* 외곽선과의 간격 조절 가능 */
}
`}
          initialHtml={`<div class="box-container">
  <div class="base-box has-border">Border</div>
  <div class="base-box has-outline">Outline</div>
  <div class="base-box">Normal</div>
</div>

<div style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>차이점:</strong><br/>
  • <strong>Border</strong>: 박스 모델의 크기에 포함됨 (레이아웃에 영향)<br/>
  • <strong>Outline</strong>: 크기에 포함되지 않음 (다른 요소 위에 겹쳐 그려짐)
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Shadow Comparison (box-shadow vs drop-shadow) */}
      <CollapsibleSection title="Shadow Comparison">
        <p className="section-description">
          <code>box-shadow</code>는 사각형 박스에, <code>filter: drop-shadow</code>는 투명도가 포함된 실제 이미지 모양에 그림자를 생성합니다.
        </p>
        <LiveCodeEditor
          scopeId="shadow-comparison"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.shadow-demo-grid {
  display: flex;
  gap: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  justify-content: center;
}

.shape {
  font-size: 4rem;
  padding: 1rem;
  border: 4px dashed #cbd5e1;
}

.use-box-shadow {
  box-shadow: 10px 10px 15px rgba(0,0,0,0.3);
}

.use-drop-shadow {
  filter: drop-shadow(10px 10px 15px rgba(0,0,0,0.3));
}
`}
          initialHtml={`<div class="shadow-demo-grid">
  <div class="shape use-box-shadow">
    ⭐
  </div>
  
  <div class="shape use-drop-shadow">
    ⭐
  </div>
</div>

<div style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>왼쪽 (box-shadow)</strong>: 별 모양이 아닌 사각형 박스 전체에 그림자가 생김<br/>
  <strong>오른쪽 (drop-shadow)</strong>: 실제 별 모양 자취를 따라 그림자가 생김 (PNG, SVG에 적합!)
</div>`}
        />
      </CollapsibleSection>

      {/* 팁 섹션: 전역 Box-Sizing (Best Practice) */}
      <CollapsibleSection title="실전 Tip: 전역 Box-Sizing 설정">
        <p className="section-description">
          거의 모든 프로젝트에서 사용하는 Best Practice: 모든 요소에 <code>border-box</code>를 적용합니다.
        </p>

        <LiveCodeEditor
          scopeId="global-box-sizing"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`/* 전역 설정 (프로젝트 시작 시 추가) */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 이제 모든 요소에서 크기 계산이 직관적! */
.example {
  width: 300px;
  padding: 20px;
  border: 5px solid #000;
  /* 총 너비는 여전히 300px! */
}`}
          initialHtml={`<div class="example" style="background: #e0e7ff; color: #312e81; padding: 1rem; font-weight: 600;">
  <strong>width: 300px</strong><br/>
  padding: 20px, border: 5px<br/>
  하지만 총 너비는 여전히 300px!
</div>

  <div style="margin-top: 1rem; color: #1e293b; background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.9rem;">
    <strong>선택자 해설:</strong><br/>
    • <code>*</code> (Universal): <strong>모든</strong> HTML 요소를 선택합니다.<br/>
    • <code>*::before</code>, <code>*::after</code>: 모든 요소에 생성된 <strong>가상 요소(Pseudo-elements)</strong>까지 포함합니다.<br/><br/>
    
    <strong>왜 이렇게 쓰나요?</strong><br/>
    일반 요소뿐만 아니라 화살표나 아이콘 등을 그릴 때 쓰는 가상 요소들도 똑같이 <code>border-box</code> 규칙을 따라야 레이아웃이 꼬이지 않기 때문입니다. 거의 모든 현대적인 CSS 초기화 코드(Reset.css, Normalize.css 등)의 표준 방식입니다.
  </div>
`}
        />
      </CollapsibleSection>
      {/* 실습 섹션: aspect-ratio (현대적인 비율 제어) */}
      <CollapsibleSection title="aspect-ratio (비율 제어)">
        <div className="section-description">
          <p>
            <code>aspect-ratio</code>는 요소의 <strong>가로 세로 비율</strong>을 고정합니다.
            이미지나 카드 UI의 크기가 변해도 비율을 유지해야 할 때 혁명적으로 편리합니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="aspect-ratio-demo"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.ratio-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
}

.video-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.thumbnail {
  background: linear-gradient(135deg, #667eea, #764ba2);
  width: 100%;
  
  /* 16:9 비율 고정 */
  aspect-ratio: 16 / 9;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.square-box {
  background: #10b981;
  width: 100px;
  
  /* 1:1 정사각형 고정 */
  aspect-ratio: 1 / 1;
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}`}
          initialHtml={`<div class="ratio-container">
  <div class="video-card">
    <div class="thumbnail">16:9 Thumbnail</div>
    <div style="padding: 1rem;">
      <h4 style="margin: 0; color: #1e293b;">Video Title</h4>
      <p style="margin: 0.5rem 0 0; font-size: 0.8rem; color: #64748b;">항상 16:9 비율을 유지합니다.</p>
    </div>
  </div>

  <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center;">
    <div class="square-box">1:1</div>
    <p style="color: #64748b; font-size: 0.8rem;">가로 너비만 정해도<br/>높이가 자동 계산됩니다.</p>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>과거 방식</strong>: <code>padding-top: 56.25%</code> 같은 복잡한 해킹이 필요했습니다.<br/>
  <strong>현재 방식</strong>: <code>aspect-ratio: 16 / 9</code> 한 줄이면 끝!
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 제품 카드 레이아웃 */}
      <CollapsibleSection title="실전 예제: 제품 카드 레이아웃">
        <p className="section-description">
          Box-sizing, Padding, Border, Aspect-ratio를 모두 활용하여 일정한 크기를 유지하는 제품 카드를 만듭니다.
        </p>

        <LiveCodeEditor
          scopeId="box-model-practical"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`* { box-sizing: border-box; }

.product-card {
  width: 280px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.content {
  padding: 20px;
}

.category {
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 12px 0;
}

.price-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 999px;
  font-weight: 700;
  color: #475569;
}
`}
          initialHtml={`<div class="product-card">
  <div class="image-container">🎧</div>
  <div class="content">
    <span class="category">Electronics</span>
    <h3 class="title">Premium Wireless Headphones</h3>
    <div class="price-tag">$299.00</div>
  </div>
</div>

<p style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 핵심 포인트:</strong><br/>
  • <strong>aspect-ratio</strong>: 가로 너비만 바뀌어도 이미지 영역 비율이 일정하게 유지됨<br/>
  • <strong>border-box</strong>: <code>padding: 20px</code>를 추가해도 카드의 전체 너비(280px)가 변하지 않음<br/>
  • <strong>border</strong>: 실선 테두리가 카드의 경계를 명확하게 해줌
</p>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default BoxModelStudy;
