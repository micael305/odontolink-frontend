import Button from '../Button/Button';
import './atencionListItem.css';
import { FiStar } from 'react-icons/fi';

const AtencionListItem = ({ atencion, onCalificar }) => {
  return (
    <div className="atencion-list-item">
      <div className="atencion-info">
        <span className="tratamiento">{atencion.tratamiento}</span>
        <span className="details">
          {atencion.practicante} • {atencion.fecha}
        </span>
      </div>
      <Button
        variant="outline-secondary"
        icon={<FiStar />}
        onClick={onCalificar}
      >
        Calificar
      </Button>
    </div>
  );
};

export default AtencionListItem;