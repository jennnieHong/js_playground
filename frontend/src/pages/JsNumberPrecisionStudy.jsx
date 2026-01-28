import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsNumberPrecisionStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Precision Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 계산 오차 테스트 결과를 확인하세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="15. 숫자 계산 오차와 정밀도 (Number Precision)"
                subtitle="0.1 + 0.2가 0.3이 아닌 이유: 자바스크립트의 IEEE 754 부동 소수점 오차 원인과 실전 해결책을 마스터합니다."
            />

            <CollapsibleSection title="1. 부동 소수점 오차의 원인 (The Problem)" initiallyOpen={true}>
                <div className="concepts">
                    <p>자바스크립트는 모든 숫자를 <strong>64비트 부동 소수점(IEEE 754)</strong> 형식으로 저장합니다.</p>
                    <p>컴퓨터는 2진법을 사용하기 때문에, 10진법의 <code>0.1</code>이나 <code>0.2</code>를 무한 소수로 표현하게 되어 미세한 반올림 오차가 발생합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-precision-problem"
                    initialHtml={consoleHtml}
                    initialJs={`const a = 0.1;
const b = 0.2;
const sum = a + b;

log("0.1 + 0.2 = " + sum);
log("0.1 + 0.2 === 0.3 ? " + (sum === 0.3));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 해결책 1: Number.EPSILON">
                <div className="concepts">
                    <p><code>Number.EPSILON</code>은 두 숫자가 '실질적으로 같은가?'를 판단할 때 사용하는 아주 작은 값입니다.</p>
                    <div className="pros-cons">
                        <p>✅ <strong>장점:</strong> 수식의 결과를 비교할 때 가장 표준적이고 간단함.</p>
                        <p>❌ <strong>단점:</strong> 연산 과정(중간 단계)의 오차 누적을 막아주지는 못함.</p>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-precision-epsilon"
                    initialHtml={consoleHtml}
                    initialJs={`function areEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON;
}

const sum = 0.1 + 0.2;
log("EPSILON 비교 결과: " + areEqual(sum, 0.3));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 해결책 2: 반올림 (toFixed, Math.round)">
                <div className="concepts">
                    <p>최종 결과를 사용자에게 보여줄 때 적합한 방식입니다.</p>
                    <div className="pros-cons">
                        <p>✅ <strong>장점:</strong> UI 표시용으로 매우 직관적이고 쉬움.</p>
                        <p>❌ <strong>단점:</strong> <code>toFixed</code>는 결과를 **문자열**로 반환하며, 잦은 반올림은 데이터의 원본 값을 왜곡함.</p>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-precision-rounding"
                    initialHtml={consoleHtml}
                    initialJs={`const sum = 0.1 + 0.2;
log("toFixed(2): " + sum.toFixed(2));
log("숫자로 다시 변환: " + Number(sum.toFixed(2)));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 해결책 3: 정수 확장 (Integer Scaling)">
                <div className="concepts">
                    <p><strong>[가장 권장]</strong> 소수점을 정수로 변환하여 연산한 뒤, 마지막에만 다시 소수로 바꿉니다.</p>
                    <div className="pros-cons">
                        <p>✅ <strong>장점:</strong> 오차가 전혀 없는 정확한 정수 계산이 가능함 (금융 앱 필수).</p>
                        <p>❌ <strong>단점:</strong> 모든 값을 특정 배수(100, 1000 등)로 맞춰야 하는 코드 관리 비용 발생.</p>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-precision-scaling"
                    initialHtml={consoleHtml}
                    initialJs={`// $0.1 + $0.2 를 센트 단위로 계산
const c1 = 10; // 0.1 * 100
const c2 = 20; // 0.2 * 100
log("결과: $" + (c1 + c2) / 100);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 안전한 정수의 범위 (Safe Integer)">
                <div className="concepts">
                    <p>부동 소수점은 소수뿐 아니라 아주 큰 정수 연산에서도 문제를 일으킵니다.</p>
                    <p>자바스크립트 숫자가 안전하게 연산할 수 있는 범위는 **±(2^53 - 1)** 입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-precision-safe"
                    initialHtml={consoleHtml}
                    initialJs={`const max = Number.MAX_SAFE_INTEGER;
log("MAX SAFE: " + max);
log("MAX + 1: " + (max + 1));
log("MAX + 2: " + (max + 2)); // MAX + 1과 결과가 같음 (정밀도 한계)

log("\\nIs MAX+2 safe? " + Number.isSafeInteger(max + 2));
log("=> 이 범위를 넘으면 BigInt를 사용해야 합니다.");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="6. 특수 숫자값 (Special Values)">
                <div className="concepts">
                    <p>계산 도중 발생할 수 있는 특수한 상황들을 체크해야 합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-precision-special"
                    initialHtml={consoleHtml}
                    initialJs={`log("0으로 나누기: " + (10 / 0));    // Infinity
log("음수를 0으로: " + (-10 / 0)); // -Infinity
log("0을 0으로: " + (0 / 0));       // NaN

log("\\nInfinity 체크: " + Number.isFinite(10 / 0));
log("NaN 체크: " + Number.isNaN(0 / 0));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="7. 결론: 상황별 권장 방식 & 주의사항">
                <div className="concepts">
                    <h3>💡 실무 권장 로드맵 (Best Practices)</h3>
                    <ol>
                        <li><strong>단순 화면 표시:</strong> <code>toFixed()</code>를 사용하되, 가장 마지막에 호출하세요.</li>
                        <li><strong>일반적인 로직 비교:</strong> <code>Number.EPSILON</code>을 활용한 비교 함수를 쓰세요.</li>
                        <li><strong>돈, 중요 데이터 계산:</strong> <strong>정수 확장(Integer Scaling)</strong>이 표준입니다. ($ → ¢ 변환)</li>
                        <li><strong>복잡한 수학/금융 앱:</strong> `Decimal.js` 같은 라이브러리 도입을 검토하세요.</li>
                    </ol>

                    <blockquote>
                        <strong>⚠️ 주의사항 (Critical Cautions):</strong>
                        <ul>
                            <li><strong>연산 중 <code>toFixed</code> 금지:</strong> <code>toFixed</code>는 문자열을 반환합니다. <code>(0.1).toFixed(2) + (0.2).toFixed(2)</code>는 <code>"0.100.20"</code>이 됩니다!</li>
                            <li><strong>동등 비교(==, ===) 금지:</strong> 소수점 연산 결과에 직접 <code>===</code>를 쓰는 것은 복권 당첨 확률을 기대하는 것과 같습니다.</li>
                            <li><strong>정수 범위 확인:</strong> 정수 확장을 쓸 때도 <code>Number.MAX_SAFE_INTEGER</code>를 넘지 않는지 확인하세요.</li>
                        </ul>
                    </blockquote>
                </div>
                <LiveCodeEditor
                    scopeId="js-precision-verdict"
                    initialHtml={consoleHtml}
                    initialJs={`// 절대 하면 안 되는 실수 예시
const price1 = (0.1).toFixed(2); // "0.10" (String)
const price2 = (0.2).toFixed(2); // "0.20" (String)

log("❌ 잘못된 합산 (문자열 결합): " + (price1 + price2)); 

// 올바른 순서: 연산은 숫자로, 표시는 마지막에!
const correctSum = 0.1 + 0.2;
log("✅ 올바른 합산 후 표시: " + correctSum.toFixed(2));`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsNumberPrecisionStudy;
