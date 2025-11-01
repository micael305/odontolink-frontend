import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TurnoDetalleModal from '../../components/TurnoDetalleModal/TurnoDetalleModal';
import './practicante.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DUMMY_TURNOS = [
  {
    id: 't1',
    fecha: '2025-11-01',
    hora: '09:00',
    paciente: 'Juan Pérez',
    tratamiento: 'Consulta General',
    estado: 'Agendado',
  },
  {
    id: 't2',
    fecha: '2025-11-01',
    hora: '10:30',
    paciente: 'Maria García',
    tratamiento: 'Limpieza Dental',
    estado: 'Completado',
  },
  {
    id: 't3',
    fecha: '2025-11-03',
    hora: '11:00',
    paciente: 'Ana Martínez',
    tratamiento: 'Control Postoperatorio',
    estado: 'Agendado',
  },
  {
    id: 't4',
    fecha: '2025-11-03',
    hora: '11:30',
    paciente: 'Luis Fernández',
    tratamiento: 'Consulta General',
    estado: 'Agendado',
  },
  {
    id: 't5',
    fecha: '2025-11-04',
    hora: '16:00',
    paciente: 'Sofia Gomez',
    tratamiento: 'Ortodoncia',
    estado: 'Completado',
  },
  {
    id: 't6',
    fecha: '2025-11-10',
    hora: '10:00',
    paciente: 'Carlos Diaz',
    tratamiento: 'Extracción',
    estado: 'Cancelado',
  },
  {
    id: 't7',
    fecha: '2025-11-12',
    hora: '15:00',
    paciente: 'Lucia Vega',
    tratamiento: 'Consulta General',
    estado: 'No Asistio',
  },
];

const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

const GestionarTurnos = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-11-01T12:00:00'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

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
              const dayString = day.date
                ? day.date.toISOString().split('T')[0]
                : null;
              const turnosDelDia = DUMMY_TURNOS.filter(
                (t) => t.fecha === dayString
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
                    {turnosDelDia.map((turno) => (
                      <div
                        key={turno.id}
                        className={`turno-item ${turno.estado
                          .toLowerCase()
                          .replace(' ', '-')}`}
                        onClick={() => handleOpenModal(turno)}
                      >
                        <span className="turno-item-hora">{turno.hora}</span>
                        <span className="turno-item-paciente">
                          {turno.paciente}
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