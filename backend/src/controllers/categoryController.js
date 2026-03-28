const CategoryModel = require('../models/categoryModel');
const { formatResponse } = require('../utils/helpers');

const categoryController = {
  async getAll(req, res, next) {
    try {
      const categories = await CategoryModel.getAll();
      res.status(200).json(formatResponse(true, 'Categories retrieved successfully', { categories }));
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const category = await CategoryModel.getById(req.params.id);
      if (!category) {
        return res.status(404).json(formatResponse(false, 'Category not found', null));
      }

      res.status(200).json(formatResponse(true, 'Category retrieved successfully', { category }));
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, description, image_url } = req.body;

      const category = await CategoryModel.create({ name, description, image_url });

      res.status(201).json(formatResponse(true, 'Category created successfully', { category }));
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const category = await CategoryModel.getById(req.params.id);
      if (!category) {
        return res.status(404).json(formatResponse(false, 'Category not found', null));
      }

      const updated = await CategoryModel.update(req.params.id, req.body);
      if (!updated) {
        return res.status(400).json(formatResponse(false, 'No fields to update', null));
      }

      const updatedCategory = await CategoryModel.getById(req.params.id);
      res.status(200).json(formatResponse(true, 'Category updated successfully', { category: updatedCategory }));
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const category = await CategoryModel.getById(req.params.id);
      if (!category) {
        return res.status(404).json(formatResponse(false, 'Category not found', null));
      }

      const result = await CategoryModel.delete(req.params.id);
      if (!result.deleted) {
        return res.status(400).json(formatResponse(false, result.reason || 'Failed to delete category', null));
      }

      res.status(200).json(formatResponse(true, 'Category deleted successfully', null));
    } catch (error) {
      next(error);
    }
  }
};

module.exports = categoryController;
