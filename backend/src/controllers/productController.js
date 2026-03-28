const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel');
const { formatResponse } = require('../utils/helpers');

const productController = {
  async getAllProducts(req, res, next) {
    try {
      const filters = {
        category: req.query.category,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
        brand: req.query.brand,
        minRating: req.query.minRating ? parseFloat(req.query.minRating) : undefined,
        search: req.query.search,
        sort: req.query.sort,
        page: req.query.page,
        limit: req.query.limit
      };

      const result = await ProductModel.getAll(filters);

      res.status(200).json(formatResponse(true, 'Products retrieved successfully', result));
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req, res, next) {
    try {
      const product = await ProductModel.getById(req.params.id);

      if (!product) {
        return res.status(404).json(formatResponse(false, 'Product not found', null));
      }

      res.status(200).json(formatResponse(true, 'Product retrieved successfully', { product }));
    } catch (error) {
      next(error);
    }
  },

  async createProduct(req, res, next) {
    try {
      const { name, description, price, category_id, stock, sku, brand, image_url } = req.body;

      const category = await CategoryModel.getById(category_id);
      if (!category) {
        return res.status(404).json(formatResponse(false, 'Category not found', null));
      }

      const product = await ProductModel.create({
        name, description, price, category_id, stock, sku, brand, image_url
      });

      res.status(201).json(formatResponse(true, 'Product created successfully', { product }));
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) {
        return res.status(404).json(formatResponse(false, 'Product not found', null));
      }

      if (req.body.category_id) {
        const category = await CategoryModel.getById(req.body.category_id);
        if (!category) {
          return res.status(404).json(formatResponse(false, 'Category not found', null));
        }
      }

      const updated = await ProductModel.update(req.params.id, req.body);
      if (!updated) {
        return res.status(400).json(formatResponse(false, 'No fields to update', null));
      }

      const updatedProduct = await ProductModel.getById(req.params.id);
      res.status(200).json(formatResponse(true, 'Product updated successfully', { product: updatedProduct }));
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const product = await ProductModel.getById(req.params.id);
      if (!product) {
        return res.status(404).json(formatResponse(false, 'Product not found', null));
      }

      await ProductModel.delete(req.params.id);

      res.status(200).json(formatResponse(true, 'Product deleted successfully', null));
    } catch (error) {
      next(error);
    }
  }
};

module.exports = productController;
