import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PracticanteListItem from '../../components/PracticanteListItem/PracticanteListItem';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import './docente.css';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';

const DUMMY_PRACTICANTES = [
  {
    id: 'pr1',
    nombre: 'Ana Martínez',
    comision: 'A-01',
    estadoAcademico: 'Regular',
    practicasRealizadas: 8,
    estadoActual: 'Activo',
  },
  {
    id: 'pr2',
    nombre: 'Carlos Díaz',
    comision: 'A-01',
    estadoAcademico: 'Regular',
    practicasRealizadas: 10,
    estadoActual: 'Activo',
  },
  {
    id: 'pr3',
    nombre: 'Lucía Vega',
    comision: 'B-02',
    estadoAcademico: 'Aprobado',
    practicasRealizadas: 15,
    estadoActual: 'Inactivo',
  },
];

const ListaPracticantes = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [practicanteSeleccionado, setPracticanteSeleccionado] = useState(null);

  const handleVerFeedback = (practicanteId) => {
    navigate(`/docente/practicante/feedback/${practicanteId}`);
  };

  const handleOpenQuitarModal = (practicante) => {
    setPracticanteSeleccionado(practicante);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPracticanteSeleccionado(null);
  };

  const handleConfirmarQuitar = () => {
    console.log('Quitando practicante:', practicanteSeleccionado.id);
    handleCloseModal();
  };

  return (
    <div className="page-container-user">
      <div className="docente-content-container">
        <header className="page-header">
          <Link to="/docente/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Practicantes a cargo</h1>
        </header>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar practicante por nombre o comisión..."
            />
          </div>
        </div>

        <section className="practicante-list-container">
          {DUMMY_PRACTICANTES.map((practicante) => (
            <PracticanteListItem
              key={practicante.id}
              practicante={practicante}
              onVerFeedback={() => handleVerFeedback(practicante.id)}
              onQuitar={() => handleOpenQuitarModal(practicante)}
            />
          ))}
        </section>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmarQuitar}
        title="Quitar Practicante"
        confirmText="Quitar"
        confirmVariant="danger"
      >
        ¿Está seguro que desea quitar a{' '}
        <strong>{practicanteSeleccionado?.nombre}</strong> de su cargo?
      </ConfirmModal>
    </div>
  );
};

export default ListaPracticantes;