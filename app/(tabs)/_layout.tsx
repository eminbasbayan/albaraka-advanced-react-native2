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

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: 'Giriş',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="log-in-outline" size={size} color={color} />;
          },
          href: null, // Hide from tab bar
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: 'Kayıt Ol',
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-add-outline" size={size} color={color} />;
          },
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
