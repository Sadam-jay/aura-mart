/**
 * LocalStorage Utility Service
 * Provides persistent state serialization for Cart, Wishlist, and User Auth
 */

const CART_KEY = 'auramart_cart_v1';
const WISHLIST_KEY = 'auramart_wishlist_v1';
const AUTH_KEY = 'auramart_auth_v1';

export const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem(CART_KEY);
    return serialized ? JSON.parse(serialized) : [];
  } catch (err) {
    console.error('Failed to load cart from localStorage', err);
    return [];
  }
};

export const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
};

export const loadWishlistFromStorage = () => {
  try {
    const serialized = localStorage.getItem(WISHLIST_KEY);
    return serialized ? JSON.parse(serialized) : [];
  } catch (err) {
    console.error('Failed to load wishlist from localStorage', err);
    return [];
  }
};

export const saveWishlistToStorage = (wishlistItems) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems));
  } catch (err) {
    console.error('Failed to save wishlist to localStorage', err);
  }
};

export const loadUserFromStorage = () => {
  try {
    const serialized = localStorage.getItem(AUTH_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch (err) {
    console.error('Failed to load auth from localStorage', err);
    return null;
  }
};

export const saveUserToStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (err) {
    console.error('Failed to save auth state to localStorage', err);
  }
};
