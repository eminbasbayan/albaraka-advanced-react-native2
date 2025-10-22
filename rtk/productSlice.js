import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'electronics', label: 'Elektronik' },
  { id: 'jewelery', label: 'Takı' },
  { id: "men's clothing", label: 'Erkek Giyim' },
  { id: "women's clothing", label: 'Kadın Giyim' },
];

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    return data;
  }
);

const initialState = {
  products: [],
  loading: 'idle', // | 'pending' | 'succeeded' | 'failed'
  error: null,
  selectedCategory: 'all',
  categories,
  allProducts: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      if (action.payload === 'all') {
        state.products = state.allProducts;
      } else {
        state.products = state.allProducts.filter(
          (product) => product.category === action.payload
        );
      }
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
        state.products = [];
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.allProducts = action.payload;
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = 'failed';
      });
  },
});

export const { setSelectedCategory } = productSlice.actions;

export default productSlice;
