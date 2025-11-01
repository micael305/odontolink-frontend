// src/components/TurnoDetalleModal/TurnoDetalleModal.jsx
import Button from '../Button/Button';
import './turnoDetalleModal.css';
import { FiX } from 'react-icons/fi';

const TurnoDetalleModal = ({ isOpen, onClose, turno }) => {
  if (!isOpen || !turno) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleConfirmar = () => {
    console.log('Confirmar turno:', turno.id);
    onClose();
  };

  const handleReagendar = () => {
    console.log('Reagendar turno:', turno.id);
    onClose();
  };

  const handleCancelar = () => {
    console.log('Cancelar turno:', turno.id);
    onClose();
  };

  const statusClass = turno.estado.toLowerCase().replace(' ', '-');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <h2>Detalle del Turno</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="turno-detalle-grupo">
            <label>Paciente</label>
            <span>{turno.paciente}</span>
          </div>
          <div className="turno-detalle-grupo">
            <label>Tratamiento</label>
            <span>{turno.tratamiento}</span>
          </div>
          <div className="turno-detalle-grupo">
            <label>Fecha y Hora</label>
            <span>
              {turno.fecha} a las {turno.hora}
            </span>
          </div>
          <div className="turno-detalle-grupo">
            <label>Estado</label>
            <span className={`turno-status ${statusClass}`}>
              {turno.estado}
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="outline-danger" onClick={handleCancelar}>
            Cancelar Turno
          </Button>
          <Button variant="outline-secondary" onClick={handleReagendar}>
            Reagendar
          </Button>
          <Button variant="primary" onClick={handleConfirmar}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TurnoDetalleModal;