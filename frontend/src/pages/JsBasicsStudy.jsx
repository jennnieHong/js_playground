import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsBasicsStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Basics Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과가 여기에 표시됩니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="1. 변수와 문법 기초 (Variables & Syntax)"
        subtitle="모던 자바스크립트의 시작: 데이터를 저장하는 그릇인 변수와 원시 데이터 타입의 핵심 개념을 완벽하게 이해합니다."
      />

      <CollapsibleSection title="1. 변수 선언: let vs const" initiallyOpen={true}>
        <div className="concepts">
          <p>현대적인 JS에서는 <code>var</code> 대신 블록 스코프를 지원하는 <code>const</code>와 <code>let</code>을 사용합니다.</p>
          <div className="info-grid">
            <div className="info-card">
              <h4>const</h4>
              <p>재할당이 금지된 상수입니다. 기본적으로 모든 변수는 <code>const</code>로 선언하는 것이 안전합니다.</p>
            </div>
            <div className="info-card">
              <h4>let</h4>
              <p>값이 변해야 하는 경우(예: 반복문 카운터)에만 선택적으로 사용합니다.</p>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-vars-deep"
          initialHtml={consoleHtml}
          initialJs={`// 1. const: 변하지 않는 값
const APP_NAME = "JavaScript Playground";
log("App: " + APP_NAME);

// 2. let: 변할 수 있는 값
let userCount = 100;
log("Users: " + userCount);
userCount = 101;
log("Updated Users: " + userCount);

// 3. 재할당 에러 확인
try {
  APP_NAME = "New Name";
} catch(e) {
  log("Error: " + e.message, true);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 원시 데이터 타입 (7 Primitives) & 주의사항">
        <div className="concepts">
          <p>자바스크립트에는 총 7가지의 원시 타입이 있으며, 이들은 모두 <strong>불변(Immutable)</strong>하며 <strong>값에 의한 복사(Pass by Value)</strong>가 이루어집니다.</p>
          <ul>
            <li><strong>Number:</strong> 정수와 실수를 모두 포함.</li>
            <li><strong>String:</strong> 텍스트 데이터.</li>
            <li><strong>Boolean:</strong> <code>true</code> / <code>false</code>.</li>
            <li><strong>Null:</strong> 의도적인 빈 값.</li>
            <li><strong>Undefined:</strong> 선언만 되고 할당되지 않은 상태.</li>
            <li><strong>BigInt:</strong> 아주 큰 정수를 안전하게 다룸 (끝에 <code>n</code>).</li>
            <li><strong>Symbol:</strong> 고유하고 불변하는 식별자.</li>
          </ul>
        </div>

        <LiveCodeEditor
          scopeId="js-basics-primitives-all"
          initialHtml={consoleHtml}
          initialJs={`// 1. 기본 타입들
const age = 25;
const name = "Jenny";
const isDev = true;
const nothing = null;
let mystery;

log(\`Number: \${typeof age}\`);
log(\`String: \${typeof name}\`);
log(\`Boolean: \${typeof isDev}\`);
log(\`Null: \${typeof nothing}\`); // 주의: object로 출력됨 (JS의 역사적 실수)
log(\`Undefined: \${typeof mystery}\`);

// 2. BigInt (ES2020)
const largeNum = 9007199254740991n;
log(\`\\nBigInt: \${typeof largeNum} - \${largeNum}\`);

// 3. Symbol
const sym1 = Symbol("key");
const sym2 = Symbol("key");
log(\`Symbol: \${typeof sym1}\`);
log("Symbols are unique: " + (sym1 === sym2));`}
        />
        <div className="concepts">
          <p>자바스크립트에는 총 7가지의 원시 타입이 있으며, 각각의 특성과 실무적인 주의사항을 이해하는 것이 중요합니다.</p>
          <ul>
            <li><strong>Number:</strong> 64비트 부동소수점(IEEE 754) 형식을 따릅니다. <code>0.1 + 0.2 === 0.30000000000000004</code>와 같은 정밀도 문제가 발생할 수 있습니다.</li>
            <li><strong>NaN (Not a Number):</strong> 숫자가 아님을 나타내는 특별한 숫자입니다. <code>NaN === NaN</code>은 <code>false</code>이므로 <code>Number.isNaN()</code>으로 확인해야 합니다.</li>
            <li><strong>Null vs Undefined:</strong> <code>undefined</code>는 '값이 아직 정의되지 않음'을, <code>null</code>은 '값이 없음'을 <strong>의도적</strong>으로 명시한 상태입니다.</li>
            <li><strong>BigInt:</strong> <code>2^53 - 1</code>보다 큰 정수를 다룰 때 사용합니다. <code>Number</code>와 섞어서 연산할 수 없으므로 주의가 필요합니다.</li>
            <li><strong>Symbol:</strong> 항상 고유한 값을 가집니다. 객체의 프라이빗한 키를 만들 때 유용합니다.</li>
          </ul>
          <blockquote>
            <strong>역사적 실수:</strong> <code>typeof null</code>을 실행하면 <code>"object"</code>가 반환되는데, 이는 자바스크립트 초기 설계상의 오류이지만 하위 호환성을 위해 유지되고 있습니다.
          </blockquote>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-primitives-deep"
          initialHtml={consoleHtml}
          initialJs={`// 1. Number: 정밀도 문제 (IEEE 754)
log("0.1 + 0.2 equals 0.3? " + (0.1 + 0.2 === 0.3));
log("Actual result: " + (0.1 + 0.2));

// 2. NaN (Not a Number)의 특이점
const invalidResult = "hello" * 2;
log("\\nNaN === NaN: " + (invalidResult === invalidResult)); // false
log("Is NaN check: " + Number.isNaN(invalidResult)); // true

// 3. Null vs Undefined
let x; // 선언만 함
let y = null; // 명시적으로 비움
log("\\ntypeof x (undefined): " + typeof x);
log("typeof y (null): " + typeof y); // object (JS의 역사적 실수)

// 4. BigInt & Number 혼합 금지
try {
  const big = 100n;
  const num = 10;
  log("\\nBigInt + Number: " + (big + BigInt(num))); // 형변환 필수
} catch(e) {
  log("Error mixing: " + e.message);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 오토박싱 (Auto-boxing): 원시 타입의 이중생활">
        <div className="concepts">
          <p>원시 타입은 마침표(<code>.</code>)를 찍어 <strong>메서드를 호출하거나 프로퍼티에 접근하는 순간</strong>만 객체처럼 행동합니다.</p>
          <ul>
            <li><strong>동작 원리:</strong> 엔진이 내부적으로 <code>new String(val)</code> 같은 래퍼 객체를 생성 → 메서드 실행 → 객체 즉시 파괴.</li>
            <li>이 과정 덕분에 원시 타입의 가벼움과 객체의 다재다능함을 동시에 누릴 수 있습니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-autoboxing"
          initialHtml={consoleHtml}
          initialJs={`// 1. 단순 데이터 (Primitive)
const str = "hello";
log("Type check: " + typeof str); // "string"

// 2. 메서드 호출: 호출하는 순간만 객체로 '포장(Boxing)' 됩니다.
// 내부적으로: (new String(str)).toUpperCase() 가 실행됨
log("toUpperCase(): " + str.toUpperCase()); 

// 3. 증명: 일회용 객체성
// 속성을 추가해 보지만, 명령이 끝나면 객체가 파괴되어 속성도 증발합니다.
str.tempId = 123; 
log("\\nProperty set: str.tempId = 123");
log("Attempt read: " + str.tempId); // undefined (새로운 박스에서 읽으려 하기 때문)`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. 래퍼 함수(Wrapper Functions) vs 생성자">
        <div className="concepts">
          <p><code>Number</code>, <code>String</code>, <code>BigInt</code> 등은 '클래스'처럼 보이지만, 실제로는 <strong>원시 타입을 다루는 함수</strong>들입니다. 아래는 이들을 사용하는 두 가지 상반된 방식과 그 특징입니다.</p>

          <ul>
            <li><strong>래퍼 함수 (권장):</strong> <code>Number("1")</code>처럼 사용하며, 단순히 **원시 값(Primitive)**으로 변환만 합니다.</li>
            <li><strong>생성자 (비권장):</strong> <code>new Number(1)</code>처럼 사용하며, 불필요한 **객체(Object)**를 만듭니다.</li>
            <li><strong>BigInt & Symbol:</strong> 이들은 아예 **객체 생성이 금지**되어 있어 반드시 함수로만 써야 합니다.</li>
          </ul>

          <div className="info-grid">
            <div className="info-card">
              <h4>❌ 생성자 (new Number)</h4>
              <p>값 대신 <strong>객체(Object)</strong>를 생성합니다. <code>typeof</code> 결과가 <code>"object"</code>가 되어 타입 체크를 방해하고, 메모리를 더 많이 소모해 <strong>성능이 저하</strong>됩니다.</p>
            </div>
            <div className="info-card">
              <h4>✅ 래퍼 함수 (Number)</h4>
              <p>순수하게 <strong>값(Primitive)</strong>으로 변환만 수행합니다. 메모리 효율적이며 타입 일관성이 유지되어 실무에서 <strong>가장 추천되는 방식</strong>입니다.</p>
            </div>
          </div>

          <blockquote>
            <strong>🤔 BigInt와 Symbol은 왜 'new'가 금지되었을까?</strong>
            <p>비교적 최근(ES6+)에 나온 이 타입들은 과거 <code>new Number()</code>와 원시 값 사이에서 발생했던 <strong>타입 혼란(Object vs Primitive)을 원천 차단</strong>하기 위해 설계되었습니다. 객체를 만들지 않고 항상 원시 값으로만 다루도록 하여 코드의 예측 가능성을 높였습니다.</p>
          </blockquote>

          <p>💡 타입 변환의 더 구체적인 규칙은 <a href="/js/conversion">데이터 타입 변환</a> 페이지에서, 아주 큰 정수를 다루는 법은 <a href="/js/bigint">BigInt 심화</a> 페이지에서 더 자세히 볼 수 있습니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-wrappers"
          initialHtml={consoleHtml}
          initialJs={`// 1. Number: 함수 vs 생성자
const prim = Number("123");   // "number"
const obj = new Number("123"); // "object"

log("Primitive Type: " + typeof prim); 
log("Object Type: " + typeof obj);

// ⚠️ 타입 불일치 문제 예시
if (obj === 123) {
  log("같습니다!");
} else {
  log("다릅니다! (객체와 값을 엄격히 비교했기 때문)");
}

// 2. BigInt: 'new' 사용 시 발생하는 에러
try {
  const big = new BigInt(100); 
} catch(e) {
  log("\\nBigInt Error: " + e.message);
  log("=> 덕분에 타입 혼란 없이 '값'으로만 깔끔하게 사용됩니다.");
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="5. 원시 값의 불변성 (Immutability): 철벽 방어">
        <div className="concepts">
          <p>원시 값(Number, String 등)은 메모리에 한 번 새겨지면 <strong>절대 그 내용이 바뀌지 않습니다.</strong></p>
          <p>우리가 변수 값을 바꾸는 것은 '기존 값을 수정한 것'이 아니라, <strong>'새로운 값을 만들어 갈아 끼운 것(재할당)'</strong>입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-immutability"
          initialHtml={consoleHtml}
          initialJs={`// 1. [절대 불가] 값 자체를 수정하기
let pet = "cat";
pet[0] = "b"; // "bat"으로 바꾸고 싶지만..
log("Try: pet[0] = 'b'");
log("Result: " + pet); // 여전히 "cat" (실패!)

// 2. [가능] 새로운 값으로 교체하기 (재할당)
pet = "dog"; // "cat"을 고친 게 아니라, "dog"라는 새 값을 변수에 담음
log("\\nTry: pet = 'dog'");
log("Result: " + pet); // "dog" (성공!)

// 결론: 원시 값은 '수리'해서 쓰는 게 아니라, 항상 '신제품'으로 교체해서 씁니다.`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="6. 메모리 관리 (복사본 vs 공유)">
        <div className="concepts">
          <p>메모리가 다루어지는 방식의 차이는 <strong>"데이터를 복사했을 때 어떤 일이 벌어지는가?"</strong>를 보면 가장 확실히 알 수 있습니다.</p>
          <ul>
            <li><strong>문자열 (복사본):</strong> 종이를 복사기로 복사하는 것과 같습니다. 동생의 종이에 낙서해도 내 종이는 깨끗합니다.</li>
            <li><strong>객체 (공유):</strong> 화이트보드 하나를 같이 쓰는 것과 같습니다. 친구가 화이트보드 내용을 지우면 나에게도 지워진 내용이 보입니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-memory-proof"
          initialHtml={consoleHtml}
          initialJs={`// 1. 문자열 (값 복사): "너는 너, 나는 나"
let a = "Origin";
let b = a; // 값만 복사해서 가져감
a = "Modified"; // a를 바꿨지만...

log("[String Test]");
log("a: " + a);
log("b: " + b); // b는 여전히 "Origin" (영향 없음)

// 2. 객체 (참조 공유): "우리는 한 배를 탔다"
let originalObj = { value: "Origin" };
let copiedObj = originalObj; // 메모리 주소(공유 주소)를 전달함
originalObj.value = "Modified"; // 원본의 내부를 고쳤는데...

log("\\n[Object Test]");
log("original: " + originalObj.value);
log("copied: " + copiedObj.value); // 같이 "Modified"로 변함! (공유 중)`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="7. 데이터 복사와 전달의 핵심 용어 (Terminology)">
        <div className="concepts">
          <p>자바스크립트의 데이터 전달 방식을 정확히 이해하기 위한 전문 용어들입니다.</p>
          <div className="info-table-wrapper">
            <table className="info-table">
              <thead>
                <tr>
                  <th>용어</th>
                  <th>의미</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Pass-by-Value</strong></td>
                  <td>값 자체를 복사하여 전달 (원시 타입)</td>
                </tr>
                <tr>
                  <td><strong>Pass-by-Reference</strong></td>
                  <td>메모리 주소를 직접 전달 (객체)</td>
                </tr>
                <tr>
                  <td><strong>Pass-by-Sharing</strong></td>
                  <td>자바스크립트가 실제로 사용하는 방식 (값으로서의 참조 전달)</td>
                </tr>
                <tr>
                  <td><strong>Shallow Copy</strong></td>
                  <td>1단계만 복사, 내부의 중첩 객체는 참조를 공유 (얕은 복사)</td>
                </tr>
                <tr>
                  <td><strong>Deep Copy</strong></td>
                  <td>중첩된 내부 구조까지 전부 새 메모리에 복사 (깊은 복사)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <style>{`
            .info-table-wrapper { margin: 15px 0; overflow-x: auto; }
            .info-table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 8px; font-size: 0.9rem; }
            .info-table th, .info-table td { padding: 12px; border: 1px solid #334155; text-align: left; }
            .info-table th { background: #334155; color: #94a3b8; }
            .info-table td { color: #cbd5e1; }
          `}</style>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-copy-deep"
          initialHtml={consoleHtml}
          initialJs={`// 1. Shallow Copy (얕은 복사)
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original }; // Spread 연산자는 얕은 복사를 수행함

shallow.a = 99;
shallow.nested.b = 99; // 얕은 복사라 내부 객체는 공유됨!

log("[Shallow Copy Result]");
log("original.a: " + original.a); // 1 (변경 안됨)
log("original.nested.b: " + original.nested.b); // 99 (같이 변함!)

// 2. Deep Copy (깊은 복사)
const deep = JSON.parse(JSON.stringify(original));
deep.nested.b = 1000;

log("\\n[Deep Copy Result]");
log("original.nested.b: " + original.nested.b); // 99 (영향 없음)
log("deep.nested.b: " + deep.nested.b); // 1000`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="8. 성능 팁: 효율적인 문자열 합치기">
        <div className="concepts">
          <p>반복문 안에서 대용량 데이터를 처리할 때 <strong>연산자(<code>+=</code>)</strong>를 사용하면 매번 새 문자열 인스턴스가 생성되어 성능이 저하될 수 있습니다.</p>
          <p>이럴 때는 <strong>배열(<code>push</code>)과 <code>join('')</code></strong>을 활용하는 것이 실무적인 최적화 기법입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-performance"
          initialHtml={consoleHtml}
          initialJs={`// [비효율적 방식] 매 루프마다 새로운 문자열 조각 생성
let resultBad = "";
for (let i = 0; i < 5; i++) {
  resultBad += "Step" + i + " ";
}
log("Bad Way (+=): " + resultBad);

// [효율적 방식] 배열에 담아두었다가 마지막에 한 번에 합치기
const items = [];
for (let i = 0; i < 5; i++) {
  items.push("Step" + i);
}
const resultGood = items.join(" ");
log("Good Way (join): " + resultGood);

log("\\n* 데이터가 수만 건 이상일 때 차이가 확실히 드러납니다.");`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="9. 템플릿 리터럴 (Template Literals)">
        <div className="concepts">
          <p>백틱(\`)을 활용하여 변수 삽입(Interpolation)과 여러 줄 문자열을 깔끔하게 작성합니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-basics-template"
          initialHtml={consoleHtml}
          initialJs={`const brand = "Apple";
const price = 2500000;

// \${} 를 사용한 변수 삽입
log(\`[\${brand}]의 가격은 \${price.toLocaleString()}원 입니다.\`);

// 여러 줄 문자열
const multi = \`라인 1
라인 2
라인 3\`;
log("\\n" + multi);`}
        />
      </CollapsibleSection>
      <RelatedLinks
        links={[
          {
            path: "/js/reference-types",
            title: "9. 참조 타입과 객체심화",
            description: "원시 타입과 대비되는 참조 타입(객체, 배열 등)의 동작 원리를 배웁니다.",
            icon: "🧠"
          }
        ]}
      />
    </div>
  );
};

export default JsBasicsStudy;
