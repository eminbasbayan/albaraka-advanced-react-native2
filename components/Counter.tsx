import { useState } from 'react';
import { Button, Text, View } from 'react-native';

function Counter() {
  const [state, setState] = useState(0);
  let count = 0;

  function arttir() {
    // count = count + 1;
    // console.log(count);
    setState(state + 1);
  }

  function azalt(){
    setState(state - 1);
  }

  console.log("component re-rendered!");
  

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
        }}
      >
        Counter: {state}
      </Text>
      <Button title="Arttır" onPress={arttir} />
      <Button title="Azalt" onPress={azalt} />
    </View>
  );
}

export default Counter;
