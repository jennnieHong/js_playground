import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsCssComputedStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Measure Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 요소의 실제 물리적 정보를 측정합니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="3. Computed Styles & Rects (스타일 측정)"
                subtitle="브라우저가 렌더링을 끝낸 후의 최종 스타일 값과 요소의 화면상 절대 좌표를 읽어오는 법을 배웁니다."
            />

            <CollapsibleSection title="1. getComputedStyle (최종 스타일 읽기)" initiallyOpen={true}>
                <div className="concepts">
                  <p><code>element.style</code>은 오직 인라인 스타일만 보여주지만, <code>getComputedStyle(element)</code>는 외부 CSS 파일이나 상속을 포함한 <strong>브라우저가 계산한 최종 결과</strong>를 보여줍니다.</p>
                  <div className="info-box success">
                    <strong>💡 읽기 전용</strong>
                    <p>이 객체는 측정용이므로 값을 직접 수정할 수 없습니다.</p>
                  </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-computed"
                    initialHtml={`
<style>
  .external-box { width: 100px; height: 100px; background: tomato; padding: 10px; }
</style>
<div id="target" class="external-box">외부 스타일 박스</div>` + consoleHtml}
                    initialJs={`const target = document.getElementById('target');

log("1. element.style로는 padding을 알 수 있을까?");
log("style.padding: " + target.style.padding); // "" (인라인이 아니니까!)

log("\\n2. getComputedStyle로 확인");
const computed = getComputedStyle(target);
log("computed.padding: " + computed.padding); // "10px"
log("computed.width: " + computed.width);     // "100px"`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. getBoundingClientRect (정밀 위치 측정)">
                <div className="concepts">
                  <p>요소의 크기와 <strong>뷰포트(Viewport)</strong> 기준 상대 위치를 반환합니다. 스크롤이나 요소의 이동에 따라 실시간으로 변하는 좌표를 구할 때 필수적입니다.</p>
                  <ul>
                    <li><code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code>: 외곽선 위치</li>
                    <li><code>width</code>, <code>height</code>: 전체 크기</li>
                  </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-rect"
                    initialHtml={`<div id="rect-box" style="width: 50%; height: 50px; background: gold; margin: 20px auto;">측정중...</div>` + consoleHtml}
                    initialJs={`const box = document.getElementById('rect-box');
const rect = box.getBoundingClientRect();

log("--- 요소 위치 정보 ---");
log("ViewPort 기준 Left: " + rect.left + "px");
log("ViewPort 기준 Top: " + rect.top + "px");
log("실제 렌더링된 너비: " + rect.width + "px");`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js-css/variables",
                        title: "2. CSS Variables (JS)",
                        description: "측정한 값을 바탕으로 CSS 변수를 동적으로 할당해보세요.",
                        icon: "🧪"
                    }
                ]}
            />
        </div>
    );
};

export default JsCssComputedStudy;
