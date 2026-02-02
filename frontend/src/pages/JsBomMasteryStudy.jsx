import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

/**
 * JsBomMasteryStudy - 브라우저 객체 모델(BOM) 상세 학습
 */
const JsBomMasteryStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">BOM API Master Interpreter</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 초보자를 위한 상세 설명 모드 활성화됨!</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="8.8 BOM API 마스터 (초보자를 위한 Deep Dive)"
                subtitle="기초 지식이 없어도 괜찮습니다! '브라우저'라는 거대한 집의 구성 요소들을 하나씩 명확하게 파헤쳐 봅니다."
            />

            <div className="info-box" style={{ background: '#f0fdf4', border: '1px solid #86efac', marginBottom: '2rem' }}>
                <h3 style={{ color: '#166534', margin: '0 0 10px 0' }}>💡 시작하기 전에: BOM이 대체 뭔가요?</h3>
                <p style={{ color: '#166534', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    <strong>BOM (Browser Object Model)</strong>은 단어 그대로 <strong>'브라우저를 객체로 만든 것'</strong>입니다.<br />
                    자바스크립트라는 언어 자체에는 '주소창을 바꾸는 기능'이나 '뒤로가기 버튼' 기능이 없습니다. 브라우저라는 프로그램이 <strong>"우리 집(BOM)을 마음대로 조종해봐!"</strong>라며 자바스크립트에게 가상의 조종기(객체)를 빌려준 것입니다.
                </p>
                <div style={{ marginTop: '10px', padding: '10px', background: '#fff', borderRadius: '4px', fontStyle: 'italic', fontSize: '0.85rem' }}>
                    건물(브라우저) 안에 방(웹 페이지)이 있다면, <strong>BOM</strong>은 건물 관리인(창문 크기, CCTV, 엘리베이터 이동), <strong>DOM</strong>은 방 안의 가구(글자, 버튼, 이미지)를 담당합니다.
                </div>
            </div>

            <CollapsibleSection title="1. window 객체: 모든 것의 부모 (전역 객체)" initiallyOpen={true}>
                <div className="concepts">
                    <p>브라우저를 켜는 순간 <code>window</code>라는 거대한 '우주'가 만들어집니다. 여러분이 만드는 모든 변수와 함수는 사실 이 우주 안에 살고 있습니다.</p>

                    <div className="info-grid">
                        <div className="info-card">
                            <strong>1️⃣ 전역 가시성 (Global Scope)</strong>
                            <p>여러분이 <code>const a = 1;</code>이라고 쓰면, 사실은 <code>window.a</code>에 저장되는 것이나 다름없습니다. (단, let/const는 보안상 직접 window에 안 보일 수도 있지만 개념상 그렇습니다.)</p>
                        </div>
                        <div className="info-card">
                            <strong>2️⃣ 생략의 마법</strong>
                            <p><code>window.alert()</code>, <code>window.console.log()</code>가 정식 명칭이지만, <code>window</code>는 너무나 당연한 존재라 <strong>이름을 생략</strong>하고 쓸 수 있습니다.</p>
                        </div>
                    </div>

                    <div className="info-box" style={{ background: '#e0f2fe', border: '1px solid #7dd3fc', marginTop: '15px' }}>
                        <strong style={{ color: '#0369a1' }}>📏 뷰포트(Inner) vs 창(Outer) 차이</strong>
                        <ul style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#0369a1' }}>
                            <li><strong>window.innerHeight:</strong> 실제 웹 페이지 내용이 나오는 영역 (흰 화면 부분)</li>
                            <li><strong>window.outerHeight:</strong> 탭, 주소창, 메뉴바 등을 모두 포함한 윈도우 프로그램 전체 크기</li>
                        </ul>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-bom-window-detailed"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Window: 브라우저의 전지전능한 부모 ---");

// 1. 이름 생략 실험
log("window.location === location ? " + (window.location === location));

// 2. 현재 창의 크기 재보기 (초보자용 설명 포함)
log("현재 '진짜 화면' 높이(innerHeight): " + innerHeight + "px");
log("브라우저 '전체 창' 높이(outerHeight): " + outerHeight + "px");
log("둘의 차이는 주소창/탭의 높이입니다: " + (outerHeight - innerHeight) + "px");

// 3. 타이머 (나중에 실행하기)
log("타이머 예약 중...");
setTimeout(() => {
    log("⏰ [알림] 3초가 지났습니다!");
}, 3000);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. location 객체: 브라우저의 GPS (주소 분석기)">
                <div className="concepts">
                    <p>현재 주소창에 적힌 내용을 낱낱이 파헤치고, 다른 페이지로 순간이동 시켜주는 객체입니다.</p>

                    <div className="info-box" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                        <strong style={{ color: '#92400e' }}>🔗 URL의 구성 요소 (https://example.com/shop?id=123#review)</strong>
                        <ul style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#92400e', lineHeight: '1.6' }}>
                            <li><code>protocol</code>: <strong>https:</strong> (어떤 방식으로 통신하나?)</li>
                            <li><code>host</code>: <strong>example.com</strong> (어느 집 주소인가?)</li>
                            <li><code>pathname</code>: <strong>/shop</strong> (집 안의 어느 방인가?)</li>
                            <li><code>search</code>: <strong>?id=123</strong> (전달할 쪽지/데이터)</li>
                            <li><code>hash</code>: <strong>#review</strong> (특정 위치로 바로가기 책갈피)</li>
                        </ul>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-bom-location-detailed"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Location: 지금 어디에 있나요? ---");
log("전체 주소: " + location.href);

// 특정 부위만 추출하기
log("호스트(도메인): " + location.host);
log("경로(Path): " + location.pathname);

// 페이지 이동 시키는 방법 (주석을 풀어보세요)
// location.href = "https://google.com"; // 일반적인 이동
// location.replace("https://google.com"); // 뒤로가기 못하게 덮어쓰기
// location.reload(); // 새로고침

log("--- SearchParams: 물음표 뒤의 보물 찾기 ---");
// '?user=kim&age=25' 같은 주소를 쉽게 읽게 해줍니다.
const fakeUrl = "?product=monitor&price=500";
const urlParams = new URLSearchParams(fakeUrl);
log("상품명: " + urlParams.get('product'));
log("가격: " + urlParams.get('price'));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. navigator 객체: 브라우저의 자기소개서">
                <div className="concepts">
                    <p>브라우저가 <strong>"나는 크롬이고, 언어는 한국어야!"</strong>라고 알려주는 성적표 같은 객체입니다. 사용자 컴퓨터의 보안 정보나 네트워크 상태도 알 수 있습니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-bom-navigator-detailed"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Navigator: 당신의 브라우저는? ---");
log("브라우저 정보(UA): " + navigator.userAgent);
log("주 언어: " + navigator.language);

// 정말 중요한 실무 기능 1: 인터넷 연결 상태
log("현재 온라인인가요?: " + (navigator.onLine ? "YES! 연결됨" : "NO! 끊김"));

// 정말 중요한 실무 기능 2: 위치 정보 권한 확인
if (navigator.geolocation) {
    log("위치 정보를 물어볼 수 있는 브라우저입니다.");
} else {
    log("위치 정보를 지원하지 않는 낡은 브라우저입니다.");
}

// 부가 정보: 배터리 상태 (Promise 기반)
if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
        log("배터리 잔량: " + (battery.level * 100) + "%");
    });
}`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. history 객체: 브라우저의 시간 여행">
                <div className="concepts">
                    <p>브라우저의 <strong>'뒤로가기'와 '앞으로가기'</strong> 목록을 관리합니다. 현대적인 웹사이트에서는 페이지 깜빡임 없이 주소만 바꾸는 마법을 부릴 때 사용합니다.</p>

                    <div className="info-box" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe' }}>
                        <strong style={{ color: '#5b21b6' }}>✨ 실무의 꽃: pushState</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#5b21b6' }}>
                            실제로 페이지가 이동하지 않는데, 주소창의 주소만 슬쩍 바꾸고 <strong>방문 기록에는 남기는</strong> 기술입니다. 인스타그램이나 유튜브에서 게시물을 눌러도 페이지 전체가 새로고침 되지 않는 이유입니다.
                        </p>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-bom-history-detailed"
                    initialHtml={`<div style="padding: 10px; background: #fff; border: 1px solid #ddd; margin-bottom: 10px;">
  <small>가짜 주소를 만들어 방문 기록에 남겨봅시다.</small><br/>
  <button id="btn-push-fake" style="margin-top: 5px; padding: 5px 10px; cursor: pointer; background: #6366f1; color: white; border: none; border-radius: 4px;">가짜 주소 추가하기</button>
</div>` + consoleHtml}
                    initialJs={`const btn = document.querySelector('#js-bom-history-detailed #btn-push-fake');

log("--- History: 기록 탐험 ---");
log("현재까지 쌓인 방문 기록 수: " + history.length);

btn.onclick = () => {
    // history.pushState(데이터, 제목, 가짜주소)
    history.pushState({id: 'test'}, "Title", "#/fake-page-" + Math.floor(Math.random()*100));
    log("🚀 주소창을 보세요! 주소는 바뀌었지만 화면은 그대로입니다.");
    log("이제 브라우저의 '뒤로가기' 버튼이 활성화되었을 거예요.");
    log("현재 총 기록 수: " + history.length);
};

// 뒤로가기를 누를 때 발생하는 이벤트
window.onpopstate = () => {
    log("� 사용자가 뒤로가기/앞으로가기를 눌렀습니다!");
};`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. screen 객체: 모니터라는 물리적 환경">
                <div className="concepts">
                    <p>브라우저가 떠 있는 **진짜 모니터(하드웨어)**의 정보를 보여줍니다. 웹 디자인보다는 전체 화면 게임이나 정밀한 레이아웃 설계 시에 필요합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-bom-screen-detailed"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Screen: 물리적 모니터 정보 ---");
log("모니터 전체 가로: " + screen.width + "px");
log("모니터 전체 세로: " + screen.height + "px");

// 실제 사용 가능한 영역 (윈도우 작업표시줄 제외)
log("사용 가능 너비: " + screen.availWidth + "px");
log("사용 가능 높이: " + screen.availHeight + "px");

// 선명도 정보 (Retina 디스플레이 등)
log("픽셀 밀도: " + window.devicePixelRatio);`}
                />
            </CollapsibleSection>
            <CollapsibleSection title="6. 실전! SPA 라우팅과 상태 복원">
                <div className="concepts">
                    <p>현대 브라우저 환경에서 가장 중요한 BOM 활용 사례입니다. 페이지 전환 없이 URL만 바꾸는 <strong>SPA(Single Page Application)</strong>의 핵심 원리를 이해합니다.</p>

                    <div className="info-grid">
                        <div className="info-card" style={{ borderTop: '4px solid #3b82f6' }}>
                            <h4 style={{ color: '#1d4ed8' }}>🛤️ SPA 라우팅의 원리</h4>
                            <p style={{ fontSize: '0.85rem' }}>전체 페이지를 새로고침(Refresh)하지 않고, JS가 <code>history.pushState</code>를 이용해 주소창만 바꾼 뒤 필요한 데이터만 가져와 화면을 '부분 교체'하는 방식입니다.</p>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #ef4444' }}>
                            <h4 style={{ color: '#b91c1c' }}>↩️ 뒤로가기 제어 (popstate)</h4>
                            <p style={{ fontSize: '0.85rem' }}>브라우저의 뒤로가기/앞으로가기 버튼을 누르면 <code>popstate</code> 이벤트가 발생합니다. 이때 저장해둔 상태(state)를 꺼내 화면을 다시 그려야 합니다.</p>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #10b981' }}>
                            <h4 style={{ color: '#047857' }}>💾 상태 복원 (State Restoration)</h4>
                            <p style={{ fontSize: '0.85rem' }}>상세 페이지를 보고 뒤로 왔을 때 <strong>스크롤 위치</strong>나 <strong>입력했던 검색어</strong>가 유지되게 하려면 <code>history.state</code>나 <code>sessionStorage</code>를 활용합니다.</p>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-bom-spa-routing"
                    initialHtml={`<nav id="spa-nav" style="display: flex; gap: 10px; margin-bottom: 15px; padding: 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
  <button data-path="home" style="padding: 5px 12px; cursor: pointer; border: 1px solid #cbd5e1; border-radius: 4px; background: white;">홈</button>
  <button data-path="profile" style="padding: 5px 12px; cursor: pointer; border: 1px solid #cbd5e1; border-radius: 4px; background: white;">프로필</button>
  <button data-path="settings" style="padding: 5px 12px; cursor: pointer; border: 1px solid #cbd5e1; border-radius: 4px; background: white;">설정</button>
</nav>

<div id="app-view" style="min-height: 100px; padding: 20px; border: 2px dashed #cbd5e1; border-radius: 12px; background: white; margin-bottom: 10px;">
  브라우저 주소창과 아래 로그를 확인하며 버튼을 눌러보세요!
</div>` + consoleHtml}
                    initialJs={`const view = document.querySelector('#js-bom-spa-routing #app-view');
const nav = document.querySelector('#js-bom-spa-routing #spa-nav');

// 페이지(뷰) 데이터
const routes = {
  home: { title: "🏠 홈 화면", content: "환영합니다! 이곳은 메인 페이지입니다.", color: "#eff6ff" },
  profile: { title: "👤 프로필", content: "사용자 정보와 업적을 확인하세요.", color: "#f0fdf4" },
  settings: { title: "⚙️ 설정", content: "앱의 다양한 옵션을 조정할 수 있습니다.", color: "#fff7ed" }
};

// 1. 화면 렌더링 함수
function render(path, state = {}) {
  const page = routes[path] || routes.home;
  view.style.background = page.color;
  view.innerHTML = '<h3>' + page.title + '</h3><p>' + page.content + '</p><small>상태 데이터: ' + JSON.stringify(state) + '</small>';
  log('📍 현재 경로: ' + path + ' 로 렌더링됨');
}

// 2. 경로 이동 처리 (pushState)
nav.onclick = (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  const path = e.target.dataset.path;
  const state = { page: path, time: new Date().toLocaleTimeString() };
  
  // 주소창 변경 (실제 이동 X)
  const fakePath = "#/spa/" + path;
  history.pushState(state, "", fakePath);
  
  render(path, state);
  log('🚀 pushState: ' + fakePath + ' (기록에 남김)');
};

// 3. 뒤로가기/앞으로가기 감지 (popstate)
window.addEventListener('popstate', (e) => {
  log("↩️ popstate 발생! 사용자가 브라우저 이동 버튼을 눌렀습니다.");
  if (e.state && e.state.page) {
    render(e.state.page, e.state);
    log("💾 저장된 상태로 화면 복원 완료!");
  } else {
    render('home');
    log("🏠 초기 상태로 복구");
  }
});

// 초기 실행
render('home');`}
                />

                <div className="info-box" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', marginTop: '1.5rem' }}>
                    <h4 style={{ color: '#5b21b6', margin: '0 0 10px 0' }}>💡 Deep Dive: popstate 이벤트 완벽 이해</h4>
                    <p style={{ fontSize: '0.9rem', color: '#5b21b6', lineHeight: '1.6' }}>
                        <code>popstate</code>는 브라우저의 <strong>'뒤로가기'</strong>나 <strong>'앞으로가기'</strong> 버튼을 클릭했을 때 발생하는 이벤트입니다. SPA의 생명줄과도 같죠.
                    </p>
                    <ul style={{ fontSize: '0.85rem', color: '#5b21b6', lineHeight: '1.7', marginTop: '8px' }}>
                        <li><strong>발생 시점:</strong> 사용자가 브라우저 이동 버튼을 누르거나, JS에서 <code>history.back()</code>, <code>forward()</code>를 호출할 때만 발생합니다.</li>
                        <li><strong>중요!:</strong> <code>history.pushState()</code>나 <code>replaceState()</code>를 호출할 때는 <strong>발생하지 않습니다.</strong> (주소만 바꾼 것이지, '이동'한 것이 아니기 때문)</li>
                        <li><strong>event.state:</strong> <code>pushState</code>를 할 때 첫 번째 인자로 넘겨준 객체를 그대로 전달받습니다. 이 안에 페이지 제목, 스크롤 위치 등을 담아두면 복원이 가능합니다.</li>
                    </ul>
                </div>
            </CollapsibleSection>
            <CollapsibleSection title="7. 궁금증 해소: SPA 라우팅 vs 탭 기능">
                <div className="concepts">
                    <p>위의 SPA 예제가 마치 <strong>'탭(Tab) 메뉴'</strong>처럼 보이셨나요? 정답입니다! 둘은 구조적으로 매우 닮았습니다.</p>

                    <div className="info-box" style={{ background: '#fffbeb', border: '1px solid #fcd34d' }}>
                        <strong style={{ color: '#92400e' }}>🤝 공통점</strong>
                        <p style={{ fontSize: '0.9rem', color: '#92400e' }}>한 화면에서 사용자의 클릭에 따라 '보여주는 데이터'만 바꿉니다.</p>
                        <strong style={{ color: '#92400e', display: 'block', marginTop: '10px' }}>⚔️ 결정적 차이 (URL의 유무)</strong>
                        <ul style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: '1.6' }}>
                            <li><strong>일반적인 탭:</strong> 주소창이 변하지 않습니다. 새로고침을 하면 첫 번째 탭으로 초기화됩니다.</li>
                            <li><strong>SPA 라우팅:</strong> 주소창이 변합니다. 특정 주소를 복사해서 친구에게 보내면, 친구도 <strong>똑같은 화면</strong>을 볼 수 있습니다.</li>
                        </ul>
                    </div>

                    <h4 style={{ color: '#1e293b', marginTop: '1.5rem' }}>🧐 탭 구현, CSS가 좋을까 JS가 좋을까?</h4>
                    <p>상황에 따라 정답이 다릅니다. 아래 가이드를 참고해 보세요.</p>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>방식</th>
                                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>장점</th>
                                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>단점</th>
                                <th style={{ padding: '10px', border: '1px solid #e2e8f0' }}>추천 상황</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#2563eb' }}>CSS 기반<br/>(Checkbox/Radio)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>성능 최상, JS 없이도 동작, 애니메이션이 매끄러움</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>복잡한 로직(로그인 체크 등) 불가, URL 연동 어려움</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>간단한 UI 설정, 디자인 위주의 사이트</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#059669' }}>JavaScript 기반</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>매우 유연함, <strong>URL과 연동(Deep Linking)</strong> 가능, 외부 데이터 로딩 용이</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>상대적으로 리소스 많이 사용, 브라우저 기록 관리 필요</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><strong>대규모 대시보드</strong>, 회원제 서비스, SEO가 필요한 페이지</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="info-box" style={{ background: '#f0fdf4', border: '1px solid #bcf0da', marginTop: '1.5rem' }}>
                        <strong style={{ color: '#166534' }}>💡 조언</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#166534', lineHeight: '1.6' }}>
                            사용자가 <strong>"뒤로가기를 눌렀을 때 이전 탭이 보이길 기대하는가?"</strong>를 생각해보세요. 그렇다면 망설임 없이 **JavaScript(History API)**를 사용해야 합니다. 단순히 디자인적으로 내용을 가리고 보여주는 용도라면 **CSS**만으로 충분합니다.
                        </p>
                    </div>
                </div>
            </CollapsibleSection>

            <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
                <h4 style={{ color: '#475569', margin: '0 0 10px 0' }}>🎓 요약 및 학습 팁</h4>
                <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    <li><strong>window</strong>는 모든 것의 조상이며 '전역'을 의미합니다.</li>
                    <li><strong>location</strong>은 주소창 그 자체입니다. (이동/분석)</li>
                    <li><strong>navigator</strong>는 브라우저의 신분증입니다. (상태/권한)</li>
                    <li><strong>history</strong>는 방문 기록장입니다. (SPA 라우팅의 핵심)</li>
                    <li><strong>screen</strong>은 하드웨어 모니터의 크기를 알려줍니다.</li>
                </ul>
                <p style={{ marginTop: '10px', fontSize: '0.85rem', color: '#64748b' }}>
                    * 실무에서는 <strong>location</strong>과 <strong>history</strong>를 가장 자주 사용하게 될 것입니다!
                </p>
            </div>

            <RelatedLinks
                links={[
                    {
                        path: "/js/browser-bom-dom",
                        title: "14.7 브라우저 계층 (Hierarchy)",
                        description: "window와 document의 근본적인 관계를 다시 복습합니다.",
                        icon: "🌐"
                    },
                    {
                        path: "/js/web-storage",
                        title: "24. Web Storage & Observer",
                        description: "브라우저에 데이터를 반영구적으로 저장하는 로컬스토리지를 배웁니다.",
                        icon: "�"
                    }
                ]}
            />
        </div>
    );
};

export default JsBomMasteryStudy;
