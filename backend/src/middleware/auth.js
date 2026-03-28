const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided',
        data: null
      });
    }

    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format',
        data: null
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. User not found',
        data: null
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Account has been deactivated',
        data: null
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
        data: null
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        data: null
      });
    }
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required',
      data: null
    });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
