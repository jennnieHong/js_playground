/**
 * UnitsStudy 페이지 컴포넌트
 * CSS의 다양한 단위 시스템(절대 단위 px, 상대 단위 rem/em, 뷰포트 단위 vh/vw, % 등)을 학습하는 페이지입니다.
 * 주요 개념: rem vs em 차이점, 브라우저 폰트 스케일링, Viewport Units 활용, Modern clamp() 함수
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function UnitsStudy() {
  // --- 상태 관리 (State Management) ---
  // 실시간으로 폰트 크기와 단위를 변경하며 시각적 변화를 관찰하기 위한 상태입니다.
  const [fontSize, setFontSize] = useState('16px');
  const [unitType, setUnitType] = useState('rem');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="CSS Units Study"
        subtitle="CSS 단위 시스템 완벽 가이드 - px, rem, em, vh, vw, % 마스터하기"
      />

      {/* 기초 섹션: CSS Units 전체 개요 및 분류 */}

      <CollapsibleSection title="📏 CSS Units 개요">
        <div className="section-description">
          <p>
            CSS에는 크기를 지정하는 다양한 단위가 있습니다. 올바른 단위 선택은 반응형 디자인과
            접근성에 큰 영향을 미칩니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            <li><strong>절대 단위</strong>: px, pt, cm, mm - 고정된 크기</li>
            <li><strong>상대 단위 (폰트)</strong>: em, rem - 폰트 크기 기준</li>
            <li><strong>상대 단위 (뷰포트)</strong>: vh, vw, vmin, vmax - 화면 크기 기준</li>
            <li><strong>퍼센트</strong>: % - 부모 요소 기준</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: px (절대 단위의 특징과 한계) */}
      <CollapsibleSection title="Absolute Units: px (픽셀)">
        <p className="section-description">
          <code>px</code>는 가장 많이 사용되는 절대 단위입니다. 화면의 물리적 픽셀에 대응하며,
          정확한 크기 제어가 필요할 때 사용합니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'font-size',
              type: 'radio',
              value: fontSize,
              onChange: setFontSize,
              options: ['12px', '16px', '20px', '24px', '32px', '48px']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="px-demo"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`.px-demo {
  font-size: ${fontSize};
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  line-height: 1.6;
}

.px-box {
  width: 200px;  /* 항상 200픽셀 */
  height: 100px; /* 항상 100픽셀 */
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-weight: 600;
}`}
          currentCss={`.px-demo {
  font-size: ${fontSize};
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  line-height: 1.6;
}

.px-box {
  width: 200px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-weight: 600;
}`}
          initialHtml={`<div class="px-demo">
  <strong>현재 font-size: ${fontSize}</strong><br/>
  px는 절대 단위로, 브라우저 설정이나 부모 요소에 영향받지 않습니다.
  <div class="px-box">200px × 100px</div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>px 사용처:</strong><br/>
  • 정확한 크기가 필요한 아이콘, 버튼<br/>
  • 테두리(border), 그림자(shadow)<br/>
  ⚠️ 단점: 사용자 접근성 설정 무시, 반응형 대응 어려움
</div>`}
          currentHtml={`<div class="px-demo">
  <strong>현재 font-size: ${fontSize}</strong><br/>
  px는 절대 단위로, 브라우저 설정이나 부모 요소에 영향받지 않습니다.
  <div class="px-box">200px × 100px</div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>px 사용처:</strong><br/>
  • 정확한 크기가 필요한 아이콘, 버튼<br/>
  • 테두리(border), 그림자(shadow)<br/>
  ⚠️ 단점: 사용자 접근성 설정 무시, 반응형 대응 어려움
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: rem (루트 기준 상대 단위 - 권장 방식) */}
      <CollapsibleSection title="Relative Units: rem (Root EM)">
        <p className="section-description">
          <code>rem</code>은 루트 요소(html)의 font-size를 기준으로 한 상대 단위입니다.
          브라우저 기본값은 보통 16px이므로, <strong>1rem = 16px</strong>입니다.
        </p>

        <LiveCodeEditor
          scopeId="rem-demo"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`:root {
  font-size: 16px; /* 기본 루트 크기 */
}

.rem-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  color: #1e293b;
}

