// src/views/practicante/GestionarTratamientos.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import TratamientoCard from '../../components/TratamientoCard/TratamientoCard';
import AgregarTratamientoModal from '../../components/AgregarTratamientoModal/AgregarTratamientoModal';
import ModificarTratamientoModal from '../../components/ModificarTratamientoModal/ModificarTratamientoModal';
import ConfirmarEliminacionModal from '../../components/ConfirmarEliminacionModal/ConfirmarEliminacionModal';
import './practicante.css';
import { FiPlus, FiChevronLeft } from 'react-icons/fi';

const DUMMY_TRATAMIENTOS = [
  {
    id: 't1',
    titulo: 'Limpieza Dental',
    tags: [
      { texto: 'Preventivo', tipo: 'preventivo' },
      { texto: '45 minutos', tipo: 'duration' },
    ],
    disponibilidad: ['Lunes', 'Martes', 'Miércoles', 'Viernes'],
    horarios: ['09:00', '11:00', '14:00', '16:00'],
    requerimientos: 'Paciente debe venir en ayunas',
  },
  {
    id: 't2',
    titulo: 'Blanqueamiento Dental',
    tags: [
      { texto: 'Estética', tipo: 'estetica' },
      { texto: '60 minutos', tipo: 'duration' },
    ],
    disponibilidad: ['Lunes', 'Miércoles'],
    horarios: ['10:00', '15:00'],
    requerimientos: 'No requiere preparación previa.',
  },
  {
    id: 't3',
    titulo: 'Tratamiento de Caries',
    tags: [
      { texto: 'Restauración', tipo: 'restauracion' },
      { texto: '50 minutos', tipo: 'duration' },
    ],
    disponibilidad: ['Martes', 'Viernes'],
    horarios: ['09:00', '11:00', '14:00', '16:00', '17:00'],
    requerimientos: 'Evitar comer 1 hora antes.',
  },
];

const GestionTratamientos = () => {
  const [isAgregarModalOpen, setIsAgregarModalOpen] = useState(false);
  const [isModificarModalOpen, setIsModificarModalOpen] = useState(false);
  const [isEliminarModalOpen, setIsEliminarModalOpen] = useState(false);
  const [tratamientoSeleccionado, setTratamientoSeleccionado] =
    useState(null);

  const handleOpenModificar = (tratamiento) => {
    setTratamientoSeleccionado(tratamiento);
    setIsModificarModalOpen(true);
  };

  const handleOpenEliminar = (tratamiento) => {
    setTratamientoSeleccionado(tratamiento);
    setIsEliminarModalOpen(true);
  };

  const handleConfirmarEliminar = () => {
    console.log('Eliminando:', tratamientoSeleccionado.id);
    closeModals();
  };

  const closeModals = () => {
    setIsAgregarModalOpen(false);
    setIsModificarModalOpen(false);
    setIsEliminarModalOpen(false);
    setTratamientoSeleccionado(null);
  };

  return (
    <div className="page-container">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>

          <Button
            variant="success"
            icon={<FiPlus />}
            className="add-treatment-btn"
            onClick={() => setIsAgregarModalOpen(true)}
          >
            Agregar Tratamiento
          </Button>
        </header>

        <section className="treatment-list">
          <h2 className="treatment-list-header">
            Tratamientos que ofrezco ({DUMMY_TRATAMIENTOS.length})
          </h2>

          {DUMMY_TRATAMIENTOS.map((tratamiento) => (
            <TratamientoCard
              key={tratamiento.id}
              tratamiento={tratamiento}
              onModificar={() => handleOpenModificar(tratamiento)}
              onEliminar={() => handleOpenEliminar(tratamiento)}
            />
          ))}
        </section>
      </div>

      <AgregarTratamientoModal
        isOpen={isAgregarModalOpen}
        onClose={closeModals}
      />

      <ModificarTratamientoModal
        isOpen={isModificarModalOpen}
        onClose={closeModals}
        tratamiento={tratamientoSeleccionado}
      />

      <ConfirmarEliminacionModal
        isOpen={isEliminarModalOpen}
        onClose={closeModals}
        onConfirm={handleConfirmarEliminar}
        tratamientoNombre={tratamientoSeleccionado?.titulo}
      />
    </div>
  );
};

export default GestionTratamientos;