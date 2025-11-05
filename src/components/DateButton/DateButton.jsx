import './dateButton.css';

const DateButton = ({ dia, isSelected, onClick, disabled }) => {
  return (
    <button
      className={`date-item ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="dia-semana">{dia.diaSemana}</span>
      <span className="dia-num">{dia.diaNum}</span>
      <span className="mes">{dia.mes}</span>
    </button>
  );
};

export default DateButton;