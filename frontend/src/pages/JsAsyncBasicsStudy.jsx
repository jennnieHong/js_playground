import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsAsyncBasicsStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Async Monitor</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과를 확인하세요.</div>
    <div data-ref="diagnosticLed" style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e; margin-top: 10px;"></div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="10. 비동기 기초: Promise"
        subtitle="기다림의 미학: 시간이 걸리는 작업을 효율적으로 처리하고, 성공과 실패의 미래를 약속(Promise)하는 법을 배웁니다."
      />

      <CollapsibleSection title="1. Promise의 3가지 상태" initiallyOpen={true}>
        <div className="concepts">
          <p>비동기 작업은 즉시 결과를 알 수 없습니다. Promise는 다음 중 하나의 상태를 가집니다.</p>
          <ul>
            <li><strong>Pending (대기):</strong> 작업이 완료되지 않은 상태</li>
            <li><strong>Fulfilled (이행):</strong> 작업이 성공적으로 완료되어 결과값이 나온 상태 (<code>resolve</code>)</li>
            <li><strong>Rejected (거부):</strong> 작업 중 에러가 발생하여 실패한 상태 (<code>reject</code>)</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-async-states"
          initialHtml={consoleHtml}
          initialJs={`log("Promise를 생성합니다...");

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true; // 이를 false로 바꿔보세요
    if (success) {
      resolve("🎉 미션 완료!");
    } else {
      reject("❌ 미션 실패...");
    }
  }, 1500);
});

log("상태: Pending (기다리는 중)");

promise
  .then(res => log("상태: Fulfilled - " + res))
  .catch(err => log("상태: Rejected - " + err, true));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 프로미스 체이닝 (Chaining)">
        <div className="concepts">
          <p>비동기 작업이 끝난 뒤 또 다른 비동기 작업을 순차적으로 실행해야 할 때 <code>.then()</code>을 계속 이어 붙일 수 있습니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-async-chaining"
          initialHtml={consoleHtml}
          initialJs={`function step1() {
  return new Promise(r => {
    log("Step 1: 재료 준비...");
    setTimeout(() => r("🍅 토마토"), 1000);
  });
}

function step2(ingredient) {
  return new Promise(r => {
    log(\`Step 2: \${ingredient} 썰기...\`);
    setTimeout(() => r("🥗 샐러드"), 1000);
  });
}

step1()
  .then(res => step2(res))
  .then(final => {
    log("Step 3: 서빙 완료!");
    log("결과물: " + final);
  });`}
        />
      </CollapsibleSection>
    </div>
  );
};

export default JsAsyncBasicsStudy;
