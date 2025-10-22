import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./slices/BannerSlice";
import authReducer from "./slices/AuthSlice";
import serviceReducer from "./slices/ServiceSlice";
import balanceReducer from "./slices/BalanceSlice";
import topupReducer from "./slices/TopupSlice";
import transactionReducer from "./slices/TransactionSlice";

export const store = configureStore({
  reducer: {
    banners: bannerReducer,
    auth: authReducer,
    service: serviceReducer,
    balance: balanceReducer,
    topup: topupReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
