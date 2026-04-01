import { useState } from 'react';
import StarRating from './StarRating';
import { toast } from 'react-toastify';
import api from '../api/axios';

function ReviewForm({ productId, onReviewSubmitted, editingReview, onCancelEdit }) {
  const [rating, setRating] = useState(editingReview?.rating || 0);
  const [title, setTitle] = useState(editingReview?.title || '');
  const [comment, setComment] = useState(editingReview?.comment || '');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!rating) errs.rating = 'Please select a rating';
    if (!title.trim()) errs.title = 'Title is required';
    else if (title.trim().length < 3) errs.title = 'Title must be at least 3 characters';
    if (!comment.trim()) errs.comment = 'Comment is required';
    else if (comment.trim().length < 10) errs.comment = 'Comment must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (editingReview) {
        await api.put(`/reviews/${editingReview.id ?? editingReview._id}`, { rating, title, comment });
        toast.success('Review updated!');
      } else {
        const pid = parseInt(productId, 10);
        if (Number.isNaN(pid) || pid < 1) {
          toast.error('Invalid product');
          return;
        }
        await api.post('/reviews', {
          product_id: pid,
          rating: Math.min(5, Math.max(1, Math.round(Number(rating)))),
          title: title.trim(),
          comment: comment.trim(),
        });
        toast.success('Review submitted!');
      }
      setRating(0);
      setTitle('');
      setComment('');
      setErrors({});
      onReviewSubmitted && onReviewSubmitted();
    } catch (err) {
      const apiErr = err.response?.data;
      const first = apiErr?.data?.errors?.[0]?.message || apiErr?.message;
      toast.error(first || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>{editingReview ? 'Edit Your Review' : 'Write a Review'}</h3>

      <div className="form-group">
        <label className="form-label">Rating</label>
        <div className="star-rating-input">
          <StarRating rating={rating} size={28} interactive onRate={setRating} />
        </div>
        {errors.rating && <p className="form-error">{errors.rating}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          className={`form-input${errors.title ? ' error' : ''}`}
          placeholder="Summary of your review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Comment</label>
        <textarea
          className={`form-textarea${errors.comment ? ' error' : ''}`}
          placeholder="Share your experience with this product..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {errors.comment && <p className="form-error">{errors.comment}</p>}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting...' : editingReview ? 'Update Review' : 'Submit Review'}
        </button>
        {editingReview && onCancelEdit && (
          <button type="button" className="btn btn-ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ReviewForm;
