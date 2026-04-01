import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductImageUrl, PLACEHOLDER_SVG } from '../utils/productImage';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const product = item.product || {};
  const price = product.price || item.price || 0;
  const name = product.name || item.name || 'Product';
  const brand = product.brand || item.brand || '';
  const image = getProductImageUrl(item);
  const productId = product._id || product.id || item.productId || item.product_id;
  const subtotal = price * item.quantity;
  const lineId = item.id ?? item._id;

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(lineId, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(lineId, item.quantity + 1);
  };

  return (
    <div className="cart-item">
      <Link to={`/products/${productId}`} className="cart-item-image">
        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_SVG;
          }}
        />
      </Link>

      <div className="cart-item-info">
        <Link to={`/products/${productId}`}>
          <h3>{name}</h3>
        </Link>
        {brand && <p className="cart-item-brand">{brand}</p>}
        <p className="cart-item-price">₹{price.toLocaleString('en-IN')}</p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-selector">
          <button onClick={handleDecrease} disabled={item.quantity <= 1}>−</button>
          <span>{item.quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <p className="cart-item-subtotal">₹{subtotal.toLocaleString('en-IN')}</p>
        <button className="cart-item-remove" onClick={() => removeItem(lineId)}>
          <FiTrash2 size={14} /> Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
