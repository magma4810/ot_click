import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { FC } from "react";
import { CompanySignup } from "./components/CompanySignup";
import { Sidebar } from "./components/Sidebar";

export const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="company-signup" element={<CompanySignup />} />
          <Route path="vacancies" element={<Sidebar />} />
          <Route path="my-vacancies" element={<Sidebar />} />
        </Routes>
      </HashRouter>
    </>
  );
};
