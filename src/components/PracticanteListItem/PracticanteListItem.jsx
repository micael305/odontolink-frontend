import Button from '../Button/Button';
import './practicanteListItem.css';
import {
  FiUser,
  FiStar,
  FiUserMinus,
} from 'react-icons/fi';

const PracticanteListItem = ({
  practicante,
  onVerFeedback,
  onQuitar,
}) => {
  const estadoClass = practicante.estadoActual.toLowerCase();

  return (
    <div className="practicante-list-item">
      <div className="practicante-info">
        <div className="practicante-avatar">
          <FiUser />
        </div>
        <div className="practicante-details">
          <span className="name">{practicante.nombre}</span>
          <span className="comision">
            Comisión: {practicante.comision}
          </span>
        </div>
      </div>

      <div className="practicante-stats">
        <div className="stat-item">
          <span className="label">Estado Académico</span>
          <span className="value">{practicante.estadoAcademico}</span>
        </div>
        <div className="stat-item">
          <span className="label">Prácticas Realizadas</span>
          <span className="value">{practicante.practicasRealizadas}</span>
        </div>
        <div className="stat-item">
          <span className="label">Estado Actual</span>
          <span className={`tag ${estadoClass}`}>
            {practicante.estadoActual}
          </span>
        </div>
      </div>

      <div className="practicante-actions">
        <Button
          variant="outline-secondary"
          icon={<FiStar />}
          onClick={onVerFeedback}
        >
          Ver Feedback
        </Button>
        <Button
          variant="outline-danger"
          icon={<FiUserMinus />}
          onClick={onQuitar}
        >
          Quitar
        </Button>
      </div>
    </div>
  );
};

export default PracticanteListItem;