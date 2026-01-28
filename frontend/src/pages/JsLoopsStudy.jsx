import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsLoopsStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Loop Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과를 확인하세요.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="4. 반복문 (Loops)"
        subtitle="코드의 노가다 탈출: 반복적인 작업을 컴퓨터에게 효율적으로 시키는 방법을 익힙니다."
      />

      <CollapsibleSection title="1. 기본 For 문" initiallyOpen={true}>
        <div className="concepts">
          <p>정해진 횟수만큼 반복할 때 가장 많이 사용됩니다.</p>
          <p><code>for (초기식; 조건식; 증감식)</code> 의 구조를 가집니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-loops-for"
          initialHtml={consoleHtml}
          initialJs={`log("--- 1부터 5까지 출력 ---");
for (let i = 1; i <= 5; i++) {
  log(\`Count: \${i}\`);
}

log("\\n--- 짝수만 출력 (2, 4, 6) ---");
for (let i = 2; i <= 6; i += 2) {
  log(\`Even: \${i}\`);
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. While 문">
        <div className="concepts">
          <p>조건이 참인 동안 계속해서 반복합니다. 횟수가 정해지지 않았을 때 유리합니다.</p>
          <blockquote>
            <strong>경고:</strong> 조건이 항상 true면 **무한 루프**에 빠져 브라우저가 멈출 수 있습니다!
          </blockquote>
        </div>
        <LiveCodeEditor
          scopeId="js-loops-while"
          initialHtml={consoleHtml}
          initialJs={`let dice = 0;
let attempts = 0;

log("주사위를 던져 6이 나오면 멈춥니다...");

while (dice !== 6) {
  dice = Math.floor(Math.random() * 6) + 1;
  attempts++;
  log(\`Attempt \${attempts}: 결과 [\${dice}]\`);
}

log(\`\\n🎉 총 \${attempts}번 만에 6이 나왔습니다!\`);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 모던 반복문: for...of & for...in">
        <div className="concepts">
          <p>컬렉션(배열, 객체)을 순회할 때 코드가 훨씬 간결해집니다.</p>
          <ul>
            <li><code>for...of</code>: 배열의 **값**을 하나씩 꺼내옵니다.</li>
            <li><code>for...in</code>: 객체의 **키(속성 이름)**를 하나씩 꺼내옵니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-loops-modern"
          initialHtml={consoleHtml}
          initialJs={`// 1. Array with for...of
const fruits = ["🍎", "🍇", "🍊"];
log("--- 과일 바구니 (for...of) ---");
for (const fruit of fruits) {
  log(fruit);
}

// 2. Object with for...in
const user = { name: "JENNIE", level: 10, role: "Admin" };
log("\\n--- 유저 정보 (for...in) ---");
for (const key in user) {
  log(\`\${key}: \${user[key]}\`);
}`}
        />
      </CollapsibleSection>
    </div>
  );
};

export default JsLoopsStudy;
