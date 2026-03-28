import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Shop<span>Vista</span></h3>
            <p>
              Your one-stop destination for quality products at unbeatable prices.
              Shop with confidence and enjoy a seamless experience from browse to doorstep.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/orders">My Orders</Link>
          </div>

          <div className="footer-section">
            <h4>Customer Service</h4>
            <Link to="#">Help Center</Link>
            <Link to="#">Shipping Info</Link>
            <Link to="#">Returns &amp; Exchanges</Link>
            <Link to="#">Contact Us</Link>
          </div>

          <div className="footer-section">
            <h4>My Account</h4>
            <Link to="/profile">Profile</Link>
            <Link to="/orders">Order History</Link>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="#">Wishlist</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ShopVista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
