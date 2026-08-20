import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiShoppingBag,
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
  FiTag,
} from 'react-icons/fi';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';
import { showToast } from '../redux/slices/uiSlice';
import { formatCurrency, getEstimatedDelivery, getFallbackProductImage } from '../utils/formatters';
import StarRating from '../components/common/StarRating';
import ProductCard from '../components/products/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: allProducts, status } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = allProducts.find((p) => String(p.id) === String(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
  }, [id]);

  if (!product && status === 'loading') {
    return (
      <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-gray-500 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="text-xs text-gray-500">The product you are looking for is not available in our database.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleCartClick = () => {
    if (isInCart) {
      navigate('/cart');
    } else {
      dispatch(addToCart({ product, quantity }));
      dispatch(
        showToast({
          message: `Added ${quantity} unit(s) to cart!`,
          type: 'success',
        })
      );
    }
  };

  const handleWishlistClick = () => {
    dispatch(toggleWishlist(product));
    dispatch(
      showToast({
        message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist!',
        type: isInWishlist ? 'info' : 'success',
      })
    );
  };

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="capitalize hover:text-blue-600">{product.category}</span>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Image Showcase */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-2xl p-6 relative flex items-center justify-center min-h-[380px] shadow-xs">
          <img
            src={product.image}
            alt={product.title}
            onError={(e) => {
              e.currentTarget.src = getFallbackProductImage(product.category, product.id);
            }}
            className="max-h-[350px] w-auto object-contain"
          />
          {product.discountPercentage && (
            <span className="absolute top-4 left-4 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
              Save {product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              {product.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 pt-1">
              <StarRating rating={product.rating?.rate} count={product.rating?.count} size={13} />
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                In Stock ({product.stockCount || 15} left)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-gray-100 border border-gray-200 rounded-xl flex items-baseline gap-3">
            <span className="text-2xl font-black text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-gray-600 font-medium ml-auto flex items-center gap-1">
              <FiTag size={13} /> Best Price
            </span>
          </div>

          {/* Features / Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-600">
            <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center gap-2.5">
              <FiTruck className="text-blue-600 text-base shrink-0" />
              <div>
                <p className="font-bold text-gray-800">Est. Delivery:</p>
                <p className="text-gray-500 text-[11px]">{getEstimatedDelivery()}</p>
              </div>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center gap-2.5">
              <FiRefreshCw className="text-blue-600 text-base shrink-0" />
              <div>
                <p className="font-bold text-gray-800">Hassle-Free Returns</p>
                <p className="text-gray-500 text-[11px]">Free returns</p>
              </div>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center bg-white border border-gray-300 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-xs rounded"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 hover:bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-xs rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCartClick}
                className={`flex-1 py-3 px-6 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                  isInCart
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <FiCheck size={15} />
                    <span>Go to Cart</span>
                    <FiArrowRight size={13} />
                  </>
                ) : (
                  <>
                    <FiShoppingBag size={15} />
                    <span>Add to Cart ({formatCurrency(product.price * quantity)})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWishlistClick}
                className={`p-3 rounded-lg border border-gray-300 flex items-center justify-center transition-all ${
                  isInWishlist
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-gray-600 hover:text-rose-600'
                }`}
                title="Wishlist"
                aria-label="Wishlist"
              >
                <FiHeart size={16} className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center gap-2 text-xs text-gray-500">
            <FiShield className="text-blue-600 shrink-0" size={14} />
            <span>Encrypted checkout via Visa, MasterCard & PayPal</span>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
        <div className="flex border-b border-gray-200 gap-6 mb-4">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'description'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'specs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Specifications
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
            <p>{product.description}</p>
            <h4 className="text-xs font-bold text-gray-800 pt-1">Key Features:</h4>
            <ul className="space-y-1.5">
              {(product.features || [
                'Engineered with premium quality materials',
                'Modern design for maximum comfort',
                'Official manufacturer warranty included',
              ]).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                  <FiCheck className="text-blue-600 shrink-0" size={13} /> {feat}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(product.specs || [
              { label: 'Category', value: product.category },
              { label: 'Warranty', value: '2-Year Manufacturer Guarantee' },
              { label: 'Return Window', value: '30 Days Money Back' },
              { label: 'Product Code', value: `AURA-${product.id}` },
            ]).map((spec, idx) => (
              <div key={idx} className="flex justify-between p-2.5 bg-gray-50 rounded-lg text-xs">
                <span className="text-gray-500 font-semibold">{spec.label}</span>
                <span className="text-gray-900 font-bold">{spec.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-xl font-bold text-gray-900">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
