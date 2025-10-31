import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { FiSettings, FiClipboard } from 'react-icons/fi';
import './practicante.css';

const PracticanteDashboard = () => {
  const navigate = useNavigate();

  const handleGestionar = () => {
    navigate('/practicante/tratamientos');
  };

  const handleEvolucion = () => {
    navigate('/practicante/pacientes');
  };

  return (
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
            icon={<FiClipboard />}
            onClick={handleEvolucion}
          >
            Evolución Clínica
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticanteDashboard;