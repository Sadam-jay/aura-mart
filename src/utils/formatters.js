/**
 * Formatting & Data Enhancement Utilities
 */

/**
 * Format numeric value as INR currency
 * @param {number} amount 
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount || 0);
};

/**
 * Calculate original price based on discount rate
 * @param {number} price 
 * @param {number} discountPercent 
 * @returns {number}
 */
export const getOriginalPrice = (price, discountPercent = 15) => {
  if (!price) return 0;
  return Number((price * (1 + discountPercent / 100)).toFixed(2));
};

/**
 * Estimate delivery date (3-5 business days from current date)
 * @returns {string} Formatted date
 */
export const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 4);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Enriched product data with original prices, stock metrics, specs, and badges
 * @param {Array} rawProducts 
 * @returns {Array} Enriched product array
 */
export const enrichProductData = (rawProducts = []) => {
  return rawProducts.map((product) => {
    // Generate predictable extra metadata based on ID
    const discount = (product.id * 7) % 25 + 10; // 10% - 34% discount
    const stock = ((product.id * 13) % 45) + 5; // 5 - 50 in stock
    const isTrending = product.rating?.rate >= 4.0;
    const isNew = product.id % 2 === 0;

    return {
      ...product,
      originalPrice: getOriginalPrice(product.price, discount),
      discountPercentage: discount,
      stockCount: stock,
      isTrending,
      isNew,
      specs: [
        { label: 'Brand', value: 'Aura Premium' },
        { label: 'Warranty', value: '2-Year Manufacturer Warranty' },
        { label: 'Shipping', value: 'Free Standard Shipping' },
        { label: 'Return Policy', value: 'Hassle-Free Return Policy' },
      ],
      features: [
        'Built with premium grade eco-friendly materials',
        'Ergonomic, modern aesthetic designed for daily performance',
        'Includes official AuraMart Authenticity Guarantee',
        'Fully tested for quality assurance and compliance',
      ],
    };
  });
};
