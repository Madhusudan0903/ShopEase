const { body } = require('express-validator');

/** After validation, controller reads normalized fields from req.orderBody */
const createOrderValidation = [
  body().custom((_, { req }) => {
    const b = req.body || {};
    const line1 = (b.shipping_address_line1 || b.shipping_address || b.shippingAddressLine1 || '').trim();
    if (line1.length < 5) {
      throw new Error('Shipping address is required (min 5 characters)');
    }

    const city = (b.shipping_city || b.shippingCity || '').trim();
    if (city.length < 2) {
      throw new Error('Shipping city is required');
    }

    const state = (b.shipping_state || b.shippingState || '').trim();
    if (state.length < 2) {
      throw new Error('Shipping state is required');
    }

    const zip = String(b.shipping_zip || b.shippingZip || '').trim();
    if (!/^\d{5,6}$/.test(zip)) {
      throw new Error('Shipping zip must be 5 or 6 digits');
    }

    const rawPm = b.payment_method || b.paymentMethod;
    if (!rawPm || !String(rawPm).trim()) {
      throw new Error('Payment method is required');
    }

    const s = String(rawPm).toLowerCase();
    let payment_method;
    if (s.includes('credit')) payment_method = 'credit_card';
    else if (s.includes('debit')) payment_method = 'debit_card';
    else if (s.includes('upi')) payment_method = 'upi';
    else if (s.includes('cash') || s === 'cod') payment_method = 'cod';
    else if (['credit_card', 'debit_card', 'upi', 'cod'].includes(s.replace(/\s/g, '_'))) {
      payment_method = s.replace(/\s/g, '_');
    } else {
      throw new Error('Invalid payment method');
    }

    let order_notes = (b.order_notes || b.orderNotes || '').trim() || null;
    if (payment_method === 'upi') {
      const upiRaw = (b.upi_id || b.upiId || '').trim();
      if (!upiRaw) {
        throw new Error('UPI ID is required for UPI payment');
      }
      if (!/^[\w.\-]{2,256}@[\w.\-]{2,64}$/.test(upiRaw)) {
        throw new Error('Enter a valid UPI ID (e.g. yourname@paytm)');
      }
      const upiPart = `UPI: ${upiRaw}`;
      order_notes = order_notes ? `${order_notes} | ${upiPart}` : upiPart;
    }

    req.orderBody = {
      shipping_address_line1: line1,
      shipping_address_line2: (b.shipping_address_line2 || b.shippingAddressLine2 || '').trim() || null,
      shipping_city: city,
      shipping_state: state,
      shipping_zip: zip,
      payment_method,
      order_notes,
      payment_status: 'completed',
    };

    return true;
  }),
];

const updateStatusValidation = [
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'])
    .withMessage('Invalid status value'),
];

module.exports = { createOrderValidation, updateStatusValidation };
