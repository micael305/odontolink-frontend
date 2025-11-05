import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAtencionStore } from '../../context/atencionStore';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import './practicante.css';
import { FiChevronLeft, FiLoader } from 'react-icons/fi';

const MiFeedbackPracticante = () => {
  const { attentions, status, error, fetchPractitionerAttentions } =
    useAtencionStore();

  useEffect(() => {
    fetchPractitionerAttentions();
  }, [fetchPractitionerAttentions]);

  const feedbackList = useMemo(() => {
    return attentions
      .filter(
        (att) =>
          att.status === 'COMPLETED' && att.feedback && att.feedback.length > 0
      )
      .flatMap((att) =>
        att.feedback
          .filter((fb) => fb.submittedByRole === 'ROLE_PATIENT') // Solo feedback de pacientes
          .map((fb) => ({
            ...fb, // Mantener toda la estructura del backend
            treatmentName: att.treatmentName,
            patientName: att.patientName,
            practitionerName: att.practitionerName,
          }))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [attentions]);

  return (
    <div className="page-container-user">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Mi Feedback Recibido</h1>
        </header>
        <section className="feedback-list">
          {status === 'loading' && (
            <div className="loading-container">
              <FiLoader className="loading-icon" />
            </div>
          )}
          {status === 'error' && (
            <div className="error-container">
              <p>{error}</p>
            </div>
          )}
          {status === 'success' && feedbackList.length === 0 && (
            <p>Aún no has recibido feedback de tus atenciones.</p>
          )}
          {status === 'success' &&
            feedbackList.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
        </section>
      </div>
    </div>
  );
};

export default MiFeedbackPracticante;