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
    <span class="console-title">Advanced Ops Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 결과를 보려면 Apply를 누르세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="4. 연산자 마스터 (Arithmetic & Assignment)"
                subtitle="데이터를 계산하고, 할당하고, 비교하는 모든 연산자를 깊이 있게 다룹니다."
            />

            <CollapsibleSection title="1. 산술 연산자 (Arithmetic Operators)" initiallyOpen={true}>
                <div className="concepts">
                    <p>가장 기본이 되는 계산 연산자입니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>기본 사칙연산</h4>
                            <p><code>+ , - , * , /</code></p>
                        </div>
                        <div className="info-card">
                            <h4>나머지 & 거듭제곱</h4>
                            <p><code>%</code> (나머지), <code>**</code> (거듭제곱)</p>
                        </div>
                        <div className="info-card">
                            <h4>증감 연산자</h4>
                            <p><code>++</code>, <code>--</code> (전위/후위 주의)</p>
                        </div>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-arithmetic-deep"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 기본 연산
log("10 % 3 = " + (10 % 3));   // 1
log("2 ** 3 = " + (2 ** 3));     // 8

// 2. 증감 연산자의 미묘한 차이
let a = 5;
let b = 5;

log("\\n[Increment Test]");
log("a++ (후위): " + (a++)); // 5 (출력 후 증가)
log("++b (전위): " + (++b)); // 6 (증가 후 출력)
log("Final a: " + a);       // 6

// 3. 단항 연산자 (Unary)
let str = "100";
log("\\n[Unary Test]");
log(typeof +str); // number (문자열을 숫자로 즉시 변환)
log(-a);         // -6 (부호 반전)`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 대입 연산자 (Assignment Operators)">
                <div className="concepts">
                    <p>변수에 값을 할당하며 동시에 연산을 수행하는 단축형 연산자들입니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>산술 대입</h4>
                            <p><code>+=, -=, *=, /=, %=, **=</code></p>
                        </div>
                        <div className="info-card">
                            <h4>논리 대입 (ES2021)</h4>
                            <p><code>&&=, ||=, ??=</code></p>
                        </div>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-assignment-deep"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 산술 대입
let num = 10;
num += 5; // num = num + 5
num **= 2; // num = num ** 2
log("Arithmetic Assignment: " + num);

// 2. 논리 대입 (Modern JS)
// ||= (OR 대입): 값이 falsy 일 때만 할당
let msg = "";
msg ||= "Hello Default"; 
log("\\n||= Result: " + msg);

// ??= (Nullish 대입): 값이 null/undefined 일 때만 할당
let count = 0;
count ??= 100; 
log("??= Result: " + count); // 0은 nullish가 아니므로 그대로 0

