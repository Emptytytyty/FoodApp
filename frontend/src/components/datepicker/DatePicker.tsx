import { format, isSameDay, isSameMonth } from "date-fns";
import { useCalendar } from "../../utils/hooks/useCalendar";
import { ru } from "date-fns/locale";
import { Link } from "react-router";
import { productsByIntervalSelector } from "../../services/nutrients/NutrientsSlice";
import { useSelector } from "../../services/store";
import { calcNutrients } from "../../utils/helpers/calcNutrients";
import { calcCalories } from "../../utils/helpers/calcCalories";
import style from "./datePicker.module.css";
import { useEffect } from "react";

export const DatePicker = () => {
  const { currentMonth, nextMonth, prevMonth, days } = useCalendar();
  const productsByInterval = useSelector((state) =>
    productsByIntervalSelector(state, days),
  );

  const handleChangeMonthKeyboard = (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.key === "ArrowLeft") prevMonth();
    if (e.key === "ArrowRight") nextMonth();
  };

  useEffect(() => {
    document.body.addEventListener("keyup", handleChangeMonthKeyboard);

    return () => {
      document.body.removeEventListener("keyup", handleChangeMonthKeyboard);
    };
  }, [currentMonth]);

  return (
    <article className={`${style["date-picker"]} card`}>
      <header className={style["date-picker__header"]}>
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(currentMonth, "LLLL yyyy", { locale: ru })}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </header>
      <nav className={style["date-picker__navigation"]}>
        <ol className={style["navigation__days-of-week"]}>
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => (
            <li
              className={`${style["navigation__item"]} ${style["navigation__item--headers"]}`}
              key={day}
            >
              {day}
            </li>
          ))}
        </ol>
        <ol>
          {days.map((day) => {
            const isCurrentMonth = isSameMonth(currentMonth, day);
            const isCurrentDay = isSameDay(new Date(), day);
            const formatedDay = format(day, "dd-MM-yyyy", { locale: ru });
            const products = productsByInterval.find(
              (item) => item.day === formatedDay,
            )?.products;
            const { proteins, fats, carbs } = calcNutrients(products);
            const calories = calcCalories({ proteins, fats, carbs });

            return (
              <li
                className={`${style["navigation__item"]} ${isCurrentMonth ? "" : style["navigation__item--muted"]} ${isCurrentDay ? style["navigation__item--today"] : ""}`}
                key={formatedDay}
              >
                <Link
                  className={style["navigation__day"]}
                  to={`day/${formatedDay}`}
                >
                  <span className={style["day__number"]}>
                    {format(day, "dd")}
                  </span>
                  <b className={style["day__results"]}>
                    ккал<div>{calories}</div>
                  </b>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </article>
  );
};
