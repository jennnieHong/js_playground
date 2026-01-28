import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsOperatorsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Operator Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 결과를 보려면 Apply를 누르세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="2. 연산자 (Operators)"
                subtitle="데이터를 조작하고 비교하며 논리를 구성하는 자바스크립트의 도구들을 배웁니다."
            />

            <CollapsibleSection title="1. 산술 및 대입 연산자" initiallyOpen={true}>
                <div className="concepts">
                    <p>숫자 계산과 변수에 값을 할당하는 가장 기본적인 연산자입니다.</p>
                    <ul>
                        <li><code>+ , - , * , /</code>: 사칙연산</li>
                        <li><code>%</code>: 나머지 연산자</li>
                        <li><code>**</code>: 거듭제곱 (ES6)</li>
                        <li><code>+=, -=, *=, /=</code>: 복합 대입 연산자</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-arithmetic"
                    initialHtml={consoleHtml}
                    initialJs={`let x = 10;
let y = 3;

log("x + y = " + (x + y));
log("x - y = " + (x - y));
log("x * y = " + (x * y));
log("x / y = " + (x / y));
log("x % y = " + (x % y));   // 1 (나머지)
log("x ** y = " + (x ** y)); // 1000 (10의 3승)

x += 5; // x = x + 5
log("x after += 5: " + x);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 비교 연산자 (Comparison)">
                <div className="concepts">
                    <p>값을 비교하여 <code>true</code> 또는 <code>false</code>를 반환합니다.</p>
                    <blockquote>
                        <strong>중요:</strong> <code>==</code> 보다는 타입까지 엄격하게 비교하는 <code>===</code> 사용을 권장합니다.
                    </blockquote>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-compare"
                    initialHtml={consoleHtml}
                    initialJs={`const a = 10;
const b = "10";

log("a == b : " + (a == b));   // true (값만 비교)
log("a === b : " + (a === b)); // false (타입까지 비교)
log("a !== b : " + (a !== b)); // true (타입이 다름)

log("a > 5 : " + (a > 5));
log("a <= 10 : " + (a <= 10));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 논리 연산자 (Logical)">
                <div className="concepts">
                    <p>여러 조건을 결합하거나 반전시킬 때 사용합니다.</p>
                    <ul>
                        <li><code>&&</code> (AND): 모든 조건이 true여야 함</li>
                        <li><code>||</code> (OR): 하나만 true여도 true</li>
                        <li><code>!</code> (NOT): 결과를 반전</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-logical"
                    initialHtml={consoleHtml}
                    initialJs={`const isRich = true;
const isHappy = false;

log("Rich AND Happy: " + (isRich && isHappy));
log("Rich OR Happy: " + (isRich || isHappy));
log("NOT Happy: " + (!isHappy));

// 단락 평가 (Short-circuit evaluation)
const name = "";
const displayName = name || "Anonymous";
log("User Name: " + displayName);`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsOperatorsStudy;
