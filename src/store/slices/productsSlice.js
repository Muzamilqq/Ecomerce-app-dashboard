import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://ecomerce-app-backend.vercel.app/api/v1";

export const fetchAdminProducts = createAsyncThunk(
  "product/fetchAdminProducts",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/product?page=${page}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

export const createNewProduct = createAsyncThunk(
  "product/createNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/product/admin/create`, formData, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create product",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ data, productId }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/product/admin/update/${productId}`,
        data,
        { withCredentials: true },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update product",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/product/admin/delete/${productId}`, {
        withCredentials: true,
      });
      return productId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete product",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    totalProducts: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAdminProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
    });
    builder.addCase(fetchAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createNewProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.unshift(action.payload.product);
    });
    builder.addCase(createNewProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const idx = state.products.findIndex(
        (p) => p.id === action.payload.updatedProduct.id,
      );
      if (idx !== -1) state.products[idx] = action.payload.updatedProduct;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    });
  },
});

export default productSlice.reducer;
