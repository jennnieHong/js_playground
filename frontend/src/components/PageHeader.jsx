/**
 * PageHeader 컴포넌트
 * 모든 페이지의 상단 제목과 부제목 영역을 담당하는 공용 컴포넌트입니다.
 * 
 * @param {Object} props
 * @param {string} props.title - 페이지 제목
 * @param {string} props.subtitle - 페이지 부제목
 */
import BackToSearch from './BackToSearch';

function PageHeader({ title, subtitle }) {
    const toggleAll = (open) => {
        window.dispatchEvent(new CustomEvent('COLLAPSE_ALL_SECTIONS', { detail: { open } }));
    };

    return (
        <header className="page-header">
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
            <div className="header-top">
                <BackToSearch />
                <div className="section-controls">
                    <button
                        className="control-btn expand-all"
                        onClick={() => toggleAll(true)}
                        title="모든 섹션 열기"
                    />
                    <button
                        className="control-btn collapse-all"
                        onClick={() => toggleAll(false)}
                        title="모든 섹션 닫기"
                    />
                </div>
            </div>
        </header>
    );
}

export default PageHeader;
