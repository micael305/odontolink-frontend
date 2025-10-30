import { useState } from 'react';
import './Auth.css'; 

import { IoIosArrowBack } from 'react-icons/io';
import {
  FiUser,
  FiCalendar,
  FiPhone,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import { LiaAddressCard } from 'react-icons/lia';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario de registro enviado');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <a href="#" className="auth-back-link">
          <IoIosArrowBack />
          Volver
        </a>

        <div className="auth-content">
          <h1>Registrarse</h1>
          <p>Complete sus datos para crear su cuenta</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fullName">Nombre completo *</label>
              <div className="input-wrapper">
                <FiUser className="icon-left" />
                <input
                  type="text"
                  id="fullName"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="dni">DNI (sin puntos ni espacios) *</label>
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
              <label htmlFor="birthDate">Fecha de nacimiento *</label>
              <div className="input-wrapper">
                <FiCalendar className="icon-left" />
                <input
                  type="text"
                  id="birthDate"
                  placeholder="dd/mm/aaaa"
                  required
                />
                <FiCalendar className="icon-right" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="phone">Teléfono (opcional)</label>
              <div className="input-wrapper">
                <FiPhone className="icon-left" />
                <input type="tel" id="phone" placeholder="11 1234-5678" />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Email (opcional)</label>
              <div className="input-wrapper">
                <FiMail className="icon-left" />
                <input
                  type="email"
                  id="email"
                  placeholder="juan@email.com"
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
                  placeholder="Tu contraseña"
                  required
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
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="Repite tu contraseña"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="create-account-button">
              Crear Cuenta
            </button>
          </form>

          <div className="login-link-box">
            <span>¿Ya tienes una cuenta? </span>
            <a href="/login" className="login-link">
              Iniciar Sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;