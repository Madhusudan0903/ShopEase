const { body } = require('express-validator');

const passwordRules = body('password')
  .notEmpty().withMessage('Password is required')
  .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
  .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
  .matches(/[0-9]/).withMessage('Password must contain at least one number');

const registerValidation = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 1, max: 50 }).withMessage('First name must be between 1 and 50 characters'),

  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 1, max: 50 }).withMessage('Last name must be between 1 and 50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  passwordRules,

  body('phone')
    .optional({ checkFalsy: true })
    .matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),

  body('address_line1')
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
    .optional({ checkFalsy: true })
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
  body('first_name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('First name must be between 1 and 50 characters'),

  body('last_name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 }).withMessage('Last name must be between 1 and 50 characters'),

  body('phone')
    .optional({ checkFalsy: true })
    .matches(/^\d{10}$/).withMessage('Phone number must be exactly 10 digits'),

  body('address_line1')
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
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\d{5,6}$/).withMessage('Zip code must be 5 or 6 digits')
];

module.exports = { registerValidation, loginValidation, updateProfileValidation };