.rem-text-sm { font-size: 0.875rem; } /* 14px */
.rem-text-base { font-size: 1rem; }    /* 16px */
.rem-text-lg { font-size: 1.25rem; }   /* 20px */
.rem-text-xl { font-size: 1.5rem; }    /* 24px */
.rem-text-2xl { font-size: 2rem; }     /* 32px */

.rem-box {
  width: 20rem;  /* 320px */
  padding: 1rem; /* 16px */
  margin-top: 1rem;
  background: #dbeafe;
  border-left: 0.25rem solid #3b82f6;
  border-radius: 0.5rem;
}`}
          initialHtml={`<div class="rem-container">
  <div class="rem-text-2xl" style="font-weight: 700; margin-bottom: 1rem;">
    rem 단위 스케일
  </div>
  
  <p class="rem-text-sm">0.875rem (14px) - Small Text</p>
  <p class="rem-text-base">1rem (16px) - Base Text</p>
  <p class="rem-text-lg">1.25rem (20px) - Large Text</p>
  <p class="rem-text-xl">1.5rem (24px) - XL Text</p>
  <p class="rem-text-2xl">2rem (32px) - 2XL Text</p>
  
  <div class="rem-box">
    이 박스는 20rem(320px) 너비입니다
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #d1fae5; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>✅ rem 장점:</strong><br/>
  • 일관된 스케일링<br/>
  • 사용자 접근성 설정 반영<br/>
  • 반응형 디자인에 최적<br/>
  💡 <strong>Best Practice: font-size는 rem 사용 권장</strong>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: em (부모 기준 상대 단위 - 중첩 주의) */}
      <CollapsibleSection title="Relative Units: em">
        <p className="section-description">
          <code>em</code>은 부모 요소의 font-size를 기준으로 하는 상대 단위입니다.
          중첩되면 값이 곱해져서 예상과 다른 결과가 나올 수 있으니 주의가 필요합니다.
        </p>

        <LiveCodeEditor
          scopeId="em-demo"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.em-parent {
  font-size: 20px;  /* 부모 폰트 크기 */
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  color: #1e293b;
}

.em-child {
  font-size: 1.5em;  /* 부모의 1.5배 = 30px */
  background: #fef3c7;
  padding: 0.5em;    /* 자신의 폰트 크기(30px) 기준 = 15px */
  margin-top: 1em;   /* 30px */
  border-radius: 0.25em;
}

.em-nested {
  font-size: 1.5em;  /* 부모(30px)의 1.5배 = 45px! */
  background: #fecaca;
  padding: 0.5em;
  margin-top: 1em;
  border-radius: 0.25em;
}

.em-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.em-box {
  padding: 1rem;
  background: #e0e7ff;
  border-radius: 8px;
  font-size: 0.9rem;
}`}
          initialHtml={`<div class="em-parent">
  <strong>부모 (20px)</strong>
  <div class="em-child">
    <strong>자식 1.5em (30px)</strong>
    <div class="em-nested">
      <strong>중첩 1.5em (45px) ⚠️ 곱셈 누적!</strong>
    </div>
  </div>
</div>

