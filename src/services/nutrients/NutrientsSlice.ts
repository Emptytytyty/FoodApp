import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../utils/types";

export const saveProductsAPI = (state: NutrientsState) =>
  localStorage.setItem("products", JSON.stringify(state.nutrientsByDays));

export const loadProductsAPI = () => {
  const productsJSON = localStorage.getItem("products");
  return productsJSON ? JSON.parse(productsJSON) : null;
};

export interface NutrientsState {
  nutrientsByDays: { day: string; products: Product[] }[];
}

const initialState: NutrientsState = {
  nutrientsByDays: loadProductsAPI() || [],
};

export const NutrientsSlice = createSlice({
  name: "nutrients",
  initialState,
  reducers: {
    loadProducts: (state) => {
      const products = loadProductsAPI();
      if (products) state.nutrientsByDays = products;
    },
    setProducts: (state, action: PayloadAction<NutrientsState>) =>
      (state = action.payload),
    addProduct: (
      state,
      action: PayloadAction<{ day: string; product: Product }>,
    ) => {
      const { day, product } = action.payload;
      const dayToEdit = state.nutrientsByDays.find((item) => item.day === day);
      if (dayToEdit) dayToEdit.products.push(product);
      saveProductsAPI(state);
    },
    deleteProduct: (
      state,
      action: PayloadAction<{ day: string; productId: string }>,
    ) => {
      const { day, productId } = action.payload;
      const dayToEdit = state.nutrientsByDays.find((item) => item.day === day);
      if (dayToEdit) {
        const newProducts = dayToEdit.products.filter(
          (item) => item.id !== productId,
        );
        dayToEdit.products = newProducts;
      }
      saveProductsAPI(state);
    },
    addDay: (state, action: PayloadAction<string>) => {
      if (!state.nutrientsByDays.find((item) => item.day === action.payload)) {
        state.nutrientsByDays = [
          ...state.nutrientsByDays,
          { day: action.payload, products: [] },
        ];
        saveProductsAPI(state);
      }
    },
  },
  selectors: {
    productsSelector: (state, day: string) =>
      state.nutrientsByDays.find((item) => item.day === day)?.products,
  },
});

export const { addProduct, deleteProduct, addDay, setProducts, loadProducts } =
  NutrientsSlice.actions;
export const { productsSelector } = NutrientsSlice.selectors;

export const nutrientsReducer = NutrientsSlice.reducer;
