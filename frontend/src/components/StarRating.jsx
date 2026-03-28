import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

function StarRating({ rating = 0, size = 16, interactive = false, onRate }) {
  const stars = [];

  if (interactive) {
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={size}
          className={`star ${i <= rating ? '' : 'empty'}`}
          style={{ cursor: 'pointer', color: i <= rating ? '#ffc857' : '#dee2e6' }}
          onClick={() => onRate && onRate(i)}
        />
      );
    }
  } else {
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} size={size} className="star" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} size={size} className="star" />);
      } else {
        stars.push(<FaRegStar key={i} size={size} className="star empty" />);
      }
    }
  }

  return <div className="star-rating">{stars}</div>;
}

export default StarRating;
