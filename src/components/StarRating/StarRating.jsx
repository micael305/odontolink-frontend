import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import './starRating.css';

const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating-container">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            className={`star-rating-button ${
              ratingValue <= (hover || rating) ? 'on' : 'off'
            } ${readOnly ? 'read-only' : ''}`}
            onClick={() => !readOnly && onRatingChange(ratingValue)}
            onMouseEnter={() => !readOnly && setHover(ratingValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            disabled={readOnly}
          >
            <FiStar fill="currentColor" />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;