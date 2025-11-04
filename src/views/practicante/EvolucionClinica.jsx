import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './practicante.css';
import {
  FiChevronLeft,
  FiUser,
  FiBriefcase,
  FiPlus,
  FiFileText,
  FiLoader,
} from 'react-icons/fi';
import { useAtencionStore } from '../../context/atencionStore';
import DataItem from '../../components/DataItem/DataItem';
import AgregarEvolucionModal from '../../components/AgregarEvolucionModal/AgregarEvolucionModal';

const EvolucionClinica = () => {
  const { attentionId } = useParams();
  const {
    currentAttention,
    progressNotes,
    status,
    error,
    fetchAttentionDetails,
  } = useAtencionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (attentionId) {
      fetchAttentionDetails(attentionId);
    }
  }, [attentionId, fetchAttentionDetails]);

  if (status === 'loading' && !currentAttention) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <FiLoader className="loading-icon" />
          <p>Cargando evolución...</p>
        </div>
      </div>
    );
  }

  if (status === 'error' && !currentAttention) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error || 'No se pudo cargar la atención.'}</p>
        </div>
      </div>
    );
  }

  if (!currentAttention) {
    return (
      <div className="page-container">
        <p>No se ha encontrado la atención.</p>
      </div>
    );
  }
  
  const getProximoTurno = () => {
    const proximo = currentAttention.appointments
      .filter(a => a.status === 'SCHEDULED')
      .sort((a,b) => new Date(a.appointmentTime) - new Date(b.appointmentTime))[0];
    
    if (proximo) {
      const d = new Date(proximo.appointmentTime);
      return `${d.toLocaleDateString()} - ${d.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`;
    }
    return 'N/A';
  }

  return (
    <>
      <div className="page-container">
        <div className="practicante-content-container">
          <header className="page-header">
            <Link to="/practicante/pacientes" className="page-back-link">
              <FiChevronLeft />
              Volver a Pacientes
            </Link>
            <h1>Evolución Clínica</h1>
          </header>

          <div className="evolucion-layout">
            <aside className="evolucion-sidebar">
              <div className="info-card">
                <h2 className="info-card-header">
                  <FiUser />
                  Datos del Paciente
                </h2>
                <div className="info-card-content">
                  <DataItem label="Nombre completo" value={currentAttention.patientName} />
                </div>
              </div>

              <div className="info-card">
                <h2 className="info-card-header">
                  <FiBriefcase />
                  Tratamiento Actual
                </h2>
                <div className="info-card-content">
                  <DataItem label="Tratamiento" value={currentAttention.treatmentName} />
                  <DataItem label="Inicio" value={currentAttention.startDate} />
                  <DataItem label="Próximo turno" value={getProximoTurno()} />
                  <span className="tag-en-progreso">{currentAttention.status}</span>
                </div>
              </div>
            </aside>

            <main className="evolucion-main">
              <div className="nueva-evolucion-card">
                <h3>Nueva Evolución</h3>
                <Button 
                  variant="success" 
                  icon={<FiPlus />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Agregar
                </Button>
              </div>

              <div className="historial-evoluciones-card">
                <h2 className="info-card-header">
                  <FiFileText />
                  Historial de Evoluciones ({progressNotes.length})
                </h2>
                <p className="historial-subtitulo">
                  Registro cronológico de todas las atenciones
                </p>

                <div className="historial-list">
                  {progressNotes.map((note) => (
                    <div key={note.id} className="evolucion-item">
                      <div className="evolucion-item-badge">
                        <span>{note.authorName.charAt(0)}</span>
                      </div>
                      <div className="evolucion-item-content">
                        <div className="evolucion-item-header">
                          <span className="fecha">
                            {new Date(note.createdAt).toLocaleDateString()}
                            <span className="hora">{new Date(note.createdAt).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}</span>
                          </span>
                          <span className="practicante">{note.authorName}</span>
                        </div>
                        <p className="evolucion-item-body">{note.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <AgregarEvolucionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        attentionId={currentAttention.id}
      />
    </>
  );
};

export default EvolucionClinica;