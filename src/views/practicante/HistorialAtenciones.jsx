import { useState } from 'react';
import { Link } from 'react-router-dom';
import PacienteListItem from '../../components/PacienteListItem/PacienteListItem';
import RatingModal from '../../components/RatingModal/RatingModal';
import './practicante.css';
import { FiChevronLeft, FiSearch, FiStar } from 'react-icons/fi';

const DUMMY_PACIENTES = [
  { id: 'p1', nombre: 'Maria Gonzalez', dni: '12.345.678' },
  { id: 'p2', nombre: 'Juan Pérez', dni: '23.456.789' },
  { id: 'p3', nombre: 'Ana Fernandez', dni: '34.567.890' },
];

const CRITERIOS_PRACTICANTE = [
  { id: 'puntualidad', label: 'Puntualidad' },
  { id: 'colaboracion', label: 'Colaboración durante la atención' },
  { id: 'cumplimiento', label: 'Cumplimiento de indicaciones' },
  { id: 'actitud', label: 'Actitud general' },
];

const HistorialAtenciones = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  const handleOpenModal = (paciente) => {
    setPacienteSeleccionado(paciente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPacienteSeleccionado(null);
  };

  const handleFormSubmit = (calificacion) => {
    console.log('Calificación (Practicante):', {
      pacienteId: pacienteSeleccionado.id,
      ...calificacion,
    });
  };

  return (
    <div className="page-container-practicante">
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

        <section className="patient-list-container">
          {DUMMY_PACIENTES.map((paciente) => (
            <PacienteListItem
              key={paciente.id}
              paciente={paciente}
              onSelect={() => handleOpenModal(paciente)}
              buttonText="Calificar"
              buttonIcon={<FiStar />}
            />
          ))}
        </section>
      </div>

      <RatingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        titulo="Calificar Paciente"
        subtitulo="Asigne una calificación de 1 a 5 estrellas"
        infoBox={{
          titulo: pacienteSeleccionado?.nombre,
          subtitulo: `DNI: ${pacienteSeleccionado?.dni}`,
        }}
        criterios={CRITERIOS_PRACTICANTE}
        comentarioLabel="Comentario (opcional)"
      />
    </div>
  );
};

export default HistorialAtenciones;