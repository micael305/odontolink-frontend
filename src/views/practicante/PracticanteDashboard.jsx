import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import {
  FiSettings,
  FiUsers,
  FiList,
  FiUser,
  FiCalendar,
  FiMessageSquare,
  FiLogOut,
} from 'react-icons/fi';
import './practicante.css';
import { useAuthStore } from '../../context/authStore';

const PracticanteDashboard = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleGestionar = () => {
    navigate('/practicante/tratamientos');
  };
  const handleMisPacientes = () => {
    navigate('/practicante/pacientes');
  };
  const handleHistorial = () => {
    navigate('/practicante/historial');
  };
  const handleMiPerfil = () => {
    navigate('/practicante/perfil');
  };
  const handleGestionarTurnos = () => {
    navigate('/practicante/turnos');
  };
  const handleChat = () => {
    navigate('/chat');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="page-container">
        <div className="dashboard-card">
          <h1>Panel del Practicante</h1>
          <p>Bienvenido al panel de gestión para practicantes de Odontolink.</p>

          <div className="dashboard-buttons">
            <Button
              variant="primary"
              icon={<FiSettings />}
              onClick={handleGestionar}
            >
              Gestionar Tratamientos
            </Button>
            <Button
              variant="primary"
              icon={<FiUsers />}
              onClick={handleMisPacientes}
            >
              Mis Pacientes
            </Button>
            <Button
              variant="primary"
              icon={<FiList />}
              onClick={handleHistorial}
            >
              Historial de Atenciones
            </Button>
            <Button
              variant="primary"
              icon={<FiUser />}
              onClick={handleMiPerfil}
            >
              Mi Perfil
            </Button>
            <Button
              variant="primary"
              icon={<FiCalendar />}
              onClick={handleGestionarTurnos}
            >
              Gestionar Turnos
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

      <div className="fab-container">
        <Button
          variant="primary"
          icon={<FiMessageSquare />}
          onClick={handleChat}
          className="fab"
        >
          Mensajes
        </Button>
      </div>
    </>
  );
};

export default PracticanteDashboard;