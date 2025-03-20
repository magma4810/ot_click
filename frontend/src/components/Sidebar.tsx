import { FC } from "react";
import vacancies from "../assets/vacancies.png";
import my_vacancies from "../assets/my_vacancies.png";
import logout from "../assets/logout.png";
import { IconSidebarProps } from "../types";

export const Sidebar: FC = () => {
  return (
    <div className="flex flex-col justify-between w-[15vw] h-[100vh] border-dashed border-indigo-500 bg-emerald-700/50 border-2 bg-opacity-50">
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
          src={logout}
          title={"Logout"}
          href={"/ot_click/#/signin"}
        />
      </div>
    </div>
  );
};

const IconSidebar: FC<IconSidebarProps> = ({ ...props }) => {
  const isActive = (path: string) => {
    console.log(location.hash, path);
    return location.hash === path;
  };
  return (
    <a href={props.href}>
      <div
        className={` flex items-center flex-col ${props.hash ? (isActive(props.hash) ? "text-emerald-200 font-bold border-l-3 text-glow" : "") : null} text-xl`}
      >
        <img src={props.src} alt="" className=" w-[35%] h-[auto]" />
        <span>{props.title}</span>
      </div>
    </a>
  );
};
