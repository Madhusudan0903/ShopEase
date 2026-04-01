import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProductImageUrl, PLACEHOLDER_SVG } from '../utils/productImage';
import { formatInr } from '../utils/formatInr';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    _id,
    id,
    name,
    brand,
    price,
    compare_at_price,
    rating,
    average_rating,
    numReviews,
    total_reviews,
    review_count,
    stock,
    stock_quantity,
  } = product;

  const productId = _id ?? id;
  const stockCount = stock ?? stock_quantity ?? 0;
  const displayRating = Number(rating ?? average_rating ?? 0) || 0;
  const reviewTotal = Number(review_count ?? numReviews ?? total_reviews ?? 0) || 0;

  const discount = compare_at_price && compare_at_price > price
    ? Math.round(((compare_at_price - price) / compare_at_price) * 100)
    : 0;

  const imageUrl = getProductImageUrl(product);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await addToCart(productId, 1);
    } catch {
      // handled by context
    }
  };

  const inStock = stockCount > 0;

  return (
    <Link to={`/products/${productId}`} className="product-card">
      <div className="product-card-image">
        <img
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_SVG;
          }}
        />
        {discount > 0 && (
          <span className="product-card-discount">-{discount}%</span>
        )}
      </div>
      <div className="product-card-body">
        {brand && <p className="product-card-brand">{brand}</p>}
        <h3 className="product-card-name">{name}</h3>
        <div className="product-card-rating">
          <StarRating rating={displayRating} size={14} />
          <span className="product-card-review-count">
            {displayRating > 0 ? `${displayRating.toFixed(1)} · ` : ''}
            {reviewTotal} {reviewTotal === 1 ? 'review' : 'reviews'}
          </span>
        </div>
        <div className="product-card-price">
          <span className="current-price">₹{formatInr(price)}</span>
          {Number(compare_at_price) > Number(price) && (
            <span className="original-price">₹{formatInr(compare_at_price)}</span>
          )}
        </div>
        <div className="product-card-actions">
          <button
            className={`btn btn-primary btn-sm${!inStock ? ' btn-disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <FiShoppingCart size={16} />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
