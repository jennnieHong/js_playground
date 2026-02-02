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
          
          <div className="info-box" style={{ marginTop: '15px' }}>
            <strong>🎯 핵심 차이점: Lexical this</strong>
            <ul>
              <li><strong>일반 함수:</strong> 호출 방식에 따라 <code>this</code>가 동적으로 결정됩니다. (주로 호출한 객체)</li>
              <li><strong>화살표 함수:</strong> 함수가 선언된 시점의 상위 스코프의 <code>this</code>를 그대로 계승합니다. (정적 바인딩)</li>
            </ul>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-func-arrow"
          initialHtml={consoleHtml}
          initialJs={`// 1. 간결한 문법
const square = n => n * n;
log("Square: " + square(5));

const getUser = (name) => ({ name: name, role: "Guest" });
log("User: " + JSON.stringify(getUser("Alice")));

// 2. this 바인딩 비교
const timer = {
  name: "MyTimer",
  
  // 일반 함수: 호출 시점에 this가 timer로 바인딩됨
  regularFunc: function() {
    log("\\n[Regular Function 호출]");
    log("this.name: " + this.name);
    
    // 내부 비동기 콜백에서 문제 발생
    setTimeout(function() {
      // 일반 함수 콜백 내부의 this는 전역 혹은 undefined
      log("Inside Timeout (Regular): " + (this ? this.name : "undefined")); 
    }, 100);
  },
  
  // 화살표 함수: 상위 스코프(timer)의 this를 계승
  arrowFunc: function() {
    log("\\n[Arrow Function 호출]");
    log("this.name: " + this.name);
    
    setTimeout(() => {
      // 화살표 함수는 자신만의 this가 없어서 timer를 그대로 사용함
      log("Inside Timeout (Arrow): " + this.name);
    }, 200);
  }
};

timer.regularFunc();
timer.arrowFunc();`}
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

      <CollapsibleSection title="5. Function Master: this의 명시적 바인딩 (call, apply, bind)">
        <div className="concepts">
          <p>화살표 함수가 아닌 일반 함수는 `this`가 동적으로 변합니다. 이를 **강제로 고정**시키거나 제어하는 세 가지 도구입니다.</p>
          <div className="info-grid">
            <div className="info-card">
              <h5 style={{ margin: 0 }}>📞 call / apply</h5>
              <p style={{ fontSize: '0.8rem' }}>함수를 즉시 호출합니다. `call`은 인자를 낱개로, `apply`는 배열로 전달합니다.</p>
            </div>
            <div className="info-card">
              <h5 style={{ margin: 0 }}>🔗 bind</h5>
              <p style={{ fontSize: '0.8rem' }}>함수를 호출하지 않고, `this`가 고정된 **새로운 함수**를 반환합니다.</p>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-func-this-master"
          initialHtml={consoleHtml}
          initialJs={`const person = { name: "Jennie" };
function greet(city, age) {
  log(\`안녕하세요, \${city}에 사는 \${age}살 \${this.name}입니다.\`);
}

// 1. call (낱개 전달)
greet.call(person, "서울", 25);

// 2. apply (배열 전달)
const info = ["부산", 24];
greet.apply(person, info);

// 3. bind (영구 결합)
const jennieGreet = greet.bind(person, "인천");
jennieGreet(26);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="6. Function Master: 고난도 패턴 (Currying & Memoization)">
        <div className="concepts">
          <p>함수의 실행 속도를 높이거나(Memoization), 인자를 나누어 처리하는(Currying) 고급 설계 기법입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-func-patterns"
          initialHtml={consoleHtml}
          initialJs={`/**
 * 1. Memoization: 캐싱을 통해 연산 속도 최적화
 */
function memoizedSquare() {
  const cache = {};
  return function(n) {
    if (n in cache) {
      log("⚡ [Cache Hit] " + n);
      return cache[n];
    }
    log("🐢 [Calculating...] " + n);
    const result = n * n;
    cache[n] = result;
    return result;
  };
}

const square = memoizedSquare();
square(5);
square(5); // 캐시된 결과 사용

/**
 * 2. Currying: f(a, b, c) -> f(a)(b)(c)
 */
const multiply = a => b => c => a * b * c;
log("\\nCurried Multiply (2*3*4): " + multiply(2)(3)(4));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="7. Function Master: 재귀와 스택 (Recursion)">
        <div className="concepts">
          <p>함수가 자기 자신을 호출하는 방식입니다. 복잡한 자료구조(Tree, JSON)를 탐색할 때 필수적입니다.</p>
          <div className="info-box danger">
             <strong>⚠️ Stack Overflow 주의</strong>
             <p>종료 조건(Base Case)이 없으면 메모리가 가득 차서 브라우저가 멈춥니다.</p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-func-recursion"
          initialHtml={consoleHtml}
          initialJs={`// 피보나치 수열 (재귀 버전)
function fibo(n) {
  if (n <= 1) return n; // 종료 조건
  return fibo(n - 1) + fibo(n - 2);
}

log("Fibo(6): " + fibo(6));

// 실무 응용: 폴더 구조 탐색 시뮬레이션
const folders = {
  name: "Root",
  children: [
    { name: "src", children: [{ name: "index.js" }] },
    { name: "dist" }
  ]
};

function readFolders(folder, depth = 0) {
  log("  ".repeat(depth) + "📁 " + folder.name);
  if (folder.children) {
    folder.children.forEach(child => readFolders(child, depth + 1));
  }
}

readFolders(folders);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="6. 현대적 할당 마스터: Default Params & Logical Assignment">
        <div className="concepts">
          <p>함수의 안전성을 높이고 코드를 획기적으로 줄여주는 할당 문법들을 마스터합니다.</p>
          
          <div className="info-grid">
            <div className="info-card">
              <h4 style={{ color: '#2563eb' }}>📦 Default Parameters (ES6)</h4>
              <p style={{ fontSize: '0.85rem' }}>매개변수가 <code>undefined</code>일 때만 기본값이 적용됩니다. 과거의 <code>||</code> 방식과 달리 <strong>0이나 빈 문자열</strong>을 유효한 값으로 취급할 수 있어 훨씬 안전합니다.</p>
            </div>
            <div className="info-card">
              <h4 style={{ color: '#059669' }}>⚡ Logical Assignment (ES2021)</h4>
              <p style={{ fontSize: '0.85rem' }}><code>||=</code>, <code>&&=</code>, <code>??=</code> 연산자는 조건 체크와 할당을 동시에 처리합니다. 불필요한 할당을 막고 의도를 명확히 합니다.</p>
            </div>
          </div>

          <div className="info-table-wrapper">
            <table className="info-table">
              <thead>
                <tr>
                  <th>연산자</th>
                  <th>설명</th>
                  <th>동일한 코드</th>
                  <th>지원 버전</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>||=</code></td>
                  <td>falsy일 때만 할당</td>
                  <td><code>a || (a = b)</code></td>
                  <td>ES2021 (최신)</td>
                </tr>
                <tr>
                  <td><code>&&=</code></td>
                  <td>truthy일 때만 할당</td>
                  <td><code>a && (a = b)</code></td>
                  <td>ES2021 (최신)</td>
                </tr>
                <tr>
                  <td><code>??=</code></td>
                  <td>nullish일 때만 할당</td>
                  <td><code>a ?? (a = b)</code></td>
                  <td>ES2021 (최신)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>⚠️ <strong>호환성 경고</strong>: ES2021 문법은 오래된 브라우저(IE 등)에서 전혀 동작하지 않으므로, 실무에서는 Babel 트랜스파일링이 필수입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-modern-assignment"
          initialHtml={consoleHtml}
          initialJs={`// 1. Default Parameters (ES6)
function greet(name = "Anonymous", count = 0) {
  log(\`Hello \${name}! Your score is \${count}.\`);
}

greet();                // Hello Anonymous! Your score is 0.
greet("Jennie", 100);    // Hello Jennie! Your score is 100.
greet(undefined, 0);    // Hello Anonymous! Your score is 0. (undefined만 기본값 작동)

log("\\n--- Logical Assignment (ES2021) ---");

// 2. ||= (Or Assignment) - 설정값이 없을 때 채워넣기
let config = { theme: "" };
config.theme ||= "dark"; 
log("Theme: " + config.theme); // "dark" (빈 문자열이 falsy라 할당됨)

// 3. ??= (Nullish Assignment) - 실제 데이터(0, "")는 보존하고 null/undef만 처리
let score = 0;
score ??= 100;
log("Score: " + score); // 0 (0은 nullish가 아니므로 100이 할당되지 않음! 안전함)

// 4. &&= (And Assignment) - 데이터가 있을 때만 업데이트
let user = { loggedIn: true, name: "Guest" };
user.name &&= "Member"; // user.name이 있으므로 "Member"로 업데이트
log("User: " + user.name);`}
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
