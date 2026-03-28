import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    _id,
    name,
    brand,
    price,
    compare_at_price,
    images,
    rating,
    numReviews,
    stock,
  } = product;

  const discount = compare_at_price && compare_at_price > price
    ? Math.round(((compare_at_price - price) / compare_at_price) * 100)
    : 0;

  const imageUrl = images?.[0] || '/placeholder.png';

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await addToCart(_id, 1);
    } catch {
      // handled by context
    }
  };

  const inStock = stock > 0;

  return (
    <Link to={`/products/${_id}`} className="product-card">
      <div className="product-card-image">
        <img src={imageUrl} alt={name} />
        {discount > 0 && (
          <span className="product-card-discount">-{discount}%</span>
        )}
      </div>
      <div className="product-card-body">
        {brand && <p className="product-card-brand">{brand}</p>}
        <h3 className="product-card-name">{name}</h3>
        <div className="product-card-rating">
          <StarRating rating={rating || 0} size={14} />
          <span>({numReviews || 0})</span>
        </div>
        <div className="product-card-price">
          <span className="current-price">₹{price?.toLocaleString('en-IN')}</span>
          {compare_at_price > price && (
            <span className="original-price">₹{compare_at_price?.toLocaleString('en-IN')}</span>
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
