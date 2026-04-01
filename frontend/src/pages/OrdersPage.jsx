import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiPackage } from 'react-icons/fi';
import api from '../api/axios';
import Loading from '../components/Loading';

function getStatusBadgeClass(status) {
  const s = String(status || '').toLowerCase().replace(/\s+/g, '_');
  const map = {
    placed: 'badge-info',
    pending: 'badge-warning',
    confirmed: 'badge-info',
    shipped: 'badge-info',
    out_for_delivery: 'badge-primary',
    delivered: 'badge-success',
    cancelled: 'badge-danger',
    completed: 'badge-success',
  };
  return map[s] || 'badge-info';
}

function formatOrderStatus(row) {
  return (
    row.fulfillment_status ||
    row.status ||
    row.payment_status ||
    'placed'
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my-orders');
        if (data.success) {
          const payload = data.data;
          const list = Array.isArray(payload) ? payload : (payload?.orders ?? []);
          setOrders(list);
        }
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
            {orders.map((order) => {
              const oid = order.id ?? order._id;
              const created = order.created_at ?? order.createdAt;
              const total = order.total_amount ?? order.totalAmount ?? order.total ?? 0;
              const status = formatOrderStatus(order);
              const itemCount = order.item_count ?? order.items?.length ?? 0;

              return (
                <div key={oid} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <span className="order-card-id">Order #{oid}</span>
                      <span className="order-card-date" style={{ marginLeft: '12px' }}>
                        {created
                          ? new Date(created).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : ''}
                      </span>
                    </div>
                    <span className={`badge ${getStatusBadgeClass(status)}`}>
                      {String(status).replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className="order-card-body">
                    <div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {itemCount} item(s)
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span className="order-card-total">
                        ₹{Number(total).toLocaleString('en-IN')}
                      </span>
                      <Link to={`/orders/${oid}`} className="btn btn-outline btn-sm">
                        <FiEye size={14} /> View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
