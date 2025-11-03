import { Link, useNavigate } from 'react-router-dom';
import './paciente.css';
import { FiChevronLeft, FiSearch, FiFilter } from 'react-icons/fi';
import TratamientoPublicCard from '../../components/TratamientoPublicCard/TratamientoPublicCard';

const DUMMY_TRATAMIENTOS_PUBLICOS = [
  {
    id: 't1',
    titulo: 'Limpieza Dental',
    descripcion: 'Limpieza profunda y revisión general',
    duracion: '45 minutos',
    disponibilidad: 'Disponible esta semana',
    abono: true,
  },
  {
    id: 't2',
    titulo: 'Empaste Simple',
    descripcion: 'Reparación de caries pequeñas',
    duracion: '30 minutos',
    disponibilidad: 'Disponible en 2 semanas',
    abono: true,
  },
{
    id: 't3',
    titulo: 'Blanqueamiento Dental',
    descripcion: 'Tratamiento estético para aclarar el tono',
    duracion: '60 minutos',
    disponibilidad: 'Disponible esta semana',
    abono: true,
  },
  {
    id: 't4',
    titulo: 'Consulta General',
    descripcion: 'Revisión y diagnóstico',
    duracion: '20 minutos',
    disponibilidad: 'Disponible hoy',
    abono: false,
  },
];

const ListarTratamientos = () => {
  const navigate = useNavigate();

  const handleSolicitar = (idTratamiento) => {
    navigate(`/paciente/reservar-turno/${idTratamiento}`);
  };

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
              placeholder="Buscar tratamiento..."
            />
          </div>
          <button className="filter-button">
            <FiFilter />
            Filtros
          </button>
        </div>

        <section className="tratamientos-grid-container">
          <h2>
            Tratamientos disponibles ({DUMMY_TRATAMIENTOS_PUBLICOS.length})
          </h2>
          <div className="tratamientos-grid">
            {DUMMY_TRATAMIENTOS_PUBLICOS.map((tratamiento) => (
              <TratamientoPublicCard
                key={tratamiento.id}
                tratamiento={tratamiento}
                onSolicitar={() => handleSolicitar(tratamiento.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ListarTratamientos;