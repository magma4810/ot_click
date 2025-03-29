import { FC, useEffect } from "react";
import { Modal } from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth.slice";
import { useNavigate } from "react-router-dom";
import { StoreApp } from "../store";
import {changeErrorPassword,changeErrorUsername,resetUserForm } from "../store/user.slice";

export const Signin: FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((store: StoreApp) => store.user.username);
  const password = useSelector((store: StoreApp) => store.user.password);
  const userRole = useSelector((store: StoreApp) => store.user.role);
  useEffect(() => {
    return () => {
      dispatch(resetUserForm());
    };
  }, [dispatch]);
  const handleSubmit = async (e: React.MouseEvent) => {

    e.preventDefault();
    if (password === "") {
      dispatch(changeErrorPassword(true));
    } else if (username === "") {
      dispatch(changeErrorUsername(true));
    } else {
      try {
        const response = await fetch(`${API_URL}/loginUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            role: userRole,
          }),
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        dispatch(login(data.user));
        navigate("/vacancies");
      } catch (error) {
        console.error("Login error:", error);
      }
    }

  };

  return (
    <Modal
      href="user"
      action={"Create your account"}
      name={"Login"}
      title={"Member Login"}
      onClick={handleSubmit}
    />
  );
};
