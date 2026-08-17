import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSearchOpen: false,
  isLoginModalOpen: false,
  isQuickViewOpen: false,
  isCheckoutModalOpen: false,
  isTermsModalOpen: false,
  isMobileMenuOpen: false,
  quickViewProduct: null,
  toast: null, // { message, type: 'success' | 'info' | 'warning' | 'error' }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setSearchOpen: (state, action) => {
      state.isSearchOpen = action.payload;
    },
    setLoginModalOpen: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
    setQuickViewOpen: (state, action) => {
      state.isQuickViewOpen = action.payload.isOpen;
      state.quickViewProduct = action.payload.product || null;
    },
    setCheckoutModalOpen: (state, action) => {
      state.isCheckoutModalOpen = action.payload;
    },
    setTermsModalOpen: (state, action) => {
      state.isTermsModalOpen = action.payload;
    },
    setMobileMenuOpen: (state, action) => {
      state.isMobileMenuOpen = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

export const {
  toggleSearch,
  setSearchOpen,
  setLoginModalOpen,
  setQuickViewOpen,
  setCheckoutModalOpen,
  setTermsModalOpen,
  setMobileMenuOpen,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;
