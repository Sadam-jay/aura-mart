import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiSearch,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiBell,
  FiMenu,
  FiX,
  FiLogOut,
  FiCheckCircle,
} from 'react-icons/fi';
import {
  toggleSearch,
  setSearchOpen,
  setLoginModalOpen,
  setMobileMenuOpen,
  showToast,
} from '../../redux/slices/uiSlice';
import { setSearchQuery } from '../../redux/slices/productsSlice';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { totalItems: cartCount } = useSelector((state) => state.cart);
  const { totalItems: wishlistCount } = useSelector((state) => state.wishlist);
  const { isSearchOpen, isMobileMenuOpen } = useSelector((state) => state.ui);
  const { searchQuery } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const notifications = [
    { id: 1, text: 'Welcome to AuraMart E-Commerce Store.', time: '10m ago' },
    { id: 2, text: 'Free shipping on orders over $50.', time: '1h ago' },
  ];

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowUserDropdown(false);
    dispatch(showToast({ message: 'Logged out successfully', type: 'info' }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2" aria-label="AuraMart Home">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                A
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                <span>AURA</span> <span className="text-blue-600">MART</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <a href="#products-section" className="hover:text-blue-600 transition-colors">
              Products
            </a>
            <a href="#value-props" className="hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#faq-section" className="hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Icon Controls */}
          <div className="flex items-center gap-3">
            
            {/* Search Input (Hidden on mobile screens) */}
            <div className="hidden sm:flex relative items-center">
              {isSearchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center bg-gray-100 border border-gray-300 rounded-full px-3 py-1 transition-all w-48 sm:w-60"
                >
                  <FiSearch className="text-gray-400 mr-2 shrink-0" size={14} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    autoFocus
                    className="bg-transparent text-xs text-gray-900 placeholder-gray-500 focus:outline-none w-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setSearchOpen(false));
                      dispatch(setSearchQuery(''));
                    }}
                    className="text-gray-400 hover:text-gray-600 ml-1"
                    aria-label="Close search"
                  >
                    <FiX size={14} />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  id="search-icon-btn"
                  onClick={() => dispatch(toggleSearch())}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all"
                  title="Search Products"
                  aria-label="Toggle Search Bar"
                >
                  <FiSearch size={18} />
                </button>
              )}
            </div>

            {/* Notifications (Hidden on mobile screens) */}
            <div className="hidden sm:block relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all relative"
                title="Notifications"
                aria-label="Notifications"
              >
                <FiBell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Notifications</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px]">2 New</span>
                  </div>
                  <div className="divide-y divide-gray-100 mt-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2 text-gray-600 flex items-start gap-2">
                        <FiCheckCircle className="text-blue-600 mt-0.5 shrink-0" size={14} />
                        <div>
                          <p>{n.text}</p>
                          <span className="text-[10px] text-gray-400">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-rose-600 transition-all relative"
              title="Wishlist"
              aria-label="Wishlist Page"
            >
              <FiHeart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all relative"
              title="Cart"
              aria-label="Cart Page"
            >
              <FiShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Login / Profile */}
            {isAuthenticated ? (
              <div className="hidden sm:block relative">
                <button
                  type="button"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-1 rounded-full border border-gray-200"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
                      <p className="text-gray-400 text-[10px] truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <FiLogOut size={13} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                id="login-btn-header"
                onClick={() => dispatch(setLoginModalOpen(true))}
                className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
              >
                <FiUser size={14} />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => dispatch(setMobileMenuOpen(!isMobileMenuOpen))}
              className="md:hidden p-2 text-gray-600"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

          </div>
        </div>

        {/* Mobile Hamburger Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 font-medium text-sm text-gray-600 space-y-2">
            <Link
              to="/"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="block px-3 py-1.5 rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
            <a
              href="#products-section"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="block px-3 py-1.5 rounded-md hover:bg-gray-100"
            >
              Products
            </a>
            <a
              href="#value-props"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="block px-3 py-1.5 rounded-md hover:bg-gray-100"
            >
              Services
            </a>
            <a
              href="#faq-section"
              onClick={() => dispatch(setMobileMenuOpen(false))}
              className="block px-3 py-1.5 rounded-md hover:bg-gray-100"
            >
              FAQ
            </a>

            {/* Mobile Menu Login / Profile Action */}
            <div className="pt-3 border-t border-gray-100 px-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 py-1">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-xs text-gray-800">{user?.name}</p>
                      <p className="text-[10px] text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      dispatch(setMobileMenuOpen(false));
                    }}
                    className="w-full text-left py-2 px-3 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg flex items-center gap-2"
                  >
                    <FiLogOut size={14} /> Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    dispatch(setLoginModalOpen(true));
                    dispatch(setMobileMenuOpen(false));
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-all shadow-xs"
                >
                  <FiUser size={14} />
                  <span>Login / Register</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;
