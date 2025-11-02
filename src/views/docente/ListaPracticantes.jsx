import { Link } from 'react-router-dom';
import PracticanteListItem from '../../components/PracticanteListItem/PracticanteListItem';
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
  const handleSelectPracticante = (practicanteId) => {
    console.log('Viendo detalles del practicante:', practicanteId);
  };

  return (
    <div className="page-container-docente">
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
              onSelect={() => handleSelectPracticante(practicante.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ListaPracticantes;