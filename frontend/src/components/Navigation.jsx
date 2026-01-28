import { useState, useEffect, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import ThemeToggle from './ThemeToggle';

function Navigation({ isCollapsed, onToggle }) {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const activeItemRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  // 활성화된 메뉴 항목이 화면에 보이도록 자동 스크롤
  useEffect(() => {
    if (!isCollapsed && activeItemRef.current) {
      // 약간의 지연을 주어 트랜지션 이후에 스크롤 수행
      const timer = setTimeout(() => {
        activeItemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed, location.pathname]);

  const fetchMenus = async () => {
    try {
      const response = await api.getMenus();
      if (response.success) {
        setMenus(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch menus:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMenuItem = (menu) => {
    const isActive = menu.path && location.pathname === menu.path;
    const hasChildren = menu.children && menu.children.length > 0;

    return (
      <li 
        key={menu.id} 
        className="nav-item" 
        ref={isActive ? activeItemRef : null}
      >
        {menu.path ? (
          <Link
            to={menu.path}
            className={`nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{menu.icon}</span>
            <span className="nav-title">{menu.title}</span>
          </Link>
        ) : (
          <div className="nav-category">
            <span className="nav-icon">{menu.icon}</span>
            <span className="nav-title">{menu.title}</span>
          </div>
        )}

        {hasChildren && (
          <ul className="nav-submenu">
            {menu.children.map(child => renderMenuItem(child))}
          </ul>
        )}
      </li>
    );
  };

  if (loading) {
    return (
      <nav className="navigation">
        <div className="nav-header">
          <h1 className="nav-logo">JS Study</h1>
        </div>
        <div className="nav-loading">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* 모바일 메뉴 버튼 */}
      <button
        type="button"
        className="mobile-menu-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        aria-label="Open Menu"
      >
        ☰
      </button>

      {/* 오버레이 (모바일에서 메뉴 열렸을 때) */}
      <div
        className={`nav-overlay ${!isCollapsed ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
      />

      <nav 
        ref={navRef}
        className={`navigation ${isCollapsed ? 'collapsed' : 'open'}`}
        onMouseEnter={() => {
          // 데스크톱 호버 시에도 스크롤 로직 트리거를 위해 isCollapsed 체크와 별개로 동작할 수 있게 지원
          if (activeItemRef.current) {
            activeItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }}
      >
        <div className="nav-header">
          <h1 className="nav-logo">JS Study</h1>
          {/* 모바일 전용 닫기 버튼 */}
          <button 
            type="button"
            className="nav-toggle-btn mobile-only" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggle();
            }} 
            aria-label="Toggle Navigation"
          >
            ×
          </button>
        </div>
        <ul className="nav-menu">
          {menus.map(menu => renderMenuItem(menu))}
        </ul>
        <ThemeToggle isCollapsed={isCollapsed} />
      </nav>
    </>
  );
}

export default memo(Navigation);
