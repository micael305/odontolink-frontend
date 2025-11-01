import { Link } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft } from 'react-icons/fi';
import FeedbackCard from '../../components/FeedbackCard/FeedbackCard';

const DUMMY_FEEDBACK = [
  {
    id: 'f1',
    practicante: 'Dr. Juan Pérez',
    fecha: '19/01/2024',
    criterios: [
      { nombre: 'Puntualidad', puntaje: 5 },
      { nombre: 'Colaboración', puntaje: 4 },
      { nombre: 'Cumplimiento de indicaciones', puntaje: 5 },
      { nombre: 'Actitud general', puntaje: 5 },
    ],
    comentario:
      'Paciente muy colaborador y puntual. Siguió todas las indicaciones post-operatorias.',
  },
  {
    id: 'f2',
    practicante: 'Dr. Juan Pérez',
    fecha: '14/01/2024',
    criterios: [
      { nombre: 'Puntualidad', puntaje: 4 },
      { nombre: 'Colaboración', puntaje: 3 },
      { nombre: 'Cumplimiento de indicaciones', puntaje: 3 },
      { nombre: 'Actitud general', puntaje: 4 },
    ],
    comentario:
      'El paciente llegó 15 minutos tarde y estaba un poco nervioso, lo que dificultó la atención inicial.',
  },
];

const MiFeedback = () => {
  return (
    <div className="page-container">
      <div className="paciente-content-container">
        <header className="page-header">
          <Link to="/paciente/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Mi Feedback</h1>
        </header>
        <section className="feedback-list">
          {DUMMY_FEEDBACK.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default MiFeedback;