/**
 * SpecificityStudy 페이지 컴포넌트
 * CSS 명시도(Specificity) 점수 체계를 학습하는 페이지입니다.
 * 주요 개념: 인라인, ID, 클래스/속성/의사클래스, 태그 선택자의 점수 계산
 */
import { useState } from 'react';
import LiveCodeEditor from '../components/LiveCodeEditor';
import PageHeader from '../components/PageHeader';
import CollapsibleSection from '../components/CollapsibleSection';

function SpecificityStudy() {
  const [selector, setSelector] = useState('');
  const [calculatedScore, setCalculatedScore] = useState(null);

  // 간단한 명시도 계산기
  const calculateSpecificity = (sel) => {
    if (!sel.trim()) return null;
    
    let inline = 0;
    let ids = 0;
    let classes = 0;
    let tags = 0;

    // ID 선택자 카운트
    ids = (sel.match(/#[a-zA-Z_-]+/g) || []).length;
    
    // 클래스, 속성, 의사클래스 카운트
    classes = (sel.match(/\.[a-zA-Z_-]+/g) || []).length;
    classes += (sel.match(/\[[^\]]+\]/g) || []).length;
    classes += (sel.match(/:[a-zA-Z-]+(\([^)]*\))?/g) || []).filter(p => !p.startsWith('::')).length;
    
    // 태그 선택자 카운트 (의사 요소 포함)
    const cleanSel = sel.replace(/#[a-zA-Z_-]+/g, '').replace(/\.[a-zA-Z_-]+/g, '').replace(/\[[^\]]+\]/g, '').replace(/:[a-zA-Z-]+(\([^)]*\))?/g, '');
    tags = (cleanSel.match(/[a-zA-Z]+/g) || []).length;
    tags += (sel.match(/::[a-zA-Z-]+/g) || []).length;

    return { inline, ids, classes, tags };
  };

  const handleCalculate = () => {
    setCalculatedScore(calculateSpecificity(selector));
  };

  return (
    <div className="page-container">
      <PageHeader
        title="CSS Specificity (명시도)"
        subtitle="왜 내 스타일이 적용 안 되지? 선택자 점수 체계 완벽 이해"
      />

      {/* 섹션 1: 핵심 개념 */}
      <CollapsibleSection title="🎯 핵심 개념: 명시도란?">
        <div className="section-description">
          <p>
            CSS에서 같은 요소에 여러 스타일이 적용되면, <strong>명시도(Specificity)</strong>가 높은 선택자가 이깁니다.
            명시도는 <strong>4자리 점수 체계</strong>로 계산됩니다.
          </p>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
            <h4 style={{ marginTop: 0, color: '#fbbf24', textAlign: 'center' }}>📊 명시도 점수 체계</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '1rem', textAlign: 'center' }}>
              <div style={{ padding: '1rem', background: '#ef4444', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>A</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>인라인 스타일</div>
                <div style={{ fontSize: '0.7rem', color: '#fecaca' }}>style="..."</div>
              </div>
              <div style={{ padding: '1rem', background: '#f59e0b', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>B</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>ID 선택자</div>
                <div style={{ fontSize: '0.7rem', color: '#fef3c7' }}>#id</div>
              </div>
              <div style={{ padding: '1rem', background: '#10b981', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>C</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>클래스 등</div>
                <div style={{ fontSize: '0.7rem', color: '#d1fae5' }}>.class, [attr], :hover</div>
              </div>
              <div style={{ padding: '1rem', background: '#3b82f6', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>D</div>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>태그/의사요소</div>
                <div style={{ fontSize: '0.7rem', color: '#dbeafe' }}>div, p, ::before</div>
              </div>
            </div>
            <p style={{ marginTop: '1rem', marginBottom: 0, textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
              점수 형식: <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>(A, B, C, D)</code>
            </p>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>🔑 핵심 규칙</strong>
            <ul style={{ marginTop: '0.5rem', marginBottom: 0, color: '#78350f', lineHeight: '1.8' }}>
              <li><strong>왼쪽 숫자가 무조건 우선!</strong> (1,0,0,0) &gt; (0,99,99,99)</li>
              <li>ID 1개가 클래스 100개보다 강력함</li>
              <li>점수가 같으면 나중에 선언된 스타일이 이김</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 2: 점수 계산 예시 */}
      <CollapsibleSection title="📝 점수 계산 예시">
        <div className="section-description">
          <p>
            각 선택자의 명시도 점수를 계산해봅시다.
          </p>

          <div style={{ marginTop: '1rem', background: '#f8fafc', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ background: '#1e293b', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>선택자</th>
                  <th style={{ padding: '1rem', textAlign: 'center', width: '60px' }}>A</th>
                  <th style={{ padding: '1rem', textAlign: 'center', width: '60px' }}>B</th>
                  <th style={{ padding: '1rem', textAlign: 'center', width: '60px' }}>C</th>
                  <th style={{ padding: '1rem', textAlign: 'center', width: '60px' }}>D</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#3b82f6' }}>p</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>1</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>태그 1개</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f1f5f9' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#10b981' }}>.card</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#10b981' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>클래스 1개</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>.card p</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#10b981' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>1</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>클래스 1 + 태그 1</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f1f5f9' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#f59e0b' }}>#app</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#f59e0b' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>ID 1개</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>#app .card p</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#f59e0b' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#10b981' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>1</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>ID 1 + 클래스 1 + 태그 1</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f1f5f9' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>div.card.active</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#10b981' }}>2</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>1</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>클래스 2 + 태그 1</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>a:hover</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#10b981' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>1</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>의사클래스 1 + 태그 1</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f1f5f9' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>input[type="text"]</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#10b981' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>1</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>속성 선택자 1 + 태그 1</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace' }}>p::before</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#3b82f6' }}>2</td>
                  <td style={{ padding: '1rem', color: '#64748b' }}>태그 1 + 의사요소 1</td>
                </tr>
                <tr style={{ background: '#fef2f2' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#ef4444' }}>style="..."</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold', color: '#ef4444' }}>1</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>0</td>
                  <td style={{ padding: '1rem', color: '#991b1b' }}>인라인 스타일 (가장 강력!)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 3: 실제 동작 확인 */}
      <CollapsibleSection title="🔬 실제로 확인해보기">
        <div className="section-description">
          <p>
            명시도가 어떻게 스타일 적용에 영향을 주는지 직접 확인해보세요.
          </p>
        </div>

        <LiveCodeEditor
          scopeId="specificity-demo"
          previewHeight="350px"
          codeHeight="450px"
          initialCss={`/* 명시도: (0,0,0,1) - 태그만 */
p {
  color: blue;
  font-size: 1rem;
}

/* 명시도: (0,0,1,1) - 클래스 + 태그 */
.text p {
  color: green;
  font-size: 1.1rem;
}

/* 명시도: (0,0,2,1) - 클래스 2개 + 태그 */
.container .text p {
  color: orange;
  font-size: 1.2rem;
}

/* 명시도: (0,1,0,1) - ID + 태그 */
#special p {
  color: purple;
  font-size: 1.3rem;
}

/* 명시도: (0,1,1,1) - ID + 클래스 + 태그 (가장 높음!) */
#special .text p {
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}

.container {
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
}`}
          initialHtml={`<div class="container">
  <p>단순 p 태그 (0,0,0,1) → 파란색</p>
  
  <div class="text">
    <p>.text p (0,0,1,1) → 초록색</p>
  </div>
</div>

<div class="container text">
  <p>.container .text p (0,0,2,1) → 주황색</p>
</div>

<div id="special" class="container">
  <p>#special p (0,1,0,1) → 보라색</p>
  
  <div class="text">
    <p>#special .text p (0,1,1,1) → 빨간색</p>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; color: #475569;">
  <strong>👀 관찰해보세요:</strong> 같은 p 태그인데 위치에 따라 다른 스타일이 적용됩니다!
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 4: !important */}
      <CollapsibleSection title="⚠️ !important - 최후의 수단">
        <div className="section-description">
          <p>
            <code>!important</code>는 명시도 체계를 무시하고 강제로 스타일을 적용합니다.
            하지만 <strong>가급적 사용하지 마세요!</strong>
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
              <h4 style={{ marginTop: 0, color: '#b91c1c' }}>❌ 왜 피해야 하나요?</h4>
              <ul style={{ marginBottom: 0, color: '#991b1b', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>디버깅이 매우 어려워짐</li>
                <li>!important끼리 충돌하면 해결 불가</li>
                <li>코드 유지보수가 악몽이 됨</li>
                <li>명시도 시스템을 파괴함</li>
              </ul>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#065f46' }}>✅ 대신 이렇게 하세요</h4>
              <ul style={{ marginBottom: 0, color: '#047857', lineHeight: '1.8', fontSize: '0.9rem' }}>
                <li>선택자의 명시도를 높이기</li>
                <li>불필요한 높은 명시도 선택자 줄이기</li>
                <li>CSS 순서 조정하기</li>
                <li>BEM 같은 방법론 사용하기</li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: '#fef3c7', borderRadius: '10px', border: '1px solid #f59e0b' }}>
            <strong style={{ color: '#92400e' }}>🎯 !important 우선순위</strong>
            <pre style={{ marginTop: '0.5rem', marginBottom: 0, background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto', fontSize: '0.85rem' }}>
{`/* 우선순위 (낮은 것 → 높은 것) */

1. 태그 선택자         p { color: blue; }
2. 클래스 선택자       .text { color: green; }
3. ID 선택자          #app { color: orange; }
4. 인라인 스타일       style="color: purple"
5. !important         color: red !important;
6. 인라인 !important   style="color: black !important"`}
            </pre>
          </div>
        </div>

        <LiveCodeEditor
          scopeId="important-demo"
          previewHeight="250px"
          codeHeight="300px"
          initialCss={`#special .text p {
  color: purple;
  /* 높은 명시도: (0,1,1,1) */
}

/* 명시도는 낮지만 !important로 이김 */
p {
  color: red !important;
}

.demo-box {
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
}`}
          initialHtml={`<div id="special" class="demo-box">
  <div class="text">
    <p>이 텍스트는 무슨 색일까요?</p>
  </div>
</div>

<div style="margin-top: 1rem; padding: 1rem; background: #fef2f2; border-radius: 8px; font-size: 0.9rem; color: #991b1b;">
  <strong>⚠️ 결과:</strong> p 태그 선택자가 명시도가 낮지만, !important 덕분에 빨간색이 적용됩니다.
</div>`}
        />
      </CollapsibleSection>

      {/* 섹션 5: 실무 팁 */}
      <CollapsibleSection title="💼 실무 팁: 명시도 관리 전략">
        <div className="section-description">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: '#ecfeff', borderRadius: '12px', border: '2px solid #06b6d4' }}>
              <h4 style={{ marginTop: 0, color: '#0891b2' }}>1️⃣ 클래스 중심으로 작성</h4>
              <p style={{ marginBottom: 0, color: '#0e7490', lineHeight: '1.7', fontSize: '0.9rem' }}>
                ID 선택자 대신 <strong>클래스만 사용</strong>하면 명시도가 평탄하게 유지됩니다.
                BEM 방법론이 이 원칙을 따릅니다.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#fef3c7', borderRadius: '12px', border: '2px solid #f59e0b' }}>
              <h4 style={{ marginTop: 0, color: '#b45309' }}>2️⃣ 네스팅 최소화</h4>
              <p style={{ marginBottom: 0, color: '#92400e', lineHeight: '1.7', fontSize: '0.9rem' }}>
                <code>.a .b .c .d p</code>보다 <code>.d-paragraph</code>가 낫습니다.
                깊은 네스팅은 명시도를 불필요하게 높입니다.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#d1fae5', borderRadius: '12px', border: '2px solid #10b981' }}>
              <h4 style={{ marginTop: 0, color: '#059669' }}>3️⃣ 선언 순서 활용</h4>
              <p style={{ marginBottom: 0, color: '#047857', lineHeight: '1.7', fontSize: '0.9rem' }}>
                같은 명시도라면 <strong>나중에 선언된 것이 이깁니다.</strong>
                CSS 파일 순서와 import 순서를 활용하세요.
              </p>
            </div>

            <div style={{ padding: '1.5rem', background: '#fce7f3', borderRadius: '12px', border: '2px solid #ec4899' }}>
              <h4 style={{ marginTop: 0, color: '#be185d' }}>4️⃣ :where()로 명시도 0 만들기</h4>
              <p style={{ marginBottom: 0, color: '#9d174d', lineHeight: '1.7', fontSize: '0.9rem' }}>
                <code>:where(.class)</code>는 명시도가 0입니다.
                기본 스타일을 쉽게 덮어쓸 수 있게 만들 때 유용합니다.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#1e293b', borderRadius: '12px', color: 'white' }}>
            <h4 style={{ marginTop: 0, color: '#fbbf24' }}>🎯 권장 명시도 수준</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ padding: '0.5rem 1rem', background: '#10b981', borderRadius: '20px', fontSize: '0.85rem' }}>✅ (0,0,1,0) .class</span>
              <span style={{ padding: '0.5rem 1rem', background: '#10b981', borderRadius: '20px', fontSize: '0.85rem' }}>✅ (0,0,2,0) .parent .child</span>
              <span style={{ padding: '0.5rem 1rem', background: '#f59e0b', borderRadius: '20px', fontSize: '0.85rem' }}>⚠️ (0,0,3,0) 이상은 주의</span>
              <span style={{ padding: '0.5rem 1rem', background: '#ef4444', borderRadius: '20px', fontSize: '0.85rem' }}>❌ (0,1,0,0) ID 선택자</span>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* 섹션 6: 치트시트 */}
      <CollapsibleSection title="📋 명시도 치트시트">
        <div className="section-description">
          <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
            <h4 style={{ marginTop: 0, color: '#1e293b' }}>선택자별 점수</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <strong style={{ color: '#ef4444' }}>A = 인라인 (1000점급)</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#64748b' }}>
                  <li>style="..." 속성</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#f59e0b' }}>B = ID (100점급)</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#64748b' }}>
                  <li>#app, #header</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#10b981' }}>C = 클래스/속성/의사클래스 (10점급)</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                  <li>.card, .btn</li>
                  <li>[type="text"]</li>
                  <li>:hover, :focus, :nth-child()</li>
                  <li style={{ marginTop: '0.5rem', color: '#059669', fontWeight: '500' }}>상속되는 속성들:</li>
                  <li>• 텍스트: color, direction, letter-spacing, line-height, text-align, text-indent, text-transform, white-space, word-spacing</li>
                  <li>• 폰트: font, font-family, font-size, font-style, font-variant, font-weight</li>
                  <li>• 리스트: list-style, list-style-image, list-style-position, list-style-type</li>
                  <li>• 테이블: border-collapse, border-spacing, caption-side, empty-cells</li>
                  <li>• 기타: cursor, visibility, quotes, orphans, widows</li>
                </ul>
              </div>
              <div>
                <strong style={{ color: '#3b82f6' }}>D = 태그/의사요소 (1점급)</strong>
                <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#64748b' }}>
                  <li>div, p, span</li>
                  <li>::before, ::after</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '2px solid #fecaca' }}>
            <h4 style={{ marginTop: 0, color: '#b91c1c' }}>0점 (명시도에 영향 없음)</h4>
            <ul style={{ marginBottom: 0, color: '#991b1b', fontSize: '0.95rem', lineHeight: '1.8' }}>
              <li><code>*</code> - 전체 선택자</li>
              <li><code>:where()</code> - 제로 명시도 의사클래스</li>
              <li><code>+</code>, <code>~</code>, <code>&gt;</code> - 결합자</li>
              <li><code>:is()</code>와 <code>:not()</code>는 괄호 안 선택자의 명시도를 따름</li>
            </ul>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}

export default SpecificityStudy;
