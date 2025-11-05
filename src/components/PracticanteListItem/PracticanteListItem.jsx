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
  // El backend retorna: id, email, firstName, lastName, dni, phone, birthDate, studentId, studyYear, active
  const fullName = `${practicante.firstName} ${practicante.lastName}`;
  const estadoClass = practicante.active ? 'activo' : 'inactivo';
  const estadoTexto = practicante.active ? 'Activo' : 'Inactivo';

  return (
    <div className="practicante-list-item">
      <div className="practicante-info">
        <div className="practicante-avatar">
          <FiUser />
        </div>
        <div className="practicante-details">
          <span className="name">{fullName}</span>
          <span className="comision">
            Legajo: {practicante.studentId || 'N/A'}
          </span>
        </div>
      </div>

      <div className="practicante-stats">
        <div className="stat-item">
          <span className="label">Año de Estudio</span>
          <span className="value">{practicante.studyYear ? `${practicante.studyYear}° año` : 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="label">DNI</span>
          <span className="value">{practicante.dni || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="label">Estado</span>
          <span className={`tag ${estadoClass}`}>
            {estadoTexto}
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