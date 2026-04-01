import { FiCheckCircle } from 'react-icons/fi';
import StarRating from './StarRating';

function ReviewCard({ review }) {
  const {
    user,
    user_name,
    rating,
    title,
    comment,
    createdAt,
    created_at,
    isVerifiedPurchase,
    is_verified_purchase,
  } = review;

  const userName =
    (typeof user_name === 'string' && user_name.trim())
      ? user_name.trim()
      : user?.firstName
        ? `${user.firstName} ${user.lastName || ''}`.trim()
        : 'Anonymous';

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const dateRaw = created_at ?? createdAt;
  const dateStr = dateRaw
    ? new Date(dateRaw).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className="review-card">
      <div className="review-card-header">
        <div className="review-card-user">
          <div className="review-card-avatar">{initials}</div>
          <div>
            <p className="review-card-name">{userName}</p>
            <p className="review-card-date">{dateStr}</p>
          </div>
        </div>
        {(isVerifiedPurchase || is_verified_purchase) && (
          <span className="review-card-verified">
            <FiCheckCircle size={14} /> Verified Purchase
          </span>
        )}
      </div>
      <StarRating rating={rating} size={16} />
      {title && <h4 className="review-card-title" style={{ marginTop: '10px' }}>{title}</h4>}
      {comment && <p className="review-card-comment">{comment}</p>}
    </div>
  );
}

export default ReviewCard;
