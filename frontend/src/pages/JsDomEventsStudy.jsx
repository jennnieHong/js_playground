import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import LiveCodeEditor from '../components/LiveCodeEditor';

const JsDomEventsStudy = () => {
    const consoleHtmlSnippet = `
<div class="console-box" style="margin-top: 20px;">
  <div class="console-header"><span class="console-title">Event Log</span></div>
  <div class="console-body"><div data-ref="logContent" class="log-content">> 이벤트가 여기에 기록됩니다.</div></div>
</div>
<style>
.console-box { background: #1e293b; border-radius: 4px; overflow: hidden; font-family: monospace; border: 1px solid #334155; }
.console-header { background: #334155; padding: 4px 8px; }
.console-title { color: #94a3b8; font-size: 0.7rem; text-transform: uppercase; }
.console-body { padding: 8px 12px; min-height: 40px; }
.log-content { color: #4ade80; font-size: 0.85rem; }
</style>`;

    return (
        <div className="study-container">
            <header className="study-header">
                <div className="header-icon">🖱️</div>
                <h1>브라우저와 DOM (DOM & Events)</h1>
                <p>자바스크립트의 진정한 힘: 정적인 HTML 페이지를 동적이고 인터랙티브한 애플리케이션으로 변모시킵니다.</p>
            </header>

            <CollapsibleSection title="1. 요소 선택과 내용 수정 (Selection & Manipulation)" initiallyOpen={true}>
                <div className="concepts">
                    <p><code>document</code> 객체를 통해 HTML 요소에 접근하고 내용을 실시간으로 변경합니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={`<div id="target-box" class="display-card">
  <h3>Hello DOM!</h3>
  <p id="target-text">이 텍스트가 바뀝니다.</p>
</div>

<div class="button-group">
  <button id="btn-text">내용 바꾸기</button>
  <button id="btn-style">스타일 바꾸기</button>
</div>

<style>
.display-card { padding: 20px; border: 2px solid #e2e8f0; border-radius: 12px; text-align: center; background: white; margin-bottom: 10px; }
.button-group { display: flex; gap: 8px; justify-content: center; }
button { padding: 8px 16px; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; transition: 0.2s; }
button:hover { background: #e2e8f0; }
</style>` + consoleHtmlSnippet}
                    initialJs={`const textElement = document.getElementById('target-text');
const btnText = document.getElementById('btn-text');
const btnStyle = document.getElementById('btn-style');
const box = document.getElementById('target-box');

// 1. 텍스트 변경
btnText.addEventListener('click', () => {
  textElement.textContent = "🎉 마법처럼 바뀌었습니다!";
  log("텍스트 변경 완료!");
});

// 2. 스타일 조작
btnStyle.onclick = () => {
  box.style.backgroundColor = "#fffbeb";
  box.style.borderColor = "#fbbf24";
  textElement.style.color = "#b45309";
  log("스타일(색상) 변경 완료!");
};`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 이벤트 리스너와 마우스 상태">
                <div className="concepts">
                    <p>사용자의 모든 행동(클릭, 스크롤, 입력 등)은 <strong>이벤트</strong>로 캡처할 수 있습니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={`<div id="mouse-box" class="interactive-box">
  HOVER & CLICK ME
</div>
<div id="stats" style="margin-top: 10px; font-size: 0.9rem; color: #64748b;"></div>

<style>
.interactive-box {
  width: 100%; height: 120px; background: #6366f1; color: white;
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; border-radius: 12px; cursor: crosshair; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.interactive-box.active { transform: scale(0.95); background: #4338ca; }
</style>` + consoleHtmlSnippet}
                    initialJs={`const box = document.getElementById('mouse-box');
const stats = document.getElementById('stats');

// Mouse Enter
box.addEventListener('mouseenter', () => {
  box.style.boxShadow = "0 20px 25px -5px rgba(99, 102, 241, 0.4)";
  log("마우스 진입!");
});

// Mouse Leave
box.addEventListener('mouseleave', () => {
  box.style.boxShadow = "none";
  box.classList.remove('active');
  log("마우스 이탈");
});

// Mouse Move (좌표 추적)
box.addEventListener('mousemove', (e) => {
  stats.textContent = \`X: \${e.offsetX}, Y: \${e.offsetY}\`;
});

// Click
box.addEventListener('mousedown', () => box.classList.add('active'));
box.addEventListener('mouseup', () => {
  box.classList.remove('active');
  log("딸깍! 클릭되었습니다.");
});`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsDomEventsStudy;

