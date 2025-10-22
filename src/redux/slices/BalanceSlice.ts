// redux/slices/BalanceSlice.ts
import { balanceApi } from "@/api/services/BalanceApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface BalanceState {
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  balance: 0,
  loading: false,
  error: null,
};

// Async thunk to fetch balance
export const fetchBalance = createAsyncThunk(
  "balance/fetch",
  async (_, thunkAPI) => {
    try {
      const balance = await balanceApi.getBalance();
      return balance;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Gagal memuat balance");
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default balanceSlice.reducer;
