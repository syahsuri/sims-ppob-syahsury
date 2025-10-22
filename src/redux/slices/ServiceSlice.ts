import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceApi } from "@/api/services/ServiceApi";
import type { UiService } from "@/types/service.type";

interface ServiceState {
  services: UiService[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
};
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await serviceApi.getAllServices(); 
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Gagal memuat layanan");
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default serviceSlice.reducer;
