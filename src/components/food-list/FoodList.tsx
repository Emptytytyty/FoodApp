import { useState, type ChangeEvent } from "react";
import style from "./foodList.module.css";
import { calcCalories } from "../../utils/helpers/calcCalories";

export type Product = {
  id: string;
  name: string;
  proteins: number;
  fats: number;
  carbs: number;
  weight: number;
};

interface FoodListProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const FoodList = ({ products, setProducts }: FoodListProps) => {
  const initialNewFood = {
    carbs: 0,
    fats: 0,
    proteins: 0,
    weight: 0,
    name: "",
  };
  const [newFood, setNewFood] = useState<Omit<Product, "id">>(initialNewFood);

  const handleAddNewFood = () => {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    setProducts((prev) => [
      ...prev,
      { ...newFood, id, weight: newFood.weight || 100 },
    ]);
    setNewFood(initialNewFood);
  };

  const handleNewFoodInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewFood((prev) => ({
      ...prev,
      [name]: name !== 'name' ? +value : value,
    }));
  };

  const onDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
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
        {products.map((item) => (
          <li key={item.id} className={style["product"]}>
            <strong className={style["product__name"]}>{item.name}</strong>
            <ul className={style["product__nutrients"]}>
              <li>🥩 {(item.proteins * item.weight) / 100}</li>
              <li>🧈 {(item.fats * item.weight) / 100}</li>
              <li>🍫 {(item.carbs * item.weight) / 100}</li>
              <li>Вес - {item.weight}г.</li>
              <li>Ккал - {(calcCalories(item) * item.weight) / 100}</li>
            </ul>
            <button
              className={style["product__delete"]}
              onClick={() => onDeleteProduct(item.id)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
