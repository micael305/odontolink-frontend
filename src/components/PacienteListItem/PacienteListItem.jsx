import Button from '../Button/Button';
import './pacienteListItem.css';
import { FiChevronRight } from 'react-icons/fi';

const PacienteListItem = ({ paciente, onSelect }) => {
  return (
    <div className="patient-list-item">
      <div className="patient-info">
        <span className="name">{paciente.nombre}</span>
        <span className="dni">DNI: {paciente.dni}</span>
      </div>
      <Button
        variant="outline-secondary"
        icon={<FiChevronRight />}
        onClick={onSelect}
      >
        Ver Evolución
      </Button>
    </div>
  );
};

export default PacienteListItem;