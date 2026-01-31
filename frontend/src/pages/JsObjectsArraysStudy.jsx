import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import LiveCodeEditor from '../components/LiveCodeEditor';

const JsObjectsArraysStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Console Output</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 데이터 구조를 확인해보세요.</div>
  </div>
</div>
<style>
.console-box { background: #1e293b; border-radius: 8px; overflow: hidden; font-family: monospace; }
.console-header { background: #334155; padding: 8px 12px; display: flex; gap: 6px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
.console-title { color: #94a3b8; font-size: 0.75rem; }
.console-body { padding: 16px; min-height: 100px; }
.log-content { color: #4ade80; font-size: 0.9rem; white-space: pre-wrap; }
</style>`;

    return (
        <div className="study-container">
            <header className="study-header">
                <div className="header-icon">🗄️</div>
                <h1>객체와 배열 (Objects & Arrays)</h1>
                <p>복합적인 데이터를 저장하고 조작하는 JavaScript의 핵심 자료구조를 마스터합니다.</p>
            </header>

            <CollapsibleSection title="1. 배열과 고차 함수 (Array Methods)" initiallyOpen={true}>
                <div className="concepts">
                    <p>배열은 단순히 데이터를 나열하는 것을 넘어, 강력한 내장 메서드를 통해 데이터를 필터링하고 가공할 수 있습니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. filter: 짝수만 추출
const evens = numbers.filter(n => n % 2 === 0);
log("Evens: " + evens);

// 2. map: 각 숫자의 제곱 계산
const squares = evens.map(n => n * n);
log("Squares: " + squares);

// 3. reduce: 합계 계산
const sum = numbers.reduce((acc, cur) => acc + cur, 0);
log("Sum of all: " + sum);

// 4. find / findIndex
const found = numbers.find(n => n > 5);
log("First number > 5: " + found);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 객체와 구조 분해 할당 (Object Destructuring)">
                <div className="concepts">
                    <p>객체는 key-value 쌍으로 데이터를 관리합니다. 최신 JS에서는 이 정보를 아주 편하게 꺼내 쓸 수 있습니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`const profile = {
    userName: "JENNIE",
    level: 42,
    skills: ["JS", "CSS", "React"],
    greet: function() { return \`Hello \${this.userName}\`; }
};

log("Raw Greet: " + profile.greet());

// 1. 객체 구조 분해 (Destructuring)
const { userName, level, skills } = profile;
log(\`User: \${userName}, Level: \${level}\`);
log("First Skill: " + skills[0]);

// 2. 전개 연산자 (Spread Operator)
const updatedProfile = { ...profile, level: 43, status: "Active" };
log("Current Level: " + updatedProfile.level);
log("Status: " + updatedProfile.status);

// 3. Null 병합 연산자 (??)
const nickName = profile.nickName ?? "Guest";
log("Nickname: " + nickName);`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsObjectsArraysStudy;

