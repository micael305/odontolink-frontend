import Button from '../Button/Button';
import './practicanteSearchResultItem.css';
import { FiUser, FiPlus } from 'react-icons/fi';

const PracticanteSearchResultItem = ({ practicante, onAgregar }) => {
  return (
    <div className="search-result-item">
      <div className="search-result-info">
        <div className="search-result-avatar">
          <FiUser />
        </div>
        <div className="search-result-details">
          <span className="name">{practicante.nombre}</span>
          <span className="id">
            Legajo: {practicante.legajo} • DNI: {practicante.dni}
          </span>
        </div>
      </div>

      <div className="search-result-actions">
        <Button
          variant="success"
          icon={<FiPlus />}
          onClick={onAgregar}
        >
          Agregar a mi cargo
        </Button>
      </div>
    </div>
  );
};

export default PracticanteSearchResultItem;