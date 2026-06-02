import { useState, type ChangeEvent } from "react";
import style from "./foodList.module.css";
import { calcCalories } from "../../utils/helpers/calcCalories";
import type { Product } from "../../utils/types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/store";
import {
  addProduct,
  deleteProduct,
} from "../../services/nutrients/NutrientsSlice";
import { useParams } from "react-router";
import { calcNutrients } from "../../utils/helpers/calcNutrients";

interface FoodListProps {
  products: Product[];
}

export const FoodList = ({ products }: FoodListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialNewFood = {
    carbs: 0,
    fats: 0,
    proteins: 0,
    weight: 0,
    name: "",
  };
  const [newFood, setNewFood] = useState<Omit<Product, "id">>(initialNewFood);
  const day = useParams().id!;

  const handleAddNewFood = () => {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    dispatch(
      addProduct({
        day,
        product: { ...newFood, id, weight: newFood.weight || 100 },
      }),
    );
    setNewFood(initialNewFood);
  };

  const handleNewFoodInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewFood((prev) => ({
      ...prev,
      [name]: name !== "name" ? +value : value,
    }));
  };

  return (
    <section className={style["food-list"]}>
      <header className={style["food-list__header"]}>
        <h2 className={style["header__heading"]}>Продукты</h2>
      </header>
      <form className={style["food-list__add-form"]}>
        <h3 className={style["form-heading"]}>Добавить продукт</h3>
        <label className={style["input-label"]}>
          <div>Название</div>
          <input
            className={style["form-input"]}
            value={newFood.name}
            onChange={handleNewFoodInput}
            name="name"
            type="text"
            placeholder="Продукт"
          />
        </label>
        <label className={style["input-label"]}>
          <div>Вес (г)</div>
          <input
            className={style["form-input"]}
            value={newFood.weight ? Math.max(0, newFood.weight) : ""}
            onChange={handleNewFoodInput}
            name="weight"
            type="number"
            placeholder="100"
          />
        </label>
        <fieldset className={style["form__nutrients"]}>
          <label className={style["input-label"]}>
            <div>Белки (г)</div>
            <input
              className={style["form-input"]}
              value={
                newFood.proteins
                  ? Math.max(0, Math.min(100, newFood.proteins))
                  : ""
              }
              onChange={handleNewFoodInput}
              name="proteins"
              type="number"
              placeholder="0"
            />
          </label>
          <label className={style["input-label"]}>
            <div>Жиры (г)</div>
            <input
              className={style["form-input"]}
              value={
                newFood.fats ? Math.max(0, Math.min(100, newFood.fats)) : ""
              }
              onChange={handleNewFoodInput}
              name="fats"
              type="number"
              placeholder="0"
            />
          </label>
          <label className={style["input-label"]}>
            <div>Углеводы (г)</div>
            <input
              className={style["form-input"]}
              value={
                newFood.carbs ? Math.max(0, Math.min(100, newFood.carbs)) : ""
              }
              onChange={handleNewFoodInput}
              name="carbs"
              type="number"
              placeholder="0"
            />
          </label>
        </fieldset>

        <button
          className={style["form-button"]}
          type="button"
          onClick={handleAddNewFood}
        >
          + добавить
        </button>
      </form>
      <ul className={style["products"]}>
        {products.map((item) => {
          const nutrients = calcNutrients([item]);
          return (
            <li key={item.id} className={style["product"]}>
              <strong className={style["product__name"]}>{item.name}</strong>
              <ul className={style["product__nutrients"]}>
                <li>🥩 {nutrients.proteins}</li>
                <li>🧈 {nutrients.fats}</li>
                <li>🍫 {nutrients.carbs}</li>
                <li>Вес - {item.weight}г.</li>
                <li>Ккал - {calcCalories(nutrients)}</li>
              </ul>
              <button
                className={style["product__delete"]}
                onClick={() =>
                  dispatch(deleteProduct({ day, productId: item.id }))
                }
              >
                🗑
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
