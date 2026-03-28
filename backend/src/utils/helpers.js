const formatResponse = (success, message, data) => {
  return { success, message, data };
};

const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

const calculateDiscount = (originalPrice, discountPercent) => {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount percent must be between 0 and 100');
  }
  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;
  return {
    originalPrice: parseFloat(originalPrice.toFixed(2)),
    discountPercent,
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalPrice: parseFloat(finalPrice.toFixed(2))
  };
};

const paginate = (page = 1, limit = 10) => {
  const parsedPage = Math.max(1, parseInt(page) || 1);
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
  const offset = (parsedPage - 1) * parsedLimit;
  return { page: parsedPage, limit: parsedLimit, offset };
};

module.exports = { formatResponse, generateOrderNumber, calculateDiscount, paginate };
