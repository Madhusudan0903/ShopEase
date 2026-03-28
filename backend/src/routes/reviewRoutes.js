const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createReviewValidation, updateReviewValidation } = require('../validators/reviewValidator');

router.get('/product/:productId', reviewController.getProductReviews);
router.get('/my-reviews', verifyToken, reviewController.getMyReviews);
router.post('/', verifyToken, createReviewValidation, validate, reviewController.createReview);
router.put('/:id', verifyToken, updateReviewValidation, validate, reviewController.updateReview);
router.delete('/:id', verifyToken, reviewController.deleteReview);

module.exports = router;
