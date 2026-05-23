import { useParams } from "react-router";
import { FoodList } from "../../components/food-list/FoodList";
import { Totals } from "../../components/totals/Totals";
import { calcNutrients } from "../../utils/helpers/calcNutrients";
import style from "./dayPage.module.css";
import { useSelector } from "react-redux";
import { productsSelector } from "../../services/nutrients/NutrientsSlice";
import type { RootState } from "../../services/store";

export const DayPage = () => {
  const day = useParams().id!;
  const products = useSelector((state: RootState) =>
    productsSelector(state, day),
  ) || [];
  const nutrients = calcNutrients(products);

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
      <FoodList products={products}></FoodList>
    </main>
  );
};
