import Counter from '@/components/Counter';
import { Text, View } from 'react-native';

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Counter />
    </View>
  );
}

export default Index;
