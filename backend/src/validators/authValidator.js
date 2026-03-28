const { body } = require('express-validator');

const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number'),

  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Address must not exceed 255 characters'),

  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('City must not exceed 100 characters'),

  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('State must not exceed 100 characters'),

  body('zip_code')
    .optional()
    .trim()
    .matches(/^\d{5,6}$/).withMessage('Zip code must be 5 or 6 digits')
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
];

const updateProfileValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  body('phone')
    .optional()
    .matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),

  body('address')
    .optional()
    .trim()
    .isLength({ max: 255 }).withMessage('Address must not exceed 255 characters'),

  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('City must not exceed 100 characters'),

  body('state')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('State must not exceed 100 characters'),

  body('zip_code')
    .optional()
    .trim()
    .matches(/^\d{5,6}$/).withMessage('Zip code must be 5 or 6 digits')
];

module.exports = { registerValidation, loginValidation, updateProfileValidation };