<div class="em-comparison">
  <div class="em-box">
    <strong>em 사용</strong><br/>
    부모 요소에 따라 크기 변화<br/>
    padding, margin에 유용
  </div>
  <div class="em-box">
    <strong>rem 사용</strong><br/>
    항상 루트 기준<br/>
    예측 가능, 일관성 높음
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  ⚠️ <strong>em 주의사항:</strong> 중첩 시 값이 곱해져서 예상 밖의 크기가 될 수 있습니다.<br/>
  💡 <strong>em 적합한 경우:</strong> 버튼의 padding처럼 폰트 크기에 비례하여 조정되어야 할 때
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: vh & vw (뷰포트 환경 기준 단위) */}
      <CollapsibleSection title="Viewport Units: vh, vw (뷰포트)">
        <p className="section-description">
          <code>vh</code>와 <code>vw</code>는 뷰포트(브라우저 창)의 크기를 기준으로 합니다.
          <strong>1vh = 뷰포트 높이의 1%</strong>, <strong>1vw = 뷰포트 너비의 1%</strong>
        </p>

        <LiveCodeEditor
          scopeId="viewport-demo"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.vw-demo {
  width: 50vw;  /* 뷰포트 너비의 50% */
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-align: center;
}

.vh-demo {
  height: 30vh; /* 뷰포트 높이의 30% */
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  color: white;
  padding: 2rem;
  margin-top: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.vmin-vmax {
  width: 30vmin;  /* 너비/높이 중 작은 값의 30% */
  height: 30vmin;
  background: #fbbf24;
  color: #78350f;
  margin-top: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-align: center;
}`}
          initialHtml={`<div class="vw-demo">
  너비: 50vw<br/>
  (뷰포트 너비의 50%)
</div>

<div class="vh-demo">
  높이: 30vh (뷰포트 높이의 30%)
</div>

<div class="vmin-vmax">
  30vmin<br/>
  정사각형
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #e0e7ff; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Viewport Units:</strong><br/>
  • <strong>vh</strong>: Viewport Height (1vh = 높이의 1%)<br/>
  • <strong>vw</strong>: Viewport Width (1vw = 너비의 1%)<br/>
  • <strong>vmin</strong>: vh와 vw 중 작은 값<br/>
  • <strong>vmax</strong>: vh와 vw 중 큰 값<br/>
  💡 풀스크린 섹션, 큰 텍스트에 유용
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: % (부모 요소 비례 가변 단위) */}
      <CollapsibleSection title="Percentage: % (퍼센트)">
        <p className="section-description">
          <code>%</code>는 부모 요소를 기준으로 하는 상대 단위입니다.
          속성에 따라 기준이 달라지므로 주의가 필요합니다.
        </p>

        <LiveCodeEditor
          scopeId="percentage-demo"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.percent-parent {
  width: 400px;
  padding: 1.5rem;
  background: white;
  border: 3px solid #3b82f6;
  border-radius: 12px;
  color: #1e293b;
}

.percent-child-50 {
  width: 50%;  /* 부모 너비의 50% = 200px */
  padding: 1rem;
  background: #dbeafe;
  border-left: 4px solid #3b82f6;
  margin-bottom: 1rem;
  border-radius: 6px;
}

.percent-child-100 {
  width: 100%;  /* 부모 너비의 100% = 400px */
  padding: 1rem;
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  margin-bottom: 1rem;
  border-radius: 6px;
}

.percent-font {
  font-size: 150%;  /* 부모 폰트 크기의 150% */
  font-weight: 700;
  color: #8b5cf6;
  margin-top: 1rem;
}`}
          initialHtml={`<div class="percent-parent">
  <strong>부모 (400px)</strong>
  
  <div class="percent-child-50">
    width: 50% → 200px
  </div>
  
  <div class="percent-child-100">
    width: 100% → 400px
  </div>
  
  <div class="percent-font">
    font-size: 150%
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fce7f3; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>% 기준점:</strong><br/>
  • <strong>width/height</strong>: 부모의 width/height<br/>
  • <strong>font-size</strong>: 부모의 font-size<br/>
  • <strong>padding/margin</strong>: 부모의 width (⚠️ padding-top도!)<br/>
  • <strong>transform: translate</strong>: 자기 자신의 크기<br/>
  💡 유연한 레이아웃 구성에 필수
