import { Link } from 'react-router-dom';
import PracticanteSearchResultItem from '../../components/PracticanteSearchResultItem/PracticanteSearchResultItem';
import './docente.css';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';

const DUMMY_RESULTADOS = [
  {
    id: 'pr4',
    nombre: 'Martina López',
    legajo: 'F-1234',
    dni: '45.123.456',
  },
  {
    id: 'pr5',
    nombre: 'Santiago Torres',
    legajo: 'F-1235',
    dni: '44.234.567',
  },
];

const BuscarPracticantes = () => {
  const handleAgregarPracticante = (practicanteId) => {
    console.log('Agregando practicante:', practicanteId);
  };

  return (
    <div className="page-container-docente">
      <div className="docente-content-container">
        <header className="page-header">
          <Link to="/docente/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Buscar Practicantes</h1>
        </header>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar practicante por DNI o Legajo..."
            />
          </div>
        </div>

        <section className="practicante-list-container">
          {DUMMY_RESULTADOS.map((practicante) => (
            <PracticanteSearchResultItem
              key={practicante.id}
              practicante={practicante}
              onSelect={() => handleAgregarPracticante(practicante.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default BuscarPracticantes;