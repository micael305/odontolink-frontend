import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PracticanteSearchResultItem from '../../components/PracticanteSearchResultItem/PracticanteSearchResultItem';
import Button from '../../components/Button/Button';
import './docente.css';
import { FiChevronLeft, FiSearch, FiUsers } from 'react-icons/fi';
import { searchPractitioners, linkPractitioner } from '../../api/docenteService';

const BuscarPracticantes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [showAllPractitioners, setShowAllPractitioners] = useState(false);

  useEffect(() => {
    // Limpiar el timeout anterior
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Si el término de búsqueda está vacío, no buscar automáticamente
    if (!searchTerm.trim()) {
      if (!showAllPractitioners) {
        setResultados([]);
      }
      return;
    }

    // Configurar nuevo timeout para debounce
    const timeout = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500); // Esperar 500ms después de que el usuario deje de escribir

    setDebounceTimeout(timeout);

    // Cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [searchTerm]);

  // Transformar los datos de la API para que coincidan con la estructura esperada
  const transformPractitionerData = (practitioner) => {
    return {
      id: practitioner.id,
      studentId: practitioner.studentId,
      studyYear: practitioner.studyYear,
      firstName: practitioner.user?.firstName || '',
      lastName: practitioner.user?.lastName || '',
      dni: practitioner.user?.dni || '',
      email: practitioner.user?.email || '',
      active: practitioner.user?.active !== false, // Asumimos activo por defecto
    };
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchPractitioners(query);
      // Transformar los datos antes de guardarlos
      const transformedData = data.map(transformPractitionerData);
      setResultados(transformedData);
      setShowAllPractitioners(false);
    } catch (err) {
      console.error('Error al buscar practicantes:', err);
      setError('Error al buscar practicantes');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadAllPractitioners = async () => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm('');
      // Llamar sin query para obtener todos
      const data = await searchPractitioners('');
      // Transformar los datos antes de guardarlos
      const transformedData = data.map(transformPractitionerData);
      setResultados(transformedData);
      setShowAllPractitioners(true);
    } catch (err) {
      console.error('Error al cargar todos los practicantes:', err);
      setError('Error al cargar practicantes');
    } finally {
      setLoading(false);
    }
  };

  const handleAgregarPracticante = async (practicanteId) => {
    try {
      await linkPractitioner(practicanteId);
      alert('Practicante agregado exitosamente');
      // Remover el practicante de los resultados
      setResultados((prev) => prev.filter((p) => p.id !== practicanteId));
    } catch (err) {
      console.error('Error al agregar practicante:', err);
      alert('Error al agregar practicante. Puede que ya esté vinculado.');
    }
  };

  return (
    <div className="page-container-user">
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
              placeholder="Buscar practicante por nombre, DNI o Legajo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            icon={<FiUsers />}
            onClick={handleLoadAllPractitioners}
            disabled={loading}
            className="load-all-btn"
          >
            Ver Todos
          </Button>
        </div>

        <section className="practicante-list-container">
          {loading && <p>Cargando...</p>}
          {error && <p className="auth-error-msg">{error}</p>}
          {!loading && !error && resultados.length === 0 && searchTerm.trim() && (
            <p>No se encontraron practicantes con ese criterio.</p>
          )}
          {!loading && !error && resultados.length === 0 && !searchTerm.trim() && !showAllPractitioners && (
            <div className="empty-state">
              <p>Busque practicantes por nombre, DNI o legajo.</p>
              <p className="hint">O haga clic en "Ver Todos" para mostrar todos los practicantes disponibles.</p>
            </div>
          )}
          {!loading &&
            !error &&
            resultados.map((practicante) => (
              <PracticanteSearchResultItem
                key={practicante.id}
                practicante={practicante}
                onAgregar={() => handleAgregarPracticante(practicante.id)}
              />
            ))}
        </section>
      </div>
    </div>
  );
};

export default BuscarPracticantes;