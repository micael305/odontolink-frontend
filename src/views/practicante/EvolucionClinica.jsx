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
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';
import { useAtencionStore } from '../../context/atencionStore';
import { useTurnoStore } from '../../context/turnoStore';
import DataItem from '../../components/DataItem/DataItem';
import AgregarEvolucionModal from '../../components/AgregarEvolucionModal/AgregarEvolucionModal';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import { formatLocalDate } from '../../utils/dateUtils';

const EvolucionClinica = () => {
  const { attentionId } = useParams();
  const {
    currentAttention,
    progressNotes,
    status,
    error,
    fetchAttentionDetails,
    finalizeAttention,
  } = useAtencionStore();

  const {
    completeTurno,
    markNoShow,
  } = useTurnoStore();

  const [isNotaModalOpen, setIsNotaModalOpen] = useState(false);
  const [isFinalizarModalOpen, setIsFinalizarModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (attentionId) {
      fetchAttentionDetails(attentionId);
    }
  }, [attentionId, fetchAttentionDetails]);

  if (status === 'loading' && !currentAttention) {
    return (
      <div className="page-container-user">
        <div className="loading-container">
          <FiLoader className="loading-icon" />
          <p>Cargando evolución...</p>
        </div>
      </div>
    );
  }

  if (status === 'error' && !currentAttention) {
    return (
      <div className="page-container-user">
        <div className="error-container">
          <p>{error || 'No se pudo cargar la atención.'}</p>
        </div>
      </div>
    );
  }

  if (!currentAttention) {
    return (
      <div className="page-container-user">
        <p>No se ha encontrado la atención.</p>
      </div>
    );
  }
  
  const handleConfirmarFinalizar = async () => {
    try {
      await finalizeAttention(currentAttention.id);
      setIsFinalizarModalOpen(false);
    } catch (err) {
      console.error(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  const getProximoTurno = () => {
    const proximo = currentAttention.appointments
      .filter(a => a.status === 'SCHEDULED')
      .sort((a,b) => new Date(a.appointmentTime) - new Date(b.appointmentTime))[0];
    
    if (proximo) {
      const d = new Date(proximo.appointmentTime);
      return {
        texto: `${d.toLocaleDateString()} - ${d.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}`,
        id: proximo.id
      };
    }
    return { texto: 'N/A', id: null };
  }

  const proximoTurno = getProximoTurno();

  const handleCompletar = async () => {
    if (!proximoTurno.id) return;
    
    setIsLoading(true);
    try {
      await completeTurno(proximoTurno.id);
      // Recargar los detalles de la atención para actualizar el estado
      await fetchAttentionDetails(attentionId);
      alert('Turno marcado como completado exitosamente');
    } catch (err) {
      console.error('Error al completar turno:', err);
      alert(`Error: ${err.message || 'No se pudo completar el turno'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNoAsistio = async () => {
    if (!proximoTurno.id) return;
    
    setIsLoading(true);
    try {
      await markNoShow(proximoTurno.id);
      // Recargar los detalles de la atención para actualizar el estado
      await fetchAttentionDetails(attentionId);
      alert('Turno marcado como no asistió');
    } catch (err) {
      console.error('Error al marcar no asistió:', err);
      alert(`Error: ${err.message || 'No se pudo marcar como no asistió'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isCompleted = currentAttention.status === 'COMPLETED';

  return (
    <>
      <div className="page-container-user">
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
                  <DataItem label="Inicio" value={formatLocalDate(currentAttention.startDate)} />
                  <DataItem label="Próximo turno" value={proximoTurno.texto} />
                  <span className={`tag-status ${isCompleted ? 'completado' : 'en-progreso'}`}>
                    {isCompleted ? 'Completado' : 'En Progreso'}
                  </span>
                  
                  {!isCompleted && proximoTurno.id && (
                    <div className="turno-actions">
                      <Button
                        variant="outline-danger"
                        icon={<FiXCircle />}
                        onClick={handleNoAsistio}
                        disabled={isLoading}
                      >
                        No Asistió
                      </Button>
                      <Button
                        variant="success"
                        icon={<FiCheckCircle />}
                        onClick={handleCompletar}
                        disabled={isLoading}
                      >
                        Completar Turno
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {!isCompleted && (
                <Button
                  variant="success"
                  icon={<FiCheckCircle />}
                  onClick={() => setIsFinalizarModalOpen(true)}
                >
                  Finalizar Atención
                </Button>
              )}
            </aside>

            <main className="evolucion-main">
              {!isCompleted && (
                <div className="nueva-evolucion-card">
                  <h3>Nueva Evolución</h3>
                  <Button 
                    variant="success" 
                    icon={<FiPlus />}
                    onClick={() => setIsNotaModalOpen(true)}
                  >
                    Agregar
                  </Button>
                </div>
              )}

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
        isOpen={isNotaModalOpen}
        onClose={() => setIsNotaModalOpen(false)}
        attentionId={currentAttention.id}
      />

      <ConfirmModal
        isOpen={isFinalizarModalOpen}
        onClose={() => setIsFinalizarModalOpen(false)}
        onConfirm={handleConfirmarFinalizar}
        title="Finalizar Atención"
        confirmText="Finalizar"
        confirmVariant="success"
        warningText="Esta acción marcará la atención como completada y habilitará el feedback. No podrá agregar más notas de evolución."
      >
        ¿Está seguro que desea finalizar esta atención?
      </ConfirmModal>
    </>
  );
};

export default EvolucionClinica;