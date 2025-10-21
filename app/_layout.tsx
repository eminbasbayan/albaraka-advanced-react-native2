import { Stack } from 'expo-router';
import CounterProvider from '@/context/CounterContext';
import CartProvider from '@/context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <CounterProvider>
        <Stack />
      </CounterProvider>
    </CartProvider>
  );
}
