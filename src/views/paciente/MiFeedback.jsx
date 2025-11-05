import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft, FiLoader } from 'react-icons/fi';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';
import { getMyAttentionsAsPatient, getFeedbackForAttention } from '../../api/atencionService';

const MiFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        // Obtener todas las atenciones del paciente
        const atenciones = await getMyAttentionsAsPatient();
        
        // Solo considerar atenciones completadas
        const completadas = atenciones.filter(
          (atencion) => atencion.status === 'COMPLETED'
        );

        // Obtener feedback para cada atención
        const feedbackPromises = completadas.map(async (atencion) => {
          try {
            const feedbackData = await getFeedbackForAttention(atencion.id);
            // Filtrar solo los feedbacks del practicante (no del paciente)
            const feedbackPracticante = feedbackData.filter(
              (fb) => fb.submittedByRole === 'ROLE_PRACTITIONER'
            );
            
            // Mapear los feedbacks con información de la atención
            return feedbackPracticante.map((fb) => ({
              ...fb,
              treatmentName: atencion.treatmentName,
              practitionerName: atencion.practitionerName,
              startDate: atencion.startDate,
            }));
          } catch (error) {
            console.error(`Error al obtener feedback para atención ${atencion.id}:`, error);
            return [];
          }
        });

        const results = await Promise.all(feedbackPromises);
        // Aplanar el array de arrays
        const allFeedbacks = results.flat();
        
        // Ordenar por fecha (más reciente primero)
        allFeedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setFeedbacks(allFeedbacks);
      } catch (error) {
        console.error('Error al cargar feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);
  return (
    <div className="page-container-user">
      <div className="paciente-content-container">
        <header className="page-header">
          <Link to="/paciente/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Mi Feedback</h1>
        </header>

        {loading ? (
          <div className="loading-container">
            <FiLoader className="loading-icon" />
            <p>Cargando feedback...</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="error-container">
            <p>No hay feedback de practicantes disponible</p>
          </div>
        ) : (
          <section className="feedback-list">
            {feedbacks.map((feedback) => (
              <FeedbackCard 
                key={feedback.id} 
                feedback={feedback} 
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MiFeedback;