/**
 * CssArchitectureStudy.jsx
 * 대규모 프로젝트를 위한 CSS 아키텍처 및 설계 전략 실습 페이지
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';

function CssArchitectureStudy() {
  return (
    <div className="page-container">
      <PageHeader
        title="CSS Architecture"
        subtitle="대규모 프로젝트를 위한 체계적인 스타일 관리 전략"
      />

      {/* 섹션 1: CSS 아키텍처의 필요성과 유지보수성 */}
      <section className="study-section">
        <h2 className="section-title">왜 아키텍처가 중요한가요?</h2>
        <div className="section-description">
          <p>
            혼자 만드는 작은 프로젝트에서는 CSS가 500줄을 넘지 않지만, 카카오나 네이버 같은 대형 서비스는 수만 줄의 CSS를 관리합니다.
            아키텍처가 없으면 다음과 같은 <strong>"CSS의 지옥"</strong>에 빠지게 됩니다.
          </p>
          <ul className="description-list">
            <li><strong>명시도 전쟁</strong>: <code>!important</code>가 남발되어 유지보수 불가능</li>
            <li><strong>클래스 이름 충돌</strong>: <code>.button</code>이 여기저기서 다른 모양으로 정의됨</li>
            <li><strong>코드 비대화</strong>: 사용하지 않는 코드를 무서워서 지우지 못하고 계속 쌓임</li>
          </ul>
        </div>
      </section>

      {/* 섹션 2: BEM (Block, Element, Modifier) 방법론 */}
      <section className="study-section">
        <h2 className="section-title">BEM: 직관적인 명명 규칙</h2>
        <div className="section-description">
          <p>
            BEM(Block, Element, Modifier)은 클래스 이름만 보고도 <strong>구조와 역할</strong>을 알 수 있게 해줍니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>📦 Block (블록)</h4>
              <p style={{ fontSize: '0.9rem', color: '#0e7490', marginBottom: '0.5rem' }}>
                <strong>독립적인 컴포넌트 단위</strong><br/>
                재사용 가능, 단독으로 의미가 있음
              </p>
              <code style={{ display: 'block', padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                .card, .button, .nav, .header, .footer, .sidebar, .login-form, .search-bar, .profile-card
              </code>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h4 style={{ marginTop: 0, color: '#b45309' }}>🧩 Element (요소)</h4>
              <p style={{ fontSize: '0.9rem', color: '#92400e', marginBottom: '0.5rem' }}>
                <strong>블록의 일부분</strong><br/>
                블록 없이는 의미가 없음<br/>
                형식: block__element (언더스코어 2개)
              </p>
              <code style={{ display: 'block', padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                .card__title, .card__image, .header__logo, .header__nav, .header__search-bar, .footer__logo, .footer__nav, .footer__search-bar, .login-form__title, .login-form__input, .login-form__button, .search-bar__input, .search-bar__button, .profile-card__avatar, .profile-card__name, .profile-card__bio
              </code>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#059669' }}>🎨 Modifier (수정자)</h4>
              <p style={{ fontSize: '0.9rem', color: '#047857', marginBottom: '0.5rem' }}>
                <strong>블록/요소의 변형 또는 상태</strong><br/>
                크기, 색상, 활성화 상태 등<br/>
                형식: block--modifier 또는 block__element--modifier (하이픈 2개)
              </p>
              <code style={{ display: 'block', padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                .button--primary, .nav__item--active, .card--featured, .card--small, .card--large, .header--fixed, .header--sticky, .footer--fixed, .footer--sticky, .login-form--large, .login-form--small, .search-bar--large, .search-bar--small, .profile-card--featured, .profile-card--small, .profile-card--large
              </code>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>🔑 명명 규칙</strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
              <div>
                <code style={{ color: '#0369a1' }}>__</code> (언더스코어 2개)
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#075985' }}>
                  Block과 Element 연결<br/>
                  예: <code>.card__title</code>
                </p>
              </div>
              <div>
                <code style={{ color: '#0369a1' }}>--</code> (하이픈 2개)
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#075985' }}>
                  Modifier 연결<br/>
                  예: <code>.button--large</code>
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca' }}>
            <strong style={{ color: '#b91c1c' }}>⚠️ 주의사항 (자주 하는 실수)</strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <code style={{ color: '#991b1b' }}>❌ .card__content__title</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#991b1b' }}>
                  Element 중첩 금지!<br/>
                  ✅ <code>.card__title</code> 사용
                </p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <code style={{ color: '#991b1b' }}>❌ .card_title</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#991b1b' }}>
                  언더스코어 1개!<br/>
                  ✅ <code>.card__title</code> (2개)
                </p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <code style={{ color: '#991b1b' }}>❌ .card-title</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#991b1b' }}>
                  Element에 하이픈 사용!<br/>
                  ✅ <code>.card__title</code> (__)
                </p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <code style={{ color: '#991b1b' }}>❌ .card--big--red</code>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#991b1b' }}>
                  Modifier 연속 사용!<br/>
                  ✅ <code>.card--big.card--red</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="bem-example"
          previewHeight="400px"
          codeHeight="600px"
          initialCss={`/* Block: 독립적인 컴포넌트 */
  .card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* Element: 블록의 일부 */
.card__header {
  padding: 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.card__title {
  /* Element */
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
}

.card__body {
  /* Element */
  padding: 1.5rem;
}

/* Modifier: 스타일 변형 */
.card--featured {
  border: 2px solid #667eea;
}

.card--featured .card__title {
  color: #667eea;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn--primary {
  background: #667eea;
  color: white;
}`}
          initialHtml={`<div class="card card--featured">
  <div class="card__header">
    <h3 class="card__title">추천 코스 (Featured Card)</h3>
  </div>
  <div class="card__body">
    <p>BEM을 사용하면 클래스 이름이 길어지지만, 중복 위험이 거의 없습니다.</p>
    <button class="btn btn--primary">자세히 보기</button>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #475569;">
  <strong>💡 BEM의 장점:</strong><br/>
  • 클래스 이름만 보고 구조를 파악할 수 있음<br/>
  • 명시도가 평탄하게 유지됨 (클래스 1개 = 0,0,1,0)<br/>
  • 팀원 간 명명 규칙 통일
</div>`}
        />
      </section>

      {/* 섹션 2.5: 네스팅 최소화 */}
      <section className="study-section">
        <h2 className="section-title">네스팅 최소화: 선택자 깊이 줄이기</h2>
        <div className="section-description">
          <p>
            선택자 체이닝(네스팅)이 깊어지면 <strong>명시도가 높아지고</strong>, HTML 구조에 의존하게 되어 유지보수가 어려워집니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>❌ 깊은 네스팅 (피해야 함)</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', overflow: 'auto' }}>
{`.header .nav .nav-list .nav-item .nav-link:hover {
  color: blue;
}
/* 명시도: (0, 0, 5, 0) - 너무 높음! */`}
              </pre>
              <ul style={{ marginTop: '0.75rem', marginBottom: 0, color: '#991b1b', fontSize: '0.85rem', lineHeight: '1.6' }}>
                <li>덮어쓰기 어려움</li>
                <li>HTML 구조에 강하게 의존</li>
                <li>재사용 불가능</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#065f46' }}>✅ 네스팅 최소화 (권장)</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', overflow: 'auto' }}>
{`.nav-link:hover {
  color: blue;
}
/* 명시도: (0, 0, 2, 0) - 적절함 */`}
              </pre>
              <ul style={{ marginTop: '0.75rem', marginBottom: 0, color: '#047857', fontSize: '0.85rem', lineHeight: '1.6' }}>
                <li>쉽게 덮어쓰기 가능</li>
                <li>HTML 구조와 독립적</li>
                <li>어디서든 재사용 가능</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>📏 권장 규칙: 선택자 깊이 3단계 이하!</strong>
            <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
              <code style={{ padding: '0.5rem', background: '#d1fae5', borderRadius: '4px', color: '#065f46', fontSize: '0.85rem' }}>✅ .card {'{ }'} — 1단계</code>
              <code style={{ padding: '0.5rem', background: '#d1fae5', borderRadius: '4px', color: '#065f46', fontSize: '0.85rem' }}>✅ .card .card__title {'{ }'} — 2단계</code>
              <code style={{ padding: '0.5rem', background: '#fef3c7', borderRadius: '4px', color: '#92400e', fontSize: '0.85rem' }}>⚠️ .header .nav .item {'{ }'} — 3단계</code>
              <code style={{ padding: '0.5rem', background: '#fef2f2', borderRadius: '4px', color: '#991b1b', fontSize: '0.85rem' }}>❌ .page .main .content .article .title {'{ }'}</code>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>💡 BEM이 네스팅을 줄여주는 이유</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7', fontSize: '0.9rem' }}>
              BEM은 각 요소를 <strong>독립적인 클래스</strong>로 정의하므로, 네스팅이 필요 없어집니다!
            </p>
            <pre style={{ marginTop: '0.75rem', background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', overflow: 'auto' }}>
{`/* 네스팅 없이 플랫하게! */
.card { }
.card__title { }
.card__body { }
.card--featured { }

/* ❌ 이렇게 할 필요 없음 */
.card .card__title { }`}
            </pre>
          </div>
        </div>
      </section>

      <section className="study-section">
        <h2 className="section-title">SMACSS: 스타일의 5가지 범주</h2>
        <div className="section-description">
          <p>
            <strong>SMACSS(Scalable and Modular Architecture for CSS)</strong>는 Jonathan Snook이 만든 CSS 방법론입니다.
            스타일을 <strong>역할과 목적에 따라 5개의 범주(Category)</strong>로 분류하여 관리합니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#1e293b' }}>1️⃣ Base (기본)</h4>
              <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '0.5rem' }}>
                브라우저 기본 스타일 초기화, 태그 선택자만 사용
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: 0 }}>
{`html, body { margin: 0; }
a { color: inherit; }
h1, h2, h3 { font-weight: 600; }`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '12px', border: '2px solid #3b82f6' }}>
              <h4 style={{ marginTop: 0, color: '#1e40af' }}>2️⃣ Layout (레이아웃)</h4>
              <p style={{ fontSize: '0.9rem', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                페이지 구조, 그리드 시스템. 접두사 <code>l-</code> 사용 권장
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: 0 }}>
{`.l-header { }
.l-sidebar { width: 250px; }
.l-main { flex: 1; }
.l-grid-2col { display: grid; }`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#ecfdf5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#065f46' }}>3️⃣ Module (모듈)</h4>
              <p style={{ fontSize: '0.9rem', color: '#047857', marginBottom: '0.5rem' }}>
                재사용 가능한 UI 컴포넌트 (BEM의 Block과 유사)
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: 0 }}>
{`.card { }
.card-header { }
.card-body { }
.btn { }
.modal { }`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h4 style={{ marginTop: 0, color: '#b45309' }}>4️⃣ State (상태)</h4>
              <p style={{ fontSize: '0.9rem', color: '#92400e', marginBottom: '0.5rem' }}>
                JavaScript로 토글되는 상태. 접두사 <code>is-</code> 또는 <code>has-</code> 사용
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: 0 }}>
{`.is-active { }
.is-hidden { display: none; }
.is-loading { opacity: 0.5; }
.has-error { border-color: red; }`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#fce7f3', borderRadius: '12px', border: '2px solid #ec4899' }}>
              <h4 style={{ marginTop: 0, color: '#be185d' }}>5️⃣ Theme (테마)</h4>
              <p style={{ fontSize: '0.9rem', color: '#9d174d', marginBottom: '0.5rem' }}>
                다크 모드, 시즌별 테마 등 시각적 오버라이드
              </p>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', margin: 0 }}>
{`.theme-dark { 
  --bg: #1e293b;
  --text: #f8fafc;
}
.theme-christmas { }
.theme-summer { }`}
              </pre>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>📂 SMACSS 파일 구조 예시</strong>
            <pre style={{ marginTop: '0.75rem', background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', overflow: 'auto' }}>
{`styles/
├── base/
│   ├── _reset.css
│   └── _typography.css
├── layout/
│   ├── _header.css
│   ├── _sidebar.css
│   └── _grid.css
├── module/
│   ├── _card.css
│   ├── _button.css
│   └── _modal.css
├── state/
│   └── _states.css
├── theme/
│   ├── _dark.css
│   └── _light.css
└── main.css  ← 모든 파일 import`}
            </pre>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>🔄 BEM vs SMACSS</strong>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <strong style={{ color: '#78350f' }}>BEM</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#78350f' }}>
                  클래스 명명 규칙에 집중<br/>
                  <code>.block__element--modifier</code>
                </p>
              </div>
              <div style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.5)', borderRadius: '6px' }}>
                <strong style={{ color: '#78350f' }}>SMACSS</strong>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#78350f' }}>
                  스타일 분류 & 파일 구조에 집중<br/>
                  Base, Layout, Module, State, Theme
                </p>
              </div>
            </div>
            <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.9rem', color: '#78350f' }}>
              💡 실무에서는 <strong>BEM + SMACSS를 함께 사용</strong>하는 경우가 많습니다!
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 4: ITCSS (Inverted Triangle CSS)와 명시도 관리 */}
      <section className="study-section">
        <h2 className="section-title">ITCSS: 명시도 관리의 끝판왕</h2>
        <div className="section-description">
          <p>
            <strong>ITCSS(Inverted Triangle CSS)</strong>는 Harry Roberts가 만든 CSS 아키텍처입니다.
            핵심 아이디어는 <strong>명시도가 낮은 스타일부터 높은 스타일 순서로</strong> 코드를 배치하여 충돌을 방지하는 것입니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)', borderRadius: '12px' }}>
            <h4 style={{ marginTop: 0, textAlign: 'center', color: '#1e293b' }}>🔺 역삼각형 구조 (위 = 넓음, 아래 = 좁음)</h4>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ margin: '0.5rem auto', padding: '0.75rem', background: '#e2e8f0', width: '95%', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>1. Settings</strong></span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>변수, 설정값 (명시도 0)</span>
              </div>
              <div style={{ margin: '0.5rem auto', padding: '0.75rem', background: '#cbd5e1', width: '85%', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>2. Tools</strong></span>
                <span style={{ fontSize: '0.8rem', color: '#475569' }}>Mixins, 함수 (명시도 0)</span>
              </div>
              <div style={{ margin: '0.5rem auto', padding: '0.75rem', background: '#94a3b8', width: '75%', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span><strong>3. Generic</strong></span>
                <span style={{ fontSize: '0.8rem', color: '#1e293b' }}>Reset, Normalize (태그)</span>
              </div>
              <div style={{ margin: '0.5rem auto', padding: '0.75rem', background: '#64748b', width: '65%', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                <span><strong>4. Elements</strong></span>
                <span style={{ fontSize: '0.8rem' }}>순수 태그 스타일링</span>
              </div>
              <div style={{ margin: '0.5rem auto', padding: '0.75rem', background: '#475569', width: '55%', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                <span><strong>5. Objects</strong></span>
                <span style={{ fontSize: '0.8rem' }}>레이아웃 패턴 (클래스)</span>
              </div>
              <div style={{ margin: '0.5rem auto', padding: '0.75rem', background: '#334155', width: '45%', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                <span><strong>6. Components</strong></span>
                <span style={{ fontSize: '0.8rem' }}>UI 컴포넌트 (클래스)</span>
              </div>
              <div style={{ margin: '0.5rem auto', padding: '0.75rem', background: '#1e293b', width: '35%', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
                <span><strong>7. Trumps</strong></span>
                <span style={{ fontSize: '0.8rem' }}>!important 오버라이드</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ marginTop: 0, color: '#64748b' }}>1. Settings</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', margin: 0 }}>
{`:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
}`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ marginTop: 0, color: '#64748b' }}>2. Tools</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', margin: 0 }}>
{`/* Sass Mixins 등 */
@mixin flex-center {
  display: flex;
  align-items: center;
}`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ marginTop: 0, color: '#64748b' }}>3. Generic</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', margin: 0 }}>
{`*, *::before, *::after {
  box-sizing: border-box;
}
body { margin: 0; }`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ marginTop: 0, color: '#64748b' }}>4. Elements</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', margin: 0 }}>
{`a { color: var(--color-primary); }
h1 { font-size: 2rem; }
img { max-width: 100%; }`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ marginTop: 0, color: '#64748b' }}>5. Objects</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', margin: 0 }}>
{`.o-container { max-width: 1200px; }
.o-grid { display: grid; }
.o-media { display: flex; }`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h5 style={{ marginTop: 0, color: '#64748b' }}>6. Components</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', margin: 0 }}>
{`.c-card { }
.c-button { }
.c-modal { }
.c-nav { }`}
              </pre>
            </div>

            <div style={{ padding: '1rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
              <h5 style={{ marginTop: 0, color: '#b91c1c' }}>7. Trumps ⚠️</h5>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '0.5rem', borderRadius: '4px', fontSize: '0.75rem', margin: 0 }}>
{`/* 최후의 수단! */
.u-hidden { display: none !important; }
.u-text-center { text-align: center !important; }`}
              </pre>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>📂 ITCSS 파일 구조 예시</strong>
            <pre style={{ marginTop: '0.75rem', background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', overflow: 'auto' }}>
{`styles/
├── 1-settings/
│   └── _variables.css
├── 2-tools/
│   └── _mixins.css
├── 3-generic/
│   └── _reset.css
├── 4-elements/
│   └── _typography.css
├── 5-objects/
│   └── _layout.css
├── 6-components/
│   ├── _card.css
│   └── _button.css
├── 7-trumps/
│   └── _utilities.css
└── main.css  ← 순서대로 import`}
            </pre>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#d1fae5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>💡 ITCSS의 핵심 장점</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#047857', lineHeight: '1.8', fontSize: '0.9rem' }}>
              <li><strong>명시도 전쟁 방지:</strong> 위에서 아래로 갈수록 명시도가 높아지므로, 순서대로 import하면 충돌이 거의 없음</li>
              <li><strong>코드 삭제 안전:</strong> 각 레이어가 명확해서 사용하지 않는 코드를 파악하고 삭제하기 쉬움</li>
              <li><strong>팀 협업 용이:</strong> 새 스타일을 어디에 추가해야 할지 명확함</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 섹션 5: 유틸리티 우선(Utility-First) 접근 방식 */}
      <section className="study-section">
        <h2 className="section-title">현대적인 구조: Utility-First</h2>
        <div className="section-description">
          <p>
            <strong>Utility-First</strong>는 BEM처럼 의미 있는 클래스 이름을 짓는 대신,
            <strong>미리 정의된 작은 유틸리티 클래스들을 조합</strong>하여 스타일링하는 방식입니다.
            <strong>Tailwind CSS</strong>가 대표적인 프레임워크입니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>❌ 기존 방식 (BEM)</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', overflow: 'auto' }}>
{`/* CSS 파일 */
.card {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background: #3b82f6;
  color: white;
  border-radius: 0.75rem;
}

/* HTML */
<div class="card">...</div>`}
              </pre>
              <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem', color: '#991b1b' }}>
                매번 새 클래스를 만들고 이름을 지어야 함
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#065f46' }}>✅ Utility-First</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', overflow: 'auto' }}>
{`/* 미리 정의된 유틸리티들 */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.p-8 { padding: 2rem; }
.bg-blue-500 { background: #3b82f6; }
.text-white { color: white; }
.rounded-xl { border-radius: 0.75rem; }

/* HTML - 조합만 하면 됨! */
<div class="flex flex-col p-8 bg-blue-500 
            text-white rounded-xl">...</div>`}
              </pre>
              <p style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem', color: '#047857' }}>
                이름 짓기 고민 없이 조합만!
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#065f46' }}>✅ 장점</h4>
              <ul style={{ marginBottom: 0, color: '#047857', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li><strong>빠른 개발 속도:</strong> CSS 파일 편집 없이 HTML만 수정</li>
                <li><strong>이름 짓기 고민 X:</strong> <code>.card-wrapper-inner</code> 같은 이름 불필요</li>
                <li><strong>일관성:</strong> 모든 스타일이 정해진 값 사용</li>
                <li><strong>사용하지 않는 CSS 자동 제거:</strong> PurgeCSS로 최적화</li>
                <li><strong>반응형 쉬움:</strong> <code>md:flex lg:grid</code></li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>⚠️ 단점</h4>
              <ul style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li><strong>HTML이 지저분해짐:</strong> 클래스가 매우 많아짐</li>
                <li><strong>학습 비용:</strong> Tailwind 클래스 이름 암기 필요</li>
                <li><strong>의미 파악 어려움:</strong> 클래스만 보고 역할 파악 힘듦</li>
                <li><strong>디자인 시스템 필요:</strong> 무분별한 값 사용 방지 위해</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>🎯 Tailwind CSS 주요 클래스 패턴</strong>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '0.75rem' }}>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>p-4, px-6, py-2 (패딩)</code>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>m-4, mx-auto (마진)</code>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>flex, grid, block</code>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>text-lg, font-bold</code>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>bg-blue-500, text-white</code>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>rounded-lg, shadow-md</code>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>w-full, h-screen</code>
              <code style={{ padding: '0.5rem', background: '#0f172a', color: '#e2e8f0', borderRadius: '4px', fontSize: '0.8rem' }}>hover:bg-blue-600</code>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>💡 BEM + Utility 하이브리드 접근</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7', fontSize: '0.9rem' }}>
              실무에서는 <strong>컴포넌트는 BEM으로, 레이아웃/간격은 유틸리티로</strong> 혼합하는 경우가 많습니다.
            </p>
            <pre style={{ marginTop: '0.75rem', background: '#0f172a', color: '#e2e8f0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem', overflow: 'auto' }}>
{`<div class="card flex flex-col gap-4 p-6">
  <h3 class="card__title text-lg font-bold">제목</h3>
  <p class="card__body text-gray-600">내용</p>
  <button class="btn btn--primary mt-auto">버튼</button>
</div>`}
            </pre>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="utility-first"
          previewHeight="350px"
          codeHeight="400px"
          initialCss={`/* 유틸리티 클래스 정의 */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.gap-4 { gap: 1rem; }

/* 간격 */
.p-4 { padding: 1rem; }
.p-8 { padding: 2rem; }
.m-0 { margin: 0; }

/* 색상 */
.bg-blue-600 { background: #2563eb; }
.bg-green-500 { background: #22c55e; }
.text-white { color: white; }
.text-gray-600 { color: #4b5563; }

/* 모양 */
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 9999px; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

/* 타이포그래피 */
.font-bold { font-weight: 700; }
.text-lg { font-size: 1.125rem; }
.text-sm { font-size: 0.875rem; }`}
          initialHtml={`<div class="flex flex-col items-center p-8 bg-blue-600 text-white rounded-xl shadow-lg gap-4">
  <h4 class="font-bold text-lg m-0">Utility-First Style</h4>
  <p class="m-0 text-sm">클래스 조합만으로 스타일링!</p>
  <button class="bg-green-500 text-white p-4 rounded-full font-bold">
    버튼도 유틸리티만으로!
  </button>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #475569; line-height: 1.7;">
  <strong>💡 관찰해보세요:</strong><br/>
  CSS에서 클래스를 정의하고, HTML에서 조합만 하면 됩니다.<br/>
  새 스타일이 필요하면? 기존 유틸리티 클래스를 조합하면 끝!
</div>`}
        />
      </section>

      {/* 섹션 6: Sass 7-1 패턴을 활용한 폴더 구조화 */}
      <section className="study-section">
        <h2 className="section-title">실전 관리: 7-1 폴더 패턴</h2>
        <div className="section-description">
          <p>
            Sass나 규모가 큰 CSS 프로젝트에서 가장 많이 쓰이는 폴더 구조화 표준입니다.
            모든 스타일을 한 파일에 넣지 않고, 역할별로 7개의 폴더에 나누어 담습니다.
          </p>
          <div className="concept-box" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>📂 <strong>base/</strong>: 초기화, 타이포그래피 태그</li>
              <li>📂 <strong>components/</strong>: 독립적인 컴포넌트(button, card)</li>
              <li>📂 <strong>layout/</strong>: 헤더, 푸터, 그리드</li>
              <li>📂 <strong>pages/</strong>: 특정 페이지 전용 스타일</li>
              <li>📂 <strong>themes/</strong>: 테마별 설정</li>
              <li>📂 <strong>abstracts/</strong>: 변수, 믹스인 (실제 코드는 생성 안 함)</li>
              <li>📂 <strong>vendors/</strong>: 외부 라이브러리 (Bootstrap 등)</li>
              <li style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                📄 <strong>main.css</strong>: 위 파일들을 하나로 합치는 메인 파일
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 섹션 7: 종합 실습 - BEM 기반 사이드바 컴포넌트 설계 */}
      <section className="study-section">
        <h2 className="section-title">실전 예제: BEM 기반 네비게이션 대시보드</h2>
        <p className="section-description">
          BEM 명명 규칙을 철저히 따라 구조와 기능이 명확히 분리된 컴포넌트 설계 방식입니다.
        </p>

        <LiveCodeEditor
          scopeId="architecture-practical-bem"
          previewHeight="450px"
          codeHeight="550px"
          initialCss={`.sidebar {
  /* Block */
  width: 250px;
  background: #1e293b;
  color: white;
  border-radius: 12px;
  padding: 1.5rem;
}

.sidebar__item {
  /* Element */
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.sidebar__item:hover {
  background: rgba(255,255,255,0.1);
}

.sidebar__item--active {
  /* Modifier */
  background: #3b82f6;
  font-weight: bold;
}

.sidebar__icon {
  /* Element */
  margin-right: 12px;
  font-size: 1.2rem;
}

.sidebar__status {
  /* Element */
  margin-left: auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
}

.sidebar__status--online {
  /* Modifier */
  background: #10b981;
  box-shadow: 0 0 10px rgba(16,185,129,0.5);
}
`}
          initialHtml={`<div class="sidebar">
  <div class="sidebar__item sidebar__item--active">
    <span class="sidebar__icon">📊</span>
    <span class="sidebar__text">Dashboard</span>
    <span class="sidebar__status sidebar__status--online"></span>
  </div>
  
  <div class="sidebar__item">
    <span class="sidebar__icon">📁</span>
    <span class="sidebar__text">Projects</span>
    <span class="sidebar__status"></span>
  </div>

  <div class="sidebar__item">
    <span class="sidebar__icon">⚙️</span>
    <span class="sidebar__text">Settings</span>
    <span class="sidebar__status"></span>
  </div>
</div>

<div class="info-box" style="margin-top: 1.5rem;">
  <strong>💡 BEM 구조 분석:</strong><br/>
  • <strong>Block</strong>: <code>.sidebar</code> (전체 틀)<br/>
  • <strong>Element</strong>: <code>.sidebar__item</code>, <code>.sidebar__icon</code><br/>
  • <strong>Modifier</strong>: <code>.sidebar__item--active</code>, <code>.sidebar__status--online</code>
</div>`}
        />
      </section>
    </div>
  );
}

export default CssArchitectureStudy;
