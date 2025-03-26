import { FC } from "react";
import { Modal } from "./Modal";
import { useDispatch } from "react-redux";
import { login } from "../store/auth.slice";
import { useNavigate } from "react-router-dom";

export const Signin: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backend-silk-one-80.vercel.app/api/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: "123",
          role: "employer",
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
  };

  return (
    <Modal
      href="user"
      action={"Create your account"}
      name={"Login"}
      title={"Member Login"}
      onClick={handleSubmit} // Передаем обработчик
    />
  );
};
