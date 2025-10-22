import { Stack } from 'expo-router';
import CounterProvider from '@/context/CounterContext';
import CartProvider from '@/context/CartContext';
import { Provider } from 'react-redux';
// import store from '@/redux/store';
import storeRTK from '@/rtk/store';

export default function RootLayout() {
  return (
    <CartProvider>
      <CounterProvider>
        <Provider store={storeRTK}>
          <Stack />
        </Provider>
      </CounterProvider>
    </CartProvider>
  );
}
