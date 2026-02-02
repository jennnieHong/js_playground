import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import RelatedLinks from '../components/RelatedLinks';

const JsRegExpStudy = () => {
  const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">RegExp Master Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 정규 표현식 마스터 가이드에 오신 것을 환영합니다.</div>
  </div>
</div>`;

  return (
    <div className="page-container">
      <PageHeader
        title="Regexp Master: 정규 표현식 완벽 가이드"
        subtitle="어떤 정규식도 읽고 쓸 수 있도록 기초부터 고급 기법, 실무 패턴까지 모든 문법을 총망라합니다."
      />

      {/* 1. 마스터 치트 시트 */}
      <div className="info-box success" style={{ marginBottom: '30px' }}>
        <strong style={{ fontSize: '1.2rem' }}>📑 정규식 마스터 치트 시트 (Cheat Sheet)</strong>
        <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', fontSize: '0.85rem' }}>
          <div style={{ padding: '10px', background: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <strong style={{ color: '#059669' }}>[문자 클래스]</strong><br/>
            • <code>.</code> : 모든 문자 하나<br/>
            • <code>\d</code> / <code>\D</code> : 숫자 / 숫자 아님<br/>
            • <code>\w</code> / <code>\W</code> : 문자+숫자 / 아님<br/>
            • <code>\s</code> / <code>\S</code> : 공백 / 공백 아님
          </div>
          <div style={{ padding: '10px', background: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <strong style={{ color: '#059669' }}>[수량자]</strong><br/>
            • <code>+</code> : 1개 이상 (Greedy)<br/>
            • <code>*</code> : 0개 이상 (Greedy)<br/>
            • <code>?</code> : 0개 또는 1개<br/>
            • <code>{`{n,m}`}</code> : n개에서 m개 사이
          </div>
          <div style={{ padding: '10px', background: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <strong style={{ color: '#059669' }}>[경계 및 그룹]</strong><br/>
            • <code>^ / $</code> : 시작 / 끝<br/>
            • <code>\b / \B</code> : 단어 경계 / 아님<br/>
            • <code>()</code> : 캡처 그룹<br/>
            • <code>(?:)</code> : 비캡처 그룹
          </div>
          <div style={{ padding: '10px', background: 'white', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <strong style={{ color: '#059669' }}>[대괄호 세트]</strong><br/>
            • <code>[abc]</code> : a 또는 b 또는 c<br/>
            • <code>[a-z]</code> : a부터 z까지 범위<br/>
            • <code>[^abc]</code> : a, b, c 제외 모두
          </div>
        </div>
      </div>

      <CollapsibleSection title="0. 정규식 해부학 (RegExp Anatomy)" initiallyOpen={true}>
        <div className="concepts">
          <p>정규식은 마치 암호 같아 보이지만, 구조를 쪼개 보면 매우 단순합니다.</p>
          <div style={{ padding: '20px', background: '#1f2937', color: 'white', borderRadius: '8px', textAlign: 'center', fontSize: '1.2rem', fontFamily: 'monospace', marginBottom: '15px' }}>
            <span style={{ color: '#9ca3af' }}>/</span><span style={{ color: '#4ade80', fontWeight: 'bold' }}>pattern</span><span style={{ color: '#9ca3af' }}>/</span><span style={{ color: '#f87171', fontWeight: 'bold' }}>flags</span>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '20px', fontSize: '0.95rem' }}>
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#059669' }}>1. 슬래시(/)</strong><br/>
              정규식의 시작과 끝을 알리는 약속입니다.
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#059669' }}>2. 패턴(pattern)</strong><br/>
              찾고 싶은 문자나 규칙을 적는 핵심 내용입니다.
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ color: '#dc2626' }}>3. 플래그(flags)</strong><br/>
              어떤 방식으로 찾을지 정하는 옵션입니다.
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="0-1. 👑 주권 쟁탈전: 누구의 함수인가? (Owner Distinction)">
        <div className="concepts">
          <p>누가 주체인가에 따라 함수 사용법이 달라집니다.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #3b82f6' }}>
              <strong style={{ color: '#1e40af' }}>🅰️ 문자열(String)이 주체</strong>
              <ul style={{ fontSize: '0.9rem', paddingLeft: '20px', marginTop: '10px' }}>
                <li><code>문자열.match(정규식)</code></li>
                <li><code>문자열.replace(정규식, "바꿀값")</code></li>
                <li><code>문자열.search(정규식)</code></li>
              </ul>
            </div>
            <div style={{ padding: '15px', background: '#fff7ed', borderRadius: '8px', border: '1px solid #f97316' }}>
              <strong style={{ color: '#9a3412' }}>🅱️ 정규식(RegExp)이 주체</strong>
              <ul style={{ fontSize: '0.9rem', paddingLeft: '20px', marginTop: '10px' }}>
                <li><code>정규식.test(문자열)</code> (결과: T/F)</li>
                <li><code>정규식.exec(문자열)</code> (상세 정보)</li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="0-2. 📊 반환값 요약 (Return Values Cheat Sheet)">
        <div className="concepts">
          <p>상황에 맞는 함수를 선택하기 위해 반환 타입을 확인하세요.</p>
          <table className="info-table" style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            <thead>
              <tr><th>함수</th><th>반환 타입</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td><code>.test()</code></td><td><strong>Boolean</strong></td><td>단순 존재 확인</td></tr>
              <tr><td><code>.match()</code></td><td><strong>Array / null</strong></td><td>매칭된 문자 추출</td></tr>
              <tr><td><code>.search()</code></td><td><strong>Number</strong></td><td>매칭 위치 찾기 (-1 이면 없음)</td></tr>
              <tr><td><code>.replace()</code></td><td><strong>String</strong></td><td>문자열 치환 결과</td></tr>
              <tr><td><code>.exec()</code></td><td><strong>Array / null</strong></td><td>캡처 그룹 등 상세 정보</td></tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="0-3. 🎯 두 가지 활용 모드: 추출 vs 검증 (Extraction vs Validation)">
        <div className="concepts">
          <p>정규식을 쓰는 목적은 크게 두 가지로 나뉩니다. 목적에 따라 **기호의 쓰임새**가 완전히 달라집니다.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '15px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #22c55e' }}>
              <strong style={{ color: '#15803d' }}>🔍 1. 추출 (Extraction)</strong>
              <p style={{ fontSize: '0.85rem', color: '#166534', margin: '5px 0' }}>"긴 글 속에서 **원하는 정보**를 쏙쏙!"</p>
              <ul style={{ fontSize: '0.85rem', paddingLeft: '20px' }}>
                <li>문법이 자유로움</li>
                <li>핵심 기호: <code>g</code>(전체), <code>()</code>(추출)</li>
              </ul>
            </div>
            <div style={{ padding: '15px', background: '#fef2f2', borderRadius: '8px', border: '1px solid #ef4444' }}>
              <strong style={{ color: '#b91c1c' }}>✅ 2. 검증 (Validation)</strong>
              <p style={{ fontSize: '0.85rem', color: '#991b1b', margin: '5px 0' }}>"형식이 **100% 맞는지** 확인!"</p>
              <ul style={{ fontSize: '0.85rem', paddingLeft: '20px' }}>
                <li>매우 엄격함</li>
                <li>핵심 기호: <strong><code>^</code>(시작), <code>$</code>(끝)</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="1. 메타 문자와 이스케이프 (Meta-characters & Escaping)">
        <div className="concepts">
          <p>정규식에서 마침표(<code>.</code>)나 역슬래시(<code>\</code>)는 특별한 의미를 가집니다. 이를 **'문자 그대로'** 찾으려면 앞에 <code>\</code>를 붙여야 합니다.</p>
          <div className="info-box warning" style={{ marginTop: '10px' }}>
            <ul style={{ fontSize: '0.9rem', marginBottom: 0 }}>
              <li><code>\d</code> / <code>\D</code> : 숫자 / 숫자가 아닌 것</li>
              <li><code>\w</code> / <code>\W</code> : 단어 문자(ID용) / 단어 아닌 것</li>
              <li><code>\s</code> / <code>\S</code> : 공백 문자(스페이스, 탭) / 공백 아닌 것</li>
              <li><code>\.</code> : 진짜 마침표를 찾고 싶을 때</li>
            </ul>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="re-meta"
          initialHtml={consoleHtml}
          initialJs={`// 1. 점(.)은 "모든 문자 하나"를 뜻함
const anyChar = /a.b/;
log("1. 'a.b' 매칭: " + anyChar.test("axb")); // true

// 2. 진짜 마침표를 찾으려면? (\\. 사용)
const dotChar = /a\\.b/;
log("2. 진짜 점 찾기: " + dotChar.test("a.b")); // true

// 3. 반대 개념 (대문자 기호)
const text = "Item: 100$";
const nonDigits = /\\D+/g; 
log("3. 숫자가 아닌 것만: " + text.match(nonDigits)); // ["Item: ", "$"]`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="2. 문자 셋과 범위 (Character Sets & Ranges)">
        <div className="concepts">
          <p>대괄호 <strong><code>[]</code></strong>는 그 안에 나열된 문자 중 <strong>"딱 하나"</strong>와 일치하는 바구니입니다. 이 중 하나라도 해당되면 매칭</p>
          <div className="info-box info">
            <strong>바구니 활용법:</strong>
            <ul style={{ fontSize: '0.9rem', marginTop: '5px' }}>
              <li><code>[abc]</code>: a 또는 b 또는 c</li>
              <li><code>[a-z]</code>: 알파벳 소문자 범위 (a부터 z까지)</li>
              <li><code>[0-9]</code>: 모든 숫자 (<code>\d</code>와 동일)</li>
              <li><code>[\d\s,]</code>: 숫자 또는 공백 또는 콤마</li>
              <li><code>[^abc]</code>: <strong>부정(Negation)</strong> - a, b, c만 <strong>빼고</strong> 나머지 전부</li>
              <li><code>[^\d\s,]</code>: <strong>부정(Negation)</strong> \d, \s, , <strong>빼고</strong> 나머지 전부</li>
              <li><code>[^\d\s,]+</code>: <strong>부정(Negation)</strong> \d, \s, , <strong>빼고</strong> 나머지 전부 1개 이상 연속된 부분</li>
              <li><code>^[abc]</code>: 문자열 시작</li>
              <li><code>[abc^]</code>: ^ 는 그냥 문자</li>
              <li><code>[^abc]</code>: abc 제외</li>
            </ul>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="re-ranges"
          initialHtml={consoleHtml}
          initialJs={`const text = "Apple 123, Banana 456!";

// 1. 대문자만 찾아내기
const upperSet = /[A-Z]/g;
log("1. 대문자: " + text.match(upperSet));

// 2. 숫자와 공백이 아닌 것만 ([^...])
const noNumSpace = /[^\\d\\s,]+/g; 
log("2. 숫자/공백 제외 글자: " + text.match(noNumSpace));

// 3. HTML 태그 제거 패턴
const html = "<div>Hi <b>JS</b></div>";
const tagPattern = /<[^>]+>/g; // <로 시작해서 >가 아닌 글자들이 오다가 >로 끝나는 패턴
log("3. 태그 제거: " + html.replace(tagPattern, ""));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="3. 위치와 경계 (Anchors & Boundaries)">
        <div className="concepts">
          <p>문자가 아니라 <strong>'어느 지점'</strong>인지를 지정합니다. 0-3에서 배운 '검증' 모드에서 필수입니다.</p>
          <ul style={{ fontSize: '0.9rem', lineHeight: '1.7' }}>
            <li><code>^</code>: 문자열의 시작</li>
            <li><code>$</code>: 문자열의 끝</li>
            <li><code>\b</code>: <strong>단어 경계 (Word Boundary)</strong> - 영문자/숫자와 공백/특수문자 사이의 지점</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="re-anchors"
          initialHtml={consoleHtml}
          initialJs={`// 1. ^와 $를 이용한 정확한 검사 (Validation)
const exactHello = /^hello$/;
log("1. 정확히 hello인가?: " + exactHello.test("hello!")); // false (! 때문에)

// 2. \\b 단어 경계 예시
const wordPattern = /\\bcat\\b/g;
const text = "cat, category, bobcat, black-cat";
log("2. 독립된 cat만 찾기: " + text.match(wordPattern)); // ["cat", "cat"]
// category나 bobcat 안의 cat은 단어 경계가 아니라서 무시됨`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="4. 탐욕(Greedy) vs 게으름(Lazy)">
        <div className="concepts">
          <p>수량자(<code>+</code>, <code>*</code>)가 매칭을 할 때 **"어디까지 먹어치울 것인가"**에 대한 성격 차이입니다.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div style={{ padding: '15px', background: '#fffbeb', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <strong style={{ color: '#b45309' }}>🦁 탐욕적 매칭 (Greedy)</strong>
              <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>"보이는 건 다 내 거야! **최대한 길게** 매칭할래!"</p>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '20px' }}>
                <li>기본 동작: <code>+</code>, <code>*</code></li>
                <li>예: <code>/&lt;.+&gt;/</code></li>
                <li>문자열 전체를 훑고, 가장 멀리 있는 <code>&gt;</code>까지 삼켜버립니다.</li>
              </ul>
            </div>
            <div style={{ padding: '15px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
              <strong style={{ color: '#0369a1' }}>🐢 게으른 매칭 (Lazy)</strong>
              <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>"난 하나만 있으면 돼. **가장 빨리 끝나는 곳**에서 멈출래!"</p>
              <ul style={{ fontSize: '0.82rem', paddingLeft: '20px' }}>
                <li>기호: <code>+?</code>, <code>*?</code> (뒤에 <strong>?</strong> 추가)</li>
                <li>예: <code>/&lt;.+?&gt;/</code></li>
                <li>가장 처음에 마주치는 <code>&gt;</code>를 보자마자 매칭을 완료합니다.</li>
              </ul>
            </div>
          </div>

          <div className="info-box success" style={{ marginTop: '15px' }}>
            <strong>� 한 단계씩 뜯어보기 (Step-by-step Parsing)</strong>
            <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>대상 문자열: <code>{`"<a><b>"`}</code></p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.82rem' }}>
              <div style={{ padding: '10px', background: 'white', borderRadius: '4px' }}>
                <strong>1️⃣ 탐욕 모드 (<code>/&lt;.+&gt;/</code>)</strong>
                <ol style={{ paddingLeft: '15px', marginTop: '5px' }}>
                  <li><code>{'<'}</code> 를 찾음</li>
                  <li><code>.+</code> 가 <strong>문자열 끝까지</strong> 다 먹음 (<code>{'a><b>'}</code>)</li>
                  <li>마지막 <code>{'>'}</code> 가 조건에 맞는지 확인</li>
                  <li><strong>결과:</strong> <code>{`"<a><b>"`}</code> (한 덩어리)</li>
                </ol>
              </div>
              <div style={{ padding: '10px', background: 'white', borderRadius: '4px' }}>
                <strong>2️⃣ 게으른 모드 (<code>/&lt;.+?&gt;/</code>)</strong>
                <ol style={{ paddingLeft: '15px', marginTop: '5px' }}>
                  <li><code>{'<'}</code> 를 찾음</li>
                  <li><code>.+?</code> 가 글자 하나(<code>a</code>)만 먹고 <strong>눈치를 봄</strong></li>
                  <li>바로 다음에 <code>{'>'}</code> 가 나오는지 확인</li>
                  <li>나왔네! <strong>즉시 종료</strong></li>
                  <li><strong>결과:</strong> <code>{`"<a>"`}</code> (나머지 <code>{'<b>'}</code> 는 다음 매칭으로)</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="re-greedy"
          initialHtml={consoleHtml}
          initialJs={`const html = "<div>Hello World</div>";

// 1. 탐욕적 매칭 (Lion 모드)
// /<.+>/ --> < 부터 시작해서 가장 마지막에 있는 > 까지 다 먹음
const greedy = /<.+>/; 
log("🦁 탐욕 결과: " + html.match(greedy)[0]);

// 2. 게으른 매칭 (Turtle 모드)
// /<.+?>/ --> < 부터 시작해서 처음 만나는 > 에서 즉시 멈춤
const lazy = /<.+?>/g;
log("🐢 게으른 결과: " + JSON.stringify(html.match(lazy)));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="5. 논리적 그룹화와 데이터 추출 (Groups & Numbers)">
        <div className="concepts">
          <p><code>()</code>는 단순히 묶는 것 이상으로, 매칭된 내용을 **'기억'**했다가 나중에 꺼내 쓰는 강력한 기능을 가집니다.</p>
          
          <div className="info-box success" style={{ marginTop: '10px' }}>
            <strong>💡 그룹 번호 ($1, $2, ...)의 마법</strong>
            <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>
              정규식에서 괄호로 감싼 순서대로 1번, 2번... 번호가 매겨집니다. 이 번호를 <code>replace</code> 함수에서 <code>$1</code>, <code>$2</code> 처럼 호출할 수 있습니다.
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="re-groups"
          initialHtml={consoleHtml}
          initialJs={`// 1. 순서 바꾸기 (실무: 날짜 포맷팅)
// 20240204 -> 2024-02-04
const date = "20240204";
const format = date.replace(/(\\d{4})(\\d{2})(\\d{2})/, "$1-$2-$3");
log("1. 날짜 변환: " + format);

// 2. 특정 부분만 추출하기
const result = "Name: javascript, Type: AI".match(/Name: (\\w+), Type: (\\w+)/);
log("2. 전체 매칭: " + result[0]);
log("3. 첫 번째 그룹(javascript): " + result[1]);
log("4. 두 번째 그룹(AI): " + result[2]);

// 3. 비캡처 그룹 (?:) - 묶기는 하되 대기실($)에 안 넣음
const prices = "100$, 200$, 300$";
log("5. 단위 무시 검색: " + prices.match(/(?:\\d+)\\$/g));`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="6. 전후방 탐색 완벽 가이드 (Lookaround)">
        <div className="concepts">
          <p>조건은 확인하되 결과물엔 포함하지 않는 고급 테크닉입니다.</p>
          <table className="info-table" style={{ fontSize: '0.9rem' }}>
            <thead>
              <tr><th>종류</th><th>기호</th><th>의미</th></tr>
            </thead>
            <tbody>
              <tr><td>긍정 앞보임</td><td><code>(?=pattern)</code></td><td>뒤에 pattern이 오면 통과</td></tr>
              <tr><td>부정 앞보임</td><td><code>(?!pattern)</code></td><td>뒤에 pattern이 없으면 통과</td></tr>
              <tr><td>긍정 뒤보임</td><td><code>(?&lt;=pattern)</code></td><td>앞에 pattern이 있으면 통과</td></tr>
              <tr><td>부정 뒤보임</td><td><code>(?&lt;!pattern)</code></td><td>앞에 pattern이 없으면 통과</td></tr>
            </tbody>
          </table>
        </div>
        <LiveCodeEditor
          scopeId="re-lookaround"
          initialHtml={consoleHtml}
          initialJs={`const pricesText = "Price: $500, Discount: $50, Total: 450$";

// 1. $가 앞에 붙은 숫자만 (긍정 뒤보임)
const prices = /(?<=\\$)\\d+/g;
log("1. 달러 가격만: " + pricesText.match(prices));

// 2. $가 뒤에 붙지 않은 숫자만 (부정 앞보임)
const notAtEnd = /\\d+(?!\\$)/g;
log("2. 뒤에 $ 없는 숫자: " + pricesText.match(notAtEnd));

// 3. 응용: 컴마 찍기 (숫자 세 자리마다 뒤에 뒤에 숫자가 남았는지 확인)
const num = "1234567";
const withComma = num.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
log("3. 콤마 추가: " + withComma);`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="7. 실무 마스터: 정규식 뽀개기 (Pattern Breakdown)">
        <div className="concepts">
          <p>어려운 실전 패턴을 한 단위씩 뜯어보며 논리를 파헤칩니다.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="info-box success">
              <strong>🔑 초강력 비밀번호 규칙 분석</strong>
              <div style={{ marginTop: '10px', fontFamily: 'monospace', background: '#f8fafc', padding: '15px', borderRadius: '4px', border: '1px solid #e2e8f0', color: '#1e293b' }}>
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{'{8,}'}$/
              </div>
              <ul style={{ marginTop: '10px', fontSize: '0.82rem', lineHeight: '1.6' }}>
                <li><code>^...$</code> : 문자열 전체를 완벽히 검사 (Validation 모드)</li>
                <li><code>(?=.*[a-z])</code> : 소문자가 최소 하나 포함되어 있는지 미리 보기</li>
                <li><code>(?=.*[A-Z])</code> : 대문자가 최소 하나 포함되어 있는지 미리 보기</li>
                <li><code>(?=.*\\d)</code> : 숫자가 최소 하나 포함되어 있는지 미리 보기</li>
                <li><code>(?=.*[@$!%*?&])</code> : 특수문자가 최소 하나 포함되어 있는지 미리 보기</li>
                <li><code>[...]{'{8,}'}</code> : 위의 조건을 모두 만족하면서 총 8자 이상일 것!</li>
              </ul>
            </div>

            <div className="info-box success">
              <strong>📧 이메일 검증기 뜯어보기</strong>
              <div style={{ marginTop: '10px', fontFamily: 'monospace', background: '#f8fafc', padding: '15px', borderRadius: '4px', border: '1px solid #e2e8f0', color: '#1e293b' }}>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{'{2,4}'}$/
              </div>
              <ul style={{ marginTop: '10px', fontSize: '0.82rem', lineHeight: '1.6' }}>
                <li><code>[\w-\.]+</code> : 문자, 숫자, 하이픈(-), 점(.)이 최소 한 번 이상!</li>
                <li><code>@</code> : 골뱅이가 정확히 한 개 나타나야 함!</li>
                <li><code>([\w-]+\.)+</code> : (글자들 + 점) 형태가 한 번 이상 반복 (ex: naver., google.)</li>
                <li><code>[\w-]{'{2,4}'}</code> : 마지막은 2~4글자의 단어로 끝날 것 (ex: com, net, kr)</li>
              </ul>
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="re-master"
          initialHtml={consoleHtml}
          initialJs={`const pwRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
const emailRule = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;

log("1. 비번 검증: " + pwRule.test("Abc!12345")); // true
log("2. 이메일 검증: " + emailRule.test("javascript@google.com")); // true`}
        />
      </CollapsibleSection>

      <CollapsibleSection title="8. 정규식 플래그 (Flags)">
        <div className="concepts">
          <p>어떤 방식으로 검색할지 결정하는 **'검색 옵션'**입니다.</p>
          <ul style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
            <li><code>g</code> (Global): 일치하는 모든 내용을 다 찾습니다. (없으면 첫 번째만 반환)</li>
            <li><code>i</code> (Ignore Case): 대소문자를 구분하지 않습니다.</li>
            <li><code>m</code> (Multiline): <code>^</code>와 <code>$</code>가 각 행의 시작과 끝을 감지합니다.</li>
            <li><code>s</code> (Singleline / Dotall): 마침표(<code>.</code>)가 개행 문자(<code>\n</code>)까지 포함합니다.</li>
          </ul>
        </div>
        <LiveCodeEditor
          scopeId="re-flags"
          initialHtml={consoleHtml}
          initialJs={`const text = "Apple\\napple\\nAPPLE";

// 1. g와 i 플래그 조합
const allApples = /apple/gi;
log("1. 모든 사과(i, g): " + text.match(allApples));

// 2. m 플래그 (멀티라인)
const startWithA = /^apple/gim; // 대소문자 무시하고, 모든 줄의 시작에서 찾기
log("2. 각 줄의 시작 확인: " + text.match(startWithA));`}
        />
      </CollapsibleSection>

      <RelatedLinks
        links={[
          {
            path: "/js/advanced-js",
            title: "고급 자바스크립트",
            description: "커링과 클로저를 활용한 정규식 팩토리 만들기",
            icon: "🚀"
          },
          {
             path: "/js/regexp-quiz",
             title: "정규식 퀴즈 (Challenge)",
             description: "실전 문제로 내 실력을 테스트해보세요!",
             icon: "🏆"
          },
          {
             path: "/js/string-methods",
             title: "문자열 메서드",
             description: "정규식과 찰떡궁합인 String.prototype 학습",
             icon: "🧵"
          }
        ]}
      />
    </div>
  );
};

export default JsRegExpStudy;
