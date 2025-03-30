import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreApp } from "../store";
import { 
  changeRepeatPassword, 
  changePassword, 
  changeUsername,
  changeCompanyName
} from "../store/user.slice";
import { InputProps } from "../types";
import { createSelector } from "@reduxjs/toolkit";
import { resetErrors } from "../store/errors.slice";

const selectErrors = createSelector(
  (state: StoreApp) => state.errors,
  (errors) => ({
    password: errors.errorPassword,
    repeatPassword: errors.errorPasswordRepeat,
    username: errors.errorUsername,
    companyName: errors.errorCompanyName,
    userNotFound: errors.errorUserNotFound,
    errorUserPassword: errors.errorUserPassword
  })
);

export const Input: FC<InputProps> = ({ placeholder, img, value }) => {
  const dispatch = useDispatch();
  
  const errors = useSelector(selectErrors);
  const errorMessages = {
    'Password': errors.errorUserPassword ? 'Неверный пароль':'Пароль не должен быть пустым',
    'Repeat Password': 'Пароли должны совпадать',
    'Username': errors.userNotFound ? 'Пользователь не найден' : 'Поле Username не должно быть пустым',
    'Company Name': 'Название компании обязательно'
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(resetErrors());
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
  };

  const hasError = (() => {
    switch (placeholder) {
      case 'Password': return errors.password || errors.errorUserPassword;
      case 'Repeat Password': return errors.repeatPassword;
      case 'Username': return errors.username || errors.userNotFound;
      case 'Company Name': return errors.companyName;
      default: return false;
    }
  })();

  return (
    <div className="flex flex-col relative mb-8">
      <div className={`bg-amber-50 h-12 flex items-center rounded border border-gray-300 p-2 ${
        hasError ? "border-red-500 border-2" : ""
      }`}>
        <img src={img} alt={placeholder} className="w-6 h-6 mr-2" />
        <input
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent"
          onChange={onChange}
          value={value}
        />
      </div>
      
      {hasError && (
        <span className="text-xs text-red-500 absolute -bottom-5 left-0">
          {errorMessages[placeholder as keyof typeof errorMessages]}
        </span>
      )}
    </div>
  );
};