/**
 * FormStudy.jsx
 * 고급 폼 스타일링 및 사용자 정의 컨트롤 실습 페이지
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function FormStudy() {
  // 상태 관리: 입력 필드 스타일 전환 (modern, minimal, default)
  const [inputStyle, setInputStyle] = useState('modern');

  return (
    <div className="page-container">
      <PageHeader
        title="Form Styling"
        subtitle="Creating beautiful and accessible form controls"
      />

      {/* 섹션 1: 폼 스타일링 개요 */}
      <CollapsibleSection title="폼 스타일링 개요">
        <div className="section-description">
          <p>
            폼은 사용자와 직접 상호작용하는 핵심 UI입니다. 좋은 폼 디자인은:
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><strong>가독성</strong>: 명확한 라벨과 플레이스홀더</li>
            <li><strong>접근성</strong>: 키보드 네비게이션과 포커스 스타일</li>
            <li><strong>피드백</strong>: 유효성 검사와 에러 메시지</li>
            <li><strong>일관성</strong>: 통일된 스타일 시스템</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: 텍스트 입력 필드(Input) 스타일링 */}
      <CollapsibleSection title="Input 기본 스타일링">
        <p className="section-description">
          브라우저 기본 스타일을 재정의하여 일관된 디자인을 만듭니다.
        </p>

        <CssPropertyControls
          properties={[
            {
              name: 'Style',
              type: 'radio',
              value: inputStyle,
              onChange: setInputStyle,
              options: [
                { value: 'default', label: 'Default (Browser)' },
                { value: 'modern', label: 'Modern' },
                { value: 'minimal', label: 'Minimal' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          key="input-styling"
          scopeId="input-styling"
          previewHeight="250px"
          codeHeight="400px"
          initialCss={`${inputStyle === 'default' ? `
.input-demo {
  /* 브라우저 기본 스타일 */
}
` : inputStyle === 'modern' ? `
.input-demo {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #1e293b;
  transition: all 0.2s;
  outline: none;
}

.input-demo:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-demo::placeholder {
  color: #9ca3af;
}
` : `
.input-demo {
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #cbd5e1;
  background: transparent;
  color: #1e293b;
  transition: border-color 0.2s;
  outline: none;
}

.input-demo:focus {
  border-bottom-color: #3b82f6;
}

.input-demo::placeholder {
  color: #94a3b8;
}
`}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1e293b;
}`}
          currentCss={`${inputStyle === 'default' ? `
.input-demo {
  /* 브라우저 기본 스타일 */
}
` : inputStyle === 'modern' ? `
.input-demo {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #1e293b;
  transition: all 0.2s;
  outline: none;
}

.input-demo:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-demo::placeholder {
  color: #9ca3af;
}
` : `
.input-demo {
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #cbd5e1;
  background: transparent;
  color: #1e293b;
  transition: border-color 0.2s;
  outline: none;
}

.input-demo:focus {
  border-bottom-color: #3b82f6;
}

.input-demo::placeholder {
  color: #94a3b8;
}
`}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1e293b;
}`}
          initialHtml={`<div style="background: #f8fafc; padding: 2rem; border-radius: 8px;">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" class="input-demo" placeholder="Enter your name" />
  </div>
  
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" class="input-demo" placeholder="you@example.com" />
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Tip:</strong> 항상 <code>:focus</code> 스타일을 정의하세요 (접근성!)
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: 가상 요소를 활용한 커스텀 체크박스 */}
      <CollapsibleSection title="Custom Checkbox">
        <p className="section-description">
          브라우저 기본 체크박스를 숨기고 CSS로 완전히 커스터마이징합니다.
        </p>

        <LiveCodeEditor
          key="custom-checkbox"
          scopeId="custom-checkbox"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`/* 기본 체크박스 숨기기 */
.custom-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin: 0.75rem 0;
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* 커스텀 체크박스 */
.custom-checkbox .checkmark {
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  background: #ffffff;
  margin-right: 0.75rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

/* Hover 효과 */
.custom-checkbox:hover .checkmark {
  border-color: #3b82f6;
}

/* 체크된 상태 */
.custom-checkbox input:checked ~ .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

/* 체크 아이콘 (절대 위치로 중앙 정렬) */
.custom-checkbox input:checked ~ .checkmark::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  line-height: 1;
}

.custom-checkbox .label-text {
  color: #1e293b;
  font-weight: 500;
}`}
          initialHtml={`<div style="background: #ffffff; padding: 2rem; border-radius: 8px;">
  <h3 style="margin: 0 0 1rem 0; color: #1e293b;">Select your preferences:</h3>
  
  <label class="custom-checkbox">
    <input type="checkbox" checked />
    <span class="checkmark"></span>
    <span class="label-text">Subscribe to newsletter</span>
  </label>
  
  <label class="custom-checkbox">
    <input type="checkbox" />
    <span class="checkmark"></span>
    <span class="label-text">Enable notifications</span>
  </label>
  
  <label class="custom-checkbox">
    <input type="checkbox" />
    <span class="checkmark"></span>
    <span class="label-text">Accept terms and conditions</span>
  </label>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>핵심:</strong> 실제 input을 숨기고(opacity: 0), 가상 요소로 스타일링
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: 가상 요소를 활용한 커스텀 라디오 버튼 */}
      <CollapsibleSection title="Custom Radio Buttons">
        <p className="section-description">
          라디오 버튼도 체크박스와 유사한 방식으로 커스터마이징합니다.
        </p>

        <LiveCodeEditor
          key="custom-radio"
          scopeId="custom-radio"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.custom-radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin: 0.75rem 1rem 0.75rem 0;
}

.custom-radio input[type="radio"] {
  position: absolute;
  opacity: 0;
}

/* 커스텀 라디오 (원형) */
.custom-radio .radio-mark {
  width: 22px;
  height: 22px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  background: #ffffff;
  margin-right: 0.5rem;
  transition: all 0.2s;
  position: relative;
}

.custom-radio:hover .radio-mark {
  border-color: #3b82f6;
}

/* 선택된 상태 */
.custom-radio input:checked ~ .radio-mark {
  border-color: #3b82f6;
}

/* 내부 점 */
.custom-radio input:checked ~ .radio-mark::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3b82f6;
}

.custom-radio .label-text {
  color: #1e293b;
  font-weight: 500;
}`}
          initialHtml={`<div style="background: #ffffff; padding: 2rem; border-radius: 8px;">
  <h3 style="margin: 0 0 1rem 0; color: #1e293b;">Choose a plan:</h3>
  
  <label class="custom-radio">
    <input type="radio" name="plan" value="free" checked />
    <span class="radio-mark"></span>
    <span class="label-text">Free</span>
  </label>
  
  <label class="custom-radio">
    <input type="radio" name="plan" value="pro" />
    <span class="radio-mark"></span>
    <span class="label-text">Pro</span>
  </label>
  
  <label class="custom-radio">
    <input type="radio" name="plan" value="enterprise" />
    <span class="radio-mark"></span>
    <span class="label-text">Enterprise</span>
  </label>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Tip:</strong> border-radius: 50%로 완벽한 원 만들기
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: 브라우저 기본 유효성 검사 상태 활용 */}
      <CollapsibleSection title="Form Validation States">
        <p className="section-description">
          <code>:valid</code>, <code>:invalid</code>, <code>:required</code> 의사 클래스로 실시간 유효성 피드백을 제공합니다.
        </p>

        <LiveCodeEditor
          key="validation-states"
          scopeId="validation-states"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.validated-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  color: #1e293b;
  transition: all 0.2s;
  outline: none;
}

.validated-input:focus {
  border-color: #3b82f6;
}

/* Valid 상태 (값이 입력되고 유효할 때) */
.validated-input:valid:not(:placeholder-shown) {
  border-color: #10b981;
  background-color: #f0fdf4;
}

/* Invalid 상태 */
.validated-input:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.form-field {
  margin-bottom: 1.5rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1e293b;
}

.required::after {
  content: " *";
  color: #ef4444;
}`}
          initialHtml={`<div style="background: #f8fafc; padding: 2rem; border-radius: 8px;">
  <div class="form-field">
    <label for="email2" class="required">Email</label>
    <input 
      type="email" 
      id="email2" 
      class="validated-input" 
      placeholder="you@example.com"
      required 
    />
  </div>
  
  <div class="form-field">
    <label for="phone">Phone (10 digits)</label>
    <input 
      type="tel" 
      id="phone" 
      class="validated-input" 
      placeholder="1234567890"
      pattern="[0-9]{10}"
    />
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Try it:</strong> 이메일을 입력하고 @를 빼먹으면 빨간색으로 변합니다!<br/>
  <code>:not(:placeholder-shown)</code>으로 빈 입력시 스타일 방지
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 6: 플레이스홀더를 활용한 플로팅 라벨 기법 */}
      <CollapsibleSection title="Floating Labels">
        <p className="section-description">
          사용자가 입력을 시작하면 라벨이 위로 올라가는 현대적인 디자인 패턴입니다. <code>:placeholder-shown</code> 의사 클래스를 활용합니다.
        </p>

        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#ecfdf5', borderRadius: '12px', border: '2px solid #10b981' }}>
          <h4 style={{ marginTop: 0, color: '#065f46' }}>💡 중요: Floating Labels도 실제 &lt;label&gt; 태그를 사용합니다!</h4>
          <p style={{ margin: '0.5rem 0', color: '#047857', lineHeight: '1.8' }}>
            시각적으로는 CSS로 위치를 움직이지만, <strong>HTML은 여전히 올바른 label 태그</strong>를 사용합니다.
            이것이 중요한 이유:
          </p>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.5rem', color: '#047857', lineHeight: '1.8' }}>
            <li><strong>클릭 영역 확대</strong>: label을 클릭하면 자동으로 input에 포커스</li>
            <li><strong>접근성</strong>: 스크린 리더가 input과 label의 관계를 자동 인식</li>
            <li><strong>for 속성 연결</strong>: <code>for="input-id"</code>로 input과 의미적 연결</li>
            <li><strong>시맨틱 HTML</strong>: 브라우저와 검색엔진이 폼 구조를 정확히 이해</li>
          </ul>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff', borderRadius: '8px', fontSize: '0.9rem' }}>
            <strong style={{ color: '#065f46' }}>✅ 올바른 방법 (Floating Labels)</strong>
            <pre style={{ margin: '0.5rem 0 0', color: '#1e293b', background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', overflow: 'auto' }}>
{`<div class="floating-group">
  <input id="email" placeholder=" " />
  <label for="email">Email</label> {/* label 태그 사용! */}
</div>`}
            </pre>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <strong style={{ color: '#dc2626' }}>❌ 나쁜 방법 (div/span 사용)</strong>
              <pre style={{ margin: '0.5rem 0 0', color: '#1e293b', background: '#fef2f2', padding: '0.75rem', borderRadius: '6px', overflow: 'auto' }}>
{`<div class="floating-group">
  <input id="email" placeholder=" " />
  <div class="fake-label">Email</div> {/* 접근성 0점! */}
</div>`}
              </pre>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#991b1b' }}>
                → 클릭해도 포커스 안 됨, 스크린 리더가 관계를 모름
              </p>
            </div>
          </div>
        </div>

        <LiveCodeEditor
          key="floating-labels"
          scopeId="floating-labels"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.floating-group {
  position: relative;
  margin-top: 1.5rem;
}

.floating-input {
  width: 100%;
  padding: 0.75rem 0.25rem;
  font-size: 1rem;
  border: none;
  border-bottom: 2px solid #e2e8f0;
  background: transparent;
  outline: none;
  transition: all 0.2s;
}

.floating-label {
  position: absolute;
  top: 0.75rem;
  left: 0.25rem;
  color: #94a3b8;
  pointer-events: none;
  transition: all 0.2s ease;
}

/* 포커스되거나 플레이스홀더가 보이지 않을 때(즉, 입력값이 있을 때) 라벨 이동 */
.floating-input:focus ~ .floating-label,
.floating-input:not(:placeholder-shown) ~ .floating-label {
  top: -1rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: #3b82f6;
}

.floating-input:focus {
  border-bottom-color: #3b82f6;
}
`}
          initialHtml={`<div style="background: white; padding: 2rem; border-radius: 8px;">
  <div class="floating-group">
    <input type="text" id="floating-email" class="floating-input" placeholder=" " />
    <label for="floating-email" class="floating-label">Email Address</label>
  </div>
  
  <div class="floating-group">
    <input type="password" id="floating-pass" class="floating-input" placeholder=" " />
    <label for="floating-pass" class="floating-label">Password</label>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #fef3c7; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Note:</strong> <code>placeholder=" "</code> (공백 하나)를 넣어야 <code>:placeholder-shown</code>이 정상 동작합니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 7: Dropdown 및 Range 슬라이더 커스터마이징 */}
      <CollapsibleSection title="Custom Select & Range">
        <p className="section-description">
          기본 브라우저 스타일링이 어려운 드롭다운과 슬라이더를 커스터마이징합니다.
        </p>

        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
          <h4 style={{ marginTop: 0, color: '#92400e' }}>🤔 중요한 질문: &lt;select&gt; 태그 vs &lt;div&gt;로 만든 커스텀 Select?</h4>
          
          <p style={{ margin: '0.5rem 0', color: '#78350f', lineHeight: '1.8' }}>
            <strong>현실:</strong> 실무에서 &lt;div&gt;로 만든 커스텀 Select를 많이 사용합니다. 하지만 이건 <strong>마지막 수단</strong>이어야 합니다!
          </p>

          <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse', fontSize: '0.9rem', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f59e0b', color: '#fff' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', width: '20%' }}>방식</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', width: '40%' }}>✅ 장점</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', width: '40%' }}>❌ 단점</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #fef3c7' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#92400e' }}>
                  Native<br/>&lt;select&gt;
                </td>
                <td style={{ padding: '0.75rem', color: '#065f46' }}>
                  • 접근성 완벽 (키보드, 스크린 리더)<br/>
                  • 모바일 최적화 (네이티브 UI)<br/>
                  • form 데이터 자동 전송<br/>
                  • 성능 우수<br/>
                  • 유지보수 쉬움
                </td>
                <td style={{ padding: '0.75rem', color: '#991b1b' }}>
                  • 스타일링 제한적<br/>
                  • 브라우저마다 다름<br/>
                  • option 태그 스타일링 거의 불가<br/>
                  • 커스텀 아이콘/이미지 어려움
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem', fontWeight: 'bold', color: '#92400e' }}>
                  Custom<br/>&lt;div&gt;
                </td>
                <td style={{ padding: '0.75rem', color: '#065f46' }}>
                  • 완전한 디자인 자유도<br/>
                  • 검색, 멀티셀렉트 등 고급 기능<br/>
                  • 일관된 UI (모든 브라우저)<br/>
                  • 아이콘, 이미지 자유롭게 추가
                </td>
                <td style={{ padding: '0.75rem', color: '#991b1b' }}>
                  • <strong>접근성 구현 복잡</strong><br/>
                  • 키보드 네비게이션 직접 구현<br/>
                  • 모바일에서 UX 나쁨<br/>
                  • form 연동 수동 처리<br/>
                  • 코드 유지보수 부담<br/>
                  • 스크린 리더 대응 필요
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#dcfce7', borderRadius: '8px', border: '1px solid #86efac' }}>
            <h5 style={{ marginTop: 0, color: '#166534' }}>💡 실무 권장사항</h5>
            <ol style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#166534', lineHeight: '1.8' }}>
              <li><strong>1순위: Native &lt;select&gt; + CSS 스타일링</strong> (appearance: none 활용)</li>
              <li><strong>2순위: 믿을만한 라이브러리 사용</strong> (react-select, headlessui 등)</li>
              <li><strong>최후: 직접 구현</strong> (접근성 전문가와 협업 필수)</li>
            </ol>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#fee2e2', borderRadius: '8px', border: '1px solid #fca5a5' }}>
            <h5 style={{ marginTop: 0, color: '#991b1b' }}>⚠️ 커스텀 Select 직접 구현 시 필수 체크리스트</h5>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem', color: '#991b1b', lineHeight: '1.8', fontSize: '0.9rem' }}>
              <li>✓ 키보드 네비게이션 (↑↓, Enter, Esc, Tab)</li>
              <li>✓ ARIA 속성 (role="combobox", aria-expanded, aria-activedescendant)</li>
              <li>✓ 스크린 리더 테스트 (NVDA, JAWS, VoiceOver)</li>
              <li>✓ 모바일 터치 최적화</li>
              <li>✓ form 데이터 전송 (hidden input 사용)</li>
              <li>✓ 포커스 관리 (외부 클릭 시 닫기)</li>
              <li>✓ 검색 기능 (option이 많을 때)</li>
            </ul>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', fontWeight: 'bold' }}>
              → 이 모든 걸 직접 구현하는 것보다 <strong>검증된 라이브러리를 쓰는 게 99% 더 나은 선택</strong>입니다!
            </p>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff', borderRadius: '8px', fontSize: '0.9rem' }}>
            <strong style={{ color: '#92400e' }}>🎯 결론</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#78350f', lineHeight: '1.8' }}>
              "브라우저마다 스타일이 다르다"는 이유로 바로 커스텀 구현으로 가지 마세요!<br/>
              먼저 <code>appearance: none</code>으로 최대한 스타일링 시도 → 안 되면 라이브러리 검토 → 정말 필요시에만 직접 구현
            </p>
          </div>
        </div>

        <LiveCodeEditor
          key="field-customization"
          scopeId="field-customization"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.custom-select {
  appearance: none; /* 브라우저 기본 화살표 제거 */
  width: 100%;
  padding: 0.75rem 1rem;
  background: #ffffff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 1rem center;
  background-size: 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
}

.custom-range {
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 5px;
  appearance: none;
  outline: none;
}

.custom-range::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.custom-range::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}`}
          initialHtml={`<div style="background: white; padding: 2rem; border-radius: 8px;">
  <div style="margin-bottom: 2rem;">
    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1e293b;">Custom Select</label>
    <select class="custom-select">
      <option>Basic Plan</option>
      <option>Business Plan</option>
      <option>Enterprise Plan</option>
    </select>
  </div>
  
  <div>
    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: #1e293b;">Custom Range (Slider)</label>
    <input type="range" class="custom-range" min="0" max="100" value="50" />
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 8: 종합 실습 - 현대적인 로그인 폼 구현 */}
      <CollapsibleSection title="실전: 현대적인 로그인 폼 구현">
        <p className="section-description">
          지금까지 배운 모든 기술을 종합한 완성도 높은 폼 예제입니다.
        </p>

        <LiveCodeEditor
          key="login-form"
          scopeId="login-form"
          previewHeight="450px"
          codeHeight="550px"
          initialCss={`.login-form {
  max-width: 400px;
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.login-form h2 {
  margin: 0 0 1.5rem 0;
  color: #1e293b;
  text-align: center;
}

.form-control {
  margin-bottom: 1.25rem;
}

.form-control label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
}

.form-control input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  outline: none;
}

.form-control input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

.submit-btn:active {
  transform: translateY(0);
}`}
          initialHtml={`<form class="login-form">
  <h2>Welcome Back</h2>
  
  <div class="form-control">
    <label for="login-email">Email</label>
    <input 
      type="email" 
      id="login-email" 
      placeholder="Enter your email"
      required
    />
  </div>
  
  <div class="form-control">
    <label for="password">Password</label>
    <input 
      type="password" 
      id="password" 
      placeholder="Enter your password"
      required
    />
  </div>
  
  <button type="submit" class="submit-btn">
    Sign In
  </button>
</form>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Production-ready!</strong> 이 패턴을 실제 프로젝트에 바로 사용할 수 있습니다.
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default FormStudy;
