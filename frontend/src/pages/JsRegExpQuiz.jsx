import { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import RelatedLinks from '../components/RelatedLinks';

const QUIZ_DATA = [
  {
    id: 1,
    level: '초급',
    title: '숫자만 골라내기',
    description: '문자열에서 모든 숫자만 매칭하는 정규식을 작성하세요.',
    target: 'apple 123 banana 456 cherry 789',
    expectedMatches: ['123', '456', '789'],
    hint: '\\d 기호와 + 혹은 g 플래그를 생각해보세요.',
    solution: '/\\d+/g'
  },
  {
    id: 2,
    level: '초급',
    title: '특정 문자로 시작하는 단어',
    description: '"a"로 시작하는 모든 단어(문자+숫자 조합)를 찾으세요.',
    target: 'apple banana air alpha beta',
    expectedMatches: ['apple', 'air', 'alpha'],
    hint: '^는 문자열 시작이지만, 대괄호 밖에서는 그냥 시작 지점을 뜻할 수 있어요. 혹은 \\b (단어 경계)와 a를 조합해보세요.',
    solution: '/\\ba\\w*/g'
  },
  {
    id: 3,
    level: '중급',
    title: 'HTML 태그 이름 추출',
    description: 'HTML 태그 안의 "태그명"만 첫 번째 그룹($1)으로 캡처하세요.',
    target: '<div>Hello</div> <span>World</span>',
    expectedMatches: ['div', 'span'],
    hint: '< 바로 뒤의 글자들을 괄호()로 묶어보세요. (?:) 가 아닌 일반 괄호여야 합니다.',
    solution: '/<(\\w+)>+/g'
  },
  {
    id: 4,
    level: '중급',
    title: '따옴표 안의 글자만 (Lazy)',
    description: '큰따옴표("")로 감싸진 텍스트만 추출하세요. (따옴표 자체는 제외)',
    target: 'He said "Hello", she said "Hi".',
    expectedMatches: ['Hello', 'Hi'],
    hint: '탐욕적(Greedy) 매칭을 피하기 위해 ?를 써야 할 거예요. 전후방 탐색(Lookaround)을 쓰면 따옴표를 제외할 수 있습니다.',
    solution: '/(?<=").+?(?=")/g'
  },
  {
    id: 5,
    level: '고급',
    title: '이메일 아이디 부분만',
    description: '이메일 주소에서 "@" 앞부분(아이디)만 추출하세요.',
    target: 'test-user@gmail.com, admin_01@naver.com',
    expectedMatches: ['test-user', 'admin_01'],
    hint: '긍정 앞보임(?=...)을 사용해 @ 앞까지만 매칭해보세요.',
    solution: '/[\\w.-]+(?=@)/g'
  }
];

const QuizItem = ({ data }) => {
  const [userInput, setUserInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const { matches, isSuccess, error } = useMemo(() => {
    if (!userInput.trim()) return { matches: [], isSuccess: false };
    
    try {
      // Parse pattern and flags from input like /pattern/flags
      const match = userInput.match(/^\/(.+)\/([gimuy]*)$/);
      if (!match) return { matches: [], isSuccess: false, error: '형식이 올바르지 않습니다. (예: /pattern/g)' };
      
      const regex = new RegExp(match[1], match[2]);
      const found = data.target.match(regex) || [];
      
      // Check success: do the found matches exactly equal the expected matches?
      const isSuccess = JSON.stringify(found) === JSON.stringify(data.expectedMatches);
      
      return { matches: found, isSuccess };
    } catch (e) {
      return { matches: [], isSuccess: false, error: '유효하지 않은 정규식입니다.' };
    }
  }, [userInput, data]);

  return (
    <div className={`info-box ${isSuccess ? 'success' : 'info'}`} style={{ marginBottom: '20px', transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Q{data.id}. {data.title} <span style={{ fontSize: '0.8rem', fontWeight: 'normal', opacity: 0.7 }}>[{data.level}]</span></h3>
        {isSuccess && <span style={{ color: '#059669', fontWeight: 'bold' }}>✅ 통과!</span>}
      </div>
      
      <p style={{ marginTop: '10px', fontSize: '0.95rem' }}>{data.description}</p>
      
      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '10px', fontSize: '0.9rem' }}>
        <strong>대상 문자열:</strong> <span style={{ fontFamily: 'monospace' }}>"{data.target}"</span>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input 
          type="text" 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="/정규식/플래그"
          style={{ 
            flex: 1, 
            padding: '10px', 
            borderRadius: '4px', 
            border: `2px solid ${isSuccess ? '#10b981' : (error ? '#ef4444' : '#cbd5e1')}`,
            fontFamily: 'monospace',
            outline: 'none'
          }}
        />
      </div>

      {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-5px' }}>{error}</p>}

      <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
        <strong>매칭 결과:</strong> {matches.length > 0 ? (
          matches.map((m, i) => <span key={i} style={{ background: '#dcfce7', padding: '2px 6px', borderRadius: '3px', margin: '0 3px', border: '1px solid #86efac' }}>{m}</span>)
        ) : <span style={{ opacity: 0.5 }}>없음</span>}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setShowHint(!showHint)} 
          style={{ padding: '5px 12px', fontSize: '0.85rem', cursor: 'pointer', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px' }}
        >
          {showHint ? '힌트 닫기' : '힌트 보기'}
        </button>
        <button 
          onClick={() => setShowSolution(!showSolution)} 
          style={{ padding: '5px 12px', fontSize: '0.85rem', cursor: 'pointer', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px' }}
        >
          {showSolution ? '정답 숨기기' : '정답 보기'}
        </button>
      </div>

      {showHint && (
        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#4b5563', fontStyle: 'italic', padding: '8px', background: '#fffbeb', borderRadius: '4px' }}>
          💡 {data.hint}
        </div>
      )}

      {showSolution && (
        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#1e293b', padding: '8px', background: '#f8fafc', borderRadius: '4px', borderLeft: '3px solid #64748b' }}>
          🎯 정답 예시: <code>{data.solution}</code>
        </div>
      )}
    </div>
  );
};

const JsRegExpQuiz = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="RegExp Challenge: 정규식 퀴즈"
        subtitle="배운 내용을 실전 문제로 테스트해보세요. 정규식 마스터로 가는 마지막 단계입니다!"
      />

      <div className="info-box success" style={{ marginBottom: '30px' }}>
        <strong>🎮 퀴즈 규칙:</strong>
        <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>
          1. 각 문제의 요구사항에 맞는 정규식 패턴을 <code>/pattern/flags</code> 형태로 입력하세요.<br/>
          2. 대상 문자열에서 예상 매칭 값들이 정확히 추출되면 성공입니다.<br/>
          3. 도저히 모르겠다면 힌트나 정답 보기를 활용하세요!
        </p>
      </div>

      {QUIZ_DATA.map(quiz => (
        <QuizItem key={quiz.id} data={quiz} />
      ))}

      <RelatedLinks
        links={[
          {
            path: "/js/regexp",
            title: "정규식 학습 페이지로",
            description: "다시 한번 개념을 복습하고 싶다면?",
            icon: "📚"
          }
        ]}
      />
    </div>
  );
};

export default JsRegExpQuiz;
