import { FC } from "react";
import vacancies from "../assets/vacancies.png";
import my_vacancies from "../assets/my_vacancies.png";
import logoutpng from "../assets/logout.png";
import { logout } from "../store/auth.slice";
import { IconSidebarProps } from "../types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUserForm } from "../store/user.slice";

export const Sidebar: FC = () => {
  return (
    <div className="flex flex-col justify-between w-[12vw] border-dashed border-indigo-500 bg-emerald-700/50 border-2 bg-opacity-50 sticky top-0 h-screen">
      <div className=" flex flex-col justify-evenly h-[40%]">
        <IconSidebar
          src={vacancies}
          title={"Vacancies"}
          href={"/ot_click/#/vacancies"}
          hash={"#/vacancies"}
        />
        <IconSidebar
          src={my_vacancies}
          title={"My Vacancies"}
          href={"/ot_click/#/my-vacancies"}
          hash={"#/my-vacancies"}
        />
      </div>
      <div className=" h-[18%]">
        <IconSidebar
          src={logoutpng}
          title={"Logout"}
          href={"/ot_click/#/signin"}
        />
      </div>
    </div>
  );
};

const IconSidebar: FC<IconSidebarProps> = ({ ...props }) => {

  const navigate = useNavigate();
  const isActive = (path: string) => {
    return location.hash === path;
  };
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/logoutUser`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (props.title === "Logout") {
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('username');
      dispatch(resetUserForm());
      handleLogout(e);
    }
  };

  return (
    <a href={props.href} onClick={handleClick} className="block">
      <div
        className={`flex items-center flex-col ${
          props.hash && isActive(props.hash)
            ? "text-emerald-200 font-bold border-l-3 text-glow"
            : ""
        } text-xl`}
      >
        <img src={props.src} alt="" className="w-[35%] h-auto" />
        <span>{props.title}</span>
      </div>
    </a>
  );
};
