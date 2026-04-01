import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    brand: searchParams.get('brand') || '',
    minRating: searchParams.get('minRating') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || '',
    page: parseInt(searchParams.get('page'), 10) || 1,
  });

  const querySignature = searchParams.toString();

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      brand: searchParams.get('brand') || '',
      minRating: searchParams.get('minRating') || '',
      search: searchParams.get('search') || '',
      sort: searchParams.get('sort') || '',
      page: parseInt(searchParams.get('page'), 10) || 1,
    }));
  }, [querySignature]);

  useEffect(() => {
    api.get('/categories').then((res) => {
      if (res.data.success) {
        const raw = res.data.data;
        const list = Array.isArray(raw) ? raw : raw?.categories ?? [];
        setCategories(list);
      }
    }).catch(() => {});
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.category) params.set('category', filters.category);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      if (filters.brand) params.set('brand', filters.brand);
      if (filters.minRating) params.set('minRating', filters.minRating);
      if (filters.search) params.set('search', filters.search);
      if (filters.sort) params.set('sort', filters.sort);
      params.set('page', filters.page);
      params.set('limit', '12');

      const { data } = await api.get(`/products?${params.toString()}`);
      if (data.success) {
        const result = data.data;
        setProducts(result?.products || result || []);
        setTotalPages(result?.totalPages || 1);
        setTotalProducts(result?.total || result?.products?.length || 0);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      brand: '',
      minRating: '',
      search: '',
      sort: '',
      page: 1,
    });
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="products-page">
      <div className="products-layout">
        <div className={`filters-sidebar${filtersOpen ? ' open' : ''}`}>
          <ProductFilters
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onClose={() => setFiltersOpen(false)}
          />
        </div>

        <div>
          <div className="products-header">
            <div>
              <h2>
                {filters.search ? `Results for "${filters.search}"` : 'All Products'}
              </h2>
              <span className="results-count">{totalProducts} products found</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                className="mobile-filter-btn"
                onClick={() => setFiltersOpen(true)}
              >
                <FiFilter /> Filters
              </button>

              <div className="products-sort">
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="-createdAt">Newest</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="-rating">Top Rated</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="products-empty">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
              <button
                className="btn btn-outline"
                onClick={handleClearFilters}
                style={{ marginTop: '16px' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard key={product._id ?? product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
