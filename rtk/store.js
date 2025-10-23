import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import authSlice from './authSlice';

const storeRTK = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    auth: authSlice.reducer,
    // theme: themeSlice.reduce
  },
});

export default storeRTK;
