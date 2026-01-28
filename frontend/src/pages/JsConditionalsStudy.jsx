import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsConditionalsStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Logic Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과를 확인하세요.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="3. 조건문 (Conditionals)"
        subtitle="프로그램의 의사결정: 주어진 조건에 따라 코드의 실행 경로를 분기하는 법을 배웁니다."
      />

      <CollapsibleSection title="1. if, else if, else" initiallyOpen={true}>
        <div className="concepts">
          <p>가장 범용적인 조건문입니다. 조건식의 불리언 값에 따라 블록을 실행합니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-cond-if"
          initialHtml={consoleHtml}
          initialJs={`const hour = new Date().getHours();
let greeting;

if (hour < 12) {
  greeting = "좋은 아침입니다!";
} else if (hour < 18) {
  greeting = "즐거운 오후입니다.";
} else {
  greeting = "편안한 밤 되세요.";
}

log("현재 시간 기준 인사: " + greeting);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. Switch 문">
        <div className="concepts">
          <p>비교할 대상이 명확하고 여러 케이스로 나뉠 때 가독성이 좋습니다.</p>
          <p><code>break</code>가 없으면 다음 케이스로 넘어가는 'fall-through' 현상이 발생하니 주의하세요.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-cond-switch"
          initialHtml={consoleHtml}
          initialJs={`const fruit = "apple";

switch (fruit) {
  case "banana":
    log("바나나는 2000원입니다.");
    break;
  case "apple":
    log("사과는 3000원입니다.");
    break;
  case "orange":
    log("오렌지는 1500원입니다.");
    break;
  default:
    log("해당 과일은 재고가 없습니다.");
}

// 여러 케이스 묶기
const day = "Saturday";
switch (day) {
  case "Saturday":
  case "Sunday":
    log("주말입니다! 🎉");
    break;
  default:
    log("평일입니다. 💼");
}
`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. Truthy & Falsy">
        <div className="concepts">
          <p>자바스크립트에서는 불리언 타입이 아니어도 조건문에서 <code>true</code> 또는 <code>false</code>로 평가됩니다.</p>
          <ul>
            <li><strong>Falsy (거짓 같은 값):</strong> <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code></li>
          </ul>
          <p>나머지 모든 값(빈 배열 <code>[]</code>, 빈 객체 <code>{'{ }'}</code> 포함)은 <strong>Truthy</strong>입니다.</p>
          <p>💡 이러한 불리언 변환 성질을 이용한 <strong>실전 활용 패턴(Default value, Guard clause 등)</strong>은 <a href="/js/conversion">데이터 타입 변환</a> 페이지에서 더 자세히 다룹니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-cond-truthy"
          initialHtml={consoleHtml}
          initialJs={`const testValues = [0, "", null, [], {}, 1, "Hello"];

testValues.forEach(val => {
  if (val) {
    log(\`[\${String(val)}] 은(는) Truthy입니다.\`);
  } else {
    log(\`[\${String(val)}] 은(는) Falsy입니다.\`);
  }
});`}
        />
      </CollapsibleSection>
    </div>
  );
};

export default JsConditionalsStudy;
