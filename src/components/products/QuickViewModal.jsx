import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiX, FiShoppingBag, FiHeart, FiCheck, FiArrowRight } from 'react-icons/fi';
import { setQuickViewOpen, showToast } from '../../redux/slices/uiSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { formatCurrency } from '../../utils/formatters';
import StarRating from '../common/StarRating';

const QuickViewModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isQuickViewOpen, quickViewProduct: product } = useSelector(
    (state) => state.ui
  );
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (!isQuickViewOpen || !product) return null;

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleClose = () => {
    dispatch(setQuickViewOpen({ isOpen: false, product: null }));
  };

  const handleCartClick = () => {
    if (isInCart) {
      handleClose();
      navigate('/cart');
    } else {
      dispatch(addToCart({ product, quantity: 1 }));
      dispatch(
        showToast({
          message: `Added "${product.title.slice(0, 24)}..." to cart!`,
          type: 'success',
        })
      );
    }
  };

  const handleWishlistClick = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl animate-scaleIn">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 transition-all"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6 items-center">
          {/* Image */}
          <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-center h-56 sm:h-64 border border-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              {product.category}
            </span>

            <h3 className="text-base font-bold text-gray-900 leading-snug">
              {product.title}
            </h3>

            <StarRating rating={product.rating?.rate} count={product.rating?.count} size={12} />

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-gray-900">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleCartClick}
                className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  isInCart
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <FiCheck size={14} /> Go to Cart <FiArrowRight size={12} />
                  </>
                ) : (
                  <>
                    <FiShoppingBag size={14} /> Add to Cart
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWishlistClick}
                className={`p-2.5 rounded-lg border border-gray-200 flex items-center justify-center transition-all ${
                  isInWishlist
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white text-gray-600 hover:text-rose-600'
                }`}
                title="Wishlist"
              >
                <FiHeart size={16} className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuickViewModal;
