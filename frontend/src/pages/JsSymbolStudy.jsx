import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsSymbolStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Symbol Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 결과를 확인하세요.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="7. Symbol 심화 (Symbol Deep Dive)"
        subtitle="자바스크립트의 가장 유니크한 원시 타입인 Symbol의 개념부터 실무 활용 사례까지 완벽하게 파헤칩니다."
      />

      <CollapsibleSection title="1. Symbol이란 무엇인가?" initiallyOpen={true}>
        <div className="concepts">
          <p><code>Symbol</code>은 ES6에서 추가된 7번째 원시 타입입니다. 가장 큰 특징은 <strong>'절대 중복되지 않는 고유한 값'</strong>을 생성한다는 점입니다.</p>
          <div className="info-grid">
            <div className="info-card">
              <h4>불변성 (Immutability)</h4>
              <p>한 번 생성된 심볼은 변경할 수 없습니다.</p>
            </div>
            <div className="info-card">
              <h4>유일무이성 (Uniqueness)</h4>
              <p>동일한 설명(Description)을 가진 심볼이라도 서로 다릅니다.</p>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-symbol-basics"
          initialHtml={consoleHtml}
          initialJs={`// 1. 심볼 생성
const sym1 = Symbol("mySymbol");
const sym2 = Symbol("mySymbol");

log("Type check: " + typeof sym1);
log("sym1 === sym2: " + (sym1 === sym2)); // false!

// 2. 설명(description) 확인
log("Description: " + sym1.description);

// 3. 'new' 사용 불가
try {
  const bad = new Symbol(); 
} catch(e) {
  log("\\nError: " + e.message); // Symbol is not a constructor
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 객체의 '은밀한' 키로 활용하기">
        <div className="concepts">
          <p>심볼의 주된 용도는 객체의 속성 키로 사용하는 것입니다. 심볼로 정의된 속성은 일반적인 방법으로는 열거(Enumeration)되지 않아, 공개하고 싶지 않은 내부 로직을 숨길 때 유용합니다.</p>
          <ul>
            <li><code>Object.keys()</code>나 <code>for...in</code> 루프에서 제외됩니다.</li>
            <li>심볼 키를 알고 있는 경우에만 접근이 가능합니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-symbol-keys"
          initialHtml={consoleHtml}
          initialJs={`const hiddenId = Symbol('id');
const user = {
  name: "Jenny",
  [hiddenId]: 12345
};

// 1. 일반적인 조회
log("Object keys: " + Object.keys(user)); // ["name"]
log("for...in result:");
for(let key in user) log(" - " + key); // name 만 보임

// 2. 값 접근
log("\\nDirect access: " + user[hiddenId]); // 12345

// 3. 심볼 키만 가져오기
const symbols = Object.getOwnPropertySymbols(user);
log("Symbols in object: " + symbols[0].toString());`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 전역 심볼 저장소 (Symbol.for)">
        <div className="concepts">
          <p>가끔은 이름이 같은 심볼을 서로 다른 파일이나 모듈에서 공유해야 할 때가 있습니다. 이때 <code>Symbol.for()</code>를 사용합니다.</p>
          <ul>
            <li>전역 레지스트리에서 해당 키로 등록된 심볼이 있는지 찾고, 없으면 새로 만듭니다.</li>
            <li>같은 키를 쓰면 어디서든 같은 심볼을 보장받습니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-symbol-for"
          initialHtml={consoleHtml}
          initialJs={`// 1. Symbol.for(): 공유 심볼
const globalSym1 = Symbol.for("app.id");
const globalSym2 = Symbol.for("app.id");

log("Symbol.for check: " + (globalSym1 === globalSym2)); // true!

// 2. Symbol.keyFor(): 심볼로 키 찾기
log("Key for globalSym1: " + Symbol.keyFor(globalSym1));

// 3. 일반 Symbol()은 레지스트리에 등록되지 않음
const localSym = Symbol("local");
log("Key for localSym: " + Symbol.keyFor(localSym)); // undefined`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. Well-known Symbols (내장 심볼 파헤치기)">
        <div className="concepts">
          <p>자바스크립트 엔진은 특정 동작(반복, 타입 변환 등)을 수행할 때 미리 정해진 내부 심볼을 확인합니다. 이를 통해 우리가 만든 객체의 본질적인 동작을 커스터마이징할 수 있습니다.</p>
          
          <blockquote className="comparison-note">
            <strong>🤔 Getter/Setter와 무엇이 다른가요?</strong>
            <ul>
              <li><strong>Getter/Setter:</strong> 객체의 특정 <strong>속성(Property)</strong> 값을 읽고 쓰는 '통로'를 통제합니다.</li>
              <li><strong>Symbol.toPrimitive:</strong> 객체 <strong>전체(Instance)</strong>가 연산식 등에서 어떻게 '해석'될지 그 '본질'을 통제합니다.</li>
            </ul>
          </blockquote>

          {/* 4.1 Symbol.toStringTag */}
          <div className="symbol-sub-section">
            <h4>4.1 Symbol.toStringTag - 나만의 타입 이름표</h4>
            <p><code>Object.prototype.toString()</code> 호출 시 반환되는 <code>[object ...]</code>의 이름을 변경합니다. 라이브러리 제작 시 객체의 정체성을 명확히 드러낼 때 사용합니다.</p>
            <LiveCodeEditor
              scopeId="js-symbol-stringtag"
              initialHtml={consoleHtml}
              initialJs={`const myItem = {
  [Symbol.toStringTag]: "VipUser"
};

// 기본 객체는 [object Object]가 나오지만, 내 객체는 다릅니다.
log("결과: " + Object.prototype.toString.call(myItem)); 
log("Type: " + typeof myItem); // 여전히 'object'이지만 태그는 VipUser!`}
            />
          </div>

          {/* 4.2 Symbol.hasInstance */}
          <div className="symbol-sub-section">
            <h4>4.2 Symbol.hasInstance - instanceof 동작 커스텀</h4>
            <p><code>instanceof</code> 연산자가 이 객체를 '자신의 인스턴스'로 판단할지 기준을 정합니다. 클래스가 아니어도 클래스처럼 행동하게 만들 수 있습니다.</p>
            <LiveCodeEditor
              scopeId="js-symbol-hasinstance"
              initialHtml={consoleHtml}
              initialJs={`const EvenChecker = {
  [Symbol.hasInstance](instance) {
    return Number.isInteger(instance) && instance % 2 === 0;
  }
};

log("10은 EvenChecker인가? : " + (10 instanceof EvenChecker)); // true
log("7은 EvenChecker인가? : " + (7 instanceof EvenChecker));   // false
log("'10'은 EvenChecker인가? : " + ("10" instanceof EvenChecker)); // false`}
            />
          </div>

          {/* 4.3 Symbol.isConcatSpreadable */}
          <div className="symbol-sub-section">
            <h4>4.3 Symbol.isConcatSpreadable - 배열 펼치기 방지</h4>
            <p><code>Array.concat()</code> 메서드로 배열을 합칠 때, 해당 객체를 요소별로 펼칠지 아니면 덩어리째 넣을지를 결정합니다.</p>
            <LiveCodeEditor
              scopeId="js-symbol-spreadable"
              initialHtml={consoleHtml}
              initialJs={`const alpha = ['a', 'b'];
const numeric = [1, 2];

// 기본 동작: 숫자들이 펼쳐집니다.
log("기본 concat: " + JSON.stringify(alpha.concat(numeric)));

// 펼치지 않도록 설정
numeric[Symbol.isConcatSpreadable] = false;
log("펼치기 방지: " + JSON.stringify(alpha.concat(numeric)));`}
            />
          </div>

          {/* 4.4 Symbol.iterator */}
          <div className="symbol-sub-section">
            <h4>4.4 Symbol.iterator - 반복 프로토콜 구현</h4>
            <p>일반 객체를 <code>for...of</code>나 <code>...spread</code> 연산자에서 사용할 수 있는 '반복 가능한 객체'로 만듭니다. <code>next()</code> 메서드를 가진 객체를 반환해야 합니다.</p>
            <LiveCodeEditor
              scopeId="js-symbol-iterator-v2"
              initialHtml={consoleHtml}
              initialJs={`const countdown = {
  from: 5,
  to: 0,
  [Symbol.iterator]() {
    let current = this.from;
    const end = this.to;
    return {
      next() {
        if (current >= end) {
          return { value: current--, done: false };
        }
        return { done: true };
      }
    };
  }
};

log("카운트다운 시작:");
for (let n of countdown) {
  log(" - " + n);
}
log("전개 연산자 활용: " + [...countdown]);`}
            />
          </div>

          {/* 4.5 Symbol.toPrimitive */}
          <div className="symbol-sub-section">
            <h4>4.5 Symbol.toPrimitive - 형변환의 절대 권력</h4>
            <p>객체가 숫자로 더해지거나 문자로 출력될 때 마다 엔진은 <code>hint</code>(number, string, default)를 넘겨주며 해석을 요청합니다.</p>
            <LiveCodeEditor
              scopeId="js-symbol-primitive-v2"
              initialHtml={consoleHtml}
              initialJs={`const bankAccount = {
  balance: 50000,
  [Symbol.toPrimitive](hint) {
    log(\`[Engine Requested]: \${hint}\`);
    
    if (hint === 'number') {
      // 누군가 이 객체로 산술 연산을 시도하면 잔액을 보여줍니다.
      return this.balance;
    }
    if (hint === 'string') {
      // 문자로 출력하려 하면 포맷팅된 문자열을 보여줍니다.
      return \`현재 잔액: \${this.balance}원\`;
    }
    return \`Account(\${this.balance})\`;
  }
};

log("1. 예금 인출 시뮬레이션 (number):");
log("   현재 잔고 - 10000 = " + (bankAccount - 10000));

log("\\n2. 계좌 정보 출력 (string):");
log("   " + String(bankAccount));

log("\\n3. 애매한 상황 (default):");
log("   " + (bankAccount + " !!"));`}
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="5. 실무 활용 사례: '나만의 비밀 주머니'">
        <div className="concepts">
          <p>객체라는 상자에 물건들이 담겨있을 때, 남들은 절대 열어볼 수 없는 <strong>'비밀 주머니'</strong>를 하나 만든다고 생각해보세요.</p>
          <div className="info-grid">
            <div className="info-card">
              <h4>왜 쓸까요?</h4>
              <p>내가 만든 객체를 다른 팀원이나 오픈소스 라이브러리가 사용할 때, 실수로 내 데이터를 덮어쓰거나 지우는 일을 완벽히 방지하기 위해서입니다.</p>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-symbol-practical"
          initialHtml={consoleHtml}
          initialJs={`// [상황] 팀 프로젝트에서 'user' 객체를 공유해서 쓰고 있습니다.
const user = {
  name: "김철수",
  level: 5
};

// [문제] 누군가 실수로 user.level = 1; 이라고 하면 레벨이 깎여버립니다.

// [해결] 나만 알고 있는 '내부용 레벨'을 심볼로 만듭니다.
const REAL_LEVEL = Symbol('내 진짜 레벨');
user[REAL_LEVEL] = 999;

// 1. 일반적인 방법으론 'REAL_LEVEL'이 있다는 것조차 모릅니다.
log("목록 확인: " + Object.keys(user)); // ["name", "level"]
log("JSON 출력: " + JSON.stringify(user)); // {"name":"김철수","level":5}

// 2. 하지만 나는 이 심볼을 알고 있으므로 안전하게 값을 꺼내옵니다.
log("진짜 레벨은? " + user[REAL_LEVEL]); // 999

// 결론: 다른 사람이 user 객체에 어떤 짓을 해도 REAL_LEVEL은 안전하게 보호됩니다.`}
        />
      </CollapsibleSection>

      <div className="concepts">
        <div className="summary-banner">
          <h4>💡 Symbol을 왜 써야 할까요?</h4>
          <p>
            가장 큰 이유는 <strong>'이름 충돌 방지'</strong>입니다. 대규모 프로젝트나 라이브러리를 개발할 때, 
            기존 객체의 속성을 덮어쓰지 않고 안전하게 기능을 추가하고 싶다면 `Symbol`이 최선의 선택입니다.
          </p>
        </div>
      </div>

      <RelatedLinks
        links={[
          {
            path: "/js/basics",
            title: "1. 변수와 문법 기초",
            description: "원시 데이터 타입의 전반적인 개념을 복습합니다.",
            icon: "💎"
          },
          {
            path: "/js/iterables",
            title: "7. Iterables & Protocol",
            description: "Symbol.iterator를 활용한 반복 프로토콜을 더 자세히 배웁니다.",
            icon: "➰"
          }
        ]}
      />
    </div>
  );
};

export default JsSymbolStudy;
