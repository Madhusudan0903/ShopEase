const db = require('../config/database');

const OrderStatusModel = {
  async getByOrderId(orderId) {
    const [rows] = await db.query(
      'SELECT * FROM order_status WHERE order_id = ? ORDER BY created_at ASC',
      [orderId]
    );
    return rows;
  },

  async addStatus(orderId, status, notes = null) {
    const [result] = await db.query(
      'INSERT INTO order_status (order_id, status, notes) VALUES (?, ?, ?)',
      [orderId, status, notes]
    );
    return { id: result.insertId, orderId, status, notes };
  },

  async getLatestStatus(orderId) {
    const [rows] = await db.query(
      'SELECT * FROM order_status WHERE order_id = ? ORDER BY created_at DESC LIMIT 1',
      [orderId]
    );
    return rows[0] || null;
  },
};

module.exports = OrderStatusModel;
