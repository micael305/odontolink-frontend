import StarRating from '../StarRating/StarRating';
import { FiUser, FiUserCheck } from 'react-icons/fi';
import './feedbackCard.css';

const FeedbackCard = ({ feedback }) => {
  // Backend structure: id, rating, comment, createdAt, submittedById, submittedByName, 
  // submittedByRole, attentionId, treatmentName, patientName, practitionerName
  const { 
    submittedByName,
    submittedByRole,
    createdAt, 
    rating, 
    comment, 
    treatmentName, 
    patientName,
    practitionerName
  } = feedback;

  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Determinar el tipo de feedback según el rol
  const isPractitionerFeedback = submittedByRole === 'ROLE_PRACTITIONER';
  const isPatientFeedback = submittedByRole === 'ROLE_PATIENT';

  // Configuración visual según el tipo
  const feedbackTypeConfig = {
    roleLabel: isPractitionerFeedback ? 'Practicante' : 'Paciente',
    roleClass: isPractitionerFeedback ? 'practitioner' : 'patient',
    icon: isPractitionerFeedback ? <FiUserCheck /> : <FiUser />,
    titlePrefix: isPractitionerFeedback 
      ? `Evaluación del Practicante a ${patientName || 'Paciente'}` 
      : `Evaluación del Paciente a ${practitionerName || 'Practicante'}`,
  };

  return (
    <div className={`feedback-card feedback-card-${feedbackTypeConfig.roleClass}`}>
      <div className="feedback-card-header">
        <div className="feedback-header-content">
          <div className="feedback-role-badge-wrapper">
            <span className={`feedback-role-badge ${feedbackTypeConfig.roleClass}`}>
              {feedbackTypeConfig.icon}
              <span>{feedbackTypeConfig.roleLabel}</span>
            </span>
          </div>
          <h3>{feedbackTypeConfig.titlePrefix}</h3>
          <div className="feedback-meta">
            <span className="feedback-author">Por: {submittedByName}</span>
            {treatmentName && (
              <span className="tratamiento-label">{treatmentName}</span>
            )}
          </div>
        </div>
        <span className="date">{formatDate(createdAt)}</span>
      </div>
      <div className="feedback-card-body">
        <div className="criterio-item-display">
          <span className="label">Calificación General</span>
          <StarRating rating={rating} readOnly={true} />
        </div>
        {comment && (
          <div className="feedback-comment">
            <span className="label">Comentario:</span>
            <p>"{comment}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;