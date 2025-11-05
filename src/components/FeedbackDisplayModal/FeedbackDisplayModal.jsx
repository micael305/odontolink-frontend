import Button from '../Button/Button';
import StarRating from '../StarRating/StarRating';
import './feedbackDisplayModal.css';
import { FiX } from 'react-icons/fi';

const FeedbackDisplayModal = ({ isOpen, onClose, feedback, atencionInfo }) => {
  if (!isOpen || !feedback) {
    return null;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

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
              <h4>{atencionInfo.treatmentName || 'N/A'}</h4>
              <span>
                {atencionInfo.patientName || atencionInfo.practitionerName || 'N/A'} • {formatDate(atencionInfo.startDate)}
              </span>
            </div>
          )}

          <div className="feedback-display-section">
            <label>Satisfacción General</label>
            <StarRating rating={feedback.rating || 0} readOnly={true} />
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
              {formatDate(feedback.createdAt)} a las {formatTime(feedback.createdAt)}
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