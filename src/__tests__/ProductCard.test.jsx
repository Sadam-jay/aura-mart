import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/slices/cartSlice';
import wishlistReducer from '../redux/slices/wishlistSlice';
import uiReducer from '../redux/slices/uiSlice';
import ProductCard from '../components/products/ProductCard';

const createMockStore = (cartItems = [], wishlistItems = []) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
      ui: uiReducer,
    },
    preloadedState: {
      cart: { items: cartItems, totalItems: cartItems.length, subtotal: 0, tax: 0, shipping: 0, totalAmount: 0 },
      wishlist: { items: wishlistItems, totalItems: wishlistItems.length },
      ui: { isQuickViewOpen: false, quickViewProduct: null, toast: null },
    },
  });
};

describe('ProductCard Component', () => {
  const dummyProduct = {
    id: 1,
    title: 'Aura Wireless Noise Cancelling Headphones',
    price: 199.99,
    originalPrice: 249.99,
    discountPercentage: 20,
    category: 'electronics',
    image: 'https://example.com/headphones.jpg',
    rating: { rate: 4.8, count: 150 },
  };

  it('renders product title, price, discount badge, and category', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={dummyProduct} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Aura Wireless Noise Cancelling Headphones')).toBeInTheDocument();
    expect(screen.getByText('₹199.99')).toBeInTheDocument();
    expect(screen.getByText('₹249.99')).toBeInTheDocument();
    expect(screen.getByText('-20% OFF')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders "Go to Cart" button when item is already in cart', () => {
    const store = createMockStore([dummyProduct]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={dummyProduct} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Go to Cart')).toBeInTheDocument();
  });
});
