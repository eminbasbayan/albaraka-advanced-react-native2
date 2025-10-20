import Counter from '@/components/Counter';
import { useState } from 'react';
import { Text, View } from 'react-native';

function Index() {
  const [count, setCount] = useState(0);
  const fullName = 'Emin Başbayan';

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Counter fullName={fullName} count={count} setCount={setCount} />
    </View>
  );
}

export default Index;
