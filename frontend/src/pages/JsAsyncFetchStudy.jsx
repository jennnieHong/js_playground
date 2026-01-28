import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsAsyncFetchStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Network Monitor</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> API 통신 결과를 확인하세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="11. 비동기 심화: Async / Await & Fetch"
                subtitle="현대적인 비동기 처리: 복잡한 Promise 체인을 동기 코드처럼 편안하게 작성하고 실제 데이터를 가져오는 법을 배웁니다."
            />

            <CollapsibleSection title="1. Async / Await 문법" initiallyOpen={true}>
                <div className="concepts">
                    <p>Promise를 더 직관적으로 다루기 위한 문법 설탕(Syntactic Sugar)입니다.</p>
                    <ul>
                        <li><code>async</code>: 이 키워드가 붙은 함수는 항상 Promise를 반환합니다.</li>
                        <li><code>await</code>: Promise가 해결될 때까지 코드 실행을 잠시 멈추고 결과값을 받아옵니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-async-await-deep"
                    initialHtml={consoleHtml}
                    initialJs={`const delay = (ms) => new Promise(r => setTimeout(r, ms));

async function coffeeProcess() {
  log("1. 주문 받기");
  await delay(1000);
  
  log("2. 원두 갈기");
  await delay(1000);
  
  log("3. 커피 추출");
  await delay(1000);
  
  log("☕ 커피 완성!");
  return "Americano";
}

log("--- 영업 시작 ---");
coffeeProcess().then(res => log("고객에게 전달: " + res));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 실전 Fetch API">
                <div className="concepts">
                    <p>브라우저에서 서버로 네트워크 요청을 보내는 표준 방법입니다. <code>JSON</code> 데이터를 다루는 법을 함께 익힙니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-async-fetch-real"
                    initialHtml={consoleHtml}
                    initialJs={`async function getPostData() {
  try {
    log("데이터를 불러오는 중...");
    
    // 무료 API 서비스 이용
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok) {
        throw new Error("네트워크 응답 실패");
    }

    const data = await response.json();
    
    log("\\n--- 불러온 데이터 ---");
    log("ID: " + data.id);
    log("제목: " + data.title);
    log("본문: " + data.body.substring(0, 50) + "...");
    
  } catch (err) {
    log("에러 발생: " + err.message, true);
  }
}

getPostData();`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsAsyncFetchStudy;
