import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RatingModal from '../../components/RatingModal/RatingModal';
import FeedbackDisplayModal from '../../components/FeedbackDisplayModal/FeedbackDisplayModal';
import AtencionListItem from '../../components/AtencionListItem/AtencionListItem';
import './paciente.css';
import { FiChevronLeft, FiSearch, FiStar, FiEye, FiLoader } from 'react-icons/fi';
import { getMyAttentionsAsPatient, getFeedbackForAttention } from '../../api/atencionService';
import { createFeedback } from '../../api/feedbackService';

const CRITERIOS_PACIENTE = [
  { id: 'satisfaccion', label: 'Satisfacción general' },
];

const HistorialAtencionesPaciente = () => {
  const [atenciones, setAtenciones] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [atencionSeleccionada, setAtencionSeleccionada] = useState(null);
  const [feedbackSeleccionado, setFeedbackSeleccionado] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Cargar atenciones y sus feedbacks
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const atencionesData = await getMyAttentionsAsPatient();
        
        // Solo mostrar atenciones completadas
        const completadas = atencionesData.filter(
          (atencion) => atencion.status === 'COMPLETED'
        );
        
        setAtenciones(completadas);

        // Obtener feedback para cada atención
        const feedbackPromises = completadas.map(async (atencion) => {
          try {
            const feedbackData = await getFeedbackForAttention(atencion.id);
            return { attentionId: atencion.id, feedback: feedbackData };
          } catch {
            return { attentionId: atencion.id, feedback: [] };
          }
        });

        const feedbackResults = await Promise.all(feedbackPromises);
        const feedbackMap = {};
        feedbackResults.forEach(({ attentionId, feedback }) => {
          feedbackMap[attentionId] = feedback;
        });
        
        setFeedbacks(feedbackMap);
      } catch (error) {
        console.error('Error al cargar atenciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenRatingModal = (atencion) => {
    setAtencionSeleccionada(atencion);
    setIsRatingModalOpen(true);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
    setAtencionSeleccionada(null);
  };

  const handleOpenFeedbackModal = (atencion) => {
    setAtencionSeleccionada(atencion);
    // Obtener solo el feedback que el paciente dejó al practicante
    const feedback = feedbacks[atencion.id]?.find(
      (fb) => fb.submittedByRole === 'ROLE_PATIENT'
    );
    setFeedbackSeleccionado(feedback);
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setIsFeedbackModalOpen(false);
    setAtencionSeleccionada(null);
    setFeedbackSeleccionado(null);
  };

  const handleFormSubmit = async (calificacion) => {
    setSubmitting(true);
    try {
      const feedbackData = {
        attentionId: atencionSeleccionada.id,
        rating: calificacion.ratings.satisfaccion || 0,
        comment: calificacion.comentario || '',
      };

      await createFeedback(feedbackData);
      
      // Actualizar el estado local para reflejar que ya tiene feedback
      setFeedbacks((prev) => ({
        ...prev,
        [atencionSeleccionada.id]: [feedbackData],
      }));

      alert('Feedback enviado exitosamente');
      handleCloseRatingModal();
    } catch (error) {
      console.error('Error al enviar feedback:', error);
      alert(error.message || 'Error al enviar el feedback');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtrar atenciones según búsqueda
  const atencionesFiltradas = atenciones.filter((atencion) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      atencion.treatmentName.toLowerCase().includes(searchLower) ||
      atencion.practitionerName.toLowerCase().includes(searchLower)
    );
  });

  // Verificar si una atención tiene feedback del paciente
  const hasFeedback = (attentionId) => {
    const feedbackList = feedbacks[attentionId] || [];
    // Verificar si existe feedback enviado por el paciente
    return feedbackList.some((fb) => fb.submittedByRole === 'ROLE_PATIENT');
  };

  return (
    <div className="page-container-user">
      <div className="paciente-content-container">
        <header className="page-header">
          <Link to="/paciente/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Historial de Atenciones</h1>
        </header>

        <div className="filters-bar">
          <div className="search-bar-wrapper">
            <FiSearch />
            <input
              type="text"
              className="search-bar-input"
              placeholder="Buscar por tratamiento o practicante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <FiLoader className="loading-icon" />
            <p>Cargando atenciones...</p>
          </div>
        ) : atencionesFiltradas.length === 0 ? (
          <div className="error-container">
            <p>No se encontraron atenciones completadas</p>
          </div>
        ) : (
          <section className="atencion-list-container">
            {atencionesFiltradas.map((atencion) => {
              const tieneFeedback = hasFeedback(atencion.id);
              // Obtener el rating si existe feedback del paciente
              const myFeedback = feedbacks[atencion.id]?.find(
                (fb) => fb.submittedByRole === 'ROLE_PATIENT'
              );
              const rating = myFeedback ? myFeedback.rating : null;
              
              return (
                <AtencionListItem
                  key={atencion.id}
                  titulo={atencion.treatmentName}
                  detailText={`${
                    atencion.practitionerName
                  } • ${new Date(atencion.startDate).toLocaleDateString()}`}
                  buttonText={tieneFeedback ? 'Ver calificación' : 'Calificar'}
                  buttonIcon={tieneFeedback ? <FiEye /> : <FiStar />}
                  onButtonClick={() => tieneFeedback ? handleOpenFeedbackModal(atencion) : handleOpenRatingModal(atencion)}
                  rating={rating}
                />
              );
            })}
          </section>
        )}
      </div>

        <RatingModal
        isOpen={isRatingModalOpen}
        onClose={handleCloseRatingModal}
        onSubmit={handleFormSubmit}
        titulo="Calificar Atención"
        subtitulo="Califique su experiencia con el practicante"
        infoBox={{
          titulo: atencionSeleccionada?.treatmentName,
          subtitulo: `${atencionSeleccionada?.practitionerName} • ${
            atencionSeleccionada
              ? new Date(atencionSeleccionada.startDate).toLocaleDateString()
              : ''
          }`,
        }}
        criterios={CRITERIOS_PACIENTE}
        comentarioLabel="Comentarios adicionales (opcional)"
        submitting={submitting}
      />

      <FeedbackDisplayModal
        isOpen={isFeedbackModalOpen}
        onClose={handleCloseFeedbackModal}
        feedback={feedbackSeleccionado}
        atencionInfo={atencionSeleccionada}
      />
    </div>
  );
};

export default HistorialAtencionesPaciente;