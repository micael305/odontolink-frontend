import { Link, useParams } from 'react-router-dom';
import './docente.css';
import { FiChevronLeft } from 'react-icons/fi';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';

const DUMMY_FEEDBACK_DATA = {
  pr1: [
    {
      id: 'f1',
      practicante: 'Calificación de Paciente 1',
      fecha: '19/01/2024',
      tratamiento: 'Limpieza Dental',
      criterios: [
        { nombre: 'Puntualidad', puntaje: 5 },
        { nombre: 'Trato y comunicación', puntaje: 5 },
        { nombre: 'Satisfacción general', puntaje: 4 },
      ],
      comentario: 'Muy profesional y amable.',
    },
    {
      id: 'f2',
      practicante: 'Calificación de Paciente 2',
      fecha: '14/01/2024',
      tratamiento: 'Tratamiento de Caries',
      criterios: [
        { nombre: 'Puntualidad', puntaje: 4 },
        { nombre: 'Trato y comunicación', puntaje: 3 },
        { nombre: 'Satisfacción general', puntaje: 3 },
      ],
      comentario:
        'La doctora parecía apurada y no explicó bien el procedimiento.',
    },
  ],
  pr2: [],
  pr3: [],
};

const VerFeedbackPracticante = () => {
  const { practicanteId } = useParams();
  const feedbackList = DUMMY_FEEDBACK_DATA[practicanteId] || [];

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
        <section className="feedback-list">
          {feedbackList.length > 0 ? (
            feedbackList.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))
          ) : (
            <p>Este practicante aún no ha recibido feedback.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default VerFeedbackPracticante;