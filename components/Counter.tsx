import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.counter.count);

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
        }}
      >
        Counter: {count}
      </Text>
      <Button title="Arttır" onPress={() => {}} />
      <Button title="Azalt" onPress={() => {}} />
    </View>
  );
}

export default Counter;
