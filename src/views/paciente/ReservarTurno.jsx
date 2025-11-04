import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft, FiCheck, FiUser, FiLoader } from 'react-icons/fi';
import DateButton from '../../components/DateButton/DateButton';
import ConfirmarReservaModal from '../../components/ConfirmarReservaModal/ConfirmarReservaModal';
import { usePacienteStore } from '../../context/pacienteStore';

const getNextSevenDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date,
      diaSemana: date.toLocaleString('es-ES', { weekday: 'short' }),
      diaNum: date.getDate(),
      mes: date.toLocaleString('es-ES', { month: 'short' }),
      isoDate: date.toISOString().split('T')[0],
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

  const [diasSemana] = useState(getNextSevenDays());
  const [selectedDate, setSelectedDate] = useState(diasSemana[0].isoDate);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTreatmentDetails(tratamientoId);
  }, [tratamientoId, fetchTreatmentDetails]);

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
    return {
      practicante: selectedTreatmentDetails.practitionerName,
      fecha: `${diaObj.diaNum} de ${diaObj.mes}`,
      hora: formatTime(selectedTime),
      tratamiento: selectedTreatmentDetails.treatment.name,
    };
  };

  return (
    <>
      <div className="page-container">
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
              <div className="date-selector-container">
                <div className="date-selector-scroll">
                  {diasSemana.map((dia) => (
                    <DateButton
                      key={dia.diaNum}
                      dia={dia}
                      isSelected={dia.isoDate === selectedDate}
                      onClick={() => handleDateSelect(dia.isoDate)}
                    />
                  ))}
                </div>
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