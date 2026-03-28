const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createOrderValidation, updateStatusValidation } = require('../validators/orderValidator');

router.post('/', verifyToken, createOrderValidation, validate, orderController.createOrder);
router.get('/my-orders', verifyToken, orderController.getMyOrders);
router.get('/admin/all', verifyToken, isAdmin, orderController.getAllOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.put('/:id/status', verifyToken, isAdmin, updateStatusValidation, validate, orderController.updateOrderStatus);
router.put('/:id/cancel', verifyToken, orderController.cancelOrder);

module.exports = router;
