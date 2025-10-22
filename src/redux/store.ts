import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/BannerSlice";
import authReducer from "./slices/AuthSlice";

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
