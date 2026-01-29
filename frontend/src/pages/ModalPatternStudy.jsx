/**
 * ModalPatternStudy 페이지 컴포넌트
 * 팝업/모달 열고 닫는 효과와 "보임 상태"와 "존재 상태" 분리의 중요성을 학습하는 페이지입니다.
 * 주요 개념: display vs visibility vs opacity, 애니메이션 가능 여부, 올바른 모달 패턴
 */
import {  } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function ModalPatternStudy() {

  return (
    <div className="page-container">
      <PageHeader
        title="Modal & Popup 패턴"
        subtitle="팝업 열고 닫기: 보임 상태와 존재 상태 분리의 기술"
      />

      {/* 섹션 0: .show 클래스 토글 원리 */}
      <CollapsibleSection title="🔧 기초: .show 클래스는 어떻게 작동하는가?">
        <div className="section-description">
          <p>
            모달을 열고 닫을 때 <code>.show</code> 클래스를 추가/제거합니다.
            이 원리를 이해하면 CSS만으로 다양한 상태 변화를 구현할 수 있습니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
            <h4 style={{ marginTop: 0, color: '#fbbf24' }}>💡 핵심 원리: CSS 선택자 우선순위</h4>
            <pre style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.9rem' }}>
{`/* 1. 기본 상태 (항상 적용) */
.modal {
  opacity: 0;              /* 투명 */
  visibility: hidden;      /* 클릭 불가 */
}

/* 2. .show가 추가되면 이 규칙이 "덮어씀" */
.modal.show {             /* .modal보다 더 구체적! */
  opacity: 1;              /* 불투명 */
  visibility: visible;     /* 클릭 가능 */
}`}
            </pre>
            <p style={{ marginTop: '1rem', marginBottom: 0, color: '#94a3b8', lineHeight: '1.7' }}>
              <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>.modal.show</code>는 
              <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>.modal</code>보다 
              더 <strong>구체적인 선택자</strong>이므로 우선 적용됩니다!
            </p>
          </div>
          
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #0ea5e9' }}>
              <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>📦 HTML 상태 변화</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- 닫힘 상태 -->
<div class="modal">
  ...
</div>

<!-- 열림 상태 (show 추가됨) -->
<div class="modal show">
  ...
</div>`}
              </pre>
            </div>

            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '1px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>⚡ JavaScript로 토글</h4>
              <pre style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.85rem' }}>
{`const modal = document.querySelector('.modal');

// 열기: show 클래스 추가
modal.classList.add('show');

// 닫기: show 클래스 제거
modal.classList.remove('show');

// 토글: 있으면 제거, 없으면 추가
modal.classList.toggle('show');`}
              </pre>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>🎯 요약</strong>
            <ol style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.8' }}>
              <li><strong>JavaScript</strong>가 <code>classList.add('show')</code>를 실행</li>
              <li>HTML 요소에 <code>show</code> 클래스가 추가됨</li>
              <li><strong>CSS</strong>에서 <code>.modal.show</code> 규칙이 활성화됨</li>
              <li><code>transition</code> 덕분에 부드럽게 변화</li>
            </ol>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="show-class-demo"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.box-demo {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.color-box {
  width: 100px;
  height: 100px;
  background: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  
  /* 기본 상태 */
  opacity: 0.3;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

/* .show가 추가되면 이 스타일이 적용됨! */
.color-box.show {
  opacity: 1;
  transform: scale(1);
  background: #10b981;
}

.toggle-btn {
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}`}
          initialHtml={`<div class="box-demo">
  <div class="color-box" id="demoBox">Box</div>
  
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <button class="toggle-btn" onclick="document.getElementById('demoBox').classList.add('show')">
      classList.add('show')
    </button>
    <button class="toggle-btn" onclick="document.getElementById('demoBox').classList.remove('show')">
      classList.remove('show')
    </button>
    <button class="toggle-btn" onclick="document.getElementById('demoBox').classList.toggle('show')">
      classList.toggle('show')
    </button>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #d1fae5; border-radius: 8px; font-size: 0.9rem; color: #065f46; line-height: 1.7;">
  <strong>🧪 직접 해보세요!</strong><br/>
  • <strong>add:</strong> .show 클래스 추가 → 박스가 커지고 초록색으로 변함<br/>
  • <strong>remove:</strong> .show 클래스 제거 → 원래 상태로 돌아감<br/>
  • <strong>toggle:</strong> 있으면 제거, 없으면 추가
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 1.5: 완전한 모달 패턴 - 3가지 속성의 조합 */}
      <CollapsibleSection title="🏆 완전한 모달 패턴: 3가지 속성 조합">
        <div className="section-description">
          <p>
            실무에서 사용하는 <strong>가장 완전한 모달 패턴</strong>입니다.
            각 속성이 어떤 역할을 하는지 이해하면 모달을 완벽하게 제어할 수 있습니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
            <h4 style={{ marginTop: 0, color: '#fbbf24' }}>💎 프로덕션 모달 CSS 패턴</h4>
            <pre style={{ marginTop: '1rem', background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.9rem' }}>
{`.modal {
  opacity: 0;              /* 1️⃣ 시각적으로 투명하게 */
  visibility: hidden;      /* 2️⃣ 상호작용 비활성화 + 접근성 */
  pointer-events: none;    /* 3️⃣ 클릭 완전 차단 (이중 보험) */
  transition: opacity 0.3s, visibility 0.3s;
}

.modal.is-open {
  opacity: 1;              /* 1️⃣ 시각적으로 보이게 */
  visibility: visible;     /* 2️⃣ 상호작용 활성화 */
  pointer-events: auto;    /* 3️⃣ 클릭 허용 */
}`}
            </pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#0891b2', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>1</span>
                opacity: 0/1
              </h4>
              <p style={{ fontWeight: '600', color: '#0e7490', marginBottom: '0.5rem' }}>역할: 시각적 표시</p>
              <ul style={{ marginBottom: 0, color: '#0e7490', lineHeight: '1.8', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                <li><strong>0:</strong> 완전히 투명 (안 보임)</li>
                <li><strong>1:</strong> 완전히 불투명 (보임)</li>
                <li>✅ <strong>transition으로 부드럽게 변화!</strong></li>
                <li>⚠️ 단독 사용 시 투명해도 클릭 가능</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h4 style={{ marginTop: 0, color: '#b45309', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#b45309', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</span>
                visibility: hidden/visible
              </h4>
              <p style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.5rem' }}>역할: 존재 + 접근성</p>
              <ul style={{ marginBottom: 0, color: '#92400e', lineHeight: '1.8', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                <li><strong>hidden:</strong> 클릭 불가, 포커스 불가</li>
                <li><strong>visible:</strong> 정상적으로 상호작용 가능</li>
                <li>✅ 스크린 리더가 hidden 요소 무시</li>
                <li>✅ Tab 키로 포커스 이동 차단</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '12px', border: '2px solid #22c55e' }}>
              <h4 style={{ marginTop: 0, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ background: '#16a34a', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>3</span>
                pointer-events: none/auto
              </h4>
              <p style={{ fontWeight: '600', color: '#15803d', marginBottom: '0.5rem' }}>역할: 클릭 제어 (이중 보험)</p>
              <ul style={{ marginBottom: 0, color: '#15803d', lineHeight: '1.8', fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                <li><strong>none:</strong> 마우스/터치 이벤트 무시</li>
                <li><strong>auto:</strong> 정상적으로 클릭 가능</li>
                <li>✅ visibility와 함께 사용하면 완벽한 차단</li>
                <li>✅ 애니메이션 중에도 클릭 방지</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca' }}>
            <strong style={{ color: '#b91c1c' }}>🤔 왜 pointer-events까지 필요한가요?</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#991b1b', lineHeight: '1.7' }}>
              <code>visibility</code>가 있어도 <strong>애니메이션 중</strong>에 문제가 생길 수 있습니다:<br />
              모달이 사라지는 0.3초 동안 <code>visibility</code>는 아직 <code>visible</code>일 수 있어서 클릭될 수 있습니다.<br />
              <code>pointer-events: none</code>은 이 "전환 중" 시간에도 <strong>확실하게 클릭을 차단</strong>합니다.
            </p>
          </div>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#d1fae5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>💡 .is-open vs .show</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#047857', lineHeight: '1.7' }}>
              클래스 이름은 자유롭게 지을 수 있습니다! <code>.show</code>, <code>.is-open</code>, <code>.active</code>, <code>.visible</code> 등 원하는 이름을 사용하세요.<br />
              중요한 것은 <strong>"기본 상태"와 "활성 상태"를 분리</strong>하는 패턴입니다.
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="complete-modal-pattern"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.demo-container {
  position: relative;
  height: 300px;
  background: #f8fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🏆 완전한 모달 패턴 */
.modal {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  
  /* 3가지 속성 조합! */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal.is-open {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.modal-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.modal.is-open .modal-box {
  transform: scale(1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary { background: #3b82f6; color: white; }
.btn-secondary { background: #e2e8f0; color: #1e293b; }`}
          initialHtml={`<div class="demo-container">
  <button class="btn btn-primary" onclick="document.querySelector('.modal').classList.add('is-open')">
    모달 열기 (is-open 추가)
  </button>
  
  <div class="modal" onclick="if(event.target === this) this.classList.remove('is-open')">
    <div class="modal-box">
      <h3 style="margin: 0 0 1rem;">🏆 완전한 패턴!</h3>
      <p style="margin: 0 0 1rem; color: #64748b;">opacity + visibility + pointer-events</p>
      <button class="btn btn-secondary" onclick="document.querySelector('.modal').classList.remove('is-open')">
        닫기 (is-open 제거)
      </button>
    </div>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; font-size: 0.9rem; color: #075985; line-height: 1.7;">
  <strong>🧪 테스트:</strong> 모달이 닫히는 애니메이션 중에 빠르게 클릭해보세요!<br/>
  → pointer-events: none 덕분에 전환 중에도 클릭이 차단됩니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 2: 핵심 개념 - 3가지 숨기기 방법 비교 */}
      <CollapsibleSection title="🎯 핵심 개념: 3가지 숨기기 방법">
        <div className="section-description">
          <p>
            CSS에서 요소를 숨기는 방법은 크게 3가지가 있으며, 각각 동작이 다릅니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>❌ display: none</h4>
              <ul style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li><strong>존재 자체를 제거</strong> (DOM에서 공간 차지 안 함)</li>
                <li>스크린 리더도 읽지 않음</li>
                <li><strong>⚠️ 애니메이션 불가능!</strong></li>
                <li>none → block 전환 시 즉시 나타남</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff7ed', borderRadius: '12px', border: '2px solid #fed7aa' }}>
              <h4 style={{ marginTop: 0, color: '#c2410c' }}>⚠️ visibility: hidden</h4>
              <ul style={{ marginBottom: 0, color: '#9a3412', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li><strong>보이지만 않음</strong> (공간은 그대로 차지)</li>
                <li>스크린 리더가 읽지 않음</li>
                <li>transition 가능하지만 단계적 전환</li>
                <li>자식 요소에 visible 지정 가능</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #a5f3fc' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>✅ opacity: 0</h4>
              <ul style={{ marginBottom: 0, color: '#0e7490', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li><strong>완전히 투명</strong> (공간 차지, 클릭 가능!)</li>
                <li>스크린 리더가 읽음</li>
                <li><strong>✅ 부드러운 애니메이션 가능!</strong></li>
                <li>pointer-events: none과 함께 사용 필요</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>💡 핵심 문제</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7' }}>
              <code>display: none</code>은 <strong>애니메이션이 불가능</strong>합니다!<br />
              모달을 부드럽게 페이드 인/아웃 하려면 <code>opacity</code>와 <code>visibility</code>를 조합해야 합니다.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: 잘못된 패턴 - display만 사용 */}
      <CollapsibleSection title="❌ 잘못된 패턴: display만 사용">
        <div className="section-description">
          <p>
            가장 흔한 실수입니다. <code>display: none</code>과 <code>display: block</code>을 토글하면
            애니메이션 없이 즉시 나타나고 사라집니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="display-only-modal"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`.demo-container {
  position: relative;
  height: 300px;
  background: #f8fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  
  /* ❌ display로 숨김 - 애니메이션 불가! */
  display: none;
  
  /* 아래 transition은 작동하지 않음 */
  transition: opacity 0.3s ease;
}

.modal-overlay.show {
  display: flex;
}

.modal-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.1s;
}

.btn:active { transform: scale(0.95); }

.btn-primary { background: #3b82f6; color: white; }
.btn-secondary { background: #e2e8f0; color: #1e293b; }`}
          initialHtml={`<div class="demo-container">
  <button class="btn btn-primary" onclick="document.getElementById('displayOnlyModal').classList.toggle('show')">
    모달 열기
  </button>
  
  <div class="modal-overlay" id="displayOnlyModal">
    <div class="modal-box">
      <h3 style="margin: 0 0 1rem;">❌ 즉시 나타남!</h3>
      <p style="margin: 0 0 1rem; color: #64748b;">애니메이션이 없습니다</p>
      <button class="btn btn-secondary" onclick="document.getElementById('displayOnlyModal').classList.remove('show')">
        닫기
      </button>
    </div>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; font-size: 0.9rem; color: #991b1b; line-height: 1.7;">
  <strong>❌ 문제점:</strong><br/>
  • display: none/flex 전환은 <strong>즉시</strong> 일어납니다<br/>
  • transition: opacity를 넣어도 <strong>작동하지 않습니다</strong><br/>
  • 사용자 경험이 딱딱하고 부자연스럽습니다
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: 올바른 패턴 - 보임과 존재 분리 */}
      <CollapsibleSection title="✅ 올바른 패턴: 보임 상태와 존재 상태 분리">
        <div className="section-description">
          <p>
            <strong>핵심 아이디어:</strong> "요소가 존재하는지"와 "요소가 보이는지"를 분리합니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #0ea5e9' }}>
              <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>📦 존재 상태 (Existence)</h4>
              <p style={{ marginBottom: 0, color: '#075985', lineHeight: '1.7' }}>
                <code>visibility: visible/hidden</code><br />
                요소가 레이아웃에 존재하는지 결정<br />
                hidden일 때 공간은 차지하지만 클릭 불가
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '1px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>👁️ 보임 상태 (Visibility)</h4>
              <p style={{ marginBottom: 0, color: '#0e7490', lineHeight: '1.7' }}>
                <code>opacity: 0/1</code><br />
                요소의 투명도 결정 (애니메이션 가능!)<br />
                transform과 함께 부드러운 전환 효과
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#d1fae5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>🎯 올바른 조합</strong>
            <pre style={{ marginTop: '0.5rem', marginBottom: 0, background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.85rem' }}>
{`/* 숨김 상태 */
.modal {
  opacity: 0;                    /* 투명하게 */
  visibility: hidden;            /* 클릭 불가능하게 */
  transition: opacity 0.3s, visibility 0.3s;
}

/* 보임 상태 */
.modal.show {
  opacity: 1;                    /* 불투명하게 */
  visibility: visible;           /* 클릭 가능하게 */
}`}
            </pre>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="correct-modal"
          previewHeight="350px"
          codeHeight="500px"
          initialCss={`.demo-container {
  position: relative;
  height: 300px;
  background: #f8fafc;
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  
  /* ✅ 올바른 패턴: opacity + visibility */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}

.modal-box {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
  
  /* 모달 박스도 애니메이션 추가 */
  transform: scale(0.9) translateY(20px);
  transition: transform 0.3s ease;
}

.modal-overlay.show .modal-box {
  transform: scale(1) translateY(0);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.1s;
}

.btn:active { transform: scale(0.95); }

.btn-primary { background: #3b82f6; color: white; }
.btn-secondary { background: #e2e8f0; color: #1e293b; }`}
          initialHtml={`<div class="demo-container">
  <button class="btn btn-primary" onclick="document.getElementById('correctModal').classList.add('show')">
    모달 열기
  </button>
  
  <div class="modal-overlay" id="correctModal" onclick="if(event.target === this) this.classList.remove('show')">
    <div class="modal-box">
      <h3 style="margin: 0 0 1rem;">✅ 부드러운 애니메이션!</h3>
      <p style="margin: 0 0 1rem; color: #64748b;">페이드 인 + 스케일 효과</p>
      <button class="btn btn-secondary" onclick="document.getElementById('correctModal').classList.remove('show')">
        닫기
      </button>
    </div>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #d1fae5; border-radius: 8px; font-size: 0.9rem; color: #065f46; line-height: 1.7;">
  <strong>✅ 올바른 패턴:</strong><br/>
  • opacity: 0 → 1로 <strong>부드럽게 페이드</strong><br/>
  • visibility: hidden으로 숨겨진 상태에서 <strong>클릭 방지</strong><br/>
  • transform: scale()로 <strong>줌 효과</strong> 추가<br/>
  • 오버레이 클릭 시 닫히는 기능도 구현!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: visibility가 필요한 이유 */}
      <CollapsibleSection title="🤔 왜 visibility가 필요한가요? (opacity만으론 부족!)">
        <div className="section-description">
          <p>
            <code>opacity: 0</code>만 사용하면 <strong>보이지 않지만 여전히 클릭됩니다!</strong><br />
            이 문제를 해결하기 위해 <code>visibility: hidden</code>을 함께 사용해야 합니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca' }}>
            <strong style={{ color: '#b91c1c' }}>⚠️ opacity: 0 만 사용한 경우</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#991b1b', lineHeight: '1.8' }}>
              <li>모달이 안 보이지만 <strong>버튼을 클릭할 수 있음</strong></li>
              <li>모달 뒤의 콘텐츠를 <strong>클릭할 수 없음</strong></li>
              <li>탭(Tab)으로 모달 내부 요소에 <strong>포커스 가능</strong></li>
            </ul>
          </div>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#d1fae5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>✅ opacity + visibility 조합</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#047857', lineHeight: '1.8' }}>
              <li>visibility: hidden은 요소를 <strong>완전히 비활성화</strong></li>
              <li>클릭 불가, 포커스 불가, 스크린 리더 무시</li>
              <li>하지만 transition과 함께 <strong>애니메이션 가능!</strong></li>
            </ul>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="opacity-only-problem"
          previewHeight="300px"
          codeHeight="350px"
          initialCss={`.demo-row {
  display: flex;
  gap: 2rem;
  padding: 1rem;
}

.demo-box {
  flex: 1;
  height: 150px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hidden-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

/* opacity만 사용 - 클릭 가능! */
.opacity-only {
  background: #ef4444;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
}

.opacity-only:hover {
  opacity: 0;
}

/* opacity + visibility - 클릭 불가 */
.opacity-visibility {
  background: #10b981;
  color: white;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

.demo-box:hover .opacity-visibility {
  opacity: 1;
  visibility: visible;
}`}
          initialHtml={`<div class="demo-row">
  <div class="demo-box">
    <p style="margin: 0 0 1rem; font-size: 0.9rem; color: #64748b;">opacity: 0 만 사용</p>
    <button class="hidden-button opacity-only" onclick="alert('❌ 보이지 않는데 클릭됨!')">
      클릭해보세요
    </button>
    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #ef4444;">↑ 빈 공간을 클릭해보세요!</p>
  </div>
  
  <div class="demo-box">
    <p style="margin: 0 0 1rem; font-size: 0.9rem; color: #64748b;">opacity + visibility</p>
    <button class="hidden-button opacity-visibility" onclick="alert('✅ 마우스 올려야 클릭 가능!')">
      호버하면 보임
    </button>
    <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #10b981;">↑ 박스에 마우스 올려보세요</p>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; font-size: 0.9rem; color: #78350f;">
  <strong>💡 핵심:</strong> 왼쪽 빈 버튼 위치를 클릭하면 alert가 뜹니다!<br/>
  opacity: 0은 투명할 뿐, 여전히 클릭 가능합니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: pointer-events 대안 */}
      <CollapsibleSection title="🖱️ 대안: pointer-events: none">
        <div className="section-description">
          <p>
            <code>visibility: hidden</code> 대신 <code>pointer-events: none</code>을 사용할 수도 있습니다.
            이 방법은 조금 다른 특성을 가집니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#0f172a' }}>visibility: hidden</h4>
              <ul style={{ marginBottom: 0, color: '#475569', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>클릭 불가 ✅</li>
                <li>포커스 불가 ✅</li>
                <li>스크린 리더 무시 ✅</li>
                <li>자식에 visible 가능</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#0f172a' }}>pointer-events: none</h4>
              <ul style={{ marginBottom: 0, color: '#475569', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>클릭 불가 ✅</li>
                <li><strong>포커스 가능</strong> (Tab 키로)</li>
                <li>스크린 리더 읽음</li>
                <li>가볍게 클릭만 막을 때 유용</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>🎯 권장 패턴</strong>
            <pre style={{ marginTop: '0.5rem', marginBottom: 0, background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.85rem' }}>
{`/* 모달에는 visibility 권장 */
.modal {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

/* 로딩 오버레이나 비활성 버튼에는 pointer-events */
.loading-overlay {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.loading-overlay.active {
  opacity: 1;
  pointer-events: auto;
}`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 6: 실전 예제 - 완전한 모달 */}
      <CollapsibleSection title="💼 실전 예제: 완전한 모달 컴포넌트">
        <div className="section-description">
          <p>
            실제 프로덕션에서 사용할 수 있는 완전한 모달 패턴입니다.
            접근성, 애니메이션, 키보드 지원을 모두 포함합니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="production-modal"
          previewHeight="450px"
          codeHeight="600px"
          initialCss={`.demo-container {
  position: relative;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 모달 오버레이 (배경) */
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  
  /* ✅ 핵심: 보임/존재 분리 */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}

/* 모달 박스 */
.modal-content {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  
  /* 등장 애니메이션 */
  transform: scale(0.9) translateY(30px);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-overlay.show .modal-content {
  transform: scale(1) translateY(0);
}

/* 모달 헤더 */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  transition: color 0.2s;
  line-height: 1;
}

.close-btn:hover { color: #1e293b; }

/* 모달 바디 */
.modal-body {
  padding: 1.5rem;
  color: #475569;
  line-height: 1.7;
}

/* 모달 푸터 */
.modal-footer {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
}

/* 버튼 스타일 */
.btn {
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.1s, box-shadow 0.2s;
}

.btn:active { transform: scale(0.95); }

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.btn-ghost {
  background: transparent;
  color: #64748b;
}

.btn-ghost:hover { background: #f1f5f9; }

.open-btn {
  background: white;
  color: #1e293b;
  padding: 1rem 2rem;
  font-size: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.open-btn:hover {
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
}`}
          initialHtml={`<div class="demo-container">
  <button class="btn open-btn" onclick="document.getElementById('productionModal').classList.add('show')">
    🎉 모달 열기
  </button>
  
  <div class="modal-overlay" id="productionModal" onclick="if(event.target === this) this.classList.remove('show')">
    <div class="modal-content">
      <div class="modal-header">
        <h3>프로덕션 모달 예시</h3>
        <button class="close-btn" onclick="document.getElementById('productionModal').classList.remove('show')">&times;</button>
      </div>
      
      <div class="modal-body">
        <p style="margin: 0;">이 모달은 실제 프로덕션에서 사용할 수 있는 완전한 패턴입니다.</p>
        <ul style="margin: 1rem 0 0; padding-left: 1.2rem;">
          <li>페이드 + 스케일 애니메이션</li>
          <li>배경 블러 효과</li>
          <li>오버레이 클릭으로 닫기</li>
          <li>X 버튼으로 닫기</li>
        </ul>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="document.getElementById('productionModal').classList.remove('show')">취소</button>
        <button class="btn btn-primary" onclick="alert('확인!'); document.getElementById('productionModal').classList.remove('show')">확인</button>
      </div>
    </div>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; font-size: 0.9rem; color: #075985; line-height: 1.7;">
  <strong>✅ 포함된 기능:</strong> 페이드 인/아웃, 스케일 애니메이션, backdrop-filter 블러, 오버레이 클릭 닫기, X 버튼 닫기, 반응형 너비
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 7: 요약 치트시트 */}
      <CollapsibleSection title="📋 요약 치트시트">
        <div className="section-description">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>❌ 하지 말 것</h4>
              <ul style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.8' }}>
                <li>display: none으로만 숨기기 → <strong>애니메이션 불가</strong></li>
                <li>opacity: 0으로만 숨기기 → <strong>클릭 여전히 가능</strong></li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#065f46' }}>✅ 올바른 패턴</h4>
              <ul style={{ marginBottom: 0, color: '#047857', lineHeight: '1.8' }}>
                <li><code>opacity: 0/1</code> → 부드러운 페이드 애니메이션</li>
                <li><code>visibility: hidden/visible</code> → 클릭 차단</li>
                <li>두 가지를 <strong>함께 transition</strong></li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
            <h4 style={{ marginTop: 0, color: '#fbbf24' }}>🎯 핵심 코드</h4>
            <pre style={{ marginTop: '0.75rem', marginBottom: 0, background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.9rem' }}>
{`/* 기본: 숨김 */
.modal {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}

/* 활성: 보임 */
.modal.show {
  opacity: 1;
  visibility: visible;
}`}
            </pre>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

export default ModalPatternStudy;
