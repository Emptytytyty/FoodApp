export type Product = {
  id: string;
  name: string;
  proteins: number;
  fats: number;
  carbs: number;
  weight: number;
};

export type Nutrients = {
  proteins: number;
  carbs: number;
  fats: number;
};

export type ProductsState = { day: string; products: Product[] }[];

export type GoalsState = Nutrients & { calories: number };