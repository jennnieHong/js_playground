/**
 * ModernSelectorsStudy.jsx
 * 현대적인 CSS 선택자(:is, :where, :not, :has 등) 활용 실습 페이지
 */
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';

function ModernSelectorsStudy() {
  return (
    <div className="page-container">
      <PageHeader
        title="Modern Selectors"
        subtitle="Writing cleaner, more descriptive selectors with :is(), :where(), and :not()"
      />

      {/* 섹션 0: 핵심 개념 한눈에 보기 */}
      <section className="study-section">
        <h2 className="section-title">🎯 Modern Selectors 한눈에 보기</h2>
        <div className="section-description">
          <p>
            현대 CSS 선택자는 <strong>코드를 짧게</strong> 쓰고, <strong>JavaScript 없이</strong> 동적인 스타일링을 가능하게 합니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>:is() - 그룹화</h4>
              <p style={{ fontSize: '0.9rem', color: '#0e7490', marginBottom: '0.5rem' }}>
                <strong>역할:</strong> 여러 선택자를 하나로 묶기
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`/* 기존: 길고 반복적 */
.header a:hover,
.footer a:hover,
.sidebar a:hover { }

/* :is(): 짧고 깔끔 */
:is(.header, .footer, .sidebar) a:hover { }`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h4 style={{ marginTop: 0, color: '#b45309' }}>:where() - 제로 우선순위</h4>
              <p style={{ fontSize: '0.9rem', color: '#92400e', marginBottom: '0.5rem' }}>
                <strong>역할:</strong> 쉽게 덮어쓸 수 있는 기본 스타일
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`/* 우선순위 0: 누구든 이길 수 있음 */
:where(.card, .box) p {
  color: gray;  /* 기본값 */
}

/* 쉽게 덮어쓰기 가능 */
.card p { color: blue; }`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#fce7f3', borderRadius: '12px', border: '2px solid #ec4899' }}>
              <h4 style={{ marginTop: 0, color: '#be185d' }}>:not() - 제외하기</h4>
              <p style={{ fontSize: '0.9rem', color: '#9d174d', marginBottom: '0.5rem' }}>
                <strong>역할:</strong> 특정 조건 제외한 모든 요소 선택
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`/* 마지막 제외한 모든 아이템에 마진 */
.item:not(:last-child) {
  margin-bottom: 1rem;
}

/* disabled 아닌 버튼만 호버 효과 */
button:not(:disabled):hover { }`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#059669' }}>:has() - 부모 선택자 🔥</h4>
              <p style={{ fontSize: '0.9rem', color: '#047857', marginBottom: '0.5rem' }}>
                <strong>역할:</strong> 특정 자식을 가진 부모 선택 (혁명적!)
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', overflow: 'auto' }}>
{`/* 체크박스가 체크된 폼 그룹 */
.form-group:has(input:checked) {
  background: lightblue;
}

/* 이미지가 있는 카드만 강조 */
.card:has(img) { border: 2px solid blue; }`}
              </pre>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>🤔 언제 어떤 걸 쓰나요?</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#075985', lineHeight: '1.8' }}>
              <li><code>:is()</code> → 반복되는 선택자를 줄이고 싶을 때</li>
              <li><code>:where()</code> → 라이브러리/기본 스타일 만들 때 (사용자가 쉽게 커스텀 가능)</li>
              <li><code>:not()</code> → "이것 빼고 전부"라고 말하고 싶을 때</li>
              <li><code>:has()</code> → 자식 상태에 따라 부모 스타일을 바꾸고 싶을 때 (JS 없이!)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 섹션 1: 현대적 선택자를 이용한 가독성 및 유지보수 개선 */}
      <section className="study-section">
        <h2 className="section-title">가독성과 유지보수</h2>
        <div className="section-description">
          <p>
            현대 CSS는 중복되는 선택자를 줄이고, 선택자의 우선순위(Specificity)를 더 정교하게 제어할 수 있는 새로운 도구들을 제공합니다.
          </p>
        </div>
      </section>

      {/* 섹션 2: 중복 제거를 위한 :is() 선택자 */}
      <section className="study-section">
        <h2 className="section-title">:is() - 선택자 그룹화</h2>
        <div className="section-description">
          <p>
            공통 스타일을 가진 여러 선택자를 하나로 묶어 가독성을 높입니다.
          </p>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>🔥 실무에서 이럴 때 씁니다</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#047857', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li><strong>네비게이션 링크:</strong> <code>:is(header, footer, nav) a:hover</code> - 모든 영역의 링크 호버 스타일을 한번에</li>
              <li><strong>폼 상태:</strong> <code>input:is(:hover, :focus, :active)</code> - 인터랙션 상태 그룹화</li>
              <li><strong>제목 태그:</strong> <code>article :is(h1, h2, h3, h4)</code> - 모든 제목에 동일 스타일</li>
              <li><strong>버튼 변형:</strong> <code>button:is(.primary, .secondary, .danger)</code> - 공통 버튼 속성</li>
            </ul>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="selector-is"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`/* 기존 방식 */
section h1, 
section h2, 
section h3 {
  color: #3b82f6;
  margin-top: 2rem;
}

/* 현대적 방식: :is() */
.modern-container :is(h1, h2, h3) {
  color: #10b981;
  text-decoration: underline;
}

/* 호버 시 스타일 그룹화 */
.list-item:is(:hover, :focus, :active) {
  background: #dcfce7;
  color: #166534;
}

.list-item {
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}`}
          initialHtml={`<div class="modern-container">
  <h1>Title with :is()</h1>
  <h2>Sub-title</h2>
  <h3>Small Title</h3>
  
  <div style="margin-top: 2rem;">
    <div class="list-item">Hover or Focus me!</div>
    <div class="list-item">Interact with me too!</div>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <code>:is()</code>의 우선순위는 **목록 내에서 가장 높은 것**을 따릅니다.
</div>`}
        />
      </section>

      {/* 섹션 3: 명시도 영향을 주지 않는 :where() 선택자 */}
      <section className="study-section">
        <h2 className="section-title">:where() - 제로 명시도 (Zero Specificity)</h2>
        <div className="section-description">
          <p>
            <code>:is()</code>와 기능은 같지만, <strong>우선순위가 항상 0</strong>입니다. 
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: '#ecfeff', borderRadius: '8px', border: '1px solid #06b6d4' }}>
              <strong style={{ color: '#0891b2' }}>:is()</strong>
              <p style={{ marginBottom: 0, fontSize: '0.9rem', color: '#0e7490' }}>
                우선순위 = 목록 중 가장 높은 것<br/>
                → 덮어쓰기 어려움
              </p>
            </div>
            <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <strong style={{ color: '#b45309' }}>:where()</strong>
              <p style={{ marginBottom: 0, fontSize: '0.9rem', color: '#92400e' }}>
                우선순위 = 항상 0<br/>
                → 누구든 쉽게 덮어쓰기 가능
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>🔥 실무에서 이럴 때 씁니다</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li><strong>UI 라이브러리 제작:</strong> 기본 스타일을 제공하되, 사용자가 쉽게 커스텀 가능하게</li>
              <li><strong>Reset/Normalize CSS:</strong> 기본값을 설정하되, 프로젝트 스타일이 우선되게</li>
              <li><strong>컴포넌트 기본 스타일:</strong> 컴포넌트의 기본 모양은 정의하되, prop으로 전달된 스타일이 이기게</li>
            </ul>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="selector-where"
          previewHeight="400px"
          codeHeight="380px"
          initialCss={`/* ✅ :where()는 명시도가 0! */
:where(.header, .footer) p {
  color: #94a3b8;
  font-style: italic;
}

/* .footer p의 명시도: (0,0,1,1) */
/* :where()의 명시도: (0,0,0,1) ← 클래스가 무시됨! */
/* 따라서 .footer p가 "명시도"로 이김 */
.footer p {
  color: #ef4444;
  font-style: normal;
}

.card {
  border: 1px solid #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  margin-bottom: 0.5rem;
}`}
          initialHtml={`<div class="header card">
  <p>Header: :where() 스타일 적용 (회색)</p>
</div>

<div class="footer card">
  <p>Footer: .footer p가 명시도로 이김 (빨간색)</p>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #d1fae5; border-radius: 8px; font-size: 0.9rem; color: #065f46; line-height: 1.7;">
  <strong>💡 :where() vs :is() 핵심 차이</strong><br/>
  • <code>:is(.header, .footer) p</code> → 명시도 <strong>(0,0,1,1)</strong> (클래스 포함)<br/>
  • <code>:where(.header, .footer) p</code> → 명시도 <strong>(0,0,0,1)</strong> (클래스 무시!)<br/><br/>
  
  <strong>⚠️ 명시도가 같으면?</strong><br/>
  명시도가 동일할 경우, <strong>나중에 선언된 규칙</strong>이 적용됩니다!
</div>`}
        />
      </section>

      {/* 섹션 4: 특정 요소를 제외하는 :not() 부정 선택자 */}
      <section className="study-section">
        <h2 className="section-title">:not() - 부정 선택자</h2>
        <div className="section-description">
          <p>
            "이것 <strong>빼고</strong> 전부"라고 말하고 싶을 때 사용합니다. 특정 조건을 제외한 모든 요소를 선택합니다.
          </p>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#fce7f3', borderRadius: '10px', border: '1px solid #ec4899' }}>
            <strong style={{ color: '#be185d' }}>🔥 자주 쓰는 :not() 패턴</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#9d174d' }}>.item:not(:last-child)</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#831843' }}>
                  마지막 요소 제외 → 구분선이나 마진 넣을 때
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#9d174d' }}>button:not(:disabled)</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#831843' }}>
                  비활성화 아닌 버튼만 → 호버 효과 적용
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#9d174d' }}>input:not([type="checkbox"])</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#831843' }}>
                  체크박스 제외한 입력 필드 → 공통 스타일링
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#9d174d' }}>:not(:placeholder-shown)</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#831843' }}>
                  값이 입력된 필드 → 입력 완료 표시
                </p>
              </div>
            </div>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="selector-not"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.tag {
  display: inline-block;
  padding: 4px 12px;
  background: #f1f5f9;
  border-radius: 20px;
  margin: 4px;
  font-size: 0.9rem;
}

