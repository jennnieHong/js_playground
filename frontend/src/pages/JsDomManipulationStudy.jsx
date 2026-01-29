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
        </div>
    );
};

export default JsDomManipulationStudy;
