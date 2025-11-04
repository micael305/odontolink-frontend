import { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingModal from '../../components/RatingModal/RatingModal';
import AtencionListItem from '../../components/AtencionListItem/AtencionListItem';
import './paciente.css';
import { FiChevronLeft, FiSearch, FiStar } from 'react-icons/fi';

const DUMMY_ATENCIONES = [
  {
    id: 'a1',
    treatmentName: 'Limpieza Dental',
    practitionerName: 'Dra. María González',
    startDate: '2024-01-19',
  },
  {
    id: 'a2',
    treatmentName: 'Tratamiento de Caries',
    practitionerName: 'Dra. María González',
    startDate: '2024-01-10',
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
    // Aquí iría la llamada al store/API
  };

  return (
    <div className="page-container">
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
              titulo={atencion.treatmentName}
              detailText={`${
                atencion.practitionerName
              } • ${new Date(atencion.startDate).toLocaleDateString()}`}
              buttonText="Calificar"
              buttonIcon={<FiStar />}
              onButtonClick={() => handleOpenModal(atencion)}
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
          titulo: atencionSeleccionada?.treatmentName,
          subtitulo: `${atencionSeleccionada?.practitionerName} • ${
            atencionSeleccionada
              ? new Date(atencionSeleccionada.startDate).toLocaleDateString()
              : ''
          }`,
        }}
        criterios={CRITERIOS_PACIENTE}
        comentarioLabel="Comentarios adicionales (opcional)"
      />
    </div>
  );
};

export default HistorialAtencionesPaciente;