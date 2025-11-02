import { useState } from 'react';
import Button from '../Button/Button';
import StarRating from '../StarRating/StarRating';
import './ratingModal.css';
import { FiX } from 'react-icons/fi';

const RatingModal = ({
  isOpen,
  onClose,
  onSubmit,
  titulo,
  subtitulo,
  infoBox,
  criterios,
  comentarioLabel,
}) => {
  const [ratings, setRatings] = useState({});
  const [comentario, setComentario] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleRatingChange = (criterioName, rating) => {
    setRatings((prev) => ({ ...prev, [criterioName]: rating }));
  };

  const handleSubmit = () => {
    const calificacion = {
      ratings,
      comentario,
    };
    console.log('Enviando calificación:', calificacion);
    onSubmit(calificacion);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{titulo}</h2>
            <p>{subtitulo}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-paciente-info">
            <h4>{infoBox.titulo}</h4>
            <span>{infoBox.subtitulo}</span>
          </div>

          {criterios.map((criterio) => (
            <div key={criterio.id} className="criterio-item">
              <label>{criterio.label}</label>
              <StarRating
                rating={ratings[criterio.id] || 0}
                onRatingChange={(rating) =>
                  handleRatingChange(criterio.id, rating)
                }
              />
            </div>
          ))}

          <div className="modal-form-group">
            <label htmlFor="comentario">{comentarioLabel}</label>
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

export default RatingModal;