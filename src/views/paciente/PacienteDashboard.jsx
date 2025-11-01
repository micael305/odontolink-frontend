import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { FiStar } from 'react-icons/fi';
import './paciente.css';

const PacienteDashboard = () => {
  const navigate = useNavigate();

  const handleMiFeedback = () => {
    navigate('/paciente/feedback');
  };

  return (
    <div className="page-container">
      <div className="dashboard-card">
        <h1>Panel del Paciente</h1>
        <p>Bienvenido a tu portal de gestión de turnos y atenciones.</p>

        <div className="dashboard-buttons">
          <Button
            variant="primary"
            icon={<FiStar />}
            onClick={handleMiFeedback}
          >
            Mi Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PacienteDashboard;