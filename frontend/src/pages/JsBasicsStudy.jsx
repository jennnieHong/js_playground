import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import LiveCodeEditor from '../components/LiveCodeEditor';

const JsBasicsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Console Output</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과가 여기에 표시됩니다.</div>
  </div>
</div>

<style>
.console-box {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Fira Code', monospace;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
.console-header {
  background: #334155;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }
.console-title {
  color: #94a3b8;
  font-size: 0.75rem;
  margin-left: 4px;
}
.console-body {
  padding: 16px;
  min-height: 100px;
}
.log-content {
  color: #4ade80;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
}
</style>
    `;

    return (
        <div className="study-container">
            <header className="study-header">
                <div className="header-icon">🚀</div>
                <h1>JavaScript 기초 (Basics)</h1>
                <p>모던 자바스크립트의 시작: 변수 선언 방식과 7가지 원시 타입을 완벽하게 이해합니다.</p>
            </header>

            <CollapsibleSection title="1. 변수 선언: let, const, var" initiallyOpen={true}>
                <div className="concepts">
                    <p>현대적인 JS에서는 <code>const</code>를 기본으로 사용하고, 값이 바뀌어야 하는 경우에만 <code>let</code>을 사용합니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>const</h4>
                            <p>상수(Constant). 재할당이 불가능하며, 선언과 동시에 초기화해야 합니다.</p>
                        </div>
                        <div className="info-card">
                            <h4>let</h4>
                            <p>변수. 재할당이 가능하며, 블록 스코프를 가집니다.</p>
                        </div>
                        <div className="info-card warning">
                            <h4>var</h4>
                            <p>레거시 방식. 호이스팅과 함수 스코프 문제로 사용을 권장하지 않습니다.</p>
                        </div>
                    </div>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`// 1. const: 상수 (값 변경 불가)
const API_URL = "https://api.example.com";
log("API URL: " + API_URL);

// 2. let: 변수 (값 변경 가능)
let score = 100;
log("Initial Score: " + score);
score = 200;
log("Updated Score: " + score);

// 3. 재할당 테스트 (에러 발생 확인)
try {
  API_URL = "new-url"; 
} catch(e) {
  log("Error: " + e.message, true);
}`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 데이터 타입 (Data Types)">
                <div className="concepts">
                    <p>JavaScript는 <strong>동적 타이핑</strong> 언어로, 변수의 타입이 실행 시점에 결정됩니다.</p>
                    <ul>
                        <li><strong>String:</strong> 문자열 ("Hello")</li>
                        <li><strong>Number:</strong> 숫자 (정수, 실수 구분 없음)</li>
                        <li><strong>Boolean:</strong> 논리값 (true, false)</li>
                        <li><strong>Null & Undefined:</strong> 값이 없음 / 정의되지 않음</li>
                        <li><strong>Object:</strong> 복합 데이터 구조</li>
                    </ul>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`const name = "Alice";    // String
const age = 25;           // Number
const isStudent = true;   // Boolean
const job = null;         // Null (명시적 비어있음)
let address;             // Undefined (자동 할당)

log("Name: " + typeof name);
log("Age: " + typeof age);
log("Is Student: " + typeof isStudent);
log("Job: " + typeof job); // 주의: object로 출력됨
log("Address: " + typeof address);

// 템플릿 리터럴 사용법
log(\`안녕하세요, 제 이름은 \${name}이고 나이는 \${age}살입니다.\`);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 형 변환과 연산자 (Operators)">
                <div className="concepts">
                    <p>숫자와 문자열 간의 연산 시 주의가 필요합니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`log("1 + 1 = " + (1 + 1));      // 2 (산술)
log("'1' + 1 = " + ('1' + 1));  // "11" (문자열 연결)
log("'1' - 1 = " + ('1' - 1));  // 0 (자동 형변환)

log("10 == '10' : " + (10 == '10'));  // true (값만 비교)
log("10 === '10' : " + (10 === '10')); // false (타입까지 비교 - 권장!)`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsBasicsStudy;

