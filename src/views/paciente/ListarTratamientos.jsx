import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft, FiSearch, FiFilter, FiLoader } from 'react-icons/fi';
import TratamientoPublicCard from '../../components/TratamientoPublicCard/TratamientoPublicCard';
import { usePacienteStore } from '../../context/pacienteStore';

const ListarTratamientos = () => {
  const navigate = useNavigate();
  const { availableTreatments, status, error, fetchAvailableTreatments } =
    usePacienteStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAvailableTreatments();
  }, [fetchAvailableTreatments]);

  const handleSolicitar = (offeredTreatmentId) => {
    navigate(`/paciente/reservar-turno/${offeredTreatmentId}`);
  };

  const filteredTreatments = availableTreatments.filter(
    (t) =>
      t.treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.practitionerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container-user">
      <div className="paciente-content-container">
        <header className="page-header">
          <Link to="/paciente/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Tratamientos</h1>
        </header>

        <div className="filters-bar">
          <div className="search-bar-wrapper">
            <FiSearch />
            <input
              type="text"
              className="search-bar-input"
              placeholder="Buscar por tratamiento o practicante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-button">
            <FiFilter />
            Filtros
          </button>
        </div>

        <section className="tratamientos-grid-container">
          <h2>
            Tratamientos disponibles ({filteredTreatments.length})
          </h2>

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
            filteredTreatments.map((tratamientoApi) => (
              <TratamientoPublicCard
                key={tratamientoApi.id}
                tratamiento={{
                  titulo: tratamientoApi.treatment.name,
                  descripcion: tratamientoApi.treatment.description,
                  duracion: `${tratamientoApi.durationInMinutes} minutos`,
                  disponibilidad: `Con: ${tratamientoApi.practitionerName}`,
                  diasDisponibles: tratamientoApi.availabilitySlots,
                  abono: false, // La API no provee este dato
                }}
                onSolicitar={() => handleSolicitar(tratamientoApi.id)}
              />
            ))}
          
          {status === 'success' && filteredTreatments.length === 0 && (
            <p>No se encontraron tratamientos disponibles.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ListarTratamientos;