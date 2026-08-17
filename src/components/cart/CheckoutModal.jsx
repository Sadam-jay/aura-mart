import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import { setCheckoutModalOpen, showToast } from '../../redux/slices/uiSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import { formatCurrency } from '../../utils/formatters';

const CheckoutModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isCheckoutModalOpen = useSelector((state) => state.ui.isCheckoutModalOpen);
  const { totalAmount, items } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Valid email is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.zipCode.trim()) errs.zipCode = 'ZIP code is required';
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      errs.cardNumber = 'Valid 16-digit card number required';
    }
    if (!formData.expiry) errs.expiry = 'MM/YY required';
    if (!formData.cvv || formData.cvv.length < 3) errs.cvv = 'CVV required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      dispatch(clearCart());
      dispatch(
        showToast({
          message: 'Order placed successfully!',
          type: 'success',
        })
      );
    }, 1500);
  };

  const handleClose = () => {
    dispatch(setCheckoutModalOpen(false));
    setIsSuccess(false);
    setIsProcessing(false);
    setErrors({});
    if (isSuccess) {
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl p-6 shadow-xl animate-scaleIn max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <FiCheckCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Order Confirmed!</h3>
            <p className="text-xs text-gray-600 max-w-xs mx-auto">
              Your order <strong className="text-blue-600">#AURA-{Math.floor(100000 + Math.random() * 900000)}</strong> has been processed successfully.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-xs transition-all"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Checkout</h3>
                <p className="text-xs text-gray-500">Completing order for {items.length} item(s)</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400 font-semibold block">Total Due:</span>
                <span className="text-lg font-black text-blue-600">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                  />
                  {errors.fullName && <span className="text-[10px] text-red-500">{errors.fullName}</span>}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                  />
                  {errors.email && <span className="text-[10px] text-red-500">{errors.email}</span>}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Shipping Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Commerce St"
                  className={`w-full bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                />
                {errors.address && <span className="text-[10px] text-red-500">{errors.address}</span>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bengaluru"
                    className={`w-full bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                  />
                  {errors.city && <span className="text-[10px] text-red-500">{errors.city}</span>}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">PIN / ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="560001"
                    className={`w-full bg-gray-50 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                  />
                  {errors.zipCode && <span className="text-[10px] text-red-500">{errors.zipCode}</span>}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <label className="block text-gray-700 font-semibold mb-1">Card Details</label>
                <div className="relative mb-2">
                  <FiCreditCard className="absolute left-3 top-2.5 text-gray-400" size={15} />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="4532 •••• •••• 8921"
                    maxLength={19}
                    className={`w-full bg-gray-50 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                  />
                  {errors.cardNumber && <span className="text-[10px] text-red-500 block">{errors.cardNumber}</span>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className={`w-full bg-gray-50 border ${errors.expiry ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                    />
                    {errors.expiry && <span className="text-[10px] text-red-500">{errors.expiry}</span>}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="CVV"
                      maxLength={4}
                      className={`w-full bg-gray-50 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                    />
                    {errors.cvv && <span className="text-[10px] text-red-500">{errors.cvv}</span>}
                  </div>
                </div>
              </div>



              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <span>Pay {formatCurrency(totalAmount)} Now</span>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
