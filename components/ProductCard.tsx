import { Image, Text, View } from 'react-native';

function ProductCard({ item: { title, price, description, image, category } }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#fff',
        marginBottom: 10
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
    </View>
  );
}

export default ProductCard;
