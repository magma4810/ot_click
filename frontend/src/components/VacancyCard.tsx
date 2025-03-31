import { FC, useEffect, useState } from "react";
import { VacancyCardProps } from "../types";
import { ModalVacancy } from "./ModalVacancy";
import { AnimatePresence } from "framer-motion";
import checked from "../assets/checked.png";
import { useSelector } from "react-redux";
import { addSubscribeVacanciesID, updateSubscriptionsID } from "../store/user.slice";
import { StoreApp, useAppDispatch } from "../store";

export const VacancyCard: FC<VacancyCardProps> = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResponeded, setIsResponeded] = useState(false);
  const description = props.data.description;
  const dispatch = useAppDispatch();
  const subscribeVacanciesID = useSelector((store: StoreApp) => store.user.subscribeVacanciesID);
  const username = useSelector((store: StoreApp) => store.user.username);
  const onClick = () => {
    setIsResponeded(true);
    dispatch(updateSubscriptionsID({ username, vacancyId: props.data.id }));
    dispatch(addSubscribeVacanciesID(props.data.id));
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
  return (
    <div
      className={`relative bg-cyan-800/50 w-[20vw] h-[20vh] flex flex-col items-center justify-evenly p-3.5 m-1.5 rounded-[3px] ${!isResponeded && !subscribeVacanciesID.includes(props.data.id) && "cursor-pointer"} `}
      onClick={() => !isResponeded && !subscribeVacanciesID.includes(props.data.id) && setIsModalOpen(true)}
    >
      {(isResponeded || subscribeVacanciesID.includes(props.data.id)) && (
        <div className="absolute flex top-1 justify-end items-center p-1">

          <span className=" w-[30%] h-[20%] text-xs text-emerald-400 rounded flex ">
          <img src={checked} className="w-[17%] h-auto" alt="" />
            You responded
          </span>
        </div>
      )}

      <span className="text-center">{props.data.title}</span>
      <span className="text-center">
        {description.length > 50
          ? description.substring(0, 50) + "..."
          : description}
      </span>

      {isModalOpen && (
        <AnimatePresence>
          <ModalVacancy
            data={props.data}
            onClose={() => setIsModalOpen(false)}
            onClick={onClick}
          />
        </AnimatePresence>
      )}
    </div>
  );
};
