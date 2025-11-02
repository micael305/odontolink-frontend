import Button from '../Button/Button';
import './confirmarReservaModal.css';
import { FiX, FiUser, FiCalendar, FiClock } from 'react-icons/fi';

const ConfirmarReservaModal = ({
  isOpen,
  onClose,
  onConfirm,
  resumen,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <div>
            <h2>Confirmar reserva</h2>
            <p>Verifica los detalles de tu turno antes de confirmar</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="resumen-list">
            <div className="resumen-item">
              <FiUser />
              <div className="resumen-item-details">
                <label>Practicante</label>
                <span>{resumen.practicante}</span>
              </div>
            </div>
            <div className="resumen-item">
              <FiCalendar />
              <div className="resumen-item-details">
                <label>Fecha y hora</label>
                <span>
                  {resumen.fecha} - {resumen.hora}
                </span>
              </div>
            </div>
            <div className="resumen-item">
              <FiClock />
              <div className="resumen-item-details">
                <label>Tratamiento</label>
                <span>{resumen.tratamiento}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarReservaModal;