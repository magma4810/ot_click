import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { FC, useCallback } from "react";
import { CompanySignup } from "./components/CompanySignup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Vacancies } from "./components/Vacancies";
import { MyVacancies } from "./components/MyVacancies";
import { changeLoading, changeVacancies } from "./store/vacancies.slice";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StoreApp } from "./store";

export const App: FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const role = useSelector((store:StoreApp) => store.user.role)
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; 

  const fetchVacancies = useCallback(async (retryCount = 0) => {
    try {
      const response = await fetch(`${API_URL}/getVacancies`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(changeVacancies(data));
      dispatch(changeLoading(false));
    } catch (error) {
      console.error(
        `Ошибка при загрузке данных (попытка ${retryCount + 1}):`,
        error,
      );

      if (retryCount < MAX_RETRIES - 1) {
        setTimeout(() => fetchVacancies(retryCount + 1), RETRY_DELAY);
      } else {
        console.error("Превышено максимальное количество попыток");
        dispatch(changeLoading(false));
      }
    }
  }, []);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  return (
    <HashRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="company-signup" element={<CompanySignup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="vacancies" element={<Vacancies />}/>
          {role === 'applicant' && <Route path="my-vacancies" element={<MyVacancies />}/>}
        </Route>
      </Routes>
    </HashRouter>
  );
};
