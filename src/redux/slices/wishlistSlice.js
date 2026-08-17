import { createSlice } from '@reduxjs/toolkit';
import { loadWishlistFromStorage, saveWishlistToStorage } from '../../utils/localStorage';

const initialItems = loadWishlistFromStorage();

const initialState = {
  items: initialItems,
  totalItems: initialItems.length,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }

      state.totalItems = state.items.length;
      saveWishlistToStorage(state.items);
    },

    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      state.totalItems = state.items.length;
      saveWishlistToStorage(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
      saveWishlistToStorage([]);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
