import { useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter(props) {

  function azalt() {
    props.setCount(props.count - 1);
  }

  console.log(props.fullName);

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
        }}
      >
        Counter: {props.count}
      </Text>
      <Button title="Arttır" onPress={()=> props.arttir(2)} />
      <Button title="Azalt" onPress={azalt} />
      <Text>{props.fullName}</Text>
    </View>
  );
}

export default Counter;
