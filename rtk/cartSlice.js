import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (findCartItem) {
        
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === findCartItem.id) {
            return {
              ...item,
              quantity: item.quantity + action.payload.quantity,
            };
          }

          return item;
        });
      } else {
        state.cartItems = [
          { ...action.payload, quantity: 1 },
          ...state.cartItems,
        ];
      }
    },
    removeFromCart: (state, action) => {
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      state.cartItems = filteredCartItems;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export default cartSlice;
