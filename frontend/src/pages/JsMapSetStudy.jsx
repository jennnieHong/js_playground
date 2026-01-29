import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsMapSetStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Map & Set Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 실행 결과가 여기에 표시됩니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="12. Map & Set (컬렉션 심화)"
                subtitle="객체와 배열의 한계를 극복하는 현대적인 데이터 컬렉션인 Map과 Set, 그리고 메모리 효율적인 WeakMap/WeakSet을 학습합니다."
            />

            <CollapsibleSection title="1. Map: 키-값 쌍의 진화" initiallyOpen={true}>
                <div className="concepts">
                    <p><code>Map</code>은 객체와 유사하지만, **키(Key)의 타입에 제한이 없다**는 강력한 장점이 있습니다.</p>
                    <div className="info-grid">
                        <div className="info-card">
                            <h4>Map vs Object</h4>
                            <ul>
                                <li><strong>키 타입:</strong> Object는 문자열/심볼만 가능, Map은 객체/함수 등 모든 타입 가능.</li>
                                <li><strong>순서:</strong> Map은 삽입 순서를 보장합니다.</li>
                                <li><strong>크기:</strong> <code>map.size</code>로 즉시 확인 가능 (Object는 <code>Object.keys().length</code> 필요).</li>
                                <li><strong>성능:</strong> 잦은 추가/삭제 시 Map이 더 최적화되어 있습니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="js-map-basics"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. Map 생성 및 기본 메서드
const myMap = new Map();

myMap.set('name', 'Antigravity');
myMap.set(1, 'Number one');
const objKey = { id: 10 };
myMap.set(objKey, 'Object as key');

log("Map size: " + myMap.size);
log("Get by string: " + myMap.get('name'));
log("Get by object key: " + myMap.get(objKey));

// 2. 순회 (Iteration)
log("\\n[Iteration Loop]");
for (let [key, value] of myMap) {
  log(\`Key: \${typeof key === 'object' ? 'Object' : key} => Value: \${value}\`);
}

// 3. 삭제 및 초기화
myMap.delete(1);
log("\\nAfter delete(1), size: " + myMap.size);
myMap.clear();
log("After clear(), size: " + myMap.size);`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. Set: 중복 없는 고유한 값들의 집합">
                <div className="concepts">
                    <p><code>Set</code>은 중복을 허용하지 않는 값들의 리스트입니다. 배열에서 중복을 제거할 때 가장 많이 활용됩니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-set-basics"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. Set 생성 및 중복 자동 제거
const mySet = new Set([1, 2, 2, 3, 3, 3, 4]);
log("Initial Set (from [1,2,2,3,3,3,4]): " + [...mySet].join(', '));

// 2. 값 추가 및 확인
mySet.add(5);
mySet.add(1); // 이미 존재하므로 무시됨
log("Has 5? " + mySet.has(5));
log("Size: " + mySet.size);

// 3. 배열 중복 제거 실무 패턴
const numbers = [1, 5, 2, 1, 4, 3, 5];
const uniqueNumbers = [...new Set(numbers)];
log("\\n[Practical: Deduplication]");
log("Original: " + numbers.join(', '));
log("Unique: " + uniqueNumbers.join(', '));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. WeakMap & WeakSet: 가비지 컬렉션과 메모리 관리">
                <div className="concepts">
                    <p><code>WeakMap</code>과 <code>WeakSet</code>은 참조하는 객체에 대한 **약한 참조(Weak Reference)**를 유지합니다.</p>
                    <ul>
                        <li>키(WeakMap) 또는 값(WeakSet)으로 **객체만** 올 수 있습니다.</li>
                        <li>참조되는 객체가 메모리에서 해제되면 WeakMap/WeakSet에서도 **자동으로 삭제**됩니다.</li>
                        <li>순회(Iteration)가 불가능합니다. (가비지 컬렉션 시점이 일정하지 않기 때문)</li>
                    </ul>
                    <blockquote>
                        <strong>실무 활용:</strong> 객체에 부가적인 상태 정보를 저장하고 싶지만, 해당 객체가 삭제될 때 정보도 함께 지워져야 하는 경우(메모리 누수 방지)에 주로 사용합니다.
                    </blockquote>
                </div>
                <LiveCodeEditor
                    scopeId="js-weakmap-concept"
                    initialHtml={consoleHtml}
                    initialJs={`// WeakMap은 가비지 컬렉션 동작을 직접 확인하기 어렵지만 (브라우저 정책상)
// 문법적인 특성을 확인해 봅시다.

const wm = new WeakMap();
let user = { name: "Jenny" };

// 객체를 키로 사용
wm.set(user, "Premium User Data");
log("Get data before nulling: " + wm.get(user));

// user 참조를 제거
user = null; 
// 이제 wm에 저장된 데이터는 가비지 컬렉터의 대상이 됩니다.
// 'Weak' 하지 않은 일반 Map이었다면 user가 null이 되어도 Map이 참조를 쥐고 있어 메모리가 해제되지 않습니다.

log("\\nWeakMap은 size 프로퍼티가 없고 순회도 불가능합니다.");
log("wm.size: " + wm.size); // undefined`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/objects",
                        title: "10. 객체와 프로퍼티",
                        description: "기본적인 객체(Object)의 구조와 특징을 다시 확인해보세요.",
                        icon: "🗃️"
                    },
                    {
                        path: "/js/arrays",
                        title: "11. 배열 마스터",
                        description: "배열과 Set의 차이점을 성능 관점에서 비교해보세요.",
                        icon: "📊"
                    }
                ]}
            />
        </div>
    );
};

export default JsMapSetStudy;
