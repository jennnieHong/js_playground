import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsDomManipulationStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">DOM Inspector</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과를 확인하세요.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="8. DOM 조작 (DOM Manipulation)"
        subtitle="HTML과 JS의 연결고리: 자바스크립트로 HTML 요소를 찾고, 내용을 바꾸고, 스타일을 변경하는 법을 마스터합니다."
      />

      <CollapsibleSection title="1. 요소 선택하기 (Selection)" initiallyOpen={true}>
        <div className="concepts">
          <p>HTML 요소를 자바스크립트로 제어하려면 먼저 해당 요소를 찾아야 합니다.</p>
          <ul>
            <li><code>getElementById</code>: ID로 하나만 선택 (가장 빠름)</li>
            <li><code>querySelector</code>: CSS 선택자로 하나 선택 (강력함)</li>
            <li><code>querySelectorAll</code>: CSS 선택자로 모든 요소 선택 (유사 배열 반환)</li>
          </ul>

          <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <strong>🎯 복합 선택자 (Complex Selectors) 활용</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
              <code>querySelector</code>는 CSS와 동일한 구문을 지원합니다.<br />
              - <code>#parent .child</code> : 부모 내부의 자손 선택 (Descendant)<br />
              - <code>#parent {" > "} .child</code> : 부모의 직계 자식만 선택 (Child)<br />
              - <code>.box.active</code> : 두 클래스를 모두 가진 요소 선택
            </p>
          </div>

          <div className="info-box" style={{ background: '#f0f9ff', border: '1px solid #bae6fd', marginTop: '10px' }}>
            <strong style={{ color: '#0369a1' }}>🛡️ 범위 제한 선택 (Scoped Selection)</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#0369a1', lineHeight: '1.6' }}>
              여러 개의 컴포넌트나 섹션이 한 페이지에 있을 때, 단순히 <code>#btn</code>이라고만 적으면
              다른 곳의 버튼과 섞일 수 있습니다. <strong>#섹션ID #버튼ID</strong> 처럼 부모 ID를 포함하는 습관을 들이면
              이런 충돌을 완벽히 방지할 수 있습니다!
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-dom-selection"
          initialHtml={`<div id="section-a" class="section">
  <h3>Section A</h3>
  <div class="box">Target BOX</div>
</div>
<div id="section-b" class="section">
  <h3>Section B</h3>
  <div class="box">Other BOX</div>
</div>

<style>
.section { padding: 15px; border: 2px solid #ddd; margin-bottom: 15px; border-radius: 8px; }
.box { padding: 10px; border: 1px solid #3b82f6; background: #eff6ff; }
.highlight { background: #fbbf24; border-color: #f59e0b; color: black; font-weight: bold; }
</style>` + consoleHtml}
          initialJs={`// 1. 단순 선택 (페이지의 첫 번째 .box만 선택됨)
const firstBox = document.querySelector('.box');
log("Basic Selection: " + firstBox.innerText);

// 2. 복합/범위 제한 선택 (Section A 안에 있는 .box만 정확히 집어서 강조)
// #공간ID #요소ID(또는 클래스) 패턴을 써보세요.
const specificBox = document.querySelector('#section-a .box');
specificBox.classList.add('highlight');
log("Scoped Selection applied to Section A Box!");

// 3. 자식 선택자 (>) 활용 예시
const sectionA_Title = document.querySelector('#section-a > h3');
log("Direct Child Title: " + sectionA_Title.innerText);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 내용과 속성 변경 (Content & Attributes)">
        <div className="concepts">
          <p>요소의 텍스트를 바꾸거나 HTML을 삽입하여 화면을 갱신합니다.</p>
          <ul>
            <li><code>textContent</code>: 순수 텍스트만 처리. <strong>보안상 가장 안전함.</strong></li>
            <li><code>innerHTML</code>: HTML 태그를 해석하여 렌더링. <strong>XSS 공격 위험이 있음.</strong></li>
          </ul>

          <div className="info-box" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <strong style={{ color: '#991b1b' }}>⚠️ 보안 경고: innerHTML과 XSS</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#991b1b', lineHeight: '1.6' }}>
              사용자가 입력한 데이터를 <code>innerHTML</code>로 바로 넣으면 악성 스크립트가 실행될 수 있습니다(XSS 공격).
              <strong>사용자 입력값은 반드시 <code>textContent</code>로 처리하세요!</strong>
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-dom-content"
          initialHtml={`<div id="content-container">
  <div style="margin-bottom: 15px;">
    <input type="text" id="user-input" placeholder="<strong>안녕</strong> 입력해보기" style="padding: 6px; width: 220px;">
    <button id="btn-unsafe" style="color: #ef4444; font-weight: bold; cursor: pointer;">Unsafe (innerHTML)</button>
    <button id="btn-safe" style="color: #22c55e; font-weight: bold; cursor: pointer;">Safe (textContent)</button>
  </div>
  <div id="display-area" style="padding: 15px; border: 2px dashed #e2e8f0; min-height: 50px; border-radius: 8px;">
    결과가 여기에 표시됩니다.
  </div>
</div>` + consoleHtml}
          initialJs={`const input = document.querySelector('#js-dom-content #user-input');
const display = document.querySelector('#js-dom-content #display-area');

// 1. 위험한 방식 (innerHTML) - 태그가 그대로 실행됨
document.querySelector('#js-dom-content #btn-unsafe').onclick = () => {
  display.innerHTML = input.value;
  log("innerHTML로 적용: " + input.value);
  log("⚠️ HTML 태그가 작동합니다 (보안 취약점 발생 가능)");
};

// 2. 안전한 방식 (textContent) - 모든 데이터를 글자로만 취급
document.querySelector('#js-dom-content #btn-safe').onclick = () => {
  display.textContent = input.value;
  log("textContent로 적용: " + input.value);
  log("✅ 태그도 순수 글자로 처리되어 안전합니다.");
};`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 스타일링 조작 (CSS in JS)">
        <div className="concepts">
          <p>자바스크립트로 스타일을 바꾸는 방법은 크게 두 가지입니다.</p>
          <ul>
            <li><strong>.style (인라인 방식):</strong> 특정 속성을 직접 변경. 세밀한 수치 조절(예: 랜덤 색상)에 적합.</li>
            <li><strong>.classList (클래스 방식):</strong> CSS에 미리 정의된 클래스를 넣다 뺐다(Toggle) 함. 디자인 변경 시 권장되는 방식.</li>
          </ul>

          <div className="info-box" style={{ background: '#ecfeff', border: '1px solid #06b6d4' }}>
            <strong>🔢 Math.random() * 256 의 의미</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#0891b2' }}>
              <code>Math.random()</code>은 <strong>0 이상 1 미만</strong>의 소수를 반환합니다.
              여기에 256을 곱하면 <strong>0 ~ 255.999...</strong> 사이의 숫자가 나오며,
              <code>Math.floor()</code>로 내림하면 정확히 <strong>0부터 255까지의 정수</strong>를 얻을 수 있습니다. (RGB 색상 코드 범위와 일치!)
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-dom-style"
          initialHtml={`<div id="paint-box" class="base-box"></div>
<div class="controls">
  <button id="btn-color">랜덤 색상 (Direct)</button>
  <button id="btn-class">Shape Toggle (Class)</button>
</div>

<style>
.base-box {
  width: 100px; height: 100px; background: skyblue; 
  transition: all 0.5s ease; margin: 10px;
}
.is-circle { border-radius: 50%; transform: rotate(180deg) scale(0.8); }
.controls { display: flex; gap: 10px; margin-top: 15px; }
button { padding: 8px 12px; cursor: pointer; border: 1px solid #ccc; background: #fff; border-radius: 4px; font-size: 0.85rem; }
</style>` + consoleHtml}
          initialJs={`const box = document.querySelector('#js-dom-style #paint-box');
const btnColor = document.querySelector('#js-dom-style #btn-color');
const btnClass = document.querySelector('#js-dom-style #btn-class');

// 1. .style 을 사용한 직접 조작 (수치가 매번 바뀔 때 유용)
btnColor.onclick = () => {
  const r = Math.floor(Math.random() * 256); // 0~255
  const g = Math.floor(Math.random() * 256); // 0~255
  const b = Math.floor(Math.random() * 256); // 0~255
  
  const randomColor = \`rgb(\${r}, \${g}, \${b})\`;
  box.style.backgroundColor = randomColor;
  log("Direct CSS applied: " + randomColor);
};

// 2. .classList 를 사용한 간접 조작 (디자인 미리 정의 시 권장)
btnClass.onclick = () => {
  box.classList.toggle('is-circle');
  const hasCircle = box.classList.contains('is-circle');
  log("Class toggled: " + (hasCircle ? "Circle ON" : "Circle OFF"));
};`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. 여러 요소 스타일 한꺼번에 바꾸기 (NodeList & querySelectorAll)">
        <div className="concepts">
          <p><code>querySelectorAll</code>을 사용하면 여러 개의 요소를 담은 <strong>NodeList</strong>가 반환됩니다.</p>
          <p>중요한 점은, 이 NodeList는 배열과 비슷하게 생겼지만 <strong>개별 요소들의 집합체</strong>일 뿐이라는 것입니다. 따라서 <code>all.style.color = "red"</code>처럼 직접 스타일을 바꿀 수는 없습니다.</p>

          <div className="info-box" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
            <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <strong>❓ NodeList 스타일을 바로 바꿀 수 없나요?</strong><br />
              네! NodeList 자체에는 <code>style</code> 속성이 없습니다. 반드시 <code>forEach</code> 등의 반복문을 사용하여 각 요소에 하나씩 접근해야 합니다.
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-dom-nodelist-style"
          initialHtml={`<div class="test-item">Item 1</div>
<div class="test-item">Item 2</div>
<div class="test-item">Item 3</div>
<button id="btn-all" style="margin-top: 15px; cursor: pointer; padding: 6px 12px; background: #6366f1; color: white; border: none; border-radius: 4px;">전체 스타일 적용!</button>` + consoleHtml}
          initialJs={`// 다른 섹션과 버튼 ID가 겹칠 수 있으므로 현재 scope(#js-dom-nodelist-style) 안에서 찾습니다.
const btn = document.querySelector('#js-dom-nodelist-style #btn-all');

btn.onclick = () => {
  // 1. 모든 요소 선택 (NodeList 반환)
  // 역시 현재 scope 안의 .test-item만 선택하도록 합니다.
  const items = document.querySelectorAll('#js-dom-nodelist-style .test-item');
  log("찾은 요소 개수: " + items.length);

  // 2. 잘못된 예 (에러는 안 나지만 스타일이 바뀌지 않음)
  // items.style.color = 'red'; 

  // 3. 올바른 예 (forEach를 사용하여 하나씩 스타일 입히기)
  items.forEach((item, index) => {
    item.style.color = 'white';
    item.style.backgroundColor = '#6366f1';
    item.style.padding = '10px';
    item.style.marginBottom = '5px';
    item.style.borderRadius = '4px';
    item.style.transition = 'all 0.3s ease';
    // 각 요소를 순차적으로 조금씩 밀어서 변화를 보여줍니다.
    item.style.transform = \`translateX(\${(index + 1) * 15}px)\`;
  });
  
  log("✅ 모든 요소에 스타일이 적용되었습니다.");
};`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="5. 데이터셋 활용 (dataset & data-* attributes)">
        <div className="concepts">
          <p>HTML 요소에 비표준 데이터를 안전하게 저장하고 자바스크립트에서 읽어오는 현대적인 방식입니다.</p>
          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div className="info-card" style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #22c55e' }}>
              <strong style={{ color: '#166534' }}>🤔 언제 쓰나요? (When to use)</strong>
              <ul style={{ fontSize: '0.85rem', color: '#166534', marginTop: '8px', paddingLeft: '1.2rem' }}>
                <li>서버에서 불러온 상품 ID, 사용자 고유 키 등을 HTML에 숨겨둘 때</li>
                <li>필터링이나 정렬을 위해 각 요소에 범주(Category) 정보를 입힐 때</li>
                <li>CSS 클래스를 더럽히지 않고 JavaScript 전용 플래그를 심고 싶을 때</li>
              </ul>
            </div>
            <div className="info-card" style={{ padding: '1rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #3b82f6' }}>
              <strong style={{ color: '#1e40af' }}>📈 얼마나 많이 쓰나요? (Popularity)</strong>
              <p style={{ fontSize: '0.85rem', color: '#1e40af', marginTop: '8px' }}>
                현대 웹 개발에서 <strong>표준</strong>처럼 쓰입니다. React나 Vue 같은 프레임워크에서도 내부적으로 자주 활용하며, 바닐라 JS에서는 라이브러리 없이 데이터를 연결하는 가장 강력한 수단입니다.
              </p>
            </div>
          </div>

          <div className="info-box" style={{ background: '#fffbeb', border: '1px solid #fde68a', marginTop: '15px' }}>
            <strong style={{ color: '#92400e' }}>💡 네이밍 규칙: 케밥 케이스 to 카멜 케이스</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#92400e', lineHeight: '1.6' }}>
              HTML에서 <code>data-user-id</code>라고 쓰면, JS에서는 <code>dataset.userId</code>로 접근합니다. 하이픈(<code>-</code>)이 사라지고 다음 글자가 대문자로 바뀝니다!
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-dom-dataset"
          initialHtml={`<div id="product-list" style="display: flex; gap: 10px;">
  <div class="product-item" 
       data-id="p101" 
       data-category="electronics" 
       data-stock-status="in-stock"
       style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;">
    💻 맥북 (클릭!)
  </div>
  <div class="product-item" 
       data-id="p102" 
       data-category="books" 
       data-stock-status="out-of-stock"
       style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer;">
    📚 소설 (클릭!)
  </div>
</div>` + consoleHtml}
          initialJs={`const items = document.querySelectorAll('#js-dom-dataset .product-item');

items.forEach(item => {
  item.onclick = () => {
    // 1. 데이터 읽기 (dataset 속성 사용)
    const id = item.dataset.id;
    const category = item.dataset.category;
    const stockStatus = item.dataset.stockStatus; // data-stock-status -> stockStatus

    log("--- 상품 정보 ---");
    log("ID: " + id);
    log("카테고리: " + category);
    log("재고 상태: " + stockStatus);

    // 2. 데이터 수정/추가 (실시간으로 값 변경)
    item.dataset.lastViewed = new Date().toLocaleTimeString();
    log("✅ 마지막 조회 시간 기록됨: " + item.dataset.lastViewed);
    
    // 3. 시각적 피드백 (dataset 정보를 활용한 스타일 변경)
    if(stockStatus === 'out-of-stock') {
        item.style.backgroundColor = '#fee2e2';
        log("⚠️ 이 상품은 현재 품절입니다.");
    } else {
        item.style.backgroundColor = '#f0fdf4';
    }
  };
});`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="6. 브라우저 성능 최적화 (Reflow & Layout Thrashing)">
        <div className="concepts">
          <p>DOM을 조작할 때 가장 주의해야 할 요소는 <strong>Reflow(리플로우)</strong>입니다. 요소의 기하학적 수치(너비, 높이, 위치 등)가 바뀔 때 브라우저가 레이아웃을 다시 계산하는 과정을 의미합니다.</p>

          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div className="info-card" style={{ padding: '1rem', background: '#fff1f2', borderRadius: '8px', border: '1px solid #fda4af' }}>
              <strong style={{ color: '#9f1239' }}>🚫 성능 저하 주범: Layout Thrashing</strong>
              <p style={{ fontSize: '0.85rem', color: '#9f1239', marginTop: '8px' }}>
                루프 안에서 스타일을 변경(Write)하고, 곧바로 <code>offsetWidth</code> 같은 속성을 읽으면(Read), 브라우저는 정확한 값을 주기 위해 즉시 레이아웃을 다시 계산해야 합니다. 이를 반복하면 성능이 급격히 떨어집니다.
              </p>
            </div>
            <div className="info-card" style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #7dd3fc' }}>
              <strong style={{ color: '#075985' }}>✅ 해결책: 읽기/쓰기 그룹화 (Batching)</strong>
              <p style={{ fontSize: '0.85rem', color: '#075985', marginTop: '8px' }}>
                측정이 필요한 값은 루프 <strong>외부에서 한 번만 읽어 캐싱</strong>하세요. 스타일 일괄 변경은 브라우저가 다음 프레임에서 한 번에 처리할 수 있도록 몰아서 하는 것이 좋습니다.
              </p>
            </div>
          </div>

          <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '15px' }}>
            <strong style={{ color: '#475569' }}>⚠️ Reflow를 유발하는 주요 속성들</strong>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' }}>
              <code>offsetWidth</code>, <code>offsetHeight</code>, <code>clientWidth</code>, <code>getComputedStyle()</code>, <code>getBoundingClientRect()</code>, <code>scrollTo()</code> 등
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-dom-reflow"
          initialHtml={`<div id="box-container" style="display: flex; flex-direction: column; gap: 5px;">
  <div class="perf-box" style="width: 50px; height: 20px; background: #6366f1; border-radius: 4px; transition: width 0.3s;"></div>
  <div class="perf-box" style="width: 50px; height: 20px; background: #6366f1; border-radius: 4px; transition: width 0.3s;"></div>
  <div class="perf-box" style="width: 50px; height: 20px; background: #6366f1; border-radius: 4px; transition: width 0.3s;"></div>
</div>
<div style="margin-top: 15px; display: flex; gap: 10px;">
  <button id="btn-bad" style="padding: 8px 12px; border: 1px solid #fca5a5; background: #fef2f2; color: #b91c1c; cursor: pointer; border-radius: 4px;">나쁜 사례 (Layout Thrashing)</button>
  <button id="btn-good" style="padding: 8px 12px; border: 1px solid #86efac; background: #f0fdf4; color: #166534; cursor: pointer; border-radius: 4px;">좋은 사례 (Caching)</button>
</div>` + consoleHtml}
          initialJs={`const boxes = document.querySelectorAll('#js-dom-reflow .perf-box');
const btnBad = document.querySelector('#js-dom-reflow #btn-bad');
const btnGood = document.querySelector('#js-dom-reflow #btn-good');

// ❌ 나쁜 사례: 루프 안에서 읽기와 쓰기가 반복됨 (매번 Reflow 유발)
btnBad.onclick = () => {
  log("--- Bad Case Start ---");
  boxes.forEach((box, index) => {
    // 1. 측정 (Read) -> 브라우저가 강제로 레이아웃 계산!
    const currentWidth = box.offsetWidth;
    
    // 2. 변경 (Write)
    box.style.width = (currentWidth + 20) + 'px';
    log(\`[\${index}] Read width \${currentWidth}px and updated.\`);
  });
  log("⚠️ 루프마다 강제 리플로우(Reflow)가 발생했습니다.");
};

// ✅ 좋은 사례: 읽기는 밖에서 한 번만, 안에서는 쓰기만
btnGood.onclick = () => {
  log("--- Good Case Start ---");
  
  // 1. 필요한 정보는 루프 밖에서 미리 읽어둡니다. (Batch Read)
  const baseWidth = boxes[0].offsetWidth; 
  log("Batch Read complete: " + baseWidth + "px");

  // 2. 루프 내에서는 쓰기 작업만 수행합니다. (Write-only loop)
  boxes.forEach((box, index) => {
    box.style.width = (baseWidth + 20) + 'px';
  });
  
  log("✅ 읽기와 쓰기를 분리하여 성능을 최적화했습니다.");
};`}
        />
      </CollapsibleSection>
    </div>
  );
};

export default JsDomManipulationStudy;
