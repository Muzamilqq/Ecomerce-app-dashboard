import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://ecomerce-app-backend.vercel.app/api/v1";

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/order/admin/getall`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API}/order/admin/update/${orderId}`,
        { status },
        { withCredentials: true },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update order",
      );
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/order/admin/delete/${orderId}`, {
        withCredentials: true,
      });
      return orderId;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete order",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
      const idx = state.orders.findIndex(
        (o) => o.id === action.payload.updatedOrder.id,
      );
      if (idx !== -1)
        state.orders[idx] = {
          ...state.orders[idx],
          order_status: action.payload.updatedOrder.order_status,
        };
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    });
  },
});

export default orderSlice.reducer;
