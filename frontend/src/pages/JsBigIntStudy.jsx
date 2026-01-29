import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsBigIntStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">BigInt Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과를 확인하세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="2. BigInt Deep Dive"
                subtitle="Number의 한계를 넘어서: 자바스크립트에서 아주 큰 정수를 안전하게 다루는 법을 배웁니다."
            />

            <CollapsibleSection title="1. BigInt란 무엇인가? (Definition)" initiallyOpen={true}>
                <div className="concepts">
                    <p>자바스크립트의 <code>Number</code>는 <strong>IEEE 754</strong> 배정밀도 부동소수점을 따르기 때문에, 안전하게 표현할 수 있는 최대 정수가 <code>2^53 - 1</code>로 제한됩니다.</p>
                    <p><strong>BigInt</strong>는 이 제한을 넘어선 임의 정밀도의 정수를 표현할 수 있는 새로운 원시 타입입니다.</p>
                    <ul>
                        <li><strong>Syntax:</strong> 정수 리터럴 끝에 <code>n</code>을 붙이거나 <code>BigInt()</code> 함수를 호출합니다.</li>
                        <li><strong>Precision:</strong> 메모리가 허용하는 한 거의 무한대의 크기를 다룰 수 있습니다.</li>
                        <li><strong>Only Integers:</strong> 소수점 데이터는 저장할 수 없습니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-bigint-intro"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. Number의 한계 확인
const maxSafe = Number.MAX_SAFE_INTEGER;
log("Max Safe Integer: " + maxSafe);
log("Max + 1: " + (maxSafe + 1));
log("Max + 2: " + (maxSafe + 2)); // 결과값이 이상하게 나옵니다 (정밀도 상실)

// 2. BigInt로 해결
const bigNum1 = 9007199254740991n;
const bigNum2 = 9007199254740991n + 2n;
log("\\nBigInt Result: " + bigNum2); // 정확한 값이 출력됩니다.`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 문법과 초기화 (Syntax & Initialization)">
                <div className="concepts">
                    <p>BigInt를 만드는 두 가지 주요 방법이 있습니다.</p>
                    <ul>
                        <li><code>100n</code>: 리터럴 방식 (가장 권장됨)</li>
                        <li><code>BigInt(100)</code>: 함수 호출 방식 (동적인 값을 처리할 때 유용)</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-bigint-syntax"
                    initialHtml={consoleHtml}
                    initialJs={`const fromLiteral = 12345678901234567890n;
const fromFunction = BigInt("12345678901234567890");

log("From Literal: " + fromLiteral);
log("From Function: " + fromFunction);
log("Same value? " + (fromLiteral === fromFunction));

// 주의: BigInt() 함수에 소수를 넣으면 에러가 발생합니다.
try {
  BigInt(10.5);
} catch(e) {
  log("\\nError: " + e.message);
}`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. ⚠️ 주의: 'new' 키워드 사용 금지 (No Constructor)">
                <div className="concepts">
                    <p>BigInt는 <code>Number</code>나 <code>String</code>과 달리 **생성자(Constructor)로 사용할 수 없습니다.**</p>
                    <div className="info-box">
                        <strong>🤔 왜 new BigInt()는 안 되나요?</strong>
                        <p>과거 <code>new Number(123)</code>와 같은 생성자 방식은 원시 값(Primitive)이 아닌 <strong>객체(Object)</strong>를 만들어내어 타입 혼란과 성능 저하를 일으켰습니다.</p>
                        <p>BigInt는 이러한 역사적 실수를 반복하지 않기 위해 설계되었으며, 항상 원시 값(Primitive)으로만 존재하도록 <code>new</code> 사용을 문법적으로 막아두었습니다.</p>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-bigint-new-error"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 정상적인 함수 호출
const validBigInt = BigInt(100);
log("Type: " + typeof validBigInt); // "bigint"

// 2. new 사용 시 에러 발생
try {
  const invalid = new BigInt(100);
} catch(e) {
  log("\\nBigInt Error: " + e.message);
  log("=> 'new'를 쓸 수 없습니다. (원시 타입 보호)");
}

// ★ 보너스: Symbol도 똑같습니다!
log("\\n--- Symbol Comparison ---");
try {
  const sym = new Symbol("foo");
} catch(e) {
  log("Symbol Error: " + e.message);
  log("=> Symbol도 BigInt처럼 전용 생성자가 금지되어 있습니다.");
}`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 엄격한 연산 규칙 (Strict Constraints)">
                <div className="concepts">
                    <p>BigInt는 일반 <code>Number</code>와 함께 연산할 때 매우 엄격한 규칙이 적용됩니다.</p>
                    <ul>
                        <li><strong>혼합 연산 불가:</strong> BigInt와 Number를 직접 더하거나 뺄 수 없습니다. (의도치 않은 정밀도 손실 방지)</li>
                        <li><strong>나눗셈 결과:</strong> 소수점 이하가 버려지고 항상 정수만 반환됩니다.</li>
                        <li><strong>비교 연산:</strong> <code>==</code>는 가능하지만 타입까지 체크하는 <code>===</code>는 결과가 <code>false</code>입니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-bigint-constraints"
                    initialHtml={consoleHtml}
                    initialJs={`const big = 10n;
const num = 2;

// 1. 혼합 연산 (Error 발생)
try {
  log(big + num);
} catch(e) {
  log("Mixing Error: " + e.message);
}

// 2. 해결책: 형변환
log("Correct Mix: " + (big + BigInt(num)));

// 3. 나눗셈의 비밀
log("\\n5n / 2n = " + (5n / 2n)); // 2.5가 아니라 2 (소수점 증발)

// 4. 비교 연산
log("\\n10n == 10: " + (10n == 10)); // true (값이 같음)
log("10n === 10: " + (10n === 10)); // false (타입이 다름)`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 실무 사용 사례 (Use Cases)">
                <div className="concepts">
                    <p>BigInt는 주로 다음과 같은 상황에서 필수적으로 사용됩니다.</p>
                    <ul>
                        <li><strong>데이터베이스 ID:</strong> 64비트 정수 ID를 사용하는 API 응답 처리.</li>
                        <li><strong>금융 거래:</strong> 아주 큰 단위의 통화량 계산 (화폐 가치가 낮은 통화 등).</li>
                        <li><strong>고성능 계산:</strong> 암호학이나 수학적 시뮬레이션.</li>
                    </ul>
                </div>
            </CollapsibleSection>
        </div>
    );
};

export default JsBigIntStudy;
