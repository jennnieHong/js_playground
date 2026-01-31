/**
 * HidingMethodsStudy.jsx
 * 요소를 숨기는 다양한 CSS 기법(display, visibility, opacity 등) 실습 페이지
 */
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';

function HidingMethodsStudy() {
  return (
    <div className="page-container">
      <PageHeader
        title="CSS Hiding Methods"
        subtitle="요소를 숨기는 다양한 기법과 그 차이점 이해하기"
      />

      {/* 섹션 1: 주요 숨기기 속성(display, visibility, opacity) 비교 */}
      <section className="study-section">
        <h2 className="section-title">대표적인 3가지 방법 비교</h2>
        <div className="section-description">
          <p>
            가장 많이 사용되는 세 가지 기술은 레이아웃에 미치는 영향과 사용자 인터랙션 가능 여부가 완전히 다릅니다.
          </p>
          <div className="table-container" style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem' }}>속성</th>
                  <th style={{ padding: '0.75rem' }}>공간 차지</th>
                  <th style={{ padding: '0.75rem' }}>클릭 가능</th>
                  <th style={{ padding: '0.75rem' }}>특징</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '0.75rem' }}><code>display: none</code></td>
                  <td style={{ padding: '0.75rem' }}>X</td>
                  <td style={{ padding: '0.75rem' }}>X</td>
                  <td style={{ padding: '0.75rem' }}>DOM에서는 존재하지만 렌더 트리에서 제거됨</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '0.75rem' }}><code>visibility: hidden</code></td>
                  <td style={{ padding: '0.75rem' }}>O</td>
                  <td style={{ padding: '0.75rem' }}>X</td>
                  <td style={{ padding: '0.75rem' }}>공간은 유지하되 모습만 감춤 (투명 인간)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={{ padding: '0.75rem' }}><code>opacity: 0</code></td>
                  <td style={{ padding: '0.75rem' }}>O</td>
                  <td style={{ padding: '0.75rem' }}>O</td>
                  <td style={{ padding: '0.75rem' }}>투명할 뿐, 모든 인터랙션과 접근성 유지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="hiding-comparison"
          previewHeight="450px"
          codeHeight="600px"
          initialCss={`.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  color: #484d52;
}

.item-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px dashed #cbd5e1;
  padding: 0.5rem;
}

.box {
  width: 100px;
  height: 50px;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: bold;
}

/* 아래 클래스들을 바꿔보며 테스트해보세요 */
.hidden-none { display: none; }
.hidden-vis { visibility: hidden; }
.hidden-op { opacity: 0; }

.target {
  background: #f5576c;
}

.sibling {
  background: #64748b;
}

.btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover { background: #f1f5f9; }`}
          initialHtml={`<div class="container">
  <p><strong>1. display: none (박스 1을 숨김)</strong></p>
  <div class="item-group">
    <div class="box target hidden-none">박스 1</div>
    <div class="box sibling">박스 2</div>
    <span>← 박스 1이 아예 사라져 박스 2가 당겨짐</span>
  </div>

  <p><strong>2. visibility: hidden (박스 3을 숨김)</strong></p>
  <div class="item-group">
    <div class="box target hidden-vis">박스 3</div>
    <div class="box sibling">박스 4</div>
    <span>← 박스 3은 안 보이지만 자리는 그대로임</span>
  </div>

  <p><strong>3. opacity: 0 (박스 5을 숨김)</strong></p>
  <div class="item-group">
    <div class="box target hidden-op" onclick="alert('클릭되었습니다!')">박스 5</div>
    <div class="box sibling">박스 6</div>
    <button class="btn" onclick="alert('버튼 클릭!')">버튼</button>
  </div>
</div>

<div class="info-box">
  💡 <strong>opacity: 0의 특징:</strong><br/>
  박스 5의 위치를 마우스로 클릭해보세요. 안 보이지만 <code>alert</code> 창이 뜹니다! 인터랙션이 여전히 살아있음을 알 수 있습니다.
</div>`}
        />
      </section>

      {/* 섹션 2: 웹 접근성을 고려한 시각적 숨기기 (sr-only) */}
      <section className="study-section">
        <h2 className="section-title">스크린 리더 전용 숨기기 (sr-only)</h2>
        <div className="section-description">
          <p>
            디자인상으로는 숨겨야 하지만, 시각 장애인을 위한 스크린 리더는 읽어야 하는 정보(예: 아이콘 버튼의 텍스트 설명)에 사용합니다.
          </p>
          <p className="highlight-box">
            ⚠️ <code>display: none</code>이나 <code>visibility: hidden</code>을 쓰면 스크린 리더도 읽지 못합니다!
          </p>
        </div>
        <LiveCodeEditor
          scopeId="sr-only-method"
          previewHeight="300px"
          codeHeight="450px"
          initialCss={`.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.icon-button {
  width: 44px;
  height: 44px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.icon-button:hover {
  background: #764ba2;
}`}
          initialHtml={`<button class="icon-button">
  <span>🔍</span>
  <span class="sr-only">검색하기</span>
</button>

<div class="info-box">
  <strong>이 버튼은 어떻게 보이나요?</strong><br/>
  돋보기 아이콘만 보이지만, 실제 스크린 리더는 "검색하기 버튼"이라고 정확히 읽어줍니다. 
  <code>.sr-only</code> 클래스는 요소를 아주 작게(1px) 만들고 화면 밖으로 밀어내어 시각적으로만 보이지 않게 합니다.
</div>`}
        />
      </section>

      {/* 섹션 3: 상황별 숨기기 기법 요약 및 활용 가이드 */}
      <section className="study-section">
        <h2 className="section-title">요약 및 추천 활용처</h2>
        <div className="section-description">
          <ul className="description-list">
            <li><strong>특정 레이아웃을 아예 제거할 때</strong>: <code>display: none</code> (가장 흔함)</li>
            <li><strong>요소의 크기를 유지하면서 빈 공간을 남길 때</strong>: <code>visibility: hidden</code></li>
            <li><strong>페이드 인/아웃 애니메이션을 만들 때</strong>: <code>opacity</code> (0 ↔ 1)</li>
            <li><strong>웹 접근성을 준수하며 숨길 때</strong>: <code>sr-only</code> 기법</li>
            <li><strong>단축키 적용 등 기능은 살려두어야 할 때</strong>: <code>opacity: 0</code> 또는 <code>position: absolute; left: -9999px;</code></li>
          </ul>
        </div>
      </section>
      {/* 섹션 4: 실전 예제 - 애니메이션이 가능한 숨기기 토글 구현 */}
      <section className="study-section">
        <h2 className="section-title">실전 예제: 애니메이션 토글 카드</h2>
        <p className="section-description">
          <code>display: none</code>은 애니메이션이 불가능합니다.
          부드러운 전환을 위해 <code>opacity</code>와 <code>visibility</code>를 조합하는 기법을 확인하세요.
        </p>

        <LiveCodeEditor
          scopeId="hiding-practical-toggle"
          previewHeight="400px"
          codeHeight="500px"
          initialCss={`.toggle-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.magic-box {
  width: 200px;
  height: 100px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  margin: 1.5rem auto;
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  
  /* 💡 핵심: 부드러운 숨기기 설정 */
  transition: all 0.5s ease;
}

/* 체크박스가 체크되지 않았을 때 (기본 상태) 숨김 */
/* ~ 물결: 일반 형제 선택자 (General Sibling Selector) 
   - input[id="toggle"] 이후에 등장하는 모든 형제 요소 중 .magic-box를 선택
   - + (인접 형제)와 달리 바로 다음이 아니어도 됨
   - 자세한 설명: /selectors-basics 페이지 참고 */
input[id="toggle"]:not(:checked) ~ .magic-box {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
}

.toggle-label {
  padding: 0.75rem 1.5rem;
  background: #1e293b;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}
`}
          initialHtml={`<div class="toggle-container">
  <input type="checkbox" id="toggle" style="display: none;" />
  <label for="toggle" class="toggle-label">상자 나타나기 / 숨기기</label>
  
  <div class="magic-box">
    I am Visible! ✨
  </div>
</div>

<div class="info-box" style="margin-top: 1.5rem;">
  <strong>💡 왜 display: none을 안 쓰나요?</strong><br/>
  <code>display: none</code>은 상태가 바뀌는 순간 물리적으로 사라지기 때문에 애니메이션(transition)이 작동하지 않습니다.<br/>
  <strong>opacity + visibility</strong> 조합은 시각적으로 부드럽게 사라지면서도, 숨겨진 후에는 클릭 등을 막을 수 있어 가장 선호되는 방식입니다.
</div>`}
        />
      </section>
    </div>
  );
}

export default HidingMethodsStudy;
