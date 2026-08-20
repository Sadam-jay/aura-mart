import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import { setCheckoutModalOpen, showToast } from '../redux/slices/uiSlice';
import { formatCurrency, getFallbackProductImage } from '../utils/formatters';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, subtotal, tax, shipping, totalAmount, totalItems } = useSelector(
    (state) => state.cart
  );

  const handleQuantityChange = (id, newQty) => {
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    dispatch(
      showToast({
        message: `Removed "${title.slice(0, 20)}..." from cart`,
        type: 'info',
      })
    );
  };

  const handleClear = () => {
    dispatch(clearCart());
    dispatch(showToast({ message: 'Shopping cart cleared', type: 'info' }));
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 pb-16 max-w-xl mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
          <FiShoppingBag size={28} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
        <p className="text-xs text-gray-500">
          You have no items in your shopping cart. Browse products and add items to purchase.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-6 py-3 rounded-lg shadow-xs transition-all"
          >
            <FiArrowLeft size={14} /> Start Shopping
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
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            You have <strong className="text-blue-600">{totalItems}</strong> item(s) in your cart
          </p>
        </div>
        <button
          onClick={handleClear}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 p-1.5 rounded hover:bg-rose-50 transition-all"
        >
          <FiTrash2 size={13} /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-xs"
            >
              {/* Image */}
              <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 shrink-0 flex items-center justify-center border border-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.src = getFallbackProductImage(item.category, item.id);
                  }}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-0.5 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase text-blue-600">
                  {item.category}
                </span>
                <Link
                  to={`/product/${item.id}`}
                  className="text-xs font-bold text-gray-900 hover:text-blue-600 line-clamp-1 block"
                >
                  {item.title}
                </Link>
                <span className="text-xs text-gray-500 block">
                  Price: {formatCurrency(item.price)}
                </span>
              </div>

              {/* Quantity Adjuster */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-6 h-6 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs rounded"
                  >
                    -
                  </button>
                  <span className="w-7 text-center font-bold text-xs text-gray-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-6 h-6 hover:bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs rounded"
                  >
                    +
                  </button>
                </div>

                <span className="text-xs font-extrabold text-gray-900 min-w-[60px] text-right">
                  {formatCurrency(item.price * item.quantity)}
                </span>

                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="p-1.5 text-gray-400 hover:text-rose-600 transition-all"
                  title="Remove Item"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 sticky top-24 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="font-bold text-gray-900">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-emerald-600">
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>

              {subtotal < 500 && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                  Add {formatCurrency(500 - subtotal)} more for <strong>FREE Shipping</strong>!
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-baseline justify-between">
              <span className="text-xs font-bold text-gray-900 uppercase">Total Amount</span>
              <span className="text-lg font-black text-blue-600">{formatCurrency(totalAmount)}</span>
            </div>

            <button
              onClick={() => dispatch(setCheckoutModalOpen(true))}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <FiArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
