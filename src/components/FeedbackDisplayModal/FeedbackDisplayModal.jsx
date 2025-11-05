import Button from '../Button/Button';
import StarRating from '../StarRating/StarRating';
import './feedbackDisplayModal.css';
import { FiX } from 'react-icons/fi';

const FeedbackDisplayModal = ({ isOpen, onClose, feedback, atencionInfo }) => {
  if (!isOpen || !feedback) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Tu Calificación</h2>
            <p>Calificación enviada para esta atención</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          {atencionInfo && (
            <div className="modal-paciente-info">
              <h4>{atencionInfo.treatmentName}</h4>
              <span>{atencionInfo.practitionerName} • {new Date(atencionInfo.startDate).toLocaleDateString()}</span>
            </div>
          )}

          <div className="feedback-display-section">
            <label>Satisfacción General</label>
            <StarRating rating={feedback.rating} readOnly={true} />
          </div>

          {feedback.comment && (
            <div className="feedback-display-section">
              <label>Comentario</label>
              <div className="feedback-comment-display">
                {feedback.comment}
              </div>
            </div>
          )}

          <div className="feedback-display-section">
            <label>Fecha de calificación</label>
            <span className="feedback-date">
              {new Date(feedback.createdAt).toLocaleDateString()} a las {new Date(feedback.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="primary" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplayModal;