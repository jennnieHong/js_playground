import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

/**
 * JsAsyncFetchStudy - 비동기 심화: Fetch Master
 * 단순한 데이터 요청을 넘어 데이터 타입, 흐름 제어, 인증, 보안 등 실무 핵심을 다룹니다.
 */
const JsAsyncFetchStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Fetch Master Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 네트워크 요청을 분석합니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="11. 비동기 심화: Fetch Master"
                subtitle="서버와 완벽하게 대화하는 법: 단순한 조회를 넘어 데이터 보안, 취소 제어, 그리고 견고한 통신 설계를 배웁니다."
            />

            <CollapsibleSection title="1. Request Anatomy: 풍부한 옵션 설정" initiallyOpen={true}>
                <div className="concepts">
                    <p><code>fetch(url, options)</code>의 두 번째 인자인 <code>options</code>를 통해 요청의 모든 것을 제어할 수 있습니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4 style={{ color: '#2563eb' }}>🗝️ Headers</h4>
                            <p style={{ fontSize: '0.8rem' }}>브라우저 정보, 인증 토큰, 데이터 포맷(json 등) 정보를 담습니다.</p>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#059669' }}>📦 Body</h4>
                            <p style={{ fontSize: '0.8rem' }}>서버로 보낼 실제 데이터입니다. 반드시 <code>JSON.stringify</code>로 직렬화해야 합니다.</p>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#7c3aed' }}>🔐 Credentials</h4>
                            <p style={{ fontSize: '0.8rem' }}>쿠키나 인증 정보를 요청에 포함할지 여부를 결정합니다 (<code>same-origin</code>, <code>include</code>).</p>
                        </div>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-fetch-options"
                    initialHtml={consoleHtml}
                    initialJs={`async function createPost() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
  // 1. 요청 옵션 구성
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer YOUR_SECRET_TOKEN' // 인증 토큰 예시
    },
    body: JSON.stringify({
      title: 'Fetch Master',
      body: '상세 옵션을 학습 중입니다.',
      userId: 1
    })
  };

  try {
    log("📤 데이터를 서버로 전송 중...");
    const response = await fetch(url, options);
    
    if (response.ok) {
      const result = await response.json();
      log("✅ 생성 성공! 새로운 ID: " + result.id);
      log("전송된 헤더 확인: " + JSON.stringify(options.headers, null, 2));
    }
  } catch (error) {
    log("🚨 전송 실패: " + error.message, true);
  }
}

createPost();`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. Response Diversity: 다양한 응답 데이터 처리">
                <div className="concepts">
                    <p>서버는 JSON만 주지 않습니다. 이미지, 텍스트, 바이너리 등 필요한 형식에 맞춰 데이터를 파싱해야 합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-fetch-response-types"
                    initialHtml={`<div id="file-viewer" style="margin-bottom: 10px; padding: 10px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; text-align: center;">
  <div id="preview-area"><small>데이터 미리보기</small></div>
</div>` + consoleHtml}
                    initialJs={`const preview = document.querySelector('#js-fetch-response-types #preview-area');

async function getDiversifiedData(type) {
  try {
    if (type === 'image') {
      log("🖼️ 이미지(Blob) 데이터를 가져옵니다...");
      // 가상 고화질 이미지 API
      const response = await fetch('https://picsum.photos/200');
      const blob = await response.blob();
      
      const imgUrl = URL.createObjectURL(blob);
      preview.innerHTML = \`<img src="\${imgUrl}" style="border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" />\`;
    } else {
      log("📄 텍스트 데이터를 가져옵니다...");
      // ⚠️ 외부 서버의 파일은 CORS 제한이 있을 수 있습니다.
      // 여기서는 확실히 허용된 JSONPlaceholder의 데이터를 텍스트로 읽어봅니다.
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const text = await response.text();
      preview.innerHTML = \`<pre style="font-size: 0.7rem; text-align: left; background: #fff; padding: 10px; border: 1px solid #e2e8f0;">\${text.substring(0, 300)}...</pre>\`;
    }
  } catch (err) {
    log("❌ 로딩 실패: " + err.message, true);
    log("💡 URL이 정확한지, 혹은 CORS 제한이 없는지 확인하세요!");
  }
}

// 최초 실행
getDiversifiedData('image');`}
                />

                <div className="info-box" style={{ background: '#fffbeb', border: '1px solid #fcd34d', marginTop: '1.5rem' }}>
                    <h4 style={{ color: '#92400e', margin: '0 0 10px 0' }}>⚠️ 404 Not Found는 '에러'가 아닙니다!</h4>
                    <p style={{ fontSize: '0.9rem', color: '#92400e', lineHeight: '1.6' }}>
                        초보자들이 가장 많이 하는 실수 중 하나입니다. <code>fetch</code>는 서버와 연결만 성공하면, 설령 주소가 틀려서 <strong>404 에러가 나더라도 `catch`로 가지 않습니다.</strong>
                    </p>
                    <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #fde68a', marginTop: '10px' }}>
                        <code style={{ fontSize: '0.8rem', display: 'block' }}>
                            const res = await fetch('틀린주소');<br/>
                            console.log(res.ok); // false (에러인데 잡히지 않음!)
                        </code>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#92400e', marginTop: '10px' }}>
                        따라서 반드시 <strong>`if (!response.ok)`</strong>를 통해 직접 예외를 던져주어야 합니다. (아래 4번 섹션의 래퍼 구조를 참고하세요!)
                    </p>
                </div>

                <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '1.5rem' }}>
                    <h4 style={{ color: '#475569', margin: '0 0 10px 0' }}>💡 Deep Dive: URL.createObjectURL & 메모리 관리</h4>
                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6' }}>
                      <code>fetch</code>로 가져온 이미지(Blob)는 주소가 없습니다. 브라우저가 이 데이터를 읽게 하려면 <strong>임시 주소</strong>를 발급해줘야 합니다.
                    </p>
                    <ul style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.7', marginTop: '8px' }}>
                      <li><strong>발급:</strong> <code>URL.createObjectURL(blob)</code>은 'blob:http://...' 형태의 가상 주소를 만듭니다.</li>
                      <li><strong>사용:</strong> 이 주소를 <code>&lt;img src="..."&gt;</code>에 넣으면 사진이 즉시 나타납니다!</li>
                      <li><strong>🔥 중요 (메모리 해제):</strong> 이 주소는 사용이 끝나면 <strong>반드시</strong> <code>URL.revokeObjectURL(url)</code>로 지워줘야 합니다. 그렇지 않으면 브라우저 메모리에 데이터가 계속 남아 '메모리 누수'가 발생합니다.</li>
                    </ul>
                    <div style={{ background: '#fff', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
                        <code style={{ fontSize: '0.8rem', display: 'block', color: '#0f172a' }}>
                          const url = URL.createObjectURL(blob);<br/>
                          img.src = url;<br/>
                          // ... 사용 완료 후 ...<br/>
                          URL.revokeObjectURL(url);
                        </code>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="3. Flow Control: AbortController로 요청 취소하기">
                <div className="concepts">
                    <p>사용자가 다른 페이지로 이동하거나, 요청이 너무 길어질 때 <strong>진행 중인 요청을 강제로 중단</strong>하여 자원을 아낄 수 있습니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-fetch-abort"
                    initialHtml={consoleHtml}
                    initialJs={`let controller;

async function fetchWithTimeout() {
  // 이전 요청이 있다면 취소
  if (controller) controller.abort();
  
  controller = new AbortController();
  const signal = controller.signal;

  try {
    log("⏳ 3초 안에 응답이 없으면 취소됩니다...");
    
    // 3초 후 자동 취소 설정
    const timeoutId = setTimeout(() => {
        log("⏱️ 시간이 너무 오래 걸려 요청을 취소합니다!");
        controller.abort();
    }, 3000);

    // 지연이 발생하는 가상 API 호출
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_delay=5000', { signal });
    clearTimeout(timeoutId);

    const data = await response.json();
    log("✅ 성공: " + data.length + "개의 글 수신");

  } catch (err) {
    if (err.name === 'AbortError') {
      log("🛑 [AbortError] 요청이 안전하게 중단되었습니다.");
    } else {
      log("🚨 에러: " + err.message, true);
    }
  }
}

fetchWithTimeout();`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. Robust Engineering: 나만의 Fetch Wrapper 만들기">
                <div className="concepts">
                    <p>매번 <code>fetch</code> 할 때마다 <code>response.ok</code> 체크와 에러 핸들링을 반복하는 것은 비효율적입니다. 실무에서는 이를 <strong>캡슐화</strong>하여 사용합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-fetch-wrapper"
                    initialHtml={consoleHtml}
                    initialJs={`/**
 * 🛠️ 공용 API 호출 유틸리티
 */
async function request(url, options = {}) {
  const defaultHeaders = { 'Content-Type': 'application/json' };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...defaultHeaders, ...options.headers }
    });

    if (!response.ok) {
      // 404, 500 등 서버 에러 커스텀 처리
      const errorMsg = \`서버 에러 발생! (코드: \${response.status})\`;
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    // 네트워크 장애 또는 response.ok 실패 처리
    throw error;
  }
}

// 활용 예시
log("🚀 커스텀 래퍼로 호출 중...");
request('https://jsonplaceholder.typicode.com/users/1')
  .then(user => log("👤 유저 이름: " + user.name))
  .catch(err => log("🚑 공통 에러 핸들러: " + err.message, true));`}
                />
            </CollapsibleSection>

            <div className="info-box" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', marginTop: '2rem' }}>
                <h4 style={{ color: '#166534', margin: '0 0 10px 0' }}>📂 Fetch Master의 체크리스트</h4>
                <ul style={{ color: '#166534', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    <li><strong>보안:</strong> 중요한 API 키는 Client가 아닌 Server(환경 변수)에 숨기세요.</li>
                    <li><strong>사용자 경험:</strong> 네트워크는 항상 느려질 수 있음을 가정하고 <strong>Loading 상태</strong>를 꼭 처리하세요.</li>
                    <li><strong>자원 절약:</strong> 불필요한 요청은 <code>AbortController</code>로 과감히 끊어주세요.</li>
                    <li><strong>일관성:</strong> 자신만의 <code>request</code> 래퍼 함수를 만들어 에러 처리를 일원화하세요.</li>
                </ul>
            </div>

            <RelatedLinks
                links={[
                    {
                        path: "/js/async-basics",
                        title: "10. 비동기 마스터",
                        description: "비동기 프로그래밍의 기초와 Promise 엔진을 복습합니다.",
                        icon: "🚀"
                    },
                    {
                        path: "/js/advanced-js",
                        title: "12. 자바스크립트 최적화",
                        description: "메모리 누수 방지와 고급 성능 튜닝 기법을 배웁니다.",
                        icon: "⚙️"
                    }
                ]}
            />
        </div>
    );
};

export default JsAsyncFetchStudy;
