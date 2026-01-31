import React from 'react';
import CollapsibleSection from '../components/CollapsibleSection';
import LiveCodeEditor from '../components/LiveCodeEditor';

const JsAsyncStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Network & Logs</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 비동기 작업 결과가 여기에 표시됩니다.</div>
    <div data-ref="diagnosticLed" style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e; margin-top: 10px;"></div>
  </div>
</div>
<style>
.console-box { background: #1e293b; border-radius: 8px; overflow: hidden; font-family: monospace; }
.console-header { background: #334155; padding: 8px 12px; display: flex; gap: 6px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.red { background: #ff5f56; } .yellow { background: #ffbd2e; } .green { background: #27c93f; }
.console-title { color: #94a3b8; font-size: 0.75rem; }
.console-body { padding: 16px; min-height: 120px; }
.log-content { color: #4ade80; font-size: 0.9rem; white-space: pre-wrap; }
</style>`;

    return (
        <div className="study-container">
            <header className="study-header">
                <div className="header-icon">⏳</div>
                <h1>비동기 프로그래밍 (Async JS)</h1>
                <p>Promise와 Async/Await를 통해 데이터 로딩, 타이머 등 시간이 소요되는 작업을 효율적으로 처리하는 방법을 배웁니다.</p>
            </header>

            <CollapsibleSection title="1. Promise: 비동기의 약속" initiallyOpen={true}>
                <div className="concepts">
                    <p>비동기 작업의 최종 성공(resolve) 또는 실패(reject)를 나타내는 객체입니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`const myPromise = new Promise((resolve, reject) => {
  log("데이터 조회를 시작합니다 (2초 소요)...");
  
  setTimeout(() => {
    const success = true; // 성공/실패 시뮬레이션
    if (success) {
      resolve("🎉 데이터 로드 성공!");
    } else {
      reject("❌ 네트워크 오류 발생");
    }
  }, 2000);
});

myPromise
  .then(result => log(result))
  .catch(error => log(error, true))
  .finally(() => log("조회 프로세스 종료."));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. Async / Await: 더 편한 비동기">
                <div className="concepts">
                    <p>Promise를 마치 동기 코드처럼 직관적인 문법으로 작성할 수 있게 해줍니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`async function getUserData() {
  log("Step 1: 유저 정보 요청...");
  await new Promise(r => setTimeout(r, 1000));
  
  log("Step 2: 유저 권한 확인...");
  await new Promise(r => setTimeout(r, 1000));
  
  log("Step 3: 데이터 렌더링 완료!");
  return { id: 1, name: "JENNIE" };
}

log("--- 프로그램 실행 ---");
getUserData().then(user => {
  log("최종 데이터: " + JSON.stringify(user));
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. Fetch API (실제 통신)">
                <div className="concepts">
                    <p>실제 서버로부터 데이터를 가져올 때 사용하는 표준 API입니다.</p>
                </div>
                <LiveCodeEditor 
                    initialHtml={consoleHtml}
                    initialJs={`async function loadPost() {
  try {
    log("게시글 가져오는 중...");
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    
    log("제목: " + data.title);
  } catch(e) {
    log("에러 발생: " + e.message, true);
  }
}

loadPost();`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsAsyncStudy;

