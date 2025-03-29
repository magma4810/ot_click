import { FC } from "react";
import { ModalProps } from "../types";
import { Input } from "./Input";
import logo from "../assets/otclick_logo.png";
import arrow from "../assets/arrow.png";
import key from "../assets/key.png";
import user from "../assets/user.png";
import { useSelector } from "react-redux";
import { StoreApp } from "../store";

export const Modal: FC<ModalProps> = ({ children, onClick, ...props }) => {
  const username = useSelector((store: StoreApp) => store.user.username);
  const password = useSelector((store: StoreApp) => store.user.password);
  return (
    <div className="flex w-[100vw] h-screen items-center justify-center">
      <div className="flex bg-emerald-50 w-[70%] h-[70%] rounded-xl justify-evenly items-center">
        <img src={logo} alt="" className="w-[35%] h-auto" />
        <div className="flex flex-col items-center justify-evenly h-[100%] w-[30%]">
          <span className="text-4xl font-medium">{props.title}</span>
          <div className="flex w-[100%] h-[50%] flex-col justify-evenly">
            <Input placeholder={"Username"} img={user} value={username}/>
            <Input placeholder={"Password"} img={key} value={password}/>
            {children}
          </div>
          <button
            onClick={onClick} 
            className="flex justify-center items-center bg-emerald-400 w-[50%] h-[10%] rounded-3xl cursor-pointer"
          >
            {props.name}
          </button>
          <div className="flex w-[100%] justify-evenly items-center">
            {props.action === "Create your account" ? (
              <>
                {props.action}
                <u>
                  <a href="/ot_click/#/signup">user</a>
                </u>
                or
                <u>
                  <a href="/ot_click/#/company-signup">company</a>
                </u>
              </>
            ) : (
              <>
                <u>
                  <a href="/ot_click/#/signin">{props.action}</a>
                </u>
              </>
            )}
            <img src={arrow} alt="" className="w-[8%] h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

