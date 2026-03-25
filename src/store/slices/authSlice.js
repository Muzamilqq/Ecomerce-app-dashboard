import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API = "https://ecomerce-app-backend.vercel.app/api/v1";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/auth/me`, { withCredentials: true });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Not authenticated",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`${API}/auth/logout`, { withCredentials: true });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/auth/profile/update`, formData, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  },
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/auth/password/update`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password update failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    user: null,
    isAuthenticated: false,
    error: null,
    authChecked: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // checkAuth
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.authChecked = true;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.authChecked = true;
    });
    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.isLoggingIn = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      toast.success("Logged in successfully!");
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoggingIn = false;
      state.error = action.payload;
    });
    // logoutUser
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    // updateProfile
    builder.addCase(updateProfile.pending, (state) => {
      state.isUpdatingProfile = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isUpdatingProfile = false;
      state.user = action.payload.user;
      toast.success("Profile updated successfully!");
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isUpdatingProfile = false;
      toast.error(action.payload);
    });
    // updatePassword
    builder.addCase(updatePassword.pending, (state) => {
      state.isUpdatingPassword = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.isUpdatingPassword = false;
      toast.success("Password updated successfully!");
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isUpdatingPassword = false;
      toast.error(action.payload);
    });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
