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
 * High-definition fallback image generator for categories & IDs
 * @param {string} category 
 * @param {number} id 
 * @returns {string} Image URL
 */
export const getFallbackProductImage = (category = '', id = 1) => {
  const cat = String(category).toLowerCase();
  const numId = Number(id) || 1;

  if (cat.includes('electronics')) {
    const images = [
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1597872250970-45d309260655?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
    ];
    return images[(numId - 1) % images.length];
  }

  if (cat.includes('jewel')) {
    const images = [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
    ];
    return images[(numId - 1) % images.length];
  }

  if (cat.includes('women')) {
    const images = [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
    ];
    return images[(numId - 1) % images.length];
  }

  const images = [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800'
  ];
  return images[(numId - 1) % images.length];
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

    // Use reliable high-definition image if missing or from fakestoreapi
    const validImage = (!product.image || product.image.includes('fakestoreapi.com'))
      ? getFallbackProductImage(product.category, product.id)
      : product.image;

    return {
      ...product,
      image: validImage,
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
