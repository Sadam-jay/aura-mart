import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiHeart, FiShoppingBag, FiEye, FiCheck } from 'react-icons/fi';
import { addToCart } from '../../redux/slices/cartSlice';
import { toggleWishlist } from '../../redux/slices/wishlistSlice';
import { setQuickViewOpen, showToast } from '../../redux/slices/uiSlice';
import { formatCurrency, getFallbackProductImage } from '../../utils/formatters';
import StarRating from '../common/StarRating';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleCartClick = (e) => {
    e.stopPropagation();
    if (isInCart) {
      navigate('/cart');
      return;
    }
    dispatch(addToCart(product));
    dispatch(
      showToast({
        message: `Added "${product.title.slice(0, 25)}..." to cart`,
        type: 'success',
      })
    );
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    dispatch(
      showToast({
        message: isInWishlist
          ? `Removed "${product.title.slice(0, 25)}..." from wishlist`
          : `Added "${product.title.slice(0, 25)}..." to wishlist`,
        type: isInWishlist ? 'info' : 'success',
      })
    );
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    dispatch(setQuickViewOpen({ isOpen: true, product }));
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      {/* Product Image */}
      <div className="relative pt-[90%] bg-gray-50 overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src = getFallbackProductImage(product.category, product.id);
          }}
          className="absolute inset-0 w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercentage && (
          <span className="absolute top-2.5 left-2.5 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
            -{product.discountPercentage}% OFF
          </span>
        )}

        {/* Quick View Button */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute top-2.5 right-11 p-2 bg-white/90 hover:bg-gray-900 text-gray-600 hover:text-white rounded-full shadow-xs border border-gray-200 opacity-0 group-hover:opacity-100 transition-all"
          title="Quick View"
          aria-label="Quick View Product"
        >
          <FiEye size={14} />
        </button>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full border border-gray-200 shadow-xs transition-all ${
            isInWishlist
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-white/90 text-gray-500 hover:text-rose-600'
          }`}
          title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Toggle Favorite"
        >
          <FiHeart size={14} className={isInWishlist ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
            {product.category}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-2 transition-colors leading-snug"
          >
            {product.title}
          </Link>

          <StarRating rating={product.rating?.rate} count={product.rating?.count} size={12} />
        </div>

        {/* Price & Cart Action */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Cart Button */}
          <button
            type="button"
            onClick={handleCartClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs transition-all shadow-xs ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isInCart ? (
              <>
                <FiCheck size={13} />
                <span>Go to Cart</span>
              </>
            ) : (
              <>
                <FiShoppingBag size={13} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
