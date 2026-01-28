import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsFunctionsStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Function Insights</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 함수 실행 결과가 표시됩니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="5. 함수와 클로저 (Functions & Closures)"
        subtitle="코드 재사용의 핵심: 함수를 정의하는 다양한 방식과 JS만의 독특한 클로저 개념을 탐구합니다."
      />

      <CollapsibleSection title="1. 선언 vs 표현식" initiallyOpen={true}>
        <div className="concepts">
          <p>함수를 만드는 두 가지 주요 방법입니다. 둘 사이의 결정적인 차이는 **호이스팅(Hoisting)**입니다.</p>
          <ul>
            <li><strong>함수 선언문:</strong> <code>function foo() {'{ }'}</code> - 선언 전 호출 가능.</li>
            <li><strong>함수 표현식:</strong> <code>const foo = function() {'{ }'}</code> - 변수처럼 취급됨.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-func-decl"
          initialHtml={consoleHtml}
          initialJs={`// 1. 함수 선언문: 호이스팅 가능
log("Declaration Call: " + sayHi("User"));

function sayHi(name) {
  return "Hi, " + name;
}

// 2. 함수 표현식: 할당 전 호출 불가
try {
  log("Expression Call: " + getSum(10, 20));
} catch(e) {
  log("Error (Hoisting): " + e.message, true);
}

const getSum = function(a, b) {
  return a + b;
};

log("Expression Call (After Assignment): " + getSum(10, 20));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 화살표 함수 (Arrow Functions)">
        <div className="concepts">
          <p>모던 자바스크립트의 표준입니다. 문법이 간결하고 <code>this</code> 바인딩이 다릅니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-func-arrow"
          initialHtml={consoleHtml}
          initialJs={`// 1. 기본형
const multiply = (a, b) => {
  return a * b;
};

// 2. 축약형 (본문이 한 줄이면 return 생략)
const square = n => n * n;

log("Multiply Result: " + multiply(5, 4));
log("Square Result: " + square(9));

// 3. 객체 반환 시 주의점 (소괄호 필수)
const getUser = (name) => ({ name: name, role: "Guest" });
log("User Object: " + JSON.stringify(getUser("Alice")));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 클로저 (Closures)">
        <div className="concepts">
          <p>함수가 선언된 당시의 주변 환경(Scope)을 기억하고 있다가, 나중에 호출될 때 그 환경을 사용하는 기능입니다.</p>
          <p>주로 **상태 보존(State Management)**이나 **정보 은닉(Private variable)**을 위해 사용합니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-func-closure"
          initialHtml={consoleHtml}
          initialJs={`function createCounter() {
  let count = 0; // 이 변수는 외부에서 직접 수정 불가능!
  
  return function() {
    count++;
    return "현재 카운트: " + count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

log("--- Counter 1 ---");
log(counter1());
log(counter1());

log("\\n--- Counter 2 (독립적) ---");
log(counter2());

log("\\ncount 변수에 직접 접근 시도:");
try {
  log(count); 
} catch(e) {
  log("Error (Scoped): " + e.message, true);
}`}
        />
      </CollapsibleSection>
    </div>
  );
};

export default JsFunctionsStudy;
