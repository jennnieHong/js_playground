import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

/**
 * JsEventsStudy - 이벤트 핸들링 마스터 클래스
 * 기초부터 고성능 패턴(Delegation), 메모리 관리(AbortSignal)까지 상세히 다룹니다.
 */
const JsEventsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Event Master Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 이벤트를 지배하는 자가 웹을 지배합니다!</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="9. 이벤트 마스터 (Event Mastering)"
                subtitle="사용자의 미세한 움직임부터 커스텀 신호까지, 브라우저에서 발생하는 모든 '사건'을 완벽하게 제어하는 법을 배웁니다."
            />

            <CollapsibleSection title="1. 기초와 옵션: addEventListener의 숨겨진 힘" initiallyOpen={true}>
                <div className="concepts">
                    <p>단순히 클릭만 감지하는 시대는 지났습니다. 브라우저 성능과 사용자 경험(UX)을 극대화하는 <strong>이벤트 옵션</strong>을 이해해야 합니다.</p>
                    
                    <div className="info-grid">
                        <div className="info-card">
                            <h4 style={{ color: '#059669' }}>✨ once: true</h4>
                            <p style={{ fontSize: '0.85rem' }}>딱 한 번만 실행되고 자동으로 소멸합니다. (일회성 팝업, 최초 가이드 등)</p>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#2563eb' }}>⚡ passive: true</h4>
                            <p style={{ fontSize: '0.85rem' }}>브라우저에게 "이 핸들러는 화면 스크롤을 막지 않아!"라고 알려주어 렉 없는 부드러운 스크롤을 보장합니다.</p>
                        </div>
                        <div className="info-card">
                            <h4 style={{ color: '#ea580c' }}>🕵️ capture: true</h4>
                            <p style={{ fontSize: '0.85rem' }}>이벤트가 아래로 내려갈 때(Capture) 먼저 낚아챕니다. (기본값인 버블링과 반대)</p>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-events-options"
                    initialHtml={`<div style="display: flex; gap: 10px; margin-bottom: 20px;">
  <button id="btn-once" style="padding: 10px 15px; cursor: pointer; border-radius: 6px; border: 1px solid #ddd; background: #fff;">딱 한 번만! (once: true)</button>
  <button id="btn-default" style="padding: 10px 15px; cursor: pointer; border-radius: 6px; border: 1px solid #ddd; background: #fff;">여러 번 가능</button>
</div>` + consoleHtml}
                    initialJs={`const btnOnce = document.querySelector('#js-events-options #btn-once');
const btnDefault = document.querySelector('#js-events-options #btn-default');

// 1. once 옵션 사용
btnOnce.addEventListener('click', () => {
  log("💖 이 메시지는 인생에 단 한 번만 볼 수 있습니다.");
  btnOnce.textContent = "클릭됨 (이제 안됨)";
  btnOnce.disabled = true;
}, { once: true });

// 2. 일반 리스너
btnDefault.addEventListener('click', () => {
  log("🔄 무난하게 여러 번 클릭 가능합니다.");
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 이벤트 객체 깊이 알기: target vs currentTarget">
                <div className="concepts">
                    <p>이벤트가 발생하면 브라우저는 상세 정보가 담긴 **객체(e)**를 선물합니다. 이때 '누가 진짜 클릭됐나'를 정확히 알아야 합니다.</p>
                    <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', lineHeight: '1.7' }}>
                            <li><strong>e.target (🎯):</strong> 사용자의 마우스가 '진짜로 닿은' 가장 말단 요소</li>
                            <li><strong>e.currentTarget (🏢):</strong> 이벤트 리스너가 실제로 '걸려 있는' 부모 요소 (this와 같음)</li>
                        </ul>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-events-target"
                    initialHtml={`<div id="parent-box" style="padding: 40px; background: #f1f5f9; border: 2px solid #cbd5e1; border-radius: 12px; cursor: pointer;">
  부모 박스 (여기에 리스너가 걸려있음)
  <div id="child-box" style="margin-top: 15px; padding: 20px; background: #fff; border: 1px solid #94a3b8; border-radius: 8px;">
    자식 박스 (여기를 클릭해보세요!)
  </div>
</div>` + consoleHtml}
                    initialJs={`const parent = document.querySelector('#js-events-target #parent-box');

parent.addEventListener('click', (e) => {
  log("--- 클릭 발생! ---");
  log("🎯 e.target (진짜 닿은 곳): " + e.target.id);
  log("🏢 e.currentTarget (리스너 걸린 곳): " + e.currentTarget.id);
  
  if (e.target.id === 'child-box') {
    log("💡 결과: 자식을 클릭했더니 부모한테까지 소문이 났네요!");
  }
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 전파 마스터: 3단계 흐름 (Capture, Target, Bubble)">
                <div className="concepts">
                    <p>이벤트는 마치 '폭탄 돌리기'처럼 HTML 트리 위아래를 왕복합니다. 이 흐름을 제어하지 못하면 의도치 않은 버그가 발생합니다.</p>
                    
                    <div className="info-box" style={{ background: '#fef2f2', border: '1px solid #fecaca', marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#991b1b', margin: '0 0 10px 0' }}>📂 핵심: 왜 '레이아웃'이 아니라 '계층'인가?</h4>
                        <p style={{ fontSize: '0.9rem', color: '#991b1b', lineHeight: '1.6' }}>
                            눈에 보이는 화면(Layout)에서 요소가 어디에 쌓여있든 상관없습니다. 이벤트 전파는 오직 <strong>DOM 트리의 부모-자식 관계</strong>를 따라갑니다. 
                            <code>absolute</code>로 멀리 떨어진 요소를 클릭해도, DOM 트리상 부모가 있다면 이벤트는 부모를 타고 올라갑니다.
                        </p>
                        <strong style={{ color: '#991b1b', display: 'block', marginTop: '10px' }}>🔄 캡처링과 버블링은 한 세트!</strong>
                        <p style={{ fontSize: '0.9rem', color: '#991b1b', lineHeight: '1.6' }}>
                            캡처링과 버블링은 별개의 사건이 아닙니다. 이벤트가 발생하면 <strong>[내려갔다가(Capture) &rarr; 도착하고(Target) &rarr; 다시 올라오는(Bubble)]</strong> 일련의 <strong>단일 과정</strong>이 항상 일어납니다. 우리가 어느 단계에서 낚아챌지(addEventListener 옵션)만 결정할 뿐입니다.
                        </p>
                    </div>

                    <div className="traversal-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                        <div className="info-card" style={{ borderLeft: '4px solid #ea580c' }}>
                            <h4 style={{ color: '#c2410c' }}>1️⃣ 캡처링 (Capturing)</h4>
                            <p style={{ fontSize: '0.85rem' }}>최상위(Window)에서 아래(target)로 내려가며 이벤트를 찾는 과정입니다.</p>
                        </div>
                        <div className="info-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                            <h4 style={{ color: '#1d4ed8' }}>2️⃣ 타겟 (Target)</h4>
                            <p style={{ fontSize: '0.85rem' }}>이벤트가 실제 도착지에 도달한 상태입니다.</p>
                        </div>
                        <div className="info-card" style={{ borderLeft: '4px solid #059669' }}>
                            <h4 style={{ color: '#047857' }}>3️⃣ 버블링 (Bubbling)</h4>
                            <p style={{ fontSize: '0.85rem' }}>다시 아래에서 위(Window)로 올라오며 소문을 내는 과정입니다. <strong>(대부분의 조작은 여기서 발생)</strong></p>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-events-propagation"
                    initialHtml={`<div id="p-ancestor" style="padding: 30px; border: 2px solid #ddd; background: #fff;">
  Grand
  <div id="p-parent" style="padding: 20px; border: 2px solid #ccc; background: #f9f9f9;">
    Parent
    <button id="p-child" style="padding: 10px; border: 2px solid #333; cursor: pointer; background: #fff;">Target Button</button>
  </div>
</div>` + consoleHtml}
                    initialJs={`const els = ['p-ancestor', 'p-parent', 'p-child'];

// 캡처링 리스너 등록
els.forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    log("⬇️ CAPTURE (내려가는 중): " + id);
  }, { capture: true });
});

// 버블링 리스너 등록
els.forEach(id => {
  document.getElementById(id).addEventListener('click', (e) => {
    log("⬆️ BUBBLE (올라가는 중): " + id);
    
    // 주석을 해제하면 전파가 중단됩니다!
    // e.stopPropagation();
  });
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 고성능 패턴: 이벤트 위임 (Event Delegation)">
                <div className="concepts">
                    <p>자식 요소가 1,000개라면 리스너를 1,000개 걸어야 할까요? 아니요! <strong>부모에게 딱 하나만</strong> 걸고 누구를 클릭했는지 판별하는 것이 정답입니다.</p>
                    <div className="info-box" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe' }}>
                        <strong style={{ color: '#5b21b6' }}>💎 위임의 3대 장점</strong>
                        <ul style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#5b21b6' }}>
                            <li><strong>메모리 절약:</strong> 수천 개의 버튼도 리스너 하나로 해결!</li>
                            <li><strong>동적 대응:</strong> 나중에 새로 추가된 자식 요소도 즉시 클릭 감지 가능!</li>
                            <li><strong>관리 용이:</strong> 코드가 한 곳에 집중되어 깔끔합니다.</li>
                        </ul>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-events-delegation"
                    initialHtml={`<div id="toolbar" style="padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
  <button class="tool" data-cmd="save">💾 저장</button>
  <button class="tool" data-cmd="copy">📄 복사</button>
  <button class="tool" data-cmd="delete">🗑️ 삭제</button>
  <button id="add-item" style="margin-left: 20px;">+ 새 버튼 추가</button>
</div>` + consoleHtml}
                    initialJs={`const toolbar = document.querySelector('#js-events-delegation #toolbar');
const addBtn = document.querySelector('#js-events-delegation #add-item');

// 이벤트 위임 패턴 (부모인 toolbar에게만 이벤트를 겁니다)
toolbar.onclick = (e) => {
  // 1. 내가 원하는 대상(BUTTON)이 맞는지 확인
  const btn = e.target.closest('button');
  if (!btn || !toolbar.contains(btn)) return;
  
  // 2. add-item 버튼은 제외하고 명령 실행
  if (btn.id === 'add-item') return;

  const cmd = btn.dataset.cmd;
  log("👉 실행 명령: " + cmd.toUpperCase());
};

addBtn.onclick = () => {
    const freshBtn = document.createElement('button');
    freshBtn.className = 'tool';
    freshBtn.dataset.cmd = 'new-' + Math.floor(Math.random()*100);
    freshBtn.textContent = '✨ 뉴 ' + freshBtn.dataset.cmd;
    toolbar.appendChild(freshBtn);
    log("🆕 새 버튼이 추가되었습니다. (리스너 추가 없이도 작동!)");
};`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 커스텀 이벤트 (Custom Events)">
                <div className="concepts">
                    <p>브라우저가 제공하는 클릭, 스크롤 외에 <strong>우리가 직접 정의하는 이벤트</strong>입니다. 컴포넌트 간 통신의 핵심입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-events-custom"
                    initialHtml={`<div id="player-container" style="padding: 20px; border: 2px solid #333; border-radius: 12px; background: white; text-align: center;">
  <h3 id="status">대기 중...</h3>
  <button id="level-up-btn" style="padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 6px; cursor: pointer;">Lv.UP!!</button>
</div>` + consoleHtml}
                    initialJs={`const container = document.querySelector('#js-events-custom #player-container');
const btn = document.querySelector('#js-events-custom #level-up-btn');
const status = document.querySelector('#js-events-custom #status');

let level = 1;

// 1. 커스텀 이벤트 리스너 등록
// 'levelchange'라는 우리만의 이벤트를 기다립니다.
container.addEventListener('levelchange', (e) => {
  const data = e.detail; // 넘어온 데이터
  status.textContent = "⚔️ 현재 레벨: " + data.newLevel;
  log("🎉 축하합니다! " + data.user + "님이 " + data.newLevel + "레벨이 되었습니다!");
});

// 2. 이벤트 발생시키기 (Dispatch)
btn.onclick = () => {
  level++;
  // CustomEvent 생성 (detail에 데이터를 담을 수 있음)
  const event = new CustomEvent('levelchange', {
    detail: { 
      newLevel: level, 
      user: "용사님" 
    },
    bubbles: true // 부모에게도 소문 내기
  });
  
  container.dispatchEvent(event);
};`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="6. 현대적인 메모리 관리: AbortSignal">
                <div className="concepts">
                    <p>이벤트 리스너를 일일이 <code>removeEventListener</code>로 지우기는 너무 귀찮습니다. <strong>AbortController</strong>를 사용하면 리스너 100개도 한 번에 싹 지울 수 있습니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-events-abort"
                    initialHtml={`<div style="padding: 15px; background: #fff; border: 1px solid #ddd; border-radius: 8px;">
  <button id="btn-monitor" style="padding: 10px; cursor: pointer;">감시 버튼 (클릭해보세요)</button>
  <button id="btn-stop" style="padding: 10px; background: #ef4444; color: white; border: none; cursor: pointer; margin-left:10px;">모든 감시 종료</button>
</div>` + consoleHtml}
                    initialJs={`const monitorBtn = document.querySelector('#js-events-abort #btn-monitor');
const stopBtn = document.querySelector('#js-events-abort #btn-stop');

// 1. 컨트롤러 생성
let controller = new AbortController();

// 2. 신호(signal)를 옵션으로 넘김
monitorBtn.addEventListener('click', () => {
    log("👀 감시 중입니다... (살아있음)");
}, { signal: controller.signal });

// 3. 중단 실행
stopBtn.onclick = () => {
    controller.abort(); // 여기 걸려있는 모든 '신호'를 끊습니다.
    log("🚨 [STOP] 모든 이벤트 리스너가 제거되었습니다!");
    stopBtn.disabled = true;
};`}
                />
            </CollapsibleSection>

            <div className="info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', marginTop: '2rem' }}>
                <h4 style={{ color: '#475569', margin: '0 0 10px 0' }}>🎓 이벤트 마스터가 되기 위한 체크리스트</h4>
                <ul style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.7' }}>
                    <li>이벤트 옵션(once, passive)을 상황에 맞게 활용할 수 있는가?</li>
                    <li>e.target과 e.currentTarget의 차이를 설명할 수 있는가?</li>
                    <li>이벤트 전파(Capture/Bubble)의 흐름을 머릿속에 그릴 수 있는가?</li>
                    <li>수천 개의 요소를 다룰 때 이벤트 위임(Delegation)을 즉시 적용하는가?</li>
                    <li>AbortSignal을 이용해 깔끔하게 메모리를 관리하고 있는가?</li>
                </ul>
            </div>

            <RelatedLinks
                links={[
                    {
                        path: "/js/dom-manipulation",
                        title: "14. DOM 조작 기초",
                        description: "생성된 요소에 이벤트를 붙이는 실전 테크닉을 배웁니다.",
                        icon: "🏗️"
                    },
                    {
                        path: "/js/bom-mastery",
                        title: "8.8 BOM 마스터 (Deep Dive)",
                        description: "history.state와 연동된 라우팅 이벤트를 학습합니다.",
                        icon: "🌐"
                    }
                ]}
            />
        </div>
    );
};

export default JsEventsStudy;
