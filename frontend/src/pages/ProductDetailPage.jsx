import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import api from '../api/axios';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import Loading from '../components/Loading';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getProductImageUrl, PLACEHOLDER_SVG } from '../utils/productImage';
import { formatInr } from '../utils/formatInr';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        if (data.success) {
          const payload = data.data;
          setProduct(payload?.product ?? payload);
        }
      } catch {
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await api.get(`/reviews/product/${id}`);
      if (data.success) {
        const payload = data.data;
        const list = Array.isArray(payload) ? payload : (payload?.reviews ?? []);
        setReviews(list);
      }
    } catch {
      setReviews([]);
    }
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setAddingToCart(true);
    try {
      await addToCart(product._id ?? product.id, quantity);
    } catch {
      // handled
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <Loading />;
  if (!product) return null;

  const {
    name,
    brand,
    price,
    compare_at_price,
    description,
    rating,
    average_rating,
    numReviews,
    total_reviews,
    review_count,
    stock,
    stock_quantity,
  } = product;

  const displayRating = Number(rating ?? average_rating ?? 0) || 0;
  const reviewCount = Number(review_count ?? numReviews ?? total_reviews ?? 0) || 0;
  const stockCount = Number(stock ?? stock_quantity ?? 0) || 0;

  const priceNum = Number(price);
  const compareNum = Number(compare_at_price);
  const discount =
    compare_at_price != null && !Number.isNaN(compareNum) && !Number.isNaN(priceNum) && compareNum > priceNum
      ? Math.round(((compareNum - priceNum) / compareNum) * 100)
      : 0;

  const stockStatus = () => {
    if (stockCount <= 0) return <span className="stock-out">Out of Stock</span>;
    if (stockCount <= 5) return <span className="stock-low">Low Stock — Only {stockCount} left</span>;
    return <span className="stock-in">In Stock</span>;
  };

  return (
    <div className="product-detail">
      <div className="container">
        <button
          className="btn btn-ghost"
          onClick={() => navigate(-1)}
          style={{ marginBottom: '20px' }}
        >
          <FiArrowLeft /> Back
        </button>

        <div className="product-detail-grid">
          <div className="product-detail-image">
            <img
              src={getProductImageUrl(product)}
              alt={name}
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_SVG;
              }}
            />
          </div>

          <div className="product-detail-info">
            {brand && <p className="product-detail-brand">{brand}</p>}
            <h1>{name}</h1>

            <div className="product-detail-rating">
              <StarRating rating={displayRating} size={20} />
              <span>
                {displayRating.toFixed(1)} ({reviewCount} reviews)
              </span>
            </div>

            <div className="product-detail-price">
              <span className="current-price">₹{formatInr(price)}</span>
              {Number(compare_at_price) > Number(price) && (
                <>
                  <span className="original-price">
                    ₹{formatInr(compare_at_price)}
                  </span>
                  <span className="discount">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="product-detail-description">{description}</p>

            <div className="product-detail-stock">{stockStatus()}</div>

            {stockCount > 0 && (
              <>
                <div className="product-detail-quantity">
                  <span style={{ fontWeight: 600 }}>Quantity:</span>
                  <div className="quantity-selector">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(stockCount, q + 1))}
                      disabled={quantity >= stockCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="product-detail-actions">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                  >
                    <FiShoppingCart />
                    {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews ({reviews.length})</h2>

        {isAuthenticated ? (
          <ReviewForm productId={id} onReviewSubmitted={fetchReviews} />
        ) : (
          <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
            <Link to="/login">Sign in</Link> to write a review. Reviews are accepted for products from
            delivered orders only.
          </p>
        )}

        {reviews.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review.id ?? review._id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
