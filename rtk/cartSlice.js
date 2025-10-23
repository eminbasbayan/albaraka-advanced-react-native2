import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  cartItems: [],
  total: 0,
};

export const loadCart = createAsyncThunk('cart/loadCart', async () => {
  const saved = await AsyncStorage.getItem('cartItems');
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
});

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

      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const filteredCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      state.cartItems = filteredCartItems;
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      AsyncStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const { addToCart, clearCart, removeFromCart, setCart } =
  cartSlice.actions;

export default cartSlice;
