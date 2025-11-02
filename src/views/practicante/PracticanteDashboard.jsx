// src/views/practicante/PracticanteDashboard.jsx
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import {
  FiSettings,
  FiUsers,
  FiList,
  FiUser,
  FiCalendar,
  FiMessageSquare,
} from 'react-icons/fi';
import './practicante.css';

const PracticanteDashboard = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <div className="page-container">
        <div className="dashboard-card">
          <h1>Panel del Practicante</h1>
          <p>Bienvenido al panel de gestión para practicantes de Odontolink.</p>

          <div className="dashboard-buttons">
             <Button
              variant="primary"
              icon={<FiCalendar />}
              onClick={handleGestionarTurnos}
            >
              Gestionar Turnos
            </Button>
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
              icon={<FiUser />}
              onClick={handleMiPerfil}
            >
              Mi Perfil
            </Button>
            <Button
              variant="primary"
              icon={<FiList />}
              onClick={handleHistorial}
            >
              Historial de Atenciones
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