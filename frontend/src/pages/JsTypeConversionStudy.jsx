import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsTypeConversionStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Conversion Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 형변환 결과를 확인하세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="3. 데이터 타입 변환 (Type Conversion)"
                subtitle="데이터의 옷을 갈아입히기: Number(), BigInt() 함수와 자바스크립트의 변환 메커니즘을 심도 있게 다룹니다."
            />

            <CollapsibleSection title="1. Number() 함수의 상세 동작 (Explicit Number Conversion)" initiallyOpen={true}>
                <div className="concepts">
                    <p>전역 함수 <code>Number()</code>는 다양한 타입의 데이터를 숫자로 변환합니다. 이때 결과가 <code>NaN</code>이 되는 케이스를 정확히 아는 것이 중요합니다.</p>
                    <ul>
                        <li><strong>Boolean:</strong> <code>true</code> → 1, <code>false</code> → 0</li>
                        <li><strong>String:</strong> 유효한 숫자 형태면 숫자, 아니면 <code>NaN</code>. (빈 문자열은 0)</li>
                        <li><strong>Null:</strong> 0으로 변환됨.</li>
                        <li><strong>Undefined:</strong> <code>NaN</code>으로 변환됨.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-conversion-number"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Number() Conversion ---");
log("true -> " + Number(true)); 
log("false -> " + Number(false));
log("null -> " + Number(null)); 
log("undefined -> " + Number(undefined));
log("'' (empty string) -> " + Number(""));
log("'123' -> " + Number("123"));
log("'123abc' -> " + Number("123abc")); // NaN

// parseInt와의 차이점
log("\\n--- vs parseInt ---");
log("parseInt('123abc') -> " + parseInt("123abc")); // 123 (추출 가능)`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. BigInt() 함수의 규칙 (BigInt Conversion)">
                <div className="concepts">
                    <p><code>BigInt()</code> 함수는 다른 값을 BigInt 타입으로 변환할 때 사용하지만, <code>Number()</code>보다 훨씬 까다롭습니다.</p>
                    <ul>
                        <li><strong>Strictness:</strong> 소수점이 포함된 숫자나 문자열을 넣으면 <code>RangeError</code>가 발생합니다.</li>
                        <li><strong>No Auto-rounding:</strong> 숫자를 자동으로 반올림해주지 않습니다.</li>
                        <li><strong>Explicit Only:</strong> BigInt는 연산 시 암시적 형변환(Coercion)이 일어나지 않습니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-conversion-bigint"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- BigInt() Conversion ---");
log("100 -> " + BigInt(100));
log("'100' -> " + BigInt("100"));
log("true -> " + BigInt(true)); // 1n

// 에러 케이스
try {
  log(BigInt(10.5)); // 소수점 불가
} catch(e) {
  log("Float Error: " + e.message);
}

try {
  log(BigInt(undefined)); // undefined 불가
} catch(e) {
  log("Undefined Error: " + e.message);
}

log("\\n* BigInt는 null이나 undefined를 숫자로 자동 변환하지 않습니다.");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 명시적 vs 암시적 변환 (Explicit vs Implicit)">
                <div className="concepts">
                    <p>자바스크립트 엔진이 필요에 따라 타입을 자동으로 바꾸는 것을 <strong>Coercion(강제 변환)</strong>이라고 합니다.</p>
                    <ul>
                        <li><strong>덧셈(+):</strong> 피연산자 중 하나만 문자열이어도 전체를 문자열로 합칩니다.</li>
                        <li><strong>기타 산술(-, *, /):</strong> 문자열을 숫자로 바꾸려 시도합니다.</li>
                        <li><strong>동등 비교(==):</strong> 서로 다른 타입을 비교할 때 한쪽을 변환하여 비교합니다. (비권장)</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-conversion-implicit"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Implicit Coercion ---");
log("'10' + 5 = " + ('10' + 5)); // "105" (String)
log("'10' - 5 = " + ('10' - 5)); // 5 (Number)
log("'10' * '2' = " + ('10' * '2')); // 20 (Number)

log("\\n--- Comparison ---");
log("'10' == 10: " + ('10' == 10)); // true (위험!)
log("'10' === 10: " + ('10' === 10)); // false (안전!)

log("\\n* 복잡한 버그를 방지하기 위해 항상 === 를 사용하는 것이 원칙입니다.");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. Truthy & Falsy (불리언 변환)">
                <div className="concepts">
                    <p>모든 데이터는 불리언(Boolean)으로 변환될 때 '참 같은 값' 혹은 '거짓 같은 값'으로 분류됩니다.</p>
                    <p><strong>Falsy (거짓 같은 값) 딱 6가지만 외우세요:</strong></p>
                    <ul>
                        <li><code>false</code>, <code>0</code>, <code>""</code>(빈 문자열), <code>null</code>, <code>undefined</code>, <code>NaN</code></li>
                    </ul>
                    <p>나머지 모든 값(빈 객체 <code>{ }</code>, 빈 배열 <code>[]</code> 포함)은 <strong>Truthy</strong>입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-conversion-truthy"
                    initialHtml={consoleHtml}
                    initialJs={`log("--- Falsy Check ---");
log("Boolean(0): " + Boolean(0));
log("Boolean(''): " + Boolean(""));
log("Boolean(null): " + Boolean(null));

log("\\n--- Truthy Check ---");
log("Boolean([]): " + Boolean([])); // 빈 배열은 true!
log("Boolean({}): " + Boolean({})); // 빈 객체도 true!
log("Boolean(' '): " + Boolean(" ")); // 공백이 있는 문자열은 true!`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. Truthy & Falsy 실전 활용 패턴">
                <div className="concepts">
                    <p>Truthy와 Falsy는 단순히 `if`문 안에서만 쓰이는 것이 아니라, 코드를 짧고 깔끔하게 만드는 다양한 기법에 활용됩니다.</p>
                    <ul>
                        <li><strong>기본값 할당 (||):</strong> 값이 없을 때 대체값을 넣습니다.</li>
                        <li><strong>단락 평가 (&&):</strong> 앞의 조건이 참일 때만 뒤의 코드를 실행합니다.</li>
                        <li><strong>불리언 강제 변환 (!!):</strong> 값을 명확한 <code>true/false</code>로 바꿉니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-conversion-patterns"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 기본값 설정 (OR 연산자)
let inputName = ""; 
const userName = inputName || "익명 사용자";
log("User Name: " + userName); // ""은 Falsy이므로 뒤의 값이 선택됨

// 2. 가드 구문 (AND 연산자)
const user = { loggedIn: true, name: "JENNIE" };
user.loggedIn && log(\`어서오세요, \${user.name}님!\`);

// 3. 존재 여부 확인 후 메서드 호출
const profile = null;
// profile.data; // Error 발생!
profile && log(profile.data); // 아무 일도 일어나지 않음 (안전)

// 4. Double NOT (!!) 연산자
// 값을 순수 불리언으로 강제 변환할 때 사용합니다.
log("\\n--- Double NOT (!!) ---");
log("!!'hello' -> " + !!"hello"); // true
log("!!null -> " + !!null);       // false
log("!!0 -> " + !!0);             // false`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsTypeConversionStudy;
