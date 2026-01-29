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
        </div>
        <LiveCodeEditor
          scopeId="js-destructuring"
          initialHtml={consoleHtml}
          initialJs={`// 1. 객체 구조 분해
const profile = { nick: "BlackPink", song: "Pink Venom", year: 2022 };
const { nick, song } = profile;

log("Object Destructuring:");
log(\`Artist: \${nick}, Song: \${song}\`);

// 2. 배열 구조 분해
const coords = [100, 200, 300];
const [x, y] = coords;
log("\\nArray Destructuring:");
log(\`X: \${x}, Y: \${y}\`);

// 3. 변수 이름 변경 및 기본값
const { year: releasedYear, genre = "K-Pop" } = profile;
log("\\nRenamed & Default:");
log(\`Year: \${releasedYear}, Genre: \${genre}\`);`}
        />
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

      <CollapsibleSection title="4. 실무 꿀팁: 얕은 복사와 불변성">
        <div className="concepts">
          <blockquote>
            <strong>⚠️ 주의사항:</strong> 스프레드 연산자는 **얕은 복사(Shallow Copy)**를 수행합니다.
            중첩된 객체가 있다면 내부 객체의 참조 주소는 공유되므로, 완전히 독립적인 복사본을 만들려면 'Deep Copy' 기법을 병용해야 합니다.
          </blockquote>
          <p>💡 자세한 내용은 <a href="/js/basics">변수와 기초</a> 페이지의 '메모리 관리' 섹션을 참고하세요.</p>
        </div>
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
