import { FiCheck, FiPackage, FiTruck, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const STEPS = [
  { key: 'placed', label: 'Placed', icon: FiCheck },
  { key: 'confirmed', label: 'Confirmed', icon: FiPackage },
  { key: 'shipped', label: 'Shipped', icon: FiTruck },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: FiMapPin },
  { key: 'delivered', label: 'Delivered', icon: FiCheckCircle },
];

function normalizeStatus(s) {
  return String(s || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '_');
}

function OrderStatusTracker({ status, statusHistory = [] }) {
  const norm = normalizeStatus(status);
  const currentIndex = STEPS.findIndex((s) => s.key === norm);

  const isCancelled = norm === 'cancelled';

  const getDate = (stepKey) => {
    const entry = statusHistory.find((h) => normalizeStatus(h.status) === stepKey);
    const raw = entry?.created_at || entry?.date;
    if (!raw) return '';
    return new Date(raw).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (isCancelled) {
    return (
      <div className="status-tracker" style={{ justifyContent: 'center' }}>
        <div className="status-step active" style={{ flex: 'none' }}>
          <div className="status-step-icon" style={{ background: 'var(--danger)', color: 'white' }}>
            <FiCheck />
          </div>
          <span className="status-step-label" style={{ color: 'var(--danger)' }}>
            Order Cancelled
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="status-tracker">
      {STEPS.map((step, index) => {
        const Icon = step.icon;
        let state = '';
        if (index < currentIndex) state = 'completed';
        else if (index === currentIndex) state = 'active';

        return (
          <div key={step.key} className={`status-step ${state}`}>
            <div className="status-step-icon">
              <Icon size={16} />
            </div>
            <span className="status-step-label">{step.label}</span>
            {(state === 'completed' || state === 'active') && (
              <span className="status-step-date">{getDate(step.key)}</span>
            )}
            {index < STEPS.length - 1 && <div className="checkout-step-line" />}
          </div>
        );
      })}
    </div>
  );
}

export default OrderStatusTracker;
