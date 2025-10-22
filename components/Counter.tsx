import { Button, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
        }}
      >
        Counter: {count}
      </Text>
      <Button title="Arttır" onPress={() => dispatch({ type: 'ARTTIR' })} />
      <Button title="Azalt" onPress={() => dispatch({ type: 'AZALT' })} />
    </View>
  );
}

export default Counter;
