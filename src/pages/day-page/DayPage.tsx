import { useParams } from "react-router";
import { FoodList } from "../../components/food-list/FoodList";
import { Totals } from "../../components/totals/Totals";
import { calcNutrients } from "../../utils/helpers/calcNutrients";
import style from "./dayPage.module.css";
import { addDay, productsSelector } from "../../services/nutrients/NutrientsSlice";
import { useDispatch, useSelector } from "../../services/store";
import { useEffect } from "react";

export const DayPage = () => {
  const day = useParams().id!;
  const products = useSelector(state =>
    productsSelector(state, day),
  ) || [];
  const nutrients = calcNutrients(products);
  const dispatch = useDispatch();
  const [date, month, year] = day.split('-');

  useEffect(() => {
    dispatch(addDay(day));
  }, [])

  return (
    <main className={style["day"]}>
      <Totals
        carbs={nutrients.carbs}
        fats={nutrients.fats}
        proteins={nutrients.proteins}
        date={new Date(+year, +month - 1, +date)}
      />
      <FoodList products={products}></FoodList>
    </main>
  );
};
