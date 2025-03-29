import { FC, useEffect } from "react";
import { Modal } from "./Modal";
import { Input } from "./Input";
import key from "../assets/key.png";
import { SignupProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/auth.slice";
import { StoreApp } from "../store";
import { changeCompanyName, changeErrorCompanyName, changeErrorPassword,changeErrorUsername, changePassword, changeRepeatPassword, changeUsername } from "../store/user.slice";

export const Signup: FC<SignupProps> = ({ children }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const repeatPassword = useSelector((store: StoreApp) => store.user.repeatPassword);
  const username = useSelector((store: StoreApp) => store.user.username);
  const password = useSelector((store: StoreApp) => store.user.password);
  const companyName = useSelector((store: StoreApp) => store.user.companyName);
  const role = useSelector((store: StoreApp) => store.user.role);
  useEffect(() => {
    return () => {
      dispatch(changePassword(""));
      dispatch(changeUsername(""));
      dispatch(changeRepeatPassword(""));
      dispatch(changeCompanyName(""));
      dispatch(changeErrorUsername(false));
      dispatch(changeErrorPassword(false));
      dispatch(changeErrorCompanyName(false));
    };
  }, [dispatch]);
  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if(repeatPassword !== password || repeatPassword === "" || password ===""){
      dispatch(changeErrorPassword(true));
    }else if(username === ""){
      dispatch(changeErrorUsername(true));
    }else if(companyName === ""){
      dispatch(changeErrorCompanyName(true));
    }else{
      try {
        let response;
        if(role === "applicant"){
          response = await fetch(`${API_URL}/registerApplicant`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              username: username,
              password: password,
              role: "applicant"
            }),
          });
        }else{
          response = await fetch(`${API_URL}/registerEmployer`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              username: username,
              password: password,
              companyNameUser: companyName,
              role: "employer"
            }),
          });
        }
  
        if (!response.ok) {
          throw new Error("Register failed");
        }
  
        const data = await response.json();
        dispatch(login(data.user));
        navigate("/signin");
      } catch (error) {
        console.error("Login error:", error);
      }
    }
   
  };
  return (
    <Modal
      href="/ot_click/#/signin"
      action={"Login to your account"}
      name={"Create"}
      title={"Member Signup"}
      onClick={handleSubmit}
    >
      <Input placeholder={"Repeat Password"} img={key} value={repeatPassword}/>
      {children}
    </Modal>
  );
};
