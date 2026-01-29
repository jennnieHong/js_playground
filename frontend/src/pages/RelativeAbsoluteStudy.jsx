/**
 * RelativeAbsoluteStudy 페이지 컴포넌트
 * CSS의 relative와 absolute 포지셔닝의 관계와 사용 의도를 학습하는 페이지입니다.
 * 주요 개념: 부모-자식 관계, 독립적 사용, 실무 활용 사례
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function RelativeAbsoluteStudy() {
  // 상태 관리
  const [parentPosition, setParentPosition] = useState('relative');
  const [relativeOffset, setRelativeOffset] = useState('0');

  return (
    <div className="page-container">
      <PageHeader
        title="Relative & Absolute 관계"
        subtitle="부모-자식 패턴, 독립 사용, 실무 활용 완벽 가이드"
      />

      {/* 섹션 1: 핵심 개념 정리 */}
      <CollapsibleSection title="🎯 핵심 개념: Relative vs Absolute">
        <div className="section-description">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #0ea5e9' }}>
              <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>📍 position: relative</h4>
              <ul style={{ marginBottom: 0, color: '#075985', lineHeight: '1.8', fontSize: '0.95rem' }}>
                <li><strong>기준점:</strong> 자기 자신의 원래 위치</li>
                <li><strong>문서 흐름:</strong> 유지됨 (원래 자리를 차지)</li>
                <li><strong>주요 역할 2가지:</strong>
                  <ol style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    <li>자신을 살짝 이동시키기 (top/left 등)</li>
                    <li><strong>absolute 자식의 기준점</strong> 역할</li>
                  </ol>
                </li>
              </ul>
            </div>
            
            <div style={{ padding: '1.5rem', background: '#fff7ed', borderRadius: '12px', border: '1px solid #fb923c' }}>
              <h4 style={{ marginTop: 0, color: '#9a3412' }}>📍 position: absolute</h4>
              <ul style={{ marginBottom: 0, color: '#c2410c', lineHeight: '1.8', fontSize: '0.95rem' }}>
                <li><strong>기준점:</strong> 가장 가까운 positioned 조상 (static이 아닌)</li>
                <li><strong>문서 흐름:</strong> 이탈 (원래 자리를 비움)</li>
                <li><strong>핵심 동작:</strong>
                  <ul style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    <li>positioned 부모가 있으면 → 그 부모 기준</li>
                    <li>positioned 부모가 없으면 → 뷰포트(body) 기준</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>💡 "positioned"란?</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7' }}>
              <code>position: static</code>이 아닌 모든 요소를 말합니다.<br />
              즉, <code>relative</code>, <code>absolute</code>, <code>fixed</code>, <code>sticky</code> 중 하나가 설정된 요소입니다.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: 부모-자식 관계 패턴 */}
      <CollapsibleSection title="👨‍👦 패턴 1: 부모-자식 관계 (가장 흔한 패턴)">
        <div className="section-description">
          <p>
            <strong>실무에서 90% 이상</strong> 이 패턴으로 사용합니다!<br />
            부모에게 <code>relative</code>, 자식에게 <code>absolute</code>를 주면
            자식은 <strong>부모 영역 안에서</strong> 자유롭게 위치를 지정할 수 있습니다.
          </p>
          
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <strong style={{ color: '#0c4a6e' }}>🎯 이 패턴을 쓰는 이유</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#075985', lineHeight: '1.8' }}>
              <li>자식 요소가 부모를 벗어나지 않게 "가두기"</li>
              <li>부모 위치가 바뀌어도 자식이 자동으로 따라감</li>
              <li>여러 개의 자식을 부모 기준으로 각각 배치 가능</li>
            </ul>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Parent Position',
              type: 'radio',
              value: parentPosition,
              onChange: setParentPosition,
              options: ['static', 'relative']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="parent-child-demo"
          previewHeight="400px"
          codeHeight="500px"
          initialCss={`.container {
  display: flex;
  gap: 2rem;
  padding: 1rem;
}

.parent {
  position: ${parentPosition};
  width: 250px;
  height: 200px;
  background: #e2e8f0;
  border: 3px dashed #94a3b8;
  border-radius: 12px;
  padding: 1rem;
  font-weight: 600;
  color: #475569;
}

/* 뱃지: 부모의 오른쪽 위 */
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ef4444;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

/* 라벨: 부모의 왼쪽 아래 */
.label {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

/* 아이콘: 부모의 중앙 */
.center-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
}`}
          currentCss={`.container {
  display: flex;
  gap: 2rem;
  padding: 1rem;
}

.parent {
  position: ${parentPosition};
  width: 250px;
  height: 200px;
  background: #e2e8f0;
  border: 3px dashed #94a3b8;
  border-radius: 12px;
  padding: 1rem;
  font-weight: 600;
  color: #475569;
}

/* 뱃지: 부모의 오른쪽 위 */
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ef4444;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

/* 라벨: 부모의 왼쪽 아래 */
.label {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

/* 아이콘: 부모의 중앙 */
.center-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
}`}
          initialHtml={`<div class="container">
  <div class="parent">
    Parent (${parentPosition})
    <span class="badge">NEW</span>
    <span class="label">라벨</span>
    <span class="center-icon">⭐</span>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #fef3c7; border-radius: 8px; font-size: 0.9rem; color: #78350f; line-height: 1.7;">
  <strong>🧪 실험:</strong> Parent Position을 <strong>static</strong>으로 바꿔보세요!<br/>
  → absolute 자식들이 부모를 기준으로 하지 않고 <strong>뷰포트(화면) 기준</strong>으로 날아갑니다!<br/><br/>
  <strong>결론:</strong> absolute 자식을 "가두려면" 부모에게 반드시 relative (또는 다른 positioned 값)를 줘야 합니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: Relative 단독 사용 */}
      <CollapsibleSection title="📐 패턴 2: Relative 단독 사용 (살짝 이동)">
        <div className="section-description">
          <p>
            <code>relative</code>는 <strong>자기 자신의 원래 위치</strong>에서 살짝 이동할 때도 사용합니다.<br />
            문서 흐름에서 원래 자리는 그대로 차지하면서, 시각적으로만 이동합니다.
          </p>
          
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#ecfeff', borderRadius: '10px', border: '1px solid #06b6d4' }}>
            <strong style={{ color: '#0891b2' }}>🎯 이 패턴을 쓰는 경우</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#0e7490', lineHeight: '1.8' }}>
              <li>호버 시 요소를 살짝 위로 올리는 효과</li>
              <li>시각적 미세 조정 (다른 요소 레이아웃에 영향 없이)</li>
              <li>겹침 효과를 만들 때 (음수 margin과 함께)</li>
            </ul>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Relative Offset (top)',
              type: 'radio',
              value: relativeOffset,
              onChange: setRelativeOffset,
              options: ['0', '-10px', '-20px', '20px']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="relative-only"
          previewHeight="350px"
          codeHeight="400px"
          initialCss={`.box-container {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
}

.box {
  width: 100px;
  height: 100px;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.box.moved {
  position: relative;
  top: ${relativeOffset};
  background: #ef4444;
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
}

/* 호버 효과 예시 */
.hover-demo {
  transition: top 0.2s ease, box-shadow 0.2s ease;
}

.hover-demo:hover {
  position: relative;
  top: -8px;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}`}
          currentCss={`.box-container {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: #f8fafc;
  border-radius: 12px;
}

.box {
  width: 100px;
  height: 100px;
  background: #3b82f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.box.moved {
  position: relative;
  top: ${relativeOffset};
  background: #ef4444;
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
}

/* 호버 효과 예시 */
.hover-demo {
  transition: top 0.2s ease, box-shadow 0.2s ease;
}

.hover-demo:hover {
  position: relative;
  top: -8px;
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}`}
          initialHtml={`<div class="box-container">
  <div class="box">1</div>
  <div class="box moved">2 (relative)</div>
  <div class="box">3</div>
</div>

<div style="margin-top: 1.5rem;">
  <p style="margin-bottom: 0.5rem; font-weight: 600; color: #1e293b;">호버해보세요 (Hover Demo):</p>
  <div class="box-container">
    <div class="box hover-demo">Hover!</div>
    <div class="box hover-demo">Hover!</div>
    <div class="box hover-demo">Hover!</div>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; font-size: 0.9rem; color: #075985; line-height: 1.7;">
  <strong>💡 핵심 포인트:</strong><br/>
  • 빨간 박스(2번)가 이동해도 <strong>원래 자리는 그대로 차지</strong>합니다 (1번과 3번 사이 공간 유지)<br/>
  • top/left 값을 바꿔도 다른 요소들의 위치는 영향받지 않습니다
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: Absolute 단독 사용 (뷰포트 기준) */}
      <CollapsibleSection title="🌐 패턴 3: Absolute 단독 사용 (뷰포트 기준)">
        <div className="section-description">
          <p>
            positioned 부모가 없으면 <code>absolute</code>는 <strong>뷰포트(화면) 기준</strong>으로 배치됩니다.<br />
            이 패턴은 의도적으로 화면 전체에 요소를 배치할 때 사용합니다.
          </p>
          
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca' }}>
            <strong style={{ color: '#991b1b' }}>⚠️ 주의사항</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#b91c1c', lineHeight: '1.7' }}>
              이 패턴은 <strong>의도한 경우에만</strong> 사용해야 합니다.<br />
              실수로 부모에게 position을 안 주면 예상치 못한 곳에 요소가 나타납니다!
            </p>
          </div>

          <div style={{ marginTop: '1rem', padding: '1.2rem', background: '#d1fae5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <strong style={{ color: '#065f46' }}>🎯 이 패턴을 의도적으로 쓰는 경우</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#047857', lineHeight: '1.8' }}>
              <li>전체 화면을 덮는 모달 배경 (overlay)</li>
              <li>화면 구석에 고정된 "맨 위로" 버튼 (fixed와 비슷하지만 스크롤 시 사라짐)</li>
              <li>특정 컨테이너가 아닌 화면 기준 위치가 필요할 때</li>
            </ul>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="absolute-viewport"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.demo-viewport {
  position: relative; /* 데모용 컨테이너 */
  height: 350px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden; /* 밖으로 나가는 요소 숨김 */
}

/* 화면 전체 오버레이 */
.overlay {
  position: absolute;
  inset: 0; /* top/right/bottom/left 모두 0 */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 모달 박스 */
.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0,0,0,0.3);
}

.modal h3 {
  margin: 0 0 1rem 0;
  color: #1e293b;
}

.modal button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}`}
          initialHtml={`<div class="demo-viewport">
  <div class="overlay">
    <div class="modal">
      <h3>모달 예시</h3>
      <p>overlay가 inset: 0으로 전체를 덮습니다</p>
      <button>확인</button>
    </div>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #fef3c7; border-radius: 8px; font-size: 0.9rem; color: #78350f; line-height: 1.7;">
  <strong>코드 해석:</strong><br/>
  • <code>.overlay</code>는 <code>position: absolute; inset: 0;</code>으로 부모 전체를 덮습니다<br/>
  • <code>inset: 0</code>은 <code>top: 0; right: 0; bottom: 0; left: 0;</code>의 단축 속성입니다<br/>
  • 실제 모달에서는 body에 대한 absolute 또는 fixed를 사용합니다
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: 실무 활용 사례 모음 */}
      <CollapsibleSection title="💼 실무 활용 사례 모음">
        <div className="section-description">
          <p>실제 프로젝트에서 relative-absolute 패턴이 사용되는 대표적인 사례들입니다.</p>
        </div>

        <LiveCodeEditor
          scopeId="real-world-examples"
          previewHeight="550px"
          codeHeight="600px"
          initialCss={`.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* 1. 프로필 카드: 아바타 뱃지 */
.profile-card {
  position: relative;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.online-badge {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  background: #10b981;
  border: 3px solid white;
  border-radius: 50%;
}

/* 2. 상품 카드: 할인 라벨 */
.product-card {
  position: relative;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.product-image {
  height: 120px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.discount-label {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #ef4444;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}

.product-info {
  padding: 1rem;
}

/* 3. 입력 필드: 아이콘 */
.input-wrapper {
  position: relative;
  margin-top: 1rem;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #94a3b8;
}

.styled-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

/* 4. 툴팁 */
.tooltip-demo {
  position: relative;
  display: inline-block;
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
}

.tooltip-text {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  white-space: nowrap;
  margin-bottom: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1e293b;
}

.tooltip-demo:hover .tooltip-text {
  opacity: 1;
}`}
          initialHtml={`<div class="examples-grid">
  <!-- 1. 프로필 카드 -->
  <div class="profile-card">
    <div class="avatar-wrapper">
      <div class="avatar">👤</div>
      <span class="online-badge"></span>
    </div>
    <h4 style="margin: 1rem 0 0.5rem; color: #1e293b;">온라인 뱃지</h4>
    <p style="margin: 0; color: #64748b; font-size: 0.9rem;">아바타 우측 하단에 상태 표시</p>
  </div>

  <!-- 2. 상품 카드 -->
  <div class="product-card">
    <div class="product-image">🎁</div>
    <span class="discount-label">30% OFF</span>
    <div class="product-info">
      <h4 style="margin: 0 0 0.3rem; color: #1e293b;">할인 라벨</h4>
      <p style="margin: 0; color: #64748b; font-size: 0.85rem;">이미지 위에 라벨 배치</p>
    </div>
  </div>
</div>

<div style="padding: 1rem; margin-top: 1rem;">
  <!-- 3. 입력 필드 아이콘 -->
  <div class="input-wrapper">
    <span class="input-icon">🔍</span>
    <input type="text" class="styled-input" placeholder="아이콘이 있는 입력 필드..." />
  </div>

  <!-- 4. 툴팁 -->
  <div style="margin-top: 1.5rem; text-align: center;">
    <div class="tooltip-demo">
      <span class="tooltip-text">이것이 툴팁입니다!</span>
      마우스를 올려보세요
    </div>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #f0f9ff; border-radius: 8px; font-size: 0.9rem; color: #075985;">
  <strong>💡 공통점:</strong> 모두 <strong>부모: relative + 자식: absolute</strong> 패턴을 사용합니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 6: 요약 치트시트 */}
      <CollapsibleSection title="📋 요약 치트시트">
        <div className="section-description">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>✅ 이럴 때 relative</h4>
              <ol style={{ marginBottom: 0, color: '#0e7490', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
                <li><strong>absolute 자식의 기준점</strong>이 되어야 할 때</li>
                <li>요소를 <strong>살짝만 이동</strong>시키고 싶을 때</li>
                <li>레이아웃 흐름을 <strong>유지</strong>하면서 위치 조정</li>
              </ol>
            </div>

            <div style={{ padding: '1.5rem', background: '#fff7ed', borderRadius: '12px', border: '2px solid #fb923c' }}>
              <h4 style={{ marginTop: 0, color: '#c2410c' }}>✅ 이럴 때 absolute</h4>
              <ol style={{ marginBottom: 0, color: '#9a3412', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
                <li>부모 안에서 <strong>정확한 위치</strong>에 배치</li>
                <li>다른 요소들과 <strong>겹치게</strong> 배치</li>
                <li>뱃지, 라벨, 아이콘, 툴팁 등 <strong>장식 요소</strong></li>
              </ol>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fca5a5' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>❌ 흔한 실수</h4>
              <ol style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
                <li>부모에게 position 안 주고 absolute 사용 → 날아감!</li>
                <li>불필요한 absolute 남발 → 레이아웃 복잡</li>
                <li>flex/grid로 될 걸 absolute로 억지로 배치</li>
              </ol>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
            <h4 style={{ marginTop: 0, color: '#fbbf24' }}>🎯 황금 법칙</h4>
            <p style={{ marginBottom: 0, lineHeight: '1.8', fontSize: '1.1rem' }}>
              <strong>absolute를 쓸 때는 항상 "누구를 기준으로 할 것인가?"</strong>를 먼저 생각하세요!<br />
              그 기준이 되는 요소에 <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>position: relative</code>를 주면 됩니다.
            </p>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

export default RelativeAbsoluteStudy;
