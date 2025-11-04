import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PacienteListItem from '../../components/PacienteListItem/PacienteListItem';
import './practicante.css';
import { FiChevronLeft, FiSearch, FiChevronRight, FiLoader } from 'react-icons/fi';
import { useAtencionStore } from '../../context/atencionStore';

const ListaAtenciones = () => {
  const navigate = useNavigate();
  const { attentions, status, error, fetchPractitionerAttentions } = useAtencionStore();

  useEffect(() => {
    fetchPractitionerAttentions();
  }, [fetchPractitionerAttentions]);

  const handleSelectAtencion = (attentionId) => {
    navigate(`/practicante/evolucion/${attentionId}`);
  };

  return (
    <div className="page-container-user">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Mis Pacientes (Atenciones)</h1>
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
          {status === 'loading' && (
            <div className="loading-container">
              <FiLoader className="loading-icon" />
            </div>
          )}
          {status === 'error' && (
            <div className="error-container">
              <p>{error}</p>
            </div>
          )}
          {status === 'success' &&
            attentions.map((atencion) => (
              <PacienteListItem
                key={atencion.id}
                paciente={{ nombre: atencion.patientName }}
                detailText={`Tratamiento: ${atencion.treatmentName}`}
                onSelect={() => handleSelectAtencion(atencion.id)}
                buttonText="Ver Evolución"
                buttonIcon={<FiChevronRight />}
              />
            ))}
        </section>
      </div>
    </div>
  );
};

export default ListaAtenciones;