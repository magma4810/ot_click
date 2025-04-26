import { FC } from "react";
import vacancies from "../assets/vacancies.png";
import my_vacancies from "../assets/my_vacancies.png";
import logoutpng from "../assets/logout.png";
import create_vacancy from "../assets/create_vacancy.png";
import { logout } from "../store/auth.slice";
import { IconSidebarProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUserForm } from "../store/user.slice";
import { StoreApp } from "../store";

export const Sidebar: FC = () => {
  const role = useSelector((store: StoreApp) => store.user.role);
  return (
    <div className="flex flex-col justify-between w-[12vw] border-dashed border-indigo-500 bg-emerald-700/50 border-2 bg-opacity-50 sticky top-0 h-screen">
      <div className=" flex flex-col justify-evenly h-[60%]">
        <IconSidebar
          src={vacancies}
          title={"Vacancies"}
          href={"/ot_click/#/vacancies"}
          hash={"#/vacancies"}
        />
        {role === "applicant" ? (
          <IconSidebar
            src={my_vacancies}
            title={"My Vacancies"}
            href={"/ot_click/#/my-vacancies"}
            hash={"#/my-vacancies"}
          />
        ) : (
          <>
            <IconSidebar
              src={my_vacancies}
              title={"Active vacancies"}
              href={"/ot_click/#/active-vacancies"}
              hash={"#/active-vacancies"}
            />
            <IconSidebar
              src={create_vacancy}
              title={"Create vacancy"}
              href={"/ot_click/#/create-vacancy"}
              hash={"#/create-vacancy"}
            />
          </>
        )}
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
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (props.title === "Logout") {
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("username");
      dispatch(resetUserForm());
      dispatch(logout());
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
