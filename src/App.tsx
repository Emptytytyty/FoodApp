import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./services/store";
import { loadProducts } from "./services/nutrients/NutrientsSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadProducts())
  }, []);
  return (
    <>
    </>
  );
}

export default App;
