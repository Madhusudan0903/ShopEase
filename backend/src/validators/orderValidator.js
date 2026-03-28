const { body } = require('express-validator');

const createOrderValidation = [
  body('shipping_address')
    .trim()
    .notEmpty().withMessage('Shipping address is required')
    .isLength({ min: 5, max: 255 }).withMessage('Shipping address must be between 5 and 255 characters'),

  body('shipping_city')
    .trim()
    .notEmpty().withMessage('Shipping city is required')
    .isLength({ min: 2, max: 100 }).withMessage('Shipping city must be between 2 and 100 characters'),

  body('shipping_state')
    .trim()
    .notEmpty().withMessage('Shipping state is required')
    .isLength({ min: 2, max: 100 }).withMessage('Shipping state must be between 2 and 100 characters'),

  body('shipping_zip')
    .trim()
    .notEmpty().withMessage('Shipping zip code is required')
    .matches(/^\d{5,6}$/).withMessage('Shipping zip code must be 5 or 6 digits'),

  body('payment_method')
    .trim()
    .notEmpty().withMessage('Payment method is required')
    .isIn(['credit_card', 'debit_card', 'upi', 'net_banking', 'cod'])
    .withMessage('Payment method must be one of: credit_card, debit_card, upi, net_banking, cod')
];

const updateStatusValidation = [
  body('status')
    .trim()
    .notEmpty().withMessage('Status is required')
    .isIn(['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Status must be one of: placed, confirmed, processing, shipped, delivered, cancelled')
];

module.exports = { createOrderValidation, updateStatusValidation };
