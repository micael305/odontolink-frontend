import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PracticanteListItem from '../../components/PracticanteListItem/PracticanteListItem';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import './docente.css';
import { FiChevronLeft, FiSearch } from 'react-icons/fi';
import { getMyPractitioners, unlinkPractitioner } from '../../api/docenteService';

const ListaPracticantes = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [practicanteSeleccionado, setPracticanteSeleccionado] = useState(null);
  const [practicantes, setPracticantes] = useState([]);
  const [filteredPracticantes, setFilteredPracticantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPracticantes();
  }, []);

  useEffect(() => {
    filterPracticantes();
  }, [searchTerm, practicantes]);

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

  const fetchPracticantes = async () => {
    try {
      setLoading(true);
      const data = await getMyPractitioners();
      // Transformar los datos antes de guardarlos
      const transformedData = data.map(transformPractitionerData);
      setPracticantes(transformedData);
      setFilteredPracticantes(transformedData);
      setError(null);
    } catch (err) {
      console.error('Error al obtener practicantes:', err);
      setError('No se pudieron cargar los practicantes');
    } finally {
      setLoading(false);
    }
  };

  const filterPracticantes = () => {
    if (!searchTerm.trim()) {
      setFilteredPracticantes(practicantes);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = practicantes.filter((p) => {
      const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
      const studentId = p.studentId?.toLowerCase() || '';
      return fullName.includes(term) || studentId.includes(term);
    });
    setFilteredPracticantes(filtered);
  };

  const handleVerFeedback = (practicanteId) => {
    navigate(`/docente/practicante/feedback/${practicanteId}`);
  };

  const handleOpenQuitarModal = (practicante) => {
    setPracticanteSeleccionado(practicante);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPracticanteSeleccionado(null);
  };

  const handleConfirmarQuitar = async () => {
    try {
      await unlinkPractitioner(practicanteSeleccionado.id);
      alert('Practicante desvinculado exitosamente');
      handleCloseModal();
      fetchPracticantes();
    } catch (err) {
      console.error('Error al desvincular practicante:', err);
      alert('Error al desvincular practicante');
    }
  };

  if (loading) {
    return (
      <div className="page-container-user">
        <div className="docente-content-container">
          <p>Cargando practicantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container-user">
        <div className="docente-content-container">
          <p className="auth-error-msg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container-user">
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
              placeholder="Buscar practicante por nombre o legajo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <section className="practicante-list-container">
          {filteredPracticantes.length > 0 ? (
            filteredPracticantes.map((practicante) => (
              <PracticanteListItem
                key={practicante.id}
                practicante={practicante}
                onVerFeedback={() => handleVerFeedback(practicante.id)}
                onQuitar={() => handleOpenQuitarModal(practicante)}
              />
            ))
          ) : (
            <p>No se encontraron practicantes.</p>
          )}
        </section>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmarQuitar}
        title="Quitar Practicante"
        confirmText="Quitar"
        confirmVariant="danger"
      >
        ¿Está seguro que desea desvincular a{' '}
        <strong>
          {practicanteSeleccionado?.firstName} {practicanteSeleccionado?.lastName}
        </strong>{' '}
        de su cargo?
      </ConfirmModal>
    </div>
  );
};

export default ListaPracticantes;