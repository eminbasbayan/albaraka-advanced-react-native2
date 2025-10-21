import { Stack } from 'expo-router';
import CounterProvider from '@/context/CounterContext';

export default function RootLayout() {
  return (
    <CounterProvider>
      <Stack />
    </CounterProvider>
  );
}
