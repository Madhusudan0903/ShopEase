const OrderModel = require('../models/orderModel');
const OrderStatusModel = require('../models/orderStatusModel');
const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');
const { formatResponse } = require('../utils/helpers');

const VALID_STATUS_TRANSITIONS = {
  placed: ['confirmed', 'cancelled'],
  confirmed: ['processing', 'cancelled'],
  processing: ['shipped'],
  shipped: ['delivered'],
  delivered: [],
  cancelled: []
};

const orderController = {
  async createOrder(req, res, next) {
    try {
      const orderPayload = req.orderBody;
      if (!orderPayload) {
        return res.status(400).json(formatResponse(false, 'Invalid order payload', null));
      }

      const cartItems = await CartModel.getByUserId(req.user.id);
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json(formatResponse(false, 'Cart is empty. Add items before placing an order', null));
      }

      for (const item of cartItems) {
        if (!item.is_active) {
          return res.status(400).json(formatResponse(false, `Product "${item.name}" is no longer available`, null));
        }
        const available = Number(item.stock ?? item.stock_quantity ?? 0);
        if (item.quantity > available) {
          return res.status(400).json(formatResponse(false, `Insufficient stock for "${item.name}". Available: ${available}, Requested: ${item.quantity}`, null));
        }
      }

      const result = await OrderModel.create(req.user.id, cartItems, orderPayload);

      if (!result.success) {
        return res.status(400).json(formatResponse(false, result.message, null));
      }

      const order = await OrderModel.getById(result.orderId);

      res.status(201).json(formatResponse(true, 'Order placed successfully', { order }));
    } catch (error) {
      next(error);
    }
  },

  async getMyOrders(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await OrderModel.getByUserId(req.user.id, page, limit);

      res.status(200).json(formatResponse(true, 'Orders retrieved successfully', result));
    } catch (error) {
      next(error);
    }
  },

  async getOrderById(req, res, next) {
    try {
      const order = await OrderModel.getById(req.params.id);

      if (!order) {
        return res.status(404).json(formatResponse(false, 'Order not found', null));
      }

      if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
        return res.status(403).json(formatResponse(false, 'Access denied. You can only view your own orders', null));
      }

      res.status(200).json(formatResponse(true, 'Order retrieved successfully', { order }));
    } catch (error) {
      next(error);
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const status = req.query.status || null;

      const result = await OrderModel.getAllOrders(page, limit, status);

      res.status(200).json(formatResponse(true, 'All orders retrieved successfully', result));
    } catch (error) {
      next(error);
    }
  },

  async updateOrderStatus(req, res, next) {
    try {
      const { status } = req.body;
      const orderId = req.params.id;

      const order = await OrderModel.getById(orderId);
      if (!order) {
        return res.status(404).json(formatResponse(false, 'Order not found', null));
      }

      const currentStatus = order.status;
      const allowedTransitions = VALID_STATUS_TRANSITIONS[currentStatus];

      if (!allowedTransitions || !allowedTransitions.includes(status)) {
        return res.status(400).json(formatResponse(false, `Cannot transition from "${currentStatus}" to "${status}". Allowed transitions: ${allowedTransitions ? allowedTransitions.join(', ') : 'none'}`, null));
      }

      await OrderModel.updateStatus(orderId, status);
      await OrderStatusModel.addStatus(orderId, status, `Status updated to ${status} by admin`);

      const updatedOrder = await OrderModel.getById(orderId);

      res.status(200).json(formatResponse(true, 'Order status updated successfully', { order: updatedOrder }));
    } catch (error) {
      next(error);
    }
  },

  async cancelOrder(req, res, next) {
    try {
      const orderId = req.params.id;

      const order = await OrderModel.getById(orderId);
      if (!order) {
        return res.status(404).json(formatResponse(false, 'Order not found', null));
      }

      if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
        return res.status(403).json(formatResponse(false, 'Access denied. You can only cancel your own orders', null));
      }

      const st = (order.status || '').toLowerCase();
      if (!['placed', 'confirmed'].includes(st)) {
        return res.status(400).json(formatResponse(false, `Order cannot be cancelled. Current status: ${order.status}. Orders can only be cancelled when status is "placed" or "confirmed"`, null));
      }

      const result = await OrderModel.cancelOrder(orderId, order.user_id);

      if (!result.success) {
        return res.status(400).json(formatResponse(false, result.message, null));
      }

      const updatedOrder = await OrderModel.getById(orderId);

      res.status(200).json(formatResponse(true, 'Order cancelled successfully', { order: updatedOrder }));
    } catch (error) {
      next(error);
    }
  }
};

module.exports = orderController;
