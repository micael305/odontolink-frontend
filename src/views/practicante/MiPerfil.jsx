import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ModificarPerfilModal from '../../components/ModificarPerfilModal/ModificarPerfilModal';
import './practicante.css';
import {
  FiChevronLeft,
  FiUser,
  FiPhone,
  FiBookOpen,
  FiEdit2,
  FiClock,
} from 'react-icons/fi';

const DUMMY_PERFIL = {
  nombre: 'Juan Pérez',
  dni: '23.456.789',
  matricula: 'MN 12345',
  telefono: '11 2345-6789',
  email: 'juan.perez@odontolink.com',
  titulo: 'Odontólogo',
  universidad: 'Universidad de Buenos Aires',
  disponibilidad: 'Lunes a Viernes, 9:00 - 17:00',
};

const SECCIONES = {
  datosPersonales: {
    titulo: 'Datos Personales',
    campos: [
      { label: 'Nombre completo', name: 'nombre' },
      { label: 'DNI', name: 'dni' },
      { label: 'Matrícula Profesional', name: 'matricula' },
    ],
  },
  datosContacto: {
    titulo: 'Datos de Contacto',
    campos: [
      { label: 'Teléfono', name: 'telefono' },
      { label: 'Email', name: 'email' },
    ],
  },
  infoAcademica: {
    titulo: 'Información Académica',
    campos: [
      { label: 'Título', name: 'titulo' },
      { label: 'Universidad', name: 'universidad' },
    ],
  },
  disponibilidad: {
    titulo: 'Disponibilidad',
    campos: [
      {
        label: 'Horarios de atención (ej. L-V 9-17)',
        name: 'disponibilidad',
      },
    ],
  },
};

const MiPerfil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seccionActual, setSeccionActual] = useState(null);

  const handleOpenModal = (seccionKey) => {
    setSeccionActual(SECCIONES[seccionKey]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSeccionActual(null);
  };

  return (
    <div className="page-container">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Mi Perfil</h1>
        </header>

        <div className="perfil-layout">
          <div className="info-card">
            <div className="perfil-section-header">
              <h2>
                <FiUser /> Datos Personales
              </h2>
              <Button
                variant="outline-secondary"
                icon={<FiEdit2 />}
                onClick={() => handleOpenModal('datosPersonales')}
              >
                Modificar
              </Button>
            </div>
            <div className="info-card-content">
              <div className="info-key-value">
                <span className="key">Nombre completo</span>
                <span className="value">{DUMMY_PERFIL.nombre}</span>
              </div>
              <div className="info-key-value">
                <span className="key">DNI</span>
                <span className="value">{DUMMY_PERFIL.dni}</span>
              </div>
              <div className="info-key-value">
                <span className="key">Matrícula Profesional</span>
                <span className="value">{DUMMY_PERFIL.matricula}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="perfil-section-header">
              <h2>
                <FiPhone /> Datos de Contacto
              </h2>
              <Button
                variant="outline-secondary"
                icon={<FiEdit2 />}
                onClick={() => handleOpenModal('datosContacto')}
              >
                Modificar
              </Button>
            </div>
            <div className="info-card-content">
              <div className="info-key-value">
                <span className="key">Teléfono</span>
                <span className="value">{DUMMY_PERFIL.telefono}</span>
              </div>
              <div className="info-key-value">
                <span className="key">Email</span>
                <span className="value">{DUMMY_PERFIL.email}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="perfil-section-header">
              <h2>
                <FiBookOpen /> Información Académica
              </h2>
              <Button
                variant="outline-secondary"
                icon={<FiEdit2 />}
                onClick={() => handleOpenModal('infoAcademica')}
              >
                Modificar
              </Button>
            </div>
            <div className="info-card-content">
              <div className="info-key-value">
                <span className="key">Título</span>
                <span className="value">{DUMMY_PERFIL.titulo}</span>
              </div>
              <div className="info-key-value">
                <span className="key">Universidad</span>
                <span className="value">{DUMMY_PERFIL.universidad}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="perfil-section-header">
              <h2>
                <FiClock /> Disponibilidad
              </h2>
              <Button
                variant="outline-secondary"
                icon={<FiEdit2 />}
                onClick={() => handleOpenModal('disponibilidad')}
              >
                Modificar
              </Button>
            </div>
            <div className="info-card-content">
              <div className="info-key-value">
                <span className="key">Horarios de atención</span>
                <span className="value">{DUMMY_PERFIL.disponibilidad}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModificarPerfilModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        titulo={seccionActual?.titulo}
        campos={seccionActual?.campos}
        datosActuales={DUMMY_PERFIL}
      />
    </div>
  );
};

export default MiPerfil;