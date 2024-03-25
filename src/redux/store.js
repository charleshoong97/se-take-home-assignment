import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./reducers/orderReducer";
import { botReducer } from "./reducers/botReducer";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    bot: botReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