// &&= (AND 대입): 값이 truthy 일 때만 할당
let user = { loggedIn: true };
user.loggedIn &&= "Active Session";
log("&&= Result: " + user.loggedIn);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 비교 및 일치 연산자">
                <div className="concepts">
                    <p>값을 비교하여 불리언(true/false)을 반환합니다. 항상 <strong>엄격한 비교(===)</strong>를 지향해야 합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-compare-deep"
                    initialHtml={consoleHtml}
                    initialJs={`log("5 == '5' : " + (5 == '5'));   // true (자동 형변환)
log("5 === '5' : " + (5 === '5')); // false (타입까지 비교)

log("\\n[Special Comparisons]");
log("null == undefined : " + (null == undefined));   // true
log("null === undefined : " + (null === undefined)); // false

log("NaN === NaN : " + (NaN === NaN)); // false (NaN은 자기 자신과도 다름!)
log("Number.isNaN(NaN) : " + Number.isNaN(NaN)); // true`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 논리 & 널 병합 연산자: || vs ??">
                <div className="concepts">
                    <p>기본값(Fallback)을 설정할 때 가장 중요한 두 연산자의 장단점을 비교합니다.</p>
                    
                    <div className="info-table-wrapper">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>연산자</th>
                                    <th>장점 (Pros)</th>
                                    <th>단점 (Cons)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>||</code> (OR)</td>
                                    <td>모든 <strong>Falsy</strong> 값(0, "", false 등)을 한꺼번에 체크하여 안전장치를 만들기에 편리합니다.</td>
                                    <td>유효한 데이터인 숫자 <code>0</code>이나 빈 문자열 <code>""</code>까지도 무시하고 기본값을 씌워버리는 'Falsy Trap' 위험이 있습니다.</td>
                                </tr>
                                <tr>
                                    <td><code>??</code> (Nullish)</td>
                                    <td>오직 <strong>null</strong>과 <strong>undefined</strong>만 체크하므로, 숫자 0이나 빈 문자열을 데이터로서 완벽하게 보존합니다.</td>
                                    <td>비교적 최근 스펙(ES2020)이며, 다른 논리 연산자와 섞어 쓸 때 반드시 괄호가 필요하여 문법이 조금 더 까다롭습니다.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <style>{`
                        .info-table-wrapper { margin: 15px 0; overflow-x: auto; }
                        .info-table { width: 100%; border-collapse: collapse; background: var(--bg-secondary); border-radius: 8px; font-size: 0.9rem; }
                        .info-table th, .info-table td { padding: 12px; border: 1px solid var(--border-color); text-align: left; }
                        .info-table th { background: var(--bg-tertiary); color: var(--text-primary); }
                        .info-table td { color: var(--text-secondary); line-height: 1.5; }
                    `}</style>

                    <h4>Case 1: Falsy Trap 실습</h4>
                    <p>데이터가 존재하지 않을 때와 '값이 0일 때'의 처리 차이를 확인해보세요.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-falsy-trap"
                    initialHtml={consoleHtml}
                    initialJs={`// 게임 설정 예시
const config = {
  volume: 0,        // 설정값이 0인 상태
  playerName: "",   // 이름이 아직 없는 상태
  difficulty: null  // 설정 자체가 안 된 상태
};

log("--- || (OR) 사용 시 ---");
log("Volume: " + (config.volume || 50));        // 50 (0을 무시함!)
log("Name: " + (config.playerName || "GUEST")); // GUEST (빈칸 무시)
log("Diff: " + (config.difficulty || "NORMAL"));

log("\\n--- ?? (Nullish) 사용 시 ---");
log("Volume: " + (config.volume ?? 50));        // 0 (0 유지! - 정확함)
log("Name: " + (config.playerName ?? "GUEST")); // "" (빈칸 유지! - 정확함)
log("Diff: " + (config.difficulty ?? "NORMAL"));`}
                />

                <div className="concepts">
                     <h4>Case 2: 문법 제약 & 단락 평가</h4>
                     <p>연산자를 섞어 쓸 때 발생하는 에러와, 조건에 따라 실행 여부가 결정되는 특성을 확인하세요.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-short-circuit"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 혼용 금지 제약 (Syntax Rule)
// const bad = a || b ?? c; // ❌ 에러 발생
const safe = (true || false) ?? "OK"; // ✅ 성공
log("Mixing Rule: " + safe);

// 2. 단락 평가 (Short-circuit) 활용과 부작용
let logStatus = "Not Called";
const getSecret = () => { logStatus = "Called!"; return "1234"; };

// [AND 활용]: 앞이 true일 때만 호출
const isAuth = true;
const key = isAuth && getSecret();
log("\\nAuth Status: " + isAuth);
log("Function Status: " + logStatus);
log("Key: " + key);

// [OR 활용]: 앞이 true면 뒤는 쳐다보지도 않음
logStatus = "Not Called";
const ready = true || getSecret();
log("\\nReady Status: " + ready);
log("Function Status (after ||): " + logStatus); // Not Called (이미 끝남!)`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 삼항 연산자 (Conditional Operator)">
                <div className="concepts">
                    <p><code>조건 ? 참일때 : 거짓일때</code> 형식으로 <code>if</code>문을 짧게 대체합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-ops-ternary"
                    initialHtml={consoleHtml}
                    initialJs={`const age = 20;
const access = age >= 18 ? "✅ 승인" : "❌ 거절";

log("접근 여부: " + access);

// 중첩 삼항 (가독성을 위해 주의해서 사용)
const score = 85;
const grade = score >= 90 ? 'A' : (score >= 80 ? 'B' : 'C');
log("학점: " + grade);`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsOperatorsStudy;

