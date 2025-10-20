import { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import cartsData, { productsData, usersData } from '@/constants/productsData';
import ProductCard from '@/components/ProductCard';

function Index() {
  const [products, setProducts] = useState(productsData);

  function deleteProduct(productId) {
    const filteredProducts = products.filter(
      (product) => product.id !== productId
    );

    setProducts(filteredProducts);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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

export default Index;
