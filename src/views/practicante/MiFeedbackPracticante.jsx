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
        att.feedback.map((fb) => ({
          id: fb.id,
          practicante: `Feedback de: ${fb.submittedByName}`,
          fecha: new Date(fb.createdAt).toLocaleDateString(),
          tratamiento: att.treatmentName,
          criterios: [{ nombre: 'Calificación General', puntaje: fb.rating }],
          comentario: fb.comment,
        }))
      )
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }, [attentions]);

  return (
    <div className="page-container">
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