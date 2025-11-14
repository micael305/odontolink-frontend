// src/views/practicante/GestionarTratamientos.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TratamientoCard from '../../components/TratamientoCard/TratamientoCard';
import AgregarTratamientoModal from '../../components/AgregarTratamientoModal/AgregarTratamientoModal';
import ModificarTratamientoModal from '../../components/ModificarTratamientoModal/ModificarTratamientoModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import './practicante.css';
import { 
  FiPlus, 
  FiChevronLeft, 
  FiLoader, 
  FiCalendar, 
  FiClock,
  FiChevronDown,
  FiEdit3,
  FiTrash2,
  FiTarget,
  FiAlertCircle,
} from 'react-icons/fi';
import { useTratamientoStore } from '../../context/tratamientoStore';
import { formatLocalDate } from '../../utils/dateUtils';

const GestionarTratamientos = () => {
  const {
    offeredTreatments,
    masterTreatments,
    status,
    error,
    fetchOfferedTreatments,
    fetchMasterTreatments,
    deleteOfferedTreatment,
    addOfferedTreatment,
    updateOfferedTreatment,
  } = useTratamientoStore();

  const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false);
  const [isModificarModalOpen, setIsModificarModalOpen] = useState(false);
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
  const [tratamientoSeleccionado, setTratamientoSeleccionado] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchOfferedTreatments();
    fetchMasterTreatments();
  }, [fetchOfferedTreatments, fetchMasterTreatments]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleOpenModificar = (tratamiento) => {
    setTratamientoSeleccionado(tratamiento);
    setIsModificarModalOpen(true);
  };

  const handleOpenEliminar = (tratamiento) => {
    setTratamientoSeleccionado(tratamiento);
    setIsEliminarModalOpen(true);
  };

  const handleConfirmarEliminar = async () => {
    if (tratamientoSeleccionado) {
      await deleteOfferedTreatment(tratamientoSeleccionado.id);
      // Si el tratamiento eliminado era el expandido, colapsar
      if (expandedId === tratamientoSeleccionado.id) {
        setExpandedId(null);
      }
      closeModals();
    }
  };

  const handleAgregarTratamiento = async (data) => {
    await addOfferedTreatment(data);
  };

  const handleModificarTratamiento = async (id, data) => {
    await updateOfferedTreatment(id, data);
  };

  const closeModals = () => {
    setIsAgregarModalOpen(false);
    setIsModificarModalOpen(false);
    setIsEliminarModalOpen(false);
    setTratamientoSeleccionado(null);
  };

  const formatDay = (day) => {
    const map = {
      MONDAY: 'Lunes',
      TUESDAY: 'Martes',
      WEDNESDAY: 'Miércoles',
      THURSDAY: 'Jueves',
      FRIDAY: 'Viernes',
      SATURDAY: 'Sábado',
      SUNDAY: 'Domingo',
    };
    return map[day] || day;
  };

  const formatTime = (time) => time.substring(0, 5);

  return (
    <div className="page-container-user">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>

          <h1>Mis Tratamientos</h1>

          <Button
            variant="success"
            icon={<FiPlus />}
            className="add-treatment-btn"
            onClick={() => setIsAgregarModalOpen(true)}
          >
            Agregar Tratamiento
          </Button>
        </header>

        <section className="treatments-section">
          <div className="treatments-section-header">
            <h2 className="treatments-count">
              {offeredTreatments.length} {offeredTreatments.length === 1 ? 'tratamiento' : 'tratamientos'}
            </h2>
            <p className="treatments-description">
              Gestiona los tratamientos que ofreces a los pacientes
            </p>
          </div>

          {status === 'loading' && (
            <div className="loading-container">
              <FiLoader className="loading-icon" />
              <p>Cargando tratamientos...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="error-container">
              <p>{error}</p>
            </div>
          )}

          {status === 'success' && offeredTreatments.length === 0 && (
            <div className="empty-state">
              <FiPlus className="empty-icon" />
              <h3>No tienes tratamientos aún</h3>
              <p>Comienza agregando tu primer tratamiento usando el botón de arriba</p>
            </div>
          )}

          {status === 'success' && offeredTreatments.length > 0 && (
            <div className="treatments-accordion">
              {offeredTreatments.map((tratamiento) => {
                const isExpanded = expandedId === tratamiento.id;
                const diasDisponibles = [...new Set(
                  tratamiento.availabilitySlots.map((s) => formatDay(s.dayOfWeek))
                )];
                const horarios = tratamiento.availabilitySlots.map(
                  (s) => `${formatTime(s.startTime)} - ${formatTime(s.endTime)}`
                );

                return (
                  <article 
                    key={tratamiento.id} 
                    className={`treatment-accordion-item ${isExpanded ? 'expanded' : ''}`}
                  >
                    {/* Header compacto - siempre visible */}
                    <button
                      className="treatment-accordion-header"
                      onClick={() => toggleExpand(tratamiento.id)}
                      aria-expanded={isExpanded}
                      type="button"
                    >
                      <div className="treatment-accordion-header-content">
                        <div className="treatment-header-main">
                          <h3 className="treatment-accordion-title">
                            {tratamiento.treatment.name}
                          </h3>
                          <div className="treatment-accordion-tags">
                            <span className="treatment-accordion-tag tag-duration">
                              <FiClock />
                              {tratamiento.durationInMinutes} min
                            </span>
                            <span className="treatment-accordion-tag tag-area">
                              {tratamiento.treatment.area}
                            </span>
                          </div>
                        </div>
                        
                        {/* Barra de progreso compacta */}
                        <div className="treatment-header-progress">
                          <ProgressBar
                            current={tratamiento.currentCompletedAttentions}
                            max={tratamiento.maxCompletedAttentions}
                            compact={true}
                            showPercentage={true}
                          />
                        </div>

                        <div className="treatment-header-meta">
                          <span className="meta-badge">
                            <FiCalendar />
                            {diasDisponibles.length} {diasDisponibles.length === 1 ? 'día' : 'días'}
                          </span>
                          <span className="meta-badge">
                            <FiClock />
                            {horarios.length} {horarios.length === 1 ? 'horario' : 'horarios'}
                          </span>
                        </div>
                      </div>
                      <FiChevronDown className={`accordion-icon ${isExpanded ? 'rotated' : ''}`} />
                    </button>

                    {/* Contenido expandible - solo visible cuando está expandido */}
                    {isExpanded && (
                      <div className="treatment-accordion-content">
                        <div className="treatment-details-grid">
                          {/* Disponibilidad */}
                          <div className="treatment-detail-block">
                            <div className="detail-block-header">
                              <FiCalendar className="detail-icon" />
                              <span className="detail-label">Disponibilidad</span>
                            </div>
                            <div className="detail-block-content">
                              <div className="days-chips-list">
                                {diasDisponibles.map((dia) => (
                                  <span key={dia} className="day-chip">
                                    {dia}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Horarios */}
                          <div className="treatment-detail-block">
                            <div className="detail-block-header">
                              <FiClock className="detail-icon" />
                              <span className="detail-label">Horarios disponibles</span>
                            </div>
                            <div className="detail-block-content">
                              <div className="time-slots-grid">
                                {horarios.map((hora, idx) => (
                                  <span key={idx} className="time-slot-chip">
                                    {hora}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Período de oferta */}
                          <div className="treatment-detail-block">
                            <div className="detail-block-header">
                              <FiCalendar className="detail-icon" />
                              <span className="detail-label">Período de oferta</span>
                            </div>
                            <div className="detail-block-content">
                              <p className="period-display">
                                {formatLocalDate(tratamiento.offerStartDate)} — {formatLocalDate(tratamiento.offerEndDate)}
                              </p>
                            </div>
                          </div>

                          {/* Cupo de atenciones */}
                          <div className="treatment-detail-block">
                            <div className="detail-block-header">
                              <FiTarget className="detail-icon" />
                              <span className="detail-label">Cupo de atenciones</span>
                            </div>
                            <div className="detail-block-content">
                              <p className="cupo-display">
                                {tratamiento.currentCompletedAttentions} de {tratamiento.maxCompletedAttentions} completadas
                              </p>
                              <p className="cupo-description">
                                {tratamiento.currentCompletedAttentions >= tratamiento.maxCompletedAttentions 
                                  ? 'Has completado todas las atenciones requeridas para este tratamiento'
                                  : `Necesitás completar ${tratamiento.maxCompletedAttentions - tratamiento.currentCompletedAttentions} atención${tratamiento.maxCompletedAttentions - tratamiento.currentCompletedAttentions === 1 ? '' : 'es'} más para cumplir con tu práctica`
                                }
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Requerimientos si existen */}
                        {tratamiento.requirements && tratamiento.requirements !== 'No se especificaron requerimientos.' && (
                          <div className="treatment-requirements-block">
                            <div className="requirements-block-header">
                              <FiAlertCircle className="requirements-block-icon" />
                              <span className="requirements-block-label">Requerimientos especiales</span>
                            </div>
                            <p className="requirements-block-text">{tratamiento.requirements}</p>
                          </div>
                        )}

                        {/* Acciones */}
                        <div className="treatment-accordion-actions">
                          <Button
                            variant="outline-secondary"
                            icon={<FiEdit3 />}
                            onClick={() => handleOpenModificar(tratamiento)}
                          >
                            Modificar
                          </Button>
                          <Button
                            variant="outline-danger"
                            icon={<FiTrash2 />}
                            onClick={() => handleOpenEliminar(tratamiento)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <AgregarTratamientoModal
        isOpen={isAgregarModalOpen}
        onClose={closeModals}
        masterTreatments={masterTreatments}
        onSubmit={handleAgregarTratamiento}
        // 🆕 Pasamos la opción para configurar fechas y cupo
        enableOfferPeriodAndCupo={true}
      />

      <ModificarTratamientoModal
        isOpen={isModificarModalOpen}
        onClose={closeModals}
        tratamiento={tratamientoSeleccionado}
        onSubmit={handleModificarTratamiento}
        // 🆕 También habilitamos campos de edición de fechas y cupo
        enableOfferPeriodAndCupo={true}
      />

      <ConfirmModal
        isOpen={isEliminarModalOpen}
        onClose={closeModals}
        onConfirm={handleConfirmarEliminar}
        title="Confirmar Eliminación"
        warningText="Esta acción no se puede deshacer. El tratamiento se eliminará permanentemente."
        confirmText="Eliminar"
        confirmVariant="danger"
      >
        ¿Está seguro que desea eliminar el tratamiento "{' '}
        <strong>{tratamientoSeleccionado?.treatment?.name}</strong>"?
      </ConfirmModal>
    </div>
  );
};

export default GestionarTratamientos;