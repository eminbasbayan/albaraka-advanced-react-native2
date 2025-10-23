import { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CounterContext } from '@/context/CounterContext';
import { useDispatch, useSelector } from 'react-redux';
import CounterModal from '@/components/CounterModal';
import { addToCart, loadCart } from '@/rtk/cartSlice';
import { fetchProducts } from '@/rtk/productSlice';

const FeaturedProductCard = ({ item, onAddToCart }) => {
  const { title, price, image, category } = item;

  return (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
      <Image
        source={{ uri: image }}
        style={styles.featuredImage}
        resizeMode="contain"
      />
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredCategory} numberOfLines={1}>
          {category}
        </Text>
        <Text style={styles.featuredTitle} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.featuredFooter}>
          <Text style={styles.featuredPrice}>₺{price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.quickAddButton}
            onPress={() => onAddToCart(item)}
          >
            <Text style={styles.quickAddText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  // const [featuredProducts, setFeaturedProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { cartItems } = useSelector((state) => state.cart);
  const {
    products: featuredProducts,
    loading: isLoading,
    error,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { count, handleCount } = useContext(CounterContext);
  const router = useRouter();

  const cartItemCount = cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  console.log(featuredProducts);

  // async function fetchFeaturedProducts() {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch('https://fakestoreapi.com/products?limit=4');
  //     const data = await res.json();
  //     setFeaturedProducts(data);
  //   } catch (error) {
  //     console.log('Öne çıkan ürünler yüklenirken hata:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  useEffect(() => {
    // fetchFeaturedProducts();
    if (isLoading === 'idle') {
      dispatch(fetchProducts());
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(loadCart());
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Merhaba!</Text>
          <Text style={styles.headerTitle}>Alışverişe Başla</Text>
        </View>
        {cartItemCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{count}</Text>
              <Text style={styles.statLabel}>Sayaç</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{cartItemCount}</Text>
              <Text style={styles.statLabel}>Sepet</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{featuredProducts.length}</Text>
              <Text style={styles.statLabel}>Ürün</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleCount}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>📈</Text>
            <Text style={styles.actionText}>Sayacı Arttır</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>⏱️</Text>
            <Text style={styles.actionText}>Zamanlayıcı</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Öne Çıkan Ürünler</Text>
          <TouchableOpacity onPress={() => router.push('/products')}>
            <Text style={styles.seeAllText}>Tümünü Gör</Text>
          </TouchableOpacity>
        </View>

        {isLoading === 'pending' ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2f95dc" />
          </View>
        ) : (
          <View style={styles.featuredGrid}>
            {featuredProducts.map((product) => (
              <FeaturedProductCard
                key={product.id}
                item={product}
                onAddToCart={() =>
                  dispatch(addToCart({ ...product, quantity: 1 }))
                }
              />
            ))}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Hızlı Erişim</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/products')}
            >
              <Text style={styles.quickActionIcon}>🛍️</Text>
              <Text style={styles.quickActionLabel}>Ürünler</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/cart')}
            >
              <Text style={styles.quickActionIcon}>🛒</Text>
              <Text style={styles.quickActionLabel}>Sepetim</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.quickActionIcon}>⚙️</Text>
              <Text style={styles.quickActionLabel}>Ayarlar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {modalVisible && (
        <CounterModal
          onClose={() => setModalVisible(false)}
          visible={modalVisible}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cartBadge: {
    backgroundColor: '#2f95dc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2f95dc',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f95dc',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    gap: 12,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '47%',
    marginHorizontal: 6,
    marginBottom: 12,
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
  featuredImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#f9f9f9',
  },
  featuredInfo: {
    padding: 12,
  },
  featuredCategory: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    height: 36,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
  quickAddButton: {
    backgroundColor: '#2f95dc',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quickActionsSection: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  spacer: {
    height: 30,
  },
});

export default HomeScreen;
