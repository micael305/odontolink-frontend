import { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingModal from '../../components/RatingModal/RatingModal';
import AtencionListItem from '../../components/AtencionListItem/AtencionListItem';
import './paciente.css';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';

const DUMMY_ATENCIONES = [
  {
    id: 'a1',
    tratamiento: 'Limpieza Dental',
    practicante: 'Dra. María González',
    fecha: '19/01/2024',
  },
  {
    id: 'a2',
    tratamiento: 'Tratamiento de Caries',
    practicante: 'Dra. María González',
    fecha: '10/01/2024',
  },
];

const CRITERIOS_PACIENTE = [
  { id: 'puntualidad', label: 'Puntualidad del practicante' },
  { id: 'trato', label: 'Trato y comunicación' },
  { id: 'satisfaccion', label: 'Satisfacción general' },
];

const HistorialAtencionesPaciente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [atencionSeleccionada, setAtencionSeleccionada] = useState(null);

  const handleOpenModal = (atencion) => {
    setAtencionSeleccionada(atencion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAtencionSeleccionada(null);
  };

  const handleFormSubmit = (calificacion) => {
    console.log('Calificación (Paciente):', {
      atencionId: atencionSeleccionada.id,
      ...calificacion,
    });
  };

  return (
    <div className="page-container-paciente">
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
            />
          </div>
        </div>

        <section className="atencion-list-container">
          {DUMMY_ATENCIONES.map((atencion) => (
            <AtencionListItem
              key={atencion.id}
              atencion={atencion}
              onCalificar={() => handleOpenModal(atencion)}
            />
          ))}
        </section>
      </div>

      <RatingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        titulo="Calificar Atención"
        subtitulo="Califique su experiencia con el practicante"
        infoBox={{
          titulo: atencionSeleccionada?.tratamiento,
          subtitulo: `${atencionSeleccionada?.practicante} • ${atencionSeleccionada?.fecha}`,
        }}
        criterios={CRITERIOS_PACIENTE}
        comentarioLabel="Comentarios adicionales (opcional)"
      />
    </div>
  );
};

export default HistorialAtencionesPaciente;