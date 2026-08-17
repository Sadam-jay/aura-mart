import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';
import { hideToast } from '../../redux/slices/uiSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const icons = {
    success: <FiCheckCircle className="text-emerald-500 text-base shrink-0" />,
    info: <FiInfo className="text-blue-500 text-base shrink-0" />,
    warning: <FiAlertCircle className="text-amber-500 text-base shrink-0" />,
    error: <FiAlertCircle className="text-rose-500 text-base shrink-0" />,
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fadeIn">
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 bg-white shadow-md text-xs text-gray-800 min-w-[260px] max-w-md font-medium">
        {icons[toast.type] || icons.info}
        <span className="flex-1 leading-relaxed">{toast.message}</span>
        <button
          onClick={() => dispatch(hideToast())}
          className="text-gray-400 hover:text-gray-600 p-1"
          aria-label="Dismiss Toast"
        >
          <FiX size={14} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
