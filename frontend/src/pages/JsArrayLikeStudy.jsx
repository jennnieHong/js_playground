import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsArrayLikeStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Array-like Lab</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 유사 배열의 특성과 활용법을 실험합니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="10. 유사 배열 객체 (Array-like Objects)"
        subtitle="배열인 듯 배열 아닌 배열 같은 너: index와 length만 가진 객체의 정체와 실무 활용법을 완벽히 이해합니다."
      />

      <CollapsibleSection title="1. 유사 배열이란? (Definition)" initiallyOpen={true}>
        <div className="concepts">
          <p>숫자 형태의 <strong>인덱스(0, 1, 2...)</strong>와 <strong>length</strong> 속성을 가졌지만, <code>Array.prototype</code>의 내장 메서드(map, filter 등)는 없는 객체를 말합니다.</p>
          <div className="info-grid">
            <div className="info-card">
              <h4>특징</h4>
              <p>배열처럼 <code>obj[0]</code>으로 접근 가능하고 <code>obj.length</code>를 볼 수 있습니다.</p>
            </div>
            <div className="info-card warning">
              <h4>한계</h4>
              <p><code>push</code>, <code>pop</code>, <code>forEach</code> 등을 직접 호출하면 에러가 발생합니다.</p>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="js-arraylike-basic"
          initialHtml={consoleHtml}
          initialJs={`// 1. 순수한 유사배열 만들기
const arrayLike = {
  0: "Apple",
  1: "Banana",
  length: 2
};

log("Index 0: " + arrayLike[0]);
log("Length: " + arrayLike.length);

// 2. [주의] 배열 메서드 호출 시도
try {
  arrayLike.forEach(item => log(item));
} catch (e) {
  log("\\nError: " + e.message, true); // "arrayLike.forEach is not a function"
}`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 왜 존재하나요? (Why they exist)">
        <div className="concepts">
          <p>자바스크립트의 역사와 설계 철학 때문입니다.</p>
          <ul>
            <li><strong>최소한의 구조:</strong> 배열이 가진 복잡한 기능은 필요 없지만, '순서대로 나열된 데이터'가 필요할 때 메모리 효율을 위해 사용합니다.</li>
            <li><strong>브라우저 표준(DOM):</strong> <code>NodeList</code>나 <code>HTMLCollection</code>은 실시간으로 변하는 요소를 담기 위한 브라우저 통신용 특수 객체로 설계되었습니다.</li>
            <li><strong>함수 인자:</strong> 과거에는 가변 인자를 다루기 위해 <code>arguments</code>라는 유사배열을 사용했습니다.</li>
          </ul>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="3. 장단점 비교 (Pros & Cons)">
        <div className="concepts">
          <div className="info-table-wrapper">
            <table className="info-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th>유사 배열 (Array-like)</th>
                  <th>진짜 배열 (Array)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>장점</strong></td>
                  <td>매우 가볍고 특정 목적(DOM 등)에 최적화됨.</td>
                  <td>강력한 데이터 가공 메서드(map, filter 등) 제공.</td>
                </tr>
                <tr>
                  <td><strong>단점</strong></td>
                  <td>가공을 위해 배열로 변환하는 추가 과정이 필요함.</td>
                  <td>유사배열보다 상대적으로 무거움.</td>
                </tr>
                <tr>
                  <td><strong>사용법</strong></td>
                  <td><code>length</code>와 인덱스 수동 관리.</td>
                  <td>내장 메서드 자동 관리.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="4. 배열로 변환하여 사용하기">
        <div className="concepts">
          <p>유사배열의 데이터를 마음껏 가공하고 싶다면 진짜 배열로 <strong>'승격'</strong>시켜야 합니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-arraylike-convert"
          initialHtml={consoleHtml}
          initialJs={`const arrayLike = { 0: 10, 1: 20, 2: 30, length: 3 };

// 방법 1: Array.from() - ES6+ 공식 추천
// "length가 있네? 그럼 배열로 만들어줄게!" (친절함)
const arr1 = Array.from(arrayLike);

// 방법 2: Spread 연산자 (...)
// "Symbol.iterator 함수 있니? 없으면 못 펼쳐!" (까다로움)
try {
  const arr2 = [...arrayLike];
} catch (e) {
  log("Spread Error: " + e.message, true);
}

log("\\nArray.from Result: " + JSON.stringify(arr1));`}
        />

        <div className="info-box" style={{ marginTop: '20px' }}>
          <strong>🚀 Deep Dive: Spread(...)가 실패하는 진짜 이유</strong>
          <p>마침표 세 개(`...`) 스프레드 연산자와 `Array.from()`은 비슷해 보이지만 <strong>작동 조건</strong>이 다릅니다.</p>
          <ul>
            <li><strong>`Array.from(obj)`</strong>: 대상이 <strong>Iterable</strong>이거나, 혹은 그냥 <strong>length</strong> 속성만 가진 객체(Array-like)라면 무조건 배열로 바꿔줍니다.</li>
            <li><strong>`[...obj]`</strong>: 오직 대상이 <strong>Iterable Protocol</strong>(`Symbol.iterator` 메서드 소유)을 준수할 때만 작동합니다.</li>
          </ul>
          <p>우리가 만든 <code>{`{ 0: 'a', length: 1 }`}</code> 객체는 `length`는 있지만, 순회하는 법을 알려주는 `Symbol.iterator` 함수가 없기 때문에 스프레드 연산자가 어디서부터 어디까지 펼쳐야 할지 몰라 에러를 내뱉는 것입니다.</p>
          
          <div className="info-box warning" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <strong>🛑 오해 금지: 모든 유사배열이 자동으로 이터레이터를 갖는 것은 아닙니다!</strong>
            <p>"변수로 넘기는 유사객체가 자동으로 이터레이터를 갖게 될까?"에 대한 답은 <strong>아니요(No)</strong>입니다.</p>
            <ul>
              <li><strong>빌트인(NodeList, arguments)</strong>: 자바스크립트 엔진과 브라우저가 "이건 리스트처럼 쓰일 일이 많으니 내가 미리 엔진 레벨에서 이터레이터를 심어줄게!"라고 <strong>특별 대우</strong>를 해준 것입니다.</li>
              <li><strong>커스텀(일반 객체)</strong>: 우리가 직접 <code>{`{ length: 1 }`}</code> 처럼 만든 것은 그냥 '데이터 덩어리'일 뿐입니다. 엔진은 이게 배열처럼 쓰일지 아닐지 모르기 때문에 **절대로 자동으로 이터레이터를 만들어주지 않습니다.**</li>
            </ul>
            <p>그래서 우리가 직접 만든 유사배열은 <code>Array.from()</code>을 써서 수동으로 변환하거나, 직접 <code>Symbol.iterator</code>를 구현해 넣어줘야만 합니다.</p>
          </div>

          <blockquote>
            <strong>💡 팁:</strong> `NodeList`나 `arguments`는 자바스크립트 엔진이 미리 `Symbol.iterator`를 심어두었기 때문에 스프레드 연산자를 쓸 수 있는 것입니다.
          </blockquote>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="5. 실전 사례 (Real-world Examples)">
        <div className="concepts">
          <h4>Case 1: 함수의 arguments</h4>
          <p>전달된 모든 인자를 담고 있는 고전적인 유사배열입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-arraylike-args"
          initialHtml={consoleHtml}
          initialJs={`function myFunc() {
  log("Is arguments array? " + Array.isArray(arguments));
  log("Length: " + arguments.length);
  
  // 배열로 바꿔서 합계 구하기
  const argsArr = Array.from(arguments);
  const sum = argsArr.reduce((a, b) => a + b, 0);
  log("Sum: " + sum);
}

myFunc(1, 2, 3, 4, 10);`}
        />
        
        <div className="concepts" style={{ marginTop: '20px' }}>
          <h4>Case 2: DOM NodeList</h4>
          <p><code>querySelectorAll</code>로 가져온 요소들은 유사배열입니다.</p>
        </div>
        <LiveCodeEditor
          scopeId="js-arraylike-dom"
          initialHtml={`
            <ul id="test-list">
              <li>Item A</li>
              <li>Item B</li>
            </ul>
            ${consoleHtml}
          `}
          initialJs={`const nodes = pickAll("#test-list li");
log("NodeList Length: " + nodes.length);

// 최신 브라우저는 NodeList에 forEach가 직접 구현되어 있지만,
// map이나 filter는 여전히 변환이 필요합니다.
const texts = Array.from(nodes).map(node => node.innerText);
log("Extracted Texts: " + texts);`}
        />
      </CollapsibleSection>

      <RelatedLinks
        links={[
          {
            path: "/js/reference-types",
            title: "9. 참조 타입과 객체심화",
            description: "객체가 메모리에 저장되는 방식과 원시 타입과의 차이를 배웁니다.",
            icon: "🧠"
          },
          {
            path: "/js/arrays",
            title: "12. 배열 마스터 (Arrays Mastery)",
            description: "진짜 배열을 완벽하게 다루기 위한 모든 고차 함수를 배웁니다.",
            icon: "📊"
          }
        ]}
      />
      <style>{`
        .info-table-wrapper { margin: 15px 0; overflow-x: auto; }
        .info-table { width: 100%; border-collapse: collapse; background: var(--bg-secondary); border-radius: 8px; font-size: 0.9rem; }
        .info-table th, .info-table td { padding: 12px; border: 1px solid var(--border-color); text-align: left; }
        .info-table th { background: var(--bg-tertiary); color: var(--text-primary); }
        .info-table td { color: var(--text-secondary); line-height: 1.5; }
      `}</style>
    </div>
  );
};

export default JsArrayLikeStudy;
