import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AtencionListItem from '../../components/AtencionListItem/AtencionListItem';
import RatingModal from '../../components/RatingModal/RatingModal';
import FeedbackDisplayModal from '../../components/FeedbackDisplayModal/FeedbackDisplayModal';
import './practicante.css';
import { FiChevronLeft, FiSearch, FiStar, FiLoader, FiEye } from 'react-icons/fi';
import { useAtencionStore } from '../../context/atencionStore';

const CRITERIOS_PRACTICANTE = [
  { id: 'satisfaccion', label: 'Satisfacción General' },
];

const HistorialAtencionesPracticante = () => {
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false);
  const [atencionSeleccionada, setAtencionSeleccionada] = useState(null);

  const {
    attentions,
    status,
    error,
    fetchPractitionerAttentions,
    submitFeedback,
  } = useAtencionStore();

  useEffect(() => {
    fetchPractitionerAttentions();
  }, [fetchPractitionerAttentions]);

  const handleOpenRatingModal = (atencion) => {
    setAtencionSeleccionada(atencion);
    setIsRatingModalOpen(true);
  };

  const handleOpenDisplayModal = (atencion) => {
    setAtencionSeleccionada(atencion);
    setIsDisplayModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsRatingModalOpen(false);
    setIsDisplayModalOpen(false);
    setAtencionSeleccionada(null);
  };

  const handleFormSubmit = async (calificacion) => {
    const feedbackData = {
      attentionId: atencionSeleccionada.id,
      rating: calificacion.ratings.satisfaccion || 5,
      comment: calificacion.comentario,
    };
    try {
      await submitFeedback(feedbackData);
      handleCloseModals();
    } catch (err) {
      console.error(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  const atencionesFinalizadas = attentions.filter(
    (a) => a.status === 'COMPLETED'
  );

  return (
    <div className="page-container-user">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Historial de Atenciones</h1>
        </header>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar paciente por nombre o DNI..."
            />
          </div>
        </div>

        <section className="atencion-list-container">
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
          {status === 'success' && atencionesFinalizadas.length === 0 && (
            <p>No hay atenciones finalizadas para calificar.</p>
          )}
          {status === 'success' &&
            atencionesFinalizadas.map((atencion) => {
              // Filtrar solo el feedback que el practicante dejó al paciente
              const myFeedback = atencion.feedback?.find(
                (fb) => fb.submittedByRole === 'ROLE_PRACTITIONER'
              );
              const hasFeedback = myFeedback !== undefined;
              const rating = hasFeedback ? myFeedback.rating : null;

              return (
                <AtencionListItem
                  key={atencion.id}
                  titulo={atencion.treatmentName}
                  detailText={`${atencion.patientName} • ${new Date(
                    atencion.startDate
                  ).toLocaleDateString()}`}
                  buttonText={hasFeedback ? 'Ver Feedback' : 'Calificar'}
                  buttonIcon={hasFeedback ? <FiEye /> : <FiStar />}
                  onButtonClick={
                    hasFeedback
                      ? () => handleOpenDisplayModal(atencion)
                      : () => handleOpenRatingModal(atencion)
                  }
                  rating={rating}
                />
              );
            })}
        </section>
      </div>

      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleFormSubmit}
        titulo="Calificar Paciente"
        subtitulo="Asigne una calificación de 1 a 5 estrellas"
        infoBox={{
          titulo: atencionSeleccionada?.patientName,
          subtitulo: `Tratamiento: ${atencionSeleccionada?.treatmentName}`,
        }}
        criterios={CRITERIOS_PRACTICANTE}
        comentarioLabel="Comentario (opcional)"
      />

      <FeedbackDisplayModal
        isOpen={isDisplayModalOpen}
        onClose={handleCloseModals}
        feedback={
          atencionSeleccionada?.feedback?.find(
            (fb) => fb.submittedByRole === 'ROLE_PRACTITIONER'
          )
        }
        atencionInfo={atencionSeleccionada}
      />
    </div>
  );
};

export default HistorialAtencionesPracticante;