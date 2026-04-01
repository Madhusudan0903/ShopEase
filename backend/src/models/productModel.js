const db = require('../config/database');

/** Aggregates so list + detail views show star rating and review count */
const REVIEW_AGG = `
  (SELECT ROUND(AVG(r.rating), 1) FROM reviews r WHERE r.product_id = p.id) AS average_rating,
  (SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id) AS review_count`;

const ProductModel = {
  async getAll(filters = {}) {
    let query = `SELECT p.*, c.name as category_name, ${REVIEW_AGG} FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1`;
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
      query += ' AND LOWER(TRIM(p.brand)) LIKE LOWER(?)';
      params.push(`%${String(filters.brand).trim()}%`);
    }

    if (filters.minRating !== undefined && filters.minRating !== '') {
      query += ` AND (
        SELECT COALESCE(AVG(r.rating), 0) FROM reviews r WHERE r.product_id = p.id
      ) >= ?`;
      params.push(filters.minRating);
    }

    if (filters.search && String(filters.search).trim()) {
      const words = String(filters.search)
        .trim()
        .split(/\s+/)
        .filter(Boolean);
      for (const w of words) {
        const like = `%${w}%`;
        query += ` AND (
          LOWER(p.name) LIKE LOWER(?) OR LOWER(COALESCE(p.description, '')) LIKE LOWER(?)
          OR LOWER(COALESCE(p.brand, '')) LIKE LOWER(?)
        )`;
        params.push(like, like, like);
      }
    }

    if (filters.isActive !== undefined) {
      query += ' AND p.is_active = ?';
      params.push(filters.isActive);
    } else {
      query += ' AND p.is_active = true';
    }

    let countQuery = query.replace(/^SELECT[\s\S]+?FROM products p/, 'SELECT COUNT(*) as total FROM products p');
    const [[{ total }]] = await db.query(countQuery, params);

    const sortOptions = {
      price_asc: 'p.price ASC',
      price_desc: 'p.price DESC',
      name_asc: 'p.name ASC',
      name_desc: 'p.name DESC',
      newest: 'p.created_at DESC',
      oldest: 'p.created_at ASC',
      rating:
        '(SELECT COALESCE(AVG(rating), 0) FROM reviews r WHERE r.product_id = p.id) DESC, p.created_at DESC',
      popularity:
        '(SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id) DESC, p.created_at DESC',
    };

    const sortBy = sortOptions[filters.sort] || 'p.created_at DESC';
    query += ` ORDER BY ${sortBy}`;

    const page = parseInt(filters.page, 10) || 1;
    const limit = parseInt(filters.limit, 10) || 10;
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.query(query, params);

    return {
      products: rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  async getById(id) {
    const [rows] = await db.query(
      `SELECT p.*, c.name as category_name, ${REVIEW_AGG} FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(productData) {
    const { name, description, price, category_id, stock, sku, brand, image_url } = productData;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, category_id, stock_quantity, sku, brand, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, category_id, stock || 0, sku || null, brand || null, image_url || null]
    );
    return { id: result.insertId, ...productData };
  },

  async update(id, productData) {
    const fields = [];
    const values = [];

    const allowedFields = [
      'name',
      'description',
      'price',
      'category_id',
      'stock_quantity',
      'sku',
      'brand',
      'image_url',
      'is_active',
    ];
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
      'UPDATE products SET stock_quantity = stock_quantity + ?, updated_at = NOW() WHERE id = ? AND (stock_quantity + ?) >= 0',
      [quantity, id, quantity]
    );
    return result.affectedRows > 0;
  },

  async getLowStock(threshold = 10) {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE stock_quantity <= ? AND is_active = true ORDER BY stock_quantity ASC',
      [threshold]
    );
    return rows;
  },
};

module.exports = ProductModel;
