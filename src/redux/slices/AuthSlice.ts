import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
  } from "@reduxjs/toolkit";
  import { authApi } from "@/api/services/AuthApi";
  import Cookies from "js-cookie";
  import type {
    LoginCredentials,
    LoginResponse,
    RegisterData,
    UserProfile,
  } from "@/types/auth.type";
  
  interface AuthState {
    user: UserProfile | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  }
  
  const initialState: AuthState = {
    user: null,
    token: Cookies.get("token") || null,
    loading: false,
    error: null,
    isAuthenticated: !!Cookies.get("token"),
  };
  
  // Thunks
  export const login = createAsyncThunk(
    "/login",
    async (credentials: LoginCredentials, { rejectWithValue }) => {
      try {
        const response = await authApi.login(credentials);
        Cookies.set("token", response.data.token);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
    }
  );
  
  export const register = createAsyncThunk(
    "/registration",
    async (data: RegisterData, { rejectWithValue }) => {
      try {
        const response = await authApi.register(data);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Registration failed");
      }
    }
  );
  
 export const getProfile = createAsyncThunk(
  "/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile();
      // response = { status, message, data: {...user} }
      return response; // ✅ only return user data object
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

  
  // Slice
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
      setCredentials: (state, action: PayloadAction<LoginResponse>) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
    },
    extraReducers: (builder) => {
      // Login
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.isAuthenticated = false;
        });
  
      // Register
      builder
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state) => {
          state.loading = false;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  
      // Profile
      builder
        .addCase(getProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(getProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearError, setCredentials } = authSlice.actions;
  export default authSlice.reducer;
  