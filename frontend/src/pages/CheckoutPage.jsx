import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const PAYMENT_METHODS = ['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'];

const STEPS = ['Shipping', 'Payment', 'Review'];

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
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

  const [orderNotes, setOrderNotes] = useState('');

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
    setSubmitting(true);
    try {
      const orderData = {
        shippingAddressLine1: shipping.shippingAddressLine1,
        shippingCity: shipping.shippingCity,
        shippingState: shipping.shippingState,
        shippingZip: shipping.shippingZip,
        paymentMethod: payment.paymentMethod,
        orderNotes,
      };

      const { data } = await api.post('/orders', orderData);
      if (data.success) {
        await clearCart();
        toast.success('Order placed successfully!');
        navigate(`/orders/${data.data._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
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
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '0.95rem' }}>Items ({cartItems.length}):</h4>
              {cartItems.map((item) => {
                const p = item.product || item;
                return (
                  <div key={item._id} className="order-item-row">
                    <div className="order-item-img">
                      <img src={p.images?.[0] || '/placeholder.png'} alt={p.name} />
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