</div>`}
        />
      </CollapsibleSection>

      {/* 갤러리 섹션: 단위 비교 종합 및 실무 모범 사례 (Best Practices) */}
      <CollapsibleSection title="🎯 실전: 단위 비교 및 Best Practices">
        <p className="section-description">
          각 단위를 직접 비교하고 적절한 사용 사례를 확인해보세요.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'unit-type',
              type: 'radio',
              value: unitType,
              onChange: setUnitType,
              options: [
                { value: 'px', label: 'px (픽셀)' },
                { value: 'rem', label: 'rem (루트 기준)' },
                { value: 'em', label: 'em (부모 기준)' },
                { value: 'vw', label: 'vw (뷰포트 너비)' },
                { value: '%', label: '% (퍼센트)' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="comparison-demo"
          previewHeight="550px"
          codeHeight="450px"
          initialCss={`.comparison-container {
  padding: 2rem;
  background: white;
  border-radius: 12px;
}

.unit-box {
  ${unitType === 'px' ? 'font-size: 24px;' : ''}
  ${unitType === 'rem' ? 'font-size: 1.5rem;' : ''}
  ${unitType === 'em' ? 'font-size: 1.5em;' : ''}
  ${unitType === 'vw' ? 'font-size: 2vw;' : ''}
  ${unitType === '%' ? 'font-size: 150%;' : ''}
  
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  transition: all 0.3s ease;
}`}
          currentCss={`.comparison-container {
  padding: 2rem;
  background: white;
  border-radius: 12px;
}

.unit-box {
  ${unitType === 'px' ? 'font-size: 24px;' : ''}
  ${unitType === 'rem' ? 'font-size: 1.5rem;' : ''}
  ${unitType === 'em' ? 'font-size: 1.5em;' : ''}
  ${unitType === 'vw' ? 'font-size: 2vw;' : ''}
  ${unitType === '%' ? 'font-size: 150%;' : ''}
  
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  text-align: center;
  transition: all 0.3s ease;
}`}
          initialHtml={`<div class="comparison-container">
  <div class="unit-box">
    현재 단위: ${unitType}<br/>
    브라우저 창 크기를 조절하거나<br/>
    단위를 바꿔보세요!
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #d1fae5; padding: 1rem; border-radius: 6px; font-size: 0.9rem; line-height: 1.8;">
  <strong>📋 Best Practices:</strong><br/><br/>
  
  <strong>✅ font-size:</strong> rem 사용 (접근성, 일관성)<br/>
  <strong>✅ padding/margin:</strong> rem 또는 em (스케일링)<br/>
  <strong>✅ border/shadow:</strong> px (정밀 제어)<br/>
  <strong>✅ width (컨테이너):</strong> %, max-width: rem<br/>
  <strong>✅ media queries:</strong> rem 또는 em<br/>
  <strong>✅ 큰 제목:</strong> clamp(2rem, 5vw, 4rem) - 유동적<br/>
  <strong>✅ 풀스크린:</strong> vh, vw
</div>`}
          currentHtml={`<div class="comparison-container">
  <div class="unit-box">
    현재 단위: ${unitType}<br/>
    브라우저 창 크기를 조절하거나<br/>
    단위를 바꿔보세요!
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #d1fae5; padding: 1rem; border-radius: 6px; font-size: 0.9rem; line-height: 1.8;">
  <strong>📋 Best Practices:</strong><br/><br/>
  
  <strong>✅ font-size:</strong> rem 사용 (접근성, 일관성)<br/>
  <strong>✅ padding/margin:</strong> rem 또는 em (스케일링)<br/>
  <strong>✅ border/shadow:</strong> px (정밀 제어)<br/>
  <strong>✅ width (컨테이너):</strong> %, max-width: rem<br/>
  <strong>✅ media queries:</strong> rem 또는 em<br/>
  <strong>✅ 큰 제목:</strong> clamp(2rem, 5vw, 4rem) - 유동적<br/>
  <strong>✅ 풀스크린:</strong> vh, vw
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Modern CSS - clamp()를 활용한 가변 타이포그래피 */}
      <CollapsibleSection title="Modern: clamp() 함수">
        <p className="section-description">
          <code>clamp(최소값, 선호값, 최대값)</code>는 반응형 타이포그래피의 핵심 기술입니다.
          min, max 없이 부드럽게 크기가 조정됩니다.
        </p>

        <LiveCodeEditor
          scopeId="clamp-demo"
          previewHeight="650px"
          codeHeight="350px"
          initialCss={`.clamp-container {
  padding: 2rem;
  background: white;
  border-radius: 12px;
  color: #1e293b;
}

.clamp-title {
  /* 최소 2rem, 선호 5vw, 최대 4rem */
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.clamp-body {
  /* 브라우저 창에 따라 14px~18px */
  font-size: clamp(0.875rem, 2vw, 1.125rem);
  line-height: 1.8;
  max-width: 60ch; /* 읽기 편한 줄 길이 */
}

.demo-box {
  margin-top: 2rem;
  padding: clamp(1rem, 3vw, 2rem);
  background: #f1f5f9;
  border-left: 0.25rem solid #3b82f6;
  border-radius: 8px;
}`}
          initialHtml={`<div class="clamp-container">
  <h1 class="clamp-title">
    Responsive Title
  </h1>
  
  <p class="clamp-body">
    이 텍스트는 clamp()를 사용하여 브라우저 창 크기에 따라 자동으로 
    크기가 조정됩니다. 창 크기를 조절해보세요!
  </p>
  
  <div class="demo-box">
    <strong>padding도 clamp() 사용</strong><br/>
    브라우저 창이 작으면 1rem, 크면 2rem
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #e0e7ff; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>clamp(min, preferred, max)</strong><br/>
  • min: 최소 크기<br/>
  • preferred: 이상적인 크기 (보통 vw, vh 사용)<br/>
  • max: 최대 크기<br/>
  💡 미디어 쿼리 없이 유동적 반응형 구현!
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 반응형 컨텐츠 카드 (종합 단위 활용 예제) */}
      <CollapsibleSection title="실전 예제: 반응형 컨텐츠 카드">
        <p className="section-description">
          <code>clamp()</code>를 활용하여 미디어 쿼리 없이도 브라우저 너비에 따라 폰트와 여백이 유동적으로 변하는 카드입니다.
        </p>

        <LiveCodeEditor
          scopeId="units-practical-card"
          previewHeight="600px"
          codeHeight="450px"
          initialCss={`.responsive-card {
  /* 너비: 300px ~ 100% ~ 500px */
  width: clamp(300px, 90%, 500px);
  margin: 2rem auto;
  background: white;
  border-radius: clamp(12px, 3vw, 24px);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.header-img {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}

.body {
  /* 여백도 창 크기에 따라 유동적 */
  padding: clamp(1.5rem, 5vw, 3rem);
}

.title {
  /* 폰트 크기: 최소 1.25rem, 최대 2rem */
  font-size: clamp(1.25rem, 4vw, 2rem);
  font-weight: 800;
  margin-bottom: 1rem;
  color: #1e293b;
}

.desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #475569;
}
`}
          initialHtml={`<div class="responsive-card">
  <div class="header-img">⛰️</div>
  <div class="body">
    <h3 class="title">Flexible Design</h3>
    <p class="desc">
      이 카드는 clamp() 함수 하나만으로 모바일과 데스크탑 양쪽에서 
      최적의 레이아웃을 보여줍니다. 브라우저의 가로 너비를 줄였다 늘였다 해보세요!
    </p>
  </div>
</div>

<p style="margin-top: 1.5rem; color: #1e293b; background: #fef3c7; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 핵심 단위 활용:</strong><br/>
  • <strong>clamp()</strong>: 미디어 쿼리 중복을 줄여주는 강력한 modern CSS 기법<br/>
  • <strong>rem</strong>: 접근성을 고려한 텍스트 크기 기준<br/>
  • <strong>aspect-ratio</strong>: 이미지 영역의 비율 고정
</p>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default UnitsStudy;
