import type { Nutrients, Product } from "../types";

export const calcNutrients = (products: Product[] | undefined): Nutrients => {
  if (products)
    return products.reduce(
      (nutrients, product) => {
        nutrients.fats += +((product.fats * product.weight) / 100).toFixed(1);
        nutrients.carbs += +((product.carbs * product.weight) / 100).toFixed(1);
        nutrients.proteins += +(
          (product.proteins * product.weight) /
          100
        ).toFixed(1);
        return nutrients;
      },
      { carbs: 0, fats: 0, proteins: 0 },
    );
  return { proteins: 0, carbs: 0, fats: 0 };
};
