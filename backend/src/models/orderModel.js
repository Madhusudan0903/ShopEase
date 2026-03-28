const db = require('../config/database');
const { generateOrderNumber } = require('../utils/helpers');

const OrderModel = {
  async create(userId, cartItems, orderData) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const orderNumber = generateOrderNumber();
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const [orderResult] = await connection.query(
        `INSERT INTO orders (user_id, order_number, total_amount, shipping_address, shipping_city, shipping_state, shipping_zip, payment_method, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'placed')`,
        [
          userId, orderNumber, totalAmount,
          orderData.shipping_address, orderData.shipping_city,
          orderData.shipping_state, orderData.shipping_zip,
          orderData.payment_method
        ]
      );

      const orderId = orderResult.insertId;

      for (const item of cartItems) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
        );

        const [stockResult] = await connection.query(
          'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
          [item.quantity, item.product_id, item.quantity]
        );

        if (stockResult.affectedRows === 0) {
          await connection.rollback();
          return { success: false, message: `Insufficient stock for product: ${item.name}` };
        }
      }

      await connection.query(
        "INSERT INTO order_status_history (order_id, status, notes) VALUES (?, 'placed', 'Order placed successfully')",
        [orderId]
      );

      await connection.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);

      await connection.commit();
      return { success: true, orderId, orderNumber, totalAmount };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async getByUserId(userId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [orders] = await db.query(
      `SELECT o.*, 
              (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
       FROM orders o
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    const [[{ total }]] = await db.query(
      'SELECT COUNT(*) as total FROM orders WHERE user_id = ?',
      [userId]
    );

    return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async getById(id) {
    const [orders] = await db.query(
      `SELECT o.*, u.name as customer_name, u.email as customer_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );

    if (!orders[0]) return null;

    const [items] = await db.query(
      `SELECT oi.*, p.name, p.image_url
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    const [statusHistory] = await db.query(
      'SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC',
      [id]
    );

    return { ...orders[0], items, statusHistory };
  },

  async getAllOrders(page = 1, limit = 10, status = null) {
    const offset = (page - 1) * limit;
    let query = `SELECT o.*, u.name as customer_name, u.email as customer_email,
                        (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
                 FROM orders o
                 JOIN users u ON o.user_id = u.id`;
    const params = [];

    if (status) {
      query += ' WHERE o.status = ?';
      params.push(status);
    }

    let countQuery = query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) as total FROM');
    if (countQuery.includes('JOIN users')) {
      countQuery = `SELECT COUNT(*) as total FROM orders o JOIN users u ON o.user_id = u.id${status ? ' WHERE o.status = ?' : ''}`;
    }
    const [[{ total }]] = await db.query(countQuery, status ? [status] : []);

    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [orders] = await db.query(query, params);

    return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async updateStatus(id, status) {
    const [result] = await db.query(
      'UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  },

  async cancelOrder(id, userId) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const [orders] = await connection.query(
        'SELECT * FROM orders WHERE id = ? AND user_id = ?',
        [id, userId]
      );

      if (!orders[0]) {
        await connection.rollback();
        return { success: false, message: 'Order not found' };
      }

      if (!['placed', 'confirmed'].includes(orders[0].status)) {
        await connection.rollback();
        return { success: false, message: 'Order cannot be cancelled at this stage' };
      }

      const [items] = await connection.query(
        'SELECT * FROM order_items WHERE order_id = ?',
        [id]
      );

      for (const item of items) {
        await connection.query(
          'UPDATE products SET stock = stock + ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }

      await connection.query(
        "UPDATE orders SET status = 'cancelled', updated_at = NOW() WHERE id = ?",
        [id]
      );

      await connection.query(
        "INSERT INTO order_status_history (order_id, status, notes) VALUES (?, 'cancelled', 'Order cancelled by customer')",
        [id]
      );

      await connection.commit();
      return { success: true, message: 'Order cancelled successfully' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = OrderModel;
