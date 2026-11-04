import style from "./goalsForm.module.css";
import { useDispatch, useSelector } from "../../services/store";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { setGoals } from "../../services/nutrients/NutrientsSlice";

export const GoalsForm = () => {
  const dispatch = useDispatch();
  const goalsState = useSelector((state) => state.nutrients.goals);
  const [goalsValues, setGoalsValues] = useState(goalsState);

  const handleGoalInput = (e: ChangeEvent<HTMLInputElement>) => {
    setGoalsValues({ ...goalsValues, [e.target.name]: +e.target.value });
  };

  const formRef = useRef<HTMLFormElement>(null);
  const preventPropagation = (e: Event) => e.stopPropagation();

  useEffect(() => {
    if (formRef.current)
      formRef.current.addEventListener("keyup", preventPropagation);

    return () => {
      if (formRef.current)
        formRef.current.removeEventListener("keyup", preventPropagation);
    };
  }, [formRef.current]);

  return (
    <form className={`${style["goals-form"]} card`} ref={formRef}>
      <h3 className={style["form-heading"]}>Цели</h3>
      <fieldset className={style["fieldset"]}>
        <label className={style["input-label"]}>
          <div>Белки (г)</div>
          <input
            className={style["form-input"]}
            value={
              goalsValues.proteins ? Math.max(0, goalsValues.proteins) : ""
            }
            onChange={handleGoalInput}
            name="proteins"
            type="number"
            placeholder="0"
          />
        </label>
        <label className={style["input-label"]}>
          <div>Жиры (г)</div>
          <input
            className={style["form-input"]}
            value={goalsValues.fats ? Math.max(0, goalsValues.fats) : ""}
            onChange={handleGoalInput}
            name="fats"
            type="number"
            placeholder="0"
          />
        </label>
        <label className={style["input-label"]}>
          <div>Углеводы (г)</div>
          <input
            className={style["form-input"]}
            value={goalsValues.carbs ? Math.max(0, goalsValues.carbs) : ""}
            onChange={handleGoalInput}
            name="carbs"
            type="number"
            placeholder="0"
          />
        </label>
      </fieldset>

      <button
        className={style["form-button"]}
        type="button"
        onClick={() => dispatch(setGoals(goalsValues))}
      >
        Изменить
      </button>
    </form>
  );
};
