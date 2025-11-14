import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './practicante.css';
import { 
  FiChevronLeft, 
  FiSearch, 
  FiChevronRight, 
  FiLoader,
  FiChevronDown,
  FiUser,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import { useAtencionStore } from '../../context/atencionStore';

const ListaAtenciones = () => {
  const navigate = useNavigate();
  const { attentions, status, error, fetchPractitionerAttentions } = useAtencionStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPatients, setExpandedPatients] = useState(new Set());

  useEffect(() => {
    fetchPractitionerAttentions();
  }, [fetchPractitionerAttentions]);

  // Agrupar atenciones por paciente
  const groupedPatients = useMemo(() => {
    const grouped = {};
    
    attentions.forEach((atencion) => {
      const patientKey = atencion.patientName;
      if (!grouped[patientKey]) {
        grouped[patientKey] = {
          patientName: atencion.patientName,
          attentions: []
        };
      }
      grouped[patientKey].attentions.push(atencion);
    });

    // Ordenar atenciones por fecha (más recientes primero)
    Object.values(grouped).forEach(patient => {
      patient.attentions.sort((a, b) => 
        new Date(b.startDate) - new Date(a.startDate)
      );
    });

    return Object.values(grouped);
  }, [attentions]);

  // Filtrar pacientes por término de búsqueda
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return groupedPatients;
    
    const lowerSearch = searchTerm.toLowerCase();
    return groupedPatients.filter(patient => 
      patient.patientName.toLowerCase().includes(lowerSearch)
    );
  }, [groupedPatients, searchTerm]);

  const togglePatient = (patientName) => {
    setExpandedPatients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(patientName)) {
        newSet.delete(patientName);
      } else {
        newSet.add(patientName);
      }
      return newSet;
    });
  };

  const handleSelectAtencion = (attentionId) => {
    navigate(`/practicante/evolucion/${attentionId}`);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'COMPLETED':
        return { icon: <FiCheckCircle />, label: 'Completada', className: 'status-completed' };
      case 'IN_PROGRESS':
        return { icon: <FiClock />, label: 'En Progreso', className: 'status-in-progress' };
      case 'PENDING':
        return { icon: <FiAlertCircle />, label: 'Pendiente', className: 'status-pending' };
      default:
        return { icon: <FiClock />, label: status, className: 'status-default' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    // Usar la fecha directamente sin conversión de zona horaria
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="page-container-user">
      <div className="practicante-content-container">
        <header className="page-header">
          <Link to="/practicante/dashboard" className="page-back-link">
            <FiChevronLeft />
            Volver
          </Link>
          <h1>Mis Pacientes</h1>
        </header>

        <div className="patients-summary">
          <div className="summary-item">
            <FiUser className="summary-icon" />
            <div className="summary-content">
              <span className="summary-number">{filteredPatients.length}</span>
              <span className="summary-label">Pacientes</span>
            </div>
          </div>
          <div className="summary-item">
            <FiFileText className="summary-icon" />
            <div className="summary-content">
              <span className="summary-number">{attentions.length}</span>
              <span className="summary-label">Atenciones Totales</span>
            </div>
          </div>
        </div>

        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar paciente por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <section className="patients-accordion-container">
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
          
          {status === 'success' && filteredPatients.length === 0 && (
            <div className="empty-state">
              <FiUser className="empty-icon" />
              <p className="empty-message">
                {searchTerm ? 'No se encontraron pacientes con ese nombre' : 'No tienes pacientes asignados aún'}
              </p>
            </div>
          )}

          {status === 'success' && filteredPatients.map((patient) => {
            const isExpanded = expandedPatients.has(patient.patientName);
            
            return (
              <div key={patient.patientName} className="patient-accordion-item">
                <button
                  className="patient-accordion-header"
                  onClick={() => togglePatient(patient.patientName)}
                  aria-expanded={isExpanded}
                >
                  <div className="patient-header-content">
                    <div className="patient-header-main">
                      <div className="patient-name-wrapper">
                        <FiUser className="patient-icon" />
                        <h3 className="patient-name">{patient.patientName}</h3>
                      </div>
                      <span className="attentions-count">
                        {patient.attentions.length} {patient.attentions.length === 1 ? 'atención' : 'atenciones'}
                      </span>
                    </div>
                  </div>
                  <FiChevronDown className={`accordion-icon ${isExpanded ? 'rotated' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="patient-accordion-content">
                    <div className="attentions-list">
                      {patient.attentions.map((atencion, index) => {
                        const statusInfo = getStatusInfo(atencion.status);
                        
                        return (
                          <div key={atencion.id} className="attention-card">
                            <div className="attention-header">
                              <div className="attention-number">
                                Atención #{patient.attentions.length - index}
                              </div>
                              <div className={`attention-status ${statusInfo.className}`}>
                                {statusInfo.icon}
                                <span>{statusInfo.label}</span>
                              </div>
                            </div>

                            <div className="attention-details">
                              <div className="attention-detail-row">
                                <FiFileText className="detail-icon" />
                                <div className="detail-content">
                                  <span className="detail-label">Tratamiento</span>
                                  <span className="detail-value">{atencion.treatmentName}</span>
                                </div>
                              </div>

                              <div className="attention-detail-row">
                                <FiCalendar className="detail-icon" />
                                <div className="detail-content">
                                  <span className="detail-label">Fecha de Inicio</span>
                                  <span className="detail-value">{formatDate(atencion.startDate)}</span>
                                </div>
                              </div>
                            </div>

                            <button
                              className="attention-action-btn"
                              onClick={() => handleSelectAtencion(atencion.id)}
                            >
                              <span>Ver Evolución Clínica</span>
                              <FiChevronRight />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default ListaAtenciones;