import { FiX } from 'react-icons/fi';
import StarRating from './StarRating';

function ProductFilters({
  categories,
  filters,
  onFilterChange,
  onClearFilters,
  onClose,
}) {
  const handleCategoryChange = (categoryId) => {
    onFilterChange('category', categoryId === filters.category ? '' : categoryId);
  };

  return (
    <div className="filters-sidebar">
      <div className="filters-header">
        <h3>Filters</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="filters-clear-btn" onClick={onClearFilters}>
            Clear All
          </button>
          {onClose && (
            <button className="filters-clear-btn" onClick={onClose} style={{ fontSize: '1.2rem' }}>
              <FiX />
            </button>
          )}
        </div>
      </div>

      <div className="filter-section">
        <h4>Categories</h4>
        {categories.map((cat) => (
          <label key={cat._id} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.category === cat._id}
              onChange={() => handleCategoryChange(cat._id)}
            />
            {cat.name}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="filter-price-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
          />
          <span>—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-section">
        <h4>Brand</h4>
        <input
          type="text"
          className="form-input"
          placeholder="Filter by brand..."
          value={filters.brand}
          onChange={(e) => onFilterChange('brand', e.target.value)}
          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
        />
      </div>

      <div className="filter-section">
        <h4>Minimum Rating</h4>
        {[4, 3, 2, 1].map((star) => (
          <div
            key={star}
            className="filter-rating-option"
            onClick={() => onFilterChange('minRating', filters.minRating === star ? '' : star)}
          >
            <StarRating rating={star} size={16} />
            <span>& up</span>
            {filters.minRating === star && (
              <span style={{ marginLeft: 'auto', color: 'var(--primary)', fontWeight: 600 }}>✓</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductFilters;
