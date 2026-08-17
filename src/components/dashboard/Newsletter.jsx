import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiMail, FiSend } from 'react-icons/fi';
import { showToast } from '../../redux/slices/uiSlice';

const Newsletter = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      dispatch(showToast({ message: 'Please enter a valid email address', type: 'warning' }));
      return;
    }
    dispatch(
      showToast({
        message: '🎉 Thank you for subscribing! Check your inbox for updates.',
        type: 'success',
      })
    );
    setEmail('');
  };

  return (
    <div className="relative overflow-hidden bg-blue-600 rounded-2xl p-6 sm:p-10 text-white shadow-md">
      <div className="relative z-10 max-w-xl mx-auto text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto text-white">
          <FiMail size={20} />
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-xs text-blue-100 leading-relaxed">
          Get weekly updates on new product arrivals, sales, and exclusive discount coupons.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 pt-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 text-xs focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto shrink-0 bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <span>Subscribe</span>
            <FiSend size={13} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
