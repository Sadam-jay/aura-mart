import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="pt-32 pb-20 max-w-md mx-auto px-4 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-white border border-slate-200 text-slate-700 flex items-center justify-center mx-auto shadow-xs">
        <FiAlertCircle size={32} />
      </div>
      <h1 className="text-3xl font-light text-slate-900 font-serif">404 - Page Not Found</h1>
      <p className="text-xs text-slate-500 font-normal">
        The page you are looking for does not exist or has been moved.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs uppercase tracking-widest px-7 py-3.5 rounded-full transition-all shadow-sm"
        >
          <FiArrowLeft size={14} /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
