import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsLoopsStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Advanced Loops</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 루프의 모든 것을 탐구합니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="6. 반복문 (Loops)"
        subtitle="코드의 효율성 극대화: 단순 반복을 넘어 객체와 배열, 그리고 이터러블을 완벽하게 순회하는 법을 배웁니다."
      />

      <CollapsibleSection title="1. 기본 루프: for & while" initiallyOpen={true}>
        <div className="concepts">
          <p>전통적인 방식의 반복문입니다. 제어권이 개발자에게 가장 많이 주어집니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-loops-basic"
          initialHtml={consoleHtml}
          initialJs={`// 1. For: 횟수가 명확할 때
log("--- Standard For ---");
for (let i = 0; i < 3; i++) {
  log(\`Index \${i}\`);
}

// 2. While: 조건이 유지되는 동안 (예: 데이터 발견할 때까지)
log("\\n--- While (Random) ---");
let num = 0;
while (num < 0.8) {
  num = Math.random();
  log(\`Random: \${num.toFixed(2)}\`);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. for...of: 이터러블 순회 (Value 중심)">
        <div className="concepts">
          <p>배열, 문자열, Map, Set 등 <strong>반복 가능한(Iterable)</strong> 객체의 <strong>값</strong>을 순회합니다.</p>
          <div className="info-grid">
            <div className="info-card">
              <h4>장점</h4>
              <p>코드가 매우 간결하며, <code>break</code>와 <code>continue</code>를 사용할 수 있습니다.</p>
            </div>
            <div className="info-card warning">
              <h4>한계</h4>
              <p>일반 객체(<code>{'{}'}</code>)는 이터러블이 아니기 때문에 사용할 수 없습니다.</p>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-loops-for-of"
          initialHtml={consoleHtml}
          initialJs={`// 1. 배열 순회
const colors = ["Red", "Green", "Blue"];
log("--- Array Values ---");
for (const color of colors) {
  log(color);
}

// 2. 문자열 순회
const word = "JS";
log("\\n--- String Characters ---");
for (const char of word) {
  log(char);
}

// 3. 인덱스가 필요한 경우 (entries 사용)
log("\\n--- Index & Value ---");
for (const [index, val] of colors.entries()) {
  log(\`#\${index}: \${val}\`);
}

// 4. break 사용 가능 (forEach와 다른 점)
log("\\n--- Search & Break ---");
for (const color of colors) {
  if (color === "Green") {
    log("Found Green! Stopping...");
    break; 
  }
  log(\`Checking \${color}...\`);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. for...in: 객체 속성 순회 (Key 중심)">
        <div className="concepts">
          <p>객체의 모든 <strong>열거 가능한(Enumerable) 속성 이름(Key)</strong>을 순회합니다.</p>
          <blockquote>
            <strong>⚠️ 실무 주의사항:</strong>
            <ul>
              <li><strong>배열에는 절대 사용하지 마세요:</strong> 인덱스가 숫자 형태가 아닌 문자열로 취급되며, 순서가 보장되지 않을 수 있습니다.</li>
              <li><strong>상속된 속성까지 순회:</strong> 부모 객체(Prototype)의 속성까지 출력될 수 있어 위험합니다.</li>
            </ul>
          </blockquote>
        </div>
        <LiveCodeEditor
          scopeId="js-loops-for-in"
          initialHtml={consoleHtml}
          initialJs={`// 1. 객체 순회
const car = { brand: "Tesla", model: "Model 3", year: 2024 };
log("--- Object Keys & Values ---");
for (const key in car) {
  log(\`\${key}: \${car[key]}\`);
}

// 2. [위험] 상속된 속성 문제
// human의 프로토타입에 임의의 속성을 추가
Object.prototype.extraPower = "Fly"; 

const human = { name: "Alice" };
log("\\n--- Prototype Pollution Problem ---");
for (const key in human) {
  log(\`Key found: \${key}\`); // 'name' 뿐만 아니라 'extraPower'까지 출력됨!
}

// 3. 해결책: Object.hasOwn() 사용 (ES2022+)
log("\\n--- Only Own Properties ---");
for (const key in human) {
  if (Object.hasOwn(human, key)) {
    log(\`Safe Key: \${key}\`);
  }
}

// 4. 더 나은 현대적 대안 (속도 및 안전성)
log("\\n--- Modern Way (Object.entries) ---");
Object.entries(car).forEach(([key, val]) => {
  log(\`\${key} => \${val}\`);
});`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. DOM 컬렉션과 반복문">
        <div className="concepts">
          <p><code>querySelectorAll</code>로 가져온 **NodeList**를 다룰 때의 팁입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-loops-dom"
          initialHtml={`
            <div id="item-list">
              <div class="item">Item 1</div>
              <div class="item">Item 2</div>
              <div class="item">Item 3</div>
            </div>
            \${consoleHtml}
          `}
          initialJs={`// 1. NodeList는 for...of를 지원합니다 (최신 브라우저)
const items = pickAll(".item"); // querySelectorAll helper

log("--- NodeList and for...of ---");
for (const el of items) {
  el.style.color = "var(--primary-color)";
  log("Modified: " + el.innerText);
}

// 2. HTMLCollection (getElementsByClassName 등)은 지원되지 않을 수 있음
// 이럴 땐 Array.from()으로 변환하여 순회하는 것이 가장 안전한 표준입니다.
log("\\nSafe conversion: Array.from(collection).forEach(...)");`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="5. 성능 및 한 줄 정리">
        <div className="concepts">
          <div className="info-table-wrapper">
            <table className="info-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>for...of</th>
                  <th>for...in</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>사용 대상</strong></td>
                  <td>배열, 문자열, 이터러블</td>
                  <td>일반 객체의 속성</td>
                </tr>
                <tr>
                  <td><strong>추출 정보</strong></td>
                  <td>속성 <strong>값(Value)</strong></td>
                  <td>속성 <strong>이름(Key)</strong></td>
                </tr>
                <tr>
                  <td><strong>배열 권장?</strong></td>
                  <td>✅ 매우 권장</td>
                  <td>❌ 절대 금지</td>
                </tr>
                <tr>
                  <td><strong>성능</strong></td>
                  <td>최적화 잘 됨 (빠름)</td>
                  <td>비교적 느림</td>
                </tr>
              </tbody>
            </table>
          </div>
          <style>{`
            .info-table-wrapper { margin: 15px 0; overflow-x: auto; }
            .info-table { width: 100%; border-collapse: collapse; background: var(--bg-secondary); border-radius: 8px; font-size: 0.9rem; }
            .info-table th, .info-table td { padding: 12px; border: 1px solid var(--border-color); text-align: left; }
            .info-table th { background: var(--bg-tertiary); color: var(--text-primary); }
            .info-table td { color: var(--text-secondary); }
          `}</style>
        </div>
      </CollapsibleSection>

      <RelatedLinks
        links={[
          {
            path: "/js/conditionals",
            title: "5. 조건문 (Conditionals)",
            description: "루프와 함께 프로그램의 흐름을 제어하는 if, switch 문을 배웁니다.",
            icon: "🛤️"
          },
          {
            path: "/js/iterables",
            title: "7. 이터러블 프로토콜",
            description: "for...of 루프가 내부적으로 어떻게 작동하는지 원리를 파헤칩니다.",
            icon: "➰"
          }
        ]}
      />
    </div>
  );
};

export default JsLoopsStudy;

