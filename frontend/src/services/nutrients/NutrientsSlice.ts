import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  GoalsState,
  Product,
  ProductsState,
} from "../../utils/types";
import { format } from "date-fns";

export const saveProductsAPI = (products: ProductsState) =>
  localStorage.setItem("products", JSON.stringify(products));

export const loadProductsAPI = (): ProductsState => {
  const productsJSON = localStorage.getItem("products");
  return productsJSON ? JSON.parse(productsJSON) : [];
};

export const saveGoalsAPI = (goals: GoalsState) =>
  localStorage.setItem("goals", JSON.stringify(goals));

export const loadGoalsAPI = (): GoalsState => {
  const goalsJSON = localStorage.getItem("goals");
  return goalsJSON
    ? JSON.parse(goalsJSON)
    : { proteins: 0, calories: 0, carbs: 0, fats: 0 };
};

export interface NutrientsState {
  nutrientsByDays: ProductsState;
  goals: GoalsState;
}

const initialState: NutrientsState = {
  nutrientsByDays: loadProductsAPI(),
  goals: loadGoalsAPI(),
};

export const NutrientsSlice = createSlice({
  name: "nutrients",
  initialState,
  reducers: {
    loadProducts: (state) => {
      const products = loadProductsAPI();
      if (products) state.nutrientsByDays = products;
    },
    setProducts: (state, action: PayloadAction<NutrientsState>) => {
      state.nutrientsByDays = action.payload.nutrientsByDays;
    },
    addProduct: (
      state,
      action: PayloadAction<{ day: string; product: Product }>,
    ) => {
      const { day, product } = action.payload;
      const dayToEdit = state.nutrientsByDays.find((item) => item.day === day);
      if (dayToEdit) dayToEdit.products.push(product);
      saveProductsAPI(state.nutrientsByDays);
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
      saveProductsAPI(state.nutrientsByDays);
    },
    addDay: (state, action: PayloadAction<string>) => {
      if (!state.nutrientsByDays.find((item) => item.day === action.payload)) {
        state.nutrientsByDays = [
          ...state.nutrientsByDays,
          { day: action.payload, products: [] },
        ];
        saveProductsAPI(state.nutrientsByDays);
      }
    },
    setGoals: (state, action: PayloadAction<GoalsState>) => {
      state.goals = action.payload;
      saveGoalsAPI(state.goals);
    },
  },
  selectors: {
    productsSelector: (state, day: string) =>
      state.nutrientsByDays.find((item) => item.day === day)?.products,
    productsByIntervalSelector: (state, days: Date[]) => {
      const formatedDays = days.map((day) => format(day, "dd-MM-yyyy"));
      return state.nutrientsByDays.filter((item) =>
        formatedDays.includes(item.day),
      );
    },
  },
});

export const { addProduct, deleteProduct, addDay, setProducts, loadProducts, setGoals } =
  NutrientsSlice.actions;
export const { productsSelector, productsByIntervalSelector } =
  NutrientsSlice.selectors;

export const nutrientsReducer = NutrientsSlice.reducer;
