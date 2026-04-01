const ReviewModel = require('../models/reviewModel');
const ProductModel = require('../models/productModel');
const db = require('../config/database');
const { formatResponse } = require('../utils/helpers');

const reviewController = {
  async createReview(req, res, next) {
    try {
      const { product_id, rating, title, comment } = req.body;
      const userId = req.user.id;

      const product = await ProductModel.getById(product_id);
      if (!product) {
        return res.status(404).json(formatResponse(false, 'Product not found', null));
      }

      const hasExisting = await ReviewModel.checkExisting(userId, product_id);
      if (hasExisting) {
        return res.status(409).json(formatResponse(false, 'You have already reviewed this product', null));
      }

      // Eligible if this product appears on an order for this user whose *latest*
      // status is not cancelled/returned. New checkout orders are only ever `placed`
      // until an admin advances them — requiring `delivered` blocked all real reviews.
      const [purchaseCheck] = await db.query(
        `SELECT oi.id FROM order_items oi
         INNER JOIN orders o ON oi.order_id = o.id
         WHERE o.user_id = ? AND oi.product_id = ?
           AND oi.product_id IS NOT NULL
           AND (
             SELECT os.status FROM order_status os
             WHERE os.order_id = o.id
             ORDER BY os.created_at DESC, os.id DESC
             LIMIT 1
           ) NOT IN ('cancelled', 'returned')
         LIMIT 1`,
        [userId, product_id]
      );

      if (purchaseCheck.length === 0) {
        return res.status(403).json(
          formatResponse(
            false,
            'You can only review products you have ordered (cancelled or returned orders do not qualify)',
            null
          )
        );
      }

      const review = await ReviewModel.create({
        user_id: userId,
        product_id,
        rating,
        title,
        comment
      });

      res.status(201).json(formatResponse(true, 'Review created successfully', { review }));
    } catch (error) {
      next(error);
    }
  },

  async updateReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const userId = req.user.id;

      const review = await ReviewModel.findById(reviewId);
      if (!review) {
        return res.status(404).json(formatResponse(false, 'Review not found', null));
      }

      if (review.user_id !== userId) {
        return res.status(403).json(formatResponse(false, 'Access denied. You can only edit your own reviews', null));
      }

      const updateData = { ...req.body, product_id: review.product_id };
      const updated = await ReviewModel.update(reviewId, updateData);

      if (!updated) {
        return res.status(400).json(formatResponse(false, 'No fields to update', null));
      }

      const updatedReview = await ReviewModel.findById(reviewId);
      res.status(200).json(formatResponse(true, 'Review updated successfully', { review: updatedReview }));
    } catch (error) {
      next(error);
    }
  },

  async deleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const userId = req.user.id;

      const review = await ReviewModel.findById(reviewId);
      if (!review) {
        return res.status(404).json(formatResponse(false, 'Review not found', null));
      }

      if (review.user_id !== userId && req.user.role !== 'admin') {
        return res.status(403).json(formatResponse(false, 'Access denied. You can only delete your own reviews', null));
      }

      await ReviewModel.delete(reviewId);

      res.status(200).json(formatResponse(true, 'Review deleted successfully', null));
    } catch (error) {
      next(error);
    }
  },

  async getProductReviews(req, res, next) {
    try {
      const productId = req.params.productId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const product = await ProductModel.getById(productId);
      if (!product) {
        return res.status(404).json(formatResponse(false, 'Product not found', null));
      }

      const result = await ReviewModel.getByProductId(productId, page, limit);
      const ratingInfo = await ReviewModel.getProductRating(productId);

      res.status(200).json(formatResponse(true, 'Product reviews retrieved successfully', {
        ...result,
        averageRating: ratingInfo.averageRating,
        totalReviews: ratingInfo.totalReviews
      }));
    } catch (error) {
      next(error);
    }
  },

  async getMyReviews(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await ReviewModel.getByUserId(req.user.id, page, limit);

      res.status(200).json(formatResponse(true, 'Your reviews retrieved successfully', result));
    } catch (error) {
      next(error);
    }
  }
};

module.exports = reviewController;
