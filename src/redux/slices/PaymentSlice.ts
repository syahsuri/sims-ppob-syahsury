import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // type-only import
import { transactionApi } from "@/api/services/TransactionApi";

interface PaymentState {
  loading: boolean;
  error: string | null;
  transaction: PaymentResponse | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  transaction: null,
};

export const createTransaction = createAsyncThunk(
  "payment/createTransaction",
  async (service_code: string, thunkAPI) => {
    try {
      const response = await transactionApi.pay({ service_code });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Gagal melakukan pembayaran"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.loading = false;
      state.error = null;
      state.transaction = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTransaction.fulfilled,
        (state, action: PayloadAction<PaymentResponse>) => {
          state.loading = false;
          state.transaction = action.payload;
        }
      )
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Gagal melakukan pembayaran";
      });
  },
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
