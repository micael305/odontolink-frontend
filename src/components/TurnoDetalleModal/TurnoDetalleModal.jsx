import Button from '../Button/Button';
import './turnoDetalleModal.css';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import { useTurnoStore } from '../../context/turnoStore';

const TurnoDetalleModal = ({ isOpen, onClose, turno }) => {
  const { completeTurno, noShowTurno, status } = useTurnoStore();

  if (!isOpen || !turno) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleCompletar = async () => {
    try {
      await completeTurno(turno.id);
      onClose();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleNoAsistio = async () => {
    try {
      await noShowTurno(turno.id);
      onClose();
    } catch (e) {
      alert(e.message);
    }
  };

  const statusClass = turno.status.toLowerCase().replace('_', '-');
  const isLoading = status === 'loading';

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
            <span>{turno.patientName}</span>
          </div>
          <div className="turno-detalle-grupo">
            <label>Tratamiento</label>
            <span>{turno.treatmentName}</span>
          </div>
          <div className="turno-detalle-grupo">
            <label>Fecha y Hora</label>
            <span>
              {new Date(turno.appointmentTime).toLocaleDateString()} a las{' '}
              {turno.hora}
            </span>
          </div>
          <div className="turno-detalle-grupo">
            <label>Estado</label>
            <span className={`turno-status ${statusClass}`}>
              {turno.status}
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <Button
            variant="outline-danger"
            onClick={handleNoAsistio}
            disabled={isLoading}
          >
            No Asistió
          </Button>
          <Button
            variant="success"
            icon={<FiCheckCircle />}
            onClick={handleCompletar}
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Completar Turno'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TurnoDetalleModal;