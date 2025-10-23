import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';

function Counter() {
  //const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const countRef = useRef(0);
  const [, forceUpdate] = useState(0);

  function arttir() {
    countRef.current++;
    console.log(countRef.current);
    forceUpdate((n) => n + 1);
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
        }}
      >
        Counter: {countRef.current}
      </Text>
      <Button title="Arttır" onPress={arttir} />
      <Button title="Azalt" onPress={() => dispatch({ type: 'AZALT' })} />
    </View>
  );
}

export default Counter;
