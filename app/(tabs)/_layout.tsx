import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          paddingTop: 5,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Ürünler',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="list-outline" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Sepetim',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="cart-outline" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
