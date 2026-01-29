import { Link } from 'react-router-dom';

/**
 * RelatedLinks Component
 * Displays a list of related study pages at the bottom of a page.
 * 
 * @param {Object} props
 * @param {Array} props.links - List of link objects { path, title, description, icon }
 */
function RelatedLinks({ links }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="related-links-container">
      <h3 className="related-links-title">🔗 연관 학습 가이드</h3>
      <div className="related-links-grid">
        {links.map((link, index) => (
          <Link key={index} to={link.path} className="related-link-card">
            <div className="related-link-icon">{link.icon}</div>
            <div className="related-link-content">
              <h4 className="related-link-name">{link.title}</h4>
              <p className="related-link-desc">{link.description}</p>
            </div>
            <div className="related-link-arrow">→</div>
          </Link>
        ))}
      </div>

      <style>{`
        .related-links-container {
          margin-top: var(--spacing-2xl);
          padding-top: var(--spacing-xl);
          border-top: 1px solid var(--border-color);
        }
        .related-links-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--spacing-lg);
        }
        .related-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-md);
        }
        .related-link-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          text-decoration: none;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }
        .related-link-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary-color);
          box-shadow: var(--shadow-lg);
          background: var(--bg-tertiary);
        }
        .related-link-icon {
          font-size: 1.5rem;
          min-width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          border-radius: var(--radius-md);
        }
        .related-link-content {
          flex: 1;
        }
        .related-link-name {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }
        .related-link-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.4;
        }
        .related-link-arrow {
          font-size: 1.2rem;
          color: var(--primary-color);
          opacity: 0;
          transition: all var(--transition-base);
          transform: translateX(-10px);
        }
        .related-link-card:hover .related-link-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
}

export default RelatedLinks;
