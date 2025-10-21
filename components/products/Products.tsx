import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Button from '../Button';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Elma');

  function deleteProduct(productId) {
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );

    setProducts(filteredProducts);
  }

  async function fetchProducts() {
    setIsLoading(true);
    setProducts([]);
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [title]);

  return (
    <View>
      <Text>Product Component</Text>
      <Button
        title="Ürünleri Getir"
        onPress={fetchProducts}
        variant="primary"
        loading={isLoading}
      />

      <Text>{title}</Text>
      <Button title="Değiştir" onPress={() => setTitle('Armut')} />

      {isLoading && <Text>Loading...</Text>}

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
