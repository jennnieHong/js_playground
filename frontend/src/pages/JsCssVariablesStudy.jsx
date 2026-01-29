import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsCssVariablesStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">CSS Var Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> CSS 변수를 동적으로 조작해보세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="2. CSS Variables (Custom Properties) & JS"
                subtitle="실시간 테마 변경, 마우스 추적 인터랙션 등 현대적인 웹 스타일링의 정점, CSS 변수 제어를 마스터합니다."
            />

            <CollapsibleSection title="1. setProperty (변수 값 설정)" initiallyOpen={true}>
                <div className="concepts">
                  <p><code>element.style.setProperty('--variable-name', value)</code>를 통해 CSS 변수 값을 실시간으로 바꿀 수 있습니다.</p>
                  <p>주로 <code>:root</code>(문서 전체) 또는 특정 컨테이너 요소의 스타일을 변경할 때 사용합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-var-set"
                    initialHtml={`
<div id="theme-box" style="
  --box-bg: #3b82f6;
  width: 100%; height: 60px; 
  background-color: var(--box-bg);
  color: white; display: flex; align-items: center; justify-content: center;
  border-radius: 8px; margin-bottom: 15px; transition: 0.5s;
">테마 색상이 변경됩니다.</div>` + consoleHtml}
                    initialJs={`const box = document.getElementById('theme-box');

log("1. 배경색 변수를 보라색으로 변경");
box.style.setProperty('--box-bg', '#a855f7');

log("2. 2초 뒤에 주황색으로 변경...");
setTimeout(() => {
  box.style.setProperty('--box-bg', '#f97316');
  log("변경 완료!");
}, 2000);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. getPropertyValue (변수 값 읽기)">
                <div className="concepts">
                  <p>변수의 값을 읽어올 때는 <code>getComputedStyle(element).getPropertyValue('--name')</code>를 사용합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-var-get"
                    initialHtml={`<div id="read-box" style="--main-padding: 24px;"></div>` + consoleHtml}
                    initialJs={`const box = document.getElementById('read-box');
const styles = getComputedStyle(box);

const padding = styles.getPropertyValue('--main-padding');
log("설정된 여백 값: " + padding);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 실전 예제: 마우스 추적 광원 효과">
              <div className="concepts">
                <p>마우스의 좌표를 CSS 변수로 넘겨주면, CSS만으로는 불가능한 동적 인터랙션을 구현할 수 있습니다.</p>
              </div>
              <LiveCodeEditor
                    scopeId="js-css-var-mouse"
                    initialHtml={`
<div id="spotlight" style="
  --mouse-x: 50%; --mouse-y: 50%;
  width: 100%; height: 200px; background: #000;
  position: relative; overflow: hidden; border-radius: 12px;
  background-image: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.2) 0%, transparent 50%);
">
  <div style="color: white; position: absolute; top:50%; left:50%; transform: translate(-50%, -50%); pointer-events: none;">
    마우스를 움직여보세요
  </div>
</div>`}
                    initialJs={`const spotlight = document.getElementById('spotlight');

spotlight.addEventListener('mousemove', (e) => {
  const rect = spotlight.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  spotlight.style.setProperty('--mouse-x', \`\${x}px\`);
  spotlight.style.setProperty('--mouse-y', \`\${y}px\`);
});`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js-css/dom-styling",
                        title: "1. Styling & ClassList",
                        description: "기본적인 스타일과 클래스 조작법을 복습합니다.",
                        icon: "✨"
                    },
                    {
                        path: "/js-css/computed",
                        title: "3. Computed Styles & Rects",
                        description: "브라우저가 계산한 최종 스타일과 위치 정보를 가져오는 법을 배웁니다.",
                        icon: "📏"
                    }
                ]}
            />
        </div>
    );
};

export default JsCssVariablesStudy;
