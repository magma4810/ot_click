import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { FC } from "react";

export const App: FC = () => {
  return (
    <>
      <BrowserRouter basename="/ot_click">
        <Routes>
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
