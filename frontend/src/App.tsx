import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { FC } from "react";
import { CompanySignup } from "./components/CompanySignup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeLoading, changeVacancies } from "./store/vacancies.slice";
import { Vacancies } from "./components/Vacancies";

export const App: FC = () => {
  const dispath = useDispatch();
  useEffect(() => {
    try {
      fetch("/api/getVacancies", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispath(changeVacancies(data));
          dispath(changeLoading(false));
        });
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }, [dispath]);
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="company-signup" element={<CompanySignup />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="my-vacancies" element={<></>} />
        </Routes>
      </HashRouter>
    </>
  );
};
