import { FiCheck, FiPackage, FiTruck, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const STEPS = [
  { key: 'Pending', label: 'Placed', icon: FiCheck },
  { key: 'Confirmed', label: 'Confirmed', icon: FiPackage },
  { key: 'Shipped', label: 'Shipped', icon: FiTruck },
  { key: 'Out for Delivery', label: 'Out for Delivery', icon: FiMapPin },
  { key: 'Delivered', label: 'Delivered', icon: FiCheckCircle },
];

function OrderStatusTracker({ status, statusHistory = [] }) {
  const currentIndex = STEPS.findIndex(
    (s) => s.key.toLowerCase() === status?.toLowerCase()
  );

  const isCancelled = status?.toLowerCase() === 'cancelled';

  const getDate = (stepKey) => {
    const entry = statusHistory.find(
      (h) => h.status?.toLowerCase() === stepKey.toLowerCase()
    );
    if (entry?.date) {
      return new Date(entry.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
      });
    }
    return '';
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
