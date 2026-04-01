const db = require('../config/database');

const OrderModel = {
  async create(userId, cartItems, orderData) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * Number(item.quantity),
        0
      );

      const [orderResult] = await connection.query(
        `INSERT INTO orders (
           user_id, total_amount,
           shipping_address_line1, shipping_address_line2,
           shipping_city, shipping_state, shipping_zip,
           payment_method, payment_status, order_notes
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          totalAmount,
          orderData.shipping_address_line1,
          orderData.shipping_address_line2 || null,
          orderData.shipping_city,
          orderData.shipping_state,
          orderData.shipping_zip,
          orderData.payment_method,
          orderData.payment_status || 'completed',
          orderData.order_notes || null,
        ]
      );

      const orderId = orderResult.insertId;

      for (const item of cartItems) {
        await connection.query(
          `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
           VALUES (?, ?, ?, ?)`,
          [orderId, item.product_id, item.quantity, item.price]
        );

        const [stockResult] = await connection.query(
          'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ? AND stock_quantity >= ?',
          [item.quantity, item.product_id, item.quantity]
        );

        if (stockResult.affectedRows === 0) {
          await connection.rollback();
          return { success: false, message: `Insufficient stock for product: ${item.name}` };
        }
      }

      await connection.query(
        `INSERT INTO order_status (order_id, status, notes) VALUES (?, 'placed', ?)`,
        [orderId, 'Order placed successfully']
      );

      await connection.query('DELETE FROM cart WHERE user_id = ?', [userId]);

      await connection.commit();
      return { success: true, orderId, totalAmount };
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
              (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) AS item_count,
              (SELECT status FROM order_status WHERE order_id = o.id ORDER BY created_at DESC LIMIT 1) AS fulfillment_status
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
      `SELECT o.*,
              CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS customer_name,
              u.email AS customer_email,
              (SELECT status FROM order_status WHERE order_id = o.id ORDER BY created_at DESC LIMIT 1) AS fulfillment_status
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );

    if (!orders[0]) return null;

    const [items] = await db.query(
      `SELECT oi.*, p.name, p.image_url
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [id]
    );

    const [statusHistory] = await db.query(
      'SELECT * FROM order_status WHERE order_id = ? ORDER BY created_at ASC',
      [id]
    );

    const row = orders[0];
    return {
      ...row,
      status: row.fulfillment_status,
      items,
      statusHistory,
    };
  },

  async getAllOrders(page = 1, limit = 10, status = null) {
    const offset = (page - 1) * limit;
    let query = `SELECT o.*,
                        CONCAT(COALESCE(u.first_name, ''), ' ', COALESCE(u.last_name, '')) AS customer_name,
                        u.email AS customer_email,
                        (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) AS item_count
                 FROM orders o
                 LEFT JOIN users u ON o.user_id = u.id`;
    const params = [];

    if (status) {
      query += ` WHERE o.id IN (SELECT order_id FROM order_status WHERE status = ?)`;
      params.push(status);
    }

    const countSql = status
      ? 'SELECT COUNT(*) AS total FROM orders o WHERE o.id IN (SELECT order_id FROM order_status WHERE status = ?)'
      : 'SELECT COUNT(*) AS total FROM orders o';
    const [[{ total }]] = await db.query(countSql, status ? [status] : []);

    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [orders] = await db.query(query, params);

    return { orders, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async updateStatus(id, status) {
    const [result] = await db.query(
      'INSERT INTO order_status (order_id, status, notes) VALUES (?, ?, ?)',
      [id, status, `Status set to ${status}`]
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

      const [latest] = await connection.query(
        'SELECT status FROM order_status WHERE order_id = ? ORDER BY created_at DESC LIMIT 1',
        [id]
      );
      const currentStatus = latest[0]?.status;
      if (!['placed', 'confirmed'].includes(currentStatus)) {
        await connection.rollback();
        return { success: false, message: 'Order cannot be cancelled at this stage' };
      }

      const [orderItems] = await connection.query(
        'SELECT * FROM order_items WHERE order_id = ?',
        [id]
      );

      for (const item of orderItems) {
        if (item.product_id) {
          await connection.query(
            'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?',
            [item.quantity, item.product_id]
          );
        }
      }

      await connection.query(
        `INSERT INTO order_status (order_id, status, notes) VALUES (?, 'cancelled', ?)`,
        [id, 'Order cancelled by customer']
      );

      await connection.commit();
      return { success: true, message: 'Order cancelled successfully' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },
};

module.exports = OrderModel;
