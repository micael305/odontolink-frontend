import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './docente.css';
import { FiChevronLeft, FiFilter } from 'react-icons/fi';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import { getFeedbackForPractitioner } from '../../api/docenteService';

const VerFeedbackPracticante = () => {
  const { practicanteId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'practitioner', 'patient'

  useEffect(() => {
    fetchFeedback();
  }, [practicanteId]);

  useEffect(() => {
    applyFilter();
  }, [filter, feedbackList]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const data = await getFeedbackForPractitioner(practicanteId);
      setFeedbackList(data);
      setFilteredFeedback(data);
      setError(null);
    } catch (err) {
      console.error('Error al obtener feedback:', err);
      setError('No se pudo cargar el feedback');
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = () => {
    if (filter === 'all') {
      setFilteredFeedback(feedbackList);
    } else if (filter === 'practitioner') {
      setFilteredFeedback(
        feedbackList.filter((f) => f.submittedByRole === 'ROLE_PRACTITIONER')
      );
    } else if (filter === 'patient') {
      setFilteredFeedback(
        feedbackList.filter((f) => f.submittedByRole === 'ROLE_PATIENT')
      );
    }
  };

  const getStats = () => {
    const practitionerCount = feedbackList.filter(
      (f) => f.submittedByRole === 'ROLE_PRACTITIONER'
    ).length;
    const patientCount = feedbackList.filter(
      (f) => f.submittedByRole === 'ROLE_PATIENT'
    ).length;
    return { practitionerCount, patientCount, total: feedbackList.length };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="page-container-user">
        <div className="docente-content-container">
          <p>Cargando feedback...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container-user">
        <div className="docente-content-container">
          <p className="auth-error-msg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container-user">
      <div className="docente-content-container">
        <header className="page-header">
          <Link to="/docente/practicantes" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Feedback del Practicante</h1>
        </header>

        {stats.total > 0 && (
          <div className="feedback-filters">
            <FiFilter className="filter-icon" />
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos ({stats.total})
            </button>
            <button
              className={`filter-btn ${filter === 'practitioner' ? 'active' : ''}`}
              onClick={() => setFilter('practitioner')}
            >
              Del Practicante ({stats.practitionerCount})
            </button>
            <button
              className={`filter-btn ${filter === 'patient' ? 'active' : ''}`}
              onClick={() => setFilter('patient')}
            >
              De Pacientes ({stats.patientCount})
            </button>
          </div>
        )}

        <section className="feedback-list">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))
          ) : stats.total > 0 ? (
            <div className="empty-state">
              <p>No hay feedback de este tipo.</p>
            </div>
          ) : (
            <div className="empty-state">
              <p>Este practicante aún no tiene feedback registrado.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VerFeedbackPracticante;