import StarRating from '../StarRating/StarRating';
import './feedbackCard.css';

const FeedbackCard = ({ feedback }) => {
  const { practicante, fecha, criterios, comentario } = feedback;

  return (
    <div className="feedback-card">
      <div className="feedback-card-header">
        <h3>{practicante}</h3>
        <span className="date">{fecha}</span>
      </div>
      <div className="feedback-card-body">
        {criterios.map((criterio) => (
          <div key={criterio.nombre} className="criterio-item-display">
            <span className="label">{criterio.nombre}</span>
            <StarRating rating={criterio.puntaje} readOnly={true} />
          </div>
        ))}
        {comentario && (
          <div className="feedback-comment">
            <span className="label">Comentario del practicante:</span>
            <p>"{comentario}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;