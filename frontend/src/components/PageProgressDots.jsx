import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageProgressDots.css';

/**
 * PageProgressDots
 * 화면 우측에 페이지 내 섹션들을 점으로 표시하고, 스크롤 위치에 따라 활성화된 점을 표시합니다.
 * 점을 클릭하면 해당 섹션으로 부드럽게 이동합니다.
 */
function PageProgressDots() {
    const [sections, setSections] = useState([]);
    const [activeId, setActiveId] = useState('');
    const location = useLocation();

    // 드래그 상태 관리
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: null, y: null });
    const dragOffset = useRef({ x: 0, y: 0 });
    const navRef = useRef(null);

    // 페이지 내의 모든 CollapsibleSection(data-section 속성 보유)을 찾습니다.
    const findSections = useCallback(() => {
        const sectionNodes = document.querySelectorAll('section[data-section]');
        const sectionData = Array.from(sectionNodes).map(node => ({
            id: node.id,
            title: node.querySelector('.section-title span')?.textContent || node.id
        }));
        setSections(sectionData);
    }, []);

    useEffect(() => {
        // 즉시 실행 및 지연 실행 (컴포넌트 렌더링 대기)
        queueMicrotask(() => findSections());
        const timer1 = setTimeout(findSections, 100);
        const timer2 = setTimeout(findSections, 500);

        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sectionNodes = document.querySelectorAll('section[data-section]');
        sectionNodes.forEach(node => observer.observe(node));

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            observer.disconnect();
        };
    }, [findSections, location.pathname]);

    // --- 드래그 핸들러 ---
    const handleStart = (e) => {
        if (e.target.closest('.dot-button')) return; // 점 클릭 시에는 이동 안 함

        setIsDragging(true);
        const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

        const rect = navRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const handleMove = useCallback((e) => {
        if (!isDragging) return;

        const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        setPosition({
            x: clientX - dragOffset.current.x,
            y: clientY - dragOffset.current.y
        });
    }, [isDragging]);

    const handleEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // 화면 리사이즈 시 위치 보정 (화면 바깥으로 나가지 않게)
    const handleResize = useCallback(() => {
        if (position.x === null) return;

        const rect = navRef.current?.getBoundingClientRect();
        if (!rect) return;

        const maxX = window.innerWidth - rect.width - 20;
        const maxY = window.innerHeight - rect.height - 20;

        setPosition(prev => ({
            x: Math.min(Math.max(20, prev.x), maxX),
            y: Math.min(Math.max(20, prev.y), maxY)
        }));
    }, [position]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleEnd);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('resize', handleResize);
        };
    }, [isDragging, handleMove, handleEnd, handleResize]);

    const scrollToSection = (e, id) => {
        e.stopPropagation(); // 드래그 이벤트 방지
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToTop = (e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = (e) => {
        e.stopPropagation();
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };

    if (sections.length === 0) return null;

    const dragStyle = position.x !== null ? {
        left: `${position.x}px`,
        top: `${position.y}px`,
        right: 'auto',
        bottom: 'auto',
        transform: 'none'
    } : {};

    return (
        <nav
            ref={navRef}
            className={`page-progress-dots ${isDragging ? 'is-dragging' : ''}`}
            style={dragStyle}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            aria-label="Page navigation"
        >
            <div className="dots-container">
                <button 
                    className="scroll-trigger top" 
                    onClick={scrollToTop}
                    title="맨 위로"
                    aria-label="Scroll to top"
                >
                    <span className="arrow-icon">▲</span>
                </button>

                <div className="dots-list">
                    {sections.map(section => (
                        <div
                            key={section.id}
                            className={`dot-wrapper ${activeId === section.id ? 'active' : ''}`}
                            onClick={(e) => scrollToSection(e, section.id)}
                        >
                            <span className="dot-tooltip">{section.title}</span>
                            <button
                                className="dot-button"
                                aria-label={`Scroll to ${section.title}`}
                            />
                        </div>
                    ))}
                </div>

                <button 
                    className="scroll-trigger bottom" 
                    onClick={scrollToBottom}
                    title="맨 아래로"
                    aria-label="Scroll to bottom"
                >
                    <span className="arrow-icon">▼</span>
                </button>
            </div>
        </nav>
    );
}

export default PageProgressDots;
