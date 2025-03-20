import { InputProps } from "../types";
import { FC } from "react";

export const Input: FC<InputProps> = ({ placeholder, img }) => {
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
  