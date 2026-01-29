import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsWebStorageStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Web APIs Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 브라우저 API 실행 결과가 여기에 표시됩니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="24. Web Storage & Observer (브라우저 확장 기능)"
                subtitle="데이터를 영구적으로 저장하는 방법과 요소의 변화를 감지하는 다양한 Observer API를 학습합니다."
            />

            <CollapsibleSection title="1. Web Storage: Local vs Session" initiallyOpen={true}>
                <div className="concepts">
                    <p>브라우저에 데이터를 키-값 쌍으로 저장하는 메커니즘입니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>LocalStorage</h4>
                            <p>브라우저를 닫아도 데이터가 유지됩니다. 도메인별로 저장됩니다.</p>
                        </div>
                        <div className="info-card">
                            <h4>SessionStorage</h4>
                            <p>탭이나 윈도우를 닫으면 데이터가 삭제됩니다.</p>
                        </div>
                    </div>
                    <blockquote>
                        <strong>주의:</strong> 스토리지에는 **문자열**만 저장할 수 있습니다. 객체는 <code>JSON.stringify</code>로 변환해야 합니다.
                    </blockquote>
                </div>
                <LiveCodeEditor
                    scopeId="js-web-storage"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 값 저장 및 조회
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
log("Stored Theme: " + theme);

// 2. 객체 저장 (JSON 필수)
const user = { name: 'Jenny', age: 25 };
localStorage.setItem('user', JSON.stringify(user));

const storedUser = JSON.parse(localStorage.getItem('user'));
log("Stored User Name: " + storedUser.name);

// 3. 삭제
localStorage.removeItem('theme');
log("Theme after removal: " + localStorage.getItem('theme'));

// localStorage.clear(); // 전체 삭제`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. Intersection Observer: 가시성 감지">
                <div className="concepts">
                    <p>요소가 화면(뷰포트)에 들어왔는지 혹은 나갔는지를 효율적으로 감지하는 API입니다.</p>
                    <ul>
                        <li>무한 스크롤 구현</li>
                        <li>이미지 지연 로딩 (Lazy Loading)</li>
                        <li>스크롤 애니메이션 트리거</li>
                    </ul>
                </div>
                <div className="info-card" style={{ marginBottom: '15px', padding: '15px', background: '#334155' }}>
                    <h4>💡 실시간 테스트 팁</h4>
                    <p>이 API는 실제 스크롤 동작이 필요하므로, 여기서는 기본 개념만 코드로 확인하고 실제 프로젝트 코드에서 확인하는 것을 추천합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-intersection-observer"
                    initialHtml={consoleHtml}
                    initialJs={`// Intersection Observer 설정 예시
const observerOptions = {
  root: null, // viewport
  threshold: 0.5 // 50%가 보일 때 실행
};

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      log("요소가 화면에 나타났습니다!");
      // 한 번만 실행하고 싶다면? observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback, observerOptions);

// 감시 시작 (가상의 요소 타겟)
// observer.observe(document.querySelector('#target-element'));

log("Observer 가 생성되었습니다. 요소가 스크롤되어 들어오면 콜백이 실행됩니다.");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. Resize Observer: 크기 변화 감지">
                <div className="concepts">
                    <p>브라우저 창 크기가 아닌, **특정 요소의 크기 변화**를 정밀하게 감지합니다.</p>
                    <div className="info-box" style={{ background: '#ecfeff', border: '1px solid #06b6d4' }}>
                        <p style={{ margin: 0, color: '#0891b2', fontSize: '0.9rem' }}>
                            <strong>💡 Browser Built-in API:</strong> <code>ResizeObserver</code>는 별도의 라이브러리 설치 없이 <strong>브라우저에서 기본으로 제공</strong>되는 강력한 객체입니다.
                        </p>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-resize-observer"
                    initialHtml={consoleHtml}
                    initialJs={`// 요소 크기 감지 예시
const resizeCallback = entries => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    log(\`Element Resized: \${Math.round(width)}x\${Math.round(height)}\`);
  }
};

const resizer = new ResizeObserver(resizeCallback);

// resizer.observe(document.body);
log("ResizeObserver 활성화 (개념 코드)");`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/dom-manipulation",
                        title: "20. DOM 조작기초",
                        description: "Observer가 감시할 요소를 생성하고 조작하는 방법을 배웁니다.",
                        icon: "🖱️"
                    },
                    {
                        path: "/js/async-basics",
                        title: "22. 비동기 기초 (Promise)",
                        description: "이벤트 기반으로 작동하는 Observer의 비동기적 특성을 이해합니다.",
                        icon: "⏳"
                    }
                ]}
            />
        </div>
    );
};

export default JsWebStorageStudy;
