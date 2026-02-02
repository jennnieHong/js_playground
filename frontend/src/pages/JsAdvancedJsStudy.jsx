import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsAdvancedJsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Advanced JS Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 고급 기법 실행 결과가 여기에 표시됩니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="19. Generators & Currying (고급 함수 기법)"
                subtitle="함수의 실행을 일시 중지하거나, 인자를 부분적으로 적용하는 고급 함수 제어 기법을 마스터합니다."
            />

            <CollapsibleSection title="1. 제너레이터 (Generators): 중단 가능한 함수" initiallyOpen={true}>
                <div className="concepts">
                    <p>제너레이터는 함수의 실행을 중간에 멈췄다가(yield) 나중에 다시 시작할 수 있는 특별한 함수입니다.</p>
                    
                    <div className="info-box success" style={{ marginTop: '15px' }}>
                        <strong>💡 언제 사용하는가? (Use Cases)</strong>
                        <ul>
                            <li><strong>대용량 데이터 조작:</strong> 모든 데이터를 한 번에 배열에 넣지 않고, 필요할 때마다 하나씩 꺼내 써서 <strong>메모리 사용량을 제약</strong>할 때 최고입니다.</li>
                            <li><strong>비동기 제어:</strong> 코드의 흐름을 동기적으로 보이게 하면서 비동기 작업을 순차적으로 실행할 때 유용합니다.</li>
                            <li><strong>커스텀 이터레이터:</strong> 객체에 <code>Symbol.iterator</code>를 직접 구현할 때 복잡한 로직을 제너레이터로 간단히 짤 수 있습니다.</li>
                        </ul>
                    </div>

                    <div className="info-table-wrapper" style={{ marginTop: '20px' }}>
                        <table className="info-table">
                            <thead>
                                <tr><th>장점 (Pros)</th><th>단점 (Cons)</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>메모리 효율적 (Lazy Evaluation)</td><td>코드가 다소 복잡하고 생소할 수 있음</td></tr>
                                <tr><td>비한정(무한) 데이터를 다룰 수 있음</td><td>이터레이터 객체를 관리해야 함</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-generators"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 메모리 절약형 "데이터 스트리밍" 시뮬레이션
function* dataStreamer(items) {
  log("--- 스트리밍 시작 ---");
  for (const item of items) {
    // 거대한 작업 수행 시뮬레이션
    log(\`Processing \${item}...\`);
    yield \`[Result: \${item.toUpperCase()}]\`;
  }
}

const source = ["apple", "banana", "cherry"];
const stream = dataStreamer(source);

// "지금 당장" 필요한 데이터만 하나씩 처리함
log("Next Result: " + stream.next().value);
log("다른 로직을 수행하다가...");
log("Next Result: " + stream.next().value);

// 2. 무한 카운터 (메모리 걱정 ZERO)
function* infiniteCounter() {
  let count = 0;
  while(true) yield ++count;
}
const counter = infiniteCounter();
log("\\nInfinite 1: " + counter.next().value);
log("Infinite 2: " + counter.next().value);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 커링 (Currying): 인자 조각내기">
                <div className="concepts">
                    <p>커링은 여러 개의 인자를 받는 함수를 **하나의 인자만 받는 함수들의 체인**으로 바꾸는 기법입니다.</p>
                    
                    <div className="info-box success" style={{ marginTop: '15px' }}>
                        <strong>💡 언제 사용하는가? (Use Cases)</strong>
                        <ul>
                            <li><strong>부분 적용(Partial Application):</strong> 함수의 설정값이나 공통 인자를 미리 고정해두고, 나중에 핵심 데이터만 전달하며 재사용할 때 유용합니다.</li>
                            <li><strong>동적 함수 생성:</strong> 비슷한 로직을 가진 함수들을 설정값만 바꿔서 여러 개 찍어낼 때 (예: 로거, 검증기) 사용합니다.</li>
                            <li><strong>지연 실행:</strong> 필요한 인자가 모두 모일 때까지 함수 실행을 미루고 싶을 때 효과적입니다.</li>
                        </ul>
                    </div>

                    <div className="info-table-wrapper" style={{ marginTop: '20px' }}>
                        <table className="info-table">
                            <thead>
                                <tr><th>장점 (Pros)</th><th>단점 (Cons)</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>가독성 및 코드 재사용성 향상</td><td>함수가 중첩되어 호출 스택이 늘어남</td></tr>
                                <tr><td>함수 합성(Composition)에 유리함</td><td>지나친 커링은 코드를 이해하기 어렵게 만듬</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-currying"
                    jsHeight='600px'
                    cssHeight='600px'
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 실무 사례: 동적 HTML 생성기
const createElement = tag => className => content => {
  return \`<\${tag} class="\${className}">\${content}</\${tag}>\`;
};

// 특정 태그로 고정된 '전문화된 함수'들 생성
const createBtn = createElement('button');
const createPrimaryBtn = createBtn('btn-primary');
const createErrorBtn = createBtn('btn-danger');

log("--- Button Generation ---");
log(createPrimaryBtn("Submit"));
log(createErrorBtn("Delete"));


// 2. 활용: 검증 룰 빌더 (Validation Rule Builder)
// 🎯 목표: "검증 규칙"과 "검증 실행"을 분리하여 재사용 가능한 검증 함수 만들기

/**
 * [Step 1] 기본 룰(규칙) 함수 만들기
 * 이것들은 "진짜/거짓"만 판단하는 순수한 검사 로직
 */
const minLength = min => str => str.length >= min;
// minLength(8) → "8글자 이상인지 검사하는 함수" 반환
// minLength(8)("hello") → false (5글자니까)
// minLength(8)("password123") → true (11글자니까)

const isEmail = str => str.includes('@');
// isEmail("test@gmail.com") → true
// isEmail("notanemail") → false

log("=== [1단계] 기본 룰 테스트 ===");
log("8글자 이상? minLength(8)('abc'): " + minLength(8)("abc")); // false
log("8글자 이상? minLength(8)('password'): " + minLength(8)("password")); // true

/**
 * [Step 2] 검증 실행기(Validator) 만들기
 * validate = "룰을 받아서" → "그 룰로 검사하는 함수"를 반환
 */
const validate = rule => value => {
  const isValid = rule(value);
  log(\`🔍 Validating [\${value}]: \${isValid ? "✅ PASS" : "❌ FAIL"}\`);
  return isValid;
};

log("\\n=== [2단계] 검증 실행기 조립 ===");
/**
 * [핵심 이해]
 * checkPassword = validate(minLength(8))
 * 
 * 단계별 분해:
 * 1. minLength(8) → "8글자 이상 검사 함수" (rule)
 * 2. validate(rule) → "그 rule을 실행하며 로그 찍는 함수" 반환
 * 3. checkPassword("abc") → rule("abc") 실행하면서 결과 출력
 */
const checkPassword = validate(minLength(8));
const checkEmail = validate(isEmail);

log("비밀번호 검증기 생성 완료!");
log("이메일 검증기 생성 완료!");

log("\\n=== [3단계] 실제 검증 수행 ===");
checkPassword("123");           // ❌ FAIL (3글자)
checkPassword("secret1234");    // ✅ PASS (10글자)
checkEmail("test@example.com"); // ✅ PASS (@ 포함)

log("\\n💡 왜 이렇게 나눠서 만드나요?");
log("→ 룰(minLength)은 재사용 가능, 검증기(validate)도 재사용 가능!");
log("→ 새 룰만 추가하면 무한히 확장 가능: hasNumber, hasSpecialChar...");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2-1. 🔍 커링 완전 정복 (Currying Deep Dive)">
                <div className="concepts">
                    <p>커링을 진짜로 이해하기 위한 단계별 분해와 실무 활용 가이드입니다.</p>
                    
                    <div className="info-box info" style={{ marginTop: '20px' }}>
                        <strong>1️⃣ 원래 모습: 일반 함수</strong>
                        <div style={{ marginTop: '10px', padding: '12px', background: '#eff6ff', borderRadius: '4px' }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', padding: '8px', background: '#1f2937', color: '#10b981', borderRadius: '4px' }}>
                                function greet(greeting, name) {'{'}<br/>
                                &nbsp;&nbsp;return `${'{greeting}'}, ${'{name}'}!`;<br/>
                                {'}'}
                            </div>
                            <div style={{ marginTop: '10px', color: '#1e40af' }}>
                                <strong>사용:</strong> <code>greet("Hello", "Alice")</code> → "Hello, Alice!"<br/>
                                <strong>특징:</strong> 한 번에 모든 인자를 전달해야 함
                            </div>
                        </div>
                    </div>

                    <div className="info-box success" style={{ marginTop: '20px' }}>
                        <strong>2️⃣ Currying으로 바꾼 모습</strong>
                        <div style={{ marginTop: '10px', padding: '12px', background: '#f0fdf4', borderRadius: '4px' }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', padding: '8px', background: '#1f2937', color: '#10b981', borderRadius: '4px' }}>
                                function greet(greeting) {'{'}<br/>
                                &nbsp;&nbsp;return function(name) {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;return `${'{greeting}'}, ${'{name}'}!`;<br/>
                                &nbsp;&nbsp;{'}'};<br/>
                                {'}'}
                            </div>
                            <div style={{ marginTop: '10px', color: '#166534' }}>
                                <strong>사용:</strong> <code>greet("Hello")("Alice")</code><br/>
                                <strong>또는:</strong> <code>const sayHello = greet("Hello"); sayHello("Alice");</code><br/>
                                <strong>특징:</strong> 인자를 하나씩 받아서 처리
                            </div>
                        </div>
                    </div>

                    <div className="info-box warning" style={{ marginTop: '20px' }}>
                        <strong>3️⃣ 화살표 함수로 보면 구조가 더 잘 보인다</strong>
                        <div style={{ marginTop: '10px', padding: '12px', background: '#fef3c7', borderRadius: '4px' }}>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', padding: '8px', background: '#1f2937', color: '#10b981', borderRadius: '4px' }}>
                                const greet = greeting =&gt; name =&gt; `${'{greeting}'}, ${'{name}'}!`;
                            </div>
                            <div style={{ marginTop: '12px', lineHeight: '1.8', color: '#92400e' }}>
                                <strong>구조 해석:</strong><br/>
                                • <code>greeting =&gt;</code> 첫 번째 인자를 받고<br/>
                                • <code>name =&gt;</code> 두 번째 인자를 받는 함수를 반환<br/>
                                • <code>`...`</code> 최종적으로 문자열을 반환<br/>
                                <br/>
                                <strong>💡 화살표가 여러 개 = 함수가 함수를 반환!</strong>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: 'white', borderRadius: '8px' }}>
                        <strong style={{ fontSize: '1.1rem' }}>4️⃣ 왜 굳이 이렇게 쪼개서 쓰나?</strong>
                        <div style={{ marginTop: '15px', lineHeight: '1.8' }}>
                            <div>✅ <strong>설정과 데이터 분리:</strong> "인사말"은 고정, "이름"만 바뀔 때</div>
                            <div>✅ <strong>재사용성:</strong> <code>sayHello</code>, <code>sayHi</code>를 미리 만들어두고 계속 사용</div>
                            <div>✅ <strong>부분 적용:</strong> 함수를 만들 때 일부 설정만 먼저 고정</div>
                        </div>
                    </div>

                    <div className="info-table-wrapper" style={{ marginTop: '20px' }}>
                        <strong>5️⃣ 실무에서 체감되는 사용 패턴</strong>
                        <table className="info-table" style={{ marginTop: '10px' }}>
                            <thead>
                                <tr>
                                    <th>상황</th>
                                    <th>일반 함수</th>
                                    <th>커링 함수</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>로거 만들기</td>
                                    <td><code>log("Error", msg)</code> 매번 전달</td>
                                    <td><code>logError(msg)</code> 간결!</td>
                                </tr>
                                <tr>
                                    <td>API 클라이언트</td>
                                    <td><code>fetch(url, options)</code> 반복</td>
                                    <td><code>myAPI(endpoint)</code> 깔끔!</td>
                                </tr>
                                <tr>
                                    <td>이벤트 핸들러</td>
                                    <td><code>onClick(type, event)</code> 복잡</td>
                                    <td><code>onSave(event)</code> 명확!</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: '20px', padding: '15px', background: '#dbeafe', border: '2px solid #3b82f6', borderRadius: '6px' }}>
                        <strong style={{ color: '#1e40af' }}>6️⃣ Currying vs 일반 함수 차이 한 줄 요약</strong>
                        <div style={{ marginTop: '10px', fontSize: '1.05rem', fontWeight: 'bold', color: '#1e3a8a' }}>
                            일반 함수 = "재료를 한 번에 다 받아서 요리"<br/>
                            커링 함수 = "재료를 하나씩 받으면서 부분 완성 요리를 만들어감"
                        </div>
                    </div>

                    <div className="info-box danger" style={{ marginTop: '20px' }}>
                        <strong>7️⃣ 오해하기 쉬운 포인트</strong>
                        <div style={{ marginTop: '10px', lineHeight: '1.8' }}>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>❌ 오해:</strong> "커링은 무조건 화살표 함수로만 가능하다"<br/>
                                <strong>✅ 진실:</strong> <code>function</code> 키워드로도 가능! 화살표가 더 간결할 뿐
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <strong>❌ 오해:</strong> "커링하면 무조건 성능이 좋아진다"<br/>
                                <strong>✅ 진실:</strong> 성능 ≠ 목적, <strong>코드 재사용성</strong>이 목적
                            </div>
                            <div>
                                <strong>❌ 오해:</strong> "모든 함수를 커링으로 만들어야 한다"<br/>
                                <strong>✅ 진실:</strong> <strong>설정값이 반복되는 경우</strong>에만 사용!
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px', padding: '15px', background: '#f5f3ff', border: '2px solid #8b5cf6', borderRadius: '6px' }}>
                        <strong style={{ color: '#5b21b6' }}>8️⃣ 커링의 엔진: 클로저 (Closure)</strong>
                        <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
                            "커링과 클로저가 연결된 느낌이 드신다면 정확합니다!" 커링은 <strong>클로저를 가장 스마트하게 활용하는 기법</strong>입니다.
                        </p>
                        <div style={{ marginTop: '10px', padding: '12px', background: 'white', borderRadius: '4px', borderLeft: '4px solid #8b5cf6' }}>
                            <strong>핵심 원리:</strong><br/>
                            1. 외부 함수가 첫 번째 인자를 받음 (예: <code>prefix</code>)<br/>
                            2. 외부 함수가 내부 함수를 반환하고 <strong>종료됨</strong><br/>
                            3. 내부 함수는 나중에 실행될 때도 종료된 외부 함수의 <code>prefix</code>를 <strong>기억함</strong> (이것이 클로저!)<br/>
                            <br/>
                            <div style={{ fontSize: '0.9rem', color: '#6d28d9' }}>
                                💡 <strong>요약:</strong> 커링은 "기술(Technique)"이고, 클로저는 그 기술을 가능하게 하는 "엔진(Engine)"입니다.
                            </div>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-currying-deep-dive"
                    initialHtml={consoleHtml}
                    initialJs={`log("=== 커링 변환 실습 ===\\n");

// [Before] 일반 함수
function multiply(a, b, c) {
  return a * b * c;
}
log("일반 함수: multiply(2, 3, 4) = " + multiply(2, 3, 4));

// [After] 커링 함수
const curriedMultiply = a => b => c => a * b * c;
log("커링 함수: curriedMultiply(2)(3)(4) = " + curriedMultiply(2)(3)(4));

log("\\n=== 실무 활용: 설정 고정 ===\\n");

// 배송비 계산기
const calcShipping = baseRate => weight => {
  return baseRate + (weight * 0.5);
};

// 국내/해외 배송비 계산기를 미리 만들어둠
const domesticShipping = calcShipping(3000);  // 기본 3000원
const intlShipping = calcShipping(15000);     // 기본 15000원

log("국내 배송비 (2kg): " + domesticShipping(2) + "원");
log("국내 배송비 (5kg): " + domesticShipping(5) + "원");
log("해외 배송비 (2kg): " + intlShipping(2) + "원");

log("\\n💡 같은 로직, 설정만 다름 → 커링으로 재사용!");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 고차 함수 (Higher-Order Functions)">
                <div className="concepts">
                    <p>함수를 인자로 받거나 함수를 반환하는 함수를 의미합니다. 자바스크립트의 유연함의 핵심입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-hof"
                    initialHtml={consoleHtml}
                    initialJs={`// 함수를 반환하는 함수
const multiplierFactory = factor => number => number * factor;

const tenTimes = multiplierFactory(10);
log("10 * 5 = " + tenTimes(5));

// 함수를 인자로 받는 함수 (예: 콜백)
const runTwice = (func, input) => {
  return func(func(input));
};

const addFive = x => x + 5;
log("Add five twice: " + runTwice(addFive, 10)); // 10 + 5 + 5 = 20`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 실무 패턴 ①: 이벤트 핸들러 공장 (Event Handler Factory)">
                <div className="concepts">
                    <p>커링을 사용하여 공통된 로직을 공유하면서, 매개변수만 살짝 바꾼 핸들러들을 대량 생산할 때 유용합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-adv-event-factory"
                    initialHtml={`
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                      <button id="saveBtn" style="padding: 5px 15px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">저장 버튼</button>
                      <button id="deleteBtn" style="padding: 5px 15px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">삭제 버튼</button>
                    </div>` + consoleHtml}
                    initialJs={`// 핸들러 생성 공장
const createHandler = actionName => event => {
  log(\`[Log] Action: \${actionName} / Event: \${event.type}\`);
  // 실제 로직 분기 가능
  if(actionName === 'SAVE') log("-> 데이터베이스에 저장 중...");
  if(actionName === 'DELETE') log("-> 데이터를 삭제 중...");
};

// 버튼에 각각 전문화된 핸들러 연결
document.getElementById('saveBtn').onclick = createHandler('SAVE');
document.getElementById('deleteBtn').onclick = createHandler('DELETE');

log("위의 버튼들을 클릭해 보세요!");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 실무 패턴 ②: API 호출 래퍼 (API Wrapper)">
                <div className="concepts">
                    <p>API 엔드포인트나 토큰 정보를 미리 설정해둔 맞춤형 호출 함수를 만들 때 HOF가 빛을 발합니다.</p>
                    
                    <div className="info-box danger" style={{ marginTop: '10px' }}>
                        <strong>😰 문제 상황 (Before)</strong>
                        <p>매번 <code>fetch</code>를 쓸 때마다 전체 URL과 헤더 정보를 일일이 적어야 합니다.</p>
                        <pre style={{ fontSize: '0.8rem' }}>{`fetch("https://api.com/users", { headers: { Auth: "..." } });
fetch("https://api.com/posts", { headers: { Auth: "..." } });`}</pre>
                    </div>
                    <div className="info-box info" style={{ marginTop: '10px' }}>
                        <strong>🎓 Deep Dive: Promise.resolve() vs resolve()</strong>
                        <p>비동기 응답을 시뮬레이션할 때 자주 보이는 이 두 기능의 차이를 알아봅니다.</p>
                        <ul>
                            <li><strong><code>Promise.resolve(값)</code></strong>: "이미 결과가 나왔으니 즉시 성공한 프로미스를 달라"는 뜻입니다. (지연 시간 없음)</li>
                            <li><strong><code>resolve(값)</code></strong>: "시간이 좀 걸리겠지만 작업이 끝나면 이 값으로 성공 처리해달라"는 약속 안에서 쓰이는 함수입니다.</li>
                        </ul>
                    </div>

                    <div className="info-box success" style={{ marginTop: '10px' }}>
                        <strong>🛠️ 코드 조립 단계 (Step-by-Step)</strong>
                        <ol>
                            <li><strong>1단계 (Base URL)</strong>: 도메인만 미리 고정된 함수를 생성</li>
                            <li><strong>2단계 (Headers)</strong>: 공통 인증 정보까지 합쳐진 <strong>전용 클라이언트</strong> 완성</li>
                            <li><strong>3단계 (Endpoint)</strong>: 실제 주소만 던져서 서버와 통신 호출</li>
                        </ol>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-adv-api-wrapper"
                    initialHtml={consoleHtml}
                    initialJs={`/** 
 * [Step 0] 공장 설계도 만들기 (3단 커링)
 * 각 화살표(=>)는 "함수를 반환한다"는 뜻입니다.
 */
const apiFactory = (baseUrl) => {
  return (headers) => {
    return (endpoint) => {
      log(\`[Network] Requesting: \${baseUrl}\${endpoint}\`);
      
      /**
       * 💡 왜 Promise.resolve() 인가요?
       * 1. 진짜 fetch는 '시간이 걸린 뒤' 결과를 알려줍니다. (resolve 호출)
       * 2. 하지만 이 실습 코드는 '즉시' 결과를 돌려주기 위한 '모조(Mock)' 통신입니다.
       * 3. 따라서 별도로 new Promise를 만들지 않고 즉각 성공한 상태로 반환합니다.
       */
      return Promise.resolve({ 
        data: \`Fetched from \${baseUrl}\${endpoint}\`,
        status: 200 
      });
    };
  };
};

/** 
 * [Step 0.1] 줄여쓴 버전
 */
const apiRequest = baseUrl => headers => endpoint => {
  log(\`[Network] Requesting: \${baseUrl}\${endpoint}\`);
  log(\`[Headers] Sending: \${JSON.stringify(headers)}\`);
  
  // 실제 fetch 로직이 들어갈 자리 (시뮬레이션)
  return Promise.resolve({ 
    status: 200, 
    data: \`Result for \${endpoint} (fetched from \${baseUrl})\` 
  });
};

// [Step 1] 도메인만 세팅된 '반제품' 만들기
const myService = apiFactory("https://api.myapp.com");

// [Step 2] 헤더까지 합쳐진 '완제품(Client)' 만들기
const client = myService({ "Authorization": "Bearer TOKEN-123" });

// [Step 3] 이제 무한하게 재사용! (엔드포인트만 넘김)
log("--- API 호출 시작 ---");
client("/users").then(res => log("Success: " + res.data));
client("/posts").then(res => log("Success: " + res.data));

log("\\n※ 한 줄로 편하게 선언할 수도 있습니다:");
log("const quickClient = apiFactory('url')({auth:'...'});");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="6. 실무 패턴 ③: 공통 로직 Validator 생성">
                <div className="concepts">
                    <p>검증 규칙을 부품처럼 조립하여 강력한 폼 데이터 검증기를 구축할 수 있습니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-adv-validator"
                    initialHtml={consoleHtml}
                    initialJs={`// 검증 룰 생성기 (Currying)
const minLength = min => val => val.length >= min || \`최소 \${min}자 이상이어야 합니다.\`;
const isEmail = val => val.includes('@') || "유효한 이메일 형식이 아닙니다.";

// 검증 실행기 (HOF)
const createValidator = (...rules) => value => {
  const errors = rules
    .map(rule => rule(value))
    .filter(result => typeof result === 'string');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// 맞춤형 검증기 조립
const passwordValidator = createValidator(minLength(8));
const emailValidator = createValidator(minLength(5), isEmail);

log("PW (abc) -> " + JSON.stringify(passwordValidator("abc")));
log("PW (pw12345678) -> " + JSON.stringify(passwordValidator("pw12345678")));
log("Email (test@me.com) -> " + JSON.stringify(emailValidator("test@me.com")));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="7. 실무 패턴 ④: React/Vue 프레임워크 패턴">
                <div className="concepts">
                    <p>모던 프레임워크의 Custom Hooks나 Composables의 내부 로직은 사실 자바스크립트의 클로저와 HOF의 집합체입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-adv-framework"
                    initialHtml={consoleHtml}
                    initialJs={`// Mock 'useCounter' logic
const createCounterHook = (initialValue) => {
  let count = initialValue; // 클로저에 의해 보호되는 내부 상태
  
  return {
    getCount: () => count,
    increment: () => { count++; log("Current: " + count); },
    decrement: () => { count--; log("Current: " + count); }
  };
};

log("--- React Hook 스타일 상태 관리 시뮬레이션 ---");
const counter = createCounterHook(10);
counter.increment();
counter.increment();
log("Final Count: " + counter.getCount());`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="8. 실무 패턴 ⑤: 미들웨어 & 인터셉터 체인">
                <div className="concepts">
                    <p>미들웨어는 데이터가 최종 목적지에 도달하기 전에 여러 단계의 가공 과정을 거치게 하는 <strong>'파이프라인'</strong> 아키텍처입니다.</p>
                    
                    <div className="info-box info" style={{ marginTop: '15px' }}>
                        <strong>🚚 컨베이어 벨트 비유 (Conveyor Belt Analogy)</strong>
                        <p>공장의 컨베이어 벨트를 상상해 보세요. 물건(Data)이 지나갈 때마다 옆에 서 있는 작업자(Middleware)들이 하나씩 작업을 수행합니다.</p>
                        <ul>
                            <li><strong>작업자 1:</strong> 먼지를 털어냄 (데이터 정제)</li>
                            <li><strong>작업자 2:</strong> 라벨을 붙임 (인증 토큰 추가)</li>
                            <li><strong>작업자 3:</strong> 상자에 담음 (JSON 직렬화)</li>
                        </ul>
                    </div>

                    <div className="info-box success" style={{ marginTop: '15px' }}>
                        <strong>💡 실무 활용 사례</strong>
                        <ul>
                            <li><strong>Express.js 미들웨어:</strong> 요청이 서버에 들어오면 로그인 여부 확인, 로그 기록, 에러 처리를 순차적으로 수행합니다.</li>
                            <li><strong>Axios 인터셉터:</strong> API를 쏘기 직전에 모든 요청에 <code>Authorization</code> 헤더를 자동으로 끼워넣을 때 사용합니다.</li>
                            <li><strong>Redux Middleware:</strong> 상태가 변하기 직전에 로그를 찍거나 비동기 작업을 처리합니다.</li>
                        </ul>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-adv-middleware"
                    initialHtml={consoleHtml}
                    initialJs={`/**
 * 1. 미들웨어들을 하나로 합쳐주는 Compose 함수
 * reduce를 사용하여 오른쪽에서 왼쪽(또는 순차적으로) 함수를 실행시킵니다.
 */
const composeMiddlewares = (...middlewares) => initialData => {
  return middlewares.reduce((data, middleware) => {
    log(\`[Middleware: \${middleware.name}] Processing...\`);
    return middleware(data);
  }, initialData);
};

/**
 * 2. 실무형 미들웨어 부품들
 */

// [A] 인증 미들웨어 (모든 요청에 토큰 주입)
const authMiddleware = request => ({
  ...request,
  headers: { ...request.headers, Authorization: "Bearer SECRET_TOKEN" }
});

// [B] 직렬화 미들웨어 (데이터를 JSON 문자열로 변환)
const serializationMiddleware = request => ({
  ...request,
  body: JSON.stringify(request.data),
  contentType: "application/json"
});

// [C] 로거 미들웨어 (최종 나가는 데이터 확인)
const networkLogger = request => {
  log(">>> [Network Out] " + JSON.stringify(request, null, 2));
  return request;
};

/**
 * 3. 체인 생성 및 실행 (파이프라인 조립)
 */
const sendSecureRequest = composeMiddlewares(
  authMiddleware, 
  serializationMiddleware, 
  networkLogger
);

log("--- API 요청 파이프라인 가동 ---");
const rawData = { 
  url: "/api/user/profile", 
  data: { id: 101, name: "javascript" } 
};

sendSecureRequest(rawData);

log("\\n✅ 결과: 원본 데이터는 그대로 유지되면서, 각각의 미들웨어를 거치며 새로운 속성(토큰, JSON 바디)이 추가된 '가공된 요청 객체'가 완성되었습니다.");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="8-1. 🔍 심화: 콜백 vs 리턴 - 두 가지 미들웨어 방식">
                <div className="concepts">
                    <p>미들웨어 체인을 구현하는 방법은 크게 <strong>2가지</strong>가 있습니다. 각각의 동작 원리를 명확히 이해하면 미들웨어 패턴이 훨씬 쉬워집니다.</p>
                    
                    <div className="info-box warning" style={{ marginTop: '15px' }}>
                        <strong>⚠️ 헷갈리는 이유</strong>
                        <p>위의 예제는 <strong>"리턴 방식"</strong>을 사용했지만, Express.js는 <strong>"콜백(next) 방식"</strong>을 사용합니다. 두 방식의 차이를 모르면 개념이 섞여서 혼란스럽습니다!</p>
                    </div>

                    <div className="info-table-wrapper" style={{ marginTop: '20px' }}>
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>구분</th>
                                    <th>리턴 방식 (위 예제)</th>
                                    <th>콜백 방식 (Express.js)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>핵심 아이디어</strong></td>
                                    <td>각 미들웨어가 <code>변환된 데이터를 리턴</code></td>
                                    <td>각 미들웨어가 <code>next()</code>를 호출해서 다음으로 넘김</td>
                                </tr>
                                <tr>
                                    <td><strong>데이터 흐름</strong></td>
                                    <td>data → mw1(data) → mw2(result1) → mw3(result2)</td>
                                    <td>mw1 → next() → mw2 → next() → mw3</td>
                                </tr>
                                <tr>
                                    <td><strong>장점</strong></td>
                                    <td>간단하고 직관적, 불변성 유지 용이</td>
                                    <td>중간에 체인을 끊기 쉬움 (에러 처리)</td>
                                </tr>
                                <tr>
                                    <td><strong>사용 사례</strong></td>
                                    <td>Redux Middleware, Axios Interceptors</td>
                                    <td>Express.js, Koa.js</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <LiveCodeEditor
                    scopeId="js-middleware-comparison"
                    initialHtml={consoleHtml}
                    initialJs={`log("══════════════════════════════════════");
log("방식 A: 리턴 체인 (Return-based Chain)");
log("══════════════════════════════════════\\n");

// [A-1] 각 미들웨어는 변환된 데이터를 "리턴"
const addToken = (req) => {
  log("✓ addToken 실행");
  return { ...req, token: "ABC123" };
};

const toJSON = (req) => {
  log("✓ toJSON 실행");
  return { ...req, body: JSON.stringify(req.data) };
};

// [A-2] reduce로 순차 실행
const pipeline = [addToken, toJSON];
const result = pipeline.reduce(
  (data, middleware) => middleware(data),
  { url: "/api", data: { id: 1 } }
);

log("최종 결과: " + JSON.stringify(result, null, 2));

log("\\n══════════════════════════════════════");
log("방식 B: 콜백 체인 (Callback-based Chain)");
log("══════════════════════════════════════\\n");

// [B-1] 각 미들웨어는 next()를 호출해서 다음으로 넘김
const addTokenCB = (req, next) => {
  log("✓ addTokenCB 실행");
  req.token = "XYZ789";
  next(req); // ← "다음 미들웨어야, 처리해!"
};

const toJSONCB = (req, next) => {
  log("✓ toJSONCB 실행");
  req.body = JSON.stringify(req.data);
  next(req);
};

// [B-2] 수동으로 체인 연결
const request = { url: "/api", data: { id: 2 } };
addTokenCB(request, (req1) => {
  toJSONCB(req1, (finalReq) => {
    log("최종 결과: " + JSON.stringify(finalReq, null, 2));
  });
});

log("\\n💡 핵심 차이:");
log("- 리턴 방식: 각 함수가 '새로운 객체'를 만들어 반환");
log("- 콜백 방식: '같은 객체'를 수정하고 next()로 전달");`}
                />
                <div className="info-box info" style={{ marginTop: '20px' }}>
                    <strong>🔧 reduce()가 어떻게 동작하는가?</strong>
                    <p>리턴 방식에서 핵심은 <code>pipeline.reduce()</code>입니다. 이 부분이 헷갈리는 이유를 명확히 풀어봅시다.</p>
                    
                    <div style={{ marginTop: '10px', padding: '10px', background: '#1f2937', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#10b981' }}>
                        <div>const pipeline = [addToken, toJSON];</div>
                        <div style={{ color: '#9ca3af' }}>// ↑ 함수 두 개를 담은 배열 (실행 결과가 아님!)</div>
                        <br/>
                        <div>pipeline.reduce(</div>
                        <div style={{ paddingLeft: '20px' }}>(data, middleware) =&gt; middleware(data),</div>
                        <div style={{ paddingLeft: '20px', color: '#9ca3af' }}>// ↑ 누적값, 현재요소(함수!)</div>
                        <div style={{ paddingLeft: '20px' }}>{'{ url: "/api", data: { id: 1 } }'}</div>
                        <div>);</div>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <strong>📌 단계별 실행 과정:</strong>
                        <ol style={{ marginTop: '8px', lineHeight: '1.8' }}>
                            <li><strong>[초기]</strong> 누적값 = <code>{'{ url: "/api", data: { id: 1 } }'}</code></li>
                            <li><strong>[1회전]</strong> 현재요소 = <code>addToken</code> (함수) → <code>addToken(data)</code> 실행 → 결과: 토큰 추가된 객체</li>
                            <li><strong>[2회전]</strong> 누적값 = 1회전 결과, 현재요소 = <code>toJSON</code> (함수) → <code>toJSON(누적값)</code> 실행 → 최종 결과</li>
                        </ol>
                    </div>

                    <div style={{ marginTop: '15px', padding: '10px', background: '#fef3c7', color: '#92400e', borderRadius: '4px' }}>
                        <strong>💡 핵심:</strong> <code>middleware</code>는 "결과"가 아니라 <strong>"함수 그 자체"</strong>입니다. 
                        배열의 각 요소가 함수이기 때문에 <code>middleware(data)</code>처럼 호출할 수 있습니다!
                    </div>

                    <div style={{ marginTop: '20px', padding: '15px', background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '6px' }}>
                        <strong>🎯 왜 어떤 속성은 초기값에, 어떤 속성은 함수 안에?</strong>
                        <div style={{ marginTop: '10px', lineHeight: '1.8' }}>
                            <div><strong style={{ color: '#16a34a' }}>초기값 <code>{'{ url: "/api", data: { id: 1 } }'}</code></strong></div>
                            <div style={{ marginLeft: '20px', color: '#166534' }}>→ <strong>원본 데이터</strong> (파이프라인 시작 전부터 존재)</div>
                            <div style={{ marginLeft: '20px', color: '#166534' }}>→ 예: API 주소, 전송할 데이터</div>
                            
                            <div style={{ marginTop: '12px' }}><strong style={{ color: '#ea580c' }}>미들웨어 내부 <code>token: "ABC123"</code></strong></div>
                            <div style={{ marginLeft: '20px', color: '#9a3412' }}>→ <strong>가공 과정에서 추가</strong> (파이프라인을 거치며 생성)</div>
                            <div style={{ marginLeft: '20px', color: '#9a3412' }}>→ 예: 인증 토큰, JSON 변환된 바디</div>
                        </div>
                        
                        <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px', fontSize: '0.9rem' }}>
                            <strong>비유:</strong> 컨베이어 벨트에 <code>url</code>과 <code>data</code>를 올려놓고(초기값) → 
                            각 작업자(미들웨어)가 <code>token</code>, <code>body</code> 등을 추가로 붙임
                        </div>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="9. 💼 실무 적용 패턴 - 암기 공식">
                <div className="concepts">
                    <p>지금까지 배운 고급 기법들을 실제 프로젝트에서 <strong>언제, 어떻게</strong> 쓸지 쉽게 기억할 수 있는 패턴 모음입니다.</p>
                    
                    <div className="info-box success" style={{ marginTop: '20px' }}>
                        <strong>🎯 패턴 1: "설정 먼저, 데이터 나중에" (커링)</strong>
                        <div style={{ marginTop: '10px', padding: '12px', background: '#f0fdf4', borderRadius: '4px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>언제 쓰나요?</div>
                            <div style={{ marginLeft: '15px', lineHeight: '1.7' }}>
                                ✓ 같은 로직을 여러 번 쓰는데 <strong>설정값만 다를 때</strong><br/>
                                ✓ 예: 로거, API 클라이언트, 검증기
                            </div>
                            <div style={{ fontWeight: 'bold', marginTop: '12px', marginBottom: '8px' }}>암기 공식:</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', padding: '8px', background: '#1f2937', color: '#10b981', borderRadius: '4px' }}>
                                const 공장 = (고정설정) =&gt; (실제데이터) =&gt; 처리
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#166534' }}>
                                <strong>예시:</strong> <code>const createLogger = (prefix) =&gt; (msg) =&gt; console.log(`[${'${prefix}'}] ${'${msg}'}`)</code>
                            </div>
                        </div>
                    </div>

                    <div className="info-box info" style={{ marginTop: '20px' }}>
                        <strong>🔄 패턴 2: "처리 → 처리 → 처리" (미들웨어 체인)</strong>
                        <div style={{ marginTop: '10px', padding: '12px', background: '#eff6ff', borderRadius: '4px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>언제 쓰나요?</div>
                            <div style={{ marginLeft: '15px', lineHeight: '1.7' }}>
                                ✓ 데이터가 <strong>여러 단계를 순차적으로 거쳐야 할 때</strong><br/>
                                ✓ 예: API 요청 전처리, 폼 데이터 검증, 로그 파이프라인
                            </div>
                            <div style={{ fontWeight: 'bold', marginTop: '12px', marginBottom: '8px' }}>암기 공식:</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', padding: '8px', background: '#1f2937', color: '#10b981', borderRadius: '4px' }}>
                                [작업1, 작업2, 작업3].reduce((데이터, 작업) =&gt; 작업(데이터), 원본)
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#1e40af' }}>
                                <strong>핵심:</strong> 각 작업은 <strong>받은 걸 변환해서 리턴</strong>
                            </div>
                        </div>
                    </div>

                    <div className="info-box warning" style={{ marginTop: '20px' }}>
                        <strong>⚡ 패턴 3: "필요할 때만 하나씩" (제너레이터)</strong>
                        <div style={{ marginTop: '10px', padding: '12px', background: '#fef3c7', borderRadius: '4px' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>언제 쓰나요?</div>
                            <div style={{ marginLeft: '15px', lineHeight: '1.7' }}>
                                ✓ 데이터가 <strong>엄청 많거나 무한</strong>할 때<br/>
                                ✓ 모든 걸 한 번에 메모리에 올리면 터질 때<br/>
                                ✓ 예: 대용량 파일 읽기, 페이지네이션, 무한 스크롤
                            </div>
                            <div style={{ fontWeight: 'bold', marginTop: '12px', marginBottom: '8px' }}>암기 공식:</div>
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', padding: '8px', background: '#1f2937', color: '#10b981', borderRadius: '4px' }}>
                                function* 이름() {'{ while(조건) yield 값; }'}
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#92400e' }}>
                                <strong>기억:</strong> <code>yield</code> = "여기서 멈춰! 다음에 또 불러"
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px', padding: '20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '15px' }}>📋 빠른 의사결정 체크리스트</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.3)' }}>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>상황</th>
                                    <th style={{ padding: '10px', textAlign: 'left' }}>→ 사용할 패턴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                    <td style={{ padding: '10px' }}>비슷한 함수 100개 만들기 귀찮다</td>
                                    <td style={{ padding: '10px' }}><strong>커링</strong> (설정 고정)</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                    <td style={{ padding: '10px' }}>데이터가 A → B → C 가공돼야 함</td>
                                    <td style={{ padding: '10px' }}><strong>미들웨어</strong> (reduce 체인)</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                                    <td style={{ padding: '10px' }}>배열이 너무 커서 메모리 터짐</td>
                                    <td style={{ padding: '10px' }}><strong>제너레이터</strong> (yield)</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px' }}>함수를 인자로 받거나 반환</td>
                                    <td style={{ padding: '10px' }}><strong>고차함수</strong> (HOF)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="info-box success" style={{ marginTop: '20px' }}>
                        <strong>🔗 보너스: 함수형 패턴과의 궁합</strong>
                        <div style={{ marginTop: '10px', padding: '12px', background: '#f0fdf4', borderRadius: '4px' }}>
                            <div style={{ lineHeight: '1.8', color: '#166534' }}>
                                <strong>커링, 고차함수는 <code>filter</code>, <code>map</code>, <code>reduce</code>와 찰떡궁합!</strong>
                                <div style={{ marginTop: '10px' }}>
                                    <strong>이유:</strong><br/>
                                    • 둘 다 <strong>"함수를 값처럼"</strong> 다룸<br/>
                                    • 커링으로 만든 함수 → <code>map()</code>에 바로 전달 가능<br/>
                                    • 체이닝으로 깔끔한 파이프라인 구성
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '15px', padding: '10px', background: '#1f2937', color: '#10b981', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                <div style={{ color: '#f87171' }}>// ❌ 커링 없이 (일반 방식)</div>
                                <div>[1, 2, 3]</div>
                                <div>&nbsp;&nbsp;.map(x =&gt; x * 2)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// [2, 4, 6]</div>
                                <div>&nbsp;&nbsp;.map(x =&gt; x + 10)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// [12, 14, 16]</div>
                                <div>&nbsp;&nbsp;.filter(x =&gt; x &gt; 13)  // [14, 16]</div>
                                <div style={{ color: '#9ca3af' }}>// → 매번 새로운 화살표 함수 작성</div>
                            </div>

                            <div style={{ marginTop: '15px', padding: '10px', background: '#1f2937', color: '#10b981', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                <div style={{ color: '#22c55e' }}>// ✅ 커링 사용 (재사용 가능)</div>
                                <div>const multiply = x =&gt; y =&gt; x * y;</div>
                                <div>const add = x =&gt; y =&gt; x + y;</div>
                                <br/>
                                <div>[1, 2, 3]</div>
                                <div>&nbsp;&nbsp;.map(multiply(2))&nbsp;&nbsp;// [2, 4, 6]</div>
                                <div>&nbsp;&nbsp;.map(add(10))&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// [12, 14, 16]</div>
                                <div>&nbsp;&nbsp;.filter(x =&gt; x &gt; 13)  // [14, 16]</div>
                                <div style={{ color: '#9ca3af' }}>// → multiply(2), add(10) 다른 곳에서도 재사용!</div>
                            </div>

                            <div style={{ marginTop: '12px', padding: '10px', background: '#fef3c7', color: '#92400e', borderRadius: '4px' }}>
                                <strong>💡 핵심:</strong> 커링 = "설정 고정", map/filter = "일괄 적용" → 완벽한 조합!
                            </div>
                        </div>
                    </div>
                </div>

                <LiveCodeEditor
                    scopeId="js-practical-patterns"
                    initialHtml={consoleHtml}
                    initialJs={`log("=== 실전 예제: 3가지 패턴 통합 ===\\n");

// 패턴 1: 커링으로 API 클라이언트 공장
const createAPI = (baseURL) => (endpoint) => {
  return \`Calling: \${baseURL}\${endpoint}\`;
};

const myAPI = createAPI("https://api.example.com");
log("✓ 커링: " + myAPI("/users"));
log("✓ 커링: " + myAPI("/posts"));

// 패턴 2: 미들웨어로 요청 전처리
const addAuth = (req) => ({ ...req, auth: "Token123" });
const addTimestamp = (req) => ({ ...req, time: Date.now() });

const preprocess = [addAuth, addTimestamp].reduce(
  (req, mw) => mw(req),
  { url: "/api/data" }
);

log("\\n✓ 미들웨어: " + JSON.stringify(preprocess, null, 2));

// 패턴 3: 제너레이터로 페이지네이션
function* paginate(items, size) {
  for (let i = 0; i < items.length; i += size) {
    yield items.slice(i, i + size);
  }
}

const pages = paginate([1, 2, 3, 4, 5, 6, 7], 3);
log("\\n✓ 제너레이터 페이지1: " + JSON.stringify(pages.next().value));
log("✓ 제너레이터 페이지2: " + JSON.stringify(pages.next().value));

log("\\n🎉 3가지 패턴을 한 번에 사용했습니다!");`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/functions",
                        title: "11. 함수와 클로저",
                        description: "고급 기법의 기초가 되는 클로저와 스코프 개념을 복습하세요.",
                        icon: "🧩"
                    },
                    {
                        path: "/js/iterables",
                        title: "7. 이터러블 프로토콜",
                        description: "제너레이터가 생성하는 이터레이터의 원리를 배웁니다.",
                        icon: "➰"
                    }
                ]}
            />
        </div>
    );
};

export default JsAdvancedJsStudy;
