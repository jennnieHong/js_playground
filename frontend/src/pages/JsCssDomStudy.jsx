import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsCssDomStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Styling Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 요소를 선택하고 스타일을 변경해보세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="1. Styling & ClassList (JS로 CSS 제어하기)"
                subtitle="인라인 스타일 직접 조작과 클래스 기반 제어의 차이점을 배우고 상황에 맞는 최선의 전략을 선택합니다."
            />

            <CollapsibleSection title="1. element.style (인라인 스타일 조작)" initiallyOpen={true}>
                <div className="concepts">
                  <p>객체의 <code>style</code> 속성을 통해 CSS를 직접 수정합니다. 이는 HTML 요소의 <code>style="..."</code> 속성에 직접 쓰여지는 <strong>인라인 스타일</strong>로 동작합니다.</p>
                  <div className="info-box warning">
                    <strong>⚠️ 주의점: 카멜 케이스(CamelCase) 사용</strong>
                    <p>CSS의 <code>background-color</code>는 JS에서 <code>backgroundColor</code>로 작성해야 합니다.</p>
                  </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-inline"
                    initialHtml={`<div id="box" style="width: 100px; height: 100px; background: #3b82f6; transition: all 0.3s; margin-bottom: 10px;"></div>` + consoleHtml}
                    initialJs={`const box = document.getElementById('box');

log("스타일 직접 변경 시작...");
box.style.width = "200px";
box.style.backgroundColor = "#ef4444";
box.style.borderRadius = "50%";

log("현재 너비: " + box.style.width);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. element.classList (클래스 중심 제어)">
                <div className="concepts">
                  <p>인라인 스타일을 일일이 고치는 대신, 미리 정의된 CSS 클래스를 더하거나 빼는 방식입니다. <strong>관심사 분리(Separation of Concerns)</strong> 측면에서 훨씬 권장되는 방법입니다.</p>
                  <ul>
                    <li><code>add(className)</code>: 클래스 추가</li>
                    <li><code>remove(className)</code>: 클래스 제거</li>
                    <li><code>toggle(className)</code>: 있으면 제거, 없으면 추가</li>
                    <li><code>contains(className)</code>: 클래스 보유 여부 확인</li>
                  </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-css-classlist"
                    initialHtml={`
<style>
  .card { padding: 20px; border: 1px solid #ddd; border-radius: 8px; transition: 0.3s; }
  .card.active { border-color: #3b82f6; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2); transform: translateY(-5px); }
  .card.dark { background: #1e293b; color: white; }
</style>
<div id="card" class="card">이 카드를 변신시켜보세요.</div>
<br/>` + consoleHtml}
                    initialJs={`const card = document.getElementById('card');

log("1. 'active' 클래스 토글");
card.classList.toggle('active');

log("2. 'dark' 클래스 추가");
card.classList.add('dark');

log("카드 상태: " + card.className);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 무엇을 사용해야 할까요? (Best Practices)">
              <div className="concepts">
                <div className="best-practice-grid">
                  <div className="practice-card">
                    <h4>✅ `classList`를 우선하세요 (대부분의 경우)</h4>
                    <p>디자인(CSS)과 로직(JS)을 분리하는 가장 건강한 방법입니다.</p>
                    <ul>
                      <li><strong>유지보수:</strong> 스타일 수정 시 JS 코드를 건드릴 필요가 없습니다.</li>
                      <li><strong>가독성:</strong> HTML 구조에 <code>.is-active</code> 같은 클래스가 보여 상태 파악이 쉽습니다.</li>
                      <li><strong>성능:</strong> 브라우저가 스타일 계산을 한꺼번에 처리하기 유리합니다.</li>
                    </ul>
                  </div>
                  <div className="practice-card">
                    <h4>⚠️ `style`은 "동적 수치"일 때만</h4>
                    <p>CSS 클래스로 미리 정의할 수 없는 <strong>실시간 계산 값</strong>에 사용합니다.</p>
                    <ul>
                      <li>마우스 커서를 따라다니는 요소의 <code>top/left</code></li>
                      <li>스크롤 양에 따른 프로그레스 바의 <code>width</code></li>
                      <li>사용자가 드래그해서 조절하는 요소의 크기</li>
                    </ul>
                  </div>
                </div>

                <div className="decision-box">
                  <h4>💡 결정 가이드 (Decision Tree)</h4>
                  <ol>
                    <li><strong>"이 스타일 변화가 정해진 몇 가지 상태인가요?"</strong> (예: On/Off, Dark/Light)
                      <br/>➔ <code>classList</code>를 쓰세요. 미리 CSS에 클래스를 만드세요.</li>
                    <li><strong>"이 스타일 변화가 사용자 입력에 따라 무한한 값으로 변하나요?"</strong> (예: 좌표, % 비율)
                      <br/>➔ <code>element.style</code>을 쓰세요.</li>
                    <li><strong>"여러 개의 스타일을 한꺼번에 바꿔야 하나요?"</strong>
                      <br/>➔ 클래스 하나로 묶어서 처리하는 것이 성능과 코드 관리 면에서 압도적으로 좋습니다.</li>
                  </ol>

                  <div className="example-comparison" style={{ marginTop: '20px' }}>
                    <div style={{ marginBottom: '30px' }}>
                      <h5 style={{ color: '#10b981', marginBottom: '10px' }}>Example 1: 정해진 상태 변경 (classList 권장)</h5>
                      <LiveCodeEditor
                        scopeId="decision-classlist"
                        height="320px"
                        initialHtml={`
<div id="alert" class="alert-box">상태를 변경해보세요.</div>
<div class="btn-group">
  <button onclick="changeState('success')">Success</button>
  <button onclick="changeState('warning')">Warning</button>
  <button onclick="changeState('reset')">Reset</button>
</div>

<style>
  .alert-box { padding: 15px; border-radius: 6px; border: 1px solid #ddd; transition: 0.3s; text-align: center; }
  .alert-box.is-success { background: #d1fae5; color: #065f46; border-color: #34d399; }
  .alert-box.is-warning { background: #ffedd5; color: #9a3412; border-color: #fb923c; }
  .btn-group { margin-top: 10px; display: flex; gap: 5px; }
  button { padding: 5px 10px; cursor: pointer; }
</style>` + consoleHtml}
                        initialJs={`const alert = pick('#alert');

window.changeState = (state) => {
  // 모든 상태 클래스 제거 후 하나만 추가
  alert.classList.remove('is-success', 'is-warning');
  
  if (state === 'success') alert.classList.add('is-success');
  if (state === 'warning') alert.classList.add('is-warning');
  
  log("State changed to: " + state);
};`}
                      />
                    </div>

                    <div>
                      <h5 style={{ color: '#3b82f6', marginBottom: '10px' }}>Example 2: 동적 수치 계산 (.style 권장)</h5>
                      <LiveCodeEditor
                        scopeId="decision-style"
                        previewHeight="320px"
                        htmlHeight="200px"
                        jsHeight="200px"
                        initialHtml={`
<div class="progress-container">
  <div id="bar" class="progress-bar"></div>
</div>
<div style="margin-top: 20px;">
  <input type="range" id="slider" min="0" max="100" value="30" style="width: 100%;">
  <p id="label">현재 너비: 30%</p>
</div>

<style>
  .progress-container { width: 100%; height: 20px; background: #e2e8f0; border-radius: 10px; overflow: hidden; }
  .progress-bar { width: 30%; height: 100%; background: #3b82f6; transition: width 0.1s; }
</style>` + consoleHtml}
                        initialJs={`const bar = pick('#bar');
const slider = pick('#slider');
const label = pick('#label');

slider.oninput = (e) => {
  const val = e.target.value;
  // 클래스로는 0~100 사이의 모든 값을 표현할 수 없으므로 .style 사용
  bar.style.width = val + '%';
  label.innerText = "현재 너비: " + val + "%";
};`}
                      />
                    </div>
                  </div>
                </div>

                <div className="performance-tips">
                  <h4>🚀 성능 및 클린 코드 팁</h4>
                  <div className="tip-item">
                    <strong>1. Reflow & Repaint 최소화</strong>
                    <p><code>style.width = ...; style.height = ...;</code> {"처럼 여러 번 속성을 바꾸면 브라우저가 매번 화면을 다시 그릴 수 있습니다. 클래스를 바꾸거나 "}<code>Object.assign(el.style, {'{ ... }'})</code> {"같은 방식을 고민해보세요."}</p>
                  </div>
                  <div className="tip-item">
                    <strong>2. CSS Variables와 JS의 조합</strong>
                    <p>JS로 직접 스타일을 꽂는 대신, CSS 변수(Custom Properties) 값만 JS로 바꾸고 실제 디자인은 CSS 파일에서 관리하는 방식이 가장 모던하고 강력합니다. (다음 챕터에서 학습)</p>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            <style>{`
              .best-practice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
              .practice-card { background: var(--bg-tertiary); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color); }
              .practice-card h4 { margin: 0 0 10px 0; color: var(--text-primary); font-size: 1rem; }
              .practice-card p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 10px; }
              .practice-card ul { padding-left: 20px; margin: 0; }
              .practice-card li { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 5px; }
              
              .decision-box { background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; margin-bottom: 25px; }
              .decision-box h4 { margin-top: 0; color: #3b82f6; }
              .decision-box ol { margin: 0; padding-left: 20px; }
              .decision-box li { margin-bottom: 10px; color: var(--text-primary); font-size: 0.9rem; }

              .performance-tips { background: var(--bg-secondary); padding: 15px; border-radius: 8px; border: 1px dashed var(--border-color); }
              .performance-tips h4 { margin-top: 0; display: flex; align-items: center; gap: 8px; }
              .tip-item { margin-bottom: 15px; }
              .tip-item:last-child { margin-bottom: 0; }
              .tip-item strong { display: block; margin-bottom: 5px; color: var(--text-primary); }
              .tip-item p { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }

              @media (max-width: 768px) {
                .best-practice-grid { grid-template-columns: 1fr; }
              }
            `}</style>

            <RelatedLinks
                links={[
                    {
                        path: "/js-css/variables",
                        title: "2. CSS Variables (JS)",
                        description: "JS로 CSS 변수를 조작하여 더 강력한 동적 스타일링을 구현합니다.",
                        icon: "🧪"
                    }
                ]}
            />
        </div>
    );
};

export default JsCssDomStudy;
