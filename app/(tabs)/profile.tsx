import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthData, logoutUser } from '@/rtk/authSlice';

const ProfileScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  // Component mount olduğunda auth data'yı yükle
  useEffect(() => {
    dispatch(loadAuthData());
  }, []);

  // Mock user data - username'den gerçek kullanıcı adını kullan
  const userData = {
    name: user || 'Ahmet Yılmaz',
    email: user ? `${user}@example.com` : 'ahmet.yilmaz@example.com',
    phone: '+90 555 123 45 67',
    avatar: 'https://i.pravatar.cc/150?img=12',
    memberSince: 'Ocak 2024',
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const menuItems = [
    {
      id: '1',
      icon: '📦',
      title: 'Siparişlerim',
      subtitle: 'Tüm siparişlerinizi görüntüleyin',
      onPress: () => console.log('Orders pressed'),
    },
    {
      id: '2',
      icon: '❤️',
      title: 'Favorilerim',
      subtitle: 'Beğendiğiniz ürünler',
      onPress: () => console.log('Favorites pressed'),
    },
    {
      id: '3',
      icon: '📍',
      title: 'Adreslerim',
      subtitle: 'Teslimat adreslerinizi yönetin',
      onPress: () => console.log('Addresses pressed'),
    },
    {
      id: '4',
      icon: '💳',
      title: 'Ödeme Yöntemlerim',
      subtitle: 'Kartlarınızı ve ödeme yöntemlerinizi yönetin',
      onPress: () => console.log('Payment methods pressed'),
    },
    {
      id: '5',
      icon: '🔔',
      title: 'Bildirimler',
      subtitle: 'Bildirim tercihlerinizi ayarlayın',
      onPress: () => console.log('Notifications pressed'),
    },
    {
      id: '6',
      icon: '🎁',
      title: 'Kuponlarım',
      subtitle: 'İndirim kuponlarınızı görüntüleyin',
      onPress: () => console.log('Coupons pressed'),
    },
    {
      id: '7',
      icon: '⚙️',
      title: 'Ayarlar',
      subtitle: 'Hesap ayarlarınızı düzenleyin',
      onPress: () => console.log('Settings pressed'),
    },
    {
      id: '8',
      icon: '❓',
      title: 'Yardım ve Destek',
      subtitle: 'SSS ve iletişim',
      onPress: () => console.log('Help pressed'),
    },
  ];

  // Show login prompt if not logged in
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.loginPromptContainer}>
          <Text style={styles.loginPromptIcon}>👤</Text>
          <Text style={styles.loginPromptTitle}>Giriş Yapın</Text>
          <Text style={styles.loginPromptDescription}>
            Hesabınıza giriş yaparak siparişlerinizi takip edebilir,
            favorilerinizi görebilir ve daha fazlasına erişebilirsiniz.
          </Text>

          <View style={styles.loginPromptButtons}>
            <Button
              title="Giriş Yap"
              onPress={() => router.push('/login')}
              fullWitdh
              variant="primary"
            />
            <Button
              title="Kayıt Ol"
              onPress={() => router.push('/register')}
              fullWitdh
              variant="outline"
            />
          </View>

          <View style={styles.guestOptions}>
            <Text style={styles.guestOptionsTitle}>Misafir Olarak Devam Et</Text>
            <TouchableOpacity
              style={styles.guestOptionItem}
              onPress={() => console.log('Track order')}
            >
              <Text style={styles.guestOptionIcon}>📦</Text>
              <Text style={styles.guestOptionText}>Sipariş Takibi</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.guestOptionItem}
              onPress={() => console.log('Help')}
            >
              <Text style={styles.guestOptionIcon}>❓</Text>
              <Text style={styles.guestOptionText}>Yardım ve Destek</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileCard}>
          <Image source={{ uri: userData.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberText}>
                Üyelik: {userData.memberSince}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => console.log('Edit profile pressed')}
          >
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sipariş</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Favori</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Kupon</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Hesap İşlemleri</Text>
        {menuItems.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Diğer</Text>
        {menuItems.slice(4).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versiyon 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 16,
    marginBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  memberBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberText: {
    fontSize: 12,
    color: '#2f95dc',
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  editButtonText: {
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f95dc',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 22,
  },
  menuContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  menuArrow: {
    fontSize: 28,
    color: '#ccc',
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ff4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  loginPromptContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  loginPromptIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  loginPromptTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  loginPromptDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  loginPromptButtons: {
    width: '100%',
    gap: 12,
    marginBottom: 40,
  },
  guestOptions: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  guestOptionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  guestOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  guestOptionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  guestOptionText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
});

export default ProfileScreen;
