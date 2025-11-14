import { useState, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import './agregarTratamientoModal.css';
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiInfo,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from 'react-icons/fi';

// --- Constantes y Configuración ---
const DIAS_SEMANA_MAP = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

const STEPS = [
  { id: 1, title: 'Tratamiento' },
  { id: 2, title: 'Reglas de la Oferta' },
  { id: 3, title: 'Horarios' },
  { id: 4, title: 'Indicaciones' },
];

// --- Componente Principal ---
const AgregarTratamientoModal = ({
  isOpen,
  onClose,
  masterTreatments,
  onSubmit,
}) => {
  // --- Estados ---
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isInitialRender, setIsInitialRender] = useState(true); // Para controlar animación inicial
  
  // Ref para detectar clics fuera del modal
  const modalContentRef = useRef(null);

  // Estados del formulario
  const [treatmentId, setTreatmentId] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState(30);
  const [requirements, setRequirements] = useState('');
  const [slots, setSlots] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState('');
  const [patientQuota, setPatientQuota] = useState(10);
  const [currentDay, setCurrentDay] = useState('MONDAY');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');
  
  // Estados de validación por campo
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  // --- Efectos y Ciclo de Vida ---
  useEffect(() => {
    if (!isOpen) {
      // Reset all states when modal closes
      setCurrentStep(1);
      setTreatmentId('');
      setDurationInMinutes(30);
      setRequirements('');
      setSlots([]);
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
      setPatientQuota(10);
      setFieldErrors({});
      setTouched({});
      setIsInitialRender(true);
    }
  }, [isOpen]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      // Guardar el overflow original del body
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Calcular el ancho de la barra de scroll para evitar saltos
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Bloquear scroll y compensar el ancho de la barra de scroll
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Restaurar al desmontar o cuando el modal se cierre
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // --- Navegación y Validación por Pasos ---
  const nextStep = () => {
    if (validateStep()) {
      setDirection(1);
      setIsInitialRender(false);
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    // Limpiar errores del paso actual al retroceder
    const newErrors = { ...fieldErrors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`step${currentStep}_`)) {
        delete newErrors[key];
      }
    });
    setFieldErrors(newErrors);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const validateStep = () => {
    const errors = {};
    
    switch (currentStep) {
      case 1:
        if (!treatmentId) {
          errors.step1_treatment = 'Selecciona un tratamiento para continuar';
        }
        break;
      case 2:
        if (!patientQuota || patientQuota < 1) {
          errors.step2_quota = 'Indica cuántos pacientes atenderás';
        }
        if (!durationInMinutes || durationInMinutes < 15) {
          errors.step2_duration = 'La duración mínima es 15 minutos';
        }
        if (!startDate) {
          errors.step2_startDate = 'Selecciona la fecha de inicio';
        }
        if (!endDate) {
          errors.step2_endDate = 'Selecciona la fecha de finalización';
        }
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
          errors.step2_endDate = 'La fecha de fin debe ser posterior al inicio';
        }
        break;
      case 3:
        if (slots.length === 0) {
          errors.step3_slots = 'Añade al menos un horario de atención';
        }
        break;
      default:
        break;
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- Validación en tiempo real ---
  const handleFieldBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  const clearFieldError = (fieldName) => {
    if (fieldErrors[fieldName]) {
      const newErrors = { ...fieldErrors };
      delete newErrors[fieldName];
      setFieldErrors(newErrors);
    }
  };

  // --- Lógica de Horarios ---
  const handleAddSlot = () => {
    if (!currentDay || !startTime || !endTime) return;
    if (startTime >= endTime) {
      setFieldErrors({ ...fieldErrors, step3_timeRange: 'La hora de inicio debe ser anterior a la de fin' });
      return;
    }
    clearFieldError('step3_timeRange');
    clearFieldError('step3_slots');
    const newSlot = {
      dayOfWeek: currentDay,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
    };
    setSlots([...slots, newSlot]);
  };

  const handleRemoveSlot = (index) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  // --- Envío Final ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const dataToSubmit = {
      treatmentId: parseInt(treatmentId, 10),
      durationInMinutes: parseInt(durationInMinutes, 10),
      requirements: requirements || undefined,
      availabilitySlots: slots,
      offerStartDate: startDate,
      offerEndDate: endDate,
      maxCompletedAttentions: parseInt(patientQuota, 10),
    };

    try {
      await onSubmit(dataToSubmit);
      onClose();
    } catch (err) {
      // Error de servidor - mostrar en un toast o notificación
      console.error('Error al crear oferta:', err);
      setFieldErrors({ 
        ...fieldErrors, 
        submit: err.message || 'Error al crear la oferta. Intenta nuevamente.' 
      });
    }
  };

  // Manejar clics fuera del modal
  const handleOverlayMouseDown = (e) => {
    // Solo cerrar si el mousedown fue directamente en el overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // --- Renderizado ---
  return (
    <div className="modal-overlay" onMouseDown={handleOverlayMouseDown}>
      <div className="modal-content" ref={modalContentRef}>
        <div className="modal-header">
          <div>
            <h2>Nueva Oferta</h2>
            <p>
              Completa los siguientes pasos para configurar tu nueva oferta.
            </p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <FiX />
          </button>
        </div>

        {/* --- Indicador de Pasos (Stepper Desktop) --- */}
        <div className="stepper">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`step-item ${currentStep > step.id ? 'completed' : ''} ${
                currentStep === step.id ? 'active' : ''
              }`}
            >
              <div className="step-connector-wrapper">
                {index > 0 && <div className="step-connector" />}
              </div>
              <div className="step-icon">
                {currentStep > step.id ? <FiCheck /> : step.id}
              </div>
              <p className="step-title">{step.title}</p>
            </div>
          ))}
        </div>

        {/* --- Indicador de Progreso Móvil --- */}
        <div className="mobile-step-indicator">
          Paso {currentStep} de {STEPS.length}: {STEPS[currentStep - 1].title}
        </div>
        <div className="mobile-progress-bar">
          <div 
            className="mobile-progress-fill" 
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>

        {/* --- Cuerpo del Modal con Pasos Animados --- */}
        <div className="modal-body">
          <form
            className={`step-form ${isInitialRender ? 'no-initial-animation' : ''}`}
            onSubmit={handleSubmit}
            style={{ '--direction': direction }}
          >
            {/* --- PASO 1: Elige el tratamiento --- */}
            {currentStep === 1 && (
              <div className="form-step active">
                <div className={`modal-form-group ${fieldErrors.step1_treatment ? 'has-error' : ''}`}>
                  <label htmlFor="tratamiento">Tratamiento *</label>
                  <select
                    id="tratamiento"
                    value={treatmentId}
                    onChange={(e) => {
                      setTreatmentId(e.target.value);
                      clearFieldError('step1_treatment');
                    }}
                    onBlur={() => handleFieldBlur('step1_treatment')}
                    className={fieldErrors.step1_treatment ? 'input-error' : ''}
                  >
                    <option value="" disabled>
                      Selecciona un tratamiento de la lista
                    </option>
                    {masterTreatments.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.area})
                      </option>
                    ))}
                  </select>
                  {fieldErrors.step1_treatment ? (
                    <p className="form-error-text">
                      <FiInfo /> {fieldErrors.step1_treatment}
                    </p>
                  ) : (
                    <p className="form-helper-text">
                      <FiInfo /> Elige el procedimiento que vas a ofrecer.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* --- PASO 2: Define las reglas de tu oferta --- */}
            {currentStep === 2 && (
              <div className="form-step active">
                <div className="grid-col-2">
                  <div className={`modal-form-group ${fieldErrors.step2_quota ? 'has-error' : ''}`}>
                    <label htmlFor="patientQuota">Cupo de Pacientes *</label>
                    <input
                      type="number"
                      id="patientQuota"
                      value={patientQuota}
                      onChange={(e) => {
                        setPatientQuota(e.target.value);
                        clearFieldError('step2_quota');
                      }}
                      onBlur={() => handleFieldBlur('step2_quota')}
                      min="1"
                      className={fieldErrors.step2_quota ? 'input-error' : ''}
                    />
                    {fieldErrors.step2_quota ? (
                      <p className="form-error-text">
                        <FiInfo /> {fieldErrors.step2_quota}
                      </p>
                    ) : (
                      <p className="form-helper-text">
                        <FiInfo /> Nº de atenciones a completar.
                      </p>
                    )}
                  </div>
                  <div className={`modal-form-group ${fieldErrors.step2_duration ? 'has-error' : ''}`}>
                    <label htmlFor="durationInMinutes">
                      Duración (minutos) *
                    </label>
                    <input
                      type="number"
                      id="durationInMinutes"
                      value={durationInMinutes}
                      onChange={(e) => {
                        setDurationInMinutes(e.target.value);
                        clearFieldError('step2_duration');
                      }}
                      onBlur={() => handleFieldBlur('step2_duration')}
                      min="15"
                      step="15"
                      className={fieldErrors.step2_duration ? 'input-error' : ''}
                    />
                    {fieldErrors.step2_duration ? (
                      <p className="form-error-text">
                        <FiInfo /> {fieldErrors.step2_duration}
                      </p>
                    ) : (
                      <p className="form-helper-text">
                        <FiInfo /> Tiempo por atención.
                      </p>
                    )}
                  </div>
                </div>
                <div className={`modal-form-group ${fieldErrors.step2_startDate || fieldErrors.step2_endDate ? 'has-error' : ''}`}>
                  <label>Período de la oferta *</label>
                  <div className="date-range-group">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        clearFieldError('step2_startDate');
                        clearFieldError('step2_endDate');
                      }}
                      onBlur={() => handleFieldBlur('step2_startDate')}
                      min={new Date().toISOString().split('T')[0]}
                      className={fieldErrors.step2_startDate ? 'input-error' : ''}
                    />
                    <span>hasta</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        clearFieldError('step2_endDate');
                      }}
                      onBlur={() => handleFieldBlur('step2_endDate')}
                      min={startDate}
                      className={fieldErrors.step2_endDate ? 'input-error' : ''}
                    />
                  </div>
                  {(fieldErrors.step2_startDate || fieldErrors.step2_endDate) ? (
                    <p className="form-error-text">
                      <FiInfo /> {fieldErrors.step2_startDate || fieldErrors.step2_endDate}
                    </p>
                  ) : (
                    <p className="form-helper-text">
                      <FiInfo /> Los turnos se ofrecerán solo dentro de este rango.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* --- PASO 3: Configura tus horarios semanales --- */}
            {currentStep === 3 && (
              <div className="form-step active">
                <div className={`modal-form-group ${fieldErrors.step3_timeRange ? 'has-error' : ''}`}>
                  <label>Añadir un bloque de horario *</label>
                  <div className="slot-input-group">
                    <select
                      value={currentDay}
                      onChange={(e) => setCurrentDay(e.target.value)}
                    >
                      {Object.keys(DIAS_SEMANA_MAP).map((diaKey) => (
                        <option key={diaKey} value={diaKey}>
                          {DIAS_SEMANA_MAP[diaKey]}
                        </option>
                      ))}
                    </select>
                    <div className="slot-time-range">
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value);
                          clearFieldError('step3_timeRange');
                        }}
                        step="1800"
                        className={fieldErrors.step3_timeRange ? 'input-error' : ''}
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => {
                          setEndTime(e.target.value);
                          clearFieldError('step3_timeRange');
                        }}
                        step="1800"
                        className={fieldErrors.step3_timeRange ? 'input-error' : ''}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline-secondary"
                      className="modal-add-btn"
                      icon={<FiPlus />}
                      onClick={handleAddSlot}
                      aria-label="Añadir horario"
                    />
                  </div>
                  {fieldErrors.step3_timeRange && (
                    <p className="form-error-text">
                      <FiInfo /> {fieldErrors.step3_timeRange}
                    </p>
                  )}
                </div>
                <div className={`slot-list-container ${fieldErrors.step3_slots ? 'has-error' : ''}`}>
                  <div className="slot-list">
                    {slots.length === 0 ? (
                      <p className="slot-list-empty">
                        Añade los días y horas en que atenderás.
                      </p>
                    ) : (
                      slots.map((slot, index) => (
                        <div key={index} className="slot-item">
                          <span>
                            <strong>{DIAS_SEMANA_MAP[slot.dayOfWeek]}:</strong>{' '}
                            {slot.startTime.substring(0, 5)} -{' '}
                            {slot.endTime.substring(0, 5)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSlot(index)}
                            className="slot-remove-btn"
                            aria-label="Eliminar horario"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  {fieldErrors.step3_slots && (
                    <p className="form-error-text">
                      <FiInfo /> {fieldErrors.step3_slots}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* --- PASO 4 (Opcional): Indicaciones para el paciente --- */}
            {currentStep === 4 && (
              <div className="form-step active">
                <div className="modal-form-group">
                  <label htmlFor="requirements">
                    Requerimientos especiales (opcional)
                  </label>
                  <textarea
                    id="requirements"
                    className="modal-textarea"
                    placeholder="Ej: El paciente debe venir con un acompañante, no requiere ayuno, etc."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                  />
                  <p className="form-helper-text">
                    <FiInfo /> Estas indicaciones las verá el paciente antes de
                    reservar el turno.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* --- Footer con Navegación --- */}
        <div className="modal-footer">
          <Button
            variant="secondary"
            onClick={prevStep}
            disabled={currentStep === 1}
            aria-label="Paso anterior"
          >
            <FiChevronLeft /> <span className="btn-text-desktop">Anterior</span><span className="btn-text-mobile">Atrás</span>
          </Button>

          {currentStep < STEPS.length ? (
            <Button variant="primary" onClick={nextStep} aria-label="Siguiente paso">
              <span className="btn-text-desktop">Siguiente</span><span className="btn-text-mobile">Continuar</span> <FiChevronRight />
            </Button>
          ) : (
            <Button variant="success" onClick={handleSubmit} aria-label="Crear oferta de tratamiento">
              <FiCheck /> Crear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgregarTratamientoModal;