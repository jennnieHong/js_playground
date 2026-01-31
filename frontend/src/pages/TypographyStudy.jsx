/**
 * TypographyStudy 페이지 컴포넌트
 * 웹 타이포그래피의 기본 요소(글꼴, 크기, 두께, 줄 간격)와 고급 텍스트 효과를 학습하는 페이지입니다.
 * 주요 개념: Font Family, Weight/Size 계층 구조, Line Height 가독성, Text Overflow(말줄임), Text Shadow, Writing Mode
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function TypographyStudy() {
  // --- 상태 관리 (State Management) ---
  // 타이포그래피 속성들의 실시간 변화를 제어하기 위한 상태값들입니다.
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const [fontWeight, setFontWeight] = useState('400');
  const [fontSize, setFontSize] = useState('16px');
  const [lineHeight, setLineHeight] = useState('1.6');
  const [textAlign, setTextAlign] = useState('left');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Typography Study"
        subtitle="Mastering fonts, text styling, and readable typography"
      />

      {/* Typography 기초 정의 섹션 */}

      <CollapsibleSection title="Typography의 중요성">
        <div className="section-description">
          <p>
            웹사이트 콘텐츠의 95%는 텍스트입니다. 좋은 타이포그래피는 가독성, 접근성, 사용자 경험에 직접적인 영향을 미칩니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><strong>가독성(Readability)</strong>: 텍스트를 얼마나 쉽게 읽을 수 있는가</li>
            <li><strong>판독성(Legibility)</strong>: 개별 글자를 얼마나 쉽게 구분할 수 있는가</li>
            <li><strong>계층 구조</strong>: 제목, 본문, 캡션 등의 시각적 우선순위</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: Font Family (글꼴 선택 및 폴백) */}
      <CollapsibleSection title="Font Family (글꼴)">
        <p className="section-description">
          적절한 글꼴 선택은 브랜드와 가독성에 큰 영향을 미칩니다. 항상 폴백(fallback) 글꼴을 지정하세요.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'font-family',
              type: 'radio',
              value: fontFamily,
              onChange: setFontFamily,
              options: [
                { value: 'sans-serif', label: 'Sans-serif (고딕)' },
                { value: 'serif', label: 'Serif (명조)' },
                { value: 'monospace', label: 'Monospace (코드)' },
                { value: "'Georgia', serif", label: 'Georgia' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="font-family"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.text-demo {
  font-family: ${fontFamily};
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`}
          currentCss={`.text-demo {
  font-family: ${fontFamily};
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`}
          initialHtml={`<div class="text-demo">
  <strong>The quick brown fox jumps over the lazy dog.</strong><br/>
  빠른 갈색 여우가 게으른 개를 뛰어넘습니다.
  <br/><br/>
  Typography is the art and technique of arranging type to make written language
  legible, readable, and appealing when displayed.
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>글꼴 종류:</strong><br/>
  • <strong>Sans-serif</strong>: 깔끔하고 현대적, 화면용<br/>
  • <strong>Serif</strong>: 전통적이고 격식있는, 인쇄물용<br/>
  • <strong>Monospace</strong>: 코드, 고정폭
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Font Weight & Size (시각적 위계 설정) */}
      <CollapsibleSection title="Font Weight & Size">
        <p className="section-description">
          글꼴 두께와 크기로 시각적 계층을 만들 수 있습니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'font-weight',
              type: 'radio',
              value: fontWeight,
              onChange: setFontWeight,
              options: [
                { value: '300', label: '300 (Light)' },
                { value: '400', label: '400 (Normal)' },
                { value: '600', label: '600 (Semi-bold)' },
                { value: '700', label: '700 (Bold)' }
              ]
            },
            {
              name: 'font-size',
              type: 'radio',
              value: fontSize,
              onChange: setFontSize,
              options: ['12px', '16px', '20px', '24px', '32px']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="font-weight-size"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.weight-demo {
  font-weight: ${fontWeight};
  font-size: ${fontSize};
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.6;
}`}
          currentCss={`.weight-demo {
  font-weight: ${fontWeight};
  font-size: ${fontSize};
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.6;
}`}
          initialHtml={`<div class="weight-demo">
  Font Weight: ${fontWeight}<br/>
  Font Size: ${fontSize}
  <br/><br/>
  Good typography makes the difference between a mediocre design and a great one.
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Font Weight 값:</strong><br/>
  100-900 (100 단위), 또는 normal(400), bold(700)<br/>
  <strong>Font Size 단위:</strong><br/>
  px, rem, em, %, vw 등
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Line Height (가독성의 핵심, 줄 간격) */}
      <CollapsibleSection title="Line Height (줄 간격)">
        <div className="section-description">
          <p>
            <code>line-height</code>는 가독성에 가장 큰 영향을 미치는 속성 중 하나입니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li>본문: 1.5 ~ 1.8 권장</li>
            <li>제목: 1.2 ~ 1.4 권장</li>
            <li>단위 없는 숫자 사용 권장 (예: 1.6, font-size의 배수)</li>
          </ul>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'line-height',
              type: 'radio',
              value: lineHeight,
              onChange: setLineHeight,
              options: ['1', '1.3', '1.6', '2', '2.5']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="line-height"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`.line-height-demo {
  line-height: ${lineHeight};
  font-size: 16px;
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 600px;
}`}
          currentCss={`.line-height-demo {
  line-height: ${lineHeight};
  font-size: 16px;
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 600px;
}`}
          initialHtml={`<div class="line-height-demo">
  <strong>Line Height: ${lineHeight}</strong>
  <br/><br/>
  Typography is the art and technique of arranging type to make written language 
  legible, readable, and appealing when displayed. The arrangement of type involves 
  selecting typefaces, point sizes, line lengths, line-spacing (leading), and 
  letter-spacing (tracking).
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>1.0</strong>: 줄이 너무 빽빽함 ❌<br/>
  <strong>1.6</strong>: 본문에 최적 ✅<br/>
  <strong>2.5</strong>: 줄 간격이 너무 넓음
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Text Align & Transform (정렬 및 대소문자) */}
      <CollapsibleSection title="Text Align & Transform">
        <p className="section-description">
          텍스트 정렬과 대소문자 변환으로 레이아웃과 강조를 조정합니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'text-align',
              type: 'radio',
              value: textAlign,
              onChange: setTextAlign,
              options: ['left', 'center', 'right', 'justify']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="text-align"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.align-demo {
  text-align: ${textAlign};
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.8;
}

.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }`}
          currentCss={`.align-demo {
  text-align: ${textAlign};
  color: #1e293b;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.8;
}

.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }`}
          initialHtml={`<div class="align-demo">
  <p><strong>Text Align: ${textAlign}</strong></p>
  
  <p>Typography is the art and technique of arranging type to make written language legible and readable.</p>
  
  <p class="uppercase">uppercase text</p>
  <p class="lowercase">LOWERCASE TEXT</p>
  <p class="capitalize">capitalize each word</p>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>text-transform:</strong><br/>
  uppercase, lowercase, capitalize, none
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 패턴 섹션: Text Overflow (말줄임표 처리 기법) */}
      <CollapsibleSection title="Text Overflow (Ellipsis)">
        <p className="section-description">
          긴 텍스트를 말줄임표(...)로 표시하는 중요한 패턴입니다.
        </p>

        <LiveCodeEditor
          scopeId="text-overflow"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`/* 한 줄 말줄임 */
.ellipsis-single {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #dbeafe;
  color: #1e3a8a;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 600;
}

/* 여러 줄 말줄임 (2줄) */
.ellipsis-multi {
  width: 250px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  background: #fef3c7;
  color: #78350f;
  padding: 0.75rem;
  border-radius: 6px;
  line-height: 1.5;
  font-weight: 600;
}`}
          initialHtml={`<div>
  <div class="ellipsis-single">
    This is a very long text that will be truncated with an ellipsis
  </div>
  
  <div class="ellipsis-multi">
    This is a longer text that spans multiple lines and will show ellipsis 
    after exactly two lines of content are displayed
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>한 줄 말줄임:</strong><br/>
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  <br/><br/>
  <strong>여러 줄 말줄임:</strong><br/>
  display: -webkit-box; -webkit-line-clamp: 2;
</div>`}
        />
      </CollapsibleSection>

      {/* 디자인 가이드 섹션: 타이포그래피 시스템 (Best Practice) */}
      <CollapsibleSection title="실전: 타이포그래피 시스템">
        <p className="section-description">
          일관된 타이포그래피 스케일을 사용하면 전문적이고 통일감 있는 디자인을 만들 수 있습니다.
        </p>

        <LiveCodeEditor
          scopeId="typography-system"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`:root {
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 2rem;     /* 32px */
}

.typo-system {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  color: #1e293b;
}

.typo-system h1 { font-size: var(--font-size-3xl); font-weight: 700; margin: 0 0 0.5rem 0; }
.typo-system h2 { font-size: var(--font-size-2xl); font-weight: 600; margin: 1rem 0 0.5rem 0; }
.typo-system p { font-size: var(--font-size-base); line-height: 1.6; margin: 0.5rem 0; }
.typo-system .caption { font-size: var(--font-size-sm); color: #64748b; }`}
          initialHtml={`<div class="typo-system">
  <h1>Heading 1 (32px)</h1>
  <p class="caption">Caption text (14px)</p>
  
  <h2>Heading 2 (24px)</h2>
  <p>
    Body text (16px). A consistent typographic scale creates visual harmony 
    and makes your design feel more professional and polished.
  </p>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Best Practice:</strong> CSS 변수로 타이포그래피 스케일을 정의하여 
  일관성 있는 디자인 시스템을 구축하세요.
</div>`}
        />
      </CollapsibleSection>
      {/* 실습 섹션: Text Shadow (텍스트 특수 효과 갤러리) */}
      <CollapsibleSection title="Text Shadow Gallery">
        <p className="section-description">
          <code>text-shadow</code>를 활용하여 텍스트에 깊이감과 특수 효과를 더합니다.
        </p>
        <LiveCodeEditor
          scopeId="text-shadow-gallery"
          previewHeight="300px"
          codeHeight="450px"
          initialCss={`.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: #1e293b;
  border-radius: 12px;
}

.shadow-item {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  text-align: center;
}

/* 1. Soft Glow */
.glow {
  text-shadow: 0 0 10px #3b82f6, 0 0 20px #3b82f6;
}

/* 2. 3D Look */
.three-d {
  color: #f1f5f9;
  text-shadow: 
    0 1px 0 #cbd5e1,
    0 2px 0 #94a3b8,
    0 3px 0 #64748b,
    0 4px 0 #475569,
    0 10px 10px rgba(0,0,0,0.5);
}

/* 3. Neon */
.neon {
  color: #fff;
  text-shadow:
    0 0 5px #fff,
    0 0 10px #fff,
    0 0 20px #ff00de,
    0 0 40px #ff00de,
    0 0 80px #ff00de;
}

/* 4. Outline (Stroke) */
.outline {
  color: #1e293b;
  text-shadow: 
    -1px -1px 0 #fff,  
     1px -1px 0 #fff,
    -1px  1px 0 #fff,
     1px  1px 0 #fff;
}`}
          initialHtml={`<div class="shadow-grid">
  <div class="shadow-item glow">Glow</div>
  <div class="shadow-item three-d">3D Text</div>
  <div class="shadow-item neon">NEON</div>
  <div class="shadow-item outline">Outline</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Advanced Decoration (밑줄 offset 등 최신 속성) */}
      <CollapsibleSection title="Advanced Decoration">
        <p className="section-description">
          현대적인 CSS 속성을 사용하여 밑줄의 위치와 두께를 정밀하게 조절합니다.
        </p>
        <LiveCodeEditor
          scopeId="typo-decoration"
          previewHeight="200px"
          codeHeight="300px"
          initialCss={`.deco-demo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  line-height: 2;
}

.underline-offset {
  text-decoration: underline;
  text-decoration-color: #3b82f6;
  /* 밑줄과 텍스트 사이의 간격 */
  text-underline-offset: 8px;
}

.underline-thick {
  text-decoration: underline;
  text-decoration-color: #ef4444;
  /* 밑줄의 두께 */
  text-decoration-thickness: 4px;
}

.underline-wave {
  text-decoration: underline wavy #f59e0b;
  text-underline-offset: 4px;
}`}
          initialHtml={`<div style="background: white; padding: 2rem; border-radius: 8px;">
  <div class="deco-demo">
    <p><span class="underline-offset">Underline Offset (8px)</span></p>
    <p><span class="underline-thick">Thick Underline (4px)</span></p>
    <p><span class="underline-wave">Wavy Decoration</span></p>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Word Break & Wrap (긴 단어 및 언어별 줄바꿈 대응) */}
      <CollapsibleSection title="Word Break & Wrap">
        <p className="section-description">
          넘치는 텍스트를 어떻게 처리할지 결정합니다. 특히 한국어/영어 혼용 시 중요합니다.
        </p>
        <LiveCodeEditor
          scopeId="word-break-demo"
          previewHeight="300px"
          codeHeight="350px"
          initialCss={`.break-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.break-box {
  width: 200px;
  padding: 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #1e293b;
}

/* 기본값: 단어 단위로 끊김 */
.normal { word-break: normal; }

/* 글자 단위로 끊김 (한글/일어/중어 기본값과 유사) */
.break-all { word-break: break-all; }

/* 단어 중간에서 끊지 않되, 너무 길면 강제 개행 */
.anywhere { overflow-wrap: anywhere; }`}
          initialHtml={`<div class="break-container">
  <div>
    <strong>word-break: normal</strong>
    <div class="break-box normal">
      ThisIsAVeryVeryVeryLongEnglishWordThatMightBreakLayout.
      안녕 하세요반갑습니다.이것은테스트문장입니다.
    </div>
  </div>

  <div>
    <strong>word-break: break-all</strong>
    <div class="break-box break-all">
      ThisIsAVeryVeryVeryLongEnglishWordThatMightBreakLayout.
    </div>
  </div>

  <div>
    <strong>overflow-wrap: anywhere</strong>
    <div class="break-box anywhere">
      ThisIsAVeryVeryVeryLongEnglishWordThatMightBreakLayout.
    </div>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Writing Mode (동아시아 세로쓰기 대응) */}
      <CollapsibleSection title="writing-mode (텍스트 방향)">
        <p className="section-description">
          텍스트의 흐름을 가로 또는 세로로 변경합니다. 동아시아 언어의 세로 쓰기나 독특한 디자인 레이아웃에 사용됩니다.
        </p>

        <LiveCodeEditor
          scopeId="writing-mode-demo"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.vertical-text {
  /* 세로 쓰기: 오른쪽에서 왼쪽으로 줄 바꿈 */
  writing-mode: vertical-rl;
  
  height: 250px;
  padding: 1.5rem;
  background: #f8fafc;
  border-right: 4px solid #3b82f6;
  color: #1e293b;
  font-family: serif;
  line-height: 2;
  letter-spacing: 0.1em;
}

.horizontal-text {
  writing-mode: horizontal-tb; /* 기본값 */
  padding: 1.5rem;
  background: white;
  color: #1e293b;
}`}
          initialHtml={`<div style="display: flex; gap: 2rem; background: #ffffff; padding: 2rem; border-radius: 8px;">
  <div class="vertical-text">
    동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 
    무궁화 삼천리 화려 강산 대한 사람 대한으로 길이 보전하세.
  </div>
  
  <div class="horizontal-text">
    <h4>일반적인 가로 쓰기</h4>
    <p>지금 보시는 이 텍스트는 전통적인 가로 방향 흐름(horizontal-tb)을 따르고 있습니다.</p>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>vertical-rl</strong>: 세로 방향으로 글자가 흐르며, 줄 바꿈은 오른쪽에서 왼쪽으로 일어납니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 뉴스 기사 레이아웃 (종합 실습) */}
      <CollapsibleSection title="실전 예제: 뉴스 기사 레이아웃">
        <p className="section-description">
          제목 계층 구조, 줄 간격, 자간, 그리고 말줄임 효과를 조합한 실용적인 기사 레이아웃입니다.
        </p>

        <LiveCodeEditor
          scopeId="typo-practical-article"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`.article-container {
  max-width: 500px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  font-family: 'Inter', -apple-system, sans-serif;
}

.article-category {
  color: #2563eb;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  display: block;
}

.article-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.article-meta {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.article-excerpt {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #334155;
  font-weight: 500;
  margin-bottom: 20px;
}

.article-content {
  font-size: 1rem;
  line-height: 1.8;
  color: #475569;
}

.read-more {
  margin-top: 24px;
  display: inline-block;
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.2s;
}

.read-more:hover {
  border-bottom-color: #2563eb;
}
`}
          initialHtml={`<article class="article-container">
  <span class="article-category">Technology</span>
  <h1 class="article-title">The Future of Web Typography: Better and Faster</h1>
  
  <div class="article-meta">
    By <strong>John Doe</strong> • Jan 21, 2026
  </div>

  <p class="article-excerpt">
    현대적인 웹 타이포그래피는 단순히 글꼴을 고르는 것을 넘어, 성능과 가독성의 완벽한 조화를 추구합니다.
  </p>

  <div class="article-content">
    적절한 line-height(1.8)와 자간 조절은 기나긴 본문 텍스트를 읽는 사용자의 피로도를 획기적으로 낮춰줍니다. 
    또한 <code>letter-spacing</code>을 미세하게 조정하여(특히 한글에서) 판독성을 높일 수 있습니다.
  </div>

  <a href="#" class="read-more">Read Full Story →</a>
</article>

<p style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 타이포그래피 팁:</strong><br/>
  • <strong>letter-spacing</strong>: 한글은 글자 사이가 약간 좁을 때 눈이 더 편안합니다 (-0.02em ~ -0.05em 추천)<br/>
  • <strong>line-height</strong>: 본문은 1.6~1.8배가 가장 가독성이 좋으며, 제목은 1.2배 정도로 좁히는 것이 강렬합니다.
</p>`}
        />
      </CollapsibleSection>
    </div >
  );
}

export default TypographyStudy;
