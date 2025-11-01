import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './modificarPerfilModal.css';
import { FiX } from 'react-icons/fi';

const ModificarPerfilModal = ({
  isOpen,
  onClose,
  titulo,
  campos,
  datosActuales,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (datosActuales) {
      setFormData(datosActuales);
    }
  }, [datosActuales]);

  if (!isOpen) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Guardando datos:', formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <h2>Modificar {titulo}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <form>
            {campos.map((campo) => (
              <div key={campo.name} className="modal-form-group">
                <label htmlFor={campo.name}>{campo.label}</label>
                <input
                  type="text"
                  id={campo.name}
                  name={campo.name}
                  value={formData[campo.name] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </form>
        </div>

        <div className="modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModificarPerfilModal;