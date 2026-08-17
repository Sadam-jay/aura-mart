import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiX, FiShield, FiFileText } from 'react-icons/fi';
import { setTermsModalOpen } from '../../redux/slices/uiSlice';

const TermsPrivacyModal = () => {
  const dispatch = useDispatch();
  const isTermsModalOpen = useSelector((state) => state.ui.isTermsModalOpen);

  if (!isTermsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-6 shadow-xl animate-scaleIn max-h-[85vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => dispatch(setTermsModalOpen(false))}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full"
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FiShield size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Privacy Policy & Terms of Service</h3>
              <p className="text-[10px] text-gray-400">Last updated: August 2026</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
            <div>
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-1">
                <FiFileText className="text-blue-600" /> 1. Privacy Policy
              </h4>
              <p>
                AuraMart values user privacy. All shopping cart data, wishlist selections, and demo account state are stored locally in your browser storage (`localStorage`).
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-1">
                <FiFileText className="text-blue-600" /> 2. Terms of Service
              </h4>
              <p>
                Products are fetched live from Fake Store API (`https://fakestoreapi.com/products`) for demonstration purposes in this application.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5 mb-1">
                <FiFileText className="text-blue-600" /> 3. Return Policy
              </h4>
              <p>
                Items delivered may be returned in original packaging for a full refund under our hassle-free return policy.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-right">
            <button
              onClick={() => dispatch(setTermsModalOpen(false))}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition-all shadow-xs"
            >
              I Understand
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsPrivacyModal;
