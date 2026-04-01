const db = require('../config/database');

const UserModel = {
  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await db.query(
      `SELECT id, first_name, last_name, email, phone, role,
              address_line1, address_line2, city, state, zip_code,
              is_active, created_at, updated_at
       FROM users WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(userData) {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      role = 'customer',
      address_line1,
      city,
      state,
      zip_code,
    } = userData;

    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, phone, role, address_line1, city, state, zip_code)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        password,
        phone || null,
        role,
        address_line1 || null,
        city || null,
        state || null,
        zip_code || null,
      ]
    );

    return {
      id: result.insertId,
      first_name,
      last_name,
      email,
      phone,
      role,
    };
  },

  async update(id, userData) {
    const allowedFields = [
      'first_name',
      'last_name',
      'email',
      'phone',
      'password_hash',
      'address_line1',
      'address_line2',
      'city',
      'state',
      'zip_code',
    ];
    const fields = [];
    const values = [];

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
      `SELECT id, first_name, last_name, email, phone, role, is_active, created_at, updated_at
       FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const [[{ total }]] = await db.query('SELECT COUNT(*) as total FROM users');
    return { users: rows, total, page, limit, totalPages: Math.ceil(total / limit) };
  },
};

module.exports = UserModel;
