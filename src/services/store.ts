import { configureStore } from "@reduxjs/toolkit";
import { nutrientsReducer } from "./nutrients/NutrientsSlice";

export const store = configureStore({
  reducer: {
    nutrients: nutrientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
