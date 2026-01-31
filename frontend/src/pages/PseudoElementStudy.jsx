/**
 * PseudoElementStudy 페이지 컴포넌트
 * CSS 가상 요소(::before, ::after, ::selection 등)를 활용한 장식 및 기능 구현을 학습하는 페이지입니다.
 * 주요 개념: content 속성, 가상 요소를 활용한 아이콘/리본/불렛 제작, 선택 영역 스타일링
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';
import CssPropertyControls from '../components/CssPropertyControls';

function PseudoElementStudy() {
  const [modelType, setModelType] = useState('tree');
  const [isNew, setIsNew] = useState(true);
  const [dynamicLabel, setDynamicLabel] = useState('HOT');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Pseudo Elements"
        subtitle="HTML 수정 없이 CSS만으로 요소를 창조하는 마법"
      />
      {/* 전역 컨트롤 타워: :root (CSS의 시작점) */}
      <CollapsibleSection title="0. 전역 컨트롤 타워: :root (CSS의 시작점)">
        <div className="section-description">
          <p>
            <code>:root</code>는 CSS에서 <strong>문서 전체를 대표하는 최상위 요소</strong>입니다.<br />
            HTML 문서에서는 사실상 <code>&lt;html&gt;</code>과 동일하지만,
            <strong>전역 변수와 전역 스타일을 선언하기 위한 공식적인 공간</strong>으로 사용됩니다.
          </p>

          <p style={{ marginTop: '1rem' }}>
            가상 요소가 <em>요소 내부를 확장</em>하는 기술이라면,<br />
            <code>:root</code>는 <em>문서 전체의 규칙과 기준을 정의</em>하는 출발점입니다.
          </p>

        </div>
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ marginTop: 0, color: '#334155' }}>
            🧠 멘탈 모델: :root는 "CSS의 전역 설정 파일"
          </h4>

          <p style={{ color: '#475569', lineHeight: '1.6' }}>
            <code>:root</code>는 개별 컴포넌트나 요소가 아니라,
            <strong>문서 전체가 공유하는 기본 규칙</strong>을 정의하는 장소입니다.
          </p>
          <p style={{ marginTop: '1rem', color: '#475569', lineHeight: '1.6' }}>
            CSS 변수는 단순한 “전역 변수”가 아니라,
            <strong>선언된 요소를 기준으로 아래로 전파되는 값</strong>입니다.<br />
            따라서 <code>:root</code>에 선언하면 문서 전체에서 접근 가능하고,
            특정 클래스 내부에 선언하면 <strong>그 클래스와 하위 요소에서만</strong> 사용할 수 있습니다.
          </p>
          <div style={{
            marginTop: '1rem',
            background: '#1e293b',
            padding: '1.2rem',
            borderRadius: '8px',
            color: '#94a3b8',
            fontFamily: 'monospace',
            lineHeight: '1.7'
          }}>
            <div>:root {'{'}</div>
            <div style={{ paddingLeft: '1.5rem' }}>--primary-color: #3b82f6;</div>
            <div style={{ paddingLeft: '1.5rem' }}>--radius: 8px;</div>
            <div style={{ paddingLeft: '1.5rem' }}>--transition-fast: 0.2s;</div>
            <div>{'}'}</div>
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
            💡 이 값들은 <strong>모든 요소</strong>, <strong>모든 가상 요소</strong>,
            <strong>모든 컴포넌트</strong>가 공통으로 참조할 수 있습니다.
          </p>
          <LiveCodeEditor
            scopeId="root-and-pseudo"
            previewHeight="350px"
            codeHeight="400px"
            initialCss={`:root {
  /* [전역 컨트롤 타워] 여기서 색상 하나만 바꾸면 모든 요소가 바뀝니다! */
  --brand-color: #3b82f6; /* 브랜드 메인 색상 */
  --badge-text: #ffffff;
  --roundness: 12px;
}

.card {
  position: relative;
  padding: 1.5rem;
  background: white;
  border: 2px solid var(--brand-color); /* 전역 변수 참조 */
  border-radius: var(--roundness);
  margin-bottom: 2rem;
  color: #1e293b;
}

/* 가상 요소도 전역 변수를 공유합니다 */
.card::after {
  content: "OFFICIAL";
  position: absolute;
  top: -10px; right: 10px;
  background: var(--brand-color); /* 전역 변수 참조 */
  color: var(--badge-text);
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
}

.btn-primary {
  background: var(--brand-color); /* 동일한 전역 변수 사용 */
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: var(--roundness);
  cursor: pointer;
  font-weight: bold;
}`}
            initialHtml={`<div class="card">
  <h3>전역 변수의 힘</h3>
  <p>이 카드와 오른쪽 상단 배지, 그리고 아래 버튼은 모두 :root의 <code>--brand-color</code>를 공유합니다.</p>
  <button class="btn-primary">확인 버튼</button>
</div>

<div style="background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem; color: #475569;">
  💡 <strong>실습:</strong> 상단 CSS의 <code>--brand-color</code> 값을 <code>#ef4444</code>(빨강)로 바꿔보세요. 
  한 번의 수정으로 카드 테두리, 배지, 버튼 색상이 동시에 바뀝니다!
</div>`}
          />
          <div style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: '#fff7ed',
            borderRadius: '10px',
            border: '1px solid #fed7aa',
            fontSize: '0.9rem',
            color: '#9a3412',
            lineHeight: '1.6'
          }}>
            <strong>📌 중요한 차이점</strong><br />
            <code>:root</code>에 선언된 변수는 모든 컴포넌트가 공유하지만,<br />
            특정 클래스 안에서 동일한 이름의 변수를 다시 선언하면
            <strong>그 영역에서는 지역 변수처럼 동작</strong>합니다.
            <br />
            <strong>“:root는 최상위 스코프, 클래스는 그 아래 스코프”</strong>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#ecfeff',
            borderRadius: '12px',
            border: '1px solid #67e8f9'
          }}>
            <h5 style={{ marginTop: 0, color: '#155e75' }}>
              실무에서 :root는 언제 쓰나요?
            </h5>

            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#0e7490', lineHeight: '1.7' }}>
              <li>디자인 토큰 (색상, 간격, 폰트 크기)</li>
              <li>다크 모드 / 테마 전환</li>
              <li>가상 요소와 공통 스타일 동기화</li>
              <li>컴포넌트 간 디자인 일관성 유지</li>
            </ul>

            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#0c4a6e' }}>
              <strong>핵심:</strong>
              가상 요소는 <em>어디에 그릴지</em>를 해결하고,<br />
              <code>:root</code>는 <em>무엇을 기준으로 그릴지</em>를 해결합니다.
            </p>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
            💡 <strong>정리:</strong><br />
            <code>:root</code>는 CSS 변수의 “전역 기준점”이고,<br />
            클래스 내부에서 다시 선언된 변수는 해당 영역에서 전역 값을 덮어쓰는
            <strong>지역 설정</strong>처럼 동작합니다.
          </p>

        </div>
      </CollapsibleSection>

      <CollapsibleSection title=":root">
        {/* :root가 정확히 무엇인지 & html과의 관계 */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ marginTop: 0, color: '#111827' }}>
            🔍 :root는 정확히 무엇을 가리키나요?
          </h4>

          <p style={{ color: '#374151', lineHeight: '1.7' }}>
            <code>:root</code>는 <strong>문서 트리에서 가장 바깥(최상위)에 있는 요소</strong>를 가리키는
            CSS 의사 클래스입니다.<br />
            HTML 문서에서는 사실상 <code>&lt;html&gt;</code> 요소를 의미합니다.
          </p>

          <div style={{
            marginTop: '1rem',
            background: '#1f2937',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'monospace',
            color: '#9ca3af',
            lineHeight: '1.6'
          }}>
            <div>:root {'{'}</div>
            <div style={{ paddingLeft: '1.5rem' }}>font-size: 16px;</div>
            <div>{'}'}</div>
          </div>

          <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#6b7280' }}>
            ⬆️ 위 코드는 아래 코드와 <strong>동일한 의미</strong>입니다.
          </p>

          <div style={{
            marginTop: '0.5rem',
            background: '#1f2937',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'monospace',
            color: '#9ca3af',
            lineHeight: '1.6'
          }}>
            <div>html {'{'}</div>
            <div style={{ paddingLeft: '1.5rem' }}>font-size: 16px;</div>
            <div>{'}'}</div>
          </div>
        </div>
        {/* 왜 html 대신 :root를 쓰는가 */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: '#f9fafb',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h4 style={{ marginTop: 0, color: '#111827' }}>
            ❓ 그런데 왜 <code>html</code> 대신 <code>:root</code>를 쓰나요?
          </h4>

          <p style={{ color: '#374151', lineHeight: '1.7' }}>
            가장 큰 이유는 <strong>CSS 변수(CSS Custom Properties)를 위한 표준적인 위치</strong>이기 때문입니다.
          </p>

          <div style={{
            marginTop: '1rem',
            background: '#1f2937',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'monospace',
            color: '#9ca3af',
            lineHeight: '1.6'
          }}>
            <div>:root {'{'}</div>
            <div style={{ paddingLeft: '1.5rem' }}>--primary-color: #3b82f6;</div>
            <div style={{ paddingLeft: '1.5rem' }}>--border-radius: 8px;</div>
            <div>{'}'}</div>
            <br />
            <div>button {'{'}</div>
            <div style={{ paddingLeft: '1.5rem' }}>
              background-color: var(--primary-color);
            </div>
            <div style={{ paddingLeft: '1.5rem' }}>
              border-radius: var(--border-radius);
            </div>
            <div>{'}'}</div>
          </div>

          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
            👉 실무에서는<br />
            <strong><code>:root</code> = 전역 설정 공간</strong><br />
            <strong><code>--변수</code> = 디자인 계약서</strong><br />
            로 생각하는 경우가 대부분입니다.
          </p>
        </div>

        {/* html vs :root 차이 */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1.5rem',
          background: '#ecfeff',
          borderRadius: '12px',
          border: '1px solid #67e8f9'
        }}>
          <h4 style={{ marginTop: 0, color: '#155e75' }}>
            ⚠️ <code>html</code>과 <code>:root</code>의 중요한 차이
          </h4>

          <div style={{
            marginTop: '0.75rem',
            background: '#0f172a',
            padding: '1rem',
            borderRadius: '8px',
            fontFamily: 'monospace',
            color: '#bae6fd',
            lineHeight: '1.6'
          }}>
            <div>html {'{'}</div>
            <div style={{ paddingLeft: '1.5rem' }}>--color: red;</div>
            <div>{'}'}</div>
            <br />
            <div>:root {'{'}</div>
            <div style={{ paddingLeft: '1.5rem' }}>--color: blue;</div>
            <div>{'}'}</div>
          </div>

          <p style={{ marginTop: '1rem', color: '#0c4a6e', lineHeight: '1.6' }}>
            이 경우 최종 값은 <strong>blue</strong>입니다.<br />
            이유는 <code>:root</code>가 <strong>의사 클래스</strong>이기 때문에
            <code>html</code> 태그 선택자보다 <strong>특이성(specificity)</strong>이 더 높기 때문입니다.
          </p>

          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#0c4a6e' }}>
            👉 그래서 <strong>전역 CSS 변수는 관례적으로 <code>:root</code>에만 선언</strong>합니다.
            이는 팀 개발에서 충돌을 줄이기 위한 사실상의 표준입니다.
          </p>
        </div>

      </CollapsibleSection>
      {/* 기초 섹션: 멘탈 모델 (중요!) */}
      <CollapsibleSection title="1. 가상 요소의 멘탈 모델 (Mental Model)">
        <div className="section-description">
          <p>
            가상 요소를 이해하는 가장 중요한 열쇠는 <strong>"이것들이 요소의 어디에 생기는가?"</strong>입니다.<br />
            많은 분들이 요소의 '바깥'에 생기는 것으로 착각하지만, 사실은 요소의 <strong>내부 콘텐츠의 맨 앞과 맨 뒤</strong>에 생깁니다.
          </p>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ marginTop: 0, color: '#334155' }}>📍 구조 시각화: ::before와 ::after는 어디에 있나요?</h4>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setModelType('tree')}
                style={{
                  padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                  background: modelType === 'tree' ? '#3b82f6' : '#e2e8f0',
                  color: modelType === 'tree' ? 'white' : '#64748b',
                  fontWeight: '600', transition: 'all 0.2s'
                }}
              >Tree 구조</button>
              <button
                onClick={() => setModelType('visual')}
                style={{
                  padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                  background: modelType === 'visual' ? '#3b82f6' : '#e2e8f0',
                  color: modelType === 'visual' ? 'white' : '#64748b',
                  fontWeight: '600', transition: 'all 0.2s'
                }}
              >시각적 배치</button>
            </div>

            {modelType === 'tree' ? (
              <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '8px', color: '#94a3b8', fontFamily: 'monospace', lineHeight: '1.8' }}>
                <div>&lt;<span style={{ color: '#f43f5e' }}>div</span> <span style={{ color: '#fbbf24' }}>class</span>="<span style={{ color: '#34d399' }}>element</span>"&gt;</div>
                <div style={{ paddingLeft: '2rem', color: '#3b82f6', fontWeight: 'bold' }}>::before</div>
                <div style={{ paddingLeft: '2rem', color: '#f1f5f9' }}>실제 HTML 콘텐츠 (텍스트/이미지 등)</div>
                <div style={{ paddingLeft: '2rem', color: '#3b82f6', fontWeight: 'bold' }}>::after</div>
                <div>&lt;/<span style={{ color: '#f43f5e' }}>div</span>&gt;</div>
              </div>
            ) : (
              <div style={{
                height: '150px', background: '#fff', border: '2px solid #3b82f6', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '20px'
              }}>
                <div style={{
                  padding: '10px', background: '#dbeafe', border: '2px dashed #3b82f6', color: '#1e40af',
                  fontSize: '0.8rem', fontWeight: 'bold', borderRadius: '4px'
                }}>::before</div>
                <div style={{ flex: 1, padding: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center', color: '#334155' }}>Element Content</div>
                <div style={{
                  padding: '10px', background: '#dbeafe', border: '2px dashed #3b82f6', color: '#1e40af',
                  fontSize: '0.8rem', fontWeight: 'bold', borderRadius: '4px'
                }}>::after</div>
              </div>
            )}

            <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
              💡 <strong>핵심 포인트:</strong> <code>::before</code>와 <code>::after</code>는 마치 부모 요소 안에 첫 번째, 마지막 자식으로 <strong>새로운 태그를 하나씩 더 넣는 것</strong>과 똑같은 효과를 냅니다. 단지 HTML 소스에는 존재하지 않을 뿐이죠!
            </p>

            <div className="info-box" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', marginTop: '1.5rem' }}>
              <p style={{ margin: 0, lineHeight: '1.8' }}>
                <strong>⚡ 핵심 조건:</strong> <code>::before</code>와 <code>::after</code>는 <strong><code>content</code> 속성이 필수</strong>입니다!<br />
                → <code>content</code>가 없으면 가상 요소가 생성되지 않습니다 (아예 보이지 않음)<br />
                → 빈 내용이라도 <code>content: "";</code>로 명시해야 합니다<br />
                → <code>content: "텍스트"</code>, <code>content: attr(data-name)</code>, <code>content: ""</code> 모두 가능
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: 인터랙티브 마법 (Hover Effects) */}
      <CollapsibleSection title="2. 실전 마법: 인터랙티브 호버 효과 (Hover Magic)">
        <div className="section-description">
          <p>
            가상 요소의 가장 강력한 무기는 <strong>자바스크립트 없이 만드는 애니메이션</strong>입니다.<br />
            배경을 슬라이드하거나, 화려한 밑줄을 긋는 등의 효과를 HTML 수정 없이 순수 CSS로 구현해보세요.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="pseudo-hover-magic"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.magic-button {
  position: relative;
  padding: 1rem 2.5rem;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden; /* 가상 요소가 밖으로 나가지 않게 */
  transition: color 0.3s;
  z-index: 1;
}

/* 배경 슬라이드 레이어 */
.magic-button::before {
  content: "";
  position: absolute;
  top: 0; left: -100%; /* 왼쪽 밖에 대기 */
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  transition: left 0.4s cubic-bezier(0.7, 0, 0.3, 1);
  z-index: -1; /* 글자 뒤로 배치 */
}

.magic-button:hover {
  color: white;
}

.magic-button:hover::before {
  left: 0; /* 호버 시 안으로 슬라이드 */
}

.fancy-link {
  display: inline-block;
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #334155;
  text-decoration: none;
  position: relative;
}

/* 화려한 밑줄 */
.fancy-link::after {
  content: "";
  position: absolute;
  bottom: -5px; left: 0;
  width: 0; height: 4px;
  background: #f43f5e;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.fancy-link:hover::after {
  width: 100%;
}
`}
          initialHtml={`<div style="display: flex; flex-direction: column; align-items: center; padding: 2rem; background: white; border-radius: 12px;">
  <button class="magic-button">Slide Hover Effect</button>
  
  <a href="#" class="fancy-link">Underline Animation</a>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
  <p style="margin: 0; font-size: 0.9rem; color: #475569; lineHeight: '1.6'">
    💡 <strong>어떻게 작동하나요?</strong><br/>
    1. <code>::before</code>로 배경 레이어를 미리 만듭니다.<br/>
    2. 처음엔 <code>left: -100%</code>로 숨겨둡니다.<br/>
    3. <code>:hover</code> 상태일 때 <code>::before</code>의 위치를 <code>left: 0</code>으로 옮깁니다.
  </p>
</div>`}
        />

        <h4 style={{ marginTop: '2rem', color: '#1e293b' }}>🎨 더 많은 호버 효과 샘플</h4>

        <LiveCodeEditor
          scopeId="pseudo-hover-samples"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`/* 샘플 컨테이너 */
.samples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

/* 1. 카드 호버 - 이미지 오버레이 */
.image-card {
  position: relative;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea, #764ba2);
  cursor: pointer;
}

.image-card::after {
  content: "VIEW";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-card:hover::after {
  opacity: 1;
}

/* 2. 버튼 - 테두리 채우기 효과 */
.border-fill-btn {
  position: relative;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid #3b82f6;
  color: #3b82f6;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s;
  z-index: 1;
}

.border-fill-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  background: #3b82f6;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: -1;
}

.border-fill-btn:hover {
  color: white;
}

.border-fill-btn:hover::before {
  transform: scaleX(1);
}

/* 3. 아이콘 버튼 - 원형 물결 */
.ripple-btn {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #10b981;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  overflow: hidden;
}

.ripple-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transform: scale(0);
  transition: transform 0.4s ease;
}

.ripple-btn:hover::before {
  transform: scale(1);
}

/* 4. 텍스트 - 양쪽에서 밑줄 */
.center-underline {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  text-decoration: none;
  position: relative;
  padding: 0.5rem 0;
}

.center-underline::before,
.center-underline::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 3px;
  background: #f59e0b;
  transition: width 0.3s ease;
}

.center-underline::before {
  left: 50%;
}

.center-underline::after {
  right: 50%;
}

.center-underline:hover::before,
.center-underline:hover::after {
  width: 50%;
}

/* 5. 메뉴 아이템 - 화살표 등장 */
.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 8px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: color 0.2s, padding-left 0.3s;
}

.menu-item::before {
  content: "→";
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

.menu-item:hover {
  color: #3b82f6;
  padding-left: 1.5rem;
}

.menu-item:hover::before {
  opacity: 1;
  transform: translateX(0);
}`}
          initialHtml={`<div class="samples-grid">
  <!-- 1. 이미지 카드 오버레이 -->
  <div class="image-card">
    <div style="padding: 1rem; color: white;">
      <div style="font-size: 2rem;">🖼️</div>
      <p style="margin: 0.5rem 0 0; font-size: 0.9rem;">Image Card</p>
    </div>
  </div>

  <!-- 2. 테두리 채우기 버튼 -->
  <div style="display: flex; flex-direction: column; gap: 1rem; justify-content: center;">
    <button class="border-fill-btn">Hover Me</button>
    <button class="ripple-btn">✨</button>
  </div>

  <!-- 3. 메뉴 아이템 -->
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <div class="menu-item">Dashboard</div>
    <div class="menu-item">Settings</div>
    <div class="menu-item">Profile</div>
  </div>
</div>

<!-- 텍스트 효과 -->
<div style="text-align: center; margin-top: 1.5rem;">
  <a href="#" class="center-underline">Center Underline Effect</a>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #ecfdf5; border-radius: 8px; font-size: 0.9rem; color: #065f46;">
  <strong>🎯 핵심 패턴:</strong> 모두 <code>::before</code> 또는 <code>::after</code>를 사용하여 JavaScript 없이 순수 CSS로 구현했습니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 실전 비교 섹션: Pro의 방식 vs 초보의 방식 */}
      <CollapsibleSection title="3. 왜 가상 요소를 쓰나요? (Clean Code 비교)">
        <div className="section-description">
          <p>
            HTML에 불필요한 장식용 태그(<code>&lt;span&gt;</code> 등)를 넣지 않아도 됩니다. 코드가 훨씬 깨끗해지고 유지보수가 쉬워집니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            {/* 초보의 방식 */}
            <div style={{ padding: '1.5rem', background: '#fee2e2', borderRadius: '12px', border: '1px solid #fecaca' }}>
              <h5 style={{ margin: '0 0 1rem 0', color: '#b91c1c' }}>❌ 불필요한 태그 남발</h5>
              <pre style={{ fontSize: '0.85rem', color: '#991b1b', background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '6px' }}>
                {`<button class="btn">
  <img src="check.png" />
  저장하기
  <span class="bg"></span>
</button>`}
              </pre>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#991b1b' }}>
                단순한 아이콘과 배경 효과를 위해 실제 HTML 태그를 3개나 더 쓰고 있습니다.
              </p>
            </div>

            {/* Pro의 방식 */}
            <div style={{ padding: '1.5rem', background: '#dcfce7', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <h5 style={{ margin: '0 0 1rem 0', color: '#166534' }}>✅ 가상 요소 활용 (Pro)</h5>
              <pre style={{ fontSize: '0.85rem', color: '#166534', background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '6px' }}>
                {`<button class="btn">
  저장하기
</button>`}
              </pre>
              <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#166534' }}>
                HTML은 깨끗하게 유지하고, 아이콘(::before)과 배경(::after)은 모두 CSS에서 처리합니다.
              </p>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 실무 심화 섹션: 데이터와 연동하기 (Dynamic Class & attr) */}
      <CollapsibleSection title="4. 실무 필수: 데이터와 연동 (Dynamic Data)">
        <div className="section-description">
          <p>
            "NEW" 플래그 같은 실제 데이터를 가상 요소와 어떻게 연결할까요?<br />
            자바스크립트로 HTML을 직접 수정하는 대신, <strong>클래스를 토글(Toggle)</strong>하거나 <strong>Data Attribute</strong>를 사용하는 것이 가장 깔끔한 정석입니다.
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setIsNew(!isNew)}
              style={{
                padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                background: isNew ? '#ef4444' : '#10b981', color: 'white', fontWeight: 'bold'
              }}
            >
              {isNew ? '신제품 해제 (isNew: false)' : '신제품 설정 (isNew: true)'}
            </button>
            <input
              type="text"
              value={dynamicLabel}
              onChange={(e) => setDynamicLabel(e.target.value)}
              placeholder="라벨 입력..."
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>
        </div>

        <LiveCodeEditor
          scopeId="pseudo-dynamic-data"
          previewHeight="300px"
          codeHeight="350px"
          initialCss={`.product-card {
  position: relative;
  width: 100%; height: 120px;
  background: white; border: 2px solid #e2e8f0;
  border-radius: 12px; display: flex;
  align-items: center; justify-content: center;
  font-size: 1.2rem; font-weight: 600;
  transition: all 0.3s;
}

/* 1. 클래스 기반 토글: is-new 클래스가 있을 때만 리본 생성 */
.product-card.is-new::before {
  content: "NEW";
  position: absolute; top: 10px; right: 10px;
  background: #ef4444; color: white;
  padding: 2px 8px; border-radius: 4px;
  font-size: 0.7rem; font-weight: 800;
}

/* 2. 속성(attr) 기반 연동: data-label의 값을 그대로 가져옴 */
.product-card::after {
  content: attr(data-label); /* HTML의 data-label 속성값을 읽음 */
  position: absolute; bottom: 10px; left: 10px;
  background: #3b82f6; color: white;
  padding: 2px 8px; border-radius: 4px;
  font-size: 0.7rem; font-weight: 800;
}

/* 클래스 유무에 따른 시각적 차이 */
.product-card.is-new { border-color: #fca5a5; background: #fff1f1; }
`}
          initialHtml={`
<div class="product-card ${isNew ? 'is-new' : ''}" data-label="${dynamicLabel}">
  Product Item
</div>

<div style="margin-top: 2rem; padding: 1.2rem; background: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd;">
  <h5 style="margin: 0 0 0.5rem 0; color: #0369a1;">어떻게 된 건가요?</h5>
  <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.9rem; color: #0c4a6e; line-height: 1.6;">
    <li><strong>Class Toggle</strong>: 리액트 상태(<code>isNew</code>)에 따라 <code>.is-new</code> 클래스가 붙었다 떼어집니다.</li>
    <li><strong>CSS attr()</strong>: 가상 요소가 HTML의 <code>data-label</code> 속성값을 실시간으로 읽어와서 화면에 출력합니다.</li>
  </ul>
</div>`}
          currentCss={`.product-card {
  position: relative;
  width: 100%; height: 120px;
  background: white; border: 2px solid #e2e8f0;
  border-radius: 12px; display: flex;
  align-items: center; justify-content: center;
  font-size: 1.2rem; font-weight: 600;
  transition: all 0.3s;
}

/* 1. 클래스 기반 토글: is-new 클래스가 있을 때만 리본 생성 */
.product-card.is-new::before {
  content: "NEW";
  position: absolute; top: 10px; right: 10px;
  background: #ef4444; color: white;
  padding: 2px 8px; border-radius: 4px;
  font-size: 0.7rem; font-weight: 800;
}

/* 2. 속성(attr) 기반 연동: data-label의 값을 그대로 가져옴 */
.product-card::after {
  content: attr(data-label); /* HTML의 data-label 속성값을 읽음 */
  position: absolute; bottom: 10px; left: 10px;
  background: #3b82f6; color: white;
  padding: 2px 8px; border-radius: 4px;
  font-size: 0.7rem; font-weight: 800;
}

/* 클래스 유무에 따른 시각적 차이 */
.product-card.is-new { border-color: #fca5a5; background: #fff1f1; }
`}
          currentHtml={`
<div class="product-card ${isNew ? 'is-new' : ''}" data-label="${dynamicLabel}">
  Product Item
</div>

<div style="margin-top: 2rem; padding: 1.2rem; background: #f0f9ff; border-radius: 10px; border: 1px solid #bae6fd;">
  <h5 style="margin: 0 0 0.5rem 0; color: #0369a1;">어떻게 된 건가요?</h5>
  <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.9rem; color: #0c4a6e; line-height: 1.6;">
    <li><strong>Class Toggle</strong>: 리액트 상태(<code>isNew</code>)에 따라 <code>.is-new</code> 클래스가 붙었다 떼어집니다.</li>
    <li><strong>CSS attr()</strong>: 가상 요소가 HTML의 <code>data-label</code> 속성값을 실시간으로 읽어와서 화면에 출력합니다.</li>
  </ul>
</div>`}
        />
      </CollapsibleSection>

      {/* 새 섹션: 레이아웃 흐름 이해 */}
      <CollapsibleSection title="4.5 핵심 개념: ::after가 레이아웃에 영향을 준다는 것의 의미">
        <div className="section-description">
          <p>
            <strong>"::after가 레이아웃에 영향을 준다"</strong>는 것은 무엇을 의미할까요?<br />
            이것은 CSS의 <code>position</code> 속성과 <strong>레이아웃 흐름(Layout Flow)</strong>을 이해하는 핵심입니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
            <h4 style={{ marginTop: 0, color: '#92400e' }}>🎯 핵심 개념</h4>
            <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem', color: '#78350f', lineHeight: ' 1.8' }}>
              <li><strong>레이아웃 흐름 안에 있다</strong> = 그 요소가 공간을 차지하고, 다른 요소의 위치에 영향을 줌</li>
              <li><strong>레이아웃 흐름 밖에 있다</strong> = 그 요소가 공간을 차지하지 않고, 다른 요소가 무시함</li>
            </ul>
          </div>
        </div>

        <h4 style={{ marginTop: '2rem', color: '#1e293b' }}>📊 시각적 비교: Normal Flow vs Absolute</h4>
        
        <LiveCodeEditor
          scopeId="layout-flow-comparison"
          previewHeight="600px"
          codeHeight="650px"
          initialCss={`/* 예제 1: Normal Flow (레이아웃에 영향 O) */
.box-normal {
  width: 200px;
  padding: 1rem;
  background: white;
  border: 3px solid #3b82f6;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.box-normal .content {
  padding: 1rem;
  background: #dbeafe;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  border-radius: 8px;
}

/* ::after가 FLEX 자식으로 존재 (레이아웃 흐름 안에) */
.box-normal .content::after {
  content: "✓";
  font-size: 24px;
  font-weight: bold;
  color: #1e40af;
  margin-left: 0.5rem;
}

/* 예제 2: Absolute Positioning (레이아웃에 영향 X) */
.box-absolute {
  width: 200px;
  padding: 1rem;
  background: white;
  border: 3px solid #10b981;
  border-radius: 12px;
}

.box-absolute .content {
  position: relative;  /* ::after의 기준점 */
  padding: 1rem;
  background: #d1fae5;
  min-height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ::after가 절대 위치 (레이아웃 흐름 밖에) */
.box-absolute .content::after {
  content: "✓";
  position: absolute;  /* 🔑 핵심! */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #065f46;
}

.demo-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 12px;
}

.label {
  text-align: center;
  font-weight: 700;
  color: #334155;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}`}
          initialHtml={`<div class="demo-container">
  <!-- Normal Flow 예제 -->
  <div>
    <div class="label">❌ Normal Flow (영향 있음)</div>
    <div class="box-normal">
      <div class="content">텍스트</div>
    </div>
  </div>

  <!-- Absolute 예제 -->
  <div>
    <div class="label">✅ Absolute (영향 없음)</div>
    <div class="box-absolute">
      <div class="content">텍스트</div>
    </div>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1.5rem; background: #fff; border-radius: 12px; border: 1px solid #e2e8f0;">
  <h4 style="margin: 0 0 1rem 0; color: #1e293b;">🔍 차이점 관찰</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; font-size: 0.9rem;">
    <div>
      <strong style="color: #3b82f6;">왼쪽 (Normal Flow)</strong>
      <ul style="margin: 0.5rem 0 0; padding-left: 1.2rem; line-height: 1.8; color: #475569;">
        <li>::after가 <strong>flexbox의 자식</strong>이 됨</li>
        <li>::after가 <strong>공간을 차지</strong>함</li>
        <li>체크 표시가 생기면 <strong>높이가 늘어남</strong></li>
      </ul>
    </div>
    <div>
      <strong style="color: #10b981;">오른쪽 (Absolute)</strong>
      <ul style="margin: 0.5rem 0 0; padding-left: 1.2rem; line-height: 1.8; color: #475569;">
        <li>::after가 <strong>흐름에서 제거</strong>됨</li>
        <li>::after가 <strong>공간을 안 차지</strong>함</li>
        <li>체크 표시와 무관하게 <strong>높이 유지</strong></li>
      </ul>
    </div>
  </div>
</div>`}
        />

        <h4 style={{ marginTop: '2rem', color: '#1e293b' }}>✅ 실전 예제: 커스텀 체크박스</h4>
        <p className="section-description">
          FormStudy에서 본 체크박스가 바로 이 원리를 활용한 것입니다!
        </p>

        <LiveCodeEditor
          scopeId="checkbox-layout-demo"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`/* ❌ 문제 있는 방식: Flex 중앙 정렬 */
.checkbox-flex {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.checkbox-flex .checkmark {
  width: 24px;
  height: 24px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  background: #fff;
  display: flex;          /* ::after가 flex 자식이 됨 */
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.checkbox-flex input {
  position: absolute;
  opacity: 0;
}

/* 체크 시 아이콘 생성 - 레이아웃에 영향! */
.checkbox-flex input:checked ~ .checkmark::after {
  content: "✓";
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}

.checkbox-flex input:checked ~ .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

/* ✅ 올바른 방식: Absolute 중앙 정렬 */
.checkbox-absolute {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.checkbox-absolute .checkmark {
  position: relative; /* ::after의 기준점 */
  width: 24px;
  height: 24px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  background: #fff;
  flex-shrink: 0;     /* 크기 고정 */
  transition: all 0.2s;
}

.checkbox-absolute input {
  position: absolute;
  opacity: 0;
}

/* 체크 시 아이콘 생성 - 레이아웃에 무영향! */
.checkbox-absolute input:checked ~ .checkmark::after {
  content: "✓";
  position: absolute;  /* 🔑 핵심! */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  line-height: 1;
}

.checkbox-absolute input:checked ~ .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}`}
          initialHtml={`<div style="padding: 2rem; background: white; border-radius: 12px;">
  <h3 style="margin: 0 0 1.5rem 0; color: #1e293b;">❌ 문제: Flex로 중앙 정렬</h3>
  
  <label class="checkbox-flex">
    <input type="checkbox" />
    <span class="checkmark"></span>
    <span>체크 안 함</span>
  </label>
  
  <label class="checkbox-flex">
    <input type="checkbox" checked />
    <span class="checkmark"></span>
    <span>체크함 (높이 차이 확인!)</span>
  </label>

  <div style="margin: 2rem 0 1.5rem; border-top: 2px dashed #e2e8f0; padding-top: 2rem;">
    <h3 style="margin: 0 0 1.5rem 0; color: #1e293b;">✅ 해결: Absolute로 중앙 정렬</h3>
  </div>

  <label class="checkbox-absolute">
    <input type="checkbox" />
    <span class="checkmark"></span>
    <span>체크 안 함</span>
  </label>
  
  <label class="checkbox-absolute">
    <input type="checkbox" checked />
    <span class="checkmark"></span>
    <span>체크함 (높이 동일!)</span>
  </label>
</div>

<div style="margin-top: 1.5rem; padding: 1.5rem; background: #ecfdf5; border-radius: 12px; border: 1px solid #10b981;">
  <h4 style="margin: 0 0 0.5rem 0; color: #065f46;">💡 왜 이렇게 하나요?</h4>
  <p style="margin: 0; color: #047857; line-height: 1.8; font-size: 0.95rem;">
    <strong>Flex 방식:</strong> ::after가 flexbox의 자식이 되어 공간을 차지 → 체크 시 높이 변화<br/>
    <strong>Absolute 방식:</strong> ::after가 레이아웃 흐름에서 제거 → 체크 여부와 무관하게 높이 유지
  </p>
</div>`}
        />

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: '#e2e8f0' }}>
          <h4 style={{ marginTop: 0, color: '#fbbf24' }}>📝 정리</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginTop: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #475569' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>방식</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>::after 상태</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>레이아웃 영향</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>사용 케이스</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #475569' }}>
                <td style={{ padding: '0.75rem' }}><code>Normal Flow</code></td>
                <td style={{ padding: '0.75rem' }}>흐름 안에 존재</td>
                <td style={{ padding: '0.75rem', color: '#fca5a5' }}>공간 차지 ❌</td>
                <td style={{ padding: '0.75rem' }}>텍스트 앞뒤 아이콘</td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}><code>position: absolute</code></td>
                <td style={{ padding: '0.75rem' }}>흐름에서 제거됨</td>
                <td style={{ padding: '0.75rem', color: '#86efac' }}>무시됨 ✅</td>
                <td style={{ padding: '0.75rem' }}>오버레이, 배지, 체크박스</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: ::selection (사용자 선택 영역 스타일링) */}
      <CollapsibleSection title="5. 사용자 인터랙션: ::selection (선택 영역)">
        <div className="section-description">
          <p>
            사용자가 마우스로 텍스트를 드래그할 때 생기는 <strong>하이라이트 색상</strong>을 바꿀 수 있습니다. 브랜드 컬러를 적용할 때 유용한 디테일입니다.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="selection"
          previewHeight="250px"
          codeHeight="250px"
          initialCss={`/* 모든 요소의 선택 스타일 변경 */
::selection {
  background-color: #3b82f6;
  color: #ffffff;
}

/* 특정 클래스만 다른 스타일 적용 */
.custom-selection::selection {
  background-color: #f59e0b;
  color: #1e293b;
}

.text-demo {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #1e293b;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}`}
          initialHtml={`<div class="text-demo">
  <p>이 문장을 마우스로 드래그해보세요! 파란색 하이라이트가 나타납니다.</p>
  <p class="custom-selection">
    여기는 클래스를 별도로 주어 주황색 하이라이트가 나타나게 했습니다.
  </p>
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: 실무 디자인 패턴 - 리본 효과 구현 */}
      <CollapsibleSection title="5. 장식 마법: 리본 효과 (Ribbon)">
        <div className="section-description">
          <p>
            카드 구석에 붙은 <strong>'NEW' 리본</strong> 같은 요소는 가상 요소로 구현할 때 가장 깔끔합니다. <code>overflow: hidden</code>과 조합해보세요.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="ribbon-demo"
          previewHeight="300px"
          codeHeight="400px"
          initialCss={`.card-with-ribbon {
  position: relative;
  background: white;
  padding: 2.5rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* 리본이 카드 밖으로 나가는 것을 잘라줌 */
  border: 1px solid #e2e8f0;
}

/* 빨간색 리본 막대기 */
.card-with-ribbon::before {
  content: "NEW";
  position: absolute;
  top: 15px;
  right: -35px;
  background: #ef4444;
  color: white;
  padding: 0.5rem 3rem;
  font-weight: 800;
  font-size: 0.8rem;
  transform: rotate(45deg); /* 비스듬히 눕히기 */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  letter-spacing: 1px;
}

.card-with-ribbon h3 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.card-with-ribbon p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}`}
          initialHtml={`<div class="card-with-ribbon">
  <h3>프리미엄 과정</h3>
  <p>
    이 리본은 별도의 HTML 태그 없이 CSS 가상 요소 하나로 만들어졌습니다.
    실제 HTML 코드는 매우 단순하게 유지됩니다.
  </p>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 커스텀 리스트 불렛 (::before & ::after 조합) */}
      <CollapsibleSection title="6. 실무 꽃: 커스텀 리스트 (List Bullets)">
        <div className="section-description">
          <p>
            기본 불렛(●)은 지루합니다. 가상 요소 두 개(<code>::before</code>, <code>::after</code>)를 겹쳐서 멋진 체크 리스트를 만들어보세요.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="pseudo-practical-list"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.custom-list {
  list-style: none; /* 기본 불렛 제거 */
  padding: 0;
}

.custom-list li {
  position: relative;
  padding-left: 45px;
  margin-bottom: 25px;
  line-height: 1.6;
}

/* 불렛 배경 (원형) */
.custom-list li::before {
  content: "";
  position: absolute;
  left: 0; top: 0;
  width: 30px; height: 30px;
  background: linear-gradient(135deg, #34d399, #10b981);
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
}

/* 체크 표시 */
.custom-list li::after {
  content: "L"; /* L을 뒤집고 눕혀서 체크처럼 보이기 */
  position: absolute;
  left: 9px; top: 1px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  transform: scaleX(-1) rotate(-35deg);
}

.custom-list li strong {
  display: block;
  color: #1e293b;
  font-size: 1.2rem;
  margin-bottom: 2px;
}

.custom-list li p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}`}
          initialHtml={`<ul class="custom-list">
  <li>
    <strong>HTML 유지보수성</strong>
    <p>아이콘을 바꿀 때 모든 HTML을 고칠 필요 없이 CSS 한 곳만 고치면 됩니다.</p>
  </li>
  <li>
    <strong>일관된 디자인</strong>
    <p>브라우저마다 다른 기본 불렛 대신 우리가 디자인한 완벽한 불렛을 보여줍니다.</p>
  </li>
</ul>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default PseudoElementStudy;
