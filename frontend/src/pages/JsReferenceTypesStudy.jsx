import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsReferenceTypesStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Type Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 참조 타입의 비밀을 파헤쳐 봅니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="9. 참조 타입과 객체 (Reference Types)"
        subtitle="왜 자바스크립트는 '거의 모든 것이 객체'라고 할까요? 원시 타입 이외의 모든 컬렉션과 래퍼 객체를 철저히 분석합니다."
      />

      <CollapsibleSection title="1. 원시 타입 vs 참조 타입 (Memory)" initiallyOpen={true}>
        <div className="concepts">
          <p>자바스크립트의 데이터 타입은 크게 <strong>원시 타입(Primitive)</strong>과 <strong>참조 타입(Reference)</strong>으로 나뉩니다.</p>
          <ul>
            <li><strong>원시 타입 (7가지):</strong> Number, String, Boolean, Null, Undefined, Symbol, BigInt. 값 자체가 변수에 직접 저장됩니다.</li>
            <li><strong>참조 타입 (전부 객체):</strong> Array, Object, Map, Set, Date, RegExp 등. 변수에는 실제 데이터가 있는 <strong>메모리 주소</strong>가 저장됩니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-ref-basics"
          initialHtml={consoleHtml}
          initialJs={`// 1. 원시 타입: "복사본을 줌"
let x = 10;
let y = x;
x = 20;
log(\`Primitive: x=\${x}, y=\${y}\`); // y는 변하지 않음

// 2. 참조 타입: "열쇠(주소)를 공유함"
let user = { name: "Jenny" };
let copy = user;
user.name = "Lisa";
log(\`\\nReference: user=\${user.name}, copy=\${copy.name}\`); // 같이 변함!`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 빌트인 객체들 (Array, Map, Set)">
        <div className="concepts">
          <p>사용자가 직접 정의하지 않아도 자바스크립트가 기본으로 제공하는 '특수 목적 객체'들입니다.</p>
          <p>이들은 사실 모두 <code>Object</code>라는 거대한 뿌리에서 뻗어나온 형태입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-ref-builtins"
          initialHtml={consoleHtml}
          initialJs={`const arr = [1, 2];
const map = new Map();
const set = new Set();

log("Type of Array: " + typeof arr); // "object"
log("Type of Map: " + typeof map);   // "object"
log("Type of Set: " + typeof set);   // "object"

// 모든 참조 타입은 결국 '객체' 계보를 따릅니다.
log("\\n--- Instance Check ---");
log("Array is Object? " + (arr instanceof Object));
log("Map is Object? " + (map instanceof Object));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 래퍼 객체 (Wrapper Objects)의 정체">
        <div className="concepts">
          <p>글자(`"string"`)나 숫자(`123`)는 원시 타입인데, 왜 마침표(`.`)를 찍으면 메서드를 쓸 수 있을까요?</p>
          <p>엔진이 메서드를 사용하는 순간만 원시 값을 <strong>잠시 객체로 포장(Boxing)</strong>하기 때문입니다.</p>

          <div className="info-box danger" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '15px' }}>
            <strong>🚫 수동 래퍼 객체 생성을 비권장하는 이유 (new 사용)</strong>
            <p><code>const obj = new String("hi");</code> 처럼 <code>new</code> 키워드를 사용하는 방식은 다음과 같은 치명적인 단점이 있습니다.</p>
            <ul>
              <li><strong>일관성 없는 typeof:</strong> <code>typeof "hi"</code>는 "string"이지만, <code>new String("hi")</code>는 <strong>"object"</strong>입니다.</li>
              <li><strong>비교 연산의 함정:</strong> <code>"hi" === new String("hi")</code>는 <strong>false</strong>입니다. (값 vs 객체 주소)</li>
              <li><strong>객체끼리의 비교:</strong> <code>new String("hi") === new String("hi")</code> 역시 <strong>false</strong>입니다. (서로 다른 메모리 주소)</li>
              <li><strong>성능 저하:</strong> 불필요한 객체 생성으로 메모리와 CPU를 소모합니다.</li>
            </ul>
          </div>

          <div className="info-box success" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <strong>✅ 그럼 '언제' 쓰나요? (사용 권장 패턴)</strong>
            <ul>
              <li><strong>명시적 형변환 (as Functions)</strong>: <code>new</code> 없이 함수처럼 호출하면 아주 유용합니다.
                <ul>
                  <li><code>String(123)</code>: 숫자를 문자열로 안전하게 변환</li>
                  <li><code>Number("123")</code>: 문자열을 숫자로 변환</li>
                  <li><code>Boolean(value)</code>: truthy/falsy 여부를 확인 (<code>!!value</code>와 동일)</li>
                </ul>
              </li>
              <li><strong>내장 메서드 사용 (Automatic)</strong>: 우리가 <code>"abc".length</code>를 쓸 때, 엔진은 우리 몰래 래퍼 객체를 만들어서 메서드를 처리해줍니다. 즉, 우리는 <strong>가만히 있어도 혜택을 받고 있는 셈</strong>입니다.</li>
            </ul>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-ref-wrappers"
          initialHtml={consoleHtml}
          initialJs={`// 1. 원시 문자열 (권장)
const str = "hello";
log("Primitive: " + typeof str); // "string"

// 2. 수동 래퍼 객체 (비권장)
const strObj = new String("hello");
log("Wrapper Object: " + typeof strObj); // "object"

// 3. 비교 결과의 차이
log("\\n--- Comparison ---");
log("str == strObj: " + (str == strObj));   // true (값 비교)
log("str === strObj: " + (str === strObj)); // false (타입이 다름!)

log("\\n--- Object vs Object ---");
const obj1 = new String("js");
const obj2 = new String("js");
log("obj1 === obj2: " + (obj1 === obj2)); // false (주소가 다름!)`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. 실전: 배열과 객체 구분하기 (Logic Processing)">
        <div className="concepts">
          <p>데이터가 배열인지 일반 객체인지에 따라 로직을 다르게 처리해야 할 때가 많습니다.</p>
          <div className="info-box">
            <strong>⚠️ typeof의 한계</strong>
            <p><code>typeof []</code>와 <code>typeof {'{}'}</code>는 모두 <strong>"object"</strong>를 반환합니다. 따라서 <code>typeof</code>만으로는 둘을 구분할 수 없습니다.</p>
          </div>
          <ul>
            <li><strong>최선의 방법:</strong> <code>Array.isArray(data)</code>를 사용합니다.</li>
            <li><strong>고급 방법:</strong> <code>instanceof Array</code>를 사용하거나 프로토타입 체인을 직접 확인합니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-ref-distinguish"
          initialHtml={consoleHtml}
          initialJs={`function processData(data) {
  if (Array.isArray(data)) {
    log("입력값은 [배열]입니다. 순회를 시작합니다.");
    log("Result: " + data.map(x => x * 2));
  } else if (data !== null && typeof data === 'object') {
    log("입력값은 {객체}입니다. 키-값을 분석합니다.");
    log("Keys: " + Object.keys(data));
  } else {
    log("입력값은 [원시 타입] 혹은 null입니다.");
  }
}

log("--- Test 1 (Array) ---");
processData([1, 2, 3]);

log("\\n--- Test 2 (Object) ---");
processData({ id: 1, name: "Antigravity" });

log("\\n--- Test 3 (Null) ---");
processData(null); // null은 typeof가 'object'이므로 별도 처리가 필요!`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="5. JSON과 참조 타입 (Parsing & Identification)">
        <div className="concepts">
          <p>서버에서 넘어온 데이터는 보통 <strong>JSON(문자열)</strong> 형식입니다. 이를 자바스크립트에서 쓰려면 먼저 <strong>객체나 배열로 변환(Parsing)</strong>해야 합니다.</p>
          <div className="info-box">
            <strong>❓ JSON은 객체의 특별한 형식인가요?</strong>
            <p>엄밀히 말하면 **아니요**입니다. 객체는 자바스크립트 엔진 메모리에 담긴 **'실체'**이고, JSON은 데이터를 주고받기 위해 그 실체를 글로 옮겨적은 **'텍스트(문자열)'**입니다.</p>
            <strong>❓ JSON인지 객체인지 어떻게 아나요?</strong>
            <ul>
              <li><strong>JSON</strong>: 따옴표로 둘러싸인 <strong>문자열(String)</strong>입니다. (<code>typeof</code> 결과가 "string")</li>
              <li><strong>객체/배열</strong>: <code>JSON.parse()</code>를 거친 후의 <strong>참조 타입</strong>입니다. (<code>typeof</code> 결과가 "object")</li>
            </ul>
            <div className="info-table-wrapper">
              <table className="info-table">
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>자바스크립트 객체 (Object)</th>
                    <th>JSON (JavaScript Object Notation)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>정체</strong></td>
                    <td>메모리에 존재하는 <strong>데이터 구조</strong></td>
                    <td>데이터를 표현한 <strong>문자열 (텍스트)</strong></td>
                  </tr>
                  <tr>
                    <td><strong>키(Key)</strong></td>
                    <td>따옴표 없이도 사용 가능</td>
                    <td>반드시 **큰따옴표(`" "`)** 필수</td>
                  </tr>
                  <tr>
                    <td><strong>데이터 타입</strong></td>
                    <td>함수, 메서드, 심볼 등 모두 포함 가능</td>
                    <td>문자열, 숫자, 불리언, 객체, 배열, null만 가능 (함수 불가)</td>
                  </tr>
                  <tr>
                    <td><strong>유연성</strong></td>
                    <td>마지막 컴마(trailing comma) 허용 등 유연함</td>
                    <td>매우 엄격함 (작은 실수도 파싱 에러 발생)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>💡 즉, JSON은 객체를 어딘가로 보내기 위해 **'규격화하여 종이에 적어놓은 설계도'**라고 생각하면 쉽습니다.</p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-ref-json"
          initialHtml={consoleHtml}
          initialJs={`const jsonResponse = '{"name": "Antigravity", "tags": ["AI", "Agent"]}';

function handleData(input) {
  // 1. 우선 JSON(문자열)인지 확인
  if (typeof input === "string") {
    log("입력값은 [JSON 문자열]입니다. 파싱을 시도합니다...");
    try {
      const parsed = JSON.parse(input);
      handleData(parsed); // 재귀적으로 다시 처리
    } catch (e) {
      log("Error: 유효한 JSON 형식이 아닙니다.", true);
    }
    return;
  }

  // 2. 파싱된 데이터의 정체 파악 (배열 vs 객체)
  if (Array.isArray(input)) {
    log("결과: [배열] 데이터입니다. 개수: " + input.length);
  } else if (input !== null && typeof input === "object") {
    log("결과: {객체} 데이터입니다. 이름: " + input.name);
  }
}

log("--- Case 1: JSON String ---");
handleData(jsonResponse);

log("\\n--- Case 2: Already Object ---");
handleData({ name: "Manual Object" });`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="6. JSON 사용 시 주의사항 (JSON Precautions)">
        <div className="concepts">
          <p>JSON은 매우 엄격한 규격을 가진 텍스트 형식이므로, 자바스크립트 객체를 다룰 때와는 다른 **세 가지 치명적인 차이점**을 기억해야 합니다.</p>
          
          <div className="info-grid">
            <div className="info-card warning">
              <h4>1. 문법의 엄격함</h4>
              <ul>
                <li><strong>따옴표</strong>: 무조건 큰따옴표(<code>"</code>)만 허용합니다. 작은따옴표(<code>'</code>)는 에러입니다.</li>
                <li><strong>마지막 콤마</strong>: 마지막 요소 뒤에 콤마(<code>,</code>)를 붙이면 파싱 에러가 발생합니다.</li>
              </ul>
            </div>
            <div className="info-card danger">
              <h4>2. 데이터의 소실 (JSON Loss)</h4>
              <p>객체를 <code>JSON.stringify</code>로 변환할 때 다음 데이터들은 <strong>완전히 무시되거나 null</strong>로 바뀝니다.</p>
              <ul>
                <li>함수(Methods), Undefined, Symbol</li>
              </ul>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-json-precaution"
          initialHtml={consoleHtml}
          initialJs={`const myObj = {
  name: "Jenny",
  age: undefined,               // 소실됨
  sayHi: () => log("Hi!"),      // 소실됨
  [Symbol("id")]: 123           // 소실됨
};

// 1. 문자열로 변환 (직렬화)
const jsonStr = JSON.stringify(myObj);
log("JSON Result: " + jsonStr); 
// {"name":"Jenny"} 만 남음!

// 2. 파싱 에러 대응 (try-catch 필수)
const badJson = '{ name: "Single Quotes" }'; // 키에 따옴표가 없거나 작은따옴표면 에러
try {
  JSON.parse(badJson);
} catch (e) {
  log("\\nParsing Error: " + e.message, true);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="7. 정리: 타입 판별법">
        <div className="concepts">
          <p>데이터의 정체를 정확히 파악하기 위한 가이드입니다. 더 자세한 내용은 <strong>[타입 판별 끝판왕](/js/type-checking)</strong> 페이지에서 확인할 수 있습니다.</p>
          <div className="info-table-wrapper">
            <table className="info-table">
              <thead>
                <tr>
                  <th>대상</th>
                  <th>사용할 도구</th>
                  <th>결과 예시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>원시 타입</td>
                  <td><code>typeof</code></td>
                  <td>"number", "string", "boolean"...</td>
                </tr>
                <tr>
                  <td>객체/배열</td>
                  <td><code>typeof</code></td>
                  <td>"object" (모두 동일함)</td>
                </tr>
                <tr>
                  <td>구체적 종류</td>
                  <td><code>instanceof</code></td>
                  <td>arr instanceof Array (true)</td>
                </tr>
                <tr>
                  <td>배열 여부</td>
                  <td><code>Array.isArray()</code></td>
                  <td>true / false</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      <RelatedLinks
        links={[
          {
            path: "/js/array-like",
            title: "10. 유사 배열 객체",
            description: "배열과 비슷하지만 상속받는 유전자가 다른 유사 배열의 정체를 알아봅니다.",
            icon: "🎭"
          },
          {
            path: "/js/iterables",
            title: "7. 이터러블 프로토콜",
            description: "다양한 참조 타입들이 순회 가능한 이유를 파헤칩니다.",
            icon: "➰"
          }
        ]}
      />
      <style>{`
        .info-table-wrapper { margin: 15px 0; overflow-x: auto; }
        .info-table { width: 100%; border-collapse: collapse; background: var(--bg-secondary); border-radius: 8px; font-size: 0.9rem; }
        .info-table th, .info-table td { padding: 12px; border: 1px solid var(--border-color); text-align: left; }
        .info-table th { background: var(--bg-tertiary); color: var(--text-primary); }
        .info-table td { color: var(--text-secondary); }
      `}</style>
    </div>
  );
};

export default JsReferenceTypesStudy;
