import Button from '../../components/Button/Button.jsx';
import { FiSettings, FiClipboard } from 'react-icons/fi';
import './practicante.css';

const PracticanteDashboard = () => {
  const handleGestionar = () => {
    console.log('Navegando a Gestionar Tratamientos...');
  };

  const handleEvolucion = () => {
    console.log('Navegando a Evolución Clínica...');
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