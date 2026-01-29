import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsCssAnimationsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Event Observer</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 애니메이션 이벤트를 대기 중입니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="4. Animation & Transition Events"
                subtitle="CSS 애니메이션이 언제 시작하고 끝나는지 JS로 감지하여 연속적인 동작을 구현합니다."
            />

            <CollapsibleSection title="1. transitionend (트랜지션 감지)" initiallyOpen={true}>
                <div className="concepts">
                  <p>CSS의 <code>transition</code>이 완료되는 시점에 발생합니다. 요소가 사라진 뒤에 메모리에서 제거하거나, 다음 단계의 동작을 수행할 때 필수적입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-transition"
                    initialHtml={`
<div id="fade-box" style="
  width: 100px; height: 100px; background: coral; 
  transition: opacity 1s, transform 1s; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px; border-radius: 8px;
">클릭!</div>` + consoleHtml}
                    initialJs={`const box = document.getElementById('fade-box');

box.addEventListener('click', () => {
  log("트랜지션 시작...");
  box.style.opacity = "0";
  box.style.transform = "scale(0.5)";
});

box.addEventListener('transitionend', (e) => {
  // 여러 속성 중 특정 속성이 끝났을 때만 처리 가능
  log(\`테스트 완료: \${e.propertyName} 트랜지션 종료!\`);
  if (e.propertyName === 'opacity') {
    box.style.display = 'none';
    log("결과: 요소를 화면에서 숨겼습니다.");
  }
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. animation events (키프레임 감지)">
                <div className="concepts">
                  <p><code>@keyframes</code> 애니메이션의 주요 시점을 감지합니다.</p>
                  <ul>
                    <li><code>animationstart</code>: 애니메이션이 시작될 때</li>
                    <li><code>animationiteration</code>: 반복될 때마다 (infinite인 경우)</li>
                    <li><code>animationend</code>: 애니메이션이 완전히 끝날 때</li>
                  </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-animation"
                    initialHtml={`
<style>
  @keyframes slide {
    from { margin-left: 0; }
    to { margin-left: 100px; }
  }
  .animate { animation: slide 2s ease-in-out; }
</style>
<div id="anim-box" style="width: 50px; height: 50px; background: #3b82f6; border-radius: 4px;"></div>
<button id="start-btn" style="margin: 10px 0; padding: 5px 10px;">애니메이션 실행</button>` + consoleHtml}
                    initialJs={`const box = document.getElementById('anim-box');
const btn = document.getElementById('start-btn');

btn.addEventListener('click', () => {
  box.classList.add('animate');
});

box.addEventListener('animationstart', () => log("🎬 애니메이션 가동!"));
box.addEventListener('animationend', () => {
  log("🏁 애니메이션 종료!");
  box.classList.remove('animate'); // 재사용을 위해 클래스 제거
});`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js-css/dom-styling",
                        title: "1. Styling & ClassList",
                        description: "애니메이션을 트리거하는 클래스 조작법을 복습합니다.",
                        icon: "✨"
                    }
                ]}
            />
        </div>
    );
};

export default JsCssAnimationsStudy;
