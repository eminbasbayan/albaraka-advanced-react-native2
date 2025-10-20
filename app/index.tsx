import { View, Text, FlatList } from 'react-native';
import cartsData, { productsData, usersData } from '@/constants/productsData';
import ProductCard from '@/components/ProductCard';

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FlatList
        data={productsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => {
          return <ProductCard key={item.index} {...item} />;
        }}
      />
    </View>
  );
}

export default Index;
