export const calcCalories = (
  {
    proteins,
    fats,
    carbs
  }: {
    proteins: number,
    fats: number,
    carbs: number,
  }
): number => {
  return proteins * 4 + fats * 9 + carbs * 4;
};
