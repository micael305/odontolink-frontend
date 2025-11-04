import './dataItem.css';

const DataItem = ({ label, value }) => {
  if (!value) {
    return null;
  }

  return (
    <div className="data-item-container">
      <span className="data-item-label">{label}</span>
      <span className="data-item-value">{value}</span>
    </div>
  );
};

export default DataItem;