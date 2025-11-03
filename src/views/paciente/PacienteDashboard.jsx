import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import {
  FiStar,
  FiCalendar,
  FiList,
  FiMessageSquare,
  FiLogOut,
} from 'react-icons/fi';
import './paciente.css';
import { useAuthStore } from '../../context/authStore';

const PacienteDashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleMiFeedback = () => {
    navigate('/paciente/feedback');
  };

  const handleReservarTurno = () => {
    navigate('/paciente/tratamientos');
  };

  const handleHistorialAtenciones = () => {
    navigate('/paciente/historial');
  };

  const handleChat = () => {
    navigate('/chat');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="dashboard-card">
        <h1>Panel del Paciente</h1>
        <p>Bienvenido a tu portal de gestión de turnos y atenciones.</p>

        <div className="dashboard-buttons">
          <Button
            variant="primary"
            icon={<FiCalendar />}
            onClick={handleReservarTurno}
          >
            Reservar Turno
          </Button>
          <Button
            variant="primary"
            icon={<FiList />}
            onClick={handleHistorialAtenciones}
          >
            Historial de Atenciones
          </Button>
          <Button
            variant="primary"
            icon={<FiStar />}
            onClick={handleMiFeedback}
          >
            Mi Feedback
          </Button>
          <Button
            variant="primary"
            icon={<FiMessageSquare />}
            onClick={handleChat}
          >
            Chat Interno
          </Button>
        </div>

        <div className="dashboard-footer-actions">
          <Button
            variant="outline-danger"
            icon={<FiLogOut />}
            onClick={handleLogout}
            className="dashboard-logout-btn"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PacienteDashboard;