import { View, Text, FlatList } from 'react-native';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { productsData } from '@/constants/productsData';

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
