import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { authApi } from "@/api/services/AuthService";
import Cookies from "js-cookie";
import type { LoginCredentials, LoginResponse } from "@/types/auth.type";

interface AuthState {
  //   user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  //   user: cookieUtils.getUser(),
  token: Cookies.get("token") || null,
  loading: false,
  error: null,
  isAuthenticated: !!Cookies.get("token"),
};

// Async thunks
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

// export const register = createAsyncThunk(
//   'auth/register',
//   async (data: RegisterData, { rejectWithValue }) => {
//     try {
//       const response = await authApi.register(data);
//       cookieUtils.setToken(response.token);
//       cookieUtils.setUser(response.user);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Registration failed');
//     }
//   }
// );

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
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // // Register
    // builder
    //   .addCase(register.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
    //     state.loading = false;
    //     state.user = action.payload.user;
    //     state.token = action.payload.token;
    //     state.isAuthenticated = true;
    //   })
    //   .addCase(register.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //     state.isAuthenticated = false;
    //   });

    // // Logout
    // builder
    //   .addCase(logout.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(logout.fulfilled, (state) => {
    //     state.loading = false;
    //     state.user = null;
    //     state.token = null;
    //     state.isAuthenticated = false;
    //     state.error = null;
    //   })
    //   .addCase(logout.rejected, (state) => {
    //     state.loading = false;
    //     state.user = null;
    //     state.token = null;
    //     state.isAuthenticated = false;
    //   });

    // // Check Auth
    // builder
    //   .addCase(checkAuth.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(checkAuth.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.user = action.payload;
    //     state.isAuthenticated = true;
    //   })
    //   .addCase(checkAuth.rejected, (state) => {
    //     state.loading = false;
    //     state.user = null;
    //     state.token = null;
    //     state.isAuthenticated = false;
    //   });
  },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
