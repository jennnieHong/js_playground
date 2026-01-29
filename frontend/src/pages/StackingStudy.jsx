/**
 * StackingStudy 페이지 컴포넌트
 * CSS의 Z-index, 쌓임 맥락(Stacking Context), 그리고 Cascading Layers(@layer)를 학습하는 페이지입니다.
 * 주요 개념: Stacking Context 생성 조건, isolation: isolate, @layer를 이용한 명시도 관리
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function StackingStudy() {
  // --- 상태 관리 (State Management) ---
  // 실시간으로 z-index와 isolation 모드를 변경하며 층위 변화를 확인하기 위한 상태입니다.
  const [isolationMode, setIsolationMode] = useState('auto');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Stacking & Layers"
        subtitle="층층이 쌓이는 CSS의 우선순위와 계층 구조 정복"
      />

      {/* 실습 섹션: Z-Index와 쌓임 맥락 (Stacking Context) */}
      <CollapsibleSection title="Z-Index와 쌓임 맥락 (Stacking Context)">
        {/* 쉬운 비유 섹션 */}
        <div style={{ marginBottom: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '16px', color: 'white' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.5rem' }}>🏢 건물로 이해하는 Stacking Context</h3>

          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', marginTop: '1rem' }}>
            <p style={{ fontSize: '1.1rem', marginTop: 0, lineHeight: '1.8' }}>
              <strong>핵심 비유:</strong> Stacking Context는 <strong>"건물"</strong>이고, z-index는 <strong>"건물 내부의 층수"</strong>입니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1.2rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>건물 A (부모)</strong>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  • 1층: z-index: 1<br />
                  • 5층: z-index: 5<br />
                  • 999층: z-index: 999<br />
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '1.2rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>건물 B (옆 건물)</strong>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  • 1층: z-index: 1<br />
                  • 2층: z-index: 2<br />
                  • 10층: z-index: 10<br />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '8px' }}>
              <strong style={{ display: 'block', marginBottom: '0.8rem', fontSize: '1.05rem' }}>❓ 질문: 건물 A의 999층과 건물 B의 10층, 어느 쪽이 위에 있을까요?</strong>

              <div style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                <strong>답변:</strong> <span style={{ background: '#fbbf24', color: '#000', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>건물이 더 중요합니다!</span><br /><br />

                • 만약 <strong>건물 B가 건물 A보다 앞에</strong> 있다면?<br />
                → 건물 B의 2층이라도 건물 A의 999층을 가림<br /><br />

                • z-index는 <strong>같은 건물(Stacking Context) 안에서만</strong> 의미가 있음<br />
                → 건물 A 내부에서는 999층이 5층보다 위<br />
                → 하지만 <strong>건물 간 비교</strong>에서는 건물 자체의 위치가 결정적!
              </div>
            </div>
          </div>
        </div>

        {/* 실전 예시 */}
        <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '1px solid #f59e0b', marginBottom: '2rem' }}>
          <h4 style={{ marginTop: 0, color: '#92400e' }}>💡 실제 상황 예시</h4>

          <div style={{ color: '#78350f', lineHeight: '1.8' }}>
            <strong>시나리오:</strong> 페이지에 모달이 있고, 그 안에 드롭다운 메뉴가 있습니다.<br /><br />

            <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>모달 (z-index: 100)</code> → 이게 "건물"<br />
            <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>드롭다운 (z-index: 9999)</code> → 건물 안의 9999층<br /><br />

            페이지 밖에 <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>헤더 (z-index: 200)</code>가 있다면?<br />
            → <strong>헤더가 드롭다운을 가립니다!</strong> (9999 {'>'} 200인데도!)<br />
            → 왜? 모달(건물)이 z-index 100이고, 헤더는 200이므로 헤더 "건물"이 앞에 있기 때문
          </div>
        </div>

        <div style={{ padding: '1.5rem', background: '#ede9fe', borderRadius: '12px', border: '2px solid #a78bfa', marginBottom: '2rem' }}>
          <h4 style={{ marginTop: 0, color: '#5b21b6' }}>📏 중요: z-index가 같을 때는?</h4>
          
          <p style={{ color: '#6b21a8', lineHeight: '1.8', marginBottom: '1rem' }}>
            같은 Stacking Context 안에서 <strong>z-index 값이 같으면</strong> 어떻게 될까요?
          </p>

          <div style={{ background: 'white', padding: '1.2rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <strong style={{ color: '#5b21b6', fontSize: '1.05rem' }}>✅ 답: Source Order (소스 순서) 규칙</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#6b21a8', lineHeight: '1.8' }}>
              <strong>HTML에서 나중에 작성된 요소가 위에 표시됩니다.</strong><br/>
              → "나중에 그려진 것이 위에"
            </p>
          </div>

          <div style={{ background: '#1e293b', padding: '1.2rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.6' }}>
{`<div class="nav" style="z-index: 100"></div>
<div class="header" style="z-index: 100"></div>

<!-- 둘 다 z-index: 100 -->
<!-- HTML에서 header가 nav 뒤에 있음 -->
<!-- 결과: header가 nav 위에 표시됨! -->`}
            </pre>
          </div>

          <div style={{ background: '#fef3c7', padding: '1.2rem', borderRadius: '8px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>🔍 실제 예시: 네비게이션 vs 헤더 Search</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#78350f', lineHeight: '1.8', fontSize: '0.9rem' }}>
              이 프로젝트에서 네비게이션과 헤더 search가 처음에 둘 다 <code>z-index: 100</code>이었습니다.<br/>
              → HTML에서 헤더가 나중에 렌더링되므로 헤더가 네비게이션 위에 표시됨<br/>
              → 네비게이션을 호버로 확장하면 헤더에 가려짐!<br/><br/>
              <strong style={{ color: '#dc2626' }}>해결:</strong> 네비게이션의 z-index를 200으로 높임
            </p>
          </div>

          <div style={{ marginTop: '1rem', background: '#dbeafe', padding: '1.2rem', borderRadius: '8px' }}>
            <strong style={{ color: '#1e40af' }}>📝 정리</strong>
            <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1.5rem', color: '#1e40af', lineHeight: '1.8', fontSize: '0.9rem' }}>
              <li><strong>z-index가 다르면</strong>: 더 큰 숫자가 위</li>
              <li><strong>z-index가 같으면</strong>: HTML에서 나중에 쓴 것이 위</li>
              <li><strong>z-index가 없으면</strong>: position이 있는 요소가 static보다 위, 같으면 HTML 순서</li>
            </ol>
          </div>
        </div>

        {/* 중요한 오해 바로잡기 */}
        <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #ef4444', marginBottom: '2rem' }}>
          <h4 style={{ marginTop: 0, color: '#991b1b' }}>⚠️ 중요한 오해 바로잡기</h4>

          <div style={{ color: '#b91c1c', lineHeight: '1.8' }}>
            <strong style={{ fontSize: '1.05rem' }}>Q: isolation: isolate를 하면 무조건 상단에 보이나요?</strong><br />
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '8px', marginTop: '0.8rem', marginBottom: '0.8rem' }}>
              <strong>A: 아닙니다! ❌</strong><br /><br />

              isolation: isolate는 <strong>"건물을 밀폐"</strong>하는 것이지, <strong>건물을 앞으로 이동</strong>시키는 게 아닙니다.
            </div>

            <strong style={{ display: 'block', marginTop: '1.5rem', marginBottom: '0.5rem' }}>🏗️ 건물의 앞뒤 순서는 어떻게 결정되나요?</strong>

            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.9' }}>
              <li>
                <strong>HTML 순서</strong> (기본)<br />
                → 나중에 쓴 요소가 앞에 보임<br />
                → 코드에서 아래에 있는 div가 위에 있는 div를 덮음
              </li>
              <li>
                <strong>부모 요소의 z-index</strong><br />
                → 부모에 z-index가 있으면 그게 우선<br />
                → 부모 A (z-index: 1) vs 부모 B (z-index: 2) → B가 위
              </li>
              <li>
                <strong>position 속성</strong><br />
                → position이 있는 요소가 static보다 위<br />
                → relative/absolute/fixed/sticky가 static을 덮음
              </li>
            </ol>

            <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <strong>💡 핵심 정리:</strong><br /><br />

              <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 6px', borderRadius: '3px' }}>isolation: isolate</code>의 역할:<br />
              ✅ 자식 요소가 부모 밖으로 "탈출" 못하게 막음<br />
              ✅ 내부 z-index를 외부와 완전히 분리<br />
              ❌ 부모 요소를 앞으로 이동시키지 않음<br />
              ❌ z-index를 자동으로 높이지 않음
            </div>
          </div>
        </div>

        <div className="section-description">
          <p>
            단순히 <code>z-index</code> 숫자만 높인다고 해결되지 않는 이유, 바로 <strong>쌓임 맥락</strong> 때문입니다.
            모든 요소는 자신만의 계층(Layer)에 갇혀 있으며, 부모의 계층을 뛰어넘을 수 없습니다.
          </p>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff7ed', borderRadius: '12px', border: '1px solid #fed7aa' }}>
            <h3 style={{ marginTop: 0, color: '#9a3412' }}>🔥 Stacking Context를 생성하는 CSS 속성들</h3>
            <p style={{ color: '#c2410c', marginBottom: '1rem' }}>
              다음 속성들 중 <strong>하나라도 사용하면</strong> 새로운 Stacking Context가 자동으로 생성됩니다:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ color: '#ea580c', display: 'block', marginBottom: '0.5rem' }}>가장 흔한 경우</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.9rem', color: '#9a3412' }}>
                  <li><code>position: fixed</code> 또는 <code>sticky</code></li>
                  <li><code>position: relative/absolute</code> + <code>z-index ≠ auto</code></li>
                  <li><code>transform ≠ none</code> ⭐ transform 사용 시!</li>
                  <li><code>filter ≠ none</code> ⭐ filter 사용 시!</li>
                  <li><code>opacity {'<'} 1</code></li>
                </ul>
              </div>

              <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
                <strong style={{ color: '#ea580c', display: 'block', marginBottom: '0.5rem' }}>현대 CSS</strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: '1.8', fontSize: '0.9rem', color: '#9a3412' }}>
                  <li><code>isolation: isolate</code> ⭐ 명시적!</li>
                  <li><code>will-change: transform/opacity</code></li>
                  <li><code>contain: layout/paint</code></li>
                  <li>Flexbox/Grid 자식에 <code>z-index ≠ auto</code></li>
                </ul>
              </div>
            </div>

            <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '8px', border: '1px solid #f59e0b' }}>
              <strong style={{ color: '#92400e' }}>⚠️ 실무에서 가장 자주 만나는 함정:</strong>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#78350f', lineHeight: '1.8' }}>
                <li>
                  <strong>애니메이션에 transform 사용</strong> → 자동으로 Stacking Context 생성<br />
                  <small style={{ color: '#a16207' }}>예: <code>transform: translateX(0)</code>만 써도 새 레이어 생김!</small>
                </li>
                <li>
                  <strong>이미지 필터 효과</strong> → filter 사용 시 자동 생성<br />
                  <small style={{ color: '#a16207' }}>예: <code>filter: blur(5px)</code>, <code>filter: drop-shadow()</code></small>
                </li>
                <li>
                  <strong>투명도 조절</strong> → opacity {'<'} 1이면 생성<br />
                  <small style={{ color: '#a16207' }}>예: <code>opacity: 0.99</code>만 써도 새 레이어!</small>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #0ea5e9' }}>
            <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>🎯 실제 사례: Fixed Position의 함정</h4>
            <p style={{ color: '#075985', lineHeight: '1.7' }}>
              PositionStudy에서 본 것처럼, 부모에 <code>transform</code>이나 <code>filter</code>가 있으면:
            </p>
            <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#075985', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li>부모가 새로운 Stacking Context를 생성합니다</li>
              <li>자식의 <code>position: fixed</code>가 뷰포트가 아닌 <strong>부모를 기준</strong>으로 동작합니다</li>
              <li>모달이 전체 화면을 덮지 못하고 부모 박스 안에 갇혀버립니다</li>
            </ol>
            <p style={{ marginTop: '1rem', marginBottom: 0, color: '#0c4a6e', fontSize: '0.9rem' }}>
              <strong>해결책:</strong> 모달을 DOM 구조상 바깥으로 빼거나 (React Portal), 부모의 transform/filter를 제거해야 합니다.
            </p>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Parent Isolation',
              type: 'radio',
              value: isolationMode,
              onChange: setIsolationMode,
              options: [
                { value: 'auto', label: 'Default (Mixed)' },
                { value: 'isolate', label: 'isolation: isolate' }
              ]
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="stacking-context-deep"
          previewHeight="450px"
          codeHeight="600px"
          initialCss={`.parent {
  position: relative;
  background: #f1f5f9;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 20px;
  /* isolation 속성은 새로운 쌓임 맥락을 생성하는 가장 깨끗한 방법입니다 */
  isolation: ${isolationMode}; 
  color: #0c4a6e;
  min-height: 150px;
}

.child-999 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background: #ef4444;
  color: white;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
  font-weight: bold;
  font-size: 1.1rem;
}

.outside-10 {
  position: relative;
  z-index: 10;
  background: #3b82f6;
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin-top: -100px;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  font-weight: bold;
  font-size: 1.1rem;
}

.label { font-weight: bold; margin-bottom: 5px; }`}
          currentCss={`.parent {
  position: relative;
  background: #f1f5f9;
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 20px;
  /* isolation 속성은 새로운 쌓임 맥락을 생성하는 가장 깨끗한 방법입니다 */
  isolation: ${isolationMode}; 
  color: #0c4a6e;
  min-height: 150px;
}

.child-999 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background: #ef4444;
  color: white;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
  font-weight: bold;
  font-size: 1.1rem;
}

.outside-10 {
  position: relative;
  z-index: 10;
  background: #3b82f6;
  color: white;
  padding: 40px;
  border-radius: 12px;
  margin-top: -100px;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  font-weight: bold;
  font-size: 1.1rem;
}

.label { font-weight: bold; margin-bottom: 5px; }`}
          initialHtml={`<div class="parent">
  <div class="label">Parent Section</div>
  <div class="child-999">🔴 z-index: 999</div>
  <p>내부 자식은 999라는 큰 숫자를 가졌습니다.</p>
</div>

<div class="outside-10">
  <div class="label">🔵 Outside Box - z-index: 10</div>
  <p>나는 고작 10이지만, isolation 모드에 따라 999 위에 올라갈 수 있습니다!</p>
</div>

<div class="info-box" style="margin-top: 2rem;">
  <strong>🎯 실습 가이드:</strong><br/><br/>
  <strong>1️⃣ Default (Mixed):</strong><br/>
  → 부모가 Stacking Context를 만들지 않음<br/>
  → 🔴 빨간 박스(z-index: 999)가 🔵 파란 박스(z-index: 10) <strong>위에</strong> 표시됨<br/><br/>
  
  <strong>2️⃣ isolation: isolate:</strong><br/>
  → 부모가 새로운 Stacking Context 생성<br/>
  → 🔴 빨간 박스는 부모 안에 갇힘<br/>
  → 🔵 파란 박스가 🔴 빨간 박스 <strong>위에</strong> 표시됨 (999 > 10인데도!)
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Cascading Layers (@layer) */}
      <CollapsibleSection title="Cascading Layers (@layer)">
        <div className="section-description">
          <p>
            <code>@layer</code>는 명시도(Specificity) 전쟁을 끝내기 위해 등장한 최신 기능입니다.
            코드의 위치나 선택자의 복잡도와 상관없이, <strong>레이어 선언 순서</strong>에 따라 우선순위가 결정됩니다.
          </p>

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#d1fae5', borderRadius: '8px', border: '2px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>✅ 정상 작동 확인 포인트:</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#047857', lineHeight: '1.8' }}>
              <li>버튼 배경색이 <strong style={{ color: '#10b981' }}>초록색 (#10b981)</strong>이면 @layer가 작동하는 것!</li>
              <li>빨간색이면 @layer가 작동하지 않는 것 (구형 브라우저)</li>
              <li>호버하면 <strong style={{ color: '#3b82f6' }}>파란색 (#3b82f6)</strong>으로 변경됨</li>
            </ul>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="cascade-layers"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`/* 🎯 레이어 순서 정의 */
/* base → theme → custom (뒤에 선언된 레이어가 이김!) */
@layer base, theme, custom;

/* ❌ base 레이어 (가장 먼저 선언됨 = 가장 낮은 우선순위) */
@layer base {
  /* ID 선택자 = 높은 명시도! */
  /* 하지만 base 레이어이므로 theme에게 집니다 */
  #layered-btn {
    background: #ef4444; /* 빨간색 - 적용 안 됨! */
    padding: 50px;
  }
}

/* ✅ theme 레이어 (두 번째 = 중간 우선순위) */
@layer theme {
  /* 클래스 선택자 = 낮은 명시도 */
  /* 하지만 theme 레이어가 base보다 늦게 선언되어 이김! */
  .layer-btn {
    background: #10b981; /* 초록색 - 이것이 적용됨! */
    color: white;
    padding: 16px 32px;
    border: none;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: bold;
  }
}

/* 🎨 custom 레이어 (마지막 = 가장 높은 우선순위) */
@layer custom {
  .layer-btn:hover {
    background: #3b82f6; /* 파란색 - 호버 시 적용 */
    transform: scale(1.05);
  }
}

.layer-btn { 
  transition: all 0.3s; 
  cursor: pointer; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`}
          initialHtml={`<div style="background: #f8fafc; padding: 2rem; border-radius: 12px; text-align: center;">
  <h3 style="margin: 0 0 1.5rem; color: #1e293b;">@layer 우선순위 테스트</h3>
  
  <button id="layered-btn" class="layer-btn">
    마우스를 올려보세요!
  </button>
  
  <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: left;">
    <div style="padding: 1rem; background: #fef2f2; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #b91c1c;">base 레이어</strong>
      <p style="margin: 0.25rem 0 0; font-size: 0.85rem; color: #991b1b;">
        빨간색 (#ef4444)<br/>
        ID 선택자 사용<br/>
        <em>❌ 적용 안 됨!</em>
      </p>
    </div>
    
    <div style="padding: 1rem; background: #d1fae5; border-radius: 8px; border-left: 4px solid #10b981;">
      <strong style="color: #065f46;">theme 레이어</strong>
      <p style="margin: 0.25rem 0 0; font-size: 0.85rem; color: #047857;">
        초록색 (#10b981)<br/>
        클래스 선택자<br/>
        <em>✅ 이것이 적용됨!</em>
      </p>
    </div>
    
    <div style="padding: 1rem; background: #dbeafe; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <strong style="color: #1e40af;">custom 레이어</strong>
      <p style="margin: 0.25rem 0 0; font-size: 0.85rem; color: #1d4ed8;">
        파란색 (#3b82f6)<br/>
        :hover 상태<br/>
        <em>🎯 호버 시 적용!</em>
      </p>
    </div>
  </div>
</div>

<div class="info-box" style="margin-top: 1.5rem;">
  <strong>💡 핵심 포인트:</strong><br/>
  • ID 선택자(#layered-btn)가 클래스(.layer-btn)보다 명시도가 높지만...<br/>
  • <code>@layer base, theme, custom</code>에서 <strong>theme이 base보다 뒤에 선언</strong>되었으므로 theme이 이김!<br/>
  • 레이어 순서가 명시도(Specificity)보다 우선합니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 이론 및 가이드 섹션: Z-index 관리 가이드 */}
      <CollapsibleSection title="Z-index를 대하는 올바른 자세">
        <div className="section-description">
          <p>숫자를 무작정 키우는 대신, 시스템으로 관리하세요.</p>
          <div className="concept-box" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>✅ <strong>의미 있는 상수 사용</strong>: <code>z-index: 9999</code> 대신 <code>var(--z-modal)</code> 사용</li>
              <li>✅ <strong>낮은 숫자 유지</strong>: 1, 10, 20 정도로도 충분합니다.</li>
              <li>✅ <strong>isolation 사용</strong>: 컴포넌트 단위로 맥락을 끊어주어 외부 영향을 차단하세요.</li>
              <li>✅ <strong>컴포넌트 바깥으로 빼기</strong>: 모달처럼 무조건 위에 있어야 하면 DOM 구조상 <code>body</code> 바로 아래에 위치시키는 것이 가장 안전합니다.</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 실무 예제 섹션: 모달 및 드롭다운의 Z-index 시스템화 */}
      <CollapsibleSection title="실전 예제: 모달 & 드롭다운 계층 관리">
        <p className="section-description">
          시스템화된 Z-index와 <code>isolation</code>을 활용하여 복잡한 레이어 간의 충돌을 방지하는 구조입니다.
        </p>

        <LiveCodeEditor
          scopeId="stacking-practical-system"
          previewHeight="500px"
          codeHeight="550px"
          initialCss={`:root {
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal: 500;
  --z-toast: 1000;
}

.app-shell {
  height: 300px;
  background: white;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sticky-header {
  height: 60px;
  background: #f8fafc;
  border-bottom: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
}

.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 150px;
  background: white;
  border: 1px solid #cbd5e1;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 10px;
  z-index: var(--z-dropdown);
  display: block; /* 실습을 위해 항상 노출 */
}

/* 모달 레이어 */
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 80%;
}
`}
          initialHtml={`<div class="app-shell">
  <header class="sticky-header">
    <div class="dropdown-container">
      <strong>Navigation</strong>
      <div class="dropdown-menu">
        Menu Items...
      </div>
    </div>
  </header>
  
  <div style="padding: 20px;">
    Main content area with lots of text...
  </div>

  <div class="modal-overlay">
    <div class="modal-content">
      <h3>Modal Title</h3>
      <p>모달은 헤더(200)와 드롭다운(100)보다 높은 z-index(500)를 가져야 합니다.</p>
    </div>
  </div>
</div>

<div style="margin-top: 1.5rem; color: #1e293b; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.9rem;">
  <strong>💡 시스템 관리 전략:</strong><br/>
  • <strong>z-index 상수화</strong>: 숫자를 직접 쓰지 말고 <code>--z-sticky</code>처럼 변수로 관리하세요.<br/>
  • <strong>간격 유지</strong>: 1, 2, 3 대신 100, 200, 500처럼 간격을 두면 나중에 사이에 새로운 레이어를 넣기 좋습니다.
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default StackingStudy;
