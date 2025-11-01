import { useState } from 'react';
import Button from '../Button/Button';
import StarRating from '../StarRating/StarRating';
import './calificarPacienteModal.css';
import { FiX } from 'react-icons/fi';

const CalificarPacienteModal = ({ isOpen, onClose, paciente }) => {
  const [puntualidad, setPuntualidad] = useState(0);
  const [colaboracion, setColaboracion] = useState(0);
  const [cumplimiento, setCumplimiento] = useState(0);
  const [actitud, setActitud] = useState(0);
  const [comentario, setComentario] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = () => {
    const calificacion = {
      pacienteId: paciente.id,
      puntualidad,
      colaboracion,
      cumplimiento,
      actitud,
      comentario,
    };
    console.log('Enviando calificación:', calificacion);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <div>
            <h2>Calificar Paciente</h2>
            <p>Asigne una calificación de 1 a 5 estrellas</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-paciente-info">
            <h4>{paciente?.nombre}</h4>
            <span>DNI: {paciente?.dni}</span>
          </div>

          <div className="criterio-item">
            <label>Puntualidad</label>
            <StarRating rating={puntualidad} onRatingChange={setPuntualidad} />
          </div>
          <div className="criterio-item">
            <label>Colaboración durante la atención</label>
            <StarRating
              rating={colaboracion}
              onRatingChange={setColaboracion}
            />
          </div>
          <div className="criterio-item">
            <label>Cumplimiento de indicaciones</label>
            <StarRating
              rating={cumplimiento}
              onRatingChange={setCumplimiento}
            />
          </div>
          <div className="criterio-item">
            <label>Actitud general</label>
            <StarRating rating={actitud} onRatingChange={setActitud} />
          </div>

          <div className="modal-form-group">
            <label htmlFor="comentario">Comentario (opcional)</label>
            <textarea
              id="comentario"
              className="modal-textarea"
              placeholder="Escriba un comentario adicional..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Confirmar Calificación
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalificarPacienteModal;