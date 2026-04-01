const db = require('../config/database');

const CartModel = {
  async getByUserId(userId) {
    const [rows] = await db.query(
      `SELECT c.id, c.product_id, c.quantity, c.created_at, c.updated_at,
              p.name, p.price, p.image_url, p.sku, p.stock_quantity as stock, p.is_active
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?
       ORDER BY c.created_at DESC`,
      [userId]
    );
    return rows;
  },

  async addItem(userId, productId, quantity) {
    const [result] = await db.query(
      `INSERT INTO cart (user_id, product_id, quantity)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity), updated_at = NOW()`,
      [userId, productId, quantity]
    );
    return result.insertId || result.affectedRows > 0;
  },

  async updateQuantity(id, userId, quantity) {
    const [result] = await db.query(
      'UPDATE cart SET quantity = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
      [quantity, id, userId]
    );
    return result.affectedRows > 0;
  },

  async removeItem(id, userId) {
    const [result] = await db.query(
      'DELETE FROM cart WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  },

  async clearCart(userId) {
    const [result] = await db.query('DELETE FROM cart WHERE user_id = ?', [userId]);
    return result.affectedRows;
  },

  async getCartTotal(userId) {
    const [[result]] = await db.query(
      `SELECT COALESCE(SUM(c.quantity * p.price), 0) as total
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?`,
      [userId]
    );
    return parseFloat(result.total);
  },

  async getCartItemCount(userId) {
    const [[result]] = await db.query(
      'SELECT COALESCE(SUM(quantity), 0) as count FROM cart WHERE user_id = ?',
      [userId]
    );
    return parseInt(result.count, 10);
  },

  async getItemByProductId(userId, productId) {
    const [rows] = await db.query(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
    return rows[0] || null;
  },

  async getItemById(id, userId) {
    const [rows] = await db.query(
      `SELECT c.*, p.stock_quantity as stock, p.name, p.price, p.is_active
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.id = ? AND c.user_id = ?`,
      [id, userId]
    );
    return rows[0] || null;
  },
};

module.exports = CartModel;
