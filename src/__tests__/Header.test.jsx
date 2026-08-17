import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/slices/cartSlice';
import wishlistReducer from '../redux/slices/wishlistSlice';
import uiReducer from '../redux/slices/uiSlice';
import productsReducer from '../redux/slices/productsSlice';
import authReducer from '../redux/slices/authSlice';
import Header from '../components/common/Header';

const createMockStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      ui: uiReducer,
      products: productsReducer,
      auth: authReducer,
    },
    preloadedState: {
      cart: { items: [{ id: 1, quantity: 2 }], totalItems: 2, subtotal: 100, tax: 8, shipping: 0, totalAmount: 108 },
      wishlist: { items: [{ id: 2 }], totalItems: 1 },
      ui: { isSearchOpen: false },
      products: { searchQuery: '' },
      auth: { user: null, isAuthenticated: false },
    },
  });
};

describe('Header Component', () => {
  it('renders brand logo and badge counters for cart and wishlist', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('AURA')).toBeInTheDocument();
    expect(screen.getByText('MART')).toBeInTheDocument();

    // Check cart badge count
    expect(screen.getByText('2')).toBeInTheDocument();
    // Check wishlist badge count
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('toggles search input field when search button is clicked', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const searchIconBtn = screen.getByLabelText('Toggle Search Bar');
    fireEvent.click(searchIconBtn);

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });
});
