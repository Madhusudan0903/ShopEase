const { body } = require('express-validator');

const createProductValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 2, max: 200 }).withMessage('Product name must be between 2 and 200 characters'),

  body('description')
    .trim()
    .notEmpty().withMessage('Product description is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  body('category_id')
    .notEmpty().withMessage('Category is required')
    .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('sku')
    .optional()
    .trim()
    .matches(/^[A-Za-z0-9-]+$/).withMessage('SKU must contain only letters, numbers, and hyphens'),

  body('brand')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Brand name must not exceed 100 characters'),

  body('image_url')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be a valid URL')
];

const updateProductValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 }).withMessage('Product name must be between 2 and 200 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),

  body('price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),

  body('category_id')
    .optional()
    .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('sku')
    .optional()
    .trim()
    .matches(/^[A-Za-z0-9-]+$/).withMessage('SKU must contain only letters, numbers, and hyphens'),

  body('brand')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Brand name must not exceed 100 characters'),

  body('image_url')
    .optional()
    .trim()
    .isURL().withMessage('Image URL must be a valid URL'),

  body('is_active')
    .optional()
    .isBoolean().withMessage('is_active must be a boolean value')
];

module.exports = { createProductValidation, updateProductValidation };