/* 'active' 클래스가 없는 모든 tag 선택 */
.tag:not(.active) {
  opacity: 0.5;
  filter: grayscale(1);
}

.tag.active {
  background: #3b82f6;
  color: white;
  font-weight: bold;
}

.input-field:not(:placeholder-shown) {
  border-color: #10b981;
  background: #f0fdf4;
}`}
          initialHtml={`<div style="background: white; padding: 1.5rem; border-radius: 8px;">
  <span class="tag active">React</span>
  <span class="tag">Vue</span>
  <span class="tag">Angular</span>
  <span class="tag">Svelte</span>
  
  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e2e8f0;"/>
  
  <input type="text" class="input-field" placeholder="Type something..." 
    style="padding: 0.5rem; border: 2px solid #cbd5e1; border-radius: 4px; outline: none;"/>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>실무 팁:</strong> <code>.box:not(:last-child)</code> 를 사용하여 마지막 요소를 제외한 구분선을 넣을 때 자주 쓰입니다.
</div>`}
        />
      </section>

      {/* 섹션 5: 관계 기반 선택의 혁명, :has() 선택자 */}
      <section className="study-section">
        <h2 className="section-title">:has() - 부모 선택자의 혁명 🔥</h2>
        <div className="section-description">
          <p>
            <code>:has()</code>는 CSS 역사상 가장 혁명적인 선택자입니다.
            <strong>자식의 상태에 따라 부모를 선택</strong>할 수 있게 해주며, 이전에는 JavaScript로만 가능했던 많은 것들을 CSS로 할 수 있게 됩니다!
          </p>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#d1fae5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>🔥 :has()로 할 수 있는 것들 (JavaScript 없이!)</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#047857' }}>.form-group:has(input:checked)</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#065f46' }}>
                  체크박스가 체크되면 → 부모 배경색 변경
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#047857' }}>.card:has(img)</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#065f46' }}>
                  이미지가 있는 카드만 → 다른 레이아웃 적용
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#047857' }}>.form:has(input:invalid)</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#065f46' }}>
                  유효하지 않은 입력이 있으면 → 제출 버튼 비활성화
                </p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.5)', padding: '0.75rem', borderRadius: '6px' }}>
                <code style={{ color: '#047857' }}>.article:has(+ .article:hover)</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#065f46' }}>
                  다음 요소가 호버되면 → 이전 요소 스타일 변경
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <strong style={{ color: '#b91c1c' }}>⚠️ 주의사항</strong>
            <p style={{ marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem', color: '#991b1b' }}>
              <code>:has()</code>는 비교적 최신 기능입니다. IE는 지원하지 않으며, 2023년 이전 브라우저에서는 작동하지 않을 수 있습니다.
              하지만 최신 Chrome, Firefox, Safari, Edge에서는 모두 지원됩니다!
            </p>
          </div>

          <h4 style={{ marginTop: '2rem', color: '#1e293b' }}>🕰️ :has() 이전에는 어떻게 했나요?</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h5 style={{ marginTop: 0, color: '#b91c1c' }}>❌ 이전: JavaScript 필수!</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.75rem', overflow: 'auto' }}>
{`// "체크박스 체크 시 부모 배경 변경"
const checkbox = document.querySelector('input');
const formGroup = document.querySelector('.form-group');

checkbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    formGroup.classList.add('is-checked');
  } else {
    formGroup.classList.remove('is-checked');
  }
});

// CSS
.form-group.is-checked {
  background: lightblue;
}`}
              </pre>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: '#991b1b' }}>
                JavaScript 코드, 이벤트 리스너, 상태 관리 필요
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h5 style={{ marginTop: 0, color: '#065f46' }}>✅ 지금: CSS 한 줄!</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', overflow: 'auto' }}>
{`/* JavaScript 전혀 불필요! */
.form-group:has(input:checked) {
  background: lightblue;
}`}
              </pre>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.85rem', color: '#047857' }}>
                브라우저가 알아서 상태를 감시하고 스타일 적용!
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>💡 왜 20년이나 걸렸나요?</strong>
            <p style={{ marginTop: '0.25rem', marginBottom: 0, fontSize: '0.9rem', color: '#075985', lineHeight: '1.7' }}>
              CSS 선택자는 항상 <strong>부모→자식</strong> 방향으로 탐색합니다 (빠름).<br/>
              하지만 <code>:has()</code>는 <strong>자식→부모</strong> 역방향 탐색이 필요합니다 (느림).<br/>
              브라우저가 이를 효율적으로 처리하는 방법을 개발하기까지 오랜 시간이 걸렸습니다!
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="selector-has"
          previewHeight="450px"
          codeHeight="600px"
          initialCss={`/* 1. 이미지가 포함된 카드만 보더 추가 */
