import { configureStore } from "@reduxjs/toolkit";
import { nutrientsReducer } from "./nutrients/NutrientsSlice";
import {
  useSelector as selectorHook,
  useDispatch as dispatchHook,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    nutrients: nutrientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook<never>;
