/**
 * ScrollButtons.jsx
 * 화면 우측 하단에 표시되는 스크롤 버튼 (최상단/최하단 이동)
 */
import { useState, useEffect } from 'react';

function ScrollButtons() {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 스크롤이 100px 이상 내려가면 버튼 표시
            setShowButtons(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    if (!showButtons) {
        return null;
    }

    return (
        <div className="scroll-buttons">
            <button
                className="scroll-btn scroll-top"
                onClick={scrollToTop}
                aria-label="맨 위로"
                title="맨 위로"
            >
                ↑
            </button>
            <button
                className="scroll-btn scroll-bottom"
                onClick={scrollToBottom}
                aria-label="맨 아래로"
                title="맨 아래로"
            >
                ↓
            </button>
        </div>
    );
}

export default ScrollButtons;
