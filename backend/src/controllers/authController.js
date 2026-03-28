const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { formatResponse } = require('../utils/helpers');

const authController = {
  async register(req, res, next) {
    try {
      const { name, email, password, phone, address, city, state, zip_code } = req.body;

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json(formatResponse(false, 'Email is already registered', null));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        city,
        state,
        zip_code
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.status(201).json(formatResponse(true, 'User registered successfully', {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token
      }));
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json(formatResponse(false, 'Invalid email or password', null));
      }

      if (!user.is_active) {
        return res.status(403).json(formatResponse(false, 'Account has been deactivated', null));
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json(formatResponse(false, 'Invalid email or password', null));
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.status(200).json(formatResponse(true, 'Login successful', {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }));
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json(formatResponse(false, 'User not found', null));
      }

      res.status(200).json(formatResponse(true, 'Profile retrieved successfully', { user }));
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { name, phone, address, city, state, zip_code, password } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (phone) updateData.phone = phone;
      if (address !== undefined) updateData.address = address;
      if (city !== undefined) updateData.city = city;
      if (state !== undefined) updateData.state = state;
      if (zip_code !== undefined) updateData.zip_code = zip_code;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json(formatResponse(false, 'No fields to update', null));
      }

      const updated = await UserModel.update(req.user.id, updateData);
      if (!updated) {
        return res.status(400).json(formatResponse(false, 'Failed to update profile', null));
      }

      const user = await UserModel.findById(req.user.id);
      res.status(200).json(formatResponse(true, 'Profile updated successfully', { user }));
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
