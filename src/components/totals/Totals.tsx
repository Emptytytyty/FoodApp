import { Link } from "react-router";
import { calcCalories } from "../../utils/helpers/calcCalories";
import style from "./totals.module.css";

interface TotalsProps {
  proteinsGoal: number;
  carbsGoal: number;
  fatsGoal: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export const Totals = ({
  carbs,
  carbsGoal,
  fats,
  fatsGoal,
  proteins,
  proteinsGoal,
}: TotalsProps) => {
  return (
    <section className={style['totals']}>
      <header className={style['totals__header']}>
        <h2 className={style['header__heading']}>Итоги БЖУ</h2>
        <Link className={style['header__link']} to={'/'}>На главную</Link>
      </header>
      <ul className={style['goals']}>
        <li>
          <b>Белки</b> {proteins.toFixed(0)}/{proteinsGoal}
        </li>
        <li>
          <b>Жиры</b> {fats.toFixed(0)}/{fatsGoal}
        </li>
        <li>
          <b>Углеводы</b> {carbs.toFixed(0)}/{carbsGoal}
        </li>
        <li>
          <b>Калории</b> {calcCalories({ proteins, fats, carbs }).toFixed(0)}/
          {calcCalories({
            carbs: carbsGoal,
            fats: fatsGoal,
            proteins: proteinsGoal,
          })}
        </li>
      </ul>
    </section>
  );
};
