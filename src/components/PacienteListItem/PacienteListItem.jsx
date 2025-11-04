import Button from '../Button/Button';
import './pacienteListItem.css';

const PacienteListItem = ({
  paciente,
  detailText, // <--- Prop actualizada
  onSelect,
  buttonText,
  buttonIcon,
  buttonVariant = 'outline-secondary',
}) => {
  return (
    <div className="patient-list-item">
      <div className="patient-info">
        <span className="name">{paciente.nombre}</span>
        <span className="dni">{detailText}</span> {/* <--- Prop actualizada */}
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