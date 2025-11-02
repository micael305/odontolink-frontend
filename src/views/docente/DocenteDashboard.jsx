import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { FiUsers, FiSearch } from 'react-icons/fi';
import './docente.css';

const DocenteDashboard = () => {
  const navigate = useNavigate();

  const handlePracticantes = () => {
    navigate('/docente/practicantes');
  };

  const handleBuscar = () => {
    navigate('/docente/buscar-practicantes');
  };

  return (
    <div className="page-container">
      <div className="dashboard-card">
        <h1>Panel del Docente</h1>
        <p>Bienvenido al panel de gestión y supervisión de practicantes.</p>

        <div className="dashboard-buttons">
          <Button
            variant="primary"
            icon={<FiUsers />}
            onClick={handlePracticantes}
          >
            Practicantes a cargo
          </Button>
          <Button
            variant="primary"
            icon={<FiSearch />}
            onClick={handleBuscar}
          >
            Buscar Practicantes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocenteDashboard;