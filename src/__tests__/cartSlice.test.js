import { describe, it, expect, beforeEach } from 'vitest';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../redux/slices/cartSlice';

describe('cartSlice reducers', () => {
  const sampleProduct = {
    id: 101,
    title: 'Test Premium Headphones',
    price: 99.99,
    category: 'electronics',
    image: 'https://example.com/img.jpg',
  };

  let initialState;

  beforeEach(() => {
    initialState = {
      items: [],
      totalItems: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      totalAmount: 0,
    };
  });

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toBeDefined();
  });

  it('should add item to empty cart', () => {
    const nextState = cartReducer(initialState, addToCart({ product: sampleProduct, quantity: 2 }));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].id).toBe(101);
    expect(nextState.items[0].quantity).toBe(2);
    expect(nextState.totalItems).toBe(2);
    expect(nextState.subtotal).toBe(199.98);
  });

  it('should update quantity when adding same product again', () => {
    const stateWithOne = cartReducer(initialState, addToCart({ product: sampleProduct, quantity: 1 }));
    const nextState = cartReducer(stateWithOne, addToCart({ product: sampleProduct, quantity: 2 }));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].quantity).toBe(3);
    expect(nextState.totalItems).toBe(3);
  });

  it('should remove item from cart', () => {
    const stateWithOne = cartReducer(initialState, addToCart({ product: sampleProduct, quantity: 1 }));
    const nextState = cartReducer(stateWithOne, removeFromCart(101));

    expect(nextState.items).toHaveLength(0);
    expect(nextState.totalItems).toBe(0);
    expect(nextState.totalAmount).toBe(0);
  });

  it('should update quantity explicitly', () => {
    const stateWithOne = cartReducer(initialState, addToCart({ product: sampleProduct, quantity: 1 }));
    const nextState = cartReducer(stateWithOne, updateQuantity({ id: 101, quantity: 5 }));

    expect(nextState.items[0].quantity).toBe(5);
    expect(nextState.totalItems).toBe(5);
  });

  it('should clear all items from cart', () => {
    const stateWithOne = cartReducer(initialState, addToCart({ product: sampleProduct, quantity: 2 }));
    const nextState = cartReducer(stateWithOne, clearCart());

    expect(nextState.items).toHaveLength(0);
    expect(nextState.totalItems).toBe(0);
    expect(nextState.subtotal).toBe(0);
  });
});
