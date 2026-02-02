import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsStringMethodsStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">String Methods Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 문자열 메서드 실행 결과가 여기에 표시됩니다.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="String.prototype: 문자열 메서드 마스터"
                subtitle="자바스크립트의 모든 문자열이 기본적으로 가지고 있는 강력한 내장 기능들을 상세히 알아보고 실습합니다."
            />

            <CollapsibleSection title="1. 탐색 및 포함 여부 (Search & Inclusion)" initiallyOpen={true}>
                <div className="concepts">
                    <p>문자열 안에 특정 내용이 있는지 확인하거나 위치를 찾을 때 사용합니다.</p>
                    <div className="info-box info">
                        <ul>
                            <li><strong><code>includes(str)</code></strong>: 특정 문자열이 포함되어 있는지 여부(true/false) 반환</li>
                            <li><strong><code>indexOf(str)</code></strong>: 특정 문자열이 시작되는 첫 번째 인덱스 반환 (없으면 -1)</li>
                            <li><strong><code>startsWith / endsWith</code></strong>: 특정 문자열로 시작하거나 끝나는지 확인</li>
                        </ul>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="string-search"
                    initialHtml={consoleHtml}
                    initialJs={`const text = "Hello, JavaScript World!";

log("문자열: " + text);
log("1. 'Java' 포함 여부: " + text.includes("Java"));
log("2. 'Python' 포함 여부: " + text.includes("Python"));
log("3. 'JavaScript' 시작 인덱스: " + text.indexOf("JavaScript"));
log("4. 'Hello'로 시작하나?: " + text.startsWith("Hello"));
log("5. '!'로 끝나나?: " + text.endsWith("!"));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 추출 및 분리 (Extraction & Slicing)">
                <div className="concepts">
                    <p>문자열의 일부분을 잘라내거나, 특정 기준에 따라 배열로 나눕니다.</p>
                    <div className="info-box success">
                        <ul>
                            <li><strong><code>slice(start, end)</code></strong>: 시작부터 끝 전까지 추출 (음수 인덱스 가능)</li>
                            <li><strong><code>substring(start, end)</code></strong>: slice와 비슷하지만 음수 비지원</li>
                            <li><strong><code>split(separator)</code></strong>: 구분자를 기준으로 문자열을 잘라 <strong>배열</strong>로 반환</li>
                        </ul>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="string-extract"
                    initialHtml={consoleHtml}
                    initialJs={`const email = "javascript@google.com";

log("전체 이메일: " + email);
log("1. 아이디 추출 (slice): " + email.slice(0, email.indexOf("@")));
log("2. 도메인 추출 (slice): " + email.slice(email.indexOf("@") + 1));
log("3. 뒤에서 3글자: " + email.slice(-3));

log("\\n--- split 예제 ---");
const tags = "javascript,react,hook,state";
log("문자열: " + tags);
log("배열로 변환: " + JSON.stringify(tags.split(",")));`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 변환 및 편집 (Transformation & Editing)">
                <div className="concepts">
                    <p>문자열의 내용을 바꾸거나 공백을 제거하고, 길이를 맞추는 등의 가공 작업을 수행합니다.</p>
                    <div className="info-box warning">
                        <ul>
                            <li><strong><code>replace / replaceAll</code></strong>: 특정 내용을 찾아 다른 내용으로 치환</li>
                            <li><strong><code>toUpperCase / toLowerCase</code></strong>: 대소문자 변환</li>
                            <li><strong><code>trim</code></strong>: 앞뒤 공백 제거</li>
                            <li><strong><code>padStart / padEnd</code></strong>: 문자열의 길이를 고정하고 빈 부분을 특정 문자로 채움</li>
                        </ul>
                    </div>
                </div>
                <LiveCodeEditor
                    scopeId="string-transform"
                    initialHtml={consoleHtml}
                    initialJs={`const msg = "   Hello World!   ";

log("1. 공백 제거: '" + msg.trim() + "'");
log("2. 대문자로: " + msg.toUpperCase());

log("\\n--- replace 예제 ---");
const fruits = "apple, banana, apple";
log("원본: " + fruits);
log("첫 번째 apple만 교체: " + fruits.replace("apple", "orange"));
log("모든 apple 교체: " + fruits.replaceAll("apple", "orange"));

log("\\n--- 패딩 예제 ---");
const id = "42";
log("카드 번호 마스킹: " + id.padStart(4, "0")); // 0042
log("금액 정렬: " + "5000".padEnd(10, ".") + "won");`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="4. 정규표현식 연동 (Regex Integration)">
                <div className="concepts">
                    <p>복잡한 패턴을 찾거나 모든 일치 항목을 가져올 때 사용합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="string-regex"
                    initialHtml={consoleHtml}
                    initialJs={`const story = "The quick brown fox jumps over 13 lazy dogs, 45 times.";

// 1. match: 일치하는 부분 찾기
const numbers = story.match(/\\d+/g);
log("1. 숫자 찾기: " + JSON.stringify(numbers));

// 2. search: 패턴 발견 위치
log("2. 첫 번째 숫자 위치: " + story.search(/\\d+/));

// 3. replace + Regex
log("3. 숫자 모두 X로: " + story.replace(/\\d+/g, "X"));`}
                />
            </CollapsibleSection>

            <RelatedLinks
                links={[
                    {
                        path: "/js/advanced-js",
                        title: "19. 고급 함수 기법 (커링)",
                        description: "문자열 검증기 등을 만들 때 유용한 커링 기법을 배웁니다.",
                        icon: "🚀"
                    },
                    {
                        path: "/js/regexp",
                        title: "20. 정규표현식",
                        description: "패턴 매칭에 필수적인 정규표현식 기호를 상세히 다룹니다.",
                        icon: "🔍"
                    }
                ]}
            />
        </div>
    );
};

export default JsStringMethodsStudy;
