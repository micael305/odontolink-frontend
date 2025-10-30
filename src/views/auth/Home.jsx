import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx'; 
import { FiLogIn, FiUserPlus, FiHelpCircle } from 'react-icons/fi';
import './auth.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-logo-circle">
          <span>OL</span>
        </div>
        <h1 className="home-title">OdontoLink</h1>
        <p className="home-subtitle">
          Bienvenido a su portal de salud dental
        </p>

        <div className="home-buttons">
          <Button
            variant="primary"
            icon={<FiLogIn />}
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </Button>
          <Button
            variant="outline-primary"
            icon={<FiUserPlus />}
            onClick={() => navigate('/register')}
          >
            Registrarse
          </Button>
        </div>

        <div className="home-help-box">
          <FiHelpCircle className="home-help-icon" />
          <div className="home-help-text">
            <strong>¿Necesita ayuda?</strong>
            <span>Llámenos y le ayudaremos con su registro.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;