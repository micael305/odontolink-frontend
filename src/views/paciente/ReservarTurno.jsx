import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft, FiChevronRight, FiCheck, FiUser, FiLoader, FiCalendar } from 'react-icons/fi';
import DateButton from '../../components/DateButton/DateButton';
import ConfirmarReservaModal from '../../components/ConfirmarReservaModal/ConfirmarReservaModal';
import { usePacienteStore } from '../../context/pacienteStore';
import { toLocalISODate, formatLocalDate, parseLocalDate } from '../../utils/dateUtils';

const generateDays = (startOffset, count, offerStartDate, offerEndDate) => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizar a medianoche
  
  // Fechas límite del tratamiento - parsear como fechas locales para evitar problemas de zona horaria
  const minDate = offerStartDate ? parseLocalDate(offerStartDate) : today;
  minDate.setHours(0, 0, 0, 0);
  
  const maxDate = offerEndDate ? parseLocalDate(offerEndDate) : null;
  if (maxDate) maxDate.setHours(0, 0, 0, 0);
  
  // La fecha mínima efectiva es hoy o la fecha de inicio de la oferta, lo que sea mayor
  const effectiveMinDate = minDate > today ? minDate : today;
  
  for (let i = startOffset; i < startOffset + count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    date.setHours(0, 0, 0, 0);
    
    // Solo agregar días dentro del rango válido
    if (date >= effectiveMinDate && (!maxDate || date <= maxDate)) {
      days.push({
        date,
        diaSemana: date.toLocaleString('es-ES', { weekday: 'short' }),
        diaNum: date.getDate(),
        mes: date.toLocaleString('es-ES', { month: 'short' }),
        isoDate: toLocalISODate(date),
        // Obtener el día de la semana en formato inglés (MONDAY, TUESDAY, etc.)
        dayOfWeek: date.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(),
      });
    }
  }
  return days;
};

const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString('default', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatAvailableDays = (availabilitySlots) => {
  if (!availabilitySlots || availabilitySlots.length === 0) return 'No especificado';
  
  const daysMap = {
    MONDAY: 'Lun',
    TUESDAY: 'Mar',
    WEDNESDAY: 'Mié',
    THURSDAY: 'Jue',
    FRIDAY: 'Vie',
    SATURDAY: 'Sáb',
    SUNDAY: 'Dom'
  };
  
  // Orden correcto de los días
  const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  
  // Obtener días únicos y ordenarlos
  const uniqueDays = [...new Set(availabilitySlots.map(slot => slot.dayOfWeek))];
  const sortedDays = uniqueDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  
  return sortedDays.map(day => daysMap[day]).join(', ');
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
  const timeSlotGridRef = useRef(null);
  const [diasSemana, setDiasSemana] = useState([]);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [initialOffset, setInitialOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridHeight, setGridHeight] = useState(null);

  useEffect(() => {
    fetchTreatmentDetails(tratamientoId);
  }, [tratamientoId, fetchTreatmentDetails]);

  // Inicializar días cuando se carga el tratamiento
  useEffect(() => {
    if (selectedTreatmentDetails) {
      // Calcular el offset inicial correcto
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let calculatedInitialOffset = 0;
      
      if (selectedTreatmentDetails.offerStartDate) {
        // Parsear como fecha local para evitar problemas de zona horaria
        const startDate = parseLocalDate(selectedTreatmentDetails.offerStartDate);
        startDate.setHours(0, 0, 0, 0);
        
        // Si la oferta comienza en el futuro, calcular días hasta ese punto
        if (startDate > today) {
          calculatedInitialOffset = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
        }
      }
      
      setInitialOffset(calculatedInitialOffset);
      setCurrentOffset(calculatedInitialOffset);
      const initialDays = generateDays(
        calculatedInitialOffset,
        14,
        selectedTreatmentDetails.offerStartDate,
        selectedTreatmentDetails.offerEndDate
      );
      setDiasSemana(initialDays);
    }
  }, [selectedTreatmentDetails]);

  // Seleccionar automáticamente el primer día disponible
  useEffect(() => {
    if (selectedTreatmentDetails && !selectedDate && selectedTreatmentDetails.availabilitySlots && diasSemana.length > 0) {
      // Primero buscar en los días actuales ya cargados
      const foundDayInCurrent = diasSemana.find((dia) =>
        selectedTreatmentDetails.availabilitySlots.some(
          (slot) => slot.dayOfWeek === dia.dayOfWeek
        )
      );
      
      if (foundDayInCurrent) {
        setSelectedDate(foundDayInCurrent.isoDate);
        return;
      }
      
      // Si no se encuentra en los días actuales, buscar en rangos futuros
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = selectedTreatmentDetails.offerEndDate 
        ? parseLocalDate(selectedTreatmentDetails.offerEndDate) 
        : null;
      
      let maxSearchDays = 90;
      if (endDate) {
        const daysUntilEnd = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
        maxSearchDays = Math.min(daysUntilEnd, 90);
      }
      
      let searchOffset = currentOffset + 14; // Buscar en el siguiente rango
      let foundDay = null;
      
      while (!foundDay && searchOffset < maxSearchDays) {
        const daysToCheck = generateDays(
          searchOffset,
          14,
          selectedTreatmentDetails.offerStartDate,
          selectedTreatmentDetails.offerEndDate
        );
        
        if (daysToCheck.length === 0) break;
        
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
        setCurrentOffset(searchOffset);
        setDiasSemana(generateDays(
          searchOffset,
          14,
          selectedTreatmentDetails.offerStartDate,
          selectedTreatmentDetails.offerEndDate
        ));
        setSelectedDate(foundDay.isoDate);
      }
    }
  }, [selectedTreatmentDetails, diasSemana.length]);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(tratamientoId, selectedDate);
    }
  }, [tratamientoId, selectedDate, fetchAvailableSlots]);

  // Capturar la altura del grid cuando hay slots visibles
  useEffect(() => {
    if (status === 'success' && availableSlots.length > 0 && timeSlotGridRef.current) {
      // Esperar a que el DOM se actualice completamente
      requestAnimationFrame(() => {
        const currentHeight = timeSlotGridRef.current?.offsetHeight;
        if (currentHeight) {
          setGridHeight(currentHeight);
        }
      });
    }
  }, [status, availableSlots.length]);

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

  // Calcular si se puede navegar hacia la izquierda o derecha
  const canScrollLeft = () => {
    if (!selectedTreatmentDetails) return false;
    
    // No permitir ir más atrás que el offset inicial (primera semana disponible)
    if (currentOffset <= initialOffset) return false;
    
    const prevOffset = currentOffset - 7;
    
    // Verificar que el nuevo offset no sea menor que el inicial
    if (prevOffset < initialOffset) return false;
    
    const prevDays = generateDays(
      prevOffset,
      14,
      selectedTreatmentDetails.offerStartDate,
      selectedTreatmentDetails.offerEndDate
    );
    
    // Solo permitir ir hacia atrás si hay días válidos en ese rango
    return prevDays.length > 0;
  };

  const canScrollRight = () => {
    if (!selectedTreatmentDetails) return false;
    
    const endDate = selectedTreatmentDetails.offerEndDate 
      ? parseLocalDate(selectedTreatmentDetails.offerEndDate) 
      : null;
    
    if (!endDate) return true; // Sin límite, siempre puede avanzar
    
    const nextOffset = currentOffset + 7;
    const nextDays = generateDays(
      nextOffset,
      14,
      selectedTreatmentDetails.offerStartDate,
      selectedTreatmentDetails.offerEndDate
    );
    
    // Solo permitir ir hacia adelante si hay días válidos en ese rango
    return nextDays.length > 0;
  };

  // Navegación con flechas
  const handleScrollLeft = () => {
    if (!canScrollLeft()) return;
    
    // Asegurar que nunca vayamos más atrás del offset inicial
    const newOffset = Math.max(initialOffset, currentOffset - 7);
    setCurrentOffset(newOffset);
    setDiasSemana(generateDays(
      newOffset,
      14,
      selectedTreatmentDetails.offerStartDate,
      selectedTreatmentDetails.offerEndDate
    ));
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  const handleScrollRight = () => {
    if (!canScrollRight()) return;
    
    const newOffset = currentOffset + 7;
    setCurrentOffset(newOffset);
    setDiasSemana(generateDays(
      newOffset,
      14,
      selectedTreatmentDetails.offerStartDate,
      selectedTreatmentDetails.offerEndDate
    ));
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
              <div className="availability-days-info">
                <div className="availability-label">
                  <FiCalendar className="availability-icon" />
                  <span>Días disponibles:</span>
                </div>
                <div className="days-badges">
                  {formatAvailableDays(selectedTreatmentDetails.availabilitySlots).split(', ').map((day, index) => (
                    <span key={index} className="day-badge">{day}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="turno-detalle-card">
              <h2>Selecciona una fecha</h2>
              {selectedTreatmentDetails.offerStartDate && selectedTreatmentDetails.offerEndDate ? (
                <p className="date-range-subtitle">
                  Disponible del {formatLocalDate(selectedTreatmentDetails.offerStartDate, { day: 'numeric', month: 'short' })} al {formatLocalDate(selectedTreatmentDetails.offerEndDate, { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              ) : (
                <p>Elige el día que prefieras para tu consulta</p>
              )}
              <div className="date-selector-wrapper">
                <button 
                  className="scroll-arrow scroll-arrow-left" 
                  onClick={handleScrollLeft}
                  disabled={!canScrollLeft()}
                  title={!canScrollLeft() ? 'No hay fechas anteriores disponibles' : 'Ver fechas anteriores'}
                >
                  <FiChevronLeft />
                </button>
                <div className="date-selector-container" ref={scrollContainerRef}>
                  <div className="date-selector-scroll">
                    {diasSemana.length > 0 ? (
                      diasSemana.map((dia, index) => {
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
                      })
                    ) : (
                      <div className="no-dates-available">
                        <p>No hay fechas disponibles en este período</p>
                        {canScrollRight() && (
                          <small>Usa las flechas para explorar más fechas →</small>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  className="scroll-arrow scroll-arrow-right" 
                  onClick={handleScrollRight}
                  disabled={!canScrollRight()}
                  title={!canScrollRight() ? 'No hay más fechas disponibles' : 'Ver fechas siguientes'}
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
                  <div 
                    ref={timeSlotGridRef}
                    className={`time-slot-grid ${
                      status === 'loading' ? 'is-loading' : ''
                    } ${
                      status === 'success' && availableSlots.length > 0 ? 'has-slots' : ''
                    } ${
                      status === 'success' && availableSlots.length === 0 ? 'is-empty' : ''
                    }`}
                    style={status === 'loading' && gridHeight ? { minHeight: `${gridHeight}px` } : {}}
                  >
                    {status === 'loading' && (
                      <div className="loading-icon-small">
                        <FiLoader />
                      </div>
                    )}
                    {status === 'success' && availableSlots.length > 0 && (
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
                    )}
                    {status === 'success' && availableSlots.length === 0 && (
                      <p className="no-horarios-msg">
                        No hay turnos disponibles para este día.
                      </p>
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