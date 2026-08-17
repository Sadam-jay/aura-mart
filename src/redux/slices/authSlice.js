import { createSlice } from '@reduxjs/toolkit';
import { loadUserFromStorage, saveUserToStorage } from '../../utils/localStorage';

const storedUser = loadUserFromStorage();

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { email, name } = action.payload;
      state.user = {
        email,
        name: name || email.split('@')[0],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      };
      state.isAuthenticated = true;
      state.error = null;
      saveUserToStorage(state.user);
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      saveUserToStorage(null);
    },

    setAuthError: (state, action) => {
      state.error = action.payload;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, logout, setAuthError, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
