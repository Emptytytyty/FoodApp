import { FoodList } from "../../components/food-list/FoodList";
import { Totals } from "../../components/totals/Totals";
import { calcNutrients } from "../../utils/helpers/calcNutrients";
import type { Product } from "../../utils/types";
import style from "./dayPage.module.css";

export const DayPage = () => {
  const products = [] as Product[];
  const nutrients = calcNutrients(products);
  const setProducts = () => {}

  return (
    <main className={style["day"]}>
      <Totals
        carbs={nutrients.carbs}
        carbsGoal={400}
        fats={nutrients.fats}
        fatsGoal={80}
        proteins={nutrients.proteins}
        proteinsGoal={160}
      />
      <FoodList products={products} setProducts={setProducts}></FoodList>
    </main>
  );
};
