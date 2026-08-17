import { createSlice } from '@reduxjs/toolkit';
import { loadCartFromStorage, saveCartToStorage } from '../../utils/localStorage';

const initialItems = loadCartFromStorage();

const calculateTotals = (items) => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const shipping = subtotal > 50 || items.length === 0 ? 0 : 5.99;
  const totalAmount = Number((subtotal + tax + shipping).toFixed(2));

  return { totalItems, subtotal, tax, shipping, totalAmount };
};

const initialTotals = calculateTotals(initialItems);

const initialState = {
  items: initialItems,
  ...initialTotals,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const targetItem = state.items.find((item) => item.id === id);

      if (targetItem) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          targetItem.quantity = quantity;
        }
      }

      const totals = calculateTotals(state.items);
      Object.assign(state, totals);
      saveCartToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      const totals = calculateTotals([]);
      Object.assign(state, totals);
      saveCartToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
