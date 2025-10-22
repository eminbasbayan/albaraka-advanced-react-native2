import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import cartSlice from "./cartSlice"

const storeRTK = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlice.reducer
    // theme: themeSlice.reduce
  },
});

export default storeRTK;
