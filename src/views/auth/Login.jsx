import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { LiaAddressCard } from 'react-icons/lia';
import { FiLock, FiEye, FiEyeOff, FiInfo, FiLogIn } from 'react-icons/fi'; 
import './Auth.css';
import Button from '../../components/Button/Button'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado');
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <Link to="/" className="auth-back-link">
          <IoIosArrowBack />
          Volver
        </Link>

        <div className="auth-content">
          <h1>Iniciar Sesión</h1>
          <p>Ingrese sus datos para acceder</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="dni">DNI (sin puntos ni espacios)</label>
              <div className="input-wrapper">
                <LiaAddressCard className="icon-left" />
                <input
                  type="text"
                  id="dni"
                  placeholder="12345678"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <FiLock className="icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Tu contraseña"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              icon={<FiLogIn />}
              className="auth-login-btn"
            >
              Ingresar
            </Button>
          </form>

          <a href="#" className="forgot-password">
            ¿Olvidó su contraseña?
          </a>

          <div className="info-box">
            <FiInfo />
            <span>Use su DNI sin puntos ni espacios para ingresar.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;