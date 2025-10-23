import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function MemoExampleFixed() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');

  const items = ['apple', 'banana', 'orange', 'grape', 'watermelon'];

  // ✅ useMemo ile optimize edilmiş
  const filtered = useMemo(() => {
    console.log('Filtreleme hesaplandı 🍏');
    const result = items.filter((item) => {
      for (let i = 0; i < 100000000; i++) {} // ağır işlem
      return item.includes(search.toLowerCase());
    });
    return result;
  }, [search]); // sadece search değişince hesapla

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Ara..."
        value={search}
        onChangeText={setSearch}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Sayaç +1" onPress={() => setCount(count + 1)} />
      <Text>Sayaç: {count}</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}