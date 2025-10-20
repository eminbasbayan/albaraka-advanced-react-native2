import Products from '@/components/products/Products';
import { View } from 'react-native';

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Products />
    </View>
  );
}

export default Index;
