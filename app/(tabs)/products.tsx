import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setSelectedCategory } from '@/rtk/productSlice';

const ProductCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const { id, title, price, description, image, category } = item;

  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: image }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productDetails}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText} numberOfLines={1}>
            {category}
          </Text>
        </View>

        <Text style={styles.productTitle} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.productDescription} numberOfLines={3}>
          {description}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.productPrice}>₺{price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.addToCartText}>Sepete Ekle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ProductsScreen = () => {
  const { products, loading: isLoading, categories, selectedCategory } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState('all');
  const { cartItems } = useSelector((state) => state.cart);

  // async function fetchProducts() {
  //   setIsLoading(true);
  //   try {
  //     const url =
  //       selectedCategory === 'all'
  //         ? 'https://fakestoreapi.com/products'
  //         : `https://fakestoreapi.com/products/category/${selectedCategory}`;

  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setProducts(data);
  //   } catch (error) {
  //     console.log('Ürünler yüklenirken hata oluştu:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await fetchProducts();
  //   setRefreshing(false);
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [selectedCategory]);

  useEffect(() => {
    if (isLoading === 'idle') {
      dispatch(fetchProducts());
    }
  }, [isLoading]);

  const cartItemCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Ürünler</Text>
          <Text style={styles.headerSubtitle}>
            {products.length} ürün bulundu
          </Text>
        </View>
        {cartItemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
          </View>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item.id && styles.categoryChipActive,
              ]}
              onPress={() => dispatch(setSelectedCategory(item.id))}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === item.id && styles.categoryChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Products List */}
      {isLoading === "pending" && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2f95dc" />
          <Text style={styles.loadingText}>Ürünler yükleniyor...</Text>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>Ürün Bulunamadı</Text>
          <Text style={styles.emptyDescription}>
            Bu kategoride ürün bulunmamaktadır.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard item={item} />}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              // onRefresh={onRefresh}
              colors={['#2f95dc']}
              tintColor="#2f95dc"
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  cartBadge: {
    backgroundColor: '#2f95dc',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryChipActive: {
    backgroundColor: '#2f95dc',
    borderColor: '#2f95dc',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  productsList: {
    padding: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#f9f9f9',
  },
  productDetails: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
  productTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 24,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  addToCartButton: {
    backgroundColor: '#2f95dc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ProductsScreen;
