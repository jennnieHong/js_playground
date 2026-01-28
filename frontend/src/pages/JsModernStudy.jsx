import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

const JsModernStudy = () => {
    const consoleHtml = `
<div class="console-box">
  <div class="console-header">
    <span class="dot red"></span>
    <span class="dot yellow"></span>
    <span class="dot green"></span>
    <span class="console-title">Modern Features Console</span>
  </div>
  <div class="console-body">
    <div data-ref="logContent" class="log-content">> 기법을 선택하고 Apply를 누르세요.</div>
  </div>
</div>`;

    return (
        <div className="page-container">
            <PageHeader
                title="12. ES6+ 모던 기능 (ES6+ Features)"
                subtitle="최신 자바스크립트 트렌드: 코드를 더 짧고, 안전하고, 읽기 쉽게 만들어주는 현대적인 문법들을 빠르게 훑어봅니다."
            />

            <CollapsibleSection title="1. 옵셔널 체이닝: ?. " initiallyOpen={true}>
                <div className="concepts">
                    <p>중첩된 객체의 속성에 접근할 때, 중간 단계가 <code>null</code>이나 <code>undefined</code>여도 에러 없이 <code>undefined</code>를 반환하게 도와줍니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-modern-optional"
                    initialHtml={consoleHtml}
                    initialJs={`const user = {
  profile: {
    nickname: "Jenny"
  }
};

// 프로필이 없는 유저가 있다고 가정
const guest = {};

log("User's Nickname: " + user.profile?.nickname);
log("Guest's Nickname: " + guest.profile?.nickname); // 에러 안남!

try {
  log("Guest's manual call: " + guest.profile.nickname); // 여기서 터짐
} catch (e) {
  log("Direct access failed: " + e.message, true);
}`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="2. 널 병합 연산자: ?? ">
                <div className="concepts">
                    <p><code>null</code> 또는 <code>undefined</code>인 경우에만 기본값을 할당합니다. <code>0</code>이나 <code>""</code>(빈 문자열)을 유효한 값으로 취급하고 싶을 때 <code>||</code> 보다 안전합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-modern-nullish"
                    initialHtml={consoleHtml}
                    initialJs={`const settings = {
  opacity: 0,
  title: ""
};

// || 연산자는 0을 falsy로 취급해서 기본값을 써버림
const opacityOR = settings.opacity || 0.5;
// ?? 연산자는 오직 null/undefined만 체크함
const opacityNullish = settings.opacity ?? 0.5;

log("Opacity with ||: " + opacityOR);
log("Opacity with ??: " + opacityNullish); // 0이 보존됨`}
                />
            </CollapsibleSection>

            <CollapsibleSection title="3. 문자열 리터럴 & 기타">
                <div className="concepts">
                    <p>백틱(\`)을 활용한 템플릿 리터럴과 최신 객체 표현 등을 정리합니다.</p>
                </div>
                <LiveCodeEditor
                    scopeId="js-modern-others"
                    initialHtml={consoleHtml}
                    initialJs={`const name = "React";
const year = 2013;

// 1. Template Literals
log(\`[\${name}]은 \${year}년에 탄생했습니다.\`);

// 2. Multiline strings
log(\`이것은
여러 줄에 걸쳐서
작성할 수 있는 문자열입니다.\`);`}
                />
            </CollapsibleSection>
        </div>
    );
};

export default JsModernStudy;
