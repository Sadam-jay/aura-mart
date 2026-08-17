import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { clearWishlist } from '../redux/slices/wishlistSlice';
import { showToast } from '../redux/slices/uiSlice';
import ProductCard from '../components/products/ProductCard';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items, totalItems } = useSelector((state) => state.wishlist);

  const handleClear = () => {
    dispatch(clearWishlist());
    dispatch(showToast({ message: 'Wishlist cleared', type: 'info' }));
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <FiHeart size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your Wishlist is Empty</h2>
        <p className="text-xs text-gray-500">
          Save items you want to buy later by clicking the heart icon on any product card.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3 rounded-lg shadow-xs transition-all"
          >
            <FiArrowLeft size={14} /> Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wishlist & Favorites</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            You have <strong className="text-rose-600">{totalItems}</strong> saved item(s)
          </p>
        </div>
        <button
          onClick={handleClear}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 p-1.5 rounded hover:bg-rose-50 transition-all"
        >
          <FiTrash2 size={13} /> Clear Wishlist
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
