import { FC } from "react";
import { Signup } from "./Signup";
import { Input } from "./Input";
import company from "../assets/company.png";

export const CompanySignup: FC = () => {
  return (
    <Signup>
      <Input placeholder={"Company Name"} img={company} />
    </Signup>
  );
};
