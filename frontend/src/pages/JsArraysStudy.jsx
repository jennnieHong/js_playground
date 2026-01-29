import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsArraysStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Array Monitor</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 데이터 조작 결과를 확인하세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="6. 배열 마스터 (Arrays Mastery)"
                subtitle="데이터의 집합 관리: 배열을 다루는 기초 기술부터 고차 함수를 활용한 고급 데이터 가공 기술까지 배웁니다."
            />

            <CollapsibleSection title="1. 기초 메서드: 추가, 삭제, 추출" initiallyOpen={true}>
                <div className="concepts">
                    <p>배열의 요소를 다루는 가장 기본적인 연산입니다.</p>
                    <ul>
                        <li><code>push / pop</code>: 뒤쪽 추가/삭제</li>
                        <li><code>unshift / shift</code>: 앞쪽 추가/삭제</li>
                        <li><code>slice</code>: 부분 추출 (원본 보존)</li>
                        <li><code>splice</code>: 특정 위치 삽입/삭제 (원본 변경)</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-array-basics"
                    initialHtml={consoleHtml}
                    initialJs={`const fruits = ["🍎", "🍇"];
log("Initial: " + fruits);

fruits.push("🍊");
log("After push: " + fruits);

const last = fruits.pop();
log("Popped: " + last + " | Remaining: " + fruits);

const sliced = fruits.slice(0, 1);
log("Sliced (0, 1): " + sliced);
log("Original is same: " + fruits);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 고차 함수: map, filter, find">
                <div className="concepts">
                    <p>모던 자바스크립트의 꽃입니다. 반복문 없이 데이터를 선언적으로 처리합니다.</p>
                    <ul>
                        <li><code>filter</code>: 특정 조건을 만족하는 데이터만 **추출**</li>
                        <li><code>map</code>: 모든 요소를 특정 규칙에 따라 **변환**</li>
                        <li><code>find</code>: 특정 조건을 만족하는 **첫 번째 요소** 찾기</li>
                    </ul>

                    <div className="info-table-wrapper">
                      <table className="info-table">
                        <thead>
                          <tr>
                            <th>장점 (Pros)</th>
                            <th>단점 & 주의사항 (Cons)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>가독성:</strong> 루프 변수 관리 없이 목적이 명확히 드러남.</td>
                            <td><strong>성능:</strong> 아주 거대한 배열에서는 일반 <code>for</code>문보다 약간 느릴 수 있음.</td>
                          </tr>
                          <tr>
                            <td><strong>불변성:</strong> 원본 배열을 수정하지 않고 새 배열을 반환함.</td>
                            <td><strong>디버깅:</strong> 체이닝이 길어지면 중간 단계의 값을 확인하기 번거로움.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-array-hoc"
                    initialHtml={consoleHtml}
                    initialJs={`const users = [
  { name: "JENNIE", score: 95 },
  { name: "ROSE", score: 80 },
  { name: "LISA", score: 60 },
  { name: "JISOO", score: 100 }
];

// 1. 80점 이상인 유저만 필터링
const highScorers = users.filter(u => u.score >= 80);
log("High Scorers Count: " + highScorers.length);

// 2. 이름만 추출하여 새로운 배열 생성
const names = users.map(u => u.name);
log("User Names: " + names);

// 3. 100점 만점자 찾기
const winner = users.find(u => u.score === 100);
log("Winner Name: " + (winner ? winner.name : "None"));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 누적 연산: reduce">
                <div className="concepts">
                    <p>배열의 모든 요소를 하나의 값으로 압축합니다. 합계, 통계, 데이터 포맷 변경 등에 매우 강력하게 쓰입니다.</p>
                    <p><code>reduce((누적값, 현재값) =&gt; {'{ ... }'}, 초기값)</code></p>
                    
                    <blockquote>
                      <strong>⚠️ reduce 사용 시 주의사항:</strong>
                      <ul>
                        <li><strong>초기값 설정:</strong> 초기값을 생략하면 배열의 첫 번째 요소가 초기값이 됩니다. 빈 배열에서 초기값 없이 <code>reduce</code>를 쓰면 에러가 발생하므로 <strong>항상 초기값을 명시</strong>하는 습관이 중요합니다.</li>
                        <li><strong>사이드 이펙트:</strong> 누적값(acc)이 객체나 배열일 경우, 내부를 직접 수정하지 말고 스프레드 연산자 등을 사용해 새로운 상태를 반환하는 것이 안전합니다.</li>
                      </ul>
                    </blockquote>
                </div>
                <LiveCodeEditor
                    scopeId="js-array-reduce"
                    initialHtml={consoleHtml}
                    initialJs={`const inventory = [
  { item: "Notebook", price: 1200, qty: 2 },
  { item: "Mouse", price: 300, qty: 5 },
  { item: "Monitor", price: 4500, qty: 1 }
];

// 총 재고 금액 합산
const totalValue = inventory.reduce((total, current) => {
  return total + (current.price * current.qty);
}, 0);

log("--- 재고 보고서 ---");
log("총 자산 가치: " + totalValue + "원");

// 특정 값의 개수 세기 (응용)
const votes = ["Yes", "No", "Yes", "Yes", "No"];
const stats = votes.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

log("\\n투표 결과: " + JSON.stringify(stats));`}
                />
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
                        path: "/js/array-like",
                        title: "10. 유사 배열 객체",
                        description: "배열과 비슷해 보이지만 사실은 일반 객체인 유사 배열의 한계와 활용법을 배웁니다.",
                        icon: "🎭"
                    },
                    {
                        path: "/js/functions",
                        title: "11. 함수와 클로저",
                        description: "고차 함수(map, filter)의 핵심인 함수의 원리과 클로저를 배웁니다.",
                        icon: "🧩"
                    }
                ]}
            />
        </div>
    );
};

export default JsArraysStudy;
