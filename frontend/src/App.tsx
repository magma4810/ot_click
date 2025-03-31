import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { FC } from "react";
import { CompanySignup } from "./components/CompanySignup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Vacancies } from "./components/Vacancies";
import { MyVacancies } from "./components/MyVacancies";
import { fetchGetVacancies } from "./store/vacancies.slice";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StoreApp, useAppDispatch } from "./store";
import { getInfoApplicant } from "./store/user.slice";

export const App: FC = () => {

  const dispatch = useAppDispatch();
  const role = useSelector((store:StoreApp) => store.user.role)
  const username = useSelector((store:StoreApp) => store.user.username)

  useEffect(() => {
    dispatch(getInfoApplicant(username));
    dispatch(fetchGetVacancies());
  },[])


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
