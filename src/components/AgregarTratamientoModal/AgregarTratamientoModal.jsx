import Button from '../Button/Button';
import './AgregarTratamientoModal.css';
import { FiX, FiPlus, FiMessageSquare } from 'react-icons/fi';

const AgregarTratamientoModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <div>
            <h2>Agregar Tratamiento</h2>
            <p>Seleccione un tratamiento y configure sus detalles</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-form-group">
            <label htmlFor="tratamiento">Tratamiento *</label>
            <select id="tratamiento" defaultValue="">
              <option value="" disabled>
                Seleccione un tratamiento
              </option>
              <option value="limpieza">Limpieza Dental</option>
              <option value="blanqueamiento">Blanqueamiento Dental</option>
              <option value="caries">Tratamiento de Caries</option>
            </select>
          </div>

          <div className="modal-form-group">
            <label>Días de disponibilidad *</label>
            <div className="modal-dias-grid">
              {dias.map((dia) => (
                <div key={dia} className="modal-checkbox-group">
                  <input type="checkbox" id={`dia-${dia}`} name={dia} />
                  <label htmlFor={`dia-${dia}`}>{dia}</label>
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
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary">Agregar</Button>
        </div>
      </div>
    </div>
  );
};

export default AgregarTratamientoModal;