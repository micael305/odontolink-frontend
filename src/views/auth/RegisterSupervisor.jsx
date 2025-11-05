import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUsers,
  FiBook,
  FiBriefcase,
} from 'react-icons/fi';
import { LiaAddressCard } from 'react-icons/lia';
import Button from '../../components/Button/Button';
import { useAuthStore } from '../../context/authStore';

const RegisterSupervisor = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    birthDate: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    employeeId: '',
  });

  const { registerSupervisor, status, error } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    const { confirmPassword, ...dataToSubmit } = formData;
    
    try {
      await registerSupervisor(dataToSubmit);
      alert('¡Registro de supervisor exitoso! Por favor, inicia sesión.');
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <Link to="/" className="auth-back-link">
          Volver
        </Link>
        <div className="auth-content">
          <h1>Registro de Supervisor</h1>
          <p>Complete sus datos para registrarse como supervisor</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="firstName">Nombre *</label>
              <div className="input-wrapper">
                <FiUser className="icon-left" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Juan"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="lastName">Apellido *</label>
              <div className="input-wrapper">
                <FiUsers className="icon-left" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Pérez"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="dni">DNI *</label>
              <div className="input-wrapper">
                <LiaAddressCard className="icon-left" />
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  placeholder="12345678"
                  required
                  pattern="[0-9]{7,8}"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="birthDate">Fecha de nacimiento</label>
              <div className="input-wrapper">
                <FiCalendar className="icon-left" />
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="dd/mm/aaaa"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="phone">Teléfono</label>
              <div className="input-wrapper">
                <FiPhone className="icon-left" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="11 1234-5678"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email *</label>
              <div className="input-wrapper">
                <FiMail className="icon-left" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="juan@email.com"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="specialty">Especialidad *</label>
              <div className="input-wrapper">
                <FiBook className="icon-left" />
                <input
                  type="text"
                  id="specialty"
                  name="specialty"
                  placeholder="Ej: Odontología General"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="employeeId">Legajo de Empleado *</label>
              <div className="input-wrapper">
                <FiBriefcase className="icon-left" />
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  placeholder="Ej: DOC-2024-001"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña *</label>
              <div className="input-wrapper">
                <FiLock className="icon-left" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Tu contraseña"
                  required
                  minLength="6"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar contraseña *</label>
              <div className="input-wrapper">
                <FiLock className="icon-left" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repite tu contraseña"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            {status === 'error' && (
              <p className="auth-error-msg">{error}</p>
            )}

            <Button
              type="submit"
              variant="success"
              className="auth-register-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="login-link-box">
            <span>¿Ya tienes una cuenta? </span>
            <Link to="/login" className="login-link">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSupervisor;
