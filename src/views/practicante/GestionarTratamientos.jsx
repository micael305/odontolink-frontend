// src/views/practicante/GestionarTratamientos.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TratamientoCard from '../../components/TratamientoCard/TratamientoCard';
import AgregarTratamientoModal from '../../components/AgregarTratamientoModal/AgregarTratamientoModal';
import ModificarTratamientoModal from '../../components/ModificarTratamientoModal/ModificarTratamientoModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import './practicante.css';
import { FiPlus, FiChevronLeft, FiLoader } from 'react-icons/fi';
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

  useEffect(() => {
    fetchOfferedTreatments();
    fetchMasterTreatments();
  }, [fetchOfferedTreatments, fetchMasterTreatments]);

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

        <section className="treatment-list">
          <h2 className="treatment-list-header">
            Tratamientos que ofrezco ({offeredTreatments.length})
          </h2>

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

          {status === 'success' &&
            offeredTreatments.map((tratamiento) => {
              // Objeto para pasar al componente TratamientoCard
              const tratamientoProps = {
                titulo: tratamiento.treatment.name,
                tags: [
                  {
                    texto: `${tratamiento.durationInMinutes} min`,
                    tipo: 'duration',
                  },
                  {
                    texto: tratamiento.treatment.area,
                    tipo: 'preventivo',
                  },
                ],
                disponibilidad: [
                  ...new Set(
                    tratamiento.availabilitySlots.map((s) => formatDay(s.dayOfWeek))
                  ),
                ],
                horarios: tratamiento.availabilitySlots.map(
                  (s) => `${formatTime(s.startTime)} - ${formatTime(s.endTime)}`
                ),
                requerimientos:
                  tratamiento.requirements || 'No se especificaron requerimientos.',
                cupo: tratamiento.maxCompletedAttentions,
                fechaInicio: formatLocalDate(tratamiento.offerStartDate),
                fechaFin: formatLocalDate(tratamiento.offerEndDate),
              };

              return (
                <TratamientoCard
                  key={tratamiento.id}
                  tratamiento={tratamientoProps}
                  onModificar={() => handleOpenModificar(tratamiento)}
                  onEliminar={() => handleOpenEliminar(tratamiento)}
                />
              );
            })}
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