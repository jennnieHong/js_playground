/**
 * CustomPropertiesStudy.jsx
 * CSS 사용자 정의 속성(Custom Properties/Variables) 및 동적 테마링 실습 페이지
 */
import { useState } from 'react';
import CssPropertyControls from '../components/CssPropertyControls';
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';

function CustomPropertiesStudy() {
  // 상태 관리: 주색상, 테두리 반경, 글꼴 크기 동적 제어
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [borderRadius, setBorderRadius] = useState('8px');
  const [fontSize, setFontSize] = useState('16px');

  return (
    <div className="page-container">
      <PageHeader
        title="CSS Custom Properties (Variables)"
        subtitle="재사용 가능한 값을 정의하여 스타일 관리를 효율적으로"
      />

      {/* 섹션 1: CSS 변수(Custom Properties)의 개념 */}
      <section className="study-section">
        <h2 className="section-title">CSS 변수란?</h2>
        <p className="section-description">
          CSS Custom Properties(일명 CSS 변수)는 문서 전체에서 재사용할 수 있는 속성을 정의하는 기능입니다.
          `--` 접두사로 시작하며, `var()` 함수를 사용하여 값을 읽어옵니다.
        </p>
      </section>

      {/* 섹션 2: JavaScript와 연동된 동적 테마링 실습 */}
      <section className="study-section">
        <h2 className="section-title">동적 테마링 예제</h2>
        <p className="section-description">
          CSS 변수를 사용하면 JavaScript와 연동하여 동적으로 스타일을 변경하기 매우 쉽습니다.
          아래 컨트롤을 사용하여 값을 변경해보세요.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'Primary Color',
              type: 'select',
              value: primaryColor,
              onChange: setPrimaryColor,
              options: [
                { value: '#3b82f6', label: 'Blue' },
                { value: '#ef4444', label: 'Red' },
                { value: '#10b981', label: 'Green' },
                { value: '#8b5cf6', label: 'Purple' }
              ]
            },
            {
              name: 'Border Radius',
              type: 'radio',
              value: borderRadius,
              onChange: setBorderRadius,
              options: ['0px', '8px', '20px', '50%']
            },
            {
              name: 'Font Size',
              type: 'radio',
              value: fontSize,
              onChange: setFontSize,
              options: ['12px', '16px', '20px', '24px']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="css-variables"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`.variable-demo {
  --primary-color: ${primaryColor};
  --border-radius: ${borderRadius};
  --font-size: ${fontSize};
  padding: 2rem;
  background-color: #f3f4f6;
}

.card {
  background-color: white;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  color: var(--primary-color);
  font-size: var(--font-size);
  text-align: center;
  transition: all 0.3s ease;
}

.btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}`}
          currentCss={`.variable-demo {
  --primary-color: ${primaryColor};
  --border-radius: ${borderRadius};
  --font-size: ${fontSize};
  padding: 2rem;
  background-color: #f3f4f6;
}

.card {
  background-color: white;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  color: var(--primary-color);
  font-size: var(--font-size);
  text-align: center;
  transition: all 0.3s ease;
}

.btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: var(--border-radius);
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}`}
          initialHtml={`<div class="variable-demo">
  <div class="card">
    <h3>Hello, Variables!</h3>
    <p>This component uses CSS variables.</p>
    <button class="btn">Click Me</button>
  </div>
</div>`}
        />
      </section>

      {/* 섹션 3: 변수 재정의를 통한 다크 모드(Theming) 구현 기법 */}
      <section className="study-section">
        <h2 className="section-title">다크 모드 구현 (Theming)</h2>
        <div className="section-description">
          <p>
            CSS 변수를 활용한 가장 대표적인 사례가 바로 다크 모드입니다.
            상위 요소의 클래스나 속성이 바뀔 때 변수 값만 한꺼번에 교체하는 원리입니다.
          </p>
        </div>

        <div className="info-box">
          <strong>💡 핵심 전략:</strong><br />
          1. <code>:root</code>에 기본(Light) 색상 변수를 정의한다.<br />
          2. 특정 클래스(예: <code>.dark-mode</code>) 내부에서 해당 변수 값을 재정의한다.<br />
          3. 컴포넌트들은 변수 이름만 사용하여 스타일을 지정한다.
        </div>

        <LiveCodeEditor
          scopeId="dark-mode-demo"
          previewHeight="450px"
          codeHeight="650px"
          initialCss={`.theme-container {
  /* 1. 라이트 모드 변수 정의 */
  --bg-page: #f8fafc;
  --bg-card: #ffffff;
  --text-main: #1e293b;
  --text-sub: #64748b;
  --accent: #667eea;
  
  padding: 3rem;
  background-color: var(--bg-page);
  color: var(--text-main);
  min-height: 250px;
  border-radius: 12px;
  transition: all 0.4s ease; /* 전환을 부드럽게! */
}

/* 2. 다크 모드 변수 재정의 */
.theme-container.dark-mode {
  --bg-page: #0f172a;
  --bg-card: #1e293b;
  --text-main: #f8fafc;
  --text-sub: #94a3b8;
  --accent: #818cf8;
}

.profile-card {
  background-color: var(--bg-card);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin: 0 auto;
}

.profile-name {
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.profile-bio {
  color: var(--text-sub);
  font-size: 0.9rem;
}

.toggle-btn {
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 1.5rem;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.toggle-btn:hover {
  opacity: 0.9;
}`}
          initialHtml={`<div id="target-container" class="theme-container">
  <div class="profile-card">
    <h3 class="profile-name">김테크 님 ✨</h3>
    <p class="profile-bio">CSS 변수로 만드는 환상적인 다크모드 세계에 오신 것을 환영합니다!</p>
  </div>
  
  <button class="toggle-btn" onclick="document.getElementById('target-container').classList.toggle('dark-mode')">
    테마 전환하기 🌗
  </button>
</div>

<div class="info-box" style="margin-top: 2rem;">
  <strong>확인해보세요:</strong><br/>
  • [테마 전환하기] 버튼을 누를 때마다 클래스가 바뀌며 변수값이 업데이트됩니다.<br/>
  • <code>transition</code> 덕분에 배경색과 글자색이 부드럽게 페이드 됩니다.
</div>`}
        />
      </section>
    </div>
  );
}

export default CustomPropertiesStudy;
