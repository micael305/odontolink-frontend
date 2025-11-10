import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TurnoDetalleModal from '../../components/TurnoDetalleModal/TurnoDetalleModal';
import './practicante.css';
import { FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi';
import { useTurnoStore } from '../../context/turnoStore';
import { toLocalISODate } from '../../utils/dateUtils';

const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

const GestionarTurnos = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  const { turnos, status, error, fetchTurnos } = useTurnoStore();

  useEffect(() => {
    fetchTurnos();
  }, [fetchTurnos]);

  const turnosFormateados = useMemo(() => {
    return turnos.map((turno) => {
      const d = new Date(turno.appointmentTime);
      return {
        ...turno,
        fecha: toLocalISODate(d),
        hora: d.toLocaleTimeString('default', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        diaDelMes: d.getDate(),
      };
    });
  }, [turnos]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push({ day: prevMonthLastDay - i + 1, isPadding: true });
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isPadding: true });
    }

    return days;
  }, [currentDate]);

  const handleOpenModal = (turno) => {
    setTurnoSeleccionado(turno);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTurnoSeleccionado(null);
  };

  const changeMonth = (offset) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset);
      return newDate;
    });
  };

  return (
    <div className="page-container">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Gestionar Turnos</h1>
        </header>

        <div className="calendar-title-bar">
          <button onClick={() => changeMonth(-1)}>
            <FiChevronLeft />
          </button>
          <h2>
            {currentDate
              .toLocaleString('es-ES', {
                month: 'long',
                year: 'numeric',
              })
              .toUpperCase()}
          </h2>
          <button onClick={() => changeMonth(1)}>
            <FiChevronRight />
          </button>
        </div>

        <div className="calendar-container">
          <div className="calendar-header">
            {DIAS_SEMANA.map((dia) => (
              <div key={dia} className="calendar-header-day">
                {dia}
              </div>
            ))}
          </div>
          <div className="calendar-grid">
            {calendarDays.map((day, index) => {
              const turnosDelDia = turnosFormateados.filter(
                (t) =>
                  t.diaDelMes === day.day &&
                  new Date(t.fecha).getMonth() === currentDate.getMonth()
              );

              return (
                <div
                  key={index}
                  className={`calendar-day ${
                    day.isPadding ? 'padding' : ''
                  } ${
                    day.date?.toDateString() === new Date().toDateString()
                      ? 'today'
                      : ''
                  }`}
                >
                  <span className="calendar-day-number">{day.day}</span>
                  <div className="turnos-list">
                    {status === 'loading' && index === 0 && (
                      <FiLoader className="loading-icon-small" />
                    )}
                    {turnosDelDia.map((turno) => (
                      <div
                        key={turno.id}
                        className={`turno-item ${turno.status
                          .toLowerCase()
                          .replace('_', '-')}`}
                        onClick={() => handleOpenModal(turno)}
                      >
                        <span className="turno-item-hora">{turno.hora}</span>
                        <span className="turno-item-paciente">
                          {turno.patientName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <TurnoDetalleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        turno={turnoSeleccionado}
      />
    </div>
  );
};

export default GestionarTurnos;