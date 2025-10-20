import { View, Text } from 'react-native';
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
      <ProductCard />
    </View>
  );
}

export default Index;
