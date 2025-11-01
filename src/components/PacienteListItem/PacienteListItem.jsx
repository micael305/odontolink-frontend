import Button from '../Button/Button';
import './pacienteListItem.css';

const PacienteListItem = ({
  paciente,
  onSelect,
  buttonText,
  buttonIcon,
  buttonVariant = 'outline-secondary',
}) => {
  return (
    <div className="patient-list-item">
      <div className="patient-info">
        <span className="name">{paciente.nombre}</span>
        <span className="dni">DNI: {paciente.dni}</span>
      </div>
      <Button
        variant={buttonVariant}
        icon={buttonIcon}
        onClick={onSelect}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PacienteListItem;