import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsObjectsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Object Inspector</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> JavaScript 실행 결과를 확인하세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="7. 객체와 프로퍼티 (Objects & Props)"
                subtitle="데이터의 구조화: 실세상의 사물을 코드로 표현하는 객체 지향적 접근법과 최신 다루기 기술을 배웁니다."
            />

            <CollapsibleSection title="1. 객체 리터럴과 메서드" initiallyOpen={true}>
                <div className="concepts">
                    <p>객체는 `key: value` 쌍으로 구성된 데이터 뭉치입니다.</p>
                    <p>객체 안에 정의된 함수를 **메서드(Method)**라고 부르며, <code>this</code> 키워드를 통해 자신의 데이터를 참조할 수 있습니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-basics"
                    initialHtml={consoleHtml}
                    initialJs={`const coffee = {
  name: "Americano",
  price: 4500,
  sweet: false,
  // 메서드 선언
  info: function() {
    return \`[\${this.name}] 가격은 \${this.price}원입니다.\`;
  }
};

log("Name: " + coffee.name);
log("Method Call: " + coffee.info());

// 속성 추가 및 수정
coffee.size = "Grande";
coffee.price = 5000;
log("Updated Price: " + coffee.price);
log("New Size: " + coffee.size);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 프로퍼티 접근과 동적 키 (Access & Dynamic Keys)">
                <div className="concepts">
                    <p>객체의 속성에 접근하는 두 가지 방법과, 실행 중에 키 값이 결정될 때 사용하는 **대괄호 표기법**을 배웁니다.</p>
                    <ul>
                        <li><strong>점 표기법 (`.`)</strong>: 가장 일반적이고 가독성이 좋습니다.</li>
                        <li><strong>대괄호 표기법 (`[]`)</strong>: 키 이름에 공백이 있거나, 변수에 담긴 값을 키로 쓸 때 **필수**입니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-access"
                    initialHtml={consoleHtml}
                    initialJs={`const user = {
  name: "Jennie",
  "home address": "Seoul, Korea"
};

// 1. 점 표기법
log("Dot access: " + user.name);

// 2. 대괄호 표기법 (공백이 있는 키)
log("Bracket access (space): " + user["home address"]);

// 3. 동적 키 (Dynamic Key)
const keyName = "name";
log("Dynamic access: " + user[keyName]); // user.keyName 은 undefined!

// 4. 계산된 프로퍼티 (Computed Property)
const prefix = "user_";
const dynamicObj = {
  [prefix + "id"]: 12345
};
log("Computed key result: " + dynamicObj.user_id);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 구조 분해 할당 (Destructuring)">
                <div className="concepts">
                    <p>객체의 속성을 변수로 쉽고 빠르게 추출하는 문법입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-destructuring"
                    initialHtml={consoleHtml}
                    initialJs={`const config = {
  theme: "dark",
  fontSize: 16,
  showSidebar: true,
  user: { id: 1, nickname: "dev_jennie" }
};

// 1. 기본 구조 분해
const { theme, fontSize } = config;
log(\`Theme: \${theme}, Size: \${fontSize}\`);

// 2. 다른 이름으로 꺼내기
const { showSidebar: isVisible } = config;
log("Sidebar Visible: " + isVisible);

// 3. 중첩된 객체 구조 분해
const { user: { nickname } } = config;
log("User Nickname: " + nickname);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 전개 연산자와 단축 속성">
                <div className="concepts">
                    <p>객체를 복사하거나 합칠 때, 혹은 선언을 직관적으로 할 때 사용합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-modern"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. Spread Operator (...) - 객체 복사 및 업데이트
const baseUser = { id: 1, role: "Guest" };
const adminUser = { ...baseUser, role: "Admin", permission: "All" };

log("Admin Info: " + JSON.stringify(adminUser));

// 2. Property Shorthand (단축 속성명)
const name = "JavaScript";
const category = "Language";

const tech = { 
  name,      // name: name 과 같음
  category, 
  year: 1995 
};

log("\\nTech Object: " + JSON.stringify(tech));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 객체 비교하기 (Comparison)">
                <div className="concepts">
                    <p>객체를 비교할 때 가장 흔히 저지르는 실수는 <code>===</code> (일치 연산자)가 객체의 <strong>'내용'이 아닌 '메모리 주소'</strong>를 비교한다는 점을 간과하는 것입니다.</p>
                    
                    <div className="symbol-sub-section">
                        <h4>4.1 참조 비교 (Reference Equality) <code>===</code></h4>
                        <p>두 변수가 완전히 <strong>동일한 메모리 공간</strong>을 가리키고 있을 때만 true입니다.</p>
                    </div>

                    <div className="symbol-sub-section" style={{ marginTop: '20px' }}>
                        <h4>4.2 내용 비교 (Deep Equality)</h4>
                        <p>내용이 같은지 확인하려면 모든 키와 값을 하나씩 대조해야 합니다. 가장 간단한(하지만 완벽하지는 않은) 방법은 <strong>JSON 문자열로 바꾸어 비교</strong>하는 것입니다.</p>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-comparison"
                    initialHtml={consoleHtml}
                    initialJs={`const a = { name: "javascript", tags: ["AI", "Agent"] };
const b = { name: "javascript", tags: ["AI", "Agent"] };
const c = a;

log("--- 1. 참조 비교 (===) ---");
log("a === b: " + (a === b)); // false (주소가 다름)
log("a === c: " + (a === c)); // true (주소가 같음)

log("\\n--- 2. 내용 비교 (JSON 활용) ---");
// ⚠ 순서가 다르면 다르다고 나옴
log("JSON equality: " + (JSON.stringify(a) === JSON.stringify(b))); 

log("\\n--- 3. 완벽한 내용 비교 (isDeepEqual 함수) ---");
function isDeepEqual(obj1, obj2) {
  // 1. 값 자체가 같거나 같은 주소면 true
  if (obj1 === obj2) return true;
  // 2. 둘 중 하나가 객체가 아니거나 null이면 false
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

  // 3. 키의 개수가 다르면 false
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  // 4. 모든 키를 돌며 재귀적으로 비교
  for (let key of keys1) {
    if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) return false;
  }
  return true;
}
log("isDeepEqual(a, b): " + isDeepEqual(a, b)); // true!

log("\\n--- 4. 특수 케이스: Object.is() ---");
log("NaN === NaN: " + (NaN === NaN));      // false
log("Object.is(NaN, NaN): " + Object.is(NaN, NaN)); // true`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="6. Object Master: 프로퍼티 디스크립터 (Metadata)">
                <div className="concepts">
                    <p>자바스크립트 객체의 각 속성은 단순히 값만 가진 것이 아니라, **어떻게 동작할지** 결정하는 4가지 숨은 설정을 가지고 있습니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h5 style={{ margin: 0 }}>⚙️ Configurable</h5>
                            <p style={{ fontSize: '0.8rem' }}>속성을 삭제하거나 설정을 변경할 수 있는지 여부</p>
                        </div>
                        <div className="info-card">
                            <h5 style={{ margin: 0 }}>👁️ Enumerable</h5>
                            <p style={{ fontSize: '0.8rem' }}>`for...in`이나 `Object.keys()` 등에서 열거될지 여부</p>
                        </div>
                        <div className="info-card">
                            <h5 style={{ margin: 0 }}>✍️ Writable</h5>
                            <p style={{ fontSize: '0.8rem' }}>값을 수정할 수 있는지 여부</p>
                        </div>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-descriptors"
                    initialHtml={consoleHtml}
                    initialJs={`const hero = { name: "IronMan" };

// 1. 디스크립터 확인
log("Default Descriptor: " + JSON.stringify(Object.getOwnPropertyDescriptor(hero, 'name')));

// 2. 강력한 속성 정의 (수정 불가, 삭제 불가)
Object.defineProperty(hero, 'secretIdentity', {
  value: "Tony Stark",
  writable: false,      // 수정 불가
  configurable: false,  // 삭제/설정 불가
  enumerable: true      // 목록에 노출
});

hero.secretIdentity = "SpiderMan"; // 무시됨 (Strict mode에선 에러)
log("Secret Identity: " + hero.secretIdentity);

delete hero.secretIdentity; // 무시됨
log("Still there: " + hero.secretIdentity);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="7. Object Master: 객체 보호와 불변성 (Stability)">
                <div className="concepts">
                    <p>객체를 **읽기 전용**으로 만들거나 새로운 속성 추가를 막아 데이터의 안정성을 높이는 세 가지 수단입니다.</p>
                </div>
                <div className="info-table-wrapper" style={{ margin: '15px 0' }}>
                    <table className="info-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                <th style={{ padding: '10px' }}>메서드</th>
                                <th style={{ padding: '10px' }}>추가</th>
                                <th style={{ padding: '10px' }}>삭제</th>
                                <th style={{ padding: '10px' }}>수정(Write)</th>
                                <th style={{ padding: '10px' }}>설정(Config)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '10px' }}><strong>preventExtensions</strong></td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                                <td style={{ padding: '10px', color: 'green' }}>✅</td>
                                <td style={{ padding: '10px', color: 'green' }}>✅</td>
                                <td style={{ padding: '10px', color: 'green' }}>✅</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '10px' }}><strong>Object.seal()</strong></td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                                <td style={{ padding: '10px', color: 'green' }}>✅</td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '10px' }}><strong>Object.freeze()</strong></td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                                <td style={{ padding: '10px', color: 'red' }}>❌</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>💡 `Object.freeze`는 **얕은 복사**와 마찬가지로 **Shallow(얕은)** 합니다. 중첩된 객체는 보호하지 못하니 주의하세요!</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-stability"
                    initialHtml={consoleHtml}
                    initialJs={`const freezeMe = { level: 1, info: { owner: "Jennie" } };

Object.freeze(freezeMe);

freezeMe.level = 99; // 무시됨
log("Level 1 is still: " + freezeMe.level);

// ⚠️ 주의: 중첩 객체는 얼지 않음!
freezeMe.info.owner = "Lisa"; 
log("Nested Owner changed to: " + freezeMe.info.owner);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="8. Object Master: 완벽한 복사 (structuredClone)">
                <div className="concepts">
                    <p>지금까지는 깊은 복사를 위해 <code>JSON.parse(JSON.stringify(obj))</code>를 썼지만, 함수나 특수 객체가 사라지는 등 한계가 많았습니다.</p>
                    <p>최신 브라우저 표준인 **<code>structuredClone()</code>**은 이를 완벽하게 해결합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-obj-clone-king"
                    initialHtml={consoleHtml}
                    initialJs={`const original = {
  date: new Date(),
  set: new Set([1, 2, 3]),
  nested: { a: 1 }
};

// 1. JSON 방식의 한계 (Date -> String, Set -> 빈객체 등으로 변함)
const jsonClone = JSON.parse(JSON.stringify(original));
log("JSON Clone Date type: " + typeof jsonClone.date);

// 2. 최신 표준: structuredClone (Date, Set, Map 모두 완벽 보존)
const perfectClone = structuredClone(original);
log("Perfect Clone Date: " + perfectClone.date.getFullYear());
log("Perfect Clone Set size: " + perfectClone.set.size);
log("Is Ref same? " + (original.nested === perfectClone.nested)); // false (완벽 분리)`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/reference-types",
                        title: "9. 참조 타입과 메모리",
                        description: "객체가 메모리에 저장되는 방식과 원시 타입과의 차이를 배듭니다.",
                        icon: "🧠"
                    },
                    {
                        path: "/js/prototypes",
                        title: "11. 프로토타입과 클래스",
                        description: "객체의 유전자, 상속의 원리를 파헤칩니다.",
                        icon: "🧬"
                    }
                ]}
            />
        </div>
    );
};

export default JsObjectsStudy;
