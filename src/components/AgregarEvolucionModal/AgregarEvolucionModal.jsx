import { useState } from 'react';
import Button from '../Button/Button';
import './agregarEvolucionModal.css';
import { FiX } from 'react-icons/fi';
import { useAtencionStore } from '../../context/atencionStore';

const AgregarEvolucionModal = ({ isOpen, onClose, attentionId }) => {
  const [content, setContent] = useState('');
  const { addProgressNote, status, error } = useAtencionStore();

  if (!isOpen) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    try {
      await addProgressNote(attentionId, content);
      setContent('');
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <h2>Agregar Nota de Evolución</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-form-group">
            <label htmlFor="evolucion-nota">
              Descripción de la evolución
            </label>
            <textarea
              id="evolucion-nota"
              className="modal-textarea"
              placeholder="Describa el progreso del paciente, procedimientos realizados, etc."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          {status === 'error' && (
            <p className="modal-error-msg">{error}</p>
          )}
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Guardando...' : 'Guardar Nota'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgregarEvolucionModal;