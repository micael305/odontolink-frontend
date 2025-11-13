import Button from '../Button/Button';
import './tratamientoPublicCard.css';
import { FiClock, FiCalendar, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

const formatAvailableDays = (availabilitySlots) => {
  if (!availabilitySlots || availabilitySlots.length === 0) return [];
  
  const daysMap = {
    MONDAY: 'Lun',
    TUESDAY: 'Mar',
    WEDNESDAY: 'Mié',
    THURSDAY: 'Jue',
    FRIDAY: 'Vie',
    SATURDAY: 'Sáb',
    SUNDAY: 'Dom'
  };
  
  const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const uniqueDays = [...new Set(availabilitySlots.map(slot => slot.dayOfWeek))];
  const sortedDays = uniqueDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  
  return sortedDays.map(day => daysMap[day]);
};

const TratamientoPublicCard = ({ tratamiento, onSolicitar }) => {
  const { titulo, descripcion, duracion, disponibilidad, diasDisponibles, abono } = tratamiento;
  const formattedDays = formatAvailableDays(diasDisponibles);

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
          {formattedDays.length > 0 && (
            <div className="tpc-info-item tpc-days-available">
              <span className="tpc-days-label">Días disponibles:</span>
              <div className="tpc-days-badges">
                {formattedDays.map((day, index) => (
                  <span key={index} className="tpc-day-badge">{day}</span>
                ))}
              </div>
            </div>
          )}
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