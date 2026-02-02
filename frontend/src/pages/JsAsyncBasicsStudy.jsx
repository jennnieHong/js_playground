import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

/**
 * JsAsyncBasicsStudy - 비동기 기초 (Async Master)
 * 콜백부터 프라미스, async/await, 그리고 실전 Fetch API까지 체계적으로 다룹니다.
 */
const JsAsyncBasicsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Async Master Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 비동기의 세계에 오신 것을 환영합니다!</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="10. 비동기 마스터 (Asynchronous Mastery)"
                subtitle="멈추지 않는 자바스크립트: 시간이 걸리는 작업을 백그라운드에서 처리하고, 효율적으로 결과를 받아오는 핵심 기술을 배웁니다."
            />

            <CollapsibleSection title="1. 비동기(Async)란 무엇인가? (식당 메타포)" initiallyOpen={true}>
                <div className="concepts">
                    <p>자바스크립트는 <strong>싱글 스레드(한 번에 하나만 처리)</strong> 언어입니다. 하지만 웹은 매우 바쁘죠. 비동기는 이 문제를 해결하는 핵심 열쇠입니다.</p>
                    
                    <div className="info-grid">
                        <div className="info-card" style={{ borderTop: '4px solid #3b82f6' }}>
                            <h4 style={{ color: '#1d4ed8' }}>🍽️ 동기 (Synchronous)</h4>
                            <p style={{ fontSize: '0.85rem' }}>주문 후 음식이 나올 때까지 <strong>손님이 줄을 서서 기다림.</strong> 뒷사람은 주문도 못 함.</p>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #10b981' }}>
                            <h4 style={{ color: '#059669' }}>🔔 비동기 (Asynchronous)</h4>
                            <p style={{ fontSize: '0.85rem' }}>주문 후 <strong>진동벨</strong>을 받고 자리에 앉음. 그 사이 점원은 다음 손님 주문을 받음.</p>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-async-concept"
                    initialHtml={consoleHtml}
                    initialJs={`log("1. ☕ 아메리카노 주문 (동기)");
log("2. ⌛ 커피 내리는 중... (3초 소요 예상)");

// 비동기 작업 시뮬레이션 (setTimeout)
setTimeout(() => {
  log("4. ✅ 아메리카노 나왔습니다! (비동기 완료)");
}, 3000);

log("3. 🥐 크루아상 주문 (다음 작업을 바로 진행 중!)");
log("--- 자바스크립트는 쉬지 않고 달립니다 ---");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 콜백 지옥(Callback Hell)의 추억">
                <div className="concepts">
                    <p>Promise가 나오기 전에는 함수 안에 함수를 넣어 비동기를 처리했습니다. 작업이 많아지면 코드가 오른쪽으로 무한히 길어지곤 했죠.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-async-callback"
                    initialHtml={consoleHtml}
                    initialJs={`function step1(next) {
  log("📦 1. 상자 준비...");
  setTimeout(() => next("박스"), 1000);
}

function step2(item, next) {
  log(\`🍎 2. \${item}에 사과 담기...\`);
  setTimeout(() => next("사과 박스"), 1000);
}

function step3(boxedItem, next) {
  log(\`🏷️ 3. \${boxedItem}에 이름표 붙이기...\`);
  setTimeout(() => next("완성된 박스"), 1000);
}

// 이것이 바로 콜백 지옥 (Callback Hell)
step1((res1) => {
  step2(res1, (res2) => {
    step3(res2, (final) => {
      log("🎉 결과: " + final);
    });
  });
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. Promise 혁명: 약속의 3가지 상태">
                <div className="concepts">
                    <p>Promise는 <strong>'지금은 없지만, 나중에 줄게'</strong>라는 약속입니다. 이 약속은 반드시 3가지 상태 중 하나에 있게 됩니다.</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>상태</th>
                                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>설명 (식당 비유)</th>
                                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>함수</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>Pending (대기)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>음식을 조리 중인 상태 (진동벨이 울리기 전)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>생성 직후</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#059669' }}>Fulfilled (이행)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>음식이 맛있게 잘 나온 상태! (냠냠)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><code>resolve()</code></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#dc2626' }}>Rejected (거부)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>재료 소진으로 주문이 취소된 상태...</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><code>reject()</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <LiveCodeEditor
                    scopeId="js-promise-basic"
                    initialHtml={consoleHtml}
                    initialJs={`const getGift = new Promise((resolve, reject) => {
  log("🎁 선물을 준비하고 있어요...");
  const isHappy = Math.random() > 0.5; // 50% 확률

  setTimeout(() => {
    if (isHappy) {
      resolve("📱 최신 스마트폰"); // 성공 전송
    } else {
      reject("🧹 빗자루 (꽝!)"); // 실패 전송
    }
  }, 2000);
});

getGift
  .then((res) => {
    log("🎊 축하합니다! 받은 선물: " + res);
  })
  .catch((err) => {
    log("😢 아쉽네요... 받은 것: " + err);
  })
  .finally(() => {
    log("🏁 이벤트가 종료되었습니다.");
  });`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 실전! Promise.all: 한꺼번에 기다리기">
                <div className="concepts">
                    <p>여러 개의 비동기 작업을 병렬로 처리하고, <strong>모두 완료될 때까지</strong> 기다려야 할 때 사용합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-promise-all"
                    initialHtml={consoleHtml}
                    initialJs={`const task1 = new Promise(r => setTimeout(() => r("📷 사진 업로드"), 1000));
const task2 = new Promise(r => setTimeout(() => r("📝 게시글 작성"), 2000));
const task3 = new Promise(r => setTimeout(() => r("🏷️ 태그 달기"), 500));

log("🚀 3가지 작업을 동시 시작합니다...");

Promise.all([task1, task2, task3])
  .then((results) => {
    log("✅ 모든 작업 완료!");
    log("결과 리스트: " + JSON.stringify(results));
  })
  .catch((err) => {
    log("❌ 하나라도 실패하면 여기가 실행됩니다.");
  });`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 꽃: Async / Await (현대적인 문법)">
                <div className="concepts">
                    <p>비동기 코드를 마치 <strong>동기 코드처럼</strong> 읽기 쉽게 작성할 수 있게 해주는 문법 설탕(Syntactic Sugar)입니다. <code>try...catch</code>를 사용하여 에러 처리를 편하게 할 수 있습니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-async-await"
                    initialHtml={consoleHtml}
                    initialJs={`const cookPizza = (fail = false) => new Promise((res, rej) => {
  log("🍕 피자 굽기 시작...");
  setTimeout(() => fail ? rej("🔥 오븐 폭발!") : res("🍕 맛있는 피자"), 1500);
});

// 비동기 함수 정의 (async 키워드)
async function dinnerTime() {
  try {
    log("--- 🏃 저녁 식사 준비 시작 ---");
    
    // 비동기 작업을 기다림 (await 키워드)
    const result = await cookPizza(false); // 가끔 true로 바꿔서 에러를 내보세요
    
    log("🥗 샐러드 완료");
    log("📦 서빙 완료: " + result);
    log("😋 맛있게 먹었습니다!");
  } catch (error) {
    log("🚨 [ERROR] " + error);
  } finally {
    log("🧹 설거지 완료");
  }
}

dinnerTime();`}
                />

                <div className="info-box" style={{ background: '#fffbeb', border: '1px solid #fcd34d', marginTop: '1.5rem' }}>
                    <h4 style={{ color: '#92400e', margin: '0 0 10px 0' }}>🤔 Async/Await는 꼭 Promise와 함께 써야 하나요?</h4>
                    <p style={{ fontSize: '0.9rem', color: '#92400e', lineHeight: '1.6' }}>
                        네, 둘은 <strong>서로 뗄 수 없는 단짝</strong>입니다! <code>async/await</code>는 결국 <strong>Promise를 더 쉽게 다루기 위해</strong> 만들어진 문법이기 때문입니다.
                    </p>
                    <ul style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: '1.7', marginTop: '8px' }}>
                        <li><strong>await의 대상:</strong> 반드시 <code>Promise</code> 객체여야 그 의미가 있습니다. (물론 일반 값을 넣어도 되지만, 내부적으로 Promise로 감싸서 즉시 이행됩니다.)</li>
                        <li><strong>async의 보답:</strong> <code>async</code>가 붙은 함수는 내부에서 무엇을 반환하든 <strong>무조건 Promise를 반환</strong>합니다.</li>
                        <li><strong>핵심 요약:</strong> <code>async/await</code>는 Promise라는 '복잡한 선물 박스'를 <strong>그 자리에서 바로 뜯어보게 해주는 도구</strong>라고 생각하면 쉽습니다!</li>
                    </ul>
                </div>

                <div className="info-box" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', marginTop: '1rem' }}>
                    <h4 style={{ color: '#475569', margin: '0 0 10px 0' }}>💡 보충: Promise가 아닌 값을 await 하면?</h4>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                        실수로 Promise가 아닌 일반 숫자나 문자열에 <code>await</code>를 붙여도 에러는 나지 않습니다. 브라우저가 똑똑하게 <code>Promise.resolve()</code>로 감싸서 처리해주기 때문인데요.
                        하지만 <strong>비동기적으로 기다릴 것이 없으므로</strong> 실질적인 의미는 없으며, 가독성만 떨어뜨리게 됩니다.
                    </p>
                    <pre style={{ background: '#fff', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', marginTop: '10px', border: '1px solid #e2e8f0' }}>
{`// ❌ 의미 없는 코드 (일반 값 await)
const score = await 100;

// ✅ 의미 있는 코드 (Promise await)
const data = await fetch('/api/data');`}
                    </pre>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="6. 실무의 핵심: Fetch API Master Deep Dive">
                <div className="concepts">
                    <p>단순히 데이터를 가져오는 것을 넘어, 현대적인 웹 앱에서 <strong>서버와 소통하는 모든 방법</strong>을 마스터합니다.</p>
                    
                    <div className="info-grid">
                        <div className="info-card">
                            <h4 style={{ color: '#2563eb' }}>📡 HTTP Methods</h4>
                            <ul style={{ fontSize: '0.8rem', paddingLeft: '1.2rem' }}>
                                <li><strong>GET:</strong> 데이터 조회 (가져오기)</li>
                                <li><strong>POST:</strong> 데이터 생성 (새로운 글 쓰기)</li>
                                <li><strong>PUT/PATCH:</strong> 데이터 수정</li>
                                <li><strong>DELETE:</strong> 데이터 삭제</li>
                            </ul>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#059669' }}>🛠️ Headers & Body</h4>
                            <p style={{ fontSize: '0.85rem' }}>POST 요청 시에는 <code>Content-Type: application/json</code> 설정과 데이터를 담은 <strong>Body</strong>가 필수입니다.</p>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#ea580c' }}>🚑 Error Handling</h4>
                            <p style={{ fontSize: '0.85rem' }}><code>fetch</code>는 네트워크 장애가 아니면 <strong>404 에러도 에러로 던지지 않습니다.</strong> 반드시 <code>response.ok</code>를 체크해야 합니다.</p>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-async-fetch-master"
                    initialHtml={`<div id="user-app" style="padding: 20px; border-radius: 12px; background: white; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
  <div id="user-profile" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9;">
    <strong>사용자 정보를 불러오는 중...</strong>
  </div>
  <div id="user-posts">
    <small style="color: #64748b;">게시글 목록 대기 중...</small>
  </div>
</div>` + consoleHtml}
                    initialJs={`const profileSlot = document.querySelector('#js-async-fetch-master #user-profile');
const postsSlot = document.querySelector('#js-async-fetch-master #user-posts');

/**
 * 🚀 미션: 유저 정보와 해당 유저의 글 목록을 동시에 가져오기
 */
async function fetchMasterDemo() {
  try {
    log("📡 [START] 병렬 API 요청 시작 (Promise.all)");
    
    // 1. 유저 1번과 1번 유저의 글 목록을 동시에 요청
    const [userRes, postsRes] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users/1'),
      fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
    ]);

    // 2. 응답 상태 체크 (둘 다 성공해야 함)
    if (!userRes.ok || !postsRes.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");

    // 3. JSON 변환도 병렬로 처리 가능
    const [user, posts] = await Promise.all([userRes.json(), postsRes.json()]);

    log("✅ [SUCCESS] 모든 데이터 수신 완료!");

    // 4. 화면 렌더링
    profileSlot.innerHTML = \`
      <h3 style="margin: 0; color: #1e293b;">👤 \${user.name}</h3>
      <p style="margin: 5px 0; font-size: 0.9rem; color: #64748b;">📧 \${user.email} | 🏢 \${user.company.name}</p>
    \`;

    postsSlot.innerHTML = \`
      <h4 style="margin: 0 0 10px 0; font-size: 0.9rem;">� 최근 게시글 (\${posts.length}개)</h4>
      <ul style="padding-left: 1.2rem; margin: 0; font-size: 0.85rem; color: #334155;">
        \${posts.slice(0, 3).map(p => \`<li>\${p.title}</li>\`).join('')}
      </ul>
    \`;

    // 5. POST 요청 예시 (가상)
    log("💡 [INFO] 데이터를 보낼 때는 method: 'POST'와 body를 사용합니다.");
    /*
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
    });
    */

  } catch (err) {
    log("🚨 [ERROR] " + err.message, true);
    profileSlot.textContent = "오류가 발생했습니다.";
  }
}

fetchMasterDemo();`}
                />
            </CollapsibleSection>

            <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
                <h4 style={{ color: '#475569', margin: '0 0 10px 0' }}>🎓 비동기 마스터 요약</h4>
                <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    <li><strong>비동기:</strong> 작업이 끝날 때까지 기다리지 않고 다음 코드를 실행하는 방식입니다.</li>
                    <li><strong>Promise:</strong> 비동기 상태를 관리하는 객체이며 <code>.then()</code>, <code>.catch()</code>로 결과를 받습니다.</li>
                    <li><strong>Async/Await:</strong> 비동기 코드를 가장 직관적이고 가독성 있게 만들어주는 표준 문법입니다.</li>
                    <li><strong>Error Handling:</strong> 비동기 코드에서 <code>try...catch</code>는 선택이 아닌 필수입니다.</li>
                </ul>
            </div>

            <RelatedLinks
                links={[
                    {
                        path: "/js/events",
                        title: "9. 이벤트 마스터",
                        description: "비동기적으로 발생하는 사용자 클릭과 상호작용을 처리하는 법을 배웁니다.",
                        icon: "🖱️"
                    },
                    {
                        path: "/js/bom-mastery",
                        title: "8.8 BOM 마스터 (Deep Dive)",
                        description: "네트워크 상태 감지 등 브라우저 환경 제어를 학습합니다.",
                        icon: "🌐"
                    }
                ]}
            />
        </div>
    );
};

export default JsAsyncBasicsStudy;
