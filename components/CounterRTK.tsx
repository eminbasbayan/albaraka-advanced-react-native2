import { Button, Text, View } from 'react-native';
import { arttir, azalt } from '@/rtk/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

function CounterRTK() {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
        }}
      >
        CounterRTK: {count}
      </Text>
      <Button title="Arttır" onPress={() => dispatch(arttir())} />
      <Button title="Azalt" onPress={() => dispatch(azalt())} />
    </View>
  );
}

export default CounterRTK;
