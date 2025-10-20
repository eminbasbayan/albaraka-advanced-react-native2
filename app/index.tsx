import { View, Text } from 'react-native';
import cartsData, { productsData, usersData } from '@/constants/productsData';

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {usersData.map((user) => {
        return <Text key={user.id}>{user.name.firstname}</Text>;
      })}
    </View>
  );
}

export default Index;
