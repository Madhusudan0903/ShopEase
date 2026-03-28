import { createContext, useState, useCallback, useContext, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.get('/cart');
      if (data.success) {
        setCartItems(data.data || []);
      }
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      const { data } = await api.post('/cart', { productId, quantity });
      if (data.success) {
        await fetchCart();
        toast.success('Added to cart!');
      }
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
      throw err;
    }
  }, [fetchCart]);

  const updateQuantity = useCallback(async (itemId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${itemId}`, { quantity });
      if (data.success) {
        await fetchCart();
      }
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update quantity');
      throw err;
    }
  }, [fetchCart]);

  const removeItem = useCallback(async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`);
      if (data.success) {
        await fetchCart();
        toast.info('Item removed from cart');
      }
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item');
      throw err;
    }
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    try {
      const { data } = await api.delete('/cart/clear');
      if (data.success) {
        setCartItems([]);
      }
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to clear cart');
      throw err;
    }
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || item.price || 0) * (item.quantity || 0),
    0
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export default CartContext;
