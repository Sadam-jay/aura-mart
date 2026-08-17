import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiX, FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { setLoginModalOpen, showToast } from '../../redux/slices/uiSlice';
import { loginSuccess } from '../../redux/slices/authSlice';

const LoginModal = () => {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector((state) => state.ui.isLoginModalOpen);

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  if (!isLoginModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    if (isRegistering && !name.trim()) {
      errs.name = 'Full name is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(loginSuccess({ email, name: isRegistering ? name : email.split('@')[0] }));
    dispatch(setLoginModalOpen(false));
    dispatch(
      showToast({
        message: `Welcome back, ${isRegistering ? name : email.split('@')[0]}!`,
        type: 'success',
      })
    );

    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
  };

  const handleClose = () => {
    dispatch(setLoginModalOpen(false));
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-xl animate-scaleIn">
        
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        {/* Header */}
        <div className="text-center space-y-1 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
            A
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-gray-500">
            {isRegistering
              ? 'Register to track orders and save your wishlist'
              : 'Sign in to access your cart and account preferences'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setIsRegistering(false);
              setErrors({});
            }}
            className={`flex-1 py-1.5 rounded transition-all ${
              !isRegistering ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegistering(true);
              setErrors({});
            }}
            className={`flex-1 py-1.5 rounded transition-all ${
              isRegistering ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isRegistering && (
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-2.5 text-gray-400" size={15} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
                />
              </div>
              {errors.name && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.name}</span>}
            </div>
          )}

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-2.5 text-gray-400" size={15} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@auramart.com"
                className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
              />
            </div>
            {errors.email && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.email}</span>}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-2.5 text-gray-400" size={15} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg pl-9 pr-3 py-2 text-gray-900 focus:outline-none focus:border-blue-600`}
              />
            </div>
            {errors.password && <span className="text-[10px] text-red-500 mt-0.5 block">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
            <FiArrowRight size={14} />
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-gray-100 text-center text-[10px] text-gray-400">
          Demo: <code className="text-gray-700 font-mono">user@auramart.com</code> / password: <code className="text-gray-700 font-mono">password123</code>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;
