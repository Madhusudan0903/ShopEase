const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', verifyToken, isAdmin, categoryController.create);
router.put('/:id', verifyToken, isAdmin, categoryController.update);
router.delete('/:id', verifyToken, isAdmin, categoryController.delete);

module.exports = router;
