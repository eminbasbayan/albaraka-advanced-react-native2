# React Native - Kapsamlı Eğitim Dökümanı

## Proje Hakkında
Bu döküman, **Albaraka Advanced React Native** projesinde kullanılan tüm React Native kavramlarını, componentleri ve best practice'leri içermektedir.

---

## İçindekiler

1. [Temel React Native Componentleri](#1-temel-react-native-componentleri)
2. [React Hooks](#2-react-hooks)
3. [State Yönetimi](#3-state-yönetimi)
4. [Navigation (Routing)](#4-navigation-routing)
5. [Form Yönetimi ve Validation](#5-form-yönetimi-ve-validation)
6. [Async Storage](#6-async-storage)
7. [API İşlemleri](#7-api-işlemleri)
8. [Styling](#8-styling)
9. [TypeScript Kullanımı](#9-typescript-kullanımı)
10. [Best Practices](#10-best-practices)

---

## 1. Temel React Native Componentleri

### 1.1 View
Container component, HTML'deki `<div>` etiketine benzer.

```jsx
<View style={styles.container}>
  <Text>Merhaba</Text>
</View>
```

**Kullanıldığı Yerler:**
- `app/(tabs)/cart.tsx:32` - CartItemCard container
- `app/(tabs)/profile.tsx:90` - Login prompt container
- `components/CounterModal.tsx:45` - Modal overlay

**Özellikler:**
- Flexbox layouting
- Style desteği
- Touch/gesture handling için parent olabilir

---

### 1.2 Text
Metin göstermek için kullanılır.

```jsx
<Text style={styles.title}>Başlık</Text>
<Text numberOfLines={2}>Uzun metin...</Text>
```

**Kullanıldığı Yerler:**
- `app/(tabs)/index.tsx:98` - Greeting text
- `app/(tabs)/cart.tsx:39` - Product title
- `app/(tabs)/profile.tsx:93` - Login prompt title

**Özellikler:**
- `numberOfLines` - Metin satır sınırlaması
- `ellipsizeMode` - Taşma davranışı
- Nested text desteklenir

---

### 1.3 TextInput
Kullanıcı input'u almak için kullanılır.

```jsx
<TextInput
  style={styles.input}
  placeholder="E-posta"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
  secureTextEntry={false}
/>
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:86` - Email input
- `app/(tabs)/register.tsx:59` - Full name input
- React Hook Form ile Controller içinde

**Önemli Props:**
- `placeholder` - Placeholder text
- `value` - Kontrol edilen değer
- `onChangeText` - Değişiklik callback'i
- `keyboardType` - Klavye tipi (email-address, phone-pad, numeric)
- `autoCapitalize` - Otomatik büyük harf (none, sentences, words, characters)
- `autoCorrect` - Otomatik düzeltme
- `secureTextEntry` - Şifre input'u için

---

### 1.4 ScrollView
Kaydırılabilir içerik için kullanılır.

```jsx
<ScrollView
  style={styles.scrollView}
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
>
  {/* İçerik */}
</ScrollView>
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:68` - Login form scroll
- `app/(tabs)/cart.tsx:113` - Cart items scroll
- `app/(tabs)/profile.tsx:139` - Profile content scroll

**Önemli Props:**
- `contentContainerStyle` - İçerik container style'ı
- `showsVerticalScrollIndicator` - Scroll bar gösterimi
- `keyboardShouldPersistTaps` - Klavye açıkken tap davranışı

---

### 1.5 TouchableOpacity
Dokunma efekti ile buton oluşturur.

```jsx
<TouchableOpacity
  style={styles.button}
  onPress={handlePress}
  activeOpacity={0.7}
>
  <Text>Tıkla</Text>
</TouchableOpacity>
```

**Kullanıldığı Yerler:**
- `app/(tabs)/cart.tsx:45` - Quantity decrease button
- `app/(tabs)/profile.tsx:117` - Guest option item
- `components/CounterModal.tsx:50` - Close button

**Önemli Props:**
- `onPress` - Tıklama callback'i
- `activeOpacity` - Tıklama sırasında opacity (0-1)
- `disabled` - Devre dışı bırakma

---

### 1.6 Image
Resim göstermek için kullanılır.

```jsx
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={styles.image}
  resizeMode="contain"
/>
```

**Kullanıldığı Yerler:**
- `app/(tabs)/cart.tsx:33` - Product image
- `app/(tabs)/index.tsx:24` - Featured product image
- `app/(tabs)/profile.tsx:142` - User avatar

**ResizeMode Değerleri:**
- `cover` - Alanı kaplama (kırpabilir)
- `contain` - Tam görünme (boşluk bırakabilir)
- `stretch` - Uzatma
- `repeat` - Tekrarlama
- `center` - Merkezde gösterme

---

### 1.7 Modal
Overlay modal göstermek için kullanılır.

```jsx
<Modal
  animationType="slide"
  transparent={true}
  visible={visible}
  onRequestClose={onClose}
>
  <View style={styles.overlay}>
    {/* Modal içeriği */}
  </View>
</Modal>
```

**Kullanıldığı Yerler:**
- `components/CounterModal.tsx:39` - Counter modal

**Önemli Props:**
- `visible` - Modal görünürlüğü
- `animationType` - Animasyon tipi (none, slide, fade)
- `transparent` - Arka plan şeffaflığı
- `onRequestClose` - Android back button handler

---

### 1.8 ActivityIndicator
Yükleme göstergesi.

```jsx
<ActivityIndicator color="#2f95dc" size="small" />
```

**Kullanıldığı Yerler:**
- `components/Button.tsx:65` - Button loading state
- `app/(tabs)/index.tsx:9` - Products loading

**Props:**
- `size` - Boyut (small, large)
- `color` - Renk
- `animating` - Animasyon durumu

---

### 1.9 KeyboardAvoidingView
Klavye açıldığında içeriği ayarlar.

```jsx
<KeyboardAvoidingView
  style={styles.container}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  {/* Form içeriği */}
</KeyboardAvoidingView>
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:64` - Login form
- `app/(tabs)/register.tsx:40` - Register form

**Behavior Değerleri:**
- `height` - Container yüksekliğini ayarlar
- `position` - Pozisyonu değiştirir
- `padding` - Padding ekler

---

## 2. React Hooks

### 2.1 useState
State yönetimi için temel hook.

```jsx
const [count, setCount] = useState(0);
const [email, setEmail] = useState('');
const [isVisible, setIsVisible] = useState(false);
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:30-31` - Email, password state
- `components/CounterModal.tsx:6-7` - Counter, isRunning state
- `app/(tabs)/register.tsx:16-23` - Form states

**Kullanım Örnekleri:**
```jsx
// Basit değer
const [count, setCount] = useState(0);

// Nesne
const [user, setUser] = useState({ name: '', email: '' });

// Array
const [items, setItems] = useState([]);

// Boolean
const [isLoading, setIsLoading] = useState(false);

// Functional update (önceki değere göre güncelleme)
setCount(prevCount => prevCount + 1);
```

---

### 2.2 useEffect
Side effect'ler için kullanılır.

```jsx
useEffect(() => {
  // Component mount olduğunda çalışır
  fetchData();

  // Cleanup function
  return () => {
    cleanup();
  };
}, [dependency]); // Dependency array
```

**Kullanıldığı Yerler:**
- `components/CounterModal.tsx:9` - Timer effect
- `app/(tabs)/cart.tsx:27` - Load cart on mount
- `app/(tabs)/login.tsx:49` - Redirect after login
- `app/(tabs)/profile.tsx:21` - Load auth data

**Dependency Array Davranışı:**
```jsx
// Her render'da çalışır (KÖTÜ KULLANIM)
useEffect(() => {
  console.log('Her render');
});

// Sadece mount'da çalışır
useEffect(() => {
  console.log('Component mount');
}, []);

// Belirli değer değiştiğinde çalışır
useEffect(() => {
  console.log('Count değişti:', count);
}, [count]);

// Cleanup function ile
useEffect(() => {
  const timer = setInterval(() => {}, 1000);

  return () => {
    clearInterval(timer); // Unmount'da temizlik
  };
}, []);
```

---

### 2.3 useContext
Context API ile state paylaşımı.

```jsx
const { count, handleCount } = useContext(CounterContext);
```

**Kullanıldığı Yerler:**
- `app/(tabs)/index.tsx:61` - CounterContext kullanımı
- `components/products/ProductCard.tsx:7` - CartContext kullanımı

**Context Oluşturma ve Kullanma:**
```jsx
// Context oluşturma
export const CounterContext = createContext();

// Provider oluşturma
const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

// Context kullanma
function Component() {
  const { count, setCount } = useContext(CounterContext);
  return <Text>{count}</Text>;
}
```

---

### 2.4 useRef
Render'lar arası değer saklama ve DOM referansı.

```jsx
const countRef = useRef(0);
const inputRef = useRef(null);
```

**Kullanıldığı Yerler:**
- `components/Counter.tsx:8` - Count reference

**useRef vs useState:**
```jsx
// useState - Her değişiklikte re-render
const [count, setCount] = useState(0);

// useRef - Değişiklikte re-render YOK
const countRef = useRef(0);

// useRef kullanım örnekleri
function Component() {
  const countRef = useRef(0);
  const inputRef = useRef(null);

  // Değer değiştirme (re-render olmaz)
  countRef.current++;

  // Input'a focus
  inputRef.current?.focus();

  return <TextInput ref={inputRef} />;
}
```

**ForceUpdate Pattern:**
```jsx
const countRef = useRef(0);
const [, forceUpdate] = useState(0);

function increment() {
  countRef.current++;
  forceUpdate(n => n + 1); // Re-render tetikle
}
```

---

### 2.5 useDispatch (Redux)
Redux action dispatch etmek için.

```jsx
const dispatch = useDispatch();

dispatch(loginUser({ username, password }));
dispatch(addToCart(product));
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:46` - Login dispatch
- `app/(tabs)/cart.tsx:22` - Cart actions
- `app/(tabs)/index.tsx:62` - Product actions

---

### 2.6 useSelector (Redux)
Redux state'i okumak için.

```jsx
const { cartItems } = useSelector((state) => state.cart);
const { isAuthenticated, user } = useSelector((state) => state.auth);
```

**Kullanıldığı Yerler:**
- `app/(tabs)/cart.tsx:84` - Cart state
- `app/(tabs)/login.tsx:45` - Auth state
- `app/(tabs)/profile.tsx:18` - Auth state

---

### 2.7 useRouter (Expo Router)
Navigasyon için kullanılır.

```jsx
const router = useRouter();

router.push('/profile');
router.back();
router.replace('/login');
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:31` - Navigation after login
- `app/(tabs)/profile.tsx:16` - Login navigation

**Router Metodları:**
- `push(path)` - Yeni sayfaya git
- `replace(path)` - Geçmişi değiştir
- `back()` - Geri git
- `setParams(params)` - Parametreleri güncelle

---

### 2.8 useForm (React Hook Form)
Form yönetimi için kullanılır.

```jsx
const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
    username: '',
    password: ''
  }
});
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:32` - Login form

---

## 3. State Yönetimi

### 3.1 Context API
Basit global state yönetimi.

**Context Tanımlama:**
```jsx
// context/CounterContext.jsx
export const CounterContext = createContext();

const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  function handleCount() {
    setCount(prevCount => prevCount + 1);
  }

  return (
    <CounterContext.Provider value={{ count, handleCount }}>
      {children}
    </CounterContext.Provider>
  );
};
```

**Kullanım:**
```jsx
// Component içinde
const { count, handleCount } = useContext(CounterContext);
```

---

### 3.2 Redux Toolkit
Gelişmiş state yönetimi.

**Store Yapısı:**
```jsx
// rtk/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import authSlice from './authSlice';
import productSlice from './productSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    product: productSlice.reducer,
  },
});
```

**Slice Oluşturma:**
```jsx
// rtk/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  total: 0,
};

export const loadCart = createAsyncThunk('cart/loadCart', async () => {
  const saved = await AsyncStorage.getItem('cartItems');
  return saved ? JSON.parse(saved) : [];
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Immer kullanarak direkt state mutation
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice;
```

**Component'te Kullanım:**
```jsx
function Component() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <View>
      <Text>{cartItems.length} items</Text>
      <Button onPress={handleAdd} />
    </View>
  );
}
```

---

### 3.3 createAsyncThunk
Async işlemler için Redux thunk.

```jsx
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      await AsyncStorage.setItem('token', data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice içinde
extraReducers: (builder) => {
  builder
    .addCase(loginUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
}
```

---

## 4. Navigation (Routing)

### 4.1 Expo Router (File-based Routing)
Dosya sistemine dayalı routing.

**Proje Yapısı:**
```
app/
├── _layout.tsx              # Root layout
├── index.tsx                # Root route
└── (tabs)/                  # Tab group
    ├── _layout.tsx          # Tab layout
    ├── index.tsx            # /
    ├── products.tsx         # /products
    ├── cart.tsx            # /cart
    ├── profile.tsx         # /profile
    ├── login.tsx           # /login
    └── register.tsx        # /register
```

**Tab Layout:**
```jsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null, // Tab bar'dan gizle
        }}
      />
    </Tabs>
  );
}
```

**Navigation:**
```jsx
import { useRouter } from 'expo-router';

function Component() {
  const router = useRouter();

  return (
    <Button onPress={() => router.push('/profile')} />
  );
}
```

---

## 5. Form Yönetimi ve Validation

### 5.1 React Hook Form
Form state yönetimi ve validation.

**Kurulum ve Kullanım:**
```jsx
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation schema
const loginSchema = yup.object({
  username: yup.string().required('Username zorunlu!'),
  password: yup
    .string()
    .required('Şifre gerekli!')
    .min(6, 'Şifre en az 6 karakter olmalıdır!'),
});

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Username"
          />
        )}
      />
      {errors.username && (
        <Text style={{ color: 'red' }}>
          {errors.username.message}
        </Text>
      )}

      <Button
        title="Giriş Yap"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
```

**Kullanıldığı Yerler:**
- `app/(tabs)/login.tsx:32-42` - Login form

---

### 5.2 Yup Validation
Schema-based validation.

```jsx
const registerSchema = yup.object({
  fullName: yup.string().required('Ad Soyad gerekli'),
  email: yup
    .string()
    .email('Geçerli bir email girin')
    .required('Email gerekli'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Geçerli telefon numarası girin'),
  password: yup
    .string()
    .min(8, 'En az 8 karakter')
    .matches(/[A-Z]/, 'En az bir büyük harf')
    .matches(/[0-9]/, 'En az bir rakam'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor'),
});
```

---

## 6. Async Storage

### 6.1 Temel Kullanım
Local storage için AsyncStorage.

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kaydetme
await AsyncStorage.setItem('key', 'value');
await AsyncStorage.setItem('user', JSON.stringify(userObject));

// Okuma
const value = await AsyncStorage.getItem('key');
const user = JSON.parse(await AsyncStorage.getItem('user'));

// Silme
await AsyncStorage.removeItem('key');

// Tümünü temizleme
await AsyncStorage.clear();

// Tüm anahtarları alma
const keys = await AsyncStorage.getAllKeys();
```

**Kullanıldığı Yerler:**
- `rtk/authSlice.js:14-23` - Auth data loading
- `rtk/authSlice.js:47-48` - Token saving
- `rtk/cartSlice.js:10-14` - Cart loading

---

### 6.2 Redux ile Entegrasyon
AsyncStorage + Redux.

```jsx
// Load data from storage
export const loadAuthData = createAsyncThunk(
  'auth/loadAuthData',
  async () => {
    const token = await AsyncStorage.getItem('authToken');
    const user = await AsyncStorage.getItem('authUser');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return null;
  }
);

// Save data to storage
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // Save to AsyncStorage
    await AsyncStorage.setItem('authToken', data.token);
    await AsyncStorage.setItem('authUser', JSON.stringify(data.user));

    return data;
  }
);
```

---

## 7. API İşlemleri

### 7.1 Fetch API
Native fetch kullanımı.

```jsx
// GET request
const fetchProducts = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

// POST request
const loginUser = async (credentials) => {
  try {
    const response = await fetch('https://api.example.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

**Kullanıldığı Yerler:**
- `rtk/authSlice.js:31-43` - Login API
- `rtk/productSlice.js` - Products fetch

---

### 7.2 Redux Thunk ile API
Async actions ile API calls.

```jsx
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice içinde
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      });
  },
});
```

---

## 8. Styling

### 8.1 StyleSheet
React Native'de stil oluşturma.

```jsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

// Kullanım
<View style={styles.container}>
  <Text style={styles.text}>Merhaba</Text>
</View>
```

---

### 8.2 Flexbox
Layout sistemi.

```jsx
const styles = StyleSheet.create({
  container: {
    flex: 1, // Tüm alanı kapla
    flexDirection: 'row', // Yatay dizilim (default: column)
    justifyContent: 'center', // Ana eksen hizalama
    alignItems: 'center', // Çapraz eksen hizalama
    gap: 12, // Elemanlar arası boşluk
  },
  item: {
    flex: 1, // Eşit alan paylaşımı
    alignSelf: 'stretch', // Kendini çapraz eksende uzat
  },
});
```

**JustifyContent Değerleri:**
- `flex-start` - Başta hizala
- `flex-end` - Sonda hizala
- `center` - Ortala
- `space-between` - Aralarına boşluk
- `space-around` - Etrafına boşluk
- `space-evenly` - Eşit boşluk

**AlignItems Değerleri:**
- `flex-start` - Başta hizala
- `flex-end` - Sonda hizala
- `center` - Ortala
- `stretch` - Uzat
- `baseline` - Metin baseline'ına göre

---

### 8.3 Platform Specific Styles
Platform'a özel stiller.

```jsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
```

---

### 8.4 Conditional Styles
Koşullu stil uygulama.

```jsx
<View
  style={[
    styles.button,
    isActive && styles.activeButton,
    disabled && styles.disabledButton,
  ]}
>
  <Text>Button</Text>
</View>

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#2f95dc',
  },
  activeButton: {
    backgroundColor: '#1a7dc0',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
```

---

### 8.5 Shadow Styles
iOS ve Android için shadow.

```jsx
const styles = StyleSheet.create({
  card: {
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Android shadow
    elevation: 5,
  },
});
```

---

## 9. TypeScript Kullanımı

### 9.1 Component Props Typing
Component prop'larını tanımlama.

```tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  fullWitdh?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWitdh = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

**Kullanıldığı Yerler:**
- `components/Button.tsx:9-16`

---

### 9.2 Redux State Typing
Redux state tiplerini tanımlama.

```tsx
interface AuthState {
  token: string | null;
  user: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// useSelector ile kullanım
const { isAuthenticated, user } = useSelector(
  (state: RootState) => state.auth
);
```

---

## 10. Best Practices

### 10.1 Component Yapısı
```tsx
// 1. Import'lar
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// 2. Type/Interface tanımlamaları
interface Props {
  title: string;
}

// 3. Component
const Component: React.FC<Props> = ({ title }) => {
  // 3.1 Hooks (useState, useEffect, custom hooks)
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  // 3.2 useEffect'ler
  useEffect(() => {
    // Side effects
  }, []);

  // 3.3 Event handler'lar
  const handlePress = () => {
    setCount(prev => prev + 1);
  };

  // 3.4 Render
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

// 4. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// 5. Export
export default Component;
```

---

### 10.2 Performance Optimization

**React.memo kullanımı:**
```tsx
const ProductCard = React.memo(({ item }) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
});
```

**useCallback kullanımı:**
```tsx
const handlePress = useCallback(() => {
  dispatch(addToCart(product));
}, [product]);
```

**useMemo kullanımı:**
```tsx
const total = useMemo(() => {
  return cartItems.reduce((sum, item) => sum + item.price, 0);
}, [cartItems]);
```

---

### 10.3 Error Handling
```tsx
const fetchData = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network error');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    // User'a hata göster
    Alert.alert('Hata', 'Bir hata oluştu');
  }
};
```

---

### 10.4 Kod Organizasyonu

```
project/
├── app/                    # Sayfalar
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── products.tsx
│   │   └── cart.tsx
│   └── _layout.tsx
├── components/             # Reusable componentler
│   ├── Button.tsx
│   ├── ProductCard.tsx
│   └── Counter.tsx
├── context/               # Context providers
│   ├── CounterContext.jsx
│   └── CartContext.jsx
├── rtk/                   # Redux slices
│   ├── store.js
│   ├── authSlice.js
│   ├── cartSlice.js
│   └── productSlice.js
├── utils/                 # Utility functions
├── hooks/                 # Custom hooks
└── constants/             # Constants
```

---

### 10.5 Naming Conventions

**Dosya İsimlendirme:**
- Components: PascalCase (Button.tsx, ProductCard.tsx)
- Utilities: camelCase (formatPrice.ts)
- Constants: UPPER_SNAKE_CASE (API_URL.ts)

**Component İsimlendirme:**
```tsx
// İyi
const UserProfile = () => {};
const ProductCard = () => {};

// Kötü
const userprofile = () => {};
const product_card = () => {};
```

**Function İsimlendirme:**
```tsx
// Event handlers
const handlePress = () => {};
const handleInputChange = () => {};

// Boolean returns
const isValid = () => {};
const hasItems = () => {};

// Get/Set
const getUserData = () => {};
const setUserData = () => {};
```

---

## 11. Özel Durumlar ve İpuçları

### 11.1 ForceUpdate Pattern
useRef ile re-render tetikleme:

```jsx
const countRef = useRef(0);
const [, forceUpdate] = useState(0);

function increment() {
  countRef.current++;
  forceUpdate(n => n + 1); // Re-render tetikle
}
```

**Kullanıldığı Yerler:**
- `components/Counter.tsx:8-14`

---

### 11.2 Cleanup Functions
useEffect cleanup fonksiyonları:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Running...');
  }, 1000);

  // Component unmount olduğunda çalışır
  return () => {
    clearInterval(timer);
  };
}, []);
```

**Kullanıldığı Yerler:**
- `components/CounterModal.tsx:23-26` - Timer cleanup

---

### 11.3 Conditional Rendering
```jsx
// && operator
{isLoading && <ActivityIndicator />}

// Ternary operator
{isLoading ? <ActivityIndicator /> : <Content />}

// Early return
if (isLoading) return <ActivityIndicator />;

// Null safety
{user?.name}
{items?.length > 0 && <List />}
```

---

### 11.4 List Rendering
```jsx
{items.map((item) => (
  <ProductCard key={item.id} item={item} />
))}

// Array methods
{items.slice(0, 4).map(...)}
{items.filter(item => item.active).map(...)}
{items.reduce((acc, item) => acc + item.price, 0)}
```

---

## 12. Proje Özet Özellikleri

### Kullanılan Teknolojiler:
- ✅ React Native
- ✅ Expo Router (File-based routing)
- ✅ Redux Toolkit (State management)
- ✅ AsyncStorage (Persistence)
- ✅ React Hook Form (Form handling)
- ✅ Yup (Validation)
- ✅ TypeScript
- ✅ Context API
- ✅ Ionicons

### Özellikler:
- ✅ Authentication (Login/Register)
- ✅ Shopping Cart
- ✅ Product Listing
- ✅ User Profile
- ✅ Form Validation
- ✅ Persistent Storage
- ✅ API Integration
- ✅ Modal Management
- ✅ Tab Navigation
- ✅ Loading States
- ✅ Error Handling

---

## Kaynaklar

- [React Native Documentation](https://reactnative.dev)
- [Expo Router Documentation](https://expo.github.io/router)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Yup Validation](https://github.com/jquense/yup)

---

**Not:** Bu döküman, projede kullanılan tüm React Native kavramlarını kapsamaktadır. Her bölüm, gerçek kod örnekleri ve kullanım yerleri ile detaylandırılmıştır.
