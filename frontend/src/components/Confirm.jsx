import { useEffect } from 'react';

function Confirm({ message, onConfirm, onCancel }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  return (
    <div className="popup-overlay" onClick={onCancel}>
      <div className="popup-container confirm-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3 className="popup-title">확인</h3>
          <button className="popup-close" onClick={onCancel}>×</button>
        </div>
        <div className="popup-body">
          <p className="popup-message">{message}</p>
        </div>
        <div className="popup-footer">
          <button className="btn btn-secondary" onClick={onCancel}>취소</button>
          <button className="btn btn-primary" onClick={onConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
