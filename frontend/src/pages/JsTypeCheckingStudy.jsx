import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsTypeCheckingStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Type Analyzer</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 정체를 알고 싶은 데이터를 입력하세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="20. 타입 판별 끝판왕 (Ultimate Type Checking)"
                subtitle="자바스크립트의 복잡한 타입 체계를 완벽하게 파악하는 4가지 방법과 실무 활용법을 배웁니다."
            />

            <CollapsibleSection title="1. 기본적인 typeof (값의 종류)" initiallyOpen={true}>
                <div className="concepts">
                  <p>가장 대중적이지만, 참조 타입을 구분할 때는 매우 무기력합니다.</p>
                  <div className="info-box warning">
                    <strong>⚠️ typeof의 한계</strong>
                    <ul>
                      <li><code>typeof null</code> === "object" (유명한 설계 오류)</li>
                      <li><code>typeof []</code> === "object"</li>
                      <li><code>typeof {}</code> === "object"</li>
                    </ul>
                  </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-type-typeof"
                    initialHtml={consoleHtml}
                    initialJs={`log("String: " + typeof "Hello");
log("Number: " + typeof 123);
log("Boolean: " + typeof true);
log("Undefined: " + typeof undefined);
log("Function: " + typeof function(){});

log("\\n--- Objects (The problem) ---");
log("Array: " + typeof []);
log("Object: " + typeof {});
log("Null: " + typeof null);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. instanceof (생성자 확인)">
                <div className="concepts">
                  <p>객체가 어떤 클래스(생성자 함수)의 인스턴스인지 확인합니다. 프로토타입 체인을 거슬러 올라가며 정체를 파헤칩니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-type-instanceof"
                    initialHtml={consoleHtml}
                    initialJs={`const arr = [1, 2];
const date = new Date();

log("Is arr Array? " + (arr instanceof Array));
log("Is arr Object? " + (arr instanceof Object));
log("Is date Date? " + (date instanceof Date));

log("\\n--- Caution ---");
// 원시 타입은 instanceof가 작동하지 않습니다. (자동 박싱 X)
log("'hi' instanceof String? " + ("hi" instanceof String));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. Array.isArray() (배열 판별 전용)">
                <div className="concepts">
                  <p>가장 확실하고 안전하게 **진짜 배열**인지 확인하는 방법입니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-type-isarray"
                    initialHtml={consoleHtml}
                    initialJs={`const arrayLike = { length: 2, 0: 'a', 1: 'b' };
const realArray = ['a', 'b'];

log("ArrayLike is Array? " + Array.isArray(arrayLike));
log("RealArray is Array? " + Array.isArray(realArray));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. Object.prototype.toString (최종 병기)">
                <div className="concepts">
                  <p>모든 데이터 타입의 **내부 슬롯 `[[Class]]`**를 문자열로 반환받는 가장 정확한 방법입니다.</p>
                  <p><code>[object Type]</code> 형식으로 타입을 정확히 짚어줍니다.</p>

                  <div className="info-box success">
                    <strong>💡 getTag?</strong>
                    <p><code>getTag</code>는 자바스크립트가 기본으로 제공하는 함수가 아니라, 개발자들이 <code>Object.prototype.toString.call()</code> 코드를 짧게 줄여쓰기 위해 즐겨 사용하는 <strong>함수 이름 관습(Convention)</strong>입니다.</p>
                    <p>유명한 유틸리티 라이브러리인 <strong>Lodash</strong> 등에서도 내부적으로 이와 같은 방식을 사용하여 타입을 정밀하게 판별합니다.</p>
                  </div>

                  <div className="info-box" style={{ marginTop: '15px', borderLeft: '4px solid var(--accent-primary)' }}>
                    <strong>🧐 왜 그냥 value.toString()을 쓰지 않고 복잡하게 .call()을 쓰나요?</strong>
                    <p>그 이유는 바로 <strong>'메서드 오버라이딩(Method Overriding)'</strong> 때문입니다.</p>
                    <ul>
                      <li>배열(`[]`)이나 날짜(`Date`) 같은 객체들은 자신만의 방식으로 출력하기 위해 부모인 <code>Object</code>가 물려준 <code>toString</code>을 <strong>자기 입맛에 맞게 개조(재정의)</strong>해버렸습니다.</li>
                      <li>그래서 <code>[1,2].toString()</code>을 하면 <code>"[object Array]"</code>가 아니라 <code>"1,2"</code>라는 엉뚱한 결과가 나옵니다.</li>
                      <li>결국 '변조되지 않은 원본' 기능을 쓰기 위해, <strong>Object의 원본 toString</strong>을 강제로 끌어와서(Borrowing) 내 값에 적용시키는 <strong><code>.call(value)</code></strong> 전략을 쓰는 것입니다.</li>
                    </ul>
                  </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-type-ultimate"
                    initialHtml={consoleHtml}
                    initialJs={`const arr = [1, 2, 3];

log("1. 변조된(Overridden) toString:");
log(arr.toString()); // "1,2,3" (타입 정보가 없음)

log("\\n2. 원본(Original) toString 빌려오기:");
log(Object.prototype.toString.call(arr)); // "[object Array]"

log("\\n3. 다양한 타입의 '원본 태그' 확인:");
const cases = [null, undefined, 123, "hi", true, /regex/, new Date()];
cases.forEach(c => {
  log(\`\${String(c)} -> \${Object.prototype.toString.call(c)}\`);
});`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="5. 타입 판별 가이드라인">
                <div className="concepts">
                  <div className="info-table-wrapper">
                    <table className="info-table">
                      <thead>
                        <tr>
                          <th>검사 대상</th>
                          <th>추천 방법</th>
                          <th>이유</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>원시값 (문자, 숫자 등)</strong></td>
                          <td><code>typeof</code></td>
                          <td>가장 빠르고 간결함</td>
                        </tr>
                        <tr>
                          <td><strong>배열 여부</strong></td>
                          <td><code>Array.isArray()</code></td>
                          <td>유사 배열과 완벽히 구분함</td>
                        </tr>
                        <tr>
                          <td><strong>Null 여부</strong></td>
                          <td><code>value === null</code></td>
                          <td>typeof 오류를 피하는 유일한 길</td>
                        </tr>
                        <tr>
                          <td><strong>특수 객체 (Date, Error 등)</strong></td>
                          <td><code>Object.prototype.toString</code></td>
                          <td>가장 엄격하고 정확함</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="info-box success" style={{ marginTop: '20px' }}>
                    <strong>🧠 암기 꿀팁: 타입 판별 3단계 전략</strong>
                    <p>복잡하게 생각하지 말고 딱 이 순서대로만 검사하세요!</p>
                    <ol>
                      <li><strong>일단 null부터 치우자</strong>: <code>if (v === null)</code></li>
                      <li><strong>가장 흔한 놈들(원시값)은?</strong>: <code>typeof</code></li>
                      <li><strong>배열이냐?</strong>: <code>Array.isArray()</code></li>
                      <li><strong>끝까지 정체를 숨긴다면?</strong>: <code>Object.prototype.toString.call()</code></li>
                    </ol>
                  </div>

                  <div className="info-box" style={{ background: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-secondary)' }}>
                    <strong>💡 한 줄 요약 (Mnemonic)</strong>
                    <p>"원시값은 <strong>typeof</strong>, 배열은 <strong>isArray</strong>, null은 <strong>===</strong>, 나머지는 <strong>toString</strong>!"</p>
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
                        path: "/js/basics",
                        title: "1. 변수와 문법 기초",
                        description: "원시 타입과 참조 타입의 기본적인 차이를 복습합니다.",
                        icon: "🌱"
                    },
                    {
                        path: "/js/reference-types",
                        title: "9. 참조 타입과 객체심화",
                        description: "참조 타입이 메모리에 저장되는 방식을 더 자세히 배웁니다.",
                        icon: "🧠"
                    }
                ]}
            />
        </div>
    );
};

export default JsTypeCheckingStudy;
