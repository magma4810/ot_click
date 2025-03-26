import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { FC } from "react";
import { CompanySignup } from "./components/CompanySignup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changeLoading, changeVacancies } from "./store/vacancies.slice";
import { Vacancies } from "./components/Vacancies";
import { MyVacancies } from "./components/MyVacancies";
import { StoreApp } from "./store";
import { login } from "./store/auth.slice";

export const App: FC = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.auth.isAuthenticated,
  );

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const authResponse = await fetch(
          "http://localhost:3001/api/check-auth",
          {
            credentials: "include",
          },
        );
        const authenticated = authResponse.ok;
        dispatch(login(authenticated));

        if (authenticated) {
          const vacanciesResponse = await fetch("/api/getVacancies", {
            method: "GET",
            headers: { Accept: "application/json" },
            credentials: "include",
          });
          const data = await vacanciesResponse.json();
          dispatch(changeVacancies(data));
        }
      } catch (error) {
        console.error("Ошибка инициализации:", error);
      } finally {
        dispatch(changeLoading(false));
        setIsAuthChecked(true); // Помечаем проверку как завершенную
      }
    };

    initializeApp();
  }, [dispatch]);

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
