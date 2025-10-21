import Button from '@/components/Button';
import CounterModal from '@/components/CounterModal';
import Products from '@/components/products/Products';
import { useState } from 'react';
import { View } from 'react-native';

function Index() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Products />

      <Button title="Modalı Aç" onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <CounterModal
          onClose={() => setModalVisible(false)}
          visible={modalVisible}
        />
      )}
    </View>
  );
}

export default Index;
