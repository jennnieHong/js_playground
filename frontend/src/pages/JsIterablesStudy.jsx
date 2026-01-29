import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsIterablesStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Protocol Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 이터러블의 작동 원리를 파헤쳐 봅니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="7. 이터러블 프로토콜 (Iterables & Protocols)"
        subtitle="객체가 순회 가능해지는 마법: Symbol.iterator와 이터레이터의 내부 구조를 이해합니다."
      />

      <CollapsibleSection title="1. 이터러블 프로토콜 (Iterable Protocol)" initiallyOpen={true}>
        <div className="concepts">
          <p>자바스크립트에서 <strong>for...of</strong>나 <strong>Spread(...)</strong> 연산자를 사용할 수 있는 객체는 '이터러블'입니다.</p>
          <p>어떤 객체가 <code>Symbol.iterator</code>라는 메서드를 가지고 있다면, 그 객체는 이터러블이라고 부릅니다.</p>

          <div className="info-box">
            <strong>🤔 궁금증: fruits[Symbol.iterator]() 문법은 왜 이렇게 생겼나요?</strong>
            <p>우리가 보통 객체의 속성에 접근할 때 쓰는 <code>obj.name</code> 같은 방식은 '점 표기법(Dot Notation)'입니다. 하지만 <strong>Symbol</strong>처럼 특수한 값이나, 변수에 담긴 이름을 키로 쓸 때는 반드시 <strong>대괄호 표기법(Bracket Notation)</strong>을 써야 합니다.</p>
            <ul>
              <li><code>fruits[0]</code>: 0번째 인덱스(숫자 키)에 접근</li>
              <li><code>fruits["length"]</code>: "length"라는 이름의 속성(문자열 키)에 접근</li>
              <li><code>fruits[Symbol.iterator]</code>: 엔진이 약속한 이터레이터 생성 메서드(심볼 키)에 접근</li>
            </ul>
            <p>즉, <code>fruits[Symbol.iterator]()</code>는 "fruits 객체 안에 숨겨진 '순회용 함수'를 꺼내서 지금 바로 실행(<code>()</code>)해라!"라는 뜻입니다.</p>
          </div>

          <div className="info-box">
            <strong>👀 함수 그 자체를 보는 방법 (Function Visibility)</strong>
            <p>함수는 단순한 '값'이 아니라 실행 가능한 '코드 뭉치'입니다. 이를 확인하는 방법은 다음과 같습니다.</p>
            <ul>
              <li><strong>console.log(fn)</strong>: 브라우저 콘솔은 함수를 출력할 때 내부적으로 코드를 보여주려 노력합니다.</li>
              <li><strong>fn.toString()</strong>: 함수의 소스코드를 문자열로 직접 변환합니다.</li>
              <li><strong>[native code]</strong>: 엔진 내부에 C++ 등으로 구현된 빌트인 함수(예: <code>Symbol.iterator</code>)는 보안과 성능상의 이유로 소스코드를 숨기고 <code>[native code]</code>라고만 표시합니다.</li>
            </ul>
          </div>

          <div className="info-box">
            <strong>🧱 원리: 왜 배열을 만들자마자 이런 속성이 있나요?</strong>
            <p>자바스크립트의 모든 배열은 선언되는 순간 <strong>프로토타입(Prototype)</strong>이라는 유전자 지도를 물려받습니다.</p>
            <ul>
              <li>우리가 <code>[]</code>를 만드는 순간, JS 엔진은 이 배열을 <strong>Array.prototype</strong>이라는 거대한 부모 객체와 연결합니다.</li>
              <li>그 부모 객체 안에 <code>push</code>, <code>map</code>, 그리고 <code>Symbol.iterator</code> 같은 모든 '능력치'가 미리 정의되어 있습니다.</li>
              <li>그래서 우리는 아무것도 하지 않아도 이 모든 기능을 상속받아 즉시 사용할 수 있는 것입니다.</li>
            </ul>
          </div>

          <ul>
            <li><strong>빌트인 이터러블:</strong> Array, String, Map, Set, NodeList 등</li>
            <li><strong>핵심 특징:</strong> <code>for...of</code>로 순회 가능, <code>[...]</code> 로 변환 가능</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-iter-basic"
          initialHtml={consoleHtml}
          initialJs={`const arr = [10, 20];
const str = "Hi";

// 1. 내부의 iterator 메서드 확인
log("Array has iterator: " + (typeof arr[Symbol.iterator]));
log("String has iterator: " + (typeof str[Symbol.iterator]));

// 2. 이터레이터 직접 호출해보기
const iteratorFn = arr[Symbol.iterator];
log("\\n--- Function Inspection ---");
log("Type: " + typeof iteratorFn);
log("Print Fn: " + iteratorFn); // 자동으로 .toString() 호출됨
log("toString(): " + iteratorFn.toString());

const iterator = iteratorFn.call(arr); // arr[Symbol.iterator]() 와 동일
log("\\n--- Iterator Result ---");
log(JSON.stringify(iterator.next())); // {value: 10, done: false}
log(JSON.stringify(iterator.next())); // {value: 20, done: false}
log(JSON.stringify(iterator.next())); // {value: undefined, done: true}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 이터레이터 프로토콜 (Iterator Protocol)">
        <div className="concepts">
          <p>이터러블에서 호출된 '이터레이터' 객체가 지켜야 할 약속입니다.</p>
          <p>이터레이터는 반드시 <code>next()</code> 메서드를 가져야 하며, 이 메서드는 <code>{'{value, done}'}</code> 객체를 반환해야 합니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-iter-protocol"
          initialHtml={consoleHtml}
          initialJs={`const fruits = ["🍎", "🍋"];
const it = fruits[Symbol.iterator]();

while (true) {
  const { value, done } = it.next();
  if (done) break;
  log("Fruit: " + value);
}

log("\\n순회 끝!");`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 커스텀 이터러블 만들기 (Custom Iterable)">
        <div className="concepts">
          <p>일반 객체도 <code>Symbol.iterator</code>를 직접 구현하면 <strong>for...of</strong>를 쓸 수 있는 이터러블이 됩니다.</p>
          <p>이것은 <strong>데이터의 흐름(Stream)</strong>을 직접 제어하고 싶을 때 매우 유용합니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-iter-custom"
          initialHtml={consoleHtml}
          initialJs={`// 1부터 n까지 숫자를 내뱉는 커스텀 이터러블
const range = {
  from: 1,
  to: 3,

  [Symbol.iterator]() {
    let current = this.from;
    let end = this.to;

    // 이 객체가 바로 이터레이터
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

log("--- Custom Range Loop ---");
for (let num of range) {
  log(num);
}

log("\\n--- Spread Operator ---");
log("Array: [" + [...range] + "]");`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. 실무 활용 및 주의사항">
        <div className="concepts">
          <blockquote>
            <strong>💡 알아두면 좋은 팁:</strong>
            <ul>
              <li><strong>유사 배열 vs 이터러블:</strong> <code>length</code>와 인덱스가 있다고 해서 무조건 이터러블은 아닙니다. (예: 구형 브라우저의 전용 객체). 이럴 땐 <code>Array.from()</code>을 쓰면 이터러블로 변환됩니다.</li>
              <li><strong>이터러블 재사용:</strong> 이터레이터는 한 번 끝(`done: true`)까지 가면 다시 쓸 수 없습니다. 새롭게 순회하려면 다시 <code>Symbol.iterator</code>를 호출해야 합니다.</li>
            </ul>
          </blockquote>
        </div>
        <LiveCodeEditor
          scopeId="js-iter-usage"
          initialHtml={consoleHtml}
          initialJs={`// 유사 배열(Array-like) 객체
const arrayLike = { 0: "Hello", 1: "World", length: 2 };

try {
  for (let item of arrayLike) { log(item); }
} catch (e) {
  log("Error (Not Iterable): " + e.message, true);
}

// Array.from()을 통한 변환
const realArray = Array.from(arrayLike);
log("\\nAfter Array.from():");
for (let item of realArray) {
  log(item);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="5. 실무에서의 실용성: 커스텀 이터러블, 진짜 많이 쓰나요?">
        <div className="concepts">
          <p>결론부터 말씀드리면, <strong>"매일 직접 구현할 일은 드물지만, 그 원리를 아는 것은 매우 중요하다"</strong>입니다.</p>

          <div className="info-grid">
            <div className="info-card">
              <h4>✅ 실제로 쓰는 경우 (Why we use it)</h4>
              <ul>
                <li><strong>대용량 데이터 최적화:</strong> 수만 개의 데이터를 배열로 미리 만들지 않고, 필요한 시점에 하나씩 생성(Lazy Evaluation)하여 메모리를 아낍니다.</li>
                <li><strong>복잡한 구조 순회:</strong> 트리(Tree)나 그래프 형태의 데이터를 <code>for...of</code>로 직관적으로 돌게 하고 싶을 때 인터페이스를 제공합니다.</li>
                <li><strong>라이브러리 제작:</strong> 나만의 데이터 컬렉션을 만들 때, 표준 문법(Spread, Destructuring)을 지원하기 위해 구현합니다.</li>
              </ul>
            </div>
            <div className="info-card">
              <h4>⚠️ 자주 보기 힘든 이유 (The Reality)</h4>
              <ul>
                <li><strong>강력한 빌트인:</strong> Array, Map, Set만으로도 실무의 95%는 해결됩니다.</li>
                <li><strong>제너레이터의 등장:</strong> <code>Symbol.iterator</code>를 직접 길게 짜는 것보다 <strong>Generator(yield)</strong>를 쓰는 게 훨씬 쉽기 때문입니다.</li>
              </ul>
            </div>
          </div>

          <blockquote>
            <strong>💡 결론:</strong> 직접 만드는 제작자(5~10%)보다는, 모든 내장 객체가 이터러블이라는 점을 활용하는 <strong>사용자(100%)</strong>로서의 비중이 훨씬 큽니다. 하지만 고급 개발자로 갈수록 이 '규약(Protocol)'을 이해하는 것이 성능 최적화의 열쇠가 됩니다.
          </blockquote>
        </div>

        <h4 style={{ margin: '2rem 0 1rem 0', color: '#1e293b' }}>📊 실전 예제: 커스텀 데이터 구조 (Linked List)</h4>
        <div className="concepts">
          <p>배열이 아닌 <strong>연결 리스트(Linked List)</strong> 같은 복잡한 자료구조도 이터러블로 만들면 <code>for...of</code>로 아주 쉽게 순회할 수 있습니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-iter-linked-list"
          initialHtml={consoleHtml}
          initialJs={`// 1. 노드 클래스
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// 2. 연결 리스트 클래스 (이터러블 구현)
class LinkedList {
  constructor() {
    this.head = null;
  }

  add(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) current = current.next;
      current.next = newNode;
    }
  }

  // ★ 이터러블 프로토콜 구현
  [Symbol.iterator]() {
    let current = this.head;
    
    return {
      next() {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}

const list = new LinkedList();
list.add("Step 1: Init");
list.add("Step 2: Process");
list.add("Step 3: Done");

log("--- Linked List Traversal ---");
// 이터러블이라 for...of가 가능합니다!
for (const step of list) {
  log("🏃 " + step);
}

log("\\n--- Spread Operator ---");
log("Converted to Array: [" + [...list] + "]");`}
        />
      </CollapsibleSection>

      <RelatedLinks
        links={[
          {
            path: "/js/reference-types",
            title: "9. 참조 타입과 객체심화",
            description: "이터러블의 기반이 되는 다양한 객체 주소 체계와 참조 타입을 이해합니다.",
            icon: "🧠"
          },
          {
            path: "/js/arrays",
            title: "11. 배열 마스터 (Arrays Mastery)",
            description: "가장 대표적인 이터러블인 배열의 강력한 메서드들을 알아봅니다.",
            icon: "📊"
          }
        ]}
      />
    </div>
  );
};

export default JsIterablesStudy;
