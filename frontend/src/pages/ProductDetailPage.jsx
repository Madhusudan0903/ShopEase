import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import api from '../api/axios';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import Loading from '../components/Loading';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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
        if (data.success) setProduct(data.data);
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
      if (data.success) setReviews(data.data || []);
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
      await addToCart(product._id, quantity);
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
    images,
    description,
    rating,
    numReviews,
    stock,
  } = product;

  const discount = compare_at_price && compare_at_price > price
    ? Math.round(((compare_at_price - price) / compare_at_price) * 100)
    : 0;

  const stockStatus = () => {
    if (stock <= 0) return <span className="stock-out">Out of Stock</span>;
    if (stock <= 5) return <span className="stock-low">Low Stock — Only {stock} left</span>;
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
            <img src={images?.[0] || '/placeholder.png'} alt={name} />
          </div>

          <div className="product-detail-info">
            {brand && <p className="product-detail-brand">{brand}</p>}
            <h1>{name}</h1>

            <div className="product-detail-rating">
              <StarRating rating={rating || 0} size={20} />
              <span>
                {rating?.toFixed(1)} ({numReviews || 0} reviews)
              </span>
            </div>

            <div className="product-detail-price">
              <span className="current-price">₹{price?.toLocaleString('en-IN')}</span>
              {compare_at_price > price && (
                <>
                  <span className="original-price">
                    ₹{compare_at_price?.toLocaleString('en-IN')}
                  </span>
                  <span className="discount">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="product-detail-description">{description}</p>

            <div className="product-detail-stock">{stockStatus()}</div>

            {stock > 0 && (
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
                      onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                      disabled={quantity >= stock}
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

        {isAuthenticated && (
          <ReviewForm productId={id} onReviewSubmitted={fetchReviews} />
        )}

        {reviews.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '30px' }}>
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
