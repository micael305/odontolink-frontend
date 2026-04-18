import Button from '../Button/Button';
import {
  FiCalendar,
  FiClock,
  FiAlertCircle,
  FiEdit3,
  FiTrash2,
  FiTarget,
} from 'react-icons/fi';
import './tratamientoCard.css';

const TratamientoCard = ({
  tratamiento,
  onModificar,
  onEliminar,
}) => {
  const {
    titulo,
    tags,
    disponibilidad,
    horarios,
    requerimientos,
    cupo,
    fechaInicio,
    fechaFin,
  } = tratamiento;

  return (
    <article className="treatment-card">
      {/* Encabezado con título y metadatos */}
      <div className="treatment-card-header">
        <div className="treatment-header-content">
          <h3 className="treatment-title">{titulo}</h3>
          <div className="treatment-tags">
            {tags?.map((tag) => (
              <span key={tag.texto} className={`treatment-tag tag-${tag.tipo}`}>
                {tag.texto}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cuerpo con información organizada */}
      <div className="treatment-card-body">
        {/* Grid de información principal */}
        <div className="treatment-info-grid">
          {/* Disponibilidad y Horarios */}
          <div className="treatment-info-block">
            <div className="info-block-header">
              <FiCalendar className="info-icon" />
              <span className="info-label">Disponibilidad</span>
            </div>
            <div className="info-block-content">
              <div className="days-list">
                {disponibilidad?.map((dia) => (
                  <span key={dia} className="day-chip">
                    {dia}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="treatment-info-block">
            <div className="info-block-header">
              <FiClock className="info-icon" />
              <span className="info-label">Horarios</span>
            </div>
            <div className="info-block-content">
              <div className="time-slots-list">
                {horarios?.map((hora, idx) => (
                  <span key={idx} className="time-slot">
                    {hora}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Período y Cupo */}
          <div className="treatment-info-block">
            <div className="info-block-header">
              <FiCalendar className="info-icon" />
              <span className="info-label">Período de oferta</span>
            </div>
            <div className="info-block-content">
              <p className="period-text">{fechaInicio} — {fechaFin}</p>
            </div>
          </div>

          <div className="treatment-info-block">
            <div className="info-block-header">
              <FiTarget className="info-icon" />
              <span className="info-label">Cupo máximo</span>
            </div>
            <div className="info-block-content">
              <p className="cupo-value">{cupo} atenciones</p>
            </div>
          </div>
        </div>

        {/* Requerimientos en sección destacada */}
        {requerimientos && requerimientos !== 'No se especificaron requerimientos.' && (
          <div className="treatment-requirements">
            <div className="requirements-header">
              <FiAlertCircle className="requirements-icon" />
              <span className="requirements-label">Requerimientos</span>
            </div>
            <p className="requirements-text">{requerimientos}</p>
          </div>
        )}
      </div>

      {/* Footer con acciones */}
      <div className="treatment-card-footer">
        <Button
          variant="outline-secondary"
          icon={<FiEdit3 />}
          onClick={onModificar}
        >
          Modificar
        </Button>
        <Button
          variant="outline-danger"
          icon={<FiTrash2 />}
          onClick={onEliminar}
        >
          Eliminar
        </Button>
      </div>
    </article>
  );
};

export default TratamientoCard;