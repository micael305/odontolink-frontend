import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './paciente.css';
import { FiCheckCircle, FiUser, FiCalendar, FiClock } from 'react-icons/fi';

const TurnoConfirmado = () => {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate('/paciente/tratamientos');
  };

  const handleReservarOtro = () => {
    navigate('/paciente/tratamientos');
  };

  return (
    <div className="page-container">
      <div className="confirmacion-card">
        <div className="confirmacion-icon">
          <FiCheckCircle />
        </div>
        <h2>¡Turno confirmado!</h2>
        <p>Tu reserva ha sido registrada exitosamente.</p>

        <div className="confirmacion-detalle-box">
          <div className="detalle-item">
            <FiUser />
            <div className="detalle-item-details">
              <label>Practicante</label>
              <span>Dra. María González</span>
            </div>
          </div>
          <div className="detalle-item">
            <FiCalendar />
            <div className="detalle-item-details">
              <label>Fecha y hora</label>
              <span>5 de Nov - 11:30</span>
            </div>
          </div>
          <div className="detalle-item">
            <FiClock />
            <div className="detalle-item-details">
              <label>Tratamiento</label>
              <span>Limpieza Dental</span>
            </div>
          </div>
        </div>

        <div className="confirmacion-actions">
          <Button variant="dark" onClick={handleVolver}>
            Volver a tratamientos
          </Button>
          <Button variant="outline-secondary" onClick={handleReservarOtro}>
            Reservar otro turno
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TurnoConfirmado;