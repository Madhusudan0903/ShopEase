import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../api/axios';
import OrderStatusTracker from '../components/OrderStatusTracker';
import Loading from '../components/Loading';
import { getProductImageUrl } from '../utils/productImage';

function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      if (data.success) {
        const payload = data.data;
        setOrder(payload?.order ?? payload);
      }
    } catch {
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    setCancelling(true);
    try {
      const { data } = await api.put(`/orders/${id}/cancel`);
      if (data.success) {
        toast.success('Order cancelled');
        fetchOrder();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Loading text="Loading order details..." />;
  if (!order) return null;

  const status = order.status || order.fulfillment_status || order.orderStatus || 'placed';
  const items = order.items || order.orderItems || [];
  const st = String(status).toLowerCase();
  const canCancel = ['placed', 'confirmed', 'pending'].includes(st);

  return (
    <div className="order-detail">
      <div className="container">
        <button className="btn btn-ghost" onClick={() => navigate('/orders')} style={{ marginBottom: '20px' }}>
          <FiArrowLeft /> Back to Orders
        </button>

        <h1>Order #{order.id ?? order._id}</h1>

        <div className="order-detail-section">
          <h2>Order Status</h2>
          <OrderStatusTracker
            status={status}
            statusHistory={order.statusHistory || []}
          />
        </div>

        <div className="order-detail-section">
          <h2>Order Items</h2>
          <div className="order-items-list">
            {items.map((item, idx) => {
              const prod = item.product || item;
              const unit = item.price_at_purchase ?? item.price ?? prod.price ?? 0;
              return (
                <div key={item.id ?? idx} className="order-item-row">
                  <div className="order-item-img">
                    <img src={getProductImageUrl({ ...item, product: prod })} alt={prod.name} />
                  </div>
                  <div className="order-item-details">
                    <h4>{prod.name}</h4>
                    <span>
                      Qty: {item.quantity} × ₹{Number(unit).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="order-item-price">
                    ₹{(Number(unit) * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="order-detail-section">
            <h2>Shipping Address</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {order.shipping_address_line1 || order.shippingAddressLine1}<br />
              {(order.shipping_address_line2 || order.shippingAddressLine2) && (
                <>{order.shipping_address_line2 || order.shippingAddressLine2}<br /></>
              )}
              {order.shipping_city || order.shippingCity},{' '}
              {order.shipping_state || order.shippingState} —{' '}
              {order.shipping_zip || order.shippingZip}
            </p>
          </div>

          <div className="order-detail-section">
            <h2>Payment & Summary</h2>
            <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
              <strong>Method:</strong>{' '}
              {order.payment_method || order.paymentMethod || '—'}
            </p>
            <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
              <strong>Payment status:</strong>{' '}
              {order.payment_status || order.paymentStatus || '—'}
            </p>
            <div className="order-summary-row total">
              <span>Total</span>
              <span>
                ₹{Number(order.total_amount ?? order.totalAmount ?? order.total ?? 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {canCancel && (
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <button
              className="btn btn-danger"
              onClick={handleCancel}
              disabled={cancelling}
            >
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetailPage;
