import { View, Text } from 'react-native';
import React, { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';

const CartScreen = () => {
  const { cartItems } = useContext(CartContext);

  

  return (
    <View>
      <Text>CartScreen</Text>
      {cartItems.map((item) => (
        <ProductCard key={item.id} item={item} cart />
      ))}
    </View>
  );
};

export default CartScreen;
