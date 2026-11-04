import { Link } from "react-router";
import { calcCalories } from "../../utils/helpers/calcCalories";
import style from "./totals.module.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useSelector } from "../../services/store";

interface TotalsProps {
  proteins: number;
  carbs: number;
  fats: number;
  date: Date;
}

export const Totals = ({ carbs, fats, proteins, date }: TotalsProps) => {
  const goals = useSelector((state) => state.nutrients.goals);

  return (
    <section className={`${style["totals"]} card`}>
        <time className={style["date"]}>
          {format(date, "dd LLLL yyyy", { locale: ru })}
        </time>
      <header className={style["totals__header"]}>
        <h2 className={style["header__heading"]}>Итоги БЖУ</h2>
        <Link className={style["header__link"]} to={"/"}>
          На главную
        </Link>
      </header>
      <ul className={style["goals"]}>
        <li>
          <b>Белки</b> {proteins.toFixed(0)}/{goals.proteins}
        </li>
        <li>
          <b>Жиры</b> {fats.toFixed(0)}/{goals.fats}
        </li>
        <li>
          <b>Углеводы</b> {carbs.toFixed(0)}/{goals.carbs}
        </li>
        <li>
          <b>Калории</b> {calcCalories({ proteins, fats, carbs }).toFixed(0)}/
          {calcCalories(goals)}
        </li>
      </ul>
    </section>
  );
};
