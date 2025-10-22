import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';

const storeRTK = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    // theme: themeSlice.reduce
  },
});

export default storeRTK;
