// redux/slices/TransactionSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "@/api/AxiosConfig";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  time: string;
  type: string;
  description: string;
}

interface TransactionState {
  records: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  records: [],
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchHistory",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/transaction/history");
      const records = res.data.data.records.map((r: any) => {
        const dateObj = new Date(r.created_on);
        return {
          id: r.invoice_number,
          amount: r.transaction_type === "TOPUP" ? r.total_amount : -r.total_amount,
          date: dateObj.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" }),
          time: dateObj.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
          type: r.transaction_type === "TOPUP" ? "Top Up Saldo" : r.description,
          description: r.description,
        } as Transaction;
      });
      return records;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Gagal memuat transaksi");
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
