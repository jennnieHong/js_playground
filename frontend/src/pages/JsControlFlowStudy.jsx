import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import LiveCodeEditor from '../components/LiveCodeEditor';

const JsControlFlowStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Console Output</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 결과를 보려면 Apply를 누르세요.</div>
  </div>
</div>
<style>
.console-box { background: #1e293b; border-radius: 8px; overflow: hidden; font-family: monospace; }
.console-header { background: #334155; padding: 8px 12px; display: flex; gap: 6px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
.console-title { color: #94a3b8; font-size: 0.75rem; }
.console-body { padding: 16px; min-height: 80px; }
.log-content { color: #4ade80; font-size: 0.9rem; white-space: pre-wrap; }
</style>`;

    return (
        <div className="study-container">
            <header className="study-header">
                <div className="header-icon">🔄</div>
                <h1>제어 흐름 (Control Flow)</h1>
                <p>조건문과 반복문을 통해 프로그램의 실행 흐름을 자유자재로 제어하는 방법을 배웁니다.</p>
            </header>

            <CollapsibleSection title="1. 조건문: if, else if, else" initiallyOpen={true}>
                <div className="concepts">
                    <p>조건식의 판별 결과(boolean)에 따라 다른 코드 블록을 실행합니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`const score = 85;

if (score >= 90) {
    log("등급: A (Excellent!)");
} else if (score >= 80) {
    log("등급: B (Good job)");
} else if (score >= 70) {
    log("등급: C (Keep going)");
} else {
    log("등급: F (Need more study)");
}

// 삼항 연산자 (Ternary Operator)
const result = score >= 60 ? "Pass" : "Fail";
log("최종 결과: " + result);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. switch 문">
                <div className="concepts">
                    <p>특정 값이 여러 케이스 중 하나와 일치할 때 사용합니다. <code>break</code>를 잊지 마세요!</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`const device = "iPhone";

switch (device) {
    case "iPhone":
        log("iOS 기기입니다.");
        break;
    case "Android":
        log("안드로이드 기기입니다.");
        break;
    case "PC":
    case "Laptop":
        log("컴퓨터 기기입니다.");
        break;
    default:
        log("알 수 없는 기기입니다.");
}

// switch는 '===' 비교(엄격한 비교)를 수행합니다.
const val = 1;
switch(val) {
  case '1': log("This won't run"); break;
  case 1: log("Matched numeric 1!"); break;
}`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 반복문: for, while">
                <div className="concepts">
                    <p>정해진 횟수만큼 또는 조건이 만족되는 동안 코드를 반복 실행합니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`log("--- 1. 일반 for문 ---");
for (let i = 1; i <= 5; i++) {
    log(\`Count: \${i}\`);
}

log("\\n--- 2. while문 ---");
let count = 0;
while (count < 3) {
    log(\`While Count: \${count}\`);
    count++;
}

log("\\n--- 3. 구구단 2단 연습 ---");
for (let j = 1; j <= 9; j++) {
    log(\`2 * \${j} = \${2 * j}\`);
}`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsControlFlowStudy;

