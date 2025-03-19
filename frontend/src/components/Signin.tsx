import { FC } from "react";
import logo from '../assets/otclick_logo.png';
import arrow from '../assets/arrow.png';
import key from '../assets/key.png';
import user from '../assets/user.png';

export const Signin: FC = () => {
  return (
    <div className=" flex w-[100vw] h-screen bg-gradient-to-tl from-blue-900 via-emerald-300 to-indigo-700 items-center justify-center">
        <div className=" flex bg-emerald-50 w-[70%] h-[70%] rounded-xl justify-evenly items-center">
          <img src={logo} alt=""  className=" w-[35%] h-[auto]"/>
          <div className=" flex flex-col items-center justify-evenly h-[100%] w-[30%]">
            <span className=" text-4xl font-medium">Member Login</span>
            <div className=" flex w-[100%] h-[20%] flex-col justify-between">
              <Input placeholder={"Username"} img={user}/>
              <Input placeholder={"Password"} img={key}/>
            </div>
            <button className=" bg-emerald-400 w-[50%] h-[10%] rounded-3xl cursor-pointer">Login</button>
            <a href="" className=" flex w-[60%] justify-evenly items-center"><u>Crete your account </u><img src={arrow} alt="" className=" w-[15%] h-auto"/></a>
          </div>
        </div>
    </div>
  );
};


type InputProps = {
  placeholder: string;
  img: string;
};

const Input: FC<InputProps> = ({ placeholder, img }) => {
  return (
    <div className="bg-amber-50 h-12 flex items-center rounded border border-gray-300 p-2">
      <img src={img} alt="" className="w-6 h-6 mr-2" /> 
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent"
      />
    </div>
  );
};