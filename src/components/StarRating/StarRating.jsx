import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import './starRating.css';

const StarRating = ({ rating, onRatingChange }) => {
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
            }`}
            onClick={() => onRatingChange(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <FiStar fill="currentColor" />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;