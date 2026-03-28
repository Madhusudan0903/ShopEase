const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { addToCartValidation, updateCartValidation } = require('../validators/cartValidator');

router.use(verifyToken);

router.get('/', cartController.getCart);
router.post('/', addToCartValidation, validate, cartController.addToCart);
router.put('/:id', updateCartValidation, validate, cartController.updateCartItem);
router.delete('/clear', cartController.clearCart);
router.delete('/:id', cartController.removeFromCart);

module.exports = router;
