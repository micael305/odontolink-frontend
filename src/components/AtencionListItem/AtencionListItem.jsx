import Button from '../Button/Button';
import './atencionListItem.css';

const AtencionListItem = ({
  titulo,
  detailText,
  buttonText,
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="atencion-list-item">
      <div className="atencion-info">
        <span className="tratamiento">{titulo}</span>
        <span className="details">{detailText}</span>
      </div>
      <Button
        variant="outline-secondary"
        icon={buttonIcon}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default AtencionListItem;