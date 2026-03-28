const db = require('../config/database');

const CategoryModel = {
  async getAll() {
    const [rows] = await db.query(
      'SELECT c.*, COUNT(p.id) as product_count FROM categories c LEFT JOIN products p ON c.id = p.category_id AND p.is_active = true GROUP BY c.id ORDER BY c.name ASC'
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create(categoryData) {
    const { name, description, image_url } = categoryData;
    const [result] = await db.query(
      'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)',
      [name, description || null, image_url || null]
    );
    return { id: result.insertId, name, description, image_url };
  },

  async update(id, categoryData) {
    const fields = [];
    const values = [];

    const allowedFields = ['name', 'description', 'image_url'];
    for (const field of allowedFields) {
      if (categoryData[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(categoryData[field]);
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const [result] = await db.query(
      `UPDATE categories SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [productCheck] = await db.query(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND is_active = true',
      [id]
    );
    if (productCheck[0].count > 0) {
      return { deleted: false, reason: 'Category has active products' };
    }

    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    return { deleted: result.affectedRows > 0 };
  }
};

module.exports = CategoryModel;
