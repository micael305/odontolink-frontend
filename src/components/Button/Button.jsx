// src/components/Button.jsx
import React from 'react';

/**
 * Componente de Botón Reutilizable
 * @param {object} props
 * @param {'submit' | 'button' | 'reset'} [props.type] - Tipo de botón HTML
 * @param {'primary' | 'success' | 'outline-primary'} [props.variant] - Variante de estilo
 * @param {string} [props.className] - Clases extra (ej. para márgenes)
 * @param {React.ReactNode} [props.icon] - El componente ícono (ej. <FiLogIn />)
 * @param {React.ReactNode} props.children - El texto del botón
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  icon = null,
  ...rest
}) => {
  // Clona el ícono para agregarle la clase 'btn-icon' automáticamente
  const iconWithClass = icon
    ? React.cloneElement(icon, {
        className: `btn-icon ${icon.props.className || ''}`,
      })
    : null;

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      {...rest}
    >
      {iconWithClass}
      <span>{children}</span>
    </button>
  );
};

export default Button;