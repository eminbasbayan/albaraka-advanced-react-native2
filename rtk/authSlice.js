import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// AsyncStorage'dan token yükle
export const loadAuthData = createAsyncThunk('auth/loadAuthData', async () => {
  const token = await AsyncStorage.getItem('authToken');
  const user = await AsyncStorage.getItem('authUser');

  if (token && user) {
    return {
      token,
      user: JSON.parse(user),
    };
  }
  return null;
});

// Login işlemi
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Token'ı AsyncStorage'a kaydet
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('authUser', JSON.stringify(credentials.username));

      return {
        token: data.token,
        user: credentials.username,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout işlemi
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('authUser');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Manuel login (eski yöntem - geriye dönük uyumluluk için)
    login: (state, action) => {
      state.token = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // loadAuthData
    builder
      .addCase(loadAuthData.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAuthData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
      })
      .addCase(loadAuthData.rejected, (state) => {
        state.loading = false;
      });

    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      });

    // logoutUser
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { login, clearError } = authSlice.actions;
export default authSlice;
