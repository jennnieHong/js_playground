import { useEffect } from 'react';

function Alert({ message, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container alert-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3 className="popup-title">알림</h3>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          <p className="popup-message">{message}</p>
        </div>
        <div className="popup-footer">
          <button className="btn btn-primary" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
