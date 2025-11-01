import { Link, useNavigate } from 'react-router-dom'; 
import PacienteListItem from '../../components/PacienteListItem/PacienteListItem';
import './practicante.css';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';

const DUMMY_PACIENTES = [
  { id: 'p1', nombre: 'Maria Gonzalez', dni: '12.345.678' },
  { id: 'p2', nombre: 'Juan Pérez', dni: '23.456.789' },
  { id: 'p3', nombre: 'Ana Fernandez', dni: '34.567.890' },
];

const ListaPacientes = () => {
  const navigate = useNavigate(); 

  const handleSelectPaciente = (pacienteId) => {
    navigate(`/practicante/evolucion/${pacienteId}`);
  };

  return (
    <div className="page-container">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Seleccionar Paciente</h1>
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
              onSelect={() => handleSelectPaciente(paciente.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ListaPacientes;