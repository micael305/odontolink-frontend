import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './modificarTratamientoModal.css';
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

const ModificarTratamientoModal = ({
  isOpen,
  onClose,
  tratamiento,
  onSubmit,
}) => {
  const [durationInMinutes, setDurationInMinutes] = useState(45);
  const [requirements, setRequirements] = useState('');
  const [slots, setSlots] = useState([]);
  const [offerStartDate, setOfferStartDate] = useState('');
  const [offerEndDate, setOfferEndDate] = useState('');
  const [maxCompletedAttentions, setMaxCompletedAttentions] = useState(10);
  const [currentDay, setCurrentDay] = useState('MONDAY');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tratamiento) {
      setDurationInMinutes(tratamiento.durationInMinutes);
      setRequirements(tratamiento.requirements || '');
      setSlots(tratamiento.availabilitySlots || []);
      setOfferStartDate(tratamiento.offerStartDate || '');
      setOfferEndDate(tratamiento.offerEndDate || '');
      setMaxCompletedAttentions(tratamiento.maxCompletedAttentions || 10);
    }
  }, [tratamiento]);

  if (!isOpen || !tratamiento) {
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

    if (slots.length === 0 || !durationInMinutes) {
      setError('Duración y al menos un slot son requeridos.');
      return;
    }

    if (!offerStartDate || !offerEndDate) {
      setError('Las fechas de inicio y fin de la oferta son requeridas.');
      return;
    }

    if (new Date(offerStartDate) > new Date(offerEndDate)) {
      setError('La fecha de inicio no puede ser posterior a la de fin.');
      return;
    }

    const dataToSubmit = {
      durationInMinutes: parseInt(durationInMinutes, 10),
      requirements: requirements || undefined,
      availabilitySlots: slots.map(({ dayOfWeek, startTime, endTime }) => ({
        dayOfWeek,
        startTime,
        endTime,
      })),
      offerStartDate,
      offerEndDate,
      maxCompletedAttentions: parseInt(maxCompletedAttentions, 10),
    };

    try {
      await onSubmit(tratamiento.id, dataToSubmit);
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
            <h2>Modificar Tratamiento</h2>
            <p>{tratamiento.treatment.name}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-form-group">
            <label htmlFor="maxCompletedAttentions">Cupo de Pacientes *</label>
            <input
              type="number"
              id="maxCompletedAttentions"
              value={maxCompletedAttentions}
              onChange={(e) => setMaxCompletedAttentions(e.target.value)}
              min="1"
              placeholder="Ej: 10"
            />
          </div>

          <div className="modal-form-group">
            <label htmlFor="durationInMinutes">Duración (en minutos) *</label>
            <input
              type="number"
              id="durationInMinutes"
              value={durationInMinutes}
              onChange={(e) => setDurationInMinutes(e.target.value)}
              min="15"
              step="15"
              placeholder="Ej: 45"
            />
          </div>

          <div className="modal-form-group">
            <label>Período de la oferta *</label>
            <div className="date-range-group">
              <input
                type="date"
                value={offerStartDate}
                onChange={(e) => setOfferStartDate(e.target.value)}
                required
              />
              <span>hasta</span>
              <input
                type="date"
                value={offerEndDate}
                onChange={(e) => setOfferEndDate(e.target.value)}
                min={offerStartDate}
                required
              />
            </div>
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
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModificarTratamientoModal;