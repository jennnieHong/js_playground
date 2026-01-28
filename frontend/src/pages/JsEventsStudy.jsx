import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsEventsStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Event Log</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과를 확인하세요.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="9. 이벤트 핸들링 (Event Handling)"
        subtitle="사용자와의 상호작용: 클릭, 스크롤, 키보드 입력 등 브라우저에서 발생하는 수많은 사건(Event)을 제어합니다."
      />

      <CollapsibleSection title="1. 이벤트 리스너 등록" initiallyOpen={true}>
        <div className="concepts">
          <p>HTML 요소에 행동을 부여하는 가장 권장되는 방식인 <code>addEventListener</code>를 학습합니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-events-basics"
          initialHtml={`<button id="btn-click" style="padding: 10px 20px; cursor: pointer;">나를 클릭하세요!</button>` + consoleHtml}
          initialJs={`const btn = document.getElementById('btn-click');

// 클릭 이벤트 리스너
btn.addEventListener('click', () => {
  log("딸깍! 버튼이 클릭되었습니다.");
});

// 마우스 진입/이탈
btn.addEventListener('mouseenter', () => {
  btn.style.background = "#e2e8f0";
});
btn.addEventListener('mouseleave', () => {
  btn.style.background = "white";
});`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 이벤트 객체 (Event Object)">
        <div className="concepts">
          <p>핸들러 함수는 이벤트의 상세 정보를 담은 <strong>이벤트 객체(e)</strong>를 인자로 받을 수 있습니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-events-object"
          initialHtml={`<div id="hot-area" style="width: 100%; height: 100px; background: #6366f1; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
  이 위에서 마우스를 움직여보세요
</div>` + consoleHtml}
          initialJs={`const area = document.getElementById('hot-area');

area.addEventListener('mousemove', (e) => {
  // e.offsetX, e.offsetY: 요소 내에서의 좌표
  // e.target: 이벤트가 발생한 요소
  log(\`좌표: \${e.offsetX}, \${e.offsetY}\`);
});

area.addEventListener('click', (e) => {
  log("--- 클릭 정보 ---");
  log("Alt key pressed? " + e.altKey);
  log("Click Type: " + e.type);
});`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 버블링과 캡처링 (Propagation)">
        <div className="concepts">
          <p>이벤트가 자식 요소에서 부모 요소로 전달되는 현상(Bubbling)을 이해하고, 이를 제어하는 법을 배웁니다.</p>
          <ul>
            <li><code>e.stopPropagation()</code>: 이벤트 전달을 중단시킵니다.</li>
            <li><code>e.preventDefault()</code>: 브라우저의 기본 행동(예: 링크 이동)을 막습니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-events-bubbling"
          initialHtml={`<div id="parent" style="padding: 30px; background: #f1f5f9; border: 2px dashed #94a3b8;">
  PARENT
  <div id="child" style="padding: 20px; background: #3b82f6; color: white; margin-top: 10px;">
    CHILD (Click me!)
  </div>
</div>` + consoleHtml}
          initialJs={`const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', () => {
  log("PARENT CLICKED (Bubbling)");
});

child.addEventListener('click', (e) => {
  log("CHILD CLICKED");
  
  // 아래 주석을 해제하면 PARENT까지 이벤트가 올라가지 않습니다.
  // e.stopPropagation(); 
});`}
        />
      </CollapsibleSection>
    </div>
  );
};

export default JsEventsStudy;
