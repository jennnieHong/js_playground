import { useState, useEffect } from 'react';

/**
 * ThemeToggle Component
 * Handles switching between light and dark modes.
 * Persists user preference in localStorage.
 */
function ThemeToggle({ isCollapsed }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return false; // Default to Light Mode (Bright Mode)
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className={`theme-toggle-wrapper ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="theme-toggle-btn" 
        onClick={toggleTheme}
        title={isDarkMode ? "Switch to Bright Mode" : "Switch to Dark Mode"}
      >
        <span className="theme-toggle-icon">
          {isDarkMode ? '☀️' : '🌙'}
        </span>
        {!isCollapsed && (
          <span className="theme-toggle-text">
            {isDarkMode ? 'Bright Mode' : 'Dark Mode'}
          </span>
        )}
      </button>

      <style>{`
        .theme-toggle-wrapper {
          padding: var(--spacing-md);
          border-top: 1px solid var(--border-color);
          margin-top: auto;
        }
        .theme-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-weight: 500;
          justify-content: flex-start;
        }
        .theme-toggle-btn:hover {
          background: var(--bg-secondary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .theme-toggle-wrapper.collapsed {
          padding: var(--spacing-sm);
        }
        .theme-toggle-wrapper.collapsed .theme-toggle-btn {
          justify-content: center;
          padding: var(--spacing-md) 0;
        }
        .theme-toggle-icon {
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
        }
        .theme-toggle-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}

export default ThemeToggle;
