import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

/**
 * JsDomEssentialsStudy - DOM 핵심 요소 심화 학습 페이지
 * DOM의 논리적 구조, 노드와 요소의 차이, 트리 탐색법을 상세히 다룹니다.
 */
const JsDomEssentialsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">DOM Essentials Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> DOM의 깊숙한 곳까지 탐험해 보세요!</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="8.5 DOM 핵심 요소 (DOM Essentials)"
                subtitle="DOM의 논리적 구조와 노드/요소의 차이점을 명확히 이해하고, 자유자재로 트리를 탐색하는 방법을 학습합니다."
            />

            <CollapsibleSection title="1. DOM의 기저: Node vs Element" initiallyOpen={true}>
                <div className="concepts">
                    <p>DOM은 HTML 문서를 객체로 표현한 것이지만, 모든 점이 똑같은 '요소'는 아닙니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4 style={{ color: '#059669' }}>🌱 Node (노드)</h4>
                            <p>DOM 트리의 가장 기본이 되는 추상 인터페이스입니다. 텍스트, 주석, 문서 자체, 그리고 요소들을 모두 포함하는 부모 개념입니다.</p>
                            <ul style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                <li><code>Node.ELEMENT_NODE</code> (1)</li>
                                <li><code>Node.TEXT_NODE</code> (3) - 줄바꿈, 공백도 포함</li>
                                <li><code>Node.COMMENT_NODE</code> (8)</li>
                            </ul>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#2563eb' }}>📦 Element (요소)</h4>
                            <p>노드 중에서 <code>&lt;div&gt;</code> 같은 <strong>HTML 태그</strong>로 이루어진 것들입니다. 우리가 주로 조작하는 대상입니다.</p>
                            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>모든 Element는 Node이지만, 모든 Node가 Element는 아닙니다!</p>
                        </div>
                    </div>

                    <div className="info-box" style={{ background: '#f0fdf4', border: '1px solid #bcf0da', marginTop: '1.5rem' }}>
                        <strong style={{ color: '#065f46' }}>💡 왜 구분해야 하나요?</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#065f46', lineHeight: '1.6' }}>
                            HTML에 줄바꿈 하나만 있어도 DOM 트리에서는 '텍스트 노드'가 생성됩니다. <code>childNodes</code>를 쓰면 이런 불필요한 노드까지 모두 잡히지만, <code>children</code>을 쓰면 우리 눈에 보이는 진짜 태그들만 필터링해서 볼 수 있습니다.
                        </p>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-node-vs-element"
                    initialHtml={`<ul id="parent-list">
  <li>Item 1</li>
  <li>Item 2</li>
  <!-- 주석 샘플 -->
  <li>Item 3</li>
</ul>` + consoleHtml}
                    initialJs={`const parent = document.querySelector('#js-node-vs-element #parent-list');

log("--- Node vs Element 비교 ---");
log("total childNodes (노드 전체): " + parent.childNodes.length); 
// 텍스트(공백), 주석, 요소 포함
log("total children (요소만): " + parent.children.length);
// li 태그 3개만 포함

log("--- 첫 번째 자식 분석 ---");
const firstNode = parent.firstChild;
log("첫 노드 타입: " + firstNode.nodeType + " (3은 텍스트 노드)");
log("첫 노드 내용: '" + firstNode.textContent.replace(/\\n/g, '⏎') + "'");

const firstElement = parent.firstElementChild;
log("첫 요소 태그명: " + firstElement.tagName);

log("--- NodeList 내용 하나씩 보기 ---");
parent.childNodes.forEach((node, index) => {
  const type = node.nodeType === 3 ? "Text" : node.nodeType === 1 ? "Element" : "Other";
  const content = node.textContent.trim() || "(empty/newline)";
  log("[" + index + "] " + type + ": " + content);
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 무엇을 중점적으로 봐야 하는가? (Core Focus)">
                <div className="concepts">
                    <p>DOM 요소를 다룰 때 가장 많이 확인하고 조작하는 4가지 핵심 영역입니다.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                            <h4 style={{ color: '#1e293b', marginBottom: '8px' }}>🆔 식별 (Identity)</h4>
                            <p style={{ fontSize: '0.85rem', color: '#64748b' }}><code>id</code>, <code>className</code>, <code>tagName</code><br />- 누군지 식별하고 찾을 때 사용합니다.</p>
                        </div>
                        <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
                            <h4 style={{ color: '#0369a1', marginBottom: '8px' }}>📝 데이터 (Data)</h4>
                            <p style={{ fontSize: '0.85rem', color: '#0369a1' }}><code>textContent</code>, <code>value</code>, <code>dataset</code><br />- 들어있는 내용물이 무엇인지 관리합니다.</p>
                        </div>
                        <div style={{ padding: '1rem', background: '#fdf2f8', borderRadius: '10px', border: '1px solid #f472b6' }}>
                            <h4 style={{ color: '#9d174d', marginBottom: '8px' }}>🏗️ 구조 (Hierarchy)</h4>
                            <p style={{ fontSize: '0.85rem', color: '#9d174d' }}><code>parentElement</code>, <code>children</code><br />- 부모가 누구인지, 자식이 몇 명인지 파악합니다.</p>
                        </div>
                        <div style={{ padding: '1rem', background: '#ecfeff', borderRadius: '10px', border: '1px solid #22d3ee' }}>
                            <h4 style={{ color: '#0891b2', marginBottom: '8px' }}>🎨 상호작용 (State)</h4>
                            <p style={{ fontSize: '0.85rem', color: '#0891b2' }}><code>style</code>, <code>classList</code>, <code>disabled</code><br />- 현재 어떤 상태인지, 어떻게 보이는지 제어합니다.</p>
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="3. 상하좌우 탐색 (DOM Traversal)">
                <div className="concepts">
                    <p>특정 요소를 기준으로 트리를 타고 올라가거나(Up), 내려가거나(Down), 옆으로 이동(Sideways)하는 모든 방법입니다.</p>

                    <div className="traversal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                        <div className="info-card" style={{ borderTop: '4px solid #3b82f6' }}>
                            <h4 style={{ color: '#1d4ed8' }}>⬇️ 아래로 (자식 탐색)</h4>
                            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                <li><strong>children (🌟)</strong>: 자식 "요소"들만 담은 유사 배열</li>
                                <li><strong>firstElementChild / lastElementChild</strong>: 처음과 끝 자식 요소</li>
                                <li><strong>childNodes / firstChild</strong>: 모든 노드(공백 포함) 포함</li>
                                <li><strong>querySelector()</strong>: 자손 중 특정 조건으로 찾기</li>
                            </ul>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #ef4444' }}>
                            <h4 style={{ color: '#b91c1c' }}>⬆️ 위로 (부모 탐색)</h4>
                            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                <li><strong>parentElement (🌟)</strong>: 가장 가까운 부모 요소</li>
                                <li><strong>closest(selector) (🔥)</strong>: 자신을 포함해 위로 올라가며 매칭되는 가장 가까운 조상 찾기</li>
                                <li><strong>parentNode</strong>: 요소뿐만 아니라 Document 등 모든 부모 노드</li>
                            </ul>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #10b981' }}>
                            <h4 style={{ color: '#047857' }}>↔️ 옆으로 (형제 탐색)</h4>
                            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                <li><strong>nextElementSibling</strong>: 다음 형제 요소</li>
                                <li><strong>previousElementSibling</strong>: 이중 형제 요소</li>
                                <li><strong>nextSibling / previousSibling</strong>: 노드 기준(공백 포함)</li>
                            </ul>
                        </div>
                        <div className="info-card" style={{ borderTop: '4px solid #6366f1' }}>
                            <h4 style={{ color: '#4338ca' }}>🔍 관계 확인</h4>
                            <ul style={{ fontSize: '0.85rem', paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                                <li><strong>contains(node)</strong>: 특정 노드가 내 안에(자손) 있는지 확인</li>
                                <li><strong>matches(selector)</strong>: 내가 이 선택자와 일치하는지 확인</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-dom-traversal"
                    initialHtml={`<div id="ancestor" class="grand-parent" style="padding: 20px; border: 2px solid #ddd;">
  Grand Parent
  <div id="parent" class="parent" style="padding: 15px; border: 1px solid #aaa; margin-top: 10px;">
    Parent
    <div id="target" class="child active" style="padding: 10px; border: 1px solid #333; margin-top: 10px;">
      Target Child
    </div>
    <div class="sibling" style="padding: 5px; margin-top: 5px;">Sibling</div>
  </div>
</div>

<style>
.highlight-ancestor { background: #fef3c7; border-color: #f59e0b !important; }
.highlight-sibling { background: #dcfce7; border-color: #22c55e !important; }
.highlight-child { background: #dbeafe; border-color: #3b82f6 !important; }
</style>` + consoleHtml}
                    initialJs={`const target = document.querySelector('#js-dom-traversal #target');

log("--- 1. 위로 탐색 ---");
// closest()는 정말 강력합니다!
const grandParent = target.closest('.grand-parent');
grandParent.classList.add('highlight-ancestor');
log("closest('.grand-parent') 발견: " + grandParent.className);

log("--- 2. 옆으로 탐색 ---");
const sibling = target.nextElementSibling;
if(sibling) {
  sibling.classList.add('highlight-sibling');
  log("다음 형제 발견: " + sibling.innerText);
}

log("--- 3. 관계 확인 ---");
const ancestor = document.querySelector('#js-dom-traversal #ancestor');
const isDescendant = ancestor.contains(target);
log("Target은 Ancestor의 자손인가? " + isDescendant);

log("--- 4. 아래로 탐색 (부모 시점) ---");
const parent = target.parentElement;
log("부모의 자식(요소) 개수: " + parent.children.length);
log("부모의 첫 번째 자식 요소: " + parent.firstElementChild.innerText);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 핵심 속성들 (Essential Properties)">
                <div className="concepts">
                    <p>요소를 식별하고 상태를 확인하는 데 꼭 필요한 '필수템' 속성들입니다.</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                        <div className="info-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                            <strong>🏷️ tagName / nodeName</strong>
                            <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>요소의 태그 이름을 대문자로 반환합니다. (예: "DIV", "UL")</p>
                        </div>
                        <div className="info-card" style={{ borderLeft: '4px solid #6366f1' }}>
                            <strong>✨ className / classList</strong>
                            <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>클래스를 문자열로 다루거나(className), 개별적으로 조작(classList)합니다.</p>
                        </div>
                        <div className="info-card" style={{ borderLeft: '4px solid #10b981' }}>
                            <strong>📂 dataset (data-*)</strong>
                            <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>HTML에 비표준 데이터를 저장하고 JS에서 읽어올 때 사용합니다.</p>
                        </div>
                        <div className="info-card" style={{ borderLeft: '4px solid #64748b' }}>
                            <strong>📏 clientHeight / offsetWidth</strong>
                            <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>요소의 실제 렌더링된 크기(너비, 높이)를 픽셀 단위 정수로 가져옵니다.</p>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-dom-props"
                    initialHtml={`<div id="stat-element" class="base active" data-role="admin" data-id="99" style="width: 200px; height: 50px;">
  감시 대상 요소
</div>` + consoleHtml}
                    initialJs={`const el = document.querySelector('#js-dom-props #stat-element');

log("1. 태그명: " + el.tagName);
log("2. 클래스 목록: " + Array.from(el.classList).join(', '));

// dataset 사용 (data-role -> role, data-id -> id)
log("3. 데이터셋: role=" + el.dataset.role + ", id=" + el.dataset.id);

// 속성 변경 (dataset 활용이 권장됨)
el.dataset.state = 'ready';
log("4. 실시간 데이터 추가: data-state=" + el.getAttribute('data-state'));

// 크기 측정
log("5. 요소 크기: " + el.offsetWidth + "x" + el.offsetHeight + "px");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 핵심 속성 실무 활용 사례 (Practical Use Cases)">
                <div className="concepts">
                    <p>단순한 데이터 조회를 넘어, 실제 웹 서비스를 개발할 때 각 속성이 어떻게 쓰이는지 살펴봅니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4 style={{ color: '#f59e0b' }}>🎯 tagName 활용 (이벤트 위임)</h4>
                            <p style={{ fontSize: '0.85rem' }}>부모 요소 하나에만 이벤트를 걸고, 클릭된 대상이 <code>BUTTON</code>인지 <code>LI</code>인지 판별해 동작을 결정할 때 필수입니다.</p>
                        </div>
                        <div className="info-card" style={{ color: '#6366f1' }}>
                            <h4 style={{ color: '#6366f1' }}>🌗 classList 활용 (상태 제어)</h4>
                            <p style={{ fontSize: '0.85rem' }}>다크 모드 전환, 모달 열기/닫기, 유효성 검사 통과 시 <code>.active</code>나 <code>.error</code> 클래스를 뗐다 붙였다 할 때 사용합니다.</p>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#10b981' }}>💾 dataset 활용 (데이터 연결)</h4>
                            <p style={{ fontSize: '0.85rem' }}>서버에서 받은 상품 ID나 사용자 권한 정보를 HTML 요소에 <code>data-id="123"</code> 형태로 숨겨두고 JS에서 꺼내 쓸 때 매우 강력합니다.</p>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#64748b' }}>📐 offsetWidth 활용 (레이아웃 계산)</h4>
                            <p style={{ fontSize: '0.85rem' }}>캐러셀(슬라이더)을 만들 때 한 칸의 너비를 계산하거나, 특정 요소가 화면 밖으로 나갔는지 확인하여 위치를 재조정할 때 사용합니다.</p>
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="6. 실전 사례 코드로 체험하기 (Interactive Demo)">
                <div className="concepts">
                    <p>이벤트 위임(tagName), 데이터 관리(dataset), 상태 제어(classList)를 한데 모아 '카테고리 필터' 기능을 구현해 봅니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-practical-demo"
                    initialHtml={`<div id="dashboard" style="border: 1px solid #eee; padding: 15px; border-radius: 8px;">
  <h1 class="dash-title" style="font-size: 1.2rem; margin-bottom: 10px; cursor: pointer;">📦 마켓 대시보드 (H1 클릭 가능)</h1>
  
  <div class="filter-group" id="filter-container">
    <button class="filter-btn active" data-type="all">전체</button>
    <button class="filter-btn" data-type="fruit">과일</button>
    <button class="filter-btn" data-type="veg">채소</button>
  </div>
  
  <ul id="item-grid" style="list-style: none; padding: 0; margin-top: 15px; display: grid; gap: 10px;">
    <li class="card" data-category="fruit" data-id="101">🍎 사과 (ID: 101)</li>
    <li class="card" data-category="veg" data-id="102">🥦 브로콜리 (ID: 102)</li>
    <li class="card" data-category="fruit" data-id="103">🍌 바나나 (ID: 103)</li>
  </ul>
</div>

<style>
.filter-btn { padding: 4px 12px; cursor: pointer; border: 1px solid #ccc; background: white; border-radius: 4px; }
.filter-btn.active { background: #3b82f6; color: white; border-color: #2563eb; }
.card { padding: 10px; border: 1px solid #eee; border-radius: 6px; transition: 0.3s; }
.hidden { display: none; }
</style>` + consoleHtml}
                    initialJs={`const dashboard = document.querySelector('#js-practical-demo #dashboard');
const filterContainer = document.querySelector('#js-practical-demo #filter-container');
const cards = document.querySelectorAll('#js-practical-demo .card');

// 대시보드 전체 클릭 감지
dashboard.onclick = (e) => {
  // 어떤 태그를 클릭해도 tagName은 동작합니다!
  log("클릭된 요소의 태그: " + e.target.tagName);
  
  if (e.target.tagName === 'H1') {
    log("안녕! 나는 H1 태그야. 나도 감지될 수 있어!");
  }
};

// 1. 이벤트 위임 (tagName 활용)
filterContainer.onclick = (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  
  // 2. dataset 읽기 (HTML의 data-type 이 dataset.type 으로 매핑됩니다)
  const selectedCategory = e.target.dataset.type; 
  log("필터 클릭: " + selectedCategory);
  
  // 3. 버튼 활성화 상태 표시 (classList)
  filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  
  // 4. 아이템 필터링 로직
  cards.forEach(card => {
    // 버튼의 category와 카드의 data-category를 비교
    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
};

// 각 카드 클릭 시 데이터 확인
document.querySelector('#js-practical-demo #item-grid').onclick = (e) => {
  const card = e.target.closest('.card');
  if (card) {
    log("선택된 상품 고유 ID: " + card.dataset.id);
  }
};`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="7. 실전 예제: 요소 생성과 삭제 (Lifecycle)">
                <div className="concepts">
                    <p>새로운 요소를 만들고(Create), 적절한 위치에 넣고(Append), 필요 없으면 지우는(Remove) 과정이 DOM 조작의 핵심 사이클입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-dom-essentials-lifecycle"
                    initialHtml={`<div id="root-container">
  <ul id="item-list">
    <li class="item" data-id="1">기존 항목 1</li>
  </ul>
  <button id="add-btn" style="padding: 5px 10px; cursor: pointer; border-radius: 4px; background: #3b82f6; color: white; border: none;">새 항목 추가</button>
</div>` + consoleHtml}
                    initialJs={`const list = document.querySelector('#js-dom-essentials-lifecycle #item-list');
const btn = document.querySelector('#js-dom-essentials-lifecycle #add-btn');

btn.onclick = () => {
  // 1. 요소 만들기 (Create)
  const newItem = document.createElement('li');
  
  // 2. 내용과 속성 채우기 (Configure)
  const count = list.children.length + 1;
  newItem.className = 'item';
  newItem.textContent = '새로 추가된 항목 ' + count;
  newItem.dataset.id = count;
  newItem.style.cursor = 'pointer';
  newItem.style.padding = '4px';
  newItem.style.borderBottom = '1px solid #eee';
  
  // 3. 트리 구조에 연결 (Append)
  list.appendChild(newItem);
  log("추가됨: " + newItem.textContent);
  
  // 4. 클릭하면 삭제되는 기능 추가 (Remove)
  newItem.onclick = () => {
    log("삭제됨: " + newItem.textContent);
    newItem.remove();
  };
};`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="8. FAQ 및 요약">
                <div className="concepts">
                    <h4 style={{ color: '#1e293b' }}>Q. NodeList나 HTMLCollection은 어떻게 확인하나요?</h4>
                    <p>커스텀 로그 창에서 <code>[object NodeList]</code>라고 표시될 때는 다음 방법들을 사용하세요.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0' }}>
                        <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', margin: 0, padding: '8px 12px' }}>
                            <strong>1. forEach로 순회:</strong> <code>nodes.forEach(node =&gt; log(node.nodeName))</code>
                        </div>
                        <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', margin: 0, padding: '8px 12px' }}>
                            <strong>2. 배열로 변환:</strong> <code>Array.from(nodes)</code> 또는 <code>[...nodes]</code>
                        </div>
                    </div>

                    <h4 style={{ color: '#1e293b', marginTop: '1.5rem' }}>Q. 그럼 Node는 언제 사용하나요?</h4>
                    <ul>
                        <li><strong>공백/텍스트/주석 제어:</strong> HTML 태그가 아닌 문서 조각들을 정밀하게 다룰 때</li>
                        <li><strong>노드 포함 여부 확인:</strong> <code>container.contains(node)</code>를 통한 부모-자식 검사</li>
                        <li><strong>깊은 복사:</strong> <code>cloneNode(true)</code>를 사용해 모든 하위 노드를 포함하여 복제할 때</li>
                    </ul>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="9. DOM 다룰 때 주의할 점 (Best Practices)">
                <div className="concepts">
                    <ul>
                        <li><strong>Element 메서드 우선 사용:</strong> <code>childNodes</code>보다는 <code>children</code>을, <code>nextSibling</code>보다는 <code>nextElementSibling</code>을 사용하세요. 코드가 훨씬 안전해집니다.</li>
                        <li><strong>id 중복 주의:</strong> id는 페이지 전체에서 유일해야 합니다. 반복되는 리스트 아이템에는 반드시 <strong>class</strong>나 <strong>data-id</strong>를 사용하세요.</li>
                        <li><strong>Reflow(리플로우) 최소화:</strong> 루프 안에서 <code>offsetWidth</code> 등을 반복적으로 읽으면 브라우저 성능이 급격히 저하됩니다.</li>
                        <li><strong>존재 확인 필수:</strong> 탐색 시 결과가 <code>null</code>일 수 있으므로 <code>if (el)</code> 체크를 습관화하세요.</li>
                    </ul>
                </div>
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/dom-manipulation",
                        title: "14. DOM 조작 기초",
                        description: "요소를 찾고 내용을 바꾸는 실전 테크닉을 배웁니다.",
                        icon: "🖱️"
                    },
                    {
                        path: "/js-css/dom-styling",
                        title: "CSS+JS: Styling & ClassList",
                        description: "디자인과 상태를 제어하는 깊이 있는 방법을 학습합니다.",
                        icon: "🎨"
                    },
                    {
                        path: "/js/events",
                        title: "15. 이벤트 핸들링",
                        description: "사용자의 동작에 반응하는 유동적인 페이지를 만듭니다.",
                        icon: "⚡"
                    }
                ]}
            />
        </div>
    );
};

export default JsDomEssentialsStudy;
