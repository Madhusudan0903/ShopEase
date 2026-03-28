const db = require('../config/database');

const ProductModel = {
  async getAll(filters = {}) {
    let query = 'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1';
    const params = [];

    if (filters.category) {
      query += ' AND p.category_id = ?';
      params.push(filters.category);
    }

    if (filters.minPrice !== undefined) {
      query += ' AND p.price >= ?';
      params.push(filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      query += ' AND p.price <= ?';
      params.push(filters.maxPrice);
    }

    if (filters.brand) {
      query += ' AND p.brand = ?';
      params.push(filters.brand);
    }

    if (filters.minRating !== undefined) {
      query += ' AND p.average_rating >= ?';
      params.push(filters.minRating);
    }

    if (filters.search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.isActive !== undefined) {
      query += ' AND p.is_active = ?';
      params.push(filters.isActive);
    } else {
      query += ' AND p.is_active = true';
    }

    let countQuery = query.replace('SELECT p.*, c.name as category_name', 'SELECT COUNT(*) as total');
    const [[{ total }]] = await db.query(countQuery, params);

    const sortOptions = {
      'price_asc': 'p.price ASC',
      'price_desc': 'p.price DESC',
      'name_asc': 'p.name ASC',
      'name_desc': 'p.name DESC',
      'newest': 'p.created_at DESC',
      'oldest': 'p.created_at ASC',
      'rating': 'p.average_rating DESC',
      'popularity': 'p.total_reviews DESC'
    };

    const sortBy = sortOptions[filters.sort] || 'p.created_at DESC';
    query += ` ORDER BY ${sortBy}`;

    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.query(query, params);

    return {
      products: rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  },

  async getById(id) {
    const [rows] = await db.query(
      'SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?',
      [id]
    );
    return rows[0] || null;
  },

  async create(productData) {
    const { name, description, price, category_id, stock, sku, brand, image_url } = productData;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, category_id, stock, sku, brand, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, category_id, stock || 0, sku || null, brand || null, image_url || null]
    );
    return { id: result.insertId, ...productData };
  },

  async update(id, productData) {
    const fields = [];
    const values = [];

    const allowedFields = ['name', 'description', 'price', 'category_id', 'stock', 'sku', 'brand', 'image_url', 'is_active'];
    for (const field of allowedFields) {
      if (productData[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(productData[field]);
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const [result] = await db.query(
      `UPDATE products SET ${fields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query(
      'UPDATE products SET is_active = false, updated_at = NOW() WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  async updateStock(id, quantity) {
    const [result] = await db.query(
      'UPDATE products SET stock = stock + ?, updated_at = NOW() WHERE id = ? AND (stock + ?) >= 0',
      [quantity, id, quantity]
    );
    return result.affectedRows > 0;
  },

  async getLowStock(threshold = 10) {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE stock <= ? AND is_active = true ORDER BY stock ASC',
      [threshold]
    );
    return rows;
  }
};

module.exports = ProductModel;
