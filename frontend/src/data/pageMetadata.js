/**
 * pageMetadata.js
 * 각 학습 페이지에 대한 메타데이터 (태그, 설명 등)
 * 검색 기능에서 사용됩니다.
 */

export const pageMetadata = [
    {
        path: '/js-basics/variables',
        title: '변수와 데이터 타입',
        tags: [
            'javascript', '변수', 'variable', 'let', 'const', 'var', 'data types',
            'string', 'number', 'boolean', 'null', 'undefined', 'object', 'symbol', 'bigint',
            'primitive', 'reference', 'typing', '동적 타이핑', 'autoboxing', 'wrapper object',
            'constructor', '래퍼 객체', '생성자'
        ],
        description: 'JavaScript의 기본 변수 선언 방식과 7가지 원시 타입을 학습합니다.'
    },
    {
        path: '/js-basics/operators',
        title: '기본 연산자',
        tags: [
            'operator', '연산자', '산술 연산자', '비교 연산자', '논리 연산자',
            '+', '-', '*', '/', '%', '++', '--', '==', '===', '!=', '!==',
            '&&', '||', '!', '삼항 연산자', 'ternary'
        ],
        description: '산술, 비교, 논리 연산자를 이용한 데이터 조작 방법을 배웁니다.'
    },
    {
        path: '/js-control/conditionals',
        title: '조건문 (if, switch)',
        tags: [
            'control flow', '조건문', 'if', 'else', 'else if', 'switch', 'case', 'break', 'default',
            'falsy', 'truthy', '분기처리', '제어 흐름'
        ],
        description: '상황에 따라 다른 코드를 실행하는 조건문 사용법을 익힙니다.'
    },
    {
        path: '/js-control/loops',
        title: '반복문 (for, while)',
        tags: [
            'loop', '반복문', 'for', 'while', 'do-while', 'break', 'continue',
            'iteration', '중첩 반복문', '무한 루프'
        ],
        description: '동일한 작업을 반복해서 수행하는 반복문 핵심 문법을 배웁니다.'
    },
    {
        path: '/js-functions/basics',
        title: '함수 선언과 호출',
        tags: [
            'function', '함수', 'declaration', 'expression', 'parameter', 'argument',
            'return', 'scope', '매개변수', '인자', '반환값', '유효범위'
        ],
        description: '함수를 정의하고 호출하는 다양한 방식과 스코프의 개념을 이해합니다.'
    },
    {
        path: '/js-functions/arrow',
        title: '화살표 함수 & This',
        tags: [
            'arrow function', '화살표 함수', 'this', 'lexical this', 'callback',
            'ES6', '익명 함수', '문법 설탕'
        ],
        description: 'ES6에서 도입된 화살표 함수의 문법과 this 바인딩의 차이를 배웁니다.'
    },
    {
        path: '/js-objects/arrays',
        title: '배열과 고차 함수',
        tags: [
            'array', '배열', 'method', 'map', 'filter', 'reduce', 'forEach',
            'push', 'pop', 'shift', 'unshift', 'splice', 'slice', '고차 함수',
            'HOC', '배열 내장 함수'
        ],
        description: '배열을 조작하는 다양한 내장 메서드와 강력한 고차 함수 사용법을 학습합니다.'
    },
    {
        path: '/js-objects/objects',
        title: '객체와 구조 분해',
        tags: [
            'object', '객체', 'property', 'key', 'value', 'destructuring',
            'spread', 'rest', 'shorthand', '구조 분해 할당', '전개 연산자',
            'JSON', 'prototype'
        ],
        description: '객체 지향 프로그래밍의 기초인 객체 구조와 최신 ES6+ 문법을 배웁니다.'
    },
    {
        path: '/js-dom/manipulation',
        title: '요소 선택과 수정',
        tags: [
            'dom', 'manipulation', 'querySelector', 'getElementById', 'innerHTML',
            'textContent', 'style', 'classList', 'attribute', '요소 선택', '문서 객체 모델'
        ],
        description: '자바스크립트로 HTML 요소를 찾고 내용을 수정하거나 스타일을 바꾸는 방법을 배웁니다.'
    },
    {
        path: '/js-dom/events',
        title: '이벤트 핸들링',
        tags: [
            'event', 'listener', 'onclick', 'addEventListener', 'bubbling',
            'capturing', 'preventDefault', 'stopPropagation', '이벤트 전파',
            '마우스 이벤트', '키보드 이벤트'
        ],
        description: '사용자의 클릭, 입력 등 다양한 브라우저 이벤트를 감지하고 처리하는 법을 익힙니다.'
    },
    {
        path: '/js-async/basics',
        title: 'Promise & Async/Await',
        tags: [
            'async', '비동기', 'promise', 'resolve', 'reject', 'then', 'catch',
            'async', 'await', 'callback hell', '싱글 스레드', '이벤트 루프'
        ],
        description: '시간이 걸리는 작업을 효율적으로 처리하는 비동기 프로그래밍의 핵심을 학습합니다.'
    },
    {
        path: '/js-async/fetch',
        title: 'Fetch API & 서버 통신',
        tags: [
            'fetch', 'api', 'http', 'get', 'post', 'json', 'response', 'request',
            '서버 통신', 'ajax', 'network'
        ],
        description: 'Fetch API를 사용하여 외부 데이터를 가져오고 서버와 통신하는 방법을 배웁니다.'
    },
    {
        path: '/js-basics/bigint',
        title: 'BigInt 심화 학습',
        tags: [
            'bigint', 'number', 'precision', 'arbitrary-precision', 'n', 'MAX_SAFE_INTEGER',
            '정밀도', '수학', '금융', '암호학'
        ],
        description: 'Number의 한계를 넘어서는 아주 큰 정수를 안전하게 다루는 BigInt를 학습합니다.'
    },
    {
        path: '/js-basics/conversion',
        title: '데이터 타입 변환',
        tags: [
            'type conversion', 'coercion', 'number', 'string', 'boolean', 'parse',
            'truthy', 'falsy', 'short-circuit', '단락 평가', '||', '&&', '!!',
            '명시적 변환', '암시적 변환'
        ],
        description: '명시적/암시적 형변환의 규칙과 Truthy & Falsy의 실전 활용 패턴을 마스터합니다.'
    },
    {
        path: '/js/precision',
        title: '숫자 계산 오차와 정밀도',
        tags: [
            'number', 'precision', 'floating point', 'IEEE 754', '0.1+0.2',
            'Number.EPSILON', 'toFixed', 'math', '정밀도', '계산 오차',
            'safe integer', 'MAX_SAFE_INTEGER', 'Infinity', 'NaN'
        ],
        description: '부동 소수점 오차의 원인과 Number.EPSILON, 정수 확장 등 실전 해결책을 학습합니다.'
    }
];

/**
 * 검색어로 페이지 검색
 * @param {string} query - 검색어
 * @returns {Array} - 매칭된 페이지 목록
 */
export function searchPages(query) {
    if (!query || !query.trim()) return [];

    const lowerQuery = query.toLowerCase().trim();

    return pageMetadata.filter(page => {
        const inTitle = page.title.toLowerCase().includes(lowerQuery);
        const inTags = page.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        const inDescription = page.description.toLowerCase().includes(lowerQuery);
        return inTitle || inTags || inDescription;
    }).map(page => ({
        ...page,
        // 매칭된 태그 하이라이트를 위해 별도 표시
        matchedTags: page.tags.filter(tag => tag.toLowerCase().includes(lowerQuery))
    }));
}
