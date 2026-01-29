import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

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

          <div className="info-table-wrapper">
            <table className="info-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>함수 선언문 (Declaration)</th>
                  <th>함수 표현식 (Expression)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>호이스팅</strong></td>
                  <td>지원함 (코드 어디서든 호출 가능)</td>
                  <td>미지원 (선언 이후에만 호출 가능)</td>
                </tr>
                <tr>
                  <td><strong>사용 시점</strong></td>
                  <td>전역적으로 널리 쓰일 유틸리티 함수</td>
                  <td>콜백 함수, 클로저, 특정 모듈 내 로직</td>
                </tr>
                <tr>
                  <td><strong>가독성</strong></td>
                  <td>함수 구조가 한눈에 들어옴</td>
                  <td>변수 흐름에 따른 실행 순서가 명확함</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>💡 현대적인 자바스크립트 개발에서는 <strong>함수 표현식(특히 화살표 함수)</strong>을 사용하는 것이 코드의 흐름을 예측 가능하게 만들어주기 때문에 더 권장됩니다.</p>
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

      <CollapsibleSection title="3. 인자 관리: arguments vs Rest (...args)">
        <div className="concepts">
          <p>함수에 전달된 여러 개의 인자를 한꺼번에 다루는 두 가지 방식입니다.</p>
          <ul>
            <li><strong>arguments:</strong> 자바스크립트의 고전적인 **유사 배열** 객체입니다.</li>
            <li><strong>나머지 매개변수 (Rest Parameters):</strong> ES6에서 도입된 **진짜 배열** 방식입니다.</li>
          </ul>

          <div className="info-box">
            <strong>❓ arguments는 무엇인가요?</strong>
            <p>함수가 호출될 때 전달된 모든 인자들을 담고 있는 특별한 객체입니다. <strong>매개변수(Parameter)를 하나도 정의하지 않아도</strong>, 자바스크립트 엔진이 함수 내부에서 자동으로 생성하여 채워주는 '암묵적인 변수'입니다.</p>
            <p>0, 1, 2... 인덱스와 <code>length</code> 속성을 가지며, 과거에는 가변 인자를 다루는 유일한 방법이었습니다.</p>

            <div className="info-table-wrapper">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>암묵적 성질 (Implicit)</th>
                    <th>명시적 성질 (Explicit)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>대상</strong></td>
                    <td><code>arguments</code> 객체</td>
                    <td>나머지 매개변수 (Rest Parameters)</td>
                  </tr>
                  <tr>
                    <td><strong>선언 여부</strong></td>
                    <td>선언 없이 자동 생성됨</td>
                    <td><code>(...args)</code> 처럼 직접 이름을 지어줘야 함</td>
                  </tr>
                  <tr>
                    <td><strong>정체</strong></td>
                    <td>유사 배열 (Object)</td>
                    <td>진짜 배열 (Array)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>⚠️ <strong>치명적 단점:</strong> 화살표 함수(<code>{`=>`}</code>) 내부에는 <code>arguments</code> 객체가 존재하지 않습니다! 대신 Rest Parameters를 사용해야 합니다.</p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-func-args"
          initialHtml={consoleHtml}
          initialJs={`// 1. 고전적인 arguments (유사 배열)
function sumAll() {
  log("Is arguments array? " + Array.isArray(arguments));
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
log("Sum (arguments): " + sumAll(1, 2, 3));

// 2. 현대적인 Rest Parameters (진짜 배열)
const sumModern = (...numbers) => {
  log("\\nIs numbers array? " + Array.isArray(numbers));
  return numbers.reduce((a, b) => a + b, 0); // 배열 메서드 사용 가능!
};
log("Sum (Rest): " + sumModern(10, 20, 30));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. 클로저 (Closures)">
        <div className="concepts">
          <p>함수가 선언된 당시의 주변 환경(Scope)을 기억하고 있다가, 나중에 호출될 때 그 환경을 사용하는 기능입니다.</p>
          <p>주로 **상태 보존(State Management)**이나 **정보 은닉(Private variable)**을 위해 사용합니다.</p>

          <div className="info-box">
            <strong>🔒 정보 은닉과 캡슐화 (Information Hiding)</strong>
            <p>클로저의 가장 강력한 용도는 **'변수의 사유화'**입니다.</p>
            <ul>
              <li><code>createCounter</code> 내부의 <code>count</code> 변수는 오직 리턴된 함수만이 접근할 수 있는 <strong>비공개 도메인</strong>에 갇히게 됩니다.</li>
              <li>외부에서는 이 변수의 이름을 알더라도 절대로 직접 값을 수정하거나 읽을 수 없습니다. (Undefined 에러 발생)</li>
              <li>즉, 개발자가 허용한 로직(리턴된 함수)을 통해서만 값을 변경할 수 있으므로, 데이터의 안전성이 완벽하게 보장됩니다.</li>
            </ul>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-func-closure"
          initialHtml={consoleHtml}
          initialJs={`function createCounter() {
  let count = 0; // 외부에서 접근 불가 (Private Variable)
  
  return {
    increment: function() {
      count++;
      return "Current: " + count;
    },
    getValue: function() {
      return count;
    }
  };
}

const counter = createCounter();
log("--- Encapsulation Test ---");
log(counter.increment());
log(counter.increment());
log("Get via 'Getter': " + counter.getValue());

log("\\nDirect Access Attempt:");
try {
  log(count); // 에러!
} catch(e) {
  log("Error (Strict Hidden): " + e.message, true);
}`}
        />
      </CollapsibleSection>

      <style>{`
        .info-table-wrapper { margin: 15px 0; overflow-x: auto; }
        .info-table { width: 100%; border-collapse: collapse; background: var(--bg-secondary); border-radius: 8px; font-size: 0.9rem; }
        .info-table th, .info-table td { padding: 12px; border: 1px solid var(--border-color); text-align: left; }
        .info-table th { background: var(--bg-tertiary); color: var(--text-primary); }
        .info-table td { color: var(--text-secondary); line-height: 1.5; }
      `}</style>
      <RelatedLinks
        links={[
          {
            path: "/js/array-like",
            title: "10. 유사 배열 객체",
            description: "arguments 객체처럼 배열인 듯 배열 아닌 객체들의 특징을 배웁니다.",
            icon: "🎭"
          },
          {
            path: "/js/arrays",
            title: "12. 배열 마스터 (Arrays Mastery)",
            description: "인자로 받은 데이터를 가공하기 위한 다양한 배열 메서드를 탐구합니다.",
            icon: "📊"
          }
        ]}
      />
    </div>
  );
};

export default JsFunctionsStudy;
