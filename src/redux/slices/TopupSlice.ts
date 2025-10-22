import { topupApi } from "@/api/services/TopupApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface TopupState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: TopupState = {
  loading: false,
  success: false,
  error: null,
};

export const topup = createAsyncThunk(
  "topup/doTopup",
  async (amount: number, thunkAPI) => {
    try {
      const res = await topupApi.topup(amount);
      return res.top_up_amount;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Gagal top-up");
    }
  }
);

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(topup.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(topup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(topup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reset } = topupSlice.actions;
export default topupSlice.reducer;
