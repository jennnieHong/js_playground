import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsPrototypesStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Prototype Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 자바스크립트의 유전자를 분석합니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="21. 프로토타입과 상속 (Prototypes & Inheritance)"
                subtitle="자바스크립트의 모든 객체가 '공유'하는 유전자의 비밀, 프로토타입을 마스터합니다."
            />

            <CollapsibleSection title="1. 프로토타입이란? (The Hidden Blueprint)" initiallyOpen={true}>
                <div className="concepts">
                  <p>자바스크립트는 <strong>프로토타입 기반 언어</strong>입니다. 모든 객체는 자신의 부모 역할을 하는 다른 객체로부터 성질을 물려받는데, 이 부모 객체를 **프로토타입**이라고 부릅니다.</p>
                  <ul>
                    <li><strong>공유의 마법:</strong> 메서드를 각자 가지는 대신 프로토타입에 하나만 두면, 모든 자식 객체가 이를 공유하므로 메모리가 획기적으로 절약됩니다.</li>
                  </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-proto-basic"
                    initialHtml={consoleHtml}
                    initialJs={`function User(name) {
  this.name = name;
}

// 모든 User 인스턴스가 공유할 메서드 정의
User.prototype.sayHi = function() {
  log(\`Hi, I'm \${this.name}!\`);
};

const user1 = new User("Jenny");
const user2 = new User("Lisa");

user1.sayHi();
user2.sayHi();

log("\\n인스턴스에 sayHi가 직접 들어있을까?");
log("user1 has sayHi? " + user1.hasOwnProperty('sayHi')); // false (부모꺼니까!)`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 프로토타입 체인 (The Ancestry Chain)">
                <div className="concepts">
                  <p>객체에서 특정 속성이나 메서드를 찾을 때, 본인에게 없으면 부모(프로토타입)를 찾아 올라갑니다. 이 연결 고리를 **프로토타입 체인**이라고 합니다.</p>
                  <p>최종 목적지는 <code>Object.prototype</code>이며, 여기서도 못 찾으면 <code>null</code>을 반환하며 탐색을 종료합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-proto-chain"
                    initialHtml={consoleHtml}
                    initialJs={`const arr = [1, 2];

log("1. arr 본인: " + arr[0]);
log("2. 부모(Array.prototype): " + arr.map);
log("3. 조부모(Object.prototype): " + arr.hasOwnProperty);
log("4. 증조부모: " + Object.getPrototypeOf(Object.prototype)); // null

log("\\n--- 상속받은 기능 사용 ---");
log("Array push exists via chain? " + !!arr.push);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. __proto__ vs prototype (결정적 차이)">
                <div className="concepts">
                  <p>이 두 용어의 차이를 아는 것이 프로토타입 마스터의 첫걸음입니다.</p>
                  <div className="info-table-wrapper">
                    <table className="info-table">
                      <thead>
                        <tr>
                          <th>속성</th>
                          <th>누가 가지고 있나?</th>
                          <th>의미</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>prototype</strong></td>
                          <td>생성자 함수 (Constructor)</td>
                          <td>자신을 거쳐 태어날 <strong>자식들에게 물려줄</strong> 유산 보관함</td>
                        </tr>
                        <tr>
                          <td><strong>__proto__</strong></td>
                          <td>모든 객체 (Instance)</td>
                          <td>내가 <strong>실제로 성질을 물려받고 있는</strong> 부모에 대한 링크</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-proto-diff"
                    initialHtml={consoleHtml}
                    initialJs={`function Car() {}

const myCar = new Car();

log("1. Car 함수가 가진 유산함:");
log(Car.prototype);

log("\\n2. myCar가 실제로 바라보는 부모:");
log(Object.getPrototypeOf(myCar));

log("\\n3. 둘은 같은 곳을 가리킬까?");
log("Result: " + (Car.prototype === Object.getPrototypeOf(myCar))); // true`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 섀도잉 (Property Shadowing)">
                <div className="concepts">
                  <p>상속받은 메서드와 똑같은 이름의 메서드를 본인(인스턴스)이 직접 가지고 있다면, 본인의 것이 우선시됩니다. 이를 부모의 것을 가렸다는 의미에서 **섀도잉**이라고 부릅니다.</p>
                  
                  <div className="info-box success">
                    <strong>💡 Object.create(parent) 역할?</strong>
                    <p>정확히는 <strong>'부모를 지정하여 새로운 자식을 만드는 것'</strong>입니다!</p>
                    <ul>
                      <li><code>Object.create(obj)</code>를 호출하면, 자바스크립트는 텅 비어있는 **새로운 객체**를 하나 만듭니다.</li>
                      <li>그리고 그 객체의 <strong>내부 번호(__proto__)</strong>를 괄호 안에 전달한 <code>obj</code>로 연결해버립니다.</li>
                      <li>결과적으로 <code>obj</code>는 새로 태어난 객체의 <strong>부모(Prototype)</strong>가 됩니다.</li>
                    </ul>
                  </div>
                </div>
                <div className="concepts" style={{ marginTop: '20px' }}>
                   <div className="info-box success" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
                    <strong>🌟 Object.create() 실무 활용 Deep Dive</strong>
                    <p>단순히 상속을 만드는 것을 넘어, 실무에서 이 함수가 빛을 발하는 4가지 결정적인 순간이 있습니다.</p>
                  </div>

                  <h4>1. 실무 이유 ①: "기본 설정 객체"를 안전하게 확장할 때 (Safe Extension)</h4>
                  <p><code>Object.create</code>를 실무에서 가장 많이 쓰는 강력한 이유 중 하나는 **"기본 설정값(Default Options)을 보호하면서 확장"**하는 패턴 때문입니다.</p>
                  
                  <div className="info-box danger" style={{ marginBottom: '15px' }}>
                    <strong>❌ 흔한 실수: 얕은 복사(Spread)의 함정</strong>
                    <p><code>const options = {'{ ...defaultOptions }'}</code> 방식은 1단계 depth만 복사합니다. 만약 <code>headers</code> 같은 내부 객체가 있다면, 자식의 수정이 부모(기본 설정)를 오염시킵니다.</p>
                  </div>

                  <LiveCodeEditor
                    scopeId="js-proto-safe-config"
                    initialHtml={consoleHtml}
                    initialJs={`const defaultOptions = {
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' }
};

// 1. [잘못된 예] 얕은 복사 (...)
const badOptions = { ...defaultOptions };

// 2. [권장 예] Object.create()
const goodOptions = Object.create(defaultOptions);

log("--- 1. 얕은 복사 오염 테스트 ---");
badOptions.headers.Authorization = "Bearer Token"; // 내부 객체 주소 공유로 인해 발생
log("Default Auth: " + defaultOptions.headers.Authorization); // "Bearer Token" (오염됨!)

log("\\n--- 2. Object.create 안전성 테스트 ---");
delete defaultOptions.headers.Authorization; // 초기화

// 새로운 객체를 할당하는 방식으로 부모를 보호하며 확장
goodOptions.headers = { ...defaultOptions.headers, Authorization: "Safe Token" };
log("Default Auth: " + defaultOptions.headers.Authorization); // undefined (보호됨)
log("Enhanced Auth: " + goodOptions.headers.Authorization); // "Safe Token"`}
                  />

                  <h4 style={{ marginTop: '30px' }}>2. 실무 이유 ②: "상속은 필요하지만 class는 과한 경우"</h4>
                  <p><code>class</code>는 인스턴스를 많이 찍어낼 때 유용하지만, 단일 객체의 기능을 확장하거나 간단한 위임(Delegation)이 필요할 때는 <code>Object.create</code>가 훨씬 가볍고 직관적입니다.</p>
                  
                  <LiveCodeEditor
                    scopeId="js-proto-delegation-simple"
                    initialHtml={consoleHtml}
                    initialJs={`const baseLogger = {
  log: function(msg) { log(\`[\${this.label}] \${msg}\`); }
};

// 클래스 선언 없이 즉석에서 기능을 이어받은 특수 객체 생성
const authLogger = Object.create(baseLogger);
authLogger.label = "AUTH";

const dbLogger = Object.create(baseLogger);
dbLogger.label = "DB";

authLogger.log("User logged in");
dbLogger.log("Connection established");`}
                  />

                  <h4 style={{ marginTop: '30px' }}>3. 실무 이유 ③: "완전한 빈 객체"가 필요할 때 (Pure Dictionary)</h4>
                  <p>일반 객체 <code>{}</code>는 <code>Object.prototype</code>을 상속받아 <code>toString</code> 등이 포함됩니다. <strong><code>Object.create(null)</code></strong>은 부모가 없는 완벽한 빈 상태를 만들어 보안과 안정성을 높입니다.</p>
                  
                  <LiveCodeEditor
                    scopeId="js-proto-pure-dict"
                    initialHtml={consoleHtml}
                    initialJs={`// 일반 객체: __proto__ 가 Object.prototype을 가리킴
const normal = {};
log("Normal has toString? " + ('toString' in normal));

// 순수 객체: 조상이 아예 없음 (No Prototype Chain)
const pure = Object.create(null);
log("Pure has toString? " + ('toString' in pure)); 

log("\\n--- 보안 활용 예시 ---");
const data = Object.create(null);
data["user_input"] = "some value";
// 사용자 입력이 "toString" 이어도 내장 메서드를 덮어씌울 걱정이 없습니다.`}
                  />

                  <h4 style={{ marginTop: '30px' }}>4. 실무 이유 ④: "상속 구조를 명확히 드러내고 싶을 때"</h4>
                  <p>코드를 읽는 사람에게 이 객체가 어디서부터 왔는지(Ancestry)를 <code>Object.create</code>를 통해 명시적으로 보여줄 수 있습니다.</p>
                  
                  <LiveCodeEditor
                    scopeId="js-proto-explicit-hierarchy"
                    initialHtml={consoleHtml}
                    initialJs={`const Component = { render: () => log("Rendering...") };
const Button = Object.create(Component);
Button.click = () => log("Button Clicked!");

const SubmitButton = Object.create(Button);

log("SubmitButton can render: " + ('render' in SubmitButton));
log("SubmitButton can click: " + ('click' in SubmitButton));

log("\\n--- 상속 계보 확인 ---");
let parent = Object.getPrototypeOf(SubmitButton);
while(parent) {
  log("Inherited from: " + (parent === Button ? "Button" : "Component"));
  parent = Object.getPrototypeOf(parent);
}`}
                  />

                  <h4 style={{ marginTop: '30px' }}>5. 진짜 실무 예시: DOM 이벤트 핸들링 (EventTarget)</h4>
                  <p><code>class</code>나 <code>constructor</code>는 "이런 모양의 객체를 찍어내겠다"는 <strong>설계도</strong>를 미리 정의하는 방식입니다. 반면 <code>Object.create</code>는 이미 살아있는 <strong>'진짜 객체'</strong>를 템플릿으로 삼아 그 능력을 나눠줍니다.</p>
                  
                  <div className="info-box success" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <strong>📱 스마트폰(OS)과 앱(App) 비유</strong>
                    <ul>
                      <li><strong>공통 템플릿(OS)</strong>: 모든 앱이 공통으로 사용하는 '알림 보내기', '배터리 확인' 같은 <strong>기능(Method)</strong>이 들어있는 객체입니다.</li>
                      <li><strong>개별 자식(App)</strong>: 카톡, 유튜브는 각자 다른 <strong>데이터(State)</strong>를 갖지만, '알림 보내기' 기능은 OS라는 템플릿에서 빌려옵니다.</li>
                    </ul>
                    <p>💡 설계도를 새로 그릴 필요 없이, 잘 돌아가는 객체 하나를 <strong>'큰 형님'</strong>으로 모시고 기능만 쏙쏙 뽑아 쓰는 유연한 방식입니다.</p>
                  </div>

                  <LiveCodeEditor
                    scopeId="js-proto-delegation"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 공통 기능이 담긴 '큰 형님' 객체 (Template)
const smartphoneOS = {
  alarm: function(msg) { 
    log(\`[\${this.appName}] 알림: \${msg}\`); 
  }
};

// 2. OS를 부모로 모시는 '카톡'과 '유튜브' 생성
const kakao = Object.create(smartphoneOS);
kakao.appName = "카카오톡"; // 개별 데이터만 추가

const youtube = Object.create(smartphoneOS);
youtube.appName = "유튜브"; // 개별 데이터만 추가

// 3. 실행 (기능은 부모에게서, 이름은 본인에게서!)
kakao.alarm("새 메시지가 왔어요.");
youtube.alarm("새 영상이 올라왔어요.");

log("\\n--- 메모리 효율 확인 ---");
log("카톡에 알람 기능이 직접 있나? " + kakao.hasOwnProperty('alarm')); // false (OS꺼니까!)
log("유튜브와 카톡은 같은 알람 기능을 공유할까? " + (kakao.alarm === youtube.alarm)); // true`}
                  />

                  <h4 style={{ marginTop: '30px' }}>3. 진짜 실무 예시: DOM 이벤트 핸들링 (EventTarget)</h4>
                  <p>스마트폰 OS 비유가 '개념적'이라면, 브라우저의 **DOM(Document Object Model)**은 이 프로토타입 위임 방식을 <strong>'실제로 100%'</strong> 사용합니다.</p>
                  <p>우리가 모든 버튼이나 div에 <code>addEventListener</code> 기능을 직접 넣어두지 않아도 쓸 수 있는 이유가 바로 이것입니다.</p>
                  
                  <div className="info-box" style={{ background: 'var(--bg-tertiary)', borderLeft: '4px solid var(--accent-primary)' }}>
                    <strong>🧬 DOM 상속 계보 (Hierarchy)</strong>
                    <p style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                      HTMLButtonElement &rarr; HTMLElement &rarr; Element &rarr; Node &rarr; <strong>EventTarget</strong>
                    </p>
                    <p>우리 눈앞의 '버튼'은 조상인 <code>EventTarget</code>으로부터 <strong>이벤트를 듣는 능력(`addEventListener`)</strong>을 프로토타입으로 물려받은 자식입니다.</p>
                  </div>

                  <LiveCodeEditor
                    scopeId="js-proto-dom-real"
                    initialHtml={`<button id="testBtn" style="padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">실제 버튼 객체 분석</button>` + consoleHtml}
                    initialJs={`const btn = document.getElementById('testBtn');

log("1. 'in' 연산자 (조상님 능력까지 포함)");
log("addEventListener 인지? " + ('addEventListener' in btn)); // true

log("\\n2. hasOwnProperty (내가 직접 가졌나?)");
log("addEventListener 인지? " + btn.hasOwnProperty('addEventListener')); // false

log("\\n3. 조상님의 존함을 확인해봅시다:");
let proto = Object.getPrototypeOf(btn);
while (proto) {
  log("-> " + proto.constructor.name);
  proto = Object.getPrototypeOf(proto);
}
log("-> null (도착!)");`}
                />

                  <div className="concepts" style={{ marginTop: '20px' }}>
                    <div className="info-box success" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
                      <strong>⚔️ in 연산자 vs hasOwnProperty</strong>
                      <p>속성의 정체를 파악할 때 사용하는 두 무기의 결정적인 차이입니다.</p>
                      <ul>
                        <li><strong>'in' 연산자</strong>: 상속받은 모든 유전자(프로토타입 체인)를 다 뒤져서 있으면 <code>true</code>. (실무용도: 기능 지원 여부 확인/태생 확인)</li>
                        <li><strong>hasOwnProperty</strong>: 남에게 빌려온 거 말고, "진짜 내가 가진 내 것"만 <code>true</code>. (실무용도: 순수한 내 데이터만 추출/순회할 때)</li>
                      </ul>
                    </div>
                  </div>

                  <h4 style={{ marginTop: '30px' }}>4. 고전적 상속 링크 연결 (Constructor Linking)</h4>
                  <div className="info-box warning" style={{ marginBottom: '15px' }}>
                    <strong>⚠️ 요즘도 이 방식을 쓰나요?</strong>
                    <p>현대 자바스크립트에서는 <strong><code>class</code>와 <code>extends</code></strong>를 더 많이 씁니다. 하지만 이 방식을 꼭 알아야 하는 <strong>두 가지 이유</strong>가 있습니다.</p>
                    <ul>
                      <li><strong>Legacy Code</strong>: 오래된 라이브러리나 규모가 큰 기존 프로젝트에는 여전히 이 코드가 가득합니다.</li>
                      <li><strong>문법 설탕 (Syntactic Sugar)</strong>: 우리가 <code>class</code>를 쓸 때, 브라우저는 내부적으로 <strong>결국 이 고전적 상속 링크</strong>를 자동으로 만들어줍니다.</li>
                    </ul>
                  </div>

                  <div className="info-table-wrapper">
                    <table className="info-table">
                      <thead>
                        <tr>
                          <th>수동 (Legacy / Under the Hood)</th>
                          <th>자동 (Modern / ES6+)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ verticalAlign: 'top' }}>
                            <pre style={{ margin: 0, fontSize: '0.8rem' }}>{`Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;`}</pre>
                          </td>
                          <td style={{ verticalAlign: 'top' }}>
                            <pre style={{ margin: 0, fontSize: '0.8rem' }}>{`class Child extends Parent {
  constructor() { super(); }
}`}</pre>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <LiveCodeEditor
                    scopeId="js-proto-legacy-link"
                    initialHtml={consoleHtml}
                    initialJs={`function Parent() {}
Parent.prototype.greet = () => log("Hello from Parent");

function Child() {}

// 1. 유전자 판(prototype) 연결
Child.prototype = Object.create(Parent.prototype);

// 2. 끊어진 생성자 정보 복구 (매우 중요!)
Child.prototype.constructor = Child;

const kid = new Child();
kid.greet();

log("\\n--- 정체 확인 ---");
log("Is kid a Child? " + (kid instanceof Child));
log("Is kid a Parent? " + (kid instanceof Parent));`}
                  />
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="5. 🏅 면접 대비 심화: 클래스 없이 상속 구현하기">
                <div className="concepts">
                  <p>면접에서 <strong>"class 없이 상속을 구현해보세요"</strong>라고 한다면, 다음 3단계를 순서대로 보여주면 정답입니다.</p>
                  
                  <div className="info-box" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid var(--accent-primary)' }}>
                    <ol>
                      <li><strong>상태 상속</strong>: 부모의 생성자를 <code>call(this)</code>로 호출하여 내 것으로 만듭니다.</li>
                      <li><strong>능력 상속</strong>: <code>Object.create()</code>로 부모의 프로토타입 판을 복제하여 내 판으로 쓱 갈아끼웁니다.</li>
                      <li><strong>족보 정리</strong>: 꼬여버린 <code>constructor</code> 정보를 나 자신으로 다시 정정합니다.</li>
                    </ol>
                  </div>

                  <LiveCodeEditor
                    scopeId="js-proto-no-class-master"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 부모 생성자 (자동차)
function Vehicle(brand) {
  this.brand = brand;
}
Vehicle.prototype.drive = function() {
  log(this.brand + "가 달립니다. 붕붕~");
};

// 2. 자식 생성자 (전기차)
function ElectricCar(brand, battery) {
  // [Step 1] 부모의 상태 상속 (brand 물려받기)
  Vehicle.call(this, brand);
  this.battery = battery;
}

// [Step 2] 부모의 능력 상속 (drive 메서드 물려받기)
ElectricCar.prototype = Object.create(Vehicle.prototype);

// [Step 3] 족보 정리 (생성자 정보 수정)
ElectricCar.prototype.constructor = ElectricCar;

// 자식만의 고유 기능 추가
ElectricCar.prototype.charge = function() {
  log(this.brand + "를 충전합니다. (잔량: " + this.battery + "%)");
};

// 3. 테스트
const myTesla = new ElectricCar("Tesla", 80);
myTesla.drive();  // 부모에게 빌린 기능
myTesla.charge(); // 내 고유 기능

log("\\n--- 가계도 확인 ---");
log("myTesla instanceof ElectricCar: " + (myTesla instanceof ElectricCar));
log("myTesla instanceof Vehicle: " + (myTesla instanceof Vehicle));`}
                  />

                  <div className="info-box warning" style={{ marginTop: '30px' }}>
                    <strong>🧐 질문: constructor를 복구하지 않아도 상속은 잘 되던데요? 왜 하나요?</strong>
                    <p>맞습니다! 단순히 메서드를 쓰고 <code>instanceof</code> 체크를 하는 데는 문제가 없습니다. 하지만 <strong>'객체의 기원'</strong>을 추적하거나 <strong>'복제'</strong>할 때 치명적인 버그가 발생합니다.</p>
                  </div>

                  <LiveCodeEditor
                    scopeId="js-proto-constructor-issue"
                    initialHtml={consoleHtml}
                    initialJs={`function Parent() {}
function Child() {}

// Step 3(복구)를 안 했을 때의 문제
Child.prototype = Object.create(Parent.prototype);

const myChild = new Child();

log("1. 너를 만든 사람은 누구니?");
log("Creator: " + myChild.constructor.name); 
// Child가 아닌 Parent가 나옴! (거짓말하는 객체)

log("\\n2. 너랑 똑같은 형제 한 명 더 만들어봐 (new myChild.constructor())");
const sibling = new myChild.constructor();
log("Sibling is Child? " + (sibling instanceof Child)); 
// false! (난데없이 Parent가 태어남)`}
                  />
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="6. Class Master: 최신 클래스 문법 (Private & Static)">
                <div className="concepts">
                    <p>현대 자바스크립트는 프로토타입을 더 편리하게 쓰기 위해 **캡슐화**와 **정적 속성**이라는 강력한 도구를 제공합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-class-master"
                    initialHtml={consoleHtml}
                    initialJs={`class Account {
  // 1. Private Fields (#): 외부에서 절대 접근 불가 (완전 캡슐화)
  #balance = 0;
  
  // 2. Static Block: 클래스가 로드될 때 딱 한 번 초기화 실행
  static {
    log("🏢 Account 시스템이 초기화되었습니다.");
  }

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    this.#balance += amount;
    log(\`[\${this.owner}] \${amount}원 입금 완료\`);
  }

  check() {
    log(\`잔액 확인: \${this.#balance}원\`);
  }
}

const myAcc = new Account("Jennie");
myAcc.deposit(5000);
myAcc.check();

// log(myAcc.#balance); // ❌ Syntax Error! (주석을 풀어보세요)
log("외부에선 #balance를 볼 수 없지만, 내부적으론 프로토타입 메서드가 이를 완벽히 다룹니다.");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="7. 주의: 빌트인 프로토타입 수정">
                <div className="concepts">
                  <div className="info-box danger">
                    <strong>⚠️ 원숭이 패치 (Monkey Patching) 주의</strong>
                    <p><code>Array.prototype</code>이나 <code>Object.prototype</code>에 직접 메서드를 추가하는 행동은 매우 위험합니다.</p>
                    <ul>
                      <li>다른 라이브러리와 충돌할 수 있습니다.</li>
                      <li>네이티브 엔진의 최적화 흐름을 방해할 수 있습니다.</li>
                      <li>미래에 자바스크립트 표준에 똑같은 이름의 기능이 생기면 치명적인 버그가 됩니다.</li>
                    </ul>
                  </div>
                </div>
            </CollapsibleSection>

            <style>{`
              .info-table-wrapper { margin: 15px 0; overflow-x: auto; }
              .info-table { width: 100%; border-collapse: collapse; background: var(--bg-secondary); border-radius: 8px; font-size: 0.9rem; }
              .info-table th, .info-table td { padding: 12px; border: 1px solid var(--border-color); text-align: left; }
              .info-table th { background: var(--bg-tertiary); color: var(--text-primary); }
              .info-table td { color: var(--text-secondary); line-height: 1.5; }
            `}</style>

            <RelatedLinks
                links={[
                    {
                        path: "/js/objects",
                        title: "13. 객체와 프로퍼티",
                        description: "객체의 기본 구조와 리터럴 방식을 복습합니다.",
                        icon: "🗃️"
                    },
                    {
                        path: "/js/type-checking",
                        title: "20. 타입 판별 끝판왕",
                        description: "instanceof 연산자가 프로토타입 체인을 활용하는 원리를 이해합니다.",
                        icon: "🔍"
                    }
                ]}
            />
        </div>
    );
};

export default JsPrototypesStudy;
