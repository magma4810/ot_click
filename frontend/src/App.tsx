import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { FC, useCallback } from "react";
import { CompanySignup } from "./components/CompanySignup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Vacancies } from "./components/Vacancies";
import { MyVacancies } from "./components/MyVacancies";
import { StoreApp } from "./store";
import { login } from "./store/auth.slice";
import Cookies from "js-cookie";
import { changeLoading, changeVacancies } from "./store/vacancies.slice";
export const App: FC = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.auth.isAuthenticated,
  );

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const authenticated = Cookies.get("authenticated");
        dispatch(login(authenticated === "true"));
      } catch (error) {
        console.error("Ошибка инициализации:", error);
      } finally {
        setIsAuthChecked(true);
      }
    };

    initializeApp();
  }, [dispatch]);
  const MAX_RETRIES = 3; // Максимальное количество попыток
  const RETRY_DELAY = 1000; // Задержка между попытками в миллисекундах

  const fetchVacancies = useCallback(async (retryCount = 0) => {
    try {
      const response = await fetch("/api/getVacancies", {
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

  if (!isAuthChecked) {
    return (
      <>
        <span className="flex items-center justify-center h-[100vh] w-[100vw] text-sky-500 opacity-50 text-8xl">
          Loading...
        </span>
      </>
    );
  }
  return (
    <HashRouter>
      <Routes>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="company-signup" element={<CompanySignup />} />
        <Route
          path="vacancies"
          element={
            isAuthChecked && isAuthenticated ? (
              <Vacancies />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="my-vacancies"
          element={
            isAuthenticated ? (
              <MyVacancies />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
      </Routes>
    </HashRouter>
  );
};
