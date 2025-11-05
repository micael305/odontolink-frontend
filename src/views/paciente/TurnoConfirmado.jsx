// src/views/paciente/TurnoConfirmado.jsx
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './paciente.css';
import { FiCheckCircle, FiUser, FiCalendar, FiClock } from 'react-icons/fi';
import { usePacienteStore } from '../../context/pacienteStore';

const TurnoConfirmado = () => {
  const navigate = useNavigate();
  const bookedAttention = usePacienteStore(
    (state) => state.bookedAttention
  );

  const handleVolver = () => {
    navigate('/paciente/tratamientos');
  };

  const handleReservarOtro = () => {
    navigate('/paciente/tratamientos');
  };

  if (!bookedAttention) {
    return (
      <div className="page-container">
        <div className="confirmacion-card">
          <h2>No se encontró confirmación</h2>
          <p>
            Parece que has llegado aquí por error.
          </p>
          <Button variant="dark" onClick={handleVolver}>
            Volver a tratamientos
          </Button>
        </div>
      </div>
    );
  }

  const {
    practitionerName,
    treatmentName,
    appointments,
  } = bookedAttention;
  const turno = appointments[0];
  const fecha = new Date(turno.appointmentTime).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
  const hora = new Date(turno.appointmentTime).toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="page-container-user">
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
              <span>{practitionerName}</span>
            </div>
          </div>
          <div className="detalle-item">
            <FiCalendar />
            <div className="detalle-item-details">
              <label>Fecha y hora</label>
              <span>
                {fecha} - {hora}
              </span>
            </div>
          </div>
          <div className="detalle-item">
            <FiClock />
            <div className="detalle-item-details">
              <label>Tratamiento</label>
              <span>{treatmentName}</span>
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