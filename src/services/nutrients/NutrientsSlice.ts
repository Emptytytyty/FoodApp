import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../utils/types";

export interface NutrientsState {
  nutrientsByDays: { day: string; products: Product[] }[];
}

const initialState: NutrientsState = {
  nutrientsByDays: [ {day: "1", products: [{id: '1', carbs: 73, fats: 1.3, proteins: 12, name: 'макароны', weight: 200}, {id: '2', carbs: 0, fats: 2, proteins: 21, weight: 300, name: 'курица'}] }],
};

export const NutrientsSlice = createSlice({
  name: "nutrients",
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ day: string; product: Product }>,
    ) => {
      const { day, product } = action.payload;
      const dayToEdit = state.nutrientsByDays.find((item) => item.day === day);
      if (dayToEdit) dayToEdit.products.push(product);
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
    },
  },
  selectors: {
    productsSelector: (state, day: string) =>
      state.nutrientsByDays.find((item) => item.day === day)?.products,
  },
});

export const { addProduct, deleteProduct } = NutrientsSlice.actions;
export const { productsSelector } = NutrientsSlice.selectors;

export const nutrientsReducer = NutrientsSlice.reducer;
