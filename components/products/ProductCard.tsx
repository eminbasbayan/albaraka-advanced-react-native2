import { Image, Text, View } from 'react-native';
import Button from '@/components/Button';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

function ProductCard({ item, deleteProduct, cart }) {
  const { addToCart, deleteFromCart } = useContext(CartContext);
  const { id, title, price, description, image, category } = item;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fff',
        marginBottom: 10,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'cover',
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 8,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: '#666',
          marginVertical: 4,
        }}
      >
        {description}
      </Text>
      <Text
        style={{
          color: '#999',
          fontStyle: 'italic',
        }}
      >
        ₺{price}
      </Text>

      <Text
        style={{
          color: '#999',
          fontStyle: 'italic',
        }}
      >
        {category}
      </Text>

      {!cart && <Button title="Sepete Ekle" onPress={() => addToCart(item)} />}
      <Button
        title="Ürünü Sil"
        onPress={() => (cart ? deleteFromCart(id) : deleteProduct(id))}
        variant="outline"
      />
      {/* <Button title="Ürünü Sil" onPress={()=> deleteProduct(id)} /> */}
    </View>
  );
}

export default ProductCard;
