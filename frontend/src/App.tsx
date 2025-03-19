import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { FC } from "react";

export const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </HashRouter>
    </>
  );
};
