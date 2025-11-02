import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft, FiCheck, FiUser } from 'react-icons/fi';
import DateButton from '../../components/DateButton/DateButton';

const DUMMY_TRATAMIENTO_DETALLE = {
  t1: {
    practicante: {
      nombre: 'Dra. María González',
      especialidad: 'Odontología General',
      avatarUrl: 'https://i.imgur.com/LpaY82x.png',
    },
    tratamiento: {
      nombre: 'Limpieza Dental',
      duracion: '45 minutos',
    },
  },
  t2: {
    practicante: {
      nombre: 'Dr. Carlos Sánchez',
      especialidad: 'Endodoncia',
      avatarUrl: 'https://i.imgur.com/LpaY82x.png',
    },
    tratamiento: {
      nombre: 'Empaste Simple',
      duracion: '30 minutos',
    },
  },
};

const DUMMY_DIAS = [
  { diaSemana: 'Dom', diaNum: 2, mes: 'Nov' },
  { diaSemana: 'Lun', diaNum: 3, mes: 'Nov' },
  { diaSemana: 'Mar', diaNum: 4, mes: 'Nov' },
  { diaSemana: 'Mié', diaNum: 5, mes: 'Nov' },
  { diaSemana: 'Jue', diaNum: 6, mes: 'Nov' },
  { diaSemana: 'Vie', diaNum: 7, mes: 'Nov' },
  { diaSemana: 'Sáb', diaNum: 8, mes: 'Nov' },
];

const DUMMY_HORARIOS_POR_DIA = {
  2: {
    mañana: [],
    tarde: [],
  },
  3: {
    mañana: ['09:00', '09:30', '10:30', '11:00'],
    tarde: ['14:00', '14:30', '15:00', '16:30'],
  },
  4: {
    mañana: ['09:30', '10:00', '10:30'],
    tarde: ['15:00', '15:30', '16:00', '16:30', '17:00'],
  },
  5: {
    mañana: ['09:00', '11:30'],
    tarde: ['14:00', '16:00', '17:30'],
  },
  6: {
    mañana: ['10:00', '10:30', '11:00', '11:30'],
    tarde: [],
  },
  7: {
    mañana: ['09:00', '09:30', '10:30'],
    tarde: ['14:30', '15:00', '16:30', '17:00', '17:30'],
  },
  8: {
    mañana: ['09:00', '10:00', '11:00'],
    tarde: [],
  },
};

const ReservarTurno = () => {
  const { tratamientoId } = useParams();
  const [selectedDate, setSelectedDate] = useState(3);
  const [selectedTime, setSelectedTime] = useState(null);

  const detalles =
    DUMMY_TRATAMIENTO_DETALLE[tratamientoId] ||
    DUMMY_TRATAMIENTO_DETALLE.t1;

  const handleDateSelect = (diaNum) => {
    setSelectedDate(diaNum);
    setSelectedTime(null);
  };

  const handleConfirmar = () => {
    console.log('Turno a confirmar:');
    console.log('Tratamiento:', detalles.tratamiento.nombre);
    console.log('Fecha:', selectedDate);
    console.log('Hora:', selectedTime);
  };

  const horariosDelDia = DUMMY_HORARIOS_POR_DIA[selectedDate] || {
    mañana: [],
    tarde: [],
  };

  return (
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
                <span>{detalles.practicante.nombre}</span>
                <p>{detalles.practicante.especialidad}</p>
              </div>
            </div>
            <div className="treatment-info-box">
              <span>{detalles.tratamiento.nombre}</span>
              <p>Duración: {detalles.tratamiento.duracion}</p>
            </div>
          </div>

          <div className="turno-detalle-card">
            <h2>Selecciona una fecha</h2>
            <p>Elige el día que prefieras para tu consulta</p>
            <div className="date-selector-container">
              <div className="date-selector-scroll">
                {DUMMY_DIAS.map((dia) => (
                  <DateButton
                    key={dia.diaNum}
                    dia={dia}
                    isSelected={dia.diaNum === selectedDate}
                    onClick={() => handleDateSelect(dia.diaNum)}
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
                <h3>Mañana (9:00 - 12:00)</h3>
                <div className="time-slot-grid">
                  {horariosDelDia.mañana.length > 0 ? (
                    horariosDelDia.mañana.map((hora) => (
                      <button
                        key={hora}
                        className={`time-slot ${
                          hora === selectedTime ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedTime(hora)}
                      >
                        {hora}
                      </button>
                    ))
                  ) : (
                    <p className="no-horarios-msg">
                      No hay turnos disponibles por la mañana.
                    </p>
                  )}
                </div>
              </div>
              <div className="time-slot-group">
                <h3>Tarde (14:00 - 18:00)</h3>
                <div className="time-slot-grid">
                  {horariosDelDia.tarde.length > 0 ? (
                    horariosDelDia.tarde.map((hora) => (
                      <button
                        key={hora}
                        className={`time-slot ${
                          hora === selectedTime ? 'selected' : ''
                        }`}
                        onClick={() => setSelectedTime(hora)}
                      >
                        {hora}
                      </button>
                    ))
                  ) : (
                    <p className="no-horarios-msg">
                      No hay turnos disponibles por la tarde.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fab-container">
        <button
          className="fab"
          onClick={handleConfirmar}
          disabled={!selectedDate || !selectedTime}
        >
          <FiCheck />
          Confirmar Turno
        </button>
      </div>
    </div>
  );
};

export default ReservarTurno;