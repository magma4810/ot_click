import { InputProps } from "../types";
import { FC } from "react";
import { changeRepeatPassword, changePassword, changeUsername, changeCompanyName, changeErrorPassword, changeErrorUsername, changeErrorCompanyName } from "../store/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { StoreApp } from "../store";

export const Input: FC<InputProps> = ({ placeholder, img, value }) => {
  const dispatch = useDispatch();
  const errorPassword = useSelector((store: StoreApp) => store.user.errorPassword);
  const errorUsername = useSelector((store: StoreApp) => store.user.errorUsername);
  const errorCompanyName = useSelector((store: StoreApp) => store.user.errorCompanyName);
  const passwordCheck = placeholder === "Password" || placeholder === "Repeat Password";
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeErrorPassword(false));
    dispatch(changeErrorUsername(false));
    dispatch(changeErrorCompanyName(false));
    switch (placeholder) {
      case "Username":
        dispatch(changeUsername(e.target.value));
        break;
      case "Password":
        dispatch(changePassword(e.target.value));
        break;
      case "Repeat Password":
        dispatch(changeRepeatPassword(e.target.value));
        break;
      case "Company Name":
        dispatch(changeCompanyName(e.target.value));
        break;
    }
  }
  return (
    <div className=" flex flex-col relative mb-8">
      <div className={` bg-amber-50 h-12 flex items-center rounded border border-gray-300 p-2 ${(errorPassword && passwordCheck || errorUsername && placeholder==="Username" || errorCompanyName && placeholder==="Company Name") && "border-red-500 border-3"}`}>
        <img src={img} alt="" className="w-6 h-6 mr-2" />
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent"
          onChange={onChange}
          value={value}
        />
      </div>
      {errorPassword && placeholder === "Repeat Password" && (
        <span className="text-xs text-red-500 absolute -bottom-5 flex justify-center w-full">
          Пароли должны совпадать и не быть пустыми
        </span>
      )}
      {errorUsername && placeholder === "Username" && (
        <span className="text-xs text-red-500 absolute -bottom-5 flex justify-center w-full">
          Поле Username не должно быть пустым
        </span>
      )}
      {errorCompanyName && placeholder === "Company Name" && (
        <span className="text-xs text-red-500 absolute -bottom-5 flex justify-center w-full">
          Поле Company Name не должно быть пустым
        </span>
      )}
    </div>
  );
};
