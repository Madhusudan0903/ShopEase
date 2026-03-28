import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiLogOut, FiPackage, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          Shop<span>Vista</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <FiSearch className="navbar-search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className={`navbar-actions${mobileOpen ? ' open' : ''}`}>
          {mobileOpen && (
            <form className="mobile-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}

          <Link
            to="/products"
            className="navbar-action-btn"
            onClick={() => setMobileOpen(false)}
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="navbar-action-btn"
            onClick={() => setMobileOpen(false)}
          >
            <FiShoppingCart size={20} />
            Cart
            {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="navbar-user-dropdown" ref={dropdownRef}>
              <button
                className="navbar-action-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FiUser size={20} />
                {user?.firstName || 'Account'}
              </button>
              {dropdownOpen && (
                <div className="navbar-dropdown-menu">
                  <Link to="/profile" onClick={() => { setDropdownOpen(false); setMobileOpen(false); }}>
                    <FiUser /> My Profile
                  </Link>
                  <Link to="/orders" onClick={() => { setDropdownOpen(false); setMobileOpen(false); }}>
                    <FiPackage /> My Orders
                  </Link>
                  <div className="navbar-dropdown-divider" />
                  <button onClick={() => { logout(); setDropdownOpen(false); setMobileOpen(false); }}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-action-btn"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
                onClick={() => setMobileOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />
    </nav>
  );
}

export default Navbar;
