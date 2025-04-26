import { FC, useEffect } from "react";
import { Signup } from "./Signup";
import { Input } from "./Input";
import company from "../assets/company.png";
import { useDispatch, useSelector } from "react-redux";
import { StoreApp } from "../store";
import { changeRole } from "../store/user.slice";

export const CompanySignup: FC = () => {
  const companyName = useSelector((store: StoreApp) => store.user.companyName);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeRole("employer"));
  }, [dispatch]);
  return (
    <Signup>
      <Input placeholder={"Company Name"} img={company} value={companyName} />
    </Signup>
  );
};
