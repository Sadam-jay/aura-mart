import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enrichProductData } from '../../utils/formatters';
import { MOCK_PRODUCTS } from '../../utils/mockData';

// Asynchronous Redux Thunk to fetch products from Fake Store API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const data = await response.json();
      return enrichProductData(data);
    } catch (err) {
      console.warn('API fetch failed, falling back to mock product dataset:', err.message);
      return enrichProductData(MOCK_PRODUCTS);
    }
  }
);

const initialState = {
  items: [],
  filteredItems: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'default',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      productsSlice.caseReducers.applyFilters(state);
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    applyFilters: (state) => {
      let temp = [...state.items];

      // Category filter
      if (state.selectedCategory && state.selectedCategory !== 'all') {
        temp = temp.filter(
          (item) => item.category.toLowerCase() === state.selectedCategory.toLowerCase()
        );
      }

      // Search filter
      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase();
        temp = temp.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );
      }

      // Sorting
      if (state.sortBy === 'price-low') {
        temp.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === 'price-high') {
        temp.sort((a, b) => b.price - a.price);
      } else if (state.sortBy === 'rating') {
        temp.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      }

      state.filteredItems = temp;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        // Fallback gracefully
        state.items = enrichProductData(MOCK_PRODUCTS);
        state.filteredItems = state.items;
      });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  setSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
