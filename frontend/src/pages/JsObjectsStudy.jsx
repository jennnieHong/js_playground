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

            <CollapsibleSection title="2. 구조 분해 할당 (Destructuring)">
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

            <CollapsibleSection title="3. 전개 연산자와 단축 속성">
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
        </div>
    );
};

export default JsObjectsStudy;
