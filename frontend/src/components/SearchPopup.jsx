import { useState, useEffect, useRef } from 'react';

function SearchPopup({ onClose, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    // Mock search - replace with actual search logic
    if (value.trim()) {
      const mockResults = [
        { id: 1, title: 'Flexbox Layout', path: '/flexbox' },
        { id: 2, title: 'Grid Layout', path: '/grid' },
        { id: 3, title: 'CSS Animations', path: '/animation' }
      ].filter(item => 
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result) => {
    if (onSearch) {
      onSearch(result);
    }
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container search-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3 className="popup-title">검색</h3>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          <div className="search-input-wrapper">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="search-results">
            {results.length > 0 ? (
              <ul className="search-results-list">
                {results.map(result => (
                  <li 
                    key={result.id} 
                    className="search-result-item"
                    onClick={() => handleResultClick(result)}
                  >
                    <span className="result-title">{result.title}</span>
                    <span className="result-path">{result.path}</span>
                  </li>
                ))}
              </ul>
            ) : searchTerm ? (
              <p className="no-results">검색 결과가 없습니다.</p>
            ) : (
              <p className="search-hint">검색어를 입력하세요</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPopup;
