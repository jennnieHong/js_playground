/**
 * SearchResults.jsx
 * 검색 결과를 보여주는 페이지
 */
import { useSearchParams, Link } from 'react-router-dom';
import { searchPages } from '../data/pageMetadata';
import PageHeader from '../components/PageHeader';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const results = searchPages(query);

    return (
        <div className="page-container">
            <PageHeader
                title="검색 결과"
                subtitle={query ? `"${query}" 검색 결과 (${results.length}건)` : '검색어를 입력해주세요'}
            />

            <section className="study-section">
                {results.length > 0 ? (
                    <div className="search-results-grid">
                        {results.map((page) => (
                            <Link
                                key={page.path}
                                to={page.path}
                                state={{ fromSearch: query }}
                                className="search-result-card"
                            >
                                <h3 className="search-result-title">{page.title}</h3>
                                <p className="search-result-description">{page.description}</p>
                                <div className="search-result-tags">
                                    {page.tags.slice(0, 5).map((tag) => (
                                        <span
                                            key={tag}
                                            className={`search-tag ${page.matchedTags?.includes(tag) ? 'matched' : ''}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {page.tags.length > 5 && (
                                        <span className="search-tag more">+{page.tags.length - 5}</span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : query ? (
                    <div className="no-results">
                        <p>😢 "{query}"에 대한 검색 결과가 없습니다.</p>
                        <p>다른 키워드로 검색해 보세요.</p>
                    </div>
                ) : (
                    <div className="no-results">
                        <p>🔍 상단 검색창에 키워드를 입력하고 Enter를 누르세요.</p>
                    </div>
                )}
            </section>
        </div>
    );
}

export default SearchResults;
