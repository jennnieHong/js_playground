/**
 * BackToSearch.jsx
 * 검색 결과에서 온 경우 "뒤로가기" 버튼을 표시하는 컴포넌트
 */
import { useNavigate, useLocation } from 'react-router-dom';

function BackToSearch() {
    const navigate = useNavigate();
    const location = useLocation();

    // location.state에서 검색 정보 확인 (SearchResults에서 전달)
    const searchQuery = location.state?.fromSearch;

    if (!searchQuery) {
        return null; // 검색에서 오지 않았으면 표시 안 함
    }

    const handleBack = () => {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <button className="back-to-search" onClick={handleBack}>
            ← 검색 결과로 ({searchQuery})
        </button>
    );
}

export default BackToSearch;
