import { axiosInstance } from "@/api/AxiosConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

interface BannerState {
  data: Banner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchBanners = createAsyncThunk("banners/fetch", async () => {
  const response = await axiosInstance.get("/banner");
  console.log("✅ Banner API Response:", response.data);
  return response.data.data;
});

const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch banners";
      });
  },
});

export default bannerSlice.reducer;
