const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { formatResponse } = require('../utils/helpers');

function formatUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    name: [row.first_name, row.last_name].filter(Boolean).join(' ').trim(),
    email: row.email,
    phone: row.phone,
    role: row.role,
    address_line1: row.address_line1,
    address_line2: row.address_line2,
    city: row.city,
    state: row.state,
    zip_code: row.zip_code,
    is_active: row.is_active,
  };
}

const authController = {
  async register(req, res, next) {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        phone,
        address_line1,
        city,
        state,
        zip_code,
      } = req.body;

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json(formatResponse(false, 'Email is already registered', null));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone,
        address_line1,
        city,
        state,
        zip_code,
      });

      const full = await UserModel.findById(user.id);

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.status(201).json(
        formatResponse(true, 'User registered successfully', {
          user: formatUser(full),
          token,
        })
      );
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

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json(formatResponse(false, 'Invalid email or password', null));
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      const full = await UserModel.findById(user.id);

      res.status(200).json(
        formatResponse(true, 'Login successful', {
          user: formatUser(full),
          token,
        })
      );
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

      res.status(200).json(formatResponse(true, 'Profile retrieved successfully', { user: formatUser(user) }));
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { first_name, last_name, phone, address_line1, city, state, zip_code, password } = req.body;

      const updateData = {};
      if (first_name !== undefined) updateData.first_name = first_name;
      if (last_name !== undefined) updateData.last_name = last_name;
      if (phone !== undefined) updateData.phone = phone || null;
      if (address_line1 !== undefined) updateData.address_line1 = address_line1;
      if (city !== undefined) updateData.city = city;
      if (state !== undefined) updateData.state = state;
      if (zip_code !== undefined) updateData.zip_code = zip_code;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password_hash = await bcrypt.hash(password, salt);
      }

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json(formatResponse(false, 'No fields to update', null));
      }

      const updated = await UserModel.update(req.user.id, updateData);
      if (!updated) {
        return res.status(400).json(formatResponse(false, 'Failed to update profile', null));
      }

      const user = await UserModel.findById(req.user.id);
      res.status(200).json(formatResponse(true, 'Profile updated successfully', { user: formatUser(user) }));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
