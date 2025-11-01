import Button from '../Button/Button';
import './tratamientoPublicCard.css';
import { FiClock, FiCalendar, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

const TratamientoPublicCard = ({ tratamiento, onSolicitar }) => {
  const { titulo, descripcion, duracion, disponibilidad, abono } = tratamiento;

  return (
    <div className="tratamiento-public-card">
      <div className="tpc-content">
        <div className="tpc-header">
          <h3>{titulo}</h3>
          <p>{descripcion}</p>
        </div>
        <div className="tpc-info-list">
          <div className="tpc-info-item">
            <FiClock />
            <span>Duración: {duracion}</span>
          </div>
          <div className="tpc-info-item">
            <FiCalendar />
            <span>{disponibilidad}</span>
          </div>
          {abono && (
            <div className="tpc-info-item abono">
              <FiDollarSign />
              <span>Se puede abonar</span>
            </div>
          )}
        </div>
      </div>
      <div className="tpc-footer">
        <Button
          variant="primary"
          icon={<FiCheckCircle />}
          onClick={onSolicitar}
        >
          Solicitar Turno
        </Button>
      </div>
    </div>
  );
};

export default TratamientoPublicCard;