import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://ecomerce-app-backend.vercel.app/api/v1";

export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/admin/fetch/dashboard-stats`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch stats",
      );
    }
  },
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/admin/getallusers?page=${page}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/admin/delete/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete user",
      );
    }
  },
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    totalUsers: 0,
    users: [],
    totalRevenueAllTime: 0,
    todayRevenue: 0,
    yesterdayRevenue: 0,
    totalUsersCount: 0,
    monthlySales: [],
    orderStatusCounts: {
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    },
    topSellingProducts: [],
    lowStockProducts: [],
    revenueGrowth: "0%",
    newUsersThisMonth: 0,
    currentMonthSales: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDashboardStats.fulfilled, (state, action) => {
      state.loading = false;
      const d = action.payload;
      state.totalRevenueAllTime = d.totalRevenueAllTime;
      state.todayRevenue = d.todayRevenue;
      state.yesterdayRevenue = d.yesterdayRevenue;
      state.totalUsersCount = d.totalUsersCount;
      state.monthlySales = d.monthlySales;
      state.orderStatusCounts = d.orderStatusCounts;
      state.topSellingProducts = d.topSellingProducts;
      state.lowStockProducts = d.lowStockProducts;
      state.revenueGrowth = d.revenueGrowth;
      state.newUsersThisMonth = d.newUsersThisMonth;
      state.currentMonthSales = d.currentMonthSales;
    });
    builder.addCase(fetchDashboardStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.totalUsers = action.payload.totalUsers;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    });
  },
});

export default adminSlice.reducer;
