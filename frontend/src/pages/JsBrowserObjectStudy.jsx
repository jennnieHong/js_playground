import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

/**
 * JsBrowserObjectStudy - 브라우저 객체 모델(BOM)과 문서 객체 모델(DOM)의 계층 구조 학습
 */
const JsBrowserObjectStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Browser Object Inspector</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 브라우저의 전역 객체들을 탐험해 보세요!</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="8.7 브라우저 계층 구조 (BOM vs DOM)"
                subtitle="window와 document의 차이를 명확히 이해하고, 브라우저가 제공하는 강력한 API들의 지도를 그립니다."
            />

            <CollapsibleSection title="1. 큰 그림: BOM과 DOM의 관계" initiallyOpen={true}>
                <div className="concepts">
                    <p>브라우저 환경에서 자바스크립트가 실행될 때, 가장 꼭대기에는 <code>window</code>라고 불리는 전역 객체가 있습니다.</p>

                    <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                        <div className="info-card" style={{ borderTop: '4px solid #3b82f6' }}>
                            <h4 style={{ color: '#1d4ed8' }}>🌐 BOM (Browser Object Model)</h4>
                            <p style={{ fontSize: '0.85rem' }}>브라우저 자체를 제어하기 위한 모델입니다. 웹 페이지 내용과는 상관없이 브라우저의 창(Window), 주소창(Location), 뒤로가기 기록(History) 등을 다룹니다.</p>
                            <ul style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                <li><code>window</code>: 모든 것의 부모 (전역 객체)</li>
                                <li><code>navigator</code>: 브라우저 정보 (언어, 이름 등)</li>
                                <li><code>location</code>: 현재 URL 정보 및 이동</li>
                                <li><code>history</code>: 방문 기록</li>
                                <li><code>screen</code>: 모니터 화면 정보</li>
                            </ul>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #10b981' }}>
                            <h4 style={{ color: '#047857' }}>📄 DOM (Document Object Model)</h4>
                            <p style={{ fontSize: '0.85rem' }}>BOM의 한 부분으로, 브라우저 안에 그려진 <strong>'문서(내용물)'</strong>만 담당하는 모델입니다. HTML 태그들을 객체로 구조화한 것입니다.</p>
                            <ul style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                <li><code>document</code>: DOM의 진입점이자 최상위 객체</li>
                                <li><code>body</code>, <code>div</code>, <code>button</code> 등 모든 HTML 태그들</li>
                            </ul>
                        </div>
                    </div>

                    <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '1.5rem', textAlign: 'center' }}>
                        <strong style={{ fontSize: '1.1rem' }}>계층도: window {">"} document</strong>
                        <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#64748b' }}>
                            <code>window</code> 객체는 <code>document</code>를 <strong>포함</strong>하고 있습니다.<br />
                            즉, <code>window.document</code>라고 써도 되지만, <code>window</code>는 전역이라 생략하고 <code>document</code>로 바로 쓰는 것입니다!
                        </p>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="2. window 객체: 브라우저의 '신'">
                <div className="concepts">
                    <p><code>window</code>는 브라우저 탭 하나를 통째로 대표합니다. 자바스크립트에서 선언한 전역 변수나 함수도 사실은 <code>window</code>의 속성이 됩니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-bom-window"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Window 정보 탐색 ---");
log("1. 브라우저 언어: " + window.navigator.language);
log("2. 현재 주소(URL): " + window.location.href);
log("3. 화면 해상도: " + window.screen.width + " x " + window.screen.height);

// window 전역 메서드들 (사실 window. 없이 써온 것들)
// window.alert("Hello!");
// window.setTimeout(() => log("비동기 알림"), 1000);

// 전역 변수와 window의 관계
var myGlobal = "I am Global";
log("4. 전역 변수 확인: " + window.myGlobal);

log("--- 실시간 URL 정보 ---");
log("Protocol: " + location.protocol);
log("Hostname: " + location.hostname);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. document 객체: 문서의 '문'">
                <div className="concepts">
                    <p><code>document</code>는 <code>window</code>의 자식으로, 오직 HTML 문서의 구조와 내용에만 집중합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-dom-document"
                    initialHtml={`<div id="target-doc">Check my metadata!</div>` + consoleHtml}
                    initialJs={`log("--- Document 정보 탐색 ---");
log("1. 문서 제목: " + document.title);
log("2. 마지막 수정일: " + document.lastModified);
log("3. 전체 쿠키 (문자열): " + (document.cookie || "Empty"));
log("4. 인코딩: " + document.characterSet);

// window.document 와 document의 관계 확인
log("--- window와 document의 관계 ---");
log("window.document === document ? " + (window.document === document));

// 문서 내 요소 찾기는 항상 document를 통해 시작합니다.
const el = document.querySelector('#js-dom-document #target-doc');
log("찾은 요소: " + el.tagName);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 실무 활용: 언제 무엇을 쓰는가?">
                <div className="concepts">
                    <p>상황에 따라 어떤 객체를 사용해야 하는지 결정하는 기준입니다.</p>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ background: '#f1f5f9' }}>
                                <th style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'left' }}>사용 목적</th>
                                <th style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'left' }}>대상 객체 (BOM/DOM)</th>
                                <th style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'left' }}>예시 코드</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>페이지 이동, 새로고침</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><strong>location</strong> (BOM)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><code>location.href = '...'</code></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>텍스트 변경, 클래스 토글</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><strong>document</strong> (DOM)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><code>el.textContent = '...'</code></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>브라우저 창 크기 확인</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><strong>window</strong> (BOM)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><code>window.innerWidth</code></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>뒤로가기, 앞으로가기</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><strong>history</strong> (BOM)</td>
                                <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}><code>history.back()</code></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/dom-essentials",
                        title: "14.5 DOM 핵심 요소",
                        description: "document 내부의 노드와 요소 구조를 더 깊이 배웁니다.",
                        icon: "🏛️"
                    },
                    {
                        path: "/js/dom-manipulation",
                        title: "14. DOM 조작 기초",
                        description: "실제로 문서를 바꾸는 기술을 익힙니다.",
                        icon: "🖱️"
                    },
                    {
                        path: "/js/web-storage",
                        title: "24. Web Storage & Observer",
                        description: "브라우저에 데이터를 저장하는 방법을 학습합니다.",
                        icon: "📥"
                    }
                ]}
            />
        </div>
    );
};

export default JsBrowserObjectStudy;
