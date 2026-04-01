import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getProductImageUrl } from '../utils/productImage';

const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'];

const STEPS = ['Shipping', 'Payment', 'Review'];
const SAVED_SHIPPING_KEY = 'capstone_saved_shipping_v1';

function readSavedShipping() {
  try {
    const raw = localStorage.getItem(SAVED_SHIPPING_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    return {
      shippingAddressLine1: String(o.shippingAddressLine1 ?? ''),
      shippingAddressLine2: String(o.shippingAddressLine2 ?? ''),
      shippingCity: String(o.shippingCity ?? ''),
      shippingState: String(o.shippingState ?? ''),
      shippingZip: String(o.shippingZip ?? '').replace(/\D/g, '').slice(0, 6),
    };
  } catch {
    return null;
  }
}

function writeSavedShipping(data) {
  localStorage.setItem(SAVED_SHIPPING_KEY, JSON.stringify(data));
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCartLocal, fetchCart, loading: cartLoading } = useCart();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [shipping, setShipping] = useState({
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
  });

  const [payment, setPayment] = useState({
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [upiId, setUpiId] = useState('');

  const [orderNotes, setOrderNotes] = useState('');
  const [rememberShipping, setRememberShipping] = useState(true);
  const placeOrderLock = useRef(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const saved = readSavedShipping();
    if (saved?.shippingAddressLine1?.trim()) {
      setShipping((prev) => ({ ...prev, ...saved }));
      return;
    }
    if (!user) return;
    if (user.address_line1 || user.city) {
      setShipping({
        shippingAddressLine1: user.address_line1 || '',
        shippingAddressLine2: user.address_line2 || '',
        shippingCity: user.city || '',
        shippingState: user.state || '',
        shippingZip: String(user.zip_code || '')
          .replace(/\D/g, '')
          .slice(0, 6),
      });
    }
  }, [user]);

  const shippingCost = cartTotal > 499 ? 0 : 49;
  const tax = Math.round(cartTotal * 0.18);
  const total = cartTotal + shippingCost + tax;

  const validateShipping = () => {
    const errs = {};
    if (!shipping.shippingAddressLine1.trim()) errs.shippingAddressLine1 = 'Address is required';
    if (!shipping.shippingCity.trim()) errs.shippingCity = 'City is required';
    if (!shipping.shippingState.trim()) errs.shippingState = 'State is required';
    if (!shipping.shippingZip.trim()) errs.shippingZip = 'ZIP code is required';
    else if (!/^\d{5,6}$/.test(shipping.shippingZip.trim())) errs.shippingZip = 'Enter a valid ZIP code';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs = {};
    if (!payment.paymentMethod) errs.paymentMethod = 'Please select a payment method';
    if (['Credit Card', 'Debit Card'].includes(payment.paymentMethod)) {
      if (!payment.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      if (!payment.cardExpiry.trim()) errs.cardExpiry = 'Expiry is required';
      if (!payment.cardCvv.trim()) errs.cardCvv = 'CVV is required';
    }
    if (payment.paymentMethod === 'UPI') {
      const u = upiId.trim();
      if (!u) errs.upiId = 'Enter your UPI ID';
      else if (!/^[\w.\-]{2,256}@[\w.\-]{2,64}$/.test(u)) {
        errs.upiId = 'Use a valid UPI ID (e.g. name@paytm)';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateShipping()) setStep(1);
    else if (step === 1 && validatePayment()) setStep(2);
  };

  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
    setErrors({});
  };

  const handlePlaceOrder = async () => {
    if (placeOrderLock.current || submitting) return;
    placeOrderLock.current = true;
    setSubmitting(true);
    try {
      const serverItems = await fetchCart();
      if (!serverItems?.length) {
        toast.error('Your cart is empty on the server. Go back to the cart and add items again.');
        navigate('/cart');
        return;
      }

      const orderData = {
        shippingAddressLine1: shipping.shippingAddressLine1,
        shippingAddressLine2: shipping.shippingAddressLine2,
        shippingCity: shipping.shippingCity,
        shippingState: shipping.shippingState,
        shippingZip: shipping.shippingZip,
        paymentMethod: payment.paymentMethod,
        orderNotes,
      };
      if (payment.paymentMethod === 'UPI') {
        orderData.upiId = upiId.trim();
      }

      const { data } = await api.post('/orders', orderData);
      if (data.success) {
        if (rememberShipping) {
          writeSavedShipping(shipping);
        }
        clearCartLocal();
        toast.success('Order placed successfully!');
        const oid = data.data?.order?.id ?? data.data?.order?._id ?? data.data?.id;
        if (oid) navigate(`/orders/${oid}`);
        else navigate('/orders');
      }
    } catch (err) {
      const apiErr = err.response?.data;
      const first =
        apiErr?.data?.errors?.[0]?.message ||
        apiErr?.message;
      toast.error(first || 'Failed to place order');
    } finally {
      setSubmitting(false);
      placeOrderLock.current = false;
    }
  };

  if (!cartLoading && cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  if (cartLoading && cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <h1>Checkout</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Loading your cart…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>

        <div className="checkout-steps">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`checkout-step${i === step ? ' active' : ''}${i < step ? ' completed' : ''}`}
            >
              <div className="checkout-step-number">
                {i < step ? <FiCheck /> : i + 1}
              </div>
              <span className="checkout-step-label">{label}</span>
              {i < STEPS.length - 1 && <div className="checkout-step-line" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="checkout-form-section">
            <h2>Shipping Address</h2>
            <div
              className="checkout-saved-address-actions"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  const s = readSavedShipping();
                  if (s?.shippingAddressLine1?.trim()) {
                    setShipping(s);
                    toast.info('Loaded saved address');
                  } else {
                    toast.info('No saved address on this device yet');
                  }
                }}
              >
                Use saved address
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  if (
                    !shipping.shippingAddressLine1.trim() ||
                    !shipping.shippingCity.trim()
                  ) {
                    toast.error('Fill at least address and city before saving');
                    return;
                  }
                  writeSavedShipping(shipping);
                  toast.success('Address saved on this device');
                }}
              >
                Save address now
              </button>
            </div>
            <div className="form-group">
              <label className="form-label">Address Line 1 *</label>
              <input
                type="text"
                className={`form-input${errors.shippingAddressLine1 ? ' error' : ''}`}
                placeholder="Street address, P.O. box"
                value={shipping.shippingAddressLine1}
                onChange={(e) => setShipping({ ...shipping, shippingAddressLine1: e.target.value })}
              />
              {errors.shippingAddressLine1 && <p className="form-error">{errors.shippingAddressLine1}</p>}
            </div>
            <div className="form-group">
              <label className="form-label">Address Line 2</label>
              <input
                type="text"
                className="form-input"
                placeholder="Apartment, suite, unit (optional)"
                value={shipping.shippingAddressLine2}
                onChange={(e) => setShipping({ ...shipping, shippingAddressLine2: e.target.value })}
              />
            </div>
            <div className="checkout-form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  className={`form-input${errors.shippingCity ? ' error' : ''}`}
                  placeholder="City"
                  value={shipping.shippingCity}
                  onChange={(e) => setShipping({ ...shipping, shippingCity: e.target.value })}
                />
                {errors.shippingCity && <p className="form-error">{errors.shippingCity}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  className={`form-input${errors.shippingState ? ' error' : ''}`}
                  placeholder="State"
                  value={shipping.shippingState}
                  onChange={(e) => setShipping({ ...shipping, shippingState: e.target.value })}
                />
                {errors.shippingState && <p className="form-error">{errors.shippingState}</p>}
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: '200px' }}>
              <label className="form-label">ZIP Code *</label>
              <input
                type="text"
                className={`form-input${errors.shippingZip ? ' error' : ''}`}
                placeholder="123456"
                value={shipping.shippingZip}
                onChange={(e) => setShipping({ ...shipping, shippingZip: e.target.value })}
              />
              {errors.shippingZip && <p className="form-error">{errors.shippingZip}</p>}
            </div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                marginTop: '8px',
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
              }}
            >
              <input
                type="checkbox"
                checked={rememberShipping}
                onChange={(e) => setRememberShipping(e.target.checked)}
              />
              Remember this shipping address for my next orders (saved on this device)
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="checkout-form-section">
            <h2>Payment Method</h2>
            {errors.paymentMethod && <p className="form-error" style={{ marginBottom: '12px' }}>{errors.paymentMethod}</p>}
            <div className="payment-options">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  className={`payment-option${payment.paymentMethod === method ? ' selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={payment.paymentMethod === method}
                    onChange={() => setPayment({ ...payment, paymentMethod: method })}
                  />
                  {method}
                </label>
              ))}
            </div>

            {payment.paymentMethod === 'UPI' && (
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">UPI ID *</label>
                <input
                  type="text"
                  className={`form-input${errors.upiId ? ' error' : ''}`}
                  placeholder="yourname@paytm or yourname@ybl"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  autoComplete="off"
                />
                {errors.upiId && <p className="form-error">{errors.upiId}</p>}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Enter the UPI ID you will use to pay. This is stored with your order notes for reference.
                </p>
              </div>
            )}

            {['Credit Card', 'Debit Card'].includes(payment.paymentMethod) && (
              <>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    className={`form-input${errors.cardNumber ? ' error' : ''}`}
                    placeholder="1234 5678 9012 3456"
                    value={payment.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    maxLength={19}
                  />
                  {errors.cardNumber && <p className="form-error">{errors.cardNumber}</p>}
                </div>
                <div className="checkout-form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className={`form-input${errors.cardExpiry ? ' error' : ''}`}
                      placeholder="MM/YY"
                      value={payment.cardExpiry}
                      onChange={(e) => setPayment({ ...payment, cardExpiry: e.target.value })}
                      maxLength={5}
                    />
                    {errors.cardExpiry && <p className="form-error">{errors.cardExpiry}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input
                      type="password"
                      className={`form-input${errors.cardCvv ? ' error' : ''}`}
                      placeholder="***"
                      value={payment.cardCvv}
                      onChange={(e) => setPayment({ ...payment, cardCvv: e.target.value })}
                      maxLength={4}
                    />
                    {errors.cardCvv && <p className="form-error">{errors.cardCvv}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Order Notes (optional)</label>
              <textarea
                className="form-textarea"
                placeholder="Any special instructions for your order..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="checkout-form-section">
            <h2>Order Review</h2>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '0.95rem' }}>Shipping To:</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {shipping.shippingAddressLine1}<br />
                {shipping.shippingAddressLine2 && <>{shipping.shippingAddressLine2}<br /></>}
                {shipping.shippingCity}, {shipping.shippingState} — {shipping.shippingZip}
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '8px', fontSize: '0.95rem' }}>Payment:</h4>
              <p style={{ color: 'var(--text-secondary)' }}>{payment.paymentMethod}</p>
              {payment.paymentMethod === 'UPI' && upiId.trim() && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  UPI: {upiId.trim()}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '0.95rem' }}>Items ({cartItems.length}):</h4>
              {cartItems.map((item) => {
                const p = item.product || item;
                return (
                  <div key={item._id} className="order-item-row">
                    <div className="order-item-img">
                      <img src={getProductImageUrl(item)} alt={p.name} />
                    </div>
                    <div className="order-item-details">
                      <h4>{p.name}</h4>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="order-item-price">
                      ₹{((p.price || 0) * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ borderTop: '2px solid var(--border-light)', paddingTop: '16px' }}>
              <div className="order-summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="order-summary-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
              </div>
              <div className="order-summary-row">
                <span>Tax (GST 18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="order-summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        <div className="checkout-actions">
          {step > 0 ? (
            <button className="btn btn-ghost" onClick={handleBack}>Back</button>
          ) : (
            <div />
          )}
          {step < 2 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Continue
            </button>
          ) : (
            <button
              className="btn btn-primary btn-lg"
              onClick={handlePlaceOrder}
              disabled={submitting}
            >
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
