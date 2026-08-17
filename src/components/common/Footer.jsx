import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { setTermsModalOpen } from '../../redux/slices/uiSlice';
import Newsletter from '../dashboard/Newsletter';

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-8 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter */}
        <div className="mb-12">
          <Newsletter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-gray-800">
          
          {/* Company Brief */}
          <div className="lg:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                AURA<span className="text-blue-500">MART</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400 max-w-sm">
              AuraMart is a premium responsive e-commerce web application built with React, Redux Toolkit, React Router, and Tailwind CSS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home Dashboard
                </Link>
              </li>
              <li>
                <a href="#products-section" className="hover:text-blue-400 transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-blue-400 transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#faq-section" className="hover:text-blue-400 transition-colors">
                  FAQ & Help
                </a>
              </li>
              <li>
                <a href="#value-props" className="hover:text-blue-400 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => dispatch(setTermsModalOpen(true))}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Privacy Policy & T&C
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
              Contact Us
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <FiMapPin className="text-blue-400 shrink-0 mt-0.5" size={14} />
                <span>MG Road, Indiranagar, Bangalore, Karnataka 560038, India</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-emerald-400 shrink-0" size={14} />
                <span>+91 80 4567 8900</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-rose-400 shrink-0" size={14} />
                <span>support@auramart.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center sm:text-left text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} AuraMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
