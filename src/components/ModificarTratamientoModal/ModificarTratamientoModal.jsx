import Button from '../Button/Button';
import './modificarTratamientoModal.css';
import { FiX, FiPlus, FiMessageSquare } from 'react-icons/fi';

const ModificarTratamientoModal = ({ isOpen, onClose, tratamiento }) => {
  if (!isOpen || !tratamiento) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const dias = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const horariosActuales = tratamiento.horarios || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <div>
            <h2>Modificar Tratamiento</h2>
            <p>Actualice los detalles de su tratamiento</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-tratamiento-info">
            <h4>{tratamiento.titulo}</h4>
            <span>{tratamiento.tags.map((t) => t.texto).join(' - ')}</span>
          </div>

          <div className="modal-form-group">
            <label>Días de disponibilidad *</label>
            <div className="modal-dias-grid">
              {dias.map((dia) => (
                <div key={dia} className="modal-checkbox-group">
                  <input
                    type="checkbox"
                    id={`mod-dia-${dia}`}
                    name={dia}
                    defaultChecked={tratamiento.disponibilidad.includes(dia)}
                  />
                  <label htmlFor={`mod-dia-${dia}`}>{dia}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-form-group">
            <label htmlFor="horario">Horarios disponibles *</label>
            <div className="modal-horario-input">
              <input type="text" id="horario" placeholder="--:--" />
              <Button
                variant="outline-secondary"
                className="modal-add-btn"
                icon={<FiPlus />}
              />
            </div>
            <div className="modal-horarios-pills">
              {horariosActuales.map((hora) => (
                <span key={hora} className="modal-horario-pill">
                  {hora}
                  <button>
                    <FiX />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="modal-form-group">
            <label htmlFor="requerimientos">
              Requerimientos específicos (opcional)
            </label>
            <div className="modal-input-with-icon">
              <FiMessageSquare />
              <textarea
                id="requerimientos"
                placeholder="Paciente debe venir en ayunas"
                defaultValue={tratamiento.requerimientos}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary">Guardar Cambios</Button>
        </div>
      </div>
    </div>
  );
};

export default ModificarTratamientoModal;