const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');
const { formatResponse } = require('../utils/helpers');

const cartController = {
  async getCart(req, res, next) {
    try {
      const items = await CartModel.getByUserId(req.user.id);
      const total = await CartModel.getCartTotal(req.user.id);
      const itemCount = await CartModel.getCartItemCount(req.user.id);

      res.status(200).json(formatResponse(true, 'Cart retrieved successfully', {
        items,
        total,
        itemCount
      }));
    } catch (error) {
      next(error);
    }
  },

  async addToCart(req, res, next) {
    try {
      const { product_id, quantity } = req.body;
      const qty = Math.max(1, parseInt(quantity, 10) || 1);
      const pid = parseInt(product_id, 10);

      const product = await ProductModel.getById(pid);
      if (!product) {
        return res.status(404).json(formatResponse(false, 'Product not found', null));
      }

      if (!product.is_active) {
        return res.status(400).json(formatResponse(false, 'Product is not available', null));
      }

      const stock = Number(product.stock_quantity ?? product.stock ?? 0);
      if (stock <= 0) {
        return res.status(400).json(formatResponse(false, 'Product is out of stock', null));
      }

      const existingItem = await CartModel.getItemByProductId(req.user.id, pid);
      const currentQty = existingItem ? existingItem.quantity : 0;
      const newTotalQty = currentQty + qty;

      if (newTotalQty > stock) {
        return res.status(400).json(formatResponse(false, `Only ${stock} items available in stock. You already have ${currentQty} in your cart`, null));
      }

      if (newTotalQty > 10) {
        return res.status(400).json(formatResponse(false, 'Maximum 10 items per product allowed in cart', null));
      }

      await CartModel.addItem(req.user.id, pid, qty);

      const items = await CartModel.getByUserId(req.user.id);
      const total = await CartModel.getCartTotal(req.user.id);

      res.status(200).json(formatResponse(true, 'Item added to cart successfully', {
        items,
        total
      }));
    } catch (error) {
      next(error);
    }
  },

  async updateCartItem(req, res, next) {
    try {
      const { quantity } = req.body;
      const qty = Math.max(1, Math.min(10, parseInt(quantity, 10) || 1));
      const cartItemId = req.params.id;

      const cartItem = await CartModel.getItemById(cartItemId, req.user.id);
      if (!cartItem) {
        return res.status(404).json(formatResponse(false, 'Cart item not found', null));
      }

      const stock = Number(cartItem.stock ?? cartItem.stock_quantity ?? 0);
      if (qty > stock) {
        return res.status(400).json(formatResponse(false, `Only ${stock} items available in stock`, null));
      }

      await CartModel.updateQuantity(cartItemId, req.user.id, qty);

      const items = await CartModel.getByUserId(req.user.id);
      const total = await CartModel.getCartTotal(req.user.id);

      res.status(200).json(formatResponse(true, 'Cart item updated successfully', {
        items,
        total
      }));
    } catch (error) {
      next(error);
    }
  },

  async removeFromCart(req, res, next) {
    try {
      const cartItemId = req.params.id;

      const cartItem = await CartModel.getItemById(cartItemId, req.user.id);
      if (!cartItem) {
        return res.status(404).json(formatResponse(false, 'Cart item not found', null));
      }

      await CartModel.removeItem(cartItemId, req.user.id);

      const items = await CartModel.getByUserId(req.user.id);
      const total = await CartModel.getCartTotal(req.user.id);

      res.status(200).json(formatResponse(true, 'Item removed from cart successfully', {
        items,
        total
      }));
    } catch (error) {
      next(error);
    }
  },

  async clearCart(req, res, next) {
    try {
      const itemCount = await CartModel.getCartItemCount(req.user.id);
      if (itemCount === 0) {
        return res.status(200).json(formatResponse(true, 'Cart is already empty', {
          items: [],
          total: 0,
          itemCount: 0
        }));
      }

      await CartModel.clearCart(req.user.id);

      res.status(200).json(formatResponse(true, 'Cart cleared successfully', {
        items: [],
        total: 0,
        itemCount: 0
      }));
    } catch (error) {
      next(error);
    }
  }
};

module.exports = cartController;
