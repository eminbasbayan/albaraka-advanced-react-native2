import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { productsData } from '@/constants/productsData';
import Button from '../Button';

export default function Products() {
  const [products, setProducts] = useState(productsData);

  function deleteProduct(productId) {
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );

    setProducts(filteredProducts);
  }
  return (
    <View>
      <Text>Product Component</Text>
      <Button title="1" onPress={() => {}} variant="primary" />
      <Button title="2" onPress={() => {}} variant="secondary" />
      <Button title="3" onPress={() => {}} variant="outline" />
      <Button title="4" onPress={() => {}} variant="outline" loading />
      <Button title="5" onPress={() => {}} variant="primary" disabled />
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => {
          return (
            <ProductCard
              key={item.index}
              {...item}
              deleteProduct={deleteProduct}
            />
          );
        }}
      />
    </View>
  );
}
