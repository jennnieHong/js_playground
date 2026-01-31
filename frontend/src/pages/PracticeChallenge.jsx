/**
 * PracticeChallenge.jsx
 * 지금까지 배운 모든 CSS 기술(BEM, Flexbox/Grid, Variables, Container Queries 등)을 활용한 종합 실습 챌린지 페이지
 */
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';

function PracticeChallenge() {
  return (
    <div className="page-container">
      <PageHeader
        title="Master Challenge"
        subtitle="지금까지 배운 모든 기술을 총동원하여 최고의 컴포넌트를 완성하세요!"
      />

      {/* 섹션 1: 모든 핵심 CSS 기법을 적용해 보는 종합 마스터 챌린지 */}
      <section className="study-section">
        <h2 className="section-title">최종 미션: 스마트 프로필 카드</h2>
        <div className="section-description">
          <p>
            아래의 요구사항을 충족하는 <strong>Smart Profile Card</strong>를 완성하는 것이 여러분의 마지막 미션입니다.
            단순히 모양을 맞추는 것을 넘어, 코드의 구조와 접근성, 반응형 대응까지 고려해야 합니다.
          </p>

          <div className="concept-box" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>📋 요구사항 체크리스트:</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>✅ <strong>Architecture</strong>: <code>card</code>, <code>card__header</code> 등 BEM 명명 규칙을 적용하세요.</li>
              <li>✅ <strong>Layout</strong>: 카드 내부 배치를 위해 Flexbox 또는 Grid를 활용하세요.</li>
              <li>✅ <strong>Variables</strong>: <code>--bg-color</code>, <code>--text-color</code> 등 변수를 정의하고 다크모드에 대응하세요.</li>
              <li>✅ <strong>Responsive</strong>: Media Query 대신 <strong>Container Queries</strong>를 사용하여 좁은 공간과 넓은 공간 모두에 대응하세요.</li>
              <li>✅ <strong>Animation</strong>: 카드에 마우스를 올릴 때 부드러운 <code>transition</code>이나 <code>animation</code>을 추가하세요.</li>
              <li>✅ <strong>Accessibility</strong>: 아이콘 버튼에 <code>sr-only</code>를 사용하여 스크린 리더 환경을 배려하세요.</li>
            </ul>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="master-challenge"
          previewHeight="500px"
          codeHeight="700px"
          initialCss={`/* 1. 프로젝트 변수 정의 (다크모드 대응 포함) */
:root {
  --card-bg: #ffffff;
  --text-main: #1e293b;
  --accent: #667eea;
}

@media (prefers-color-scheme: dark) {
  :root {
    --card-bg: #1e293b;
    --text-main: #f8fafc;
  }
}

/* 2. 컨테이너 정의 */
.profile-wrapper {
  container-type: inline-size;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* 3. BEM 기반 카드 스타일을 완성하세요! */
.card {
  background: var(--card-bg);
  color: var(--text-main);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
}

.card__header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card__avatar {
  width: 60px;
  height: 60px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
}

/* 4. 컨테이너 쿼리 활용 */
@container (min-width: 450px) {
  .card {
    flex-direction: row;
    align-items: center;
  }
  .card__avatar {
    width: 100px;
    height: 100px;
  }
}

/* 스크린 리더 전용 스타일 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}`}
          initialHtml={`<div class="profile-wrapper">
  <article class="card">
    <div class="card__header">
      <div class="card__avatar"></div>
      <div class="card__info">
        <h2 class="card__name">Jane Doe</h2>
        <p class="card__role">Senior CSS Architect</p>
      </div>
    </div>
    
    <div class="card__body">
      <p>BEM, Container Queries, 그리고 Accessibility를 공부하고 있습니다!</p>
    </div>
    
    <div class="card__actions">
      <button style="padding: 0.5rem 1rem; background: var(--accent); color: white; border: none; border-radius: 6px; cursor: pointer;">
        Follow
        <span class="sr-only">Jane Doe 팔로우하기</span>
      </button>
    </div>
  </article>
</div>

<div class="info-box" style="margin-top: 2rem; border-left: 4px solid var(--accent);">
  <strong>미션 종료 후:</strong><br/>
  이 예제를 바탕으로 본인만의 포트폴리오 카드 컴포넌트를 만들어보세요. <br/>
  CSS 애니메이션, 다크모드, 논리적 속성 등을 더 추가하여 완성도를 높일 수 있습니다.
</div>`}
        />
      </section>
    </div>
  );
}

export default PracticeChallenge;
