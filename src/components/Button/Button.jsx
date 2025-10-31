// src/components/Button/Button.jsx
import React from 'react';
import './button.css';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  icon = null,
  ...rest
}) => {
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