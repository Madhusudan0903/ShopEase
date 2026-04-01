const db = require('../config/database');

const ReviewModel = {
  async getByProductId(productId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await db.query(
      `SELECT r.*,
              CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS user_name
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.product_id = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [productId, limit, offset]
    );

    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) as total FROM reviews WHERE product_id = ?',
      [productId]
    );

    return { reviews: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async create(reviewData) {
    const { user_id, product_id, rating, title, comment } = reviewData;
    const [result] = await db.query(
      'INSERT INTO reviews (user_id, product_id, rating, title, comment) VALUES (?, ?, ?, ?, ?)',
      [user_id, product_id, rating, title, comment]
    );

    await ReviewModel.updateProductRating(product_id);

    return { id: result.insertId, ...reviewData };
  },

  async update(id, reviewData) {
    const fields = [];
    const values = [];

    const allowedFields = ['rating', 'title', 'comment'];
    for (const field of allowedFields) {
      if (reviewData[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(reviewData[field]);
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const [result] = await db.query(
      `UPDATE reviews SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );

    if (result.affectedRows > 0 && reviewData.product_id) {
      await ReviewModel.updateProductRating(reviewData.product_id);
    }

    return result.affectedRows > 0;
  },

  async delete(id) {
    const review = await ReviewModel.findById(id);
    const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);

    if (result.affectedRows > 0 && review) {
      await ReviewModel.updateProductRating(review.product_id);
    }

    return result.affectedRows > 0;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async getByUserId(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await db.query(
      `SELECT r.*, p.name as product_name, p.image_url as product_image,
              CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS user_name
       FROM reviews r
       JOIN products p ON r.product_id = p.id
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) as total FROM reviews WHERE user_id = ?',
      [userId]
    );

    return { reviews: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async checkExisting(userId, productId) {
    const [rows] = await db.query(
      'SELECT id FROM reviews WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows.length > 0;
  },

  async getProductRating(productId) {
    const [[result]] = await db.query(
      'SELECT AVG(rating) as average_rating, COUNT(*) as total_reviews FROM reviews WHERE product_id = ?',
      [productId]
    );
    return {
      averageRating: result.average_rating ? parseFloat(result.average_rating).toFixed(1) : 0,
      totalReviews: result.total_reviews
    };
  },

  async updateProductRating(/* productId */) {
    /* Optional denormalized columns not in base schema */
  },
};

module.exports = ReviewModel;
