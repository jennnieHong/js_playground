/**
 * pageMetadata.js
 * 각 학습 페이지에 대한 메타데이터 (태그, 설명 등)
 * 검색 기능에서 사용됩니다.
 */

export const pageMetadata = [
    {
        path: '/js/basics',
        title: '1. 변수와 문법 기초',
        tags: [
            'javascript', '변수', 'variable', 'let', 'const', 'var', 'data types',
            'string', 'number', 'boolean', 'null', 'undefined', 'object', 'symbol', 'bigint',
            'primitive', 'reference', 'autoboxing', 'wrapper object', '래퍼 객체', '생성자'
        ],
        description: 'JavaScript의 기본 변수 선언 방식과 7가지 원시 타입을 학습합니다.'
    },
    {
        path: '/js/bigint',
        title: '2. BigInt 심화 학습',
        tags: [
            'bigint', 'number', 'precision', 'arbitrary-precision', 'n', 'MAX_SAFE_INTEGER',
            '정밀도', '수학', '금융', '암호학'
        ],
        description: 'Number의 한계를 넘어서는 아주 큰 정수를 안전하게 다루는 BigInt를 학습합니다.'
    },
    {
        path: '/js/conversion',
        title: '3. 데이터 타입 변환',
        tags: [
            'type conversion', 'coercion', 'number', 'string', 'boolean', 'parse',
            'truthy', 'falsy', 'short-circuit', '단락 평가', '명시적 변환', '암시적 변환'
        ],
        description: '명시적/암시적 형변환의 규칙과 Truthy & Falsy의 실전 활용 패턴을 마스터합니다.'
    },
    {
        path: '/js/operators',
        title: '4. 연산자 마스터',
        tags: [
            'operator', '연산자', '산술 연산자', '비교 연산자', '논리 연산자',
            '+', '-', '*', '/', '%', '++', '--', '==', '===', '!=', '!==',
            '&&', '||', '!', '??', '널 병합', 'nullish', '삼항 연산자', 'ternary', 'logical assignment'
        ],
        description: '산술, 비교, 논리 연산자를 이용한 데이터 조작 방법을 배웁니다.'
    },
    {
        path: '/js/conditionals',
        title: '5. 조건문 (if, switch)',
        tags: [
            'control flow', '조건문', 'if', 'else', 'else if', 'switch', 'case', 'break', 'default',
            'falsy', 'truthy', '제어 흐름'
        ],
        description: '상황에 따라 다른 코드를 실행하는 조건문 사용법을 익힙니다.'
    },
    {
        path: '/js/loops',
        title: '6. 반복문 (Loops)',
        tags: [
            'loop', '반복문', 'for', 'while', 'for of', 'for in', 'break', 'continue',
            'iteration', '중첩 반복문', '프로토타입 오염'
        ],
        description: '동일한 작업을 반복해서 수행하는 반복문 핵심 문법을 배웁니다.'
    },
    {
        path: '/js/iterables',
        title: '7. 이터러블 프로토콜',
        tags: [
            'iterable', 'iterator', 'protocol', 'Symbol.iterator', 'next', 'custom iterable',
            '이터러블', '이터레이터', '프로토콜', '순회', 'for of', 'iteration protocol'
        ],
        description: '객체가 순회 가능해지는 원리인 이터러블과 이터레이터 프로토콜을 학습합니다.'
    },
    {
        path: '/js/spread-destructuring',
        title: '8. 스프레드 & 구조 분해 할당',
        tags: [
            'spread', 'rest', 'destructuring', '스프레드', '구조 분해', '전개 연산자',
            '나머지 매개변수', '객체 복사', '불변성', 'Shallow Copy', 'Deep Copy', '얕은 복사', '깊은 복사'
        ],
        description: '데이터를 펼치고 분해하여 효율적으로 할당하는 모던 JS 문법을 배웁니다.'
    },
    {
        path: '/js/reference-types',
        title: '9. 참조 타입과 객체심화',
        tags: [
            'reference type', 'object', 'array', 'map', 'set', 'memory', 'address', 'autoboxing',
            'wrapper object', '참조 타입', '메모리 주소', '래퍼 객체', 'Array.isArray', '판별', 'logic',
            'JSON', 'parse', 'stringify', 'JSON Loss', 'Boxing', 'Boxing/Unboxing', 'Constructor vs Function'
        ],
        description: 'Reference 타입의 주소 참조 방식과 JSON 파싱, 래퍼 객체의 생성 원리를 배웁니다.'
    },
    {
        path: '/js/array-like',
        title: '10. 유사 배열 객체',
        tags: [
            'array-like', '유사 배열', 'length', 'index', 'arguments', 'NodeList',
            'HTMLCollection', 'Array.from', '형변환', 'Built-in vs Custom', 'Symbol.iterator'
        ],
        description: '배열인 듯 배열 아닌 유사 배열의 정체와 진짜 배열로 변환하는 방법을 배웁니다.'
    },
    {
        path: '/js/functions',
        title: '11. 함수와 클로저',
        tags: [
            'function', '함수', 'declaration', 'expression', 'arrow function', 'closure',
            'scope', 'parameter', 'return', '매개변수', '클로저', 'Hoisting', '호이스팅',
            'Encapsulation', 'Information Hiding', 'Private Variables', '캡슐화', '정보 은닉', 'arguments vs Rest'
        ],
        description: '함수의 정의, 호이스팅, 캡슐화를 위한 클로저와 매개변수 관리 기법을 이해합니다.'
    },
    {
        path: '/js/arrays',
        title: '12. 배열 마스터 (Arrays Mastery)',
        tags: [
            'array', '배열', 'method', 'map', 'filter', 'reduce', 'forEach',
            'push', 'pop', 'splice', 'slice', '고차 함수', 'HOC', 'Pros & Cons', 'reduce Precautions', 'Initial Value'
        ],
        description: '배열 조작 메서드와 고차 함수의 장단점 및 reduce 사용 시의 주의사항을 학습합니다.'
    },
    {
        path: '/js/objects',
        title: '13. 객체와 프로퍼티',
        tags: [
            'object', '객체', 'property', 'key', 'value', 'shorthand', 'JSON', 'prototype'
        ],
        description: '객체 지향 프로그래밍의 기초인 객체 구조와 프로토타입을 배웁니다.'
    },
    {
        path: '/js/dom-manipulation',
        title: '14. DOM 조작기초',
        tags: [
            'dom', 'manipulation', 'querySelector', 'innerHTML', 'textContent', 'style', 'classList',
            'dataset', 'data-*', 'custom data', 'metadata', '데이터셋', '데이터 속성',
            'reflow', 'repaint', 'layout thrashing', 'performance', '성능 최적화',
            'collapsible', 'section toggle', 'open all', 'close all', '전체 열기', '전체 닫기'
        ],
        description: '자바스크립트로 HTML 요소를 찾고 수정하는 방법을 배웁니다.'
    },
    {
        path: '/js/dom-essentials',
        title: '14.5 DOM 핵심 요소',
        tags: [
            'dom', 'essentials', 'element', 'node', 'tree', 'traversal', 'hierarchy',
            'identity', 'data', 'interaction', 'structure', '핵심 요소', '노드', '트리 구조',
            'collapsible', 'section toggle', 'nodeType', 'tagName', 'dataset', 'parentElement', 'children',
            'carousel', 'slider', 'slide', 'translateX', '슬라이더', '캐러셀', '이동'
        ],
        description: 'DOM의 논리적 구조와 요소를 다룰 때 반드시 알아야 할 핵심 속성들을 학습합니다.'
    },
    {
        path: '/js/browser-bom-dom',
        title: '14.7 브라우저 객체 (BOM vs DOM)',
        tags: [
            'window', 'document', 'BOM', 'DOM', 'navigator', 'location', 'history', 'screen',
            'global object', '전역 객체', '계층 구조', 'hierarchy', 'browser object model'
        ],
        description: '브라우저 환경의 전역 객체인 window(BOM)와 그 자식인 document(DOM)의 관계와 역할을 이해합니다.'
    },
    {
        path: '/js/bom-mastery',
        title: '14.8 BOM API 마스터 (Deep Dive)',
        tags: [
            'BOM', 'window', 'location', 'navigator', 'history', 'screen', 'mastery',
            'URLSearchParams', 'pushState', 'popstate', 'userAgent', 'deep dive', '상세 학습'
        ],
        description: '브라우저 자체를 제어하는 BOM의 핵심 객체(Location, History, Navigator 등)를 상세히 학습합니다.'
    },
    {
        path: '/js/events',
        title: '15. 이벤트 핸들링',
        tags: [
            'event', 'listener', 'onclick', 'addEventListener', 'bubbling', 'capturing'
        ],
        description: '사용자의 입력을 감지하고 처리하는 이벤트를 배웁니다.'
    },
    {
        path: '/js/async-basics',
        title: '16. 비동기 기초 (Promise)',
        tags: [
            'async', '비동기', 'promise', 'then', 'catch', 'await', 'event loop'
        ],
        description: '비동기 프로그래밍의 핵심인 Promise와 Async/Await를 학습합니다.'
    },
    {
        path: '/js/async-fetch',
        title: '17. Fetch & APIs',
        tags: [
            'fetch', 'api', 'http', 'json', 'server', 'network'
        ],
        description: '네트워크를 통해 서버와 통신하는 방법을 배웁니다.'
    },
    {
        path: '/js/modern',
        title: '18. ES6+ 모던 기능',
        tags: [
            'modern', 'ES6+', 'optional chaining', 'nullish coalescing', '백틱', 'template literal'
        ],
        description: '최신 자바스크립트의 유용한 문법들을 정리합니다.'
    },
    {
        path: '/js/precision',
        title: '19. 숫자 정밀도와 오차',
        tags: [
            'precision', 'number', 'error', 'floating point', 'IEEE 754'
        ],
        description: '소수점 계산 오차의 원인과 해결책을 배웁니다.'
    },
    {
        path: '/js/type-checking',
        title: '20. 타입 판별 끝판왕',
        tags: [
            'type checking', 'typeof', 'instanceof', 'Array.isArray', 'Object.prototype.toString',
            '타입 판별', '정체 파악', '검사', 'ultimate type checking'
        ],
        description: '자바스크립트의 복잡한 타입 체계를 완벽하게 파악하는 4가지 방법과 실무 활용법을 배웁니다.'
    },
    {
        path: '/js/prototypes',
        title: '21. 프로토타입과 상속',
        tags: [
            'prototype', 'inheritance', 'prototype chain', '__proto__', 'constructor',
            'shadowing', '상속', '프로토타입', '유전자', 'Object.create'
        ],
        description: '자바스크립트의 핵심 원리인 프로토타입과 상속 체계, 유연한 코드 공유 방식을 학습합니다.'
    },
    {
        path: '/js-css/dom-styling',
        title: 'CSS+JS: Styling & ClassList',
        tags: [
            'dom styling', 'classList', 'inline style', 'className', 'add', 'remove', 'toggle', '스타일 제어', '클래스 조작',
            'Decision Tree', 'Reflow', 'Repaint', 'Performance', 'best practices', '결정 가이드', '성능 최적화'
        ],
        description: 'JS로 스타일을 직접 조작하는 법과 클래스 기반 제어의 차이점, 그리고 성능을 위한 Best Practice(Decision Tree)를 배웁니다.'
    },
    {
        path: '/js-css/variables',
        title: 'CSS+JS: CSS Variables',
        tags: ['css variables', 'custom properties', 'setProperty', 'getPropertyValue', 'dynamic theme', '변수 제어', '동적 테마'],
        description: 'JS를 이용해 CSS 변수를 실시간으로 조작하여 강력한 테마 및 인터랙션을 구현하는 방법을 학습합니다.'
    },
    {
        path: '/js-css/computed',
        title: 'CSS+JS: Computed Styles & Rects',
        tags: ['getComputedStyle', 'getBoundingClientRect', 'rect', 'layout', 'styling measurement', '스타일 측정', '위치 계산'],
        description: '브라우저가 렌더링한 최종 스타일과 요소의 정밀한 위치 정보를 JavaScript로 읽어오는 법을 배웁니다.'
    },
    {
        path: '/js-css/animation-events',
        title: 'CSS+JS: Animation Events',
        tags: ['transitionend', 'animationstart', 'animationend', 'animationiteration', 'events', '이벤트 감지', '애니메이션 종료'],
        description: 'CSS 트랜지션과 애니메이션의 시점을 JS로 포착하여 연속적인 로직을 구현하는 법을 학습합니다.'
    },
    {
        path: '/js/map-set',
        title: '12. Map & Set (컬렉션 심화)',
        tags: ['map', 'set', 'weakmap', 'weakset', 'collection', 'deduplication', 'memory management', '약한 참조', '중복 제거'],
        description: '객체와 배열의 한계를 극복하는 현대적인 데이터 컬렉션인 Map과 Set, 그리고 메모리 효율적인 WeakMap/WeakSet을 학습합니다.'
    },
    {
        path: '/js/advanced-js',
        title: '19. Generators & Currying (고급 함수 기법)',
        tags: ['generator', 'currying', 'hof', 'yield', 'partial application', '고차 함수', '제너레이터', '커링', '함수 합성'],
        description: '함수의 실행을 일시 중지하거나, 인자를 부분적으로 적용하는 고급 함수 제어 기법을 마스터합니다.'
    },
    {
        path: '/js/web-storage',
        title: '24. Web Storage & Observer',
        tags: ['localstorage', 'sessionstorage', 'intersection observer', 'resize observer', '브라우저 저장소', '감시자', '가시성 감지'],
        description: '데이터를 영구적으로 저장하는 방법과 요소의 변화를 감지하는 다양한 Observer API를 학습합니다.'
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
