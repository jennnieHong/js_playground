/**
 * ColorBackgroundStudy 페이지 컴포넌트
 * CSS 색상 표현 방식(Hex, RGB, HSL)과 배경(Gradient, Image) 및 그림자 효과를 학습하는 페이지입니다.
 * 주요 개념: 색상 포맷, Opacity vs Alpha, 그라데이션 종류, Glassmorphism, Box Shadow 갤러리
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function ColorBackgroundStudy() {
  // --- 상태 관리 (State Management) ---
  // 색상 포맷, 투명도, 그라데이션 타입의 실시간 변화를 제어합니다.
  const [colorFormat, setColorFormat] = useState('hex');
  const [opacity, setOpacity] = useState('1');
  const [gradientType, setGradientType] = useState('linear-gradient');
  
  // 레이어 빌더 상태
  const [layer1, setLayer1] = useState(true);
  const [layer2, setLayer2] = useState(true);
  const [layer3, setLayer3] = useState(false);
  const [baseColor, setBaseColor] = useState('#667eea');

  const colorExamples = {
    hex: '#3b82f6',
    rgb: 'rgb(59, 130, 246)',
    rgba: 'rgba(59, 130, 246, 0.8)',
    hsl: 'hsl(217, 91%, 60%)',
    hsla: 'hsla(217, 91%, 60%, 0.8)'
  };

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Colors & Backgrounds"
        subtitle="Mastering color formats, gradients, and visual styling"
      />

      {/* 색상 포맷 기초 섹션 */}

      <CollapsibleSection title="색상 표현 방법">
        <div className="section-description">
          <p>CSS에서 색상을 표현하는 다양한 방법을 이해하고 상황에 맞게 사용할 수 있어야 합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>Hex</code>: #RRGGBB 형식, 가장 많이 사용됨 (예: #3b82f6)</li>
            <li><code>RGB</code>: rgb(red, green, blue), 각 값은 0-255</li>
            <li><code>RGBA</code>: RGB + Alpha(투명도), alpha는 0-1</li>
            <li><code>HSL</code>: hsl(hue, saturation, lightness), 직관적인 색상 조정</li>
            <li><code>HSLA</code>: HSL + Alpha, 투명도 포함</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Color Format',
              type: 'radio',
              value: colorFormat,
              onChange: setColorFormat,
              options: [
                { value: 'hex', label: 'Hex' },
                { value: 'rgb', label: 'RGB' },
                { value: 'rgba', label: 'RGBA' },
                { value: 'hsl', label: 'HSL' },
                { value: 'hsla', label: 'HSLA' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="color-formats"
          previewHeight="200px"
          codeHeight="250px"
          initialCss={`.color-box {
  background-color: ${colorExamples[colorFormat]};
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`}
          currentCss={`.color-box {
  background-color: ${colorExamples[colorFormat]};
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`}
          initialHtml={`<div class="color-box">
  ${colorExamples[colorFormat]}
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>현재 형식: ${colorFormat.toUpperCase()}</strong><br/>
  ${colorFormat === 'hex' ? '• 가장 간결하고 널리 사용됨<br/>• 디자인 도구에서 주로 사용' : ''}
  ${colorFormat === 'rgb' ? '• 빨강, 초록, 파랑 값으로 직관적<br/>• JavaScript로 계산하기 쉬움' : ''}
  ${colorFormat === 'rgba' ? '• RGB + 투명도<br/>• Alpha 값으로 반투명 효과' : ''}
  ${colorFormat === 'hsl' ? '• 색상(Hue), 채도(Saturation), 명도(Lightness)<br/>• 색상 변형이 쉬움 (Hue만 변경)' : ''}
  ${colorFormat === 'hsla' ? '• HSL + 투명도<br/>• 가장 직관적인 색상 조정 방법' : ''}
</div>`}
        />
      </CollapsibleSection>
      {/* 실습 섹션: Opacity vs Alpha 투명도 제어 */}
      <CollapsibleSection title="Opacity (투명도)">
        <p className="section-description">
          투명도를 조정하는 두 가지 방법: <code>opacity</code> 속성과 <code>rgba/hsla</code>의 alpha 채널.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'opacity',
              type: 'radio',
              value: opacity,
              onChange: setOpacity,
              options: ['0.2', '0.5', '0.8', '1']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="opacity-demo"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`.bg-layer {
  position: relative;
  width: 100%;
  height: 200px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ddd" width="50" height="50"/><rect fill="%23ddd" x="50" y="50" width="50" height="50"/></svg>') repeat;
  background-size: 20px 20px;
  border-radius: 8px;
  overflow: hidden;
}

.opacity-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  padding: 2rem;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  opacity: ${opacity};
}`}
          currentCss={`.bg-layer {
  position: relative;
  width: 100%;
  height: 200px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ddd" width="50" height="50"/><rect fill="%23ddd" x="50" y="50" width="50" height="50"/></svg>') repeat;
  background-size: 20px 20px;
  border-radius: 8px;
  overflow: hidden;
}

.opacity-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  padding: 2rem;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  border-radius: 8px;
  opacity: ${opacity};
}`}
          initialHtml={`<div class="bg-layer">
  <div class="opacity-box">
    opacity: ${opacity}
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>opacity vs alpha 채널:</strong><br/>
  • <code>opacity</code>: 요소 전체(내용 포함)가 투명해짐<br/>
  • <code>rgba/hsla</code>: 배경색만 투명, 텍스트는 선명
</div>`}
        />
      </CollapsibleSection>
      {/* 실습 섹션: Gradients (선형, 원형, 원뿔형 그라데이션) */}
      <CollapsibleSection title="Gradients (그라데이션)">
        <p className="section-description">
          Linear, Radial, Conic 그라데이션으로 부드러운 색상 전환을 만들 수 있습니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'Gradient Type',
              type: 'radio',
              value: gradientType,
              onChange: setGradientType,
              options: [
                { value: 'linear-gradient', label: 'Linear' },
                { value: 'radial-gradient', label: 'Radial' },
                { value: 'conic-gradient', label: 'Conic' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="gradients"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.gradient-box {
  width: 100%;
  height: 200px;
  background: ${gradientType === 'linear-gradient'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : gradientType === 'radial-gradient'
                ? 'radial-gradient(circle, #667eea 0%, #764ba2 100%)'
                : 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #667eea)'
            };
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}`}
          currentCss={`.gradient-box {
  width: 100%;
  height: 200px;
  background: ${gradientType === 'linear-gradient'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : gradientType === 'radial-gradient'
                ? 'radial-gradient(circle, #667eea 0%, #764ba2 100%)'
                : 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #667eea)'
            };
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}`}
          initialHtml={`<div class="gradient-box">
  ${gradientType.replace('-', ' ').toUpperCase()}
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Gradient 종류:</strong><br/>
  • <strong>Linear</strong>: 직선 방향 (to right, 135deg 등)<br/>
  • <strong>Radial</strong>: 원형/타원형 (circle, ellipse)<br/>
  • <strong>Conic</strong>: 원뿔형, 색상환 효과
</div>`}
        />
      </CollapsibleSection>
      {/* 실습 섹션: Background 세부 속성 (size, position, repeat) */}
      <CollapsibleSection title="Background 속성들">
        <div className="section-description">
          <p>
            배경 이미지의 크기, 위치, 반복 등을 세밀하게 제어할 수 있습니다.
          </p>
          
          <div style={{ 
            marginTop: '1.5rem', padding: '1.5rem', background: '#fff7ed', 
            borderRadius: '12px', border: '1px solid #fb923c' 
          }}>
            <h4 style={{ marginTop: 0, color: '#9a3412' }}>🤔 체크무늬는 왜 4개의 그라데이션이 필요한가요?</h4>
            <p style={{ color: '#c2410c', lineHeight: '1.7', marginBottom: '1rem' }}>
              체크무늬 패턴은 <strong>4개의 그라데이션이 함께 작동</strong>해서 만들어집니다. 
              하나씩 제거하면 "순차적"으로 보이지 않는 이유는:
            </p>
            <ul style={{ marginBottom: 0, color: '#c2410c', lineHeight: '1.8' }}>
              <li><strong>각 그라데이션은 독립적인 삼각형을 만듭니다</strong> (25% 또는 75% 지점에서 색이 바뀜)</li>
              <li><strong>4개의 삼각형이 서로 다른 각도(45deg, -45deg)와 위치</strong>에 배치됩니다</li>
              <li><strong>이 4개가 겹쳤을 때만 완벽한 정사각형 체크무늬</strong>가 완성됩니다</li>
              <li>하나만 제거해도 패턴이 깨지고, 두 개 제거하면 스트라이프가 되고, 세 개 제거하면 단순 삼각형만 남습니다</li>
            </ul>
          </div>

          <div style={{ 
            marginTop: '1rem', padding: '1.2rem', background: '#f0f9ff', 
            borderRadius: '10px', border: '1px solid #0ea5e9' 
          }}>
            <strong style={{ color: '#0c4a6e' }}>📐 4개 그라데이션의 역할</strong>
            <ol style={{ marginTop: '0.5rem', marginBottom: 0, color: '#075985', fontSize: '0.9rem', lineHeight: '1.8' }}>
              <li><strong>첫 번째:</strong> 45deg 방향, 왼쪽 위 삼각형 (0-25%)</li>
              <li><strong>두 번째:</strong> -45deg 방향, 오른쪽 위 삼각형 (0-25%)</li>
              <li><strong>세 번째:</strong> 45deg 방향, 오른쪽 아래 삼각형 (75-100%)</li>
              <li><strong>네 번째:</strong> -45deg 방향, 왼쪽 아래 삼각형 (75-100%)</li>
            </ol>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#0e7490', fontSize: '0.9rem' }}>
              → 이 4개의 삼각형이 <code>background-position</code>으로 위치를 조정하면서 겹쳐져 체크무늬를 만듭니다!
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="background-props"
          previewHeight="350px"
          codeHeight="400px"
          initialCss={`.bg-demo {
  width: 100%;
  height: 300px;
  
  /* 그라데이션을 이미지처럼 사용 - 4개가 모두 필요! */
  background-image: 
    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
  
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
  background-color: #3b82f6;
  
  /* 추가 스타일 */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`}
          initialHtml={`<div class="bg-demo">
  Checkerboard Pattern
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 1rem; border-radius: 6px; font-size: 0.9rem; line-height: 1.7;">
  <strong>🧪 실험해보기:</strong><br/>
  코드 에디터에서 4개의 linear-gradient 중 하나씩 주석처리(/* */)해보세요!<br/>
  → 순차적으로 보이지 않는 이유는 4개가 <strong>협력해서</strong> 체크무늬를 만들기 때문입니다.<br/><br/>
  
  <strong>주요 background 속성:</strong><br/>
  • <code>background-size</code>: cover, contain, 50% 등<br/>
  • <code>background-position</code>: center, top right 등<br/>
  • <code>background-repeat</code>: repeat, no-repeat<br/>
  • <code>background-attachment</code>: scroll, fixed
</div>`}
        />
      </CollapsibleSection>

      {/* 새 섹션: 그라데이션으로 만드는 다양한 패턴 */}
      <CollapsibleSection title="🎨 그라데이션 패턴 갤러리">
        <div className="section-description">
          <p>
            그라데이션을 이미지처럼 사용하여 <strong>다양한 기하학적 패턴</strong>을 만들 수 있습니다!<br />
            이미지 파일 없이 순수 CSS만으로 멋진 배경 패턴을 구현할 수 있습니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="gradient-patterns"
          previewHeight="600px"
          codeHeight="700px"
          initialCss={`.pattern-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: #1e293b;
  border-radius: 16px;
}

.pattern-box {
  height: 150px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
}

.pattern-label {
  position: relative;
  z-index: 1;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  background: rgba(0,0,0,0.5);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

/* 1. 스트라이프 (세로 줄무늬) */
.stripes {
  background: repeating-linear-gradient(
    90deg,
    #667eea 0px,
    #667eea 20px,
    #764ba2 20px,
    #764ba2 40px
  );
}

/* 2. 대각선 스트라이프 */
.diagonal-stripes {
  background: repeating-linear-gradient(
    45deg,
    #f093fb 0px,
    #f093fb 15px,
    #f5576c 15px,
    #f5576c 30px
  );
}

/* 3. 체크무늬 (Checkerboard) */
.checkerboard {
  background-image: 
    linear-gradient(45deg, #3b82f6 25%, transparent 25%),
    linear-gradient(-45deg, #3b82f6 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #3b82f6 75%),
    linear-gradient(-45deg, transparent 75%, #3b82f6 75%);
  background-size: 40px 40px;
  background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
  background-color: #60a5fa;
}

/* 4. 도트 패턴 (Polka Dots) */
.dots {
  background-color: #10b981;
  background-image: radial-gradient(circle, #fff 20%, transparent 20%);
  background-size: 30px 30px;
}

/* 5. 격자무늬 (Grid) */
.grid {
  background-color: #f59e0b;
  background-image: 
    linear-gradient(rgba(255,255,255,0.3) 2px, transparent 2px),
    linear-gradient(90deg, rgba(255,255,255,0.3) 2px, transparent 2px);
  background-size: 40px 40px;
}

/* 6. 지그재그 (Zigzag) */
.zigzag {
  background: 
    linear-gradient(135deg, #ec4899 25%, transparent 25%) -20px 0,
    linear-gradient(225deg, #ec4899 25%, transparent 25%) -20px 0,
    linear-gradient(315deg, #ec4899 25%, transparent 25%),
    linear-gradient(45deg, #ec4899 25%, transparent 25%);
  background-size: 40px 40px;
  background-color: #f472b6;
}

/* 7. 다이아몬드 */
.diamonds {
  background-color: #8b5cf6;
  background-image: 
    linear-gradient(45deg, rgba(255,255,255,0.3) 50%, transparent 50%),
    linear-gradient(-45deg, rgba(255,255,255,0.3) 50%, transparent 50%);
  background-size: 40px 40px;
  background-position: 0 0, 20px 0;
}

/* 8. 벌집 (Hexagon) 패턴 */
.hexagons {
  background-color: #14b8a6;
  background-image: 
    radial-gradient(circle at 0% 50%, rgba(255,255,255,0.2) 20%, transparent 20%),
    radial-gradient(circle at 100% 50%, rgba(255,255,255,0.2) 20%, transparent 20%);
  background-size: 40px 70px;
  background-position: 0 0, 0 35px;
}

/* 9. 크로스 해치 (Cross Hatch) */
.crosshatch {
  background-color: #475569;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px);
}

/* 10. 타탄 체크 (Tartan) */
.tartan {
  background-color: #dc2626;
  background-image: 
    repeating-linear-gradient(transparent, transparent 50px, rgba(0,0,0,0.4) 50px, rgba(0,0,0,0.4) 53px, transparent 53px),
    repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.4) 50px, rgba(0,0,0,0.4) 53px, transparent 53px);
}

/* 11. 물방울 (Bubbles) */
.bubbles {
  background-color: #0ea5e9;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 15%, transparent 15%),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 20%, transparent 20%),
    radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 10%, transparent 10%);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px, 15px 45px;
}

/* 12. 모자이크 */
.mosaic {
  background: 
    linear-gradient(45deg, #fbbf24 25%, transparent 25%, transparent 75%, #fbbf24 75%, #fbbf24),
    linear-gradient(45deg, #fbbf24 25%, #f59e0b 25%, #f59e0b 75%, #fbbf24 75%, #fbbf24);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
}`}
          initialHtml={`<div class="pattern-gallery">
  <div class="pattern-box stripes">
    <span class="pattern-label">세로 줄무늬</span>
  </div>
  <div class="pattern-box diagonal-stripes">
    <span class="pattern-label">대각선 줄무늬</span>
  </div>
  <div class="pattern-box checkerboard">
    <span class="pattern-label">체크무늬</span>
  </div>
  <div class="pattern-box dots">
    <span class="pattern-label">도트 패턴</span>
  </div>
  <div class="pattern-box grid">
    <span class="pattern-label">격자무늬</span>
  </div>
  <div class="pattern-box zigzag">
    <span class="pattern-label">지그재그</span>
  </div>
  <div class="pattern-box diamonds">
    <span class="pattern-label">다이아몬드</span>
  </div>
  <div class="pattern-box hexagons">
    <span class="pattern-label">벌집 패턴</span>
  </div>
  <div class="pattern-box crosshatch">
    <span class="pattern-label">크로스 해치</span>
  </div>
  <div class="pattern-box tartan">
    <span class="pattern-label">타탄 체크</span>
  </div>
  <div class="pattern-box bubbles">
    <span class="pattern-label">물방울</span>
  </div>
  <div class="pattern-box mosaic">
    <span class="pattern-label">모자이크</span>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1.2rem; background: #f0f9ff; border-radius: 12px; border: '1px solid #0ea5e9';">
  <strong style="color: #0c4a6e;">💡 핵심 기법</strong>
  <ul style="margin-top: 0.5rem; color: #075985; font-size: 0.9rem; line-height: 1.8;">
    <li><strong>repeating-linear-gradient:</strong> 반복되는 줄무늬 패턴</li>
    <li><strong>radial-gradient:</strong> 원형 도트/물방울 패턴</li>
    <li><strong>여러 gradient 레이어:</strong> 복잡한 기하학 패턴 조합</li>
    <li><strong>background-size & position:</strong> 패턴 크기와 배치 조절</li>
  </ul>
  <p style="margin-top: 1rem; margin-bottom: 0; color: #0e7490; font-size: 0.9rem;">
    <strong>장점:</strong> 이미지 파일이 필요 없어 로딩이 빠르고, 색상/크기를 CSS로 즉시 변경 가능!
  </p>
</div>`}
        />
      </CollapsibleSection>

      {/* 새 섹션: 인터랙티브 레이어 빌더 */}
      <CollapsibleSection title="🎛️ 레이어 빌더: 그라데이션 레이어 조합하기">
        <div className="section-description">
          <p>
            여러 개의 그라데이션 레이어를 <strong>쌓아서</strong> 복잡하고 멋진 배경을 만들어보세요!<br />
            각 레이어를 켜고 끄면서 어떻게 조합되는지 실시간으로 확인할 수 있습니다.
          </p>
          
          <div style={{ 
            marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', 
            borderRadius: '12px', border: '1px solid #f59e0b' 
          }}>
            <strong style={{ color: '#92400e' }}>💡 레이어 순서의 비밀</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', fontSize: '0.9rem', lineHeight: '1.7' }}>
              CSS에서 background-image의 레이어는 <strong>먼저 선언한 것이 위에</strong> 표시됩니다.<br />
              Layer 1 (맨 위) → Layer 2 (중간) → Layer 3 (아래) → Base Color (배경)
            </p>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Layer 1 (도트)',
              type: 'checkbox',
              value: layer1,
              onChange: setLayer1
            },
            {
              name: 'Layer 2 (대각선)',
              type: 'checkbox',
              value: layer2,
              onChange: setLayer2
            },
            {
              name: 'Layer 3 (그리드)',
              type: 'checkbox',
              value: layer3,
              onChange: setLayer3
            },
            {
              name: 'Base Color',
              type: 'radio',
              value: baseColor,
              onChange: setBaseColor,
              options: [
                { value: '#667eea', label: 'Purple' },
                { value: '#10b981', label: 'Green' },
                { value: '#f59e0b', label: 'Orange' },
                { value: '#ef4444', label: 'Red' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="layer-builder"
          previewHeight="400px"
          codeHeight="550px"
          initialCss={`.layer-demo {
  width: 100%;
  height: 350px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  
  /* 레이어들을 아래에서 위로 쌓음 */
  background-color: ${baseColor};
  ${(() => {
    const layers = [];
    const sizes = [];
    const positions = [];
    
    if (layer1) {
      layers.push(`radial-gradient(circle, rgba(255,255,255,0.15) 15%, transparent 15%)`);
      sizes.push('30px 30px');
      positions.push('0 0');
    }
    if (layer2) {
      layers.push(`repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`);
      sizes.push('40px 40px');
      positions.push('0 0');
    }
    if (layer3) {
      layers.push(`linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px)`);
      layers.push(`linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)`);
      sizes.push('40px 40px', '40px 40px');
      positions.push('0 0', '0 0');
    }
    
    if (layers.length > 0) {
      return `background-image: ${layers.join(', ')};
  background-size: ${sizes.join(', ')};
  background-position: ${positions.join(', ')};`;
    }
    return '';
  })()}
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.layer-info {
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  border: 1px solid rgba(255,255,255,0.2);
}

.layer-list {
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: left;
  line-height: 2;
  color: rgba(255,255,255,0.9);
}`}
          currentCss={`.layer-demo {
  width: 100%;
  height: 350px;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  
  /* 레이어들을 아래에서 위로 쌓음 */
  background-color: ${baseColor};
  ${(() => {
    const layers = [];
    const sizes = [];
    const positions = [];
    
    if (layer1) {
      layers.push(`radial-gradient(circle, rgba(255,255,255,0.15) 15%, transparent 15%)`);
      sizes.push('30px 30px');
      positions.push('0 0');
    }
    if (layer2) {
      layers.push(`repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)`);
      sizes.push('40px 40px');
      positions.push('0 0');
    }
    if (layer3) {
      layers.push(`linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px)`);
      layers.push(`linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)`);
      sizes.push('40px 40px', '40px 40px');
      positions.push('0 0', '0 0');
    }
    
    if (layers.length > 0) {
      return `background-image: ${layers.join(', ')};
  background-size: ${sizes.join(', ')};
  background-position: ${positions.join(', ')};`;
    }
    return '';
  })()}
  
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.layer-info {
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  border: 1px solid rgba(255,255,255,0.2);
}

.layer-list {
  margin-top: 1rem;
  font-size: 0.9rem;
  text-align: left;
  line-height: 2;
  color: rgba(255,255,255,0.9);
}`}
          initialHtml={`<div class="layer-demo">
  <div class="layer-info">
    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🎨 활성 레이어</div>
    <div class="layer-list">
      ${layer1 ? '✅ Layer 1: 도트 패턴 (맨 위)<br/>' : '❌ Layer 1: OFF<br/>'}
      ${layer2 ? '✅ Layer 2: 대각선 스트라이프 (중간)<br/>' : '❌ Layer 2: OFF<br/>'}
      ${layer3 ? '✅ Layer 3: 그리드 (아래)<br/>' : '❌ Layer 3: OFF<br/>'}
      🎨 Base Color: ${baseColor === '#667eea' ? 'Purple' : baseColor === '#10b981' ? 'Green' : baseColor === '#f59e0b' ? 'Orange' : 'Red'}
    </div>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1.2rem; background: #f0f9ff; border-radius: 12px; border: '1px solid #0ea5e9';">
  <strong style="color: #0c4a6e;">🔍 작동 원리</strong>
  <ul style="margin-top: 0.5rem; margin-bottom: 0; color: #075985; font-size: 0.9rem; line-height: 1.8;">
    <li><strong>Layer 1 (도트):</strong> 맨 위에 표시되는 흰색 반투명 도트</li>
    <li><strong>Layer 2 (대각선):</strong> 그 아래에 대각선 패턴이 겹침</li>
    <li><strong>Layer 3 (그리드):</strong> 가장 아래 격자무늬 (미묘한 효과)</li>
    <li><strong>Base Color:</strong> 모든 레이어의 배경색 (가장 아래)</li>
    <li style="margin-top: 0.5rem; color: #0e7490;"><strong>💡 Tip:</strong> 레이어를 하나씩 켜고 끄면서 각 레이어가 전체 디자인에 어떤 영향을 주는지 확인해보세요!</li>
  </ul>
</div>`}
        />
      </CollapsibleSection>

      {/* 디자인 트렌드 섹션: Glassmorphism (유리 효과 구현) */}
      <CollapsibleSection title="실전: Glass Morphism">
        <p className="section-description">
          반투명 배경 + 블러 효과로 유리 같은 세련된 UI를 만들 수 있습니다.
        </p>

        <LiveCodeEditor
          scopeId="glassmorphism"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.glass-container {
  position: relative;
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  overflow: hidden;
}

.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  color: #ffffff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
}

.glass-card p {
  margin: 0;
  opacity: 0.9;
  line-height: 1.6;
}`}
          initialHtml={`<div class="glass-container">
  <div class="glass-card">
    <h3>Glass Morphism</h3>
    <p>
      반투명 배경(rgba)과 backdrop-filter: blur()를 
      조합하여 만든 유리 질감 효과입니다.
    </p>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>핵심 속성:</strong><br/>
  • <code>background: rgba(255,255,255,0.15)</code><br/>
  • <code>backdrop-filter: blur(10px)</code><br/>
  • <code>border: 1px solid rgba(255,255,255,0.3)</code>
</div>`}
        />
      </CollapsibleSection>
      {/* 갤러리 섹션: 인기 그라데이션 조합 모음 */}
      <CollapsibleSection title="🎨 그라데이션 갤러리">
        <p className="section-description">
          인기있는 그라데이션 스타일들을 한눈에 비교해보세요. 클릭하면 CSS 코드를 확인할 수 있습니다.
        </p>
        <LiveCodeEditor
          scopeId="gradient-gallery"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.gradient-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: #1e293b;
  border-radius: 16px;
}

.gradient-card {
  height: 120px;
  border-radius: 12px;
  display: flex;
  align-items: flex-end;
  padding: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
}

.gradient-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.gradient-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
}

.gradient-name {
  position: relative;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

/* Popular Gradients */
.sunset { background: linear-gradient(135deg, #ff6b6b, #feca57); }
.ocean { background: linear-gradient(135deg, #667eea, #764ba2); }
.mint { background: linear-gradient(135deg, #11998e, #38ef7d); }
.peach { background: linear-gradient(135deg, #ff9a9e, #fecfef); }
.night { background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); }
.aurora { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.fire { background: linear-gradient(135deg, #f12711, #f5af19); }
.lavender { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }
.forest { background: linear-gradient(135deg, #134e5e, #71b280); }
.candy { background: linear-gradient(135deg, #ff6a88, #ff99ac); }
.royal { background: linear-gradient(135deg, #141e30, #243b55); }
.sunrise { background: linear-gradient(135deg, #f093fb, #f5576c); }`}
          initialHtml={`<div class="gradient-gallery">
  <div class="gradient-card sunset"><span class="gradient-name">Sunset</span></div>
  <div class="gradient-card ocean"><span class="gradient-name">Ocean</span></div>
  <div class="gradient-card mint"><span class="gradient-name">Mint</span></div>
  <div class="gradient-card peach"><span class="gradient-name">Peach</span></div>
  <div class="gradient-card night"><span class="gradient-name">Night Sky</span></div>
  <div class="gradient-card aurora"><span class="gradient-name">Aurora</span></div>
  <div class="gradient-card fire"><span class="gradient-name">Fire</span></div>
  <div class="gradient-card lavender"><span class="gradient-name">Lavender</span></div>
  <div class="gradient-card forest"><span class="gradient-name">Forest</span></div>
  <div class="gradient-card candy"><span class="gradient-name">Candy</span></div>
  <div class="gradient-card royal"><span class="gradient-name">Royal</span></div>
  <div class="gradient-card sunrise"><span class="gradient-name">Sunrise</span></div>
</div>`}
        />
      </CollapsibleSection>
      {/* 갤러리 섹션: 다양한 Box Shadow 스타일 비교 */}
      <CollapsibleSection title="Box Shadow 비교">
        <p className="section-description">
          다양한 그림자 스타일이 요소에 주는 느낌을 비교해보세요.
        </p>
        <LiveCodeEditor
          scopeId="box-shadow-gallery"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.shadow-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: #f1f5f9;
  border-radius: 16px;
}

.shadow-box {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s;
  color: #1e293b;
}

.shadow-box:hover {
  transform: translateY(-2px);
}

.shadow-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-top: 1rem;
}

/* Shadow Types */
.subtle { box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
.soft { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.medium { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
.large { box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
.sharp { box-shadow: 5px 5px 0 #1e293b; }
.glow { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
.inset { box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
.layered { 
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.08),
    0 4px 8px rgba(0,0,0,0.08),
    0 16px 32px rgba(0,0,0,0.08);
}`}
          initialHtml={`<div class="shadow-gallery">
  <div class="shadow-box subtle">
    <div style="font-size: 1.5rem;">☁️</div>
    <div class="shadow-name">Subtle</div>
  </div>
  <div class="shadow-box soft">
    <div style="font-size: 1.5rem;">🌤️</div>
    <div class="shadow-name">Soft</div>
  </div>
  <div class="shadow-box medium">
    <div style="font-size: 1.5rem;">⛅</div>
    <div class="shadow-name">Medium</div>
  </div>
  <div class="shadow-box large">
    <div style="font-size: 1.5rem;">🌥️</div>
    <div class="shadow-name">Large</div>
  </div>
  <div class="shadow-box sharp">
    <div style="font-size: 1.5rem;">📐</div>
    <div class="shadow-name">Sharp</div>
  </div>
  <div class="shadow-box glow">
    <div style="font-size: 1.5rem;">✨</div>
    <div class="shadow-name">Glow</div>
  </div>
  <div class="shadow-box inset">
    <div style="font-size: 1.5rem;">🕳️</div>
    <div class="shadow-name">Inset</div>
  </div>
  <div class="shadow-box layered">
    <div style="font-size: 1.5rem;">📚</div>
    <div class="shadow-name">Layered</div>
  </div>
</div>`}
        />
      </CollapsibleSection>
      {/* 비교 섹션: 여러 디자인 트렌드별 카드 스타일 (Flat, Neumorphism 등) */}
      <CollapsibleSection title="카드 스타일 비교">
        <p className="section-description">
          다양한 디자인 스타일의 카드들을 비교해보세요.
        </p>
        <LiveCodeEditor
          scopeId="card-styles"
          previewHeight="450px"
          codeHeight="550px"
          initialCss={`.card-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
}

.style-card {
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.style-card h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.style-card p {
  font-size: 0.85rem;
  opacity: 0.8;
  line-height: 1.4;
}

/* Flat Style */
.flat-style {
  background: white;
  color: #1e293b;
}

/* Elevated Style */
.elevated-style {
  background: white;
  color: #1e293b;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

/* Glass Style */
.glass-style {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
}

/* Gradient Border */
.gradient-border {
  background: white;
  color: #1e293b;
  position: relative;
}
.gradient-border::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 15px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  z-index: -1;
}

/* Dark Style */
.dark-style {
  background: #0f172a;
  color: white;
  border: 1px solid rgba(255,255,255,0.1);
}

/* Neumorphism */
.neumorphism {
  background: #e0e5ec;
  color: #1e293b;
  box-shadow: 
    8px 8px 16px #b8bec7,
    -8px -8px 16px #ffffff;
}`}
          initialHtml={`<div class="card-comparison">
  <div class="style-card flat-style">
    <h4>Flat</h4>
    <p>깔끔하고 미니멀한 스타일</p>
  </div>
  <div class="style-card elevated-style">
    <h4>Elevated</h4>
    <p>그림자로 깊이감 표현</p>
  </div>
  <div class="style-card glass-style">
    <h4>Glass</h4>
    <p>투명하고 모던한 느낌</p>
  </div>
  <div class="style-card gradient-border">
    <h4>Gradient Border</h4>
    <p>그라데이션 테두리 효과</p>
  </div>
  <div class="style-card dark-style">
    <h4>Dark</h4>
    <p>다크모드 스타일</p>
  </div>
  <div class="style-card neumorphism">
    <h4>Neumorphism</h4>
    <p>부드러운 입체 효과</p>
  </div>
</div>`}
        />
      </CollapsibleSection>
      {/* 실무 응용 섹션: 영감을 주는 히어로 섹션 디자인 */}
      <CollapsibleSection title="실전 예제: 모바일 앱 히어로 섹션">
        <p className="section-description">
          그라데이션, 글래스모피즘, 복합 배경 이미지를 활용한 트렌디한 히어로 섹션입니다.
        </p>
        <LiveCodeEditor
          scopeId="color-practical-hero"
          previewHeight="450px"
          codeHeight="500px"
          initialCss={`.hero-container {
  width: 100%;
  height: 400px;
  border-radius: 20px;
  background: 
    radial-gradient(circle at top right, rgba(99, 102, 241, 0.5), transparent 400px),
    radial-gradient(circle at bottom left, rgba(244, 63, 94, 0.4), transparent 400px),
    #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1.5" fill="rgba(255,255,255,0.15)"/></svg>');
}

.hero-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.hero-logo {
  font-size: 3rem;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.8));
}

h2 {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 12px;
}

p {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
}

.cta-button {
  margin-top: 24px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}
`}
          initialHtml={`<div class="hero-container">
  <div class="hero-content">
    <div class="hero-logo">🚀</div>
    <h2>Design Future</h2>
    <p>배경 그라데이션과 글래스모피즘 효과가 결합된 현대적인 UI 기법을 확인해보세요.</p>
    <button class="cta-button">Get Started</button>
  </div>
</div>

<p style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  • <strong>복합 레이어</strong>: 여러 개의 radial-gradient를 겹쳐 깊이감 있는 배경 연출<br/>
  • <strong>Glassmorphism</strong>: <code>backdrop-filter</code>와 미세한 <code>border</code>로 유리 질감 완성<br/>
  • <strong>drop-shadow</strong>: 로고 아이콘에 네온 효과 부여
</p>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default ColorBackgroundStudy;
