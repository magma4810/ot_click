import { FC } from "react";
import { Modal } from "./Modal";

export const Signin: FC = () => {
    return ( 
        <Modal href="user" action={"Crete your account"} name={"Login"} title={"Member Login"}/>
    )
}