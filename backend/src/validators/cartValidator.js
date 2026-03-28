const { body } = require('express-validator');

const addToCartValidation = [
  body('product_id')
    .notEmpty().withMessage('Product ID is required')
    .isInt({ gt: 0 }).withMessage('Product ID must be a positive integer'),

  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 1, max: 10 }).withMessage('Quantity must be between 1 and 10')
];

const updateCartValidation = [
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isInt({ min: 1, max: 10 }).withMessage('Quantity must be between 1 and 10')
];

module.exports = { addToCartValidation, updateCartValidation };
