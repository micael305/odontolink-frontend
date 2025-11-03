import Button from '../Button/Button';
import './confirmModal.css';
import { FiX, FiAlertTriangle } from 'react-icons/fi';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  warningText,
  confirmText = 'Confirmar',
  confirmVariant = 'danger',
}) => {
  if (!isOpen) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal-content" onClick={handleStopPropagation}>
        <div className="confirm-modal-header">
          <h2>{title}</h2>
          <button className="confirm-modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="confirm-modal-body">
          <p>{children}</p>
          {warningText && (
            <div className="confirm-warning-box">
              <FiAlertTriangle />
              <span>{warningText}</span>
            </div>
          )}
        </div>

        <div className="confirm-modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;