import './dateButton.css';

const DateButton = ({ dia, isSelected, onClick }) => {
  return (
    <button
      className={`date-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="dia-semana">{dia.diaSemana}</span>
      <span className="dia-num">{dia.diaNum}</span>
      <span className="mes">{dia.mes}</span>
    </button>
  );
};

export default DateButton;