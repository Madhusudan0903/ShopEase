import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FiChevronLeft />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

export default Pagination;
