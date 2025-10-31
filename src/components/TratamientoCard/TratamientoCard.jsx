import Button from '../Button/Button';
import {
  FiCalendar,
  FiClock,
  FiAlertTriangle,
  FiEdit3,
  FiTrash2,
} from 'react-icons/fi';
import './TratamientoCard.css';

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
  } = tratamiento;

  return (
    <div className="treatment-card">
      <div className="treatment-card-content">
        <div className="card-header">
          <h3 className="card-header-title">{titulo}</h3>
          <div className="card-header-pills">
            {tags?.map((tag) => (
              <span key={tag.texto} className={`card-tag ${tag.tipo}`}>
                {tag.texto}
              </span>
            ))}
          </div>
        </div>

        <div className="card-section">
          <h4 className="card-section-title">
            <FiCalendar />
            Disponibilidad:
          </h4>
          <div className="card-pills-list">
            {disponibilidad?.map((dia) => (
              <span key={dia} className="card-pill">
                {dia}
              </span>
            ))}
          </div>
        </div>

        <div className="card-section">
          <h4 className="card-section-title">
            <FiClock />
            Horarios:
          </h4>
          <div className="card-pills-list">
            {horarios?.map((hora) => (
              <span key={hora} className="card-pill">
                {hora}
              </span>
            ))}
          </div>
        </div>

        <div className="card-section">
          <h4 className="card-section-title">
            <FiAlertTriangle className="danger" />
            Requerimientos:
          </h4>
          <p className="card-text">{requerimientos}</p>
        </div>
      </div>

      <footer className="card-footer-actions">
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
      </footer>
    </div>
  );
};

export default TratamientoCard;