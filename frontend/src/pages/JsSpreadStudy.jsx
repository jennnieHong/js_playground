import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsSpreadStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Spread Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 데이터를 펼치고 구조를 분해해 봅니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="8. 스프레드 & 구조 분해 할당 (Spread & Destructuring)"
        subtitle="모던 JS의 가독성 치트키: 마점표 세 개(...)와 객체/배열의 필요한 부분만 쏙 골라내는 기술을 마스터합니다."
      />

      <CollapsibleSection title="1. 스프레드 연산자 (...Spread)" initiallyOpen={true}>
        <div className="concepts">
          <p>뭉쳐 있는 배열이나 객체를 개별 요소로 <strong>'펼치는'</strong> 역할을 합니다.</p>
          <ul>
            <li><strong>배열 합치기/복사:</strong> 원본을 손상시키지 않고 새로운 배열을 쉽게 만듭니다.</li>
            <li><strong>객체 병합/업데이트:</strong> 기존 속성을 유지하며 특정 값만 바꿀 때(불변성 유지) 필수입니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="js-spread-basic"
          initialHtml={consoleHtml}
          initialJs={`// 1. 배열의 진화
const base = [2, 3];
const full = [1, ...base, 4];
log("Combined Array: " + JSON.stringify(full));

// 2. 객체 업데이트 (가장 흔한 React 패턴)
const user = { name: "Jenny", age: 25, role: "User" };
const admin = { ...user, role: "Admin" }; // 정보는 유지하되 role만 교체

log("\\nUser: " + JSON.stringify(user));
log("Admin: " + JSON.stringify(admin));

// 3. 함수의 인자로 전달
const nums = [10, 20, 30];
log("\\nMax value: " + Math.max(...nums)); // Math.max(10, 20, 30) 과 동일`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 구조 분해 할당 (Destructuring)">
        <div className="concepts">
          <p>배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 <strong>'즉시 할당'</strong>하는 문법입니다.</p>
          
          <div className="symbol-sub-section">
            <h4>2.1 기본 객체 & 배열 분해</h4>
            <LiveCodeEditor
              scopeId="js-destructuring-basic"
              initialHtml={consoleHtml}
              initialJs={`// 1. 객체: 키 이름과 동일한 변수명 사용
const user = { id: 1, nickname: "JS_Master" };
const { id, nickname } = user;
log(\`ID: \${id}, Nick: \${nickname}\`);

// 2. 배열: 순서대로 할당
const colors = ["Red", "Green", "Blue"];
const [first, second] = colors;
log(\`\\nFirst: \${first}, Second: \${second}\`);`}
            />
          </div>

          <div className="symbol-sub-section" style={{ marginTop: '20px' }}>
            <h4>2.2 변수 이름 변경 (Alias) & 기본값 (Default)</h4>
            <p>데이터의 키 이름이 마음에 들지 않거나, 데이터가 없을 때를 대비할 수 있는 실전 문법입니다.</p>
            <table className="info-table" style={{ margin: '15px 0' }}>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>문법</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>이름 변경</strong></td>
                  <td><code>{`{ key: newName }`}</code></td>
                  <td>객체의 key를 newName이라는 새 변수로 받음</td>
                </tr>
                <tr>
                  <td><strong>기본값</strong></td>
                  <td><code>{`{ key = val }`}</code></td>
                  <td>key가 undefined일 때 사용할 값 지정</td>
                </tr>
              </tbody>
            </table>
            
            <LiveCodeEditor
              scopeId="js-destructuring-advanced"
              initialHtml={consoleHtml}
              initialJs={`// [상황] API에서 온 사용자 데이터 (키 이름이 kebab-case거나 너무 짧음)
const apiResponse = {
  u_name: "홍길동",
  user_email: "hong@example.com",
  // age 데이터가 누락된 상황
};

// 1. 이름 변경 (u_name -> userName)
// 2. 기본값 설정 (isAdmin이 없으면 false)
// 3. ✨ 보너스: 이름 변경과 기본값 동시 적용 (rank -> userRank, 없으면 "Guest")
const { 
  u_name: userName, 
  user_email: email, 
  isAdmin = false,
  rank: userRank = "Guest" 
} = apiResponse;

log("이름 변경: " + userName);  // "홍길동"
log("이메일 변경: " + email);    // "hong@example.com"
log("기본값 할당: " + isAdmin);  // false (데이터에 없으므로 기본값)
log("변경 + 기본값: " + userRank); // "Guest" (rank가 없으므로 변경된 이름에 기본값 할당)`}
            />
          </div>

          <div className="symbol-sub-section" style={{ marginTop: '20px' }}>
            <h4>2.3 중첩 객체 구조 분해 (Nested)</h4>
            <p>깊숙이 숨어있는 속성도 한 번에 꺼낼 수 있습니다.</p>
            <LiveCodeEditor
              scopeId="js-destructuring-nested"
              initialHtml={consoleHtml}
              initialJs={`const person = {
  name: "나비",
  address: {
    city: "Seoul",
    zip: "12345"
  }
};

// address 객체 안의 city만 바로 꺼내기
const { address: { city } } = person;
log("Nested Result: " + city); // "Seoul"`}
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="3. 나머지 매개변수 (...Rest)">
        <div className="concepts">
          <p>스프레드와 생김새는 같지만 역할은 정반대입니다. 여러 개의 인자를 <strong>'하나의 배열로 뭉쳐'</strong> 줍니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-rest-param"
          initialHtml={consoleHtml}
          initialJs={`// 함수의 나머지 인자들 뭉치기
function sumAll(first, ...others) {
  log("First: " + first);
  log("Others: " + others);
  return first + others.reduce((a, b) => a + b, 0);
}

const total = sumAll(1, 2, 3, 4);
log("Total sum: " + total);

// 구조 분해에서의 활용
const [gold, silver, ...rest] = ["🥇", "🥈", "🥉", "🎖️", "🎗️"];
log("\\nMedalists: " + gold + ", " + silver);
log("Underdogs: " + rest);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. 실무 꿀팁: 얕은 복사(Shallow) vs 깊은 복사(Deep)">
        <div className="concepts">
          <p>스프레드 연산자를 사용할 때 가장 많이 실수하는 부분이 바로 <strong>복사의 범위</strong>입니다.</p>
          
          <div className="info-table-wrapper" style={{ marginTop: '20px' }}>
            <table className="info-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>특징</th>
                  <th>사용 방법</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>얕은 복사 (Shallow)</strong></td>
                  <td>1단계 속성만 복제. 중첩된 객체는 참조(주소)를 공유함</td>
                  <td><code>{`{ ...obj }`}, `[...arr]`</code></td>
                </tr>
                <tr>
                  <td><strong>깊은 복사 (Deep)</strong></td>
                  <td>내부의 중첩된 모든 객체까지 완전히 새로 복제함</td>
                  <td><code>structuredClone(obj)</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="js-spread-copy-depth"
          initialHtml={consoleHtml}
          initialJs={`// [상황] 중첩된 객체가 있는 데이터
const originalUser = {
  name: "Kim",
  settings: { theme: "dark" } // 객체 안의 객체 (중첩)
};

// 1. 얕은 복사 (Shallow Copy)
const shallowUser = { ...originalUser };
shallowUser.name = "Lee";
shallowUser.settings.theme = "light"; // 🚨 알맹이를 바꾸면?

log("--- 얕은 복사 결과 ---");
log("원본 이름: " + originalUser.name); // "Kim" (안전)
log("원본 테마: " + originalUser.settings.theme); // "light" (오염됨! 😱)

// 2. 깊은 복사 (Deep Copy)
const deepUser = structuredClone(originalUser);
deepUser.settings.theme = "high-contrast";

log("\\n--- 깊은 복사 결과 ---");
log("원본 테마: " + originalUser.settings.theme); // "light" (기존 유지, 안전)
log("깊은 복사본 테마: " + deepUser.settings.theme); // "high-contrast"`}
        />
      </CollapsibleSection>

      <RelatedLinks
        links={[
          {
            path: "/js/iterables",
            title: "7. 이터러블 프로토콜",
            description: "스프레드 연산자가 배열을 펼칠 수 있는 근본 원리인 이터러블을 이해합니다.",
            icon: "➰"
          },
          {
            path: "/js/arrays",
            title: "10. 배열 마스터",
            description: "스프레드 연산자와 함께 자주 사용되는 강력한 배열 메서드들을 배웁니다.",
            icon: "📊"
          }
        ]}
      />
    </div>
  );
};

export default JsSpreadStudy;
