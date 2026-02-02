import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

/**
 * JsWebStorageStudy - 브라우저 저장소 마스터 (Local / Session Storage)
 * 단순 저장을 넘어 보안, 용량 관리, 탭 간 동기화 등 실무 핵심 테크닉을 다룹니다.
 */
const JsWebStorageStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Storage Master Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 스토리지 상태 변화를 모니터링합니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="24. 브라우저 저장소 마스터 (Web Storage)"
                subtitle="데이터 영속성 정복: 단순한 키-값 저장을 넘어 탭 간 실시간 동기화와 보안 아키텍처를 학습합니다."
            />

            <CollapsibleSection title="1. 기초: Local vs Session Storage 완벽 비교" initiallyOpen={true}>
                <div className="concepts">
                    <p>브라우저 저장소는 크게 두 가지 타입이 있으며, **유효 기간**이 가장 큰 차이점입니다.</p>
                    <div className="info-grid">
                        <div className="info-card" style={{ borderTop: '4px solid #2563eb' }}>
                            <h4 style={{ color: '#2563eb' }}>💾 LocalStorage</h4>
                            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                                <li>브라우저를 닫아도 데이터가 유지됨</li>
                                <li>동일 도메인 내의 모든 창/탭에서 공유됨</li>
                                <li><strong>용도:</strong> 자동 로그인, 테마 설정, 비회원 장바구니</li>
                            </ul>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #059669' }}>
                            <h4 style={{ color: '#059669' }}>⏳ SessionStorage</h4>
                            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem' }}>
                                <li>탭이나 윈도우를 닫으면 즉시 삭제됨</li>
                                <li>각 탭마다 독립적인 저장 공간을 가짐</li>
                                <li><strong>용도:</strong> 일회성 입력 폼, 일시적인 페이지 상태</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-storage-basics"
                    initialHtml={consoleHtml}
                    initialJs={`/**
 * 🚀 스토리지 기본 조작법
 */
function storageDemo() {
  // 1. 데이터 저장 (Value는 반드시 문자열이어야 함)
  localStorage.setItem('master_key', 'Hello Storage!');
  
  // 2. 객체 저장 (JSON 직렬화 필수)
  const settings = { theme: 'dark', fontSize: 16 };
  localStorage.setItem('app_settings', JSON.stringify(settings));
  
  // 3. 조회 및 파싱
  const rawData = localStorage.getItem('app_settings');
  const parsedData = JSON.parse(rawData);
  
  log("📝 저장된 문자열: " + localStorage.getItem('master_key'));
  log("📦 복구된 객체 테마: " + parsedData.theme);
  
  // 4. 삭제 및 전체 비우기
  // localStorage.removeItem('master_key');
  // localStorage.clear();
}

storageDemo();`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 실전 심화: Storage Event (탭 간 실시간 동기화)">
                <div className="concepts">
                    <p>어느 한 탭에서 <code>localStorage</code>를 변경하면, 같은 사이트의 **다른 모든 탭**에 <code>storage</code> 이벤트가 발생합니다. 이를 통해 실시간 동기화 시스템을 만들 수 있습니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-storage-event"
                    initialHtml={`<div id="sync-app" style="padding: 15px; border-radius: 8px; background: #f0fdf4; border: 1px solid #bbf7d0;">
  <p style="margin: 0 0 10px 0; font-size: 0.9rem;">이 예제는 <strong>다른 탭에서 변경</strong>될 때 실행됩니다.</p>
  <button id="change-btn" style="padding: 8px 12px; border-radius: 4px; border: none; background: #16a34a; color: white; cursor: pointer;">
    샘플 데이터 변경하기
  </button>
</div>` + consoleHtml}
                    initialJs={`// 💡 탭 간 실시간 동기화 리스너
window.addEventListener('storage', (event) => {
  log("🔄 [동기화알림] 다른 탭에서 데이터가 변경되었습니다!");
  log("🔑 변경된 키: " + event.key);
  log("⏪ 이전 값: " + event.oldValue);
  log("⏩ 새로운 값: " + event.newValue);
});

document.querySelector('#js-storage-event #change-btn').addEventListener('click', () => {
  const newVal = 'Time: ' + new Date().toLocaleTimeString();
  localStorage.setItem('sync_data', newVal);
  log("📢 현재 탭에서 데이터를 변경했습니다. (다른 탭에서 이벤트를 받게 됩니다!)");
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. Engineering: Quota & 용량 관리">
                <div className="concepts">
                    <p>Web Storage는 무한하지 않습니다. 보통 도메인당 **약 5MB**의 제한이 있으며, 이를 초과하면 에러가 발생합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-storage-quota"
                    initialHtml={consoleHtml}
                    initialJs={`/**
 * 🛠️ 남은 용량을 체크하거나 에러를 방지하는 법
 */
async function checkQuota() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    const usedMB = (estimate.usage / 1024 / 1024).toFixed(2);
    const quotaMB = (estimate.quota / 1024 / 1024).toFixed(2);
    
    log(\`📊 전체 할당량: \${quotaMB}MB\`);
    log(\`📉 현재 사용량: \${usedMB}MB\`);
  } else {
    log("⚠️ 이 브라우저는 Storage Estimate API를 지원하지 않습니다.");
  }
}

// 📌 실무 팁: 에러 핸들링
try {
  // localStorage.setItem('foo', 'bar');
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    log("🚨 저장소 용량이 가득 찼습니다! 오래된 데이터를 지우세요.", true);
  }
}

checkQuota();`}
                />
            </CollapsibleSection>

            <div className="info-box" style={{ background: '#fff1f2', border: '1px solid #fecdd3', marginTop: '2rem' }}>
                <h4 style={{ color: '#9f1239', margin: '0 0 10px 0' }}>🔐 Web Storage 보안 주의사항</h4>
                <ul style={{ color: '#9f1239', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    <li><strong>보안 민감성:</strong> 로컬 스토리지에 <strong>비밀번호나 개인정보</strong>를 절대 평문으로 저장하지 마세요. (XSS 공격에 매우 취약함)</li>
                    <li><strong>XSS 방어:</strong> 제3자 스크립트가 실행되는 곳이라면 로컬 스토리지 데이터는 누구나 읽을 수 있습니다.</li>
                    <li><strong>토큰 관리:</strong> 중요한 JWT 토큰은 `HttpOnly Cookie`를 사용하는 것이 보안상 더 유리합니다.</li>
                </ul>
            </div>

            <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '1rem' }}>
                <h4 style={{ color: '#475569', margin: '0 0 10px 0' }}>💡 언제 무엇을 써야 할까?</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '8px' }}>저장소</th>
                            <th style={{ padding: '8px' }}>용도</th>
                            <th style={{ padding: '8px' }}>특징</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '8px' }}><strong>Cookie</strong></td>
                            <td style={{ padding: '8px' }}>인증, 세션 관리</td>
                            <td style={{ padding: '8px' }}>서버 전송 가능, 보안 설정(HttpOnly) 가능</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '8px' }}><strong>Web Storage</strong></td>
                            <td style={{ padding: '8px' }}>UI 설정, 캐시</td>
                            <td style={{ padding: '8px' }}>용량 큼 (5MB), 서버 전송 안 됨</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px' }}><strong>IndexedDB</strong></td>
                            <td style={{ padding: '8px' }}>대용량 데이터</td>
                            <td style={{ padding: '8px' }}>구조화된 데이터, 비동기 지원, 고난도</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <CollapsibleSection title="4. 실무 패턴: 한 곳에서 로그인하면 모든 탭 로그인하기">
                <div className="concepts">
                    <p>질문하신 것처럼 **"탭 하나에서 로그인하면 다른 탭도 즉시 로그인이 반영되게"** 하려면 데이터가 탭 간에 공유되어야 합니다.</p>
                    
                    <div className="info-grid">
                        <div className="info-card" style={{ background: '#f8fafc' }}>
                            <h4 style={{ color: '#0f172a' }}>✅ LocalStorage 전략</h4>
                            <p style={{ fontSize: '0.85rem' }}>데이터가 모든 탭에서 공유되므로 가장 간편합니다. 한 탭에서 <code>token</code>을 저장하면 다른 탭이 새로고침될 때 그 값을 읽을 수 있습니다.</p>
                        </div>
                        <div className="info-card" style={{ background: '#f8fafc' }}>
                            <h4 style={{ color: '#0f172a' }}>🔄 Storage Event 활용</h4>
                            <p style={{ fontSize: '0.85rem' }}>새로고침 없이 실시간으로 반영하려면 <code>storage</code> 리스너를 사용해 "로그인됨" 상태를 감지하고 UI를 업데이트합니다.</p>
                        </div>
                    </div>

                    <div className="info-box" style={{ background: '#ecfeff', border: '1px solid #22d3ee', marginTop: '1.5rem' }}>
                        <h4 style={{ color: '#0891b2', margin: '0 0 10px 0' }}>💡 중복 로그인 vs 탭 공유는 다른 개념입니다!</h4>
                        <ul style={{ fontSize: '0.9rem', color: '#155e75', lineHeight: '1.7' }}>
                            <li><strong>탭 공유 (Frontend):</strong> 브라우저 내에서 <code>localStorage</code>를 써서 여러 탭이 같은 토큰을 쓰게 하는 것입니다.</li>
                            <li><strong>중복 로그인 방지 (Backend):</strong> "기기(또는 브라우저)당 세션 하나"만 허용하는 로직입니다. 새로운 곳에서 로그인하면 기존 토큰을 서버에서 만료시키는 방식이며, 프론트엔드 저장소 종류와는 무관합니다.</li>
                        </ul>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-auth-sync"
                    initialHtml={consoleHtml}
                    initialJs={`/**
 * 🔒 실시간 로그인/로그아웃 동기화 로직
 */
window.addEventListener('storage', (e) => {
  if (e.key === 'isLoggedIn') {
    if (e.newValue === 'true') {
      log("🟢 [동기화] 다른 탭에서 로그인했습니다. UI를 로그인 상태로 바꿉니다.");
    } else {
      log("🔴 [동기화] 다른 탭에서 로그아웃했습니다. 세션을 종료합니다.");
      // location.reload(); // 실무에선 강제 로그아웃 처리
    }
  }
});

function login() {
  localStorage.setItem('isLoggedIn', 'true');
  log("🔑 로그인 완료! (다른 탭에서 확인해보세요)");
}

function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  log("🚪 로그아웃 완료!");
}

// 테스트용 실행
login();`}
                />

                <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '1.5rem' }}>
                    <h4 style={{ color: '#1e293b', margin: '0 0 10px 0' }}>🛡️ JWT와 로컬 스토리지의 궁합 (보안 vs 편의성)</h4>
                    <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: '1.6' }}>
                        질문하신 JWT 토큰 방식과 탭 동기화는 <strong>완벽하게 공존</strong>할 수 있으며, 실제 두 가지 주요 패턴으로 쓰입니다.
                    </p>
                    <div className="info-grid" style={{ marginTop: '10px' }}>
                        <div className="info-card" style={{ background: '#fff' }}>
                            <h5 style={{ margin: '0 0 5px 0' }}>패턴 A: JWT를 로컬 스토리지에 저장</h5>
                            <ul style={{ fontSize: '0.8rem', paddingLeft: '1.2rem', margin: 0 }}>
                                <li>구현이 매우 간단하고 탭 간 공유가 별도 설정 없이 바로 됨.</li>
                                <li><strong>보안 위험:</strong> XSS 공격에 취약 (로그인 세션 탈취 가능).</li>
                            </ul>
                        </div>
                        <div className="info-card" style={{ background: '#fff' }}>
                            <h5 style={{ margin: '0 0 5px 0' }}>패턴 B: JWT는 쿠키(HttpOnly) + 스토리지 이벤트</h5>
                            <ul style={{ fontSize: '0.8rem', paddingLeft: '1.2rem', margin: 0 }}>
                                <li>토큰은 안전한 쿠키에 숨기고, <code>isLoggedIn: true</code> 같은 **신호용 값**만 로컬 스토리지에 저장합니다.</li>
                                <li><strong>장점:</strong> 보안은 챙기면서, 탭 간 동기화 알림은 그대로 사용할 수 있습니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/bom-mastery",
                        title: "15. BOM 마스터",
                        description: "window 객체의 다양한 속성과 브라우저 환경 제어법을 배웁니다.",
                        icon: "🌐"
                    },
                    {
                        path: "/js/async-fetch",
                        title: "11. Fetch Master",
                        description: "서버 데이터를 받아와 스토리지에 저장하는 연계 워크플로우를 익힙니다.",
                        icon: "📡"
                    }
                ]}
            />
        </div>
    );
};

export default JsWebStorageStudy;
