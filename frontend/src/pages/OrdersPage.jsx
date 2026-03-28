import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiPackage } from 'react-icons/fi';
import api from '../api/axios';
import Loading from '../components/Loading';

function getStatusBadgeClass(status) {
  const map = {
    pending: 'badge-warning',
    confirmed: 'badge-info',
    shipped: 'badge-info',
    'out for delivery': 'badge-primary',
    delivered: 'badge-success',
    cancelled: 'badge-danger',
  };
  return map[status?.toLowerCase()] || 'badge-info';
}

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        if (data.success) setOrders(data.data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <Loading text="Loading orders..." />;

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon"><FiPackage /></div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders. Start shopping to see them here!</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="order-card-id">
                      Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()}
                    </span>
                    <span className="order-card-date" style={{ marginLeft: '12px' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <span className={`badge ${getStatusBadgeClass(order.status || order.orderStatus)}`}>
                    {order.status || order.orderStatus}
                  </span>
                </div>

                <div className="order-card-body">
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {order.items?.length || order.orderItems?.length || 0} item(s)
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="order-card-total">
                      ₹{(order.totalAmount || order.total || 0).toLocaleString('en-IN')}
                    </span>
                    <Link to={`/orders/${order._id}`} className="btn btn-outline btn-sm">
                      <FiEye size={14} /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
