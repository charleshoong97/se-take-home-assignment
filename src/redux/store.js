import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./reducers/orderReducer";
import { botReducer } from "./reducers/botReducer";
import { counterReducer } from "./reducers/counterReducer";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    bot: botReducer,
    orderCounter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
