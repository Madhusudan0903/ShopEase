const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { registerValidation, loginValidation, updateProfileValidation } = require('../validators/authValidator');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.get('/profile', verifyToken, authController.getProfile);
router.put('/profile', verifyToken, updateProfileValidation, validate, authController.updateProfile);

module.exports = router;
