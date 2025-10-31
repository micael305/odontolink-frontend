// src/views/practicante/GestionTratamientos.jsx
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './practicante.css';
import {
  FiPlus,
  FiChevronLeft,
  FiCalendar,
  FiClock,
  FiAlertTriangle,
  FiEdit3,
  FiTrash2,
} from 'react-icons/fi';

const GestionTratamientos = () => {
  return (
    <div className="page-container">
      <div className="practicante-content-container">
        <header className="page-header">
          <div className="page-title-container">
            <Link to="/practicante/dashboard" className="page-back-link">
              <FiChevronLeft />
              Volver
            </Link>
          </div>
          <Button
            variant="success"
            icon={<FiPlus />}
            className="add-treatment-btn"
          >
            Agregar Tratamiento
          </Button>
        </header>

        <section className="treatment-list">
          <h2 className="treatment-list-header">
            Tratamientos que ofrezco (1)
          </h2>

          <div className="treatment-card">
            <div className="treatment-card-content">
              <div className="card-header">
                <h3 className="card-header-title">Limpieza Dental</h3>
                <div className="card-header-pills">
                  <span className="card-tag preventivo">Preventivo</span>
                  <span className="card-tag duration">45 minutos</span>
                </div>
              </div>

              <div className="card-section">
                <h4 className="card-section-title">
                  <FiCalendar />
                  Disponibilidad:
                </h4>
                <div className="card-pills-list">
                  <span className="card-pill">Lunes</span>
                  <span className="card-pill">Martes</span>
                  <span className="card-pill">Miércoles</span>
                  <span className="card-pill">Viernes</span>
                </div>
              </div>

              <div className="card-section">
                <h4 className="card-section-title">
                  <FiClock />
                  Horarios:
                </h4>
                <div className="card-pills-list">
                  <span className="card-pill">09:00</span>
                  <span className="card-pill">11:00</span>
                  <span className="card-pill">14:00</span>
                  <span className="card-pill">16:00</span>
                </div>
              </div>

              <div className="card-section">
                <h4 className="card-section-title">
                  <FiAlertTriangle className="danger" />
                  Requerimientos:
                </h4>
                <p className="card-text">
                  Paciente debe venir en ayunas
                </p>
              </div>
            </div>

            <footer className="card-footer-actions">
              <Button variant="outline-secondary" icon={<FiEdit3 />}>
                Modificar
              </Button>
              <Button variant="outline-danger" icon={<FiTrash2 />}>
                Eliminar
              </Button>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GestionTratamientos;