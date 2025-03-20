import { FC } from "react";
import { Modal } from "./Modal";
import { Input } from "./Input";
import key from "../assets/key.png";
import { SignupProps } from "../types";

export const Signup: FC<SignupProps> = ({ children }) => {
  return (
    <Modal
      href="/ot_click/#/signin"
      action={"Login to your account"}
      name={"Create"}
      title={"Member Signup"}
    >
      <Input placeholder={"Repeat Password"} img={key} />
      {children}
    </Modal>
  );
};
