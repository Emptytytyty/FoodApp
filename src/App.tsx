import { Link, Route } from "react-router";
import { Routes } from "react-router";
import { DayPage } from "./pages/day-page/DayPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./services/store";
import { loadProducts } from "./services/nutrients/NutrientsSlice";
import { DatePicker } from "./components/datepicker/DatePicker";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadProducts())
  }, []);
  return (
    <>
    <main className="app">
        <Routes>
          <Route
            path="/"
            element={
              <DatePicker/>
            }
          />
          <Route path="/day/:id" element={<DayPage />} />
          <Route
            path="*"
            element={<Link to={"/"}>Вернуться на главную</Link>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
