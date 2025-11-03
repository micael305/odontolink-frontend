import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FiLock, FiEye, FiEyeOff, FiInfo, FiLogIn, FiMail } from 'react-icons/fi';
import './auth.css';
import Button from '../../components/Button/Button';
import { useAuthStore } from '../../context/authStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, status, error } = useAuthStore();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(email, password);

      if (userData.role === 'PRACTITIONER') {
        navigate('/practicante/dashboard');
      } else if (userData.role === 'PATIENT') {
        navigate('/paciente/dashboard');
      } else if (userData.role === 'DOCENTE') {
        navigate('/docente/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error(err.message);
    }
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
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <FiMail className="icon-left" />
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {status === 'error' && (
              <p className="auth-error-msg">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              icon={<FiLogIn />}
              className="auth-login-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          <a href="#" className="forgot-password">
            ¿Olvidó su contraseña?
          </a>

          <div className="info-box">
            <FiInfo />
            <span>Ingrese sus credenciales registradas para acceder.</span>
          </div>

          <div className="register-link-box">
            <span>¿No tienes una cuenta? </span>
            <Link to="/register" className="register-link">
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;