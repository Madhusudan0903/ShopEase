import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

function NotFoundPage() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">
        <FiHome /> Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
