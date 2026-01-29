/**
 * HeaderSearch.jsx
 * 상단 헤더에 배치되는 검색 input 컴포넌트
 * 검색 시 오버레이로 결과를 표시하여 현재 페이지를 유지
 */
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchPages } from '../data/pageMetadata';

function HeaderSearch() {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(() => searchParams.get('q') || '');
    const [showOverlay, setShowOverlay] = useState(false);
    const [results, setResults] = useState([]);
    const searchContainerRef = useRef(null);
    const lastSyncedQuery = useRef(searchParams.get('q') || '');

    // URL에서 검색어를 읽어와 input에 자동 입력
    useEffect(() => {
        const urlQuery = searchParams.get('q') || '';
        if (urlQuery !== lastSyncedQuery.current) {
            queueMicrotask(() => setQuery(urlQuery));
            lastSyncedQuery.current = urlQuery;
        }
    }, [searchParams]);

    // ESC 키로 오버레이 닫기 및 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setShowOverlay(false);
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape' && showOverlay) {
                setShowOverlay(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showOverlay]);

    // 검색어 변경 처리
    const handleQueryChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim()) {
            const searchResults = searchPages(value.trim());
            setResults(searchResults);
            setShowOverlay(true);
        } else {
            setResults([]);
            setShowOverlay(false);
        }
    };

    // 검색 제출 (Enter 키)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            const searchResults = searchPages(query.trim());
            setResults(searchResults);
            setShowOverlay(true);
        }
    };

    // 결과 클릭 시 네비게이션 및 오버레이 닫기
    const handleResultClick = () => {
        setShowOverlay(false);
        setQuery('');
        setResults([]);
    };

    return (
        <div className="header-search-container" ref={searchContainerRef}>
            <form className="header-search" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="header-search-input"
                    placeholder="검색어 입력..."
                    value={query}
                    onChange={handleQueryChange}
                    onFocus={() => query.trim() && setShowOverlay(true)}
                />
                <button type="submit" className="header-search-btn" aria-label="검색">
                    🔍
                </button>
            </form>

            {/* 검색 결과 드롭다운 */}
            {showOverlay && (
                <div className="header-search-dropdown">
                    <div className="header-search-dropdown-header">
                        <span>검색 결과 ({results.length}건)</span>
                        <span className="keyboard-hint"><kbd>ESC</kbd></span>
                    </div>

                    <div className="header-search-dropdown-body">
                        {results.length > 0 ? (
                            <div className="dropdown-results-list">
                                {results.map((page) => (
                                    <Link
                                        key={page.path}
                                        to={page.path}
                                        className="dropdown-result-item"
                                        onClick={handleResultClick}
                                    >
                                        <div className="result-info">
                                            <h4 className="result-title">{page.title}</h4>
                                            <p className="result-description">{page.description}</p>
                                        </div>
                                        <div className="result-tags">
                                            {page.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`result-tag ${page.matchedTags?.includes(tag) ? 'matched' : ''}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="dropdown-no-results">
                                <p>😢 결과가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HeaderSearch;
