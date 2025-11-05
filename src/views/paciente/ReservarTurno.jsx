import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft, FiChevronRight, FiCheck, FiUser, FiLoader } from 'react-icons/fi';
import DateButton from '../../components/DateButton/DateButton';
import ConfirmarReservaModal from '../../components/ConfirmarReservaModal/ConfirmarReservaModal';
import { usePacienteStore } from '../../context/pacienteStore';

const generateDays = (startOffset, count) => {
  const days = [];
  const today = new Date();
  for (let i = startOffset; i < startOffset + count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date,
      diaSemana: date.toLocaleString('es-ES', { weekday: 'short' }),
      diaNum: date.getDate(),
      mes: date.toLocaleString('es-ES', { month: 'short' }),
      isoDate: date.toISOString().split('T')[0],
      // Obtener el día de la semana en formato inglés (MONDAY, TUESDAY, etc.)
      dayOfWeek: date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(),
    });
  }
  return days;
};

const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ReservarTurno = () => {
  const { tratamientoId } = useParams();
  const navigate = useNavigate();
  
  const {
    selectedTreatmentDetails,
    availableSlots,
    status,
    error,
    fetchTreatmentDetails,
    fetchAvailableSlots,
    scheduleAppointment,
  } = usePacienteStore();

  const scrollContainerRef = useRef(null);
  const [diasSemana, setDiasSemana] = useState(() => generateDays(0, 14));
  const [currentOffset, setCurrentOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTreatmentDetails(tratamientoId);
  }, [tratamientoId, fetchTreatmentDetails]);

  // Seleccionar automáticamente el primer día disponible
  useEffect(() => {
    if (selectedTreatmentDetails && !selectedDate && selectedTreatmentDetails.availabilitySlots) {
      // Buscar en los días actuales y en el futuro si es necesario
      let searchOffset = currentOffset;
      let foundDay = null;
      
      // Buscar hasta 90 días en el futuro
      while (!foundDay && searchOffset < 90) {
        const daysToCheck = generateDays(searchOffset, 14);
        foundDay = daysToCheck.find((dia) =>
          selectedTreatmentDetails.availabilitySlots.some(
            (slot) => slot.dayOfWeek === dia.dayOfWeek
          )
        );
        
        if (!foundDay) {
          searchOffset += 14;
        }
      }
      
      if (foundDay) {
        // Si el día encontrado está fuera del rango actual, actualizar
        if (searchOffset !== currentOffset) {
          setCurrentOffset(searchOffset);
          setDiasSemana(generateDays(searchOffset, 14));
        }
        setSelectedDate(foundDay.isoDate);
      }
    }
  }, [selectedTreatmentDetails, selectedDate, currentOffset]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(tratamientoId, selectedDate);
    }
  }, [tratamientoId, selectedDate, fetchAvailableSlots]);

  const handleDateSelect = (isoDate) => {
    setSelectedDate(isoDate);
    setSelectedTime(null);
  };

  const handleConfirmarReserva = async () => {
    const data = {
      offeredTreatmentId: parseInt(tratamientoId, 10),
      appointmentTime: selectedTime,
    };
    try {
      await scheduleAppointment(data);
      setIsModalOpen(false);
      navigate('/paciente/turno-confirmado');
    } catch (err) {
      alert(err.message);
    }
  };

  // Función para verificar si un día está disponible según los slots del practicante
  const isDayAvailable = (dayOfWeek) => {
    if (!selectedTreatmentDetails || !selectedTreatmentDetails.availabilitySlots) {
      return false;
    }
    return selectedTreatmentDetails.availabilitySlots.some(
      (slot) => slot.dayOfWeek === dayOfWeek
    );
  };

  // Navegación con flechas
  const handleScrollLeft = () => {
    const newOffset = Math.max(0, currentOffset - 7);
    setCurrentOffset(newOffset);
    setDiasSemana(generateDays(newOffset, 14));
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const handleScrollRight = () => {
    const newOffset = currentOffset + 7;
    setCurrentOffset(newOffset);
    setDiasSemana(generateDays(newOffset, 14));
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  if (status === 'loading' && !selectedTreatmentDetails) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <FiLoader className="loading-icon" />
        </div>
      </div>
    );
  }

  if (error && !selectedTreatmentDetails) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!selectedTreatmentDetails) {
    return <div className="page-container"></div>;
  }

  const getResumenTurno = () => {
    const diaObj = diasSemana.find((d) => d.isoDate === selectedDate);
    if (!diaObj) {
      return {
        practicante: '',
        fecha: '',
        hora: '',
        tratamiento: '',
      };
    }
    return {
      practicante: selectedTreatmentDetails.practitionerName,
      fecha: `${diaObj.diaNum} de ${diaObj.mes}`,
      hora: formatTime(selectedTime),
      tratamiento: selectedTreatmentDetails.treatment.name,
    };
  };

  return (
    <>
      <div className="page-container-user">
        <div className="paciente-content-container">
          <header className="page-header">
            <Link to="/paciente/tratamientos" className="page-back-link">
              <FiChevronLeft />
              Volver
            </Link>
            <h1>Reservar Turno</h1>
          </header>

          <div className="reserva-layout">
            <div className="turno-detalle-card">
              <h2>Detalles del turno</h2>
              <div className="practitioner-info">
                <div className="avatar-icon-wrapper">
                  <FiUser />
                </div>
                <div className="practitioner-details">
                  <span>{selectedTreatmentDetails.practitionerName}</span>
                  <p>Odontología General</p>
                </div>
              </div>
              <div className="treatment-info-box">
                <span>{selectedTreatmentDetails.treatment.name}</span>
                <p>
                  Duración: {selectedTreatmentDetails.durationInMinutes} minutos
                </p>
              </div>
            </div>

            <div className="turno-detalle-card">
              <h2>Selecciona una fecha</h2>
              <p>Elige el día que prefieras para tu consulta</p>
              <div className="date-selector-wrapper">
                <button 
                  className="scroll-arrow scroll-arrow-left" 
                  onClick={handleScrollLeft}
                  disabled={currentOffset === 0}
                >
                  <FiChevronLeft />
                </button>
                <div className="date-selector-container" ref={scrollContainerRef}>
                  <div className="date-selector-scroll">
                    {diasSemana.map((dia, index) => {
                      const isAvailable = isDayAvailable(dia.dayOfWeek);
                      return (
                        <DateButton
                          key={`${dia.isoDate}-${index}`}
                          dia={dia}
                          isSelected={dia.isoDate === selectedDate}
                          onClick={() => handleDateSelect(dia.isoDate)}
                          disabled={!isAvailable}
                        />
                      );
                    })}
                  </div>
                </div>
                <button 
                  className="scroll-arrow scroll-arrow-right" 
                  onClick={handleScrollRight}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>

            <div className="turno-detalle-card">
              <h2>Selecciona un horario</h2>
              <p>Horarios disponibles para el día seleccionado</p>
              <div className="time-selector-container">
                <div className="time-slot-group">
                  <h3>Horarios</h3>
                  <div className="time-slot-grid">
                    {status === 'loading' && (
                      <FiLoader className="loading-icon-small" />
                    )}
                    {status === 'success' && availableSlots.length > 0 ? (
                      availableSlots.map((slotISO) => (
                        <button
                          key={slotISO}
                          className={`time-slot ${
                            slotISO === selectedTime ? 'selected' : ''
                          }`}
                          onClick={() => setSelectedTime(slotISO)}
                        >
                          {formatTime(slotISO)}
                        </button>
                      ))
                    ) : (
                      status === 'success' && (
                        <p className="no-horarios-msg">
                          No hay turnos disponibles para este día.
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fab-container">
        <button
          className="fab"
          onClick={() => setIsModalOpen(true)}
          disabled={!selectedDate || !selectedTime || status === 'loading'}
        >
          <FiCheck />
          Confirmar Turno
        </button>
      </div>

      <ConfirmarReservaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmarReserva}
        resumen={getResumenTurno()}
      />
    </>
  );
};

export default ReservarTurno;