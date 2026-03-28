import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';

function CartPage() {
  const { cartItems, cartTotal, loading, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const shipping = cartTotal > 499 ? 0 : 49;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + shipping + tax;

  if (loading) return <Loading text="Loading cart..." />;

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>

        {!isAuthenticated ? (
          <div className="cart-empty">
            <div className="cart-empty-icon"><FiShoppingBag /></div>
            <h2>Please login to view your cart</h2>
            <p>Sign in to add items and manage your cart.</p>
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon"><FiShoppingBag /></div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/products')}>
                  <FiArrowLeft /> Continue Shopping
                </button>
                <button className="btn btn-ghost btn-sm" onClick={clearCart} style={{ color: 'var(--danger)' }}>
                  <FiTrash2 /> Clear Cart
                </button>
              </div>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="order-summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="order-summary-row">
                <span>Tax (GST 18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="order-summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: '0.82rem', color: 'var(--success)', marginTop: '8px' }}>
                  Add ₹{(500 - cartTotal).toLocaleString('en-IN')} more for free shipping!
                </p>
              )}
              <Link to="/checkout" className="btn btn-primary btn-block">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
