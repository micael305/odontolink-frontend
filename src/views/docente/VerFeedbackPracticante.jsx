import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './docente.css';
import { FiChevronLeft, FiChevronDown, FiChevronRight, FiUser } from 'react-icons/fi';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import { getFeedbackForPractitioner } from '../../api/docenteService';

const VerFeedbackPracticante = () => {
  const { practicanteId } = useParams();
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPatients, setExpandedPatients] = useState({});

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const data = await getFeedbackForPractitioner(practicanteId);
        // Filtrar solo feedback de pacientes
        const patientFeedback = data.filter((f) => f.submittedByRole === 'ROLE_PATIENT');
        setFeedbackList(patientFeedback);
        setError(null);
      } catch (err) {
        console.error('Error al obtener feedback:', err);
        setError('No se pudo cargar el feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [practicanteId]);

  // Agrupar feedback por paciente
  const groupedFeedback = feedbackList.reduce((acc, feedback) => {
    const patientId = feedback.submittedById;
    const patientName = feedback.submittedByName;
    
    if (!acc[patientId]) {
      acc[patientId] = {
        patientId,
        patientName,
        feedbacks: [],
      };
    }
    
    acc[patientId].feedbacks.push(feedback);
    return acc;
  }, {});

  const patientGroups = Object.values(groupedFeedback).sort((a, b) =>
    a.patientName.localeCompare(b.patientName)
  );

  const togglePatient = (patientId) => {
    setExpandedPatients((prev) => ({
      ...prev,
      [patientId]: !prev[patientId],
    }));
  };

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
          <h1>Feedback de Pacientes al Practicante</h1>
          <p className="page-subtitle">
            Feedbacks organizados por paciente
          </p>
        </header>

        <section className="patient-feedback-groups">
          {patientGroups.length > 0 ? (
            patientGroups.map((group) => (
              <div key={group.patientId} className="patient-group">
                <div
                  className="patient-group-header"
                  onClick={() => togglePatient(group.patientId)}
                >
                  <div className="patient-info">
                    <FiUser className="patient-icon" />
                    <div>
                      <h3>{group.patientName}</h3>
                      <span className="feedback-count">
                        {group.feedbacks.length} feedback{group.feedbacks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="expand-icon">
                    {expandedPatients[group.patientId] ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>
                </div>

                {expandedPatients[group.patientId] && (
                  <div className="patient-feedback-list">
                    {group.feedbacks.map((feedback) => (
                      <FeedbackCard key={feedback.id} feedback={feedback} />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>Este practicante aún no ha recibido feedback de pacientes.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VerFeedbackPracticante;