import Button from '../Button/Button';
import StarRating from '../StarRating/StarRating';
import './atencionListItem.css';

const AtencionListItem = ({
  titulo,
  detailText,
  buttonText,
  buttonIcon,
  onButtonClick,
  rating,
}) => {
  return (
    <div className="atencion-list-item">
      <div className="atencion-info">
        <span className="tratamiento">{titulo}</span>
        {rating && (
          <div className="atencion-rating-display">
            <StarRating rating={rating} readOnly={true} />
          </div>
        )}
        <span className="details">{detailText}</span>
      </div>
      <div className="atencion-action">
        <Button
          variant="outline-secondary"
          icon={buttonIcon}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default AtencionListItem;