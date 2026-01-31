import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import LiveCodeEditor from '../components/LiveCodeEditor';

const JsFunctionsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Console Output</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 함수 실행 결과</div>
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
                <div className="header-icon">🧩</div>
                <h1>함수와 스코프 (Functions & Scope)</h1>
                <p>재사용 가능한 코드 단위인 함수와 변수의 유효 범위를 결정하는 스코프를 학습합니다.</p>
            </header>

            <CollapsibleSection title="1. 함수 선언 방식" initiallyOpen={true}>
                <div className="concepts">
                    <p>JS에서는 함수를 정의하는 여러 가지 방법이 있습니다.</p>
                    <ul>
                        <li><strong>함수 선언문:</strong> 호이스팅의 영향을 받으며 어디서든 호출 가능합니다.</li>
                        <li><strong>함수 표현식:</strong> 변수에 함수를 할당하며, 정의된 이후에만 호출 가능합니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 함수 선언문 (Function Declaration)
function sayHello(name) {
    return \`안녕하세요, \${name}님!\`;
}
log(sayHello("철수"));

// 2. 함수 표현식 (Function Expression)
const getSum = function(a, b) {
    return a + b;
};
log("Sum: " + getSum(10, 20));

// 3. 익명 함수와 즉시 실행 함수(IIFE)
(function() {
    log("즉시 실행 함수가 작동했습니다!");
})();`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 화살표 함수 (Arrow Functions)">
                <div className="concepts">
                    <p>ES6에서 도입된 간결한 문법입니다. <code>this</code> 바인딩 방식이 일반 함수와 다릅니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`// 화살표 함수 기본
const multiply = (a, b) => a * b;
log("Result: " + multiply(5, 5));

// 매개변수가 하나인 경우 괄호 생략 가능
const double = n => n * 2;
log("Double: " + double(15));

// 본문이 여러 줄인 경우 return 필요
const getLongInfo = (name, age) => {
    const info = \`[\${name}] \${age}세\`;
    return info;
};
log(getLongInfo("영희", 30));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 스코프 (Scope)">
                <div className="concepts">
                    <p>변수가 접근 가능한 영역을 의미합니다. 전역 스코프와 지역(블록) 스코프의 차이를 이해하세요.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`const globalVar = "전역 변수";

function testScope() {
    const localVar = "지역 변수";
    log("안쪽에서 접근: " + globalVar);
    log("안쪽에서 접근: " + localVar);
}

testScope();

try {
    log("바깥에서 접근: " + globalVar);
    log("바깥에서 접근: " + localVar); // 에러 발생
} catch(e) {
    log("Error: " + e.message, true);
}`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsFunctionsStudy;

