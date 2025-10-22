import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/BannerSlice";

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
