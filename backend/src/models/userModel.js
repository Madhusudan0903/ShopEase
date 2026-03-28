const db = require('../config/database');

const UserModel = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role, address, city, state, zip_code, is_active, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(userData) {
    const { name, email, password, phone, role = 'customer', address, city, state, zip_code } = userData;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone, role, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, password, phone, role, address || null, city || null, state || null, zip_code || null]
    );
    return { id: result.insertId, name, email, phone, role };
  },

  async update(id, userData) {
    const fields = [];
    const values = [];

    const allowedFields = ['name', 'email', 'phone', 'password', 'address', 'city', 'state', 'zip_code'];
    for (const field of allowedFields) {
      if (userData[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(userData[field]);
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const [result] = await db.query(
      `UPDATE users SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  },

  async deactivate(id) {
    const [result] = await db.query(
      'UPDATE users SET is_active = false, updated_at = NOW() WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role, is_active, created_at, updated_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM users');
    return { users: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
};

module.exports = UserModel;
