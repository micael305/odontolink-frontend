import { useState } from 'react';
import Button from '../Button/Button';
import './agregarTratamientoModal.css';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';

const DIAS_SEMANA_MAP = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

const AgregarTratamientoModal = ({
  isOpen,
  onClose,
  masterTreatments,
  onSubmit,
}) => {
  const [treatmentId, setTreatmentId] = useState('');
  const [durationInMinutes, setDurationInMinutes] = useState(45);
  const [requirements, setRequirements] = useState('');
  const [slots, setSlots] = useState([]);
  const [currentDay, setCurrentDay] = useState('MONDAY');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');
  const [error, setError] = useState(null);

  if (!isOpen) {
    return null;
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleAddSlot = () => {
    if (!currentDay || !startTime || !endTime) return;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!treatmentId || slots.length === 0 || !durationInMinutes) {
      setError('Tratamiento, duración y al menos un slot son requeridos.');
      return;
    }

    const dataToSubmit = {
      treatmentId: parseInt(treatmentId, 10),
      durationInMinutes: parseInt(durationInMinutes, 10),
      requirements,
      availabilitySlots: slots,
    };

    try {
      await onSubmit(dataToSubmit);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleStopPropagation}>
        <div className="modal-header">
          <div>
            <h2>Agregar Tratamiento</h2>
            <p>Seleccione un tratamiento y configure sus detalles</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-form-group">
            <label htmlFor="tratamiento">Tratamiento *</label>
            <select
              id="tratamiento"
              value={treatmentId}
              onChange={(e) => setTreatmentId(e.target.value)}
            >
              <option value="" disabled>
                Seleccione un tratamiento...
              </option>
              {masterTreatments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.area})
                </option>
              ))}
            </select>
          </div>

          <div className="modal-form-group">
            <label htmlFor="durationInMinutes">Duración (en minutos) *</label>
            <input
              type="number"
              id="durationInMinutes"
              value={durationInMinutes}
              onChange={(e) => setDurationInMinutes(e.target.value)}
              placeholder="Ej: 45"
            />
          </div>

          <div className="modal-form-group">
            <label>Slots de Disponibilidad *</label>
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
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                step="1800"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                step="1800"
              />
              <Button
                type="button"
                variant="outline-secondary"
                className="modal-add-btn"
                icon={<FiPlus />}
                onClick={handleAddSlot}
              />
            </div>
            <div className="slot-list">
              {slots.map((slot, index) => (
                <div key={index} className="slot-item">
                  <span>
                    {DIAS_SEMANA_MAP[slot.dayOfWeek]}: {slot.startTime} - {slot.endTime}
                  </span>
                  <button type="button" onClick={() => handleRemoveSlot(index)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-form-group">
            <label htmlFor="requirements">Requerimientos (opcional)</label>
            <textarea
              id="requirements"
              className="modal-textarea"
              placeholder="Ej: Paciente debe venir en ayunas"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          {error && <p className="modal-error-msg">{error}</p>}
          <Button variant="outline-secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgregarTratamientoModal;