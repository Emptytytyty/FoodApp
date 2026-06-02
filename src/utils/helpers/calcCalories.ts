import type { Nutrients } from "../types";

export const calcCalories = (
  {
    proteins,
    fats,
    carbs
  }: Nutrients
): number => {
  return +(proteins * 4 + fats * 9 + carbs * 4).toFixed(0);
};
