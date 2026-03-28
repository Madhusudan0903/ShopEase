const db = require('../config/database');

const CartModel = {
  async getByUserId(userId) {
    const [rows] = await db.query(
      `SELECT ci.id, ci.product_id, ci.quantity, ci.created_at, ci.updated_at,
              p.name, p.price, p.image_url, p.stock, p.is_active
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?
       ORDER BY ci.created_at DESC`,
      [userId]
    );
    return rows;
  },

  async addItem(userId, productId, quantity) {
    const [result] = await db.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity), updated_at = NOW()`,
      [userId, productId, quantity]
    );
    return result.insertId || result.affectedRows > 0;
  },

  async updateQuantity(id, userId, quantity) {
    const [result] = await db.query(
      'UPDATE cart_items SET quantity = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
      [quantity, id, userId]
    );
    return result.affectedRows > 0;
  },

  async removeItem(id, userId) {
    const [result] = await db.query(
      'DELETE FROM cart_items WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  },

  async clearCart(userId) {
    const [result] = await db.query(
      'DELETE FROM cart_items WHERE user_id = ?',
      [userId]
    );
    return result.affectedRows;
  },

  async getCartTotal(userId) {
    const [[result]] = await db.query(
      `SELECT COALESCE(SUM(ci.quantity * p.price), 0) as total
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?`,
      [userId]
    );
    return parseFloat(result.total);
  },

  async getCartItemCount(userId) {
    const [[result]] = await db.query(
      'SELECT COALESCE(SUM(quantity), 0) as count FROM cart_items WHERE user_id = ?',
      [userId]
    );
    return parseInt(result.count);
  },

  async getItemByProductId(userId, productId) {
    const [rows] = await db.query(
      'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows[0] || null;
  },

  async getItemById(id, userId) {
    const [rows] = await db.query(
      `SELECT ci.*, p.stock, p.name, p.price, p.is_active
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.id = ? AND ci.user_id = ?`,
      [id, userId]
    );
    return rows[0] || null;
  }
};

module.exports = CartModel;
