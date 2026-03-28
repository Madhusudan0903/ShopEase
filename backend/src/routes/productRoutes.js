const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createProductValidation, updateProductValidation } = require('../validators/productValidator');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', verifyToken, isAdmin, createProductValidation, validate, productController.createProduct);
router.put('/:id', verifyToken, isAdmin, updateProductValidation, validate, productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