.card:has(img) {
  border: 2px solid #667eea;
}

/* 2. 체크된 체크박스가 있는 필드셋 배경 변경 */
.form-group:has(input:checked) {
  background: #eef2ff;
  border-color: #667eea;
}

/* 3. 특정 요소가 호버될 때 인접 요소 스타일 (Relational) */
.nav-item:has(+ .nav-item:hover) {
  transform: translateX(-10px);
}

.card {
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 1rem;
}

.form-group {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s;
}

.nav-list { display: flex; gap: 1rem; margin-top: 1rem; }
.nav-item {
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border-radius: 6px;
  transition: 0.3s;
  cursor: pointer;
}
.nav-item:hover { background: #667eea; color: white; }`}
          initialHtml={`<div class="card">
  <h4>카드 1 (이미지 없음)</h4>
  <p>이 카드는 이미지가 없어 강조되지 않습니다.</p>
</div>

<div class="card">
  <img src="https://via.placeholder.com/50" style="border-radius: 4px;"/>
  <h4>카드 2 (이미지 있음)</h4>
  <p>이미지가 포함되어 <code>:has(img)</code> 선택자가 작동합니다!</p>
</div>

<div class="form-group">
  <label style="cursor: pointer;">
    <input type="checkbox"> 이 옵션을 선택하면 부모의 배경이 바뀝니다.
  </label>
</div>

<div class="nav-list">
  <div class="nav-item">Menu A</div>
  <div class="nav-item">Menu B</div>
  <div class="nav-item">Menu C</div>
</div>
<p style="font-size: 0.8rem; margin-top: 10px;">↑ Menu B에 마우스를 올려보세요. 앞의 Menu A가 반응합니다!</p>`}
        />
      </section>

      {/* 섹션 6: 특정 조건 내에서의 순서 필터링 (nth-child of S) */}
      <section className="study-section">
        <h2 className="section-title">:nth-child() of S - 정교한 필터링</h2>
        <div className="section-description">
          <p>
            기존 <code>:nth-child</code>는 모든 형제 중 순서를 찾았지만,
            최신 문법인 <code>of selector</code>를 사용하면 특정 선택자에 해당하는 요소들 중에서만 순서를 찾습니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="selector-nth-of"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`/* 'active' 클래스를 가진 요소들 중에서 2번째 것만 선택 */
.item:nth-child(2 of .active) {
  background: #f5576c;
  color: white;
  transform: scale(1.1);
}

.item {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.active {
  background: #eef2ff;
  border-color: #667eea;
  font-weight: bold;
}

.hidden {
  display: none;
}`}
          initialHtml={`<div class="list">
  <div class="item active">1. Active A</div>
  <div class="item">2. Normal</div>
  <div class="item active">3. Active B (이게 2번째 Active)</div>
  <div class="item">4. Normal</div>
  <div class="item active">5. Active C</div>
</div>

<div class="info-box">
  기존 방식이라면 3번 요소는 전체 중 '3번째'라 선택되지 않았겠지만, 
  <code>2 of .active</code> 구문을 쓰면 활성화된 것들 중 순서를 정확히 찾아냅니다.
</div>`}
        />
      </section>

      {/* 섹션 7: 실전 활용 - CSS만으로 구현하는 지능형 폼 레이아웃 */}
      <section className="study-section">
        <h2 className="section-title">실전 예제: 스마트 폼 레이아웃</h2>
        <div className="section-description">
          <p>
            <code>:has()</code>와 <code>:not()</code>을 조합하여 자바스크립트 없이도 입력 상태에 반응하는 인터랙티브 폼입니다.
          </p>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>📝 :invalid는 어떻게 설정하나요?</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '0.9rem', color: '#075985', lineHeight: '1.7' }}>
              <code>:invalid</code>는 <strong>HTML5 내장 폼 유효성 검사</strong>와 연동됩니다. HTML 속성으로 규칙을 정의하면 됩니다!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <code style={{ color: '#92400e' }}>required</code>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#78350f' }}>값이 비어있으면 invalid</p>
            </div>
            <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <code style={{ color: '#92400e' }}>type="email"</code>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#78350f' }}>이메일 형식 아니면 invalid</p>
            </div>
            <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <code style={{ color: '#92400e' }}>minlength="3"</code>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#78350f' }}>3글자 미만이면 invalid</p>
            </div>
            <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <code style={{ color: '#92400e' }}>pattern="..."</code>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#78350f' }}>정규식 불일치시 invalid</p>
            </div>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#d1fae5', borderRadius: '8px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>💡 팁: 빈 필드에서 빨간색 방지</strong>
            <pre style={{ marginTop: '0.5rem', marginBottom: 0, background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', overflow: 'auto' }}>
{`/* 값이 입력된 후에만 invalid 스타일 적용 */
input:invalid:not(:placeholder-shown) {
  border-color: red;
}`}
            </pre>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="modern-practical-form"
          previewHeight="450px"
          codeHeight="500px"
          initialCss={`.smart-form {
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.field-group {
  margin-bottom: 20px;
  padding: 15px;
  border: 2px solid #f1f5f9;
  border-radius: 10px;
  transition: 0.3s;
}

/* 1. 입력이 완료된(placeholder가 숨겨진) 그룹 강조 */
.field-group:has(input:not(:placeholder-shown)) {
  border-color: #6366f1;
  background: #f8faff;
}

/* 2. 유효하지 않은 입력이 있는 그룹 표시 */
.field-group:has(input:invalid:not(:placeholder-shown)) {
  border-color: #ef4444;
  background: #fef2f2;
}

.smart-form label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #475569;
}

.smart-form input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
}

/* 폼 전체 상태에 따른 버튼 제어 (실험적) */
.smart-form:has(input:invalid) button {
  opacity: 0.5;
  pointer-events: none;
}

button {
  width: 100%;
  padding: 12px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
`}
          initialHtml={`<form class="smart-form">
  <div class="field-group">
    <label>Email Address</label>
    <input type="email" placeholder="email@example.com" required>
  </div>

  <div class="field-group">
    <label>Username</label>
    <input type="text" placeholder="At least 3 characters" minlength="3" required>
  </div>

  <button type="submit">Complete Sign Up</button>
</form>

<p style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 선택자 조합의 힘:</strong><br/>
  • <code>:has(input:invalid)</code>를 통해 자식의 유효성 상태를 부모 레벨에서 감지할 수 있습니다.<br/>
  • 자바스크립트 도움 없이도 CSS만으로 폼 유효성 UI를 구현할 수 있게 되었습니다.
</p>`}
        />
      </section>
    </div>
  );
}

export default ModernSelectorsStudy;
