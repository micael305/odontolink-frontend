import Button from '../Button/Button';
import './feedbackDisplayModal.css';
import { FiX } from 'react-icons/fi';

const FeedbackDisplayModal = ({ isOpen, onClose, feedback }) => {
  if (!isOpen || !feedback) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Feedback Recibido</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          {feedback.map((fb) => (
            <div key={fb.id} className="feedback-item">
              <div className="feedback-by">
                {fb.submittedByName} <span>({fb.submittedByRole})</span>
              </div>
              {fb.comment ? (
                <p className="feedback-comment-box">"{fb.comment}"</p>
              ) : (
                <p className="feedback-no-comment">
                  No se dejaron comentarios.
                </p>
              )}
            </div>
          ))}
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