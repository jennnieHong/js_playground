/**
 * PositionStudy 페이지 컴포넌트
 * CSS 포지셔닝(static, relative, absolute, fixed, sticky)을 학습하는 페이지입니다.
 * 주요 개념: 부모-자식 관계 제어, Fixed 트랩, Sticky 활용, 센터링 기법, 툴팁/뱃지 구현
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function PositionStudy() {
  // --- 상태 관리 (State Management) ---
  // 포지셔닝 속성값의 변화를 실시간으로 관찰하기 위한 상태들입니다.
  const [position, setPosition] = useState('absolute');
  const [top, setTop] = useState('10px');
  const [left, setLeft] = useState('10px');
  const [parentTransform, setParentTransform] = useState('none');

  return (
    <div className="page-container">
      {/* 페이지 헤더 영역 */}
      <PageHeader
        title="Position Study"
        subtitle="요소의 위치를 결정하는 Position 속성 정복하기"
      />

      {/* Position 속성 기초 정의 섹션 */}

      <CollapsibleSection title="Position 속성 이해하기">
        <div className="section-description">
          <p><code>position</code> 속성은 문서 상에서 요소가 배치되는 방식을 결정합니다.</p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>static</code>: 기본값. 일반적인 문서 흐름을 따릅니다. top/left 등이 적용되지 않습니다.</li>
            <li><code>relative</code>: 일반적인 흐름을 따르되, <strong>자기 자신의 원래 위치</strong>를 기준으로 이동합니다.</li>
            <li><code>absolute</code>: <strong>가장 가까운 포지셔닝 된 조상(static이 아닌 부모)</strong>을 기준으로 절대적인 위치에 배치됩니다. 조상이 없으면 문서(body) 기준입니다.</li>
            <li><code>fixed</code>: <strong>뷰포트(브라우저 창)</strong>를 기준으로 고정됩니다. 스크롤해도 따라다닙니다.</li>
            <li><code>sticky</code>: 스크롤에 따라 static과 fixed를 오갑니다.</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 실습 섹션: 부모-자식 관계 (Relative & Absolute 패턴) */}
      <CollapsibleSection title="Parent-Child 관계 (Relative vs Absolute)">
        <div className="section-description">
          <p>
            가장 많이 사용하는 패턴입니다. 부모에게 <code>relative</code>를 주고, 자식에게 <code>absolute</code>를 주면
            자식은 <strong>부모 안에서</strong> 자유롭게 위치를 잡을 수 있습니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>📍 실무에서 이 패턴을 언제 쓰나요?</h4>
            <ul style={{ marginBottom: 0, color: '#075985', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li>
                <strong>뱃지/라벨</strong> - 상품 카드 우측 상단에 "SALE", "NEW" 표시<br />
                <small style={{ color: '#0284c7' }}>예: 쇼핑몰 상품 썸네일에 할인율 표시</small>
              </li>
              <li>
                <strong>닫기 버튼</strong> - 모달이나 팝업 우측 상단 X 버튼<br />
                <small style={{ color: '#0284c7' }}>예: 이미지 갤러리, 알림 메시지</small>
              </li>
              <li>
                <strong>툴팁</strong> - 버튼/아이콘 위에 떠있는 설명<br />
                <small style={{ color: '#0284c7' }}>예: 아이콘에 마우스 오버 시 "저장하기" 텍스트 표시</small>
              </li>
              <li>
                <strong>오버레이 콘텐츠</strong> - 이미지 위에 텍스트나 버튼 배치<br />
                <small style={{ color: '#0284c7' }}>예: 카드 호버 시 "자세히 보기" 버튼</small>
              </li>
            </ul>
          </div>
        </div>

        <div className="info-box" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', marginTop: '1rem', marginBottom: '1rem' }}>
          <p style={{ margin: 0, lineHeight: '1.8' }}>
            <strong>⚡ 핵심 조건:</strong> <code>position: absolute</code>는 가장 가까운 <strong>positioned 조상</strong>(static이 아닌)을 기준으로 배치됩니다!<br />
            → 부모에 <code>position: relative</code>가 없으면 계속 위로 올라가 <code>body</code>까지 갑니다<br />
            → 의도한 부모를 기준으로 하려면 반드시 부모에 <code>position: relative</code> (또는 absolute, fixed) 설정 필수
          </p>
        </div>

        <LiveCodeEditor
          scopeId="pos-parent-child"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.parent {
  position: relative; /* 기준점 역할 */
  width: 300px;
  height: 200px;
  background-color: #e2e8f0;
  border: 2px dashed #94a3b8;
  margin: 20px 0;
}

.child {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 80px;
  height: 80px;
  background-color: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`}
          initialHtml={`<div class="parent">
  Parent (relative)
  <div class="child">Child (absolute)</div>
</div>`}
        />
      </CollapsibleSection>

      {/* 새 섹션: 현대적인 위치 지정 shorthand - inset */}
      <CollapsibleSection title="Modern Shorthand: inset">
        <div className="section-description">
          <p>
            <code>inset</code>은 <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>를 한 줄로 선언할 수 있는 현대적인 단축 속성입니다.
            단순히 코드가 짧아지는 것에 그치지 않고, <strong>"부모 영역을 정확히 덮는 자식"</strong>을 만들 때 표준처럼 사용됩니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ marginTop: 0, color: '#0f172a', fontSize: '1rem' }}>🎯 주요 활용 사례</h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>
                <li><strong>모달 배경</strong>: 전체 화면을 어둡게 덮을 때</li>
                <li><strong>카드 오버레이</strong>: 이미지 위에 호버 시 나타나는 텍스트 배경</li>
                <li><strong>전체 클릭 레이어</strong>: 부모 전체를 클릭 가능하게 만들 때</li>
                <li><strong>로딩 마스크</strong>: 특정 영역을 흐리게 덮고 로딩바를 띄울 때</li>
              </ul>
            </div>
            <div style={{ background: '#fff7ed', padding: '1.2rem', borderRadius: '10px', border: '1px solid #fed7aa' }}>
              <h4 style={{ marginTop: 0, color: '#9a3412', fontSize: '1rem' }}>⚠️ 필수 조건 & 꿀조합</h4>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#9a3412', lineHeight: '1.7' }}>
                <li><strong>포지션 필수</strong>: <code>static</code>이 아닌 포지션(absolute, fixed 등)과 함께 써야 합니다.</li>
                <li><strong>중앙 정렬 콤보</strong>: <code>inset: 0</code> + <code>margin: auto</code> (자식 크기가 정해져 있을 때)</li>
                <li><strong>레이아웃 콤보</strong>: <code>inset: 0</code> + <code>display: flex</code> (내부 콘텐츠 정렬 시)</li>
              </ul>
            </div>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="pos-inset"
          previewHeight="350px"
          codeHeight="400px"
          initialCss={`.card {
  position: relative;
  width: 280px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background: url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400') center/cover;
}

/* 🖼️ 이미지 위에 씌우는 오버레이 */
.card-overlay {
  position: absolute;
  /* 🔍 inset: 0 으로 부모 박스를 100% 덮습니다 */
  inset: 0; 
  
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  color: white;
  opacity: 0; /* 평소엔 숨김 */
  transition: opacity 0.3s ease;
}

.card:hover .card-overlay {
  opacity: 1; /* 호버 시 나타남 */
}

.card-title { font-weight: 800; font-size: 1.2rem; margin: 0; }
.card-desc { font-size: 0.8rem; margin-top: 0.5rem; color: #cbd5e1; }`}
          initialHtml={`<div class="card">
  <div class="card-overlay">
    <h3 class="card-title">Nike Air Max</h3>
    <p class="card-desc">격렬한 운동에도 견디는 극강의 쿠셔닝</p>
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #f1f5f9; border-radius: 8px; font-size: 0.9rem; color: #475569;">
  💡 <strong>실습:</strong> 위 이미지에 마우스를 올려보세요.<br/>
  <code>inset: 0</code>으로 만든 오버레이가 부모 카드 영역을 빈틈없이 덮는 것을 확인할 수 있습니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Fixed Position (화면 고정) */}
      <CollapsibleSection title="Fixed Position (고정 위치)">
        <div className="section-description">
          <p>
            스크롤을 해도 화면의 특정 위치에 고정되어 있는 요소입니다. (예: 네비게이션 바, '맨 위로' 버튼, 모달 등)
            <br />
            아래 예제에서 <strong>Position</strong>을 <code>fixed</code>로 바꾸고 화면을 스크롤해보세요!
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <h4 style={{ marginTop: 0, color: '#065f46' }}>💡 Fixed vs Absolute 차이점</h4>
            <div style={{ color: '#047857', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>absolute:</strong>
              • 가장 가까운 positioned 부모를 기준으로 배치<br />
              • 부모와 함께 스크롤됨<br />
              • 부모 영역 안에서만 움직임<br /><br />

              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>fixed:</strong>
              • 항상 뷰포트(브라우저 창)를 기준으로 배치<br />
              • 스크롤해도 화면의 같은 위치에 고정<br />
              • 부모와 무관하게 항상 보임<br />
            </div>
            <p style={{ marginTop: '1rem', marginBottom: 0, color: '#059669', fontSize: '0.9rem' }}>
              <strong>실무 팁:</strong> Fixed는 헤더, 채팅 버튼, 쿠키 동의 배너처럼 "항상 보여야 하는" 요소에 사용합니다.
            </p>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'position',
              type: 'radio',
              value: position,
              onChange: setPosition,
              options: ['static', 'absolute', 'fixed']
            },
            {
              name: 'top',
              type: 'radio',
              value: top,
              onChange: setTop,
              options: ['auto', '10px', '50%', '100px']
            },
            {
              name: 'left',
              type: 'radio',
              value: left,
              onChange: setLeft,
              options: ['auto', '10px', '50%', '100px']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="pos-fixed"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.fixed-demo-box {
  position: ${position};
  top: ${top};
  left: ${left};
  width: 120px;
  height: 60px;
  background-color: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;
}`}
          currentCss={`.fixed-demo-box {
  position: ${position};
  top: ${top};
  left: ${left};
  width: 120px;
  height: 60px;
  background-color: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  z-index: 1000;
  transition: all 0.3s ease;
}`}
          initialHtml={`<div style="min-height: 300px; padding: 20px; border: 1px solid #ddd; background: #f8fafc; position: relative;">
  <p style="margin-top: 0; color: #475569; font-size: 0.9rem;">
    <strong>🎯 테스트 방법:</strong><br/>
    1. Position을 <code>fixed</code>로 변경<br/>
    2. 프리뷰 영역을 스크롤하면서 빨간 박스가 화면에 고정되는지 확인
  </p>
  <div style="height: 700px; background: linear-gradient(to bottom, #dbeafe, #bfdbfe, #93c5fd); padding: 20px; margin-top: 20px; border-radius: 8px;">
    <p style="color: #1e40af; font-weight: 600;">⬇️ 아래로 스크롤하세요</p>
    <div style="height: 100px;"></div>
    <p style="color: #1e40af;">스크롤 중...</p>
    <div style="height: 100px;"></div>
    <p style="color: #1e40af;">계속 스크롤...</p>
    <div style="height: 100px;"></div>
    <p style="color: #1e40af; font-weight: 600;">🔥 fixed로 설정하면 빨간 박스가 스크롤해도 계속 같은 위치에!</p>
  </div>
  <div class="fixed-demo-box">
    📍 Demo Box
  </div>
</div>`}
        />
      </CollapsibleSection>


      {/* 실무 응용 섹션: 모달 오버레이 (Fixed 활용) */}
      <CollapsibleSection title="실전 예제: Modal Overlay (딤드 처리)">
        <div className="section-description">
          <p>
            <code>fixed</code>는 팝업창(모달) 뒤에 깔리는 <strong>어두운 배경(Overlay)</strong>을 만들 때 필수적입니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #10b981' }}>
            <h4 style={{ marginTop: 0, color: '#065f46' }}>🎨 모달의 구조 이해하기</h4>
            <div style={{ color: '#047857', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <strong>1층 (Overlay):</strong> 전체 화면을 덮는 반투명 검은 배경<br />
              → <code>position: fixed</code> + <code>inset: 0</code> + <code>z-index: 100</code><br />
              → 클릭하면 모달 닫기 (배경 클릭 감지)<br /><br />

              <strong>2층 (Modal Content):</strong> 실제 팝업 내용<br />
              → Overlay 위에 <code>z-index</code>로 쌓임<br />
              → 중앙 정렬은 Overlay에 <code>display: flex</code> 사용
            </div>
          </div>

          <div className="info-box" style={{ marginTop: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <strong>💡 Pro의 팁 (inset: 0):</strong><br />
            과거에는 <code>top: 0; left: 0; width: 100%; height: 100%</code>를 썼지만,<br />
            요즘은 <code>inset: 0</code> 하나로 화면 전체를 덮는 것이 정석입니다.
          </div>
        </div>
        <LiveCodeEditor
          scopeId="pos-modal"
          previewHeight="300px"
          codeHeight="450px"
          initialCss={`.page-content {
  padding: 20px;
  height: 600px; /* 스크롤 생성용 */
  background: linear-gradient(to bottom, #fff, #f0f0f0);
  color: #1e293b; /* 텍스트 색상 추가 */
}

/* 검은색 반투명 오버레이 */
.modal-overlay {
  position: fixed;
  inset: 0; /* top/right/bottom/left: 0 과 동일 */
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100; /* 콘텐츠보다 위에 배치 */
  
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  text-align: center;
}

.close-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #fa5252;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`}
          initialHtml={`<div class="page-content">
  <h2>메인 페이지 콘텐츠</h2>
  <p>스크롤을 해보세요. 오버레이가 계속 화면을 덮고 있습니다.</p>
  <p>배경 콘텐츠 1...</p>
  <p>배경 콘텐츠 2...</p>
  <p>배경 콘텐츠 3...</p>

  <!-- 오버레이 + 모달 -->
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>⚠️ 알림</h3>
      <p>이것이 Fixed Position을 활용한 모달입니다.</p>
      <button class="close-btn">닫기 (예시)</button>
    </div>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 플로팅 버튼 (Fixed 활용) */}
      <CollapsibleSection title="실전 예제: Floating Action Button (FAB)">
        <div className="section-description">
          <p>
            화면 우측 하단에 항상 떠 있는 <strong>채팅 버튼</strong>이나 <strong>맨 위로 가기</strong> 버튼도 <code>fixed</code>를 사용합니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <h4 style={{ marginTop: 0, color: '#92400e' }}>📍 FAB 배치 공식</h4>
            <div style={{ color: '#78350f', lineHeight: '1.8', fontSize: '0.95rem', fontFamily: 'monospace' }}>
              position: fixed;<br />
              bottom: 2rem;  <small style={{ fontFamily: 'sans-serif', color: '#a16207' }}>← 하단에서 얼마나 띄울지</small><br />
              right: 2rem;   <small style={{ fontFamily: 'sans-serif', color: '#a16207' }}>← 우측에서 얼마나 띄울지</small><br />
              z-index: 50;   <small style={{ fontFamily: 'sans-serif', color: '#a16207' }}>← 다른 요소 위에 표시</small>
            </div>
            <p style={{ marginTop: '1rem', marginBottom: 0, color: '#92400e', fontSize: '0.9rem' }}>
              <strong>실전 팁:</strong> 모바일에서는 <code>bottom: 20px</code> 정도로 조금만 띄워서 엄지손가락이 닿기 쉽게 만듭니다!
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="pos-fab"
          previewHeight="300px"
          codeHeight="350px"
          initialCss={`.fab-container {
  height: 800px;
  padding: 20px;
  background-color: #f8f9fa;
  position: relative;
  color: #3b82f6;
}

.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
  font-size: 24px;
  cursor: pointer;
  z-index: 50;
  
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.fab:hover {
  transform: scale(1.1);
  background-color: #2563eb;
}`}
          initialHtml={`<div class="fab-container">
  <h3>긴 문서 예시</h3>
  <p>스크롤을 계속 내려보세요.</p>
  <p>우측 하단의 + 버튼이 계속 따라옵니다.</p>
  <div style="height: 100px; background: #e2e8f0; margin: 10px 0;">Content Block 1</div>
  <div style="height: 100px; background: #cbd5e1; margin: 10px 0;">Content Block 2</div>
  <div style="height: 100px; background: #94a3b8; margin: 10px 0;">Content Block 3</div>
  <div style="height: 100px; background: #64748b; margin: 10px 0;">Content Block 4</div>
  
  <!-- Floating Action Button -->
  <button class="fab">+</button>
</div>`}
        />
      </CollapsibleSection>


      {/* 주의 사항 센션: Fixed 포지션의 함정 (The Trap) */}
      <CollapsibleSection title="주의: Fixed와 부모의 관계 (The Trap)">
        <div className="section-description">
          <p>
            보통 <code>fixed</code> 요소는 부모를 무시하고 <strong>뷰포트(브라우저 창)</strong>를 기준으로 배치됩니다.<br />
            하지만 <strong>예외</strong>가 있습니다! 부모 요소에 <code>transform</code>, <code>perspective</code>, <code>filter</code> 속성이 하나라도 적용되면,
            <strong>그 부모가 새로운 기준점(Containing Block)</strong>이 되어버립니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fff7ed', borderRadius: '10px', border: '1px solid #fed7aa' }}>
            <h4 style={{ marginTop: 0, color: '#9a3412' }}>⚠️ 왜 이런 함정이 생겼을까?</h4>
            <p style={{ color: '#c2410c', lineHeight: '1.7', marginBottom: '1rem' }}>
              <code>transform</code>, <code>filter</code> 같은 속성들은 <strong>새로운 레이어(Stacking Context)</strong>를 만들어냅니다.
              이 레이어 안에서는 fixed 요소도 "독립된 세계"에 갇히게 되어 전체 화면이 아닌 부모 기준으로 동작합니다.
            </p>
            <ul style={{ marginBottom: 0, color: '#c2410c', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li>
                <strong>문제 상황:</strong> 애니메이션으로 <code>transform</code>을 쓰는 부모 안에 fixed 모달이 있으면 전체 화면을 덮지 못함<br />
                <small style={{ color: '#ea580c' }}>→ 모달이 부모 박스 안에만 갇혀버림</small>
              </li>
              <li>
                <strong>해결 방법:</strong> Fixed 요소는 부모 바깥(예: body 직계 자식)으로 빼거나, 부모의 transform을 제거<br />
                <small style={{ color: '#ea580c' }}>→ React Portal을 쓰면 DOM 구조를 벗어날 수 있음</small>
              </li>
            </ul>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'Parent Transform',
              type: 'radio',
              value: parentTransform,
              onChange: setParentTransform,
              options: ['none', 'translate(0, 0)']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="pos-trap"
          previewHeight="250px"
          codeHeight="350px"
          initialCss={`.trap-container {
  margin-top: 50px;
  width: 100%;
  height: 200px;
  background-color: #ffe3e3;
  border: 4px dashed #fa5252;
  padding: 20px;
  
  /* 이 속성이 켜지면 Fixed의 기준이 뷰포트에서 이 박스로 바뀝니다! */
  transform: ${parentTransform}; 
}

.fixed-child {
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  height: 50px;
  background-color: #228be6;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  z-index: 10;
}`}
          currentCss={`.trap-container {
  margin-top: 50px;
  width: 100%;
  height: 200px;
  background-color: #ffe3e3;
  border: 4px dashed #fa5252;
  padding: 20px;
  
  transform: ${parentTransform};
}

.fixed-child {
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  height: 50px;
  background-color: #228be6;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  z-index: 10;
}`}
          initialHtml={`<div class="trap-container">
  <h3>부모 요소 (Parent)</h3>
  <p>Parent Transform: <strong>${parentTransform}</strong></p>
  
  <div class="fixed-child">
    Fixed Child
  </div>
</div>

<p style="margin-top: 1rem; color: #868e96; font-size: 0.9rem;">
  <strong>Child 위치 확인:</strong><br/>
  - <strong>none</strong>: 에디터(뷰포트)의 우측 상단 끝에 붙음<br/>
  - <strong>translate</strong>: 빨간 점선 박스(부모)의 우측 상단 끝에 붙음
</p>`}
        />
      </CollapsibleSection>

      {/* 실습 섹션: Sticky Position (하이브리드 배치) */}
      <CollapsibleSection title="Sticky Position">
        <div className="section-description">
          <p>
            <code>sticky</code>는 스크롤 위치에 따라 <code>relative</code>와 <code>fixed</code>의 특성을 오가는 하이브리드 포지션입니다.<br />
            <strong>임계점(예: top: 0)</strong>에 도달하기 전까지는 일반 요소처럼 동작하다가, 도달하면 화면에 고정됩니다.
            부모 컨테이너(여기서는 에디터 프리뷰 영역) 안에서만 고정된다는 점이 <code>fixed</code>와 다릅니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>🎯 Sticky의 실무 활용</h4>
            <ul style={{ marginBottom: 0, color: '#075985', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li>
                <strong>테이블 헤더</strong> - 긴 데이터 테이블에서 컬럼 이름이 항상 보이도록<br />
                <small style={{ color: '#0284c7' }}>예: 엑셀처럼 스크롤해도 헤더가 상단에 고정</small>
              </li>
              <li>
                <strong>섹션 제목</strong> - 뉴스/블로그에서 현재 읽는 섹션 표시<br />
                <small style={{ color: '#0284c7' }}>예: 스크롤하면서 "1장 서론", "2장 본론" 제목이 상단에 붙음</small>
              </li>
              <li>
                <strong>사이드바 네비게이션</strong> - 스크롤해도 메뉴가 사라지지 않도록<br />
                <small style={{ color: '#0284c7' }}>예: 문서 사이트의 좌측 메뉴</small>
              </li>
              <li>
                <strong>버튼 그룹</strong> - 특정 영역에서만 고정되는 액션 버튼<br />
                <small style={{ color: '#0284c7' }}>예: 게시글 하단의 "좋아요", "공유" 버튼</small>
              </li>
            </ul>
            <p style={{ marginTop: '1rem', marginBottom: 0, color: '#0c4a6e', fontSize: '0.9rem' }}>
              <strong>💡 핵심 차이:</strong> Fixed는 부모를 벗어나지만, Sticky는 <strong>부모 영역 안에서만</strong> 고정됩니다!
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="pos-sticky"
          previewHeight="350px"
          codeHeight="350px"
          initialCss={`.container {
  height: 1000px;
  background: linear-gradient(#f8f9fa, #e9ecef);
  padding: 1rem;
}

.sticky-header {
  position: sticky;
  top: 10px; /* 이 위치에 도달하면 달라붙습니다 */
  background-color: #845ef7;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 10;
}

.content {
  margin-top: 2rem;
  line-height: 1.6;
  color: #495057;
}`}
          currentCss={`.container {
  height: 1000px;
  background: linear-gradient(#f8f9fa, #e9ecef);
  padding: 1rem;
}

.sticky-header {
  position: sticky;
  top: 10px;
  background-color: #845ef7;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 10;
}

.content {
  margin-top: 2rem;
  line-height: 1.6;
  color: #495057;
}`}
          initialHtml={`<div class="container">
  <p>스크롤을 아래로 내려보세요.</p>
  <div class="sticky-header">
    Sticky Header (Top: 10px)
  </div>
  <div class="content">
    <p>sticky 요소는 스크롤이 내려가면서 지정된 위치(top: 10px)에 닿으면 고정됩니다.</p>
    <p>그리고 부모 요소의 범위를 벗어나면 다시 같이 스크롤되어 사라집니다.</p>
    <p>Lorem ipsum dolor sit amet...</p>
    <p>(스크롤을 더 확인하기 위한 여백)</p>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 비교 섹션: 다양한 수평/수직 중앙 정렬 기법 */}
      <CollapsibleSection title="🎯 센터링 방법 비교">
        <p className="section-description">
          요소를 완벽하게 가운데 정렬하는 다양한 방법들을 비교해보세요.
        </p>
        <LiveCodeEditor
          scopeId="pos-centering"
          previewHeight="350px"
          codeHeight="550px"
          initialCss={`.centering-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  background: #1e293b;
  border-radius: 16px;
}

.center-box {
  height: 150px;
  background: rgba(255,255,255,0.05);
  border: 1px dashed rgba(255,255,255,0.2);
  border-radius: 12px;
  position: relative;
}

.center-item {
  width: 80px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
}

.method-label {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  color: #94a3b8;
  white-space: nowrap;
}

/* Method 1: Flexbox */
.method-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Method 2: Grid */
.method-grid {
  display: grid;
  place-items: center;
}

/* Method 3: Position + Transform */
.method-transform .center-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Method 4: Margin Auto */
.method-margin {
  display: flex;
}
.method-margin .center-item {
  margin: auto;
}`}
          initialHtml={`<div class="centering-demo">
  <div class="center-box method-flex">
    <div class="center-item">Flexbox</div>
    <span class="method-label">justify + align</span>
  </div>
  <div class="center-box method-grid">
    <div class="center-item">Grid</div>
    <span class="method-label">place-items: center</span>
  </div>
  <div class="center-box method-transform">
    <div class="center-item">Position</div>
    <span class="method-label">top/left + transform</span>
  </div>
  <div class="center-box method-margin">
    <div class="center-item">Margin</div>
    <span class="method-label">margin: auto</span>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 툴팁 및 드롭다운 (Absolute 활용) */}
      <CollapsibleSection title="Tooltip & Dropdown 예제">
        <div className="section-description">
          <p>
            <code>position: absolute</code>를 활용한 툴팁과 드롭다운 메뉴 구현입니다. 부모에 <code>position: relative</code>가 필요합니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff', borderRadius: '10px', border: '1px solid #0ea5e9' }}>
            <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>🎯 툴팁/드롭다운의 핵심 공식</h4>
            <div style={{ color: '#075985', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <strong>1. 부모 설정:</strong><br />
              → <code>position: relative</code> (기준점 역할)<br />
              → <code>display: inline-block</code> 또는 적절한 크기 설정<br /><br />

              <strong>2. 툴팁/드롭다운 배치:</strong><br />
              → <code>position: absolute</code><br />
              → 위치: <code>top: calc(100% + 8px)</code> (부모 바로 아래)<br />
              → 또는: <code>bottom: calc(100% + 8px)</code> (부모 바로 위)<br /><br />

              <strong>3. 보이기/숨기기:</strong><br />
              → <code>opacity: 0</code> + <code>visibility: hidden</code> (숨김)<br />
              → <code>:hover</code> 시 → <code>opacity: 1</code> + <code>visibility: visible</code>
            </div>
            <p style={{ marginTop: '1rem', marginBottom: 0, color: '#0c4a6e', fontSize: '0.9rem' }}>
              <strong>💡 왜 opacity와 visibility 둘 다?</strong> visibility만 쓰면 애니메이션이 안 되고, opacity만 쓰면 투명해도 클릭이 됩니다!
            </p>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="pos-tooltip"
          previewHeight="300px"
          codeHeight="550px"
          initialCss={`.tooltip-demo {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 4rem 2rem;
  background: #f8fafc;
  border-radius: 12px;
}

/* Tooltip */
.tooltip-trigger {
  position: relative;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}

.tooltip-content {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: #1e293b;
  color: white;
  font-size: 0.85rem;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: #1e293b;
}

.tooltip-trigger:hover .tooltip-content {
  opacity: 1;
  visibility: visible;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-trigger {
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #1e293b;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 160px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s;
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu a {
  display: block;
  padding: 0.75rem 1rem;
  color: #1e293b;
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-menu a:hover {
  background: #f1f5f9;
}

.dropdown-menu a:first-child { border-radius: 8px 8px 0 0; }
.dropdown-menu a:last-child { border-radius: 0 0 8px 8px; }`}
          initialHtml={`<div class="tooltip-demo">
  <button class="tooltip-trigger">
    Hover for Tooltip
    <div class="tooltip-content">
      ✨ 이것은 툴팁입니다!
    </div>
  </button>

  <div class="dropdown">
    <button class="dropdown-trigger">
      Hover for Menu ▾
    </button>
    <div class="dropdown-menu">
      <a href="#">📁 Dashboard</a>
      <a href="#">⚙️ Settings</a>
      <a href="#">👤 Profile</a>
      <a href="#">🚪 Logout</a>
    </div>
  </div>
</div>`}
        />
      </CollapsibleSection>

      {/* 실무 응용 섹션: 알림 뱃지 (Absolute 활용) */}
      <CollapsibleSection title="Badge & Notification 예제">
        <div className="section-description">
          <p>
            아이콘 우측 상단에 붙는 알림 뱃지 구현입니다. 부모-자식 position 패턴을 활용합니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fca5a5' }}>
            <h4 style={{ marginTop: 0, color: '#991b1b' }}>🔔 뱃지 배치의 핵심</h4>
            <div style={{ color: '#b91c1c', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <strong>뱃지 위치 공식:</strong><br />
              → <code>top: -8px</code> (부모 위로 삐져나가게)<br />
              → <code>right: -8px</code> (부모 오른쪽으로 삐져나가게)<br />
              → 음수 값을 써서 부모 밖으로 약간 튀어나오게 만드는 게 포인트!<br /><br />

              <strong>실전 팁:</strong><br />
              • 뱃지가 너무 길면(예: "99+") 원형 대신 둥근 사각형 사용<br />
              • <code>min-width</code>로 최소 너비를 보장해서 "1" 같은 짧은 숫자도 예쁘게<br />
              • <code>transform: scale()</code>로 호버 시 살짝 커지는 효과 추가
            </div>
          </div>
        </div>
        <LiveCodeEditor
          scopeId="pos-badge"
          previewHeight="250px"
          codeHeight="500px"
          initialCss={`.badge-demo {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 3rem;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 12px;
}

.icon-with-badge {
  position: relative;
  width: 50px;
  height: 50px;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.icon-with-badge:hover {
  background: rgba(255,255,255,0.2);
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-dot {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  background: #10b981;
  border-radius: 50%;
  border: 2px solid #1e293b;
}

.badge-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}`}
          initialHtml={`<div class="badge-demo">
  <div class="icon-with-badge">
    🔔
    <span class="badge">3</span>
  </div>
  <div class="icon-with-badge">
    💬
    <span class="badge">12</span>
  </div>
  <div class="icon-with-badge">
    📧
    <span class="badge-dot"></span>
  </div>
  <div class="icon-with-badge">
    ❤️
    <span class="badge-dot badge-ping" style="background: #ef4444;"></span>
  </div>
</div>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default PositionStudy;
