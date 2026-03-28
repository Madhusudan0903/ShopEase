import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import {
  FiSmartphone, FiHeadphones, FiMonitor, FiWatch,
  FiCamera, FiCpu,
} from 'react-icons/fi';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const CATEGORY_ICONS = {
  Electronics: <FiSmartphone size={36} />,
  Headphones: <FiHeadphones size={36} />,
  Computers: <FiMonitor size={36} />,
  Watches: <FiWatch size={36} />,
  Cameras: <FiCamera size={36} />,
  Accessories: <FiCpu size={36} />,
};

function getIcon(name) {
  for (const key of Object.keys(CATEGORY_ICONS)) {
    if (name?.toLowerCase().includes(key.toLowerCase())) {
      return CATEGORY_ICONS[key];
    }
  }
  return <FiCpu size={36} />;
}

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.get('/categories'),
          api.get('/products?sort=-rating&limit=8'),
        ]);
        if (catRes.data.success) setCategories(catRes.data.data || []);
        if (prodRes.data.success) {
          const prods = prodRes.data.data?.products || prodRes.data.data || [];
          setTrendingProducts(prods);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Discover Amazing <span>Deals</span> Every Day
          </h1>
          <p>
            Shop the latest trends with unbeatable prices. From electronics to
            fashion, find everything you need in one place.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now <FiArrowRight />
            </Link>
            <Link to="/products" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {loading ? (
        <Loading />
      ) : (
        <>
          {categories.length > 0 && (
            <section className="home-section">
              <div className="container">
                <div className="section-header">
                  <h2>Shop by Category</h2>
                  <Link to="/products">
                    View All <FiArrowRight />
                  </Link>
                </div>
                <div className="categories-grid">
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/products?category=${cat._id}`}
                      className="category-card"
                    >
                      <div className="category-card-icon">{getIcon(cat.name)}</div>
                      <h3>{cat.name}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {trendingProducts.length > 0 && (
            <section className="home-section">
              <div className="container">
                <div className="section-header">
                  <h2>Trending Products</h2>
                  <Link to="/products?sort=-rating">
                    View All <FiArrowRight />
                  </Link>
                </div>
                <div className="trending-grid">
                  {trendingProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="home-section">
            <div className="container">
              <div className="promo-section">
                <h2>🔥 Mega Sale is Live!</h2>
                <p>Up to 50% off on selected items. Limited time offer, shop now!</p>
                <Link to="/products" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)' }}>
                  Grab the Deal <FiArrowRight />
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default HomePage;
