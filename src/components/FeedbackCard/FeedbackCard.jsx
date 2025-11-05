import StarRating from '../StarRating/StarRating';
import './feedbackCard.css';

const FeedbackCard = ({ feedback }) => {
  const { practicante, fecha, criterios, comentario, tratamiento, fechaCompleta } = feedback;

  return (
    <div className="feedback-card">
      <div className="feedback-card-header">
        <div>
          <h3>{practicante}</h3>
          {tratamiento && (
            <span className="tratamiento-label">{tratamiento}</span>
          )}
        </div>
        <div className="date-info">
          <span className="date">{fecha}</span>
          {fechaCompleta && (
            <span className="time">{fechaCompleta}</span>
          )}
        </div>
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
            <span className="label">Comentario:</span>
            <p>"{comentario}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;