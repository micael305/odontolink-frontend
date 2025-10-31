import Button from '../Button/Button';
import './confirmarEliminacionModal.css';
import { FiX, FiAlertTriangle } from 'react-icons/fi';

const ConfirmarEliminacionModal = ({
  isOpen,
  onClose,
  onConfirm,
  tratamientoNombre,
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
          <h2>Confirmar Eliminación</h2>
          <button className="confirm-modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="confirm-modal-body">
          <p>
            ¿Está seguro que desea eliminar "
            <strong>{tratamientoNombre}</strong>" de su catálogo?
          </p>
          <div className="confirm-warning-box">
            <FiAlertTriangle />
            <span>
              Esta acción no se puede deshacer. El tratamiento dejará de
              aparecer en su perfil público.
            </span>
          </div>
        </div>

        <div className="confirm-modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarEliminacionModal;