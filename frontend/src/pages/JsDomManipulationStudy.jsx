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
                        <li><code>querySelectorAll</code>: CSS 선택자로 일치하는 모든 요소 선택</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-dom-selection"
                    initialHtml={`<div class="box" id="unique-box">ID BOX</div>
<div class="box">CLASS BOX 1</div>
<div class="box">CLASS BOX 2</div>

<style>
.box { padding: 10px; border: 1px solid #ccc; margin-bottom: 5px; background: white; }
.highlight { background: #fbbf24; border-color: #f59e0b; }
</style>` + consoleHtml}
                    initialJs={`// 1. ID로 선택
const idBox = document.getElementById('unique-box');
idBox.classList.add('highlight');
log("ID Box selected and highlighted.");

// 2. QuerySelector로 첫 번째 클래스 요소 선택
const firstBox = document.querySelector('.box');
log("First Box Text: " + firstBox.innerText);

// 3. QuerySelectorAll로 모든 클래스 요소 선택
const allBoxes = document.querySelectorAll('.box');
log("Total Boxes found: " + allBoxes.length);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 내용과 속성 변경 (Content & Attributes)">
                <div className="concepts">
                    <p>요소의 텍스트를 바꾸거나 이미지를 교체하는 등 속성을 조작합니다.</p>
                    <ul>
                        <li><code>textContent</code>: 순수 텍스트만 처리</li>
                        <li><code>innerHTML</code>: HTML 태그까지 포함하여 렌더링 (보안 주의!)</li>
                        <li><code>src, href, value</code>: 각 태그별 고유 속성</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-dom-content"
                    initialHtml={`<div id="content-area">
  <p id="desc">여기의 글자가 바뀝니다.</p>
  <input type="text" id="my-input" value="기본값" style="padding: 5px;">
</div>`}
                    initialJs={`const desc = document.getElementById('desc');
const input = document.getElementById('my-input');

// 텍스트 변경
desc.textContent = "데이터가 업데이트 되었습니다! ✅";

// 태그 삽입
desc.innerHTML = "<strong>볼드체</strong>로 강조된 텍스트입니다.";

// 입력값 읽기
log("Initial input value: " + input.value);
input.value = "새로운 입력값";`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 스타일링 조작 (CSS in JS)">
                <div className="concepts">
                    <p>직접 인라인 스타일을 수정하거나 클래스를 입혀서 디자인을 변경합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-dom-style"
                    initialHtml={`<div id="paint-box" style="width: 100px; height: 100px; background: skyblue; transition: 0.5s;"></div>
<button id="btn-toggle" style="margin-top: 10px; cursor: pointer;">색상 랜덤 변경</button>`}
                    initialJs={`const box = document.getElementById('paint-box');
const btn = document.getElementById('btn-toggle');

btn.onclick = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  
  box.style.backgroundColor = \`rgb(\${r}, \${g}, \${b})\`;
  box.style.borderRadius = "50%";
  box.style.transform = "rotate(45deg) scale(1.2)";
};`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsDomManipulationStudy;
