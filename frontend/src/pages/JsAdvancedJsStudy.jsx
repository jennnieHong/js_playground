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
                    <ul>
                        <li><code>function*</code> 선언문을 사용합니다.</li>
                        <li>실행하면 **제너레이터 객체(이터레이터)**를 반환합니다.</li>
                        <li><code>yield</code> 키워드로 값을 반환하고 실행을 멈춥니다.</li>
                    </ul>
                </div>
                <LiveCodeEditor
                    scopeId="js-generators"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 무한 ID 생성기
function* idMaker() {
  let index = 1;
  while (true) {
    yield index++;
  }
}

const gen = idMaker();
log("Gen 1: " + gen.next().value);
log("Gen 2: " + gen.next().value);
log("Gen 3: " + gen.next().value);

// 2. 단계별 실행
function* stepByStep() {
  log("Step 1 시작");
  yield 'First pause';
  log("Step 2 시작");
  yield 'Second pause';
  log("완료");
}

const steps = stepByStep();
log("\\n[Step-by-step Execution]");
log("Result: " + steps.next().value);
log("Result: " + steps.next().value);
steps.next();`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 커링 (Currying): 인자 조각내기">
                <div className="concepts">
                    <p>커링은 여러 개의 인자를 받는 함수를 **하나의 인자만 받는 함수들의 체인**으로 바꾸는 기법입니다.</p>
                    <blockquote>
                        <strong>장점:</strong> 함수의 재사용성을 높이고, 특정 인자를 고정한 새로운 함수를 쉽게 만들 수 있습니다.
                    </blockquote>
                </div>
                <LiveCodeEditor
                    scopeId="js-currying"
                    initialHtml={consoleHtml}
                    initialJs={`// 1. 일반적인 함수
const multiply = (a, b) => a * b;

// 2. 커링된 함수
const curriedMultiply = a => b => a * b;

log("Standard: " + multiply(2, 3));
log("Curried: " + curriedMultiply(2)(3));

// 3. 실무 활용: 부분 적용 (Partial Application)
const double = curriedMultiply(2); 
const triple = curriedMultiply(3);

log("\\n[Partial Application]");
log("Double 5: " + double(5));
log("Triple 5: " + triple(5));

// 4. 로깅 시스템 예시
const logger = level => message => log(\`[\${level.toUpperCase()}] \${message}\`);
const infoLog = logger('info');
const errorLog = logger('error');

infoLog("App started");
errorLog("Failed to fetch data");`}
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
