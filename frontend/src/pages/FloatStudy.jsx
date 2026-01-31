/**
 * FloatStudy.jsx
 * 고전적인 레이아웃 기법인 Float 및 해제(Clear) 실습 페이지
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import CssPropertyControls from '../components/CssPropertyControls';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function FloatStudy() {
  // 상태 관리: float 방향 및 clear 설정
  const [floatValue, setFloatValue] = useState('none');
  const [clearValue, setClearValue] = useState('none');

  return (
    <div className="page-container">
      <PageHeader
        title="Float & Clear Study"
        subtitle="Classic layout technique - still useful for wrapping text around elements"
      />

      {/* 섹션 1: Float 속성의 개념과 역사적 배경 */}
      <CollapsibleSection title="Float이란?">
        <div className="section-description">
          <p>
            <code>float</code>는 원래 <strong>잡지 레이아웃처럼 텍스트가 이미지를 감싸도록</strong> 하기 위해 만들어졌습니다.<br />
            Flexbox와 Grid가 등장하기 전에는 레이아웃의 주요 도구였지만, 현재는 주로 텍스트 래핑(wrapping)에 사용됩니다.
          </p>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li><code>float: left</code>: 요소를 왼쪽에 띄우고, 텍스트가 오른쪽을 감쌈</li>
            <li><code>float: right</code>: 요소를 오른쪽에 띄우고, 텍스트가 왼쪽을 감쌈</li>
            <li><code>float: none</code>: 기본값, float 해제</li>
          </ul>
        </div>
      </CollapsibleSection>

      {/* 섹션 1.5: 언제 쓰고 언제 안 쓰는가? */}
      <CollapsibleSection title="Float를 언제 사용하나요?">
        <div className="section-description">
          <div style={{
            padding: '1.5rem', background: '#ecfdf5', borderRadius: '12px',
            border: '1px solid #10b981', marginBottom: '1.5rem'
          }}>
            <h4 style={{ marginTop: 0, color: '#065f46' }}>✅ Float를 사용해야 하는 경우</h4>
            <ul style={{ marginBottom: 0, color: '#047857', lineHeight: '1.8' }}>
              <li>
                <strong>블로그/뉴스 기사의 이미지 래핑</strong><br />
                <small style={{ color: '#059669' }}>
                  예: 긴 텍스트 본문에서 이미지를 왼쪽/오른쪽에 띄우고 텍스트가 자연스럽게 감싸도록
                </small>
              </li>
              <li>
                <strong>위키피디아 스타일의 사이드 노트</strong><br />
                <small style={{ color: '#059669' }}>
                  예: 본문 옆에 작은 정보 박스를 띄우고 텍스트가 흐르도록
                </small>
              </li>
              <li>
                <strong>레거시 코드 유지보수</strong><br />
                <small style={{ color: '#059669' }}>
                  예: 10년 전에 만들어진 사이트 수정 시, 기존 Float 기반 코드 이해 필요
                </small>
              </li>
              <li>
                <strong>간단한 메일 템플릿 (HTML 이메일)</strong><br />
                <small style={{ color: '#059669' }}>
                  예: 이메일 클라이언트는 Flexbox/Grid 지원이 불안정하므로 Float가 안전
                </small>
              </li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem', background: '#fef2f2', borderRadius: '12px',
            border: '1px solid #ef4444'
          }}>
            <h4 style={{ marginTop: 0, color: '#991b1b' }}>❌ Float를 사용하면 안 되는 경우</h4>
            <ul style={{ marginBottom: 0, color: '#b91c1c', lineHeight: '1.8' }}>
              <li>
                <strong>전체 페이지 레이아웃</strong><br />
                <small style={{ color: '#dc2626' }}>
                  → 대신 <code>CSS Grid</code> 사용! (헤더, 사이드바, 메인, 푸터 배치)
                </small>
              </li>
              <li>
                <strong>카드 그리드나 갤러리</strong><br />
                <small style={{ color: '#dc2626' }}>
                  → 대신 <code>Grid</code> 또는 <code>Flexbox</code> 사용!
                </small>
              </li>
              <li>
                <strong>내비게이션 바의 메뉴 아이템 정렬</strong><br />
                <small style={{ color: '#dc2626' }}>
                  → 대신 <code>Flexbox</code> 사용! (justify-content, gap 등 훨씬 편리)
                </small>
              </li>
              <li>
                <strong>중앙 정렬이 필요한 경우</strong><br />
                <small style={{ color: '#dc2626' }}>
                  → Float는 중앙 정렬이 어렵습니다. <code>Flexbox</code>의 align-items 사용!
                </small>
              </li>
            </ul>
          </div>

          <div style={{
            marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7',
            borderRadius: '10px', border: '1px solid #f59e0b'
          }}>
            <strong style={{ color: '#92400e' }}>💡 핵심 요약</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7' }}>
              2024년 현재, Float는 <strong>"텍스트가 이미지를 감싸는 효과"</strong>에만 사용합니다.<br />
              레이아웃 목적으로는 Flexbox/Grid가 훨씬 강력하고 직관적입니다.
            </p>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: Float의 기본 동작 및 텍스트 래핑 피드백 */}
      <CollapsibleSection title="Float 기본 동작">
        <p className="section-description">
          Float된 요소는 일반 흐름에서 벗어나 떠 있게 되고, 주변 콘텐츠가 그것을 감쌉니다.
        </p>

        <div className="info-box" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', marginTop: '1rem', marginBottom: '1rem' }}>
          <p style={{ margin: 0, lineHeight: '1.8' }}>
            <strong>⚡ 핵심 문제:</strong> Float된 요소는 <strong>부모의 높이에 포함되지 않습니다!</strong><br />
            → Float를 사용하면 부모가 자식을 "없는 것"처럼 취급하여 높이가 0이 됩니다<br />
            → 해결책: <code>Clearfix</code> (부모::after에 clear: both) 또는 <code>overflow: hidden</code> 사용 필수<br />
            → 더 나은 방법: Flexbox/Grid 사용하면 이 문제 자체가 발생하지 않음!
          </p>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'float',
              type: 'radio',
              value: floatValue,
              onChange: setFloatValue,
              options: ['none', 'left', 'right']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="float-basic"
          previewHeight="300px"
          codeHeight="300px"
          initialCss={`.float-box {
  float: ${floatValue};
  width: 150px;
  height: 150px;
  margin: 0 15px 15px 0; /* 오른쪽과 아래 여백 */
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`}
          currentCss={`.float-box {
  float: ${floatValue};
  width: 150px;
  height: 150px;
  margin: 0 15px 15px 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}`}
          initialHtml={`<div style="background: #f8fafc; padding: 1rem; border-radius: 8px;">
  <div class="float-box">Float Box</div>
  
  <p style="color: #1e293b; line-height: 1.6; margin: 0;">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.
  </p>
</div>

<p style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>none</strong>: 일반 흐름대로 배치<br/>
  <strong>left</strong>: 왼쪽에 떠 있고, 텍스트가 오른쪽을 감쌈<br/>
  <strong>right</strong>: 오른쪽에 떠 있고, 텍스트가 왼쪽을 감쌈
</p>`}
        />
      </CollapsibleSection>

      {/* 섹션 3: 흐름을 제어하는 Clear 속성 */}
      <CollapsibleSection title="Clear 속성">
        <div className="section-description">
          <p>
            Float 요소 다음에 오는 요소가 Float의 영향을 받지 않고 <strong>아래에 위치</strong>하도록 합니다.
          </p>

          <div style={{
            marginTop: '1.5rem', padding: '1.2rem', background: '#f0f9ff',
            borderRadius: '10px', border: '1px solid #0ea5e9'
          }}>
            <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>🎯 실무에서 언제 사용하나요?</h4>
            <ul style={{ marginBottom: 0, color: '#075985', lineHeight: '1.8', fontSize: '0.95rem' }}>
              <li>
                <strong>clear: both</strong> (99% 사용) - 왼쪽, 오른쪽 상관없이 모든 Float를 무시하고 아래로
                <br /><small style={{ color: '#0284c7' }}>예: Footer를 모든 Float된 콘텐츠 아래에 배치</small>
              </li>
              <li>
                <strong>clear: left</strong> (거의 안 씀) - 왼쪽 Float만 무시
                <br /><small style={{ color: '#0284c7' }}>예: 오른쪽 Float 옆에는 붙어도 되지만 왼쪽 Float는 피해야 할 때</small>
              </li>
              <li>
                <strong>clear: right</strong> (거의 안 씀) - 오른쪽 Float만 무시
                <br /><small style={{ color: '#0284c7' }}>예: 왼쪽 Float 옆에는 붙어도 되지만 오른쪽 Float는 피해야 할 때</small>
              </li>
              <li>
                <strong>clear: none</strong> - Float 영향을 그대로 받음 (기본값)
              </li>
            </ul>
          </div>
        </div>

        <CssPropertyControls
          properties={[
            {
              name: 'clear',
              type: 'radio',
              value: clearValue,
              onChange: setClearValue,
              options: ['none', 'left', 'right', 'both']
            }
          ]}
        />

        <LiveCodeEditor
          scopeId="clear-demo"
          previewHeight="400px"
          codeHeight="450px"
          initialCss={`.container {
  background: #f8fafc; 
  padding: 1rem; 
  border-radius: 8px;
}

.float-left {
  float: left;
  width: 100px;
  height: 100px;
  margin: 0 15px 10px 0;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.85rem;
}

.float-right {
  float: right;
  width: 100px;
  height: 100px;
  margin: 0 0 10px 15px;
  background-color: #10b981;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.85rem;
}

/* Clear 박스: 배경 대신 보더 사용으로 깔끔하게 */
.clear-box {
  clear: ${clearValue};
  padding: 1rem;
  background-color: rgba(252, 211, 77, 0.3); /* 반투명 배경 */
  color: #78350f;
  font-weight: 600;
  border-radius: 8px;
  border: 3px dashed #f59e0b;
  margin-top: 5px;
}`}
          currentCss={`.container {
  background: #f8fafc; 
  padding: 1rem; 
  border-radius: 8px;
}

.float-left {
  float: left;
  width: 100px;
  height: 100px;
  margin: 0 15px 10px 0;
  background-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.85rem;
}

.float-right {
  float: right;
  width: 100px;
  height: 100px;
  margin: 0 0 10px 15px;
  background-color: #10b981;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.85rem;
}

/* Clear 박스: 배경 대신 보더 사용으로 깔끔하게 */
.clear-box {
  clear: ${clearValue};
  padding: 1rem;
  background-color: rgba(252, 211, 77, 0.3); /* 반투명 배경 */
  color: #78350f;
  font-weight: 600;
  border-radius: 8px;
  border: 3px dashed #f59e0b;
  margin-top: 5px;
}`}
          initialHtml={`<div class="container">
  <div class="float-left">⬅️ Left<br/>Float</div>
  <div class="float-right">➡️ Right<br/>Float</div>
  
  <div class="clear-box">
    📍 Clear: ${clearValue} 박스
  </div>
</div>

<div style="margin-top: 1.5rem; padding: 1rem; background: #f1f5f9; border-radius: 8px; color: #1e293b; font-size: 0.9rem; line-height: 1.7;">
  <strong>🔍 각 옵션별 동작:</strong><br/><br/>
  
  <strong style="color: #0f172a;">• clear: none</strong> (기본값)<br/>
  → 노란 박스가 Float 박스들 사이에 끼어듭니다 (Float 영향을 받음)<br/><br/>
  
  <strong style="color: #0c4a6e;">• clear: left</strong><br/>
  → 왼쪽 파란 박스는 피하지만, 오른쪽 녹색 박스 옆에는 붙습니다<br/>
  (왼쪽 Float만 무시)<br/><br/>
  
  <strong style="color: #065f46;">• clear: right</strong><br/>
  → 오른쪽 녹색 박스는 피하지만, 왼쪽 파란 박스 옆에는 붙습니다<br/>
  (오른쪽 Float만 무시)<br/><br/>
  
  <strong style="color: #92400e;">• clear: both</strong> ⭐ 가장 많이 사용!<br/>
  → 양쪽 모두 무시하고 Float 박스들 아래로 완전히 내려갑니다<br/>
  (왼쪽 + 오른쪽 Float 둘 다 무시)
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: 부모 요소의 높이 붕괴 방지 기법 (Clearfix) */}
      <CollapsibleSection title="Clearfix - 부모 높이 문제 해결">
        <div className="section-description">
          <div style={{
            padding: '1.5rem', background: '#fff7ed', borderRadius: '12px',
            border: '1px solid #fb923c', marginBottom: '1.5rem'
          }}>
            <h4 style={{ marginTop: 0, color: '#9a3412' }}>🤔 Clearfix가 필요한 이유</h4>
            <p style={{ marginBottom: '1rem', color: '#c2410c', lineHeight: '1.7' }}>
              <strong>핵심:</strong> Clearfix는 <strong>Float를 사용할 때만</strong> 필요합니다!<br />
              Float를 안 쓰면 이 문제 자체가 발생하지 않습니다. Flexbox/Grid를 쓰면 Clearfix는 필요 없어요.
            </p>
            <ul style={{ marginBottom: 0, color: '#c2410c', lineHeight: '1.8' }}>
              <li>
                <strong>문제 발생:</strong> 자식 요소에 <code>float: left</code>를 주면, 부모가 "내 자식이 사라졌어!"라고 착각합니다.
              </li>
              <li>
                <strong>결과:</strong> 부모의 높이가 0px이 되어 배경색/테두리가 안 보입니다 (부모 높이 붕괴).
              </li>
              <li>
                <strong>해결책:</strong> Clearfix로 부모에게 "자식이 여기 있어!"라고 알려줍니다.
              </li>
            </ul>
          </div>

          <div style={{
            padding: '1.5rem', background: '#f0f9ff', borderRadius: '12px',
            border: '1px solid #0ea5e9', marginBottom: '1.5rem'
          }}>
            <h4 style={{ marginTop: 0, color: '#0c4a6e' }}>🔧 Clearfix 작동 원리</h4>
            <p style={{ marginBottom: '0.5rem', color: '#075985', fontWeight: 'bold' }}>
              .parent::after &#123; content: ""; display: table; clear: both; &#125;
            </p>
            <ol style={{ marginBottom: 0, color: '#075985', lineHeight: '1.8' }}>
              <li>
                <strong>::after</strong> → 부모의 자식 요소들 맨 마지막에 <strong>보이지 않는 가상 요소</strong>를 추가합니다.
              </li>
              <li>
                <strong>content: ""</strong> → 내용이 없는 빈 요소입니다 (화면에 안 보임).
              </li>
              <li>
                <strong>display: table</strong> → 이 가상 요소를 블록 레벨로 만듭니다 (table은 블록처럼 동작하면서 clear가 잘 작동함).
              </li>
              <li>
                <strong>clear: both</strong> → 이 가상 요소가 모든 Float 아래로 내려갑니다.
              </li>
              <li>
                <strong>결과:</strong> 부모 입장에서는 "아, 맨 마지막에 자식이 하나 더 있네!"라고 인식하고, 그 자식이 Float 박스들 아래에 있으니 부모의 높이가 늘어납니다!
              </li>
            </ol>
          </div>

          <div style={{
            padding: '1.2rem', background: '#fef3c7', borderRadius: '10px',
            border: '1px solid #f59e0b'
          }}>
            <strong style={{ color: '#92400e' }}>💡 간단 요약</strong>
            <p style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.7' }}>
              • Float를 쓰면 → 부모가 자식을 못 봄 (높이 0)<br />
              • Clearfix를 쓰면 → 부모 끝에 보이지 않는 요소를 추가해서 높이를 확보<br />
              • <code>display: table</code>은 블록 레벨 + clear가 잘 작동하게 하려고 쓰는 옛날 기법<br />
              • 현대에는 Float 대신 <strong>Flexbox/Grid</strong> 쓰면 이런 문제 자체가 없음!
            </p>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="clearfix"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`/* 문제: Float된 자식의 높이가 무시됨 */
.parent-problem {
  background-color: #fee2e2;
  border: 3px solid #ef4444;
  padding: 10px;
  margin-bottom: 2rem;
}

/* 해결: Clearfix 적용 */
.parent-fixed {
  background-color: #d1fae5;
  border: 3px solid #10b981;
  padding: 10px;
}

.parent-fixed::after {
  content: "";
  display: table;
  clear: both;
}

.float-child {
  float: left;
  width: 120px;
  height: 80px;
  margin: 5px;
  background-color: #60a5fa;
  color: #ffffff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}`}
          initialHtml={`<div>
  <h4 style="color: #1e293b; margin-top: 0;">❌ 문제: 부모 높이 붕괴</h4>
  <div class="parent-problem">
    <div class="float-child">Float 1</div>
    <div class="float-child">Float 2</div>
  </div>
  
  <h4 style="color: #1e293b;">✅ 해결: Clearfix 적용</h4>
  <div class="parent-fixed">
    <div class="float-child">Float A</div>
    <div class="float-child">Float B</div>
  </div>
</div>

<div style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  <strong>Clearfix 방법:</strong><br/>
  <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 3px;">
    .parent::after { content: ""; display: table; clear: both; }
  </code>
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: 실무 활용 - 이미지와 텍스트의 조화로운 배치 */}
      <CollapsibleSection title="실전 사용: 이미지 + 텍스트 래핑">
        <p className="section-description">
          Float의 가장 적절한 사용 사례입니다. 블로그 포스트나 기사에서 흔히 볼 수 있는 패턴입니다.
        </p>

        <LiveCodeEditor
          scopeId="float-practical"
          previewHeight="350px"
          codeHeight="400px"
          initialCss={`.article {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: #1e293b;
}

.article-image {
  float: left;
  width: 200px;
  height: 150px;
  margin: 0 1.5rem 1rem 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
}

.article h3 {
  margin-top: 0;
  color: #0f172a;
}

.article p {
  line-height: 1.8;
  margin: 0.5rem 0;
}`}
          initialHtml={`<div class="article">
  <div class="article-image">Image</div>
  
  <h3>Article Title</h3>
  
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
  </p>
  
  <p>
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
</div>

<p style="margin-top: 1rem; color: #1e293b; background: #f1f5f9; padding: 0.75rem; border-radius: 6px; font-size: 0.9rem;">
  이것이 Float의 <strong>가장 적절한 사용 사례</strong>입니다.<br/>
  레이아웃에는 Flexbox/Grid를 사용하세요!
</p>`}
        />
      </CollapsibleSection>
    </div>
  );
}

export default FloatStudy;
