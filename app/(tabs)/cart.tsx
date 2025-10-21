import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';

const CartItems = ({ cartItems, toplamDeger }) => {
  return (
    <>
      {cartItems?.map((item) => (
        <ProductCard key={item.id} item={item} cart />
      ))}

      {cartItems.length && <Text>Sepet Toplam: ₺{toplamDeger}</Text>}
    </>
  );
};

const CartScreen = () => {
  const { cartItems } = useContext(CartContext);
  const toplamDeger = cartItems?.reduce((toplam, urun) => {
    return toplam + urun.price * urun.quantity;
  }, 0);

  return (
    <View>
      <Text>CartScreen</Text>
      <CartItems cartItems={cartItems} toplamDeger={toplamDeger} />
    </View>
  );
};

export default CartScreen;
