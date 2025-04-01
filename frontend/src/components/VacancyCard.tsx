import { FC, useEffect, useState } from "react";
import { VacancyCardProps } from "../types";
import { ModalVacancy } from "./ModalVacancy";
import { AnimatePresence } from "framer-motion";
import checked from "../assets/checked.png";
import user from "../assets/user.png";
import { useSelector } from "react-redux";
import { addSubscribeVacanciesID, deleteSubscribeVacanciesID, updateSubscriptionsID } from "../store/user.slice";
import { StoreApp, useAppDispatch } from "../store";
import { fetchChangeResponded, fetchChangeVacancyIsActiveFalse } from "../store/vacancies.slice";

export const VacancyCard: FC<VacancyCardProps> = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const description = props.data.description;
  const dispatch = useAppDispatch();
  const subscribeVacanciesID = useSelector((store: StoreApp) => store.user.subscribeVacanciesID);
  const username = useSelector((store: StoreApp) => store.user.username);
  const role = useSelector((store: StoreApp) => store.user.role);
  const check = ((props.title === "Cancel") || (!subscribeVacanciesID.includes(props.data.id)));
  const onClickSubscribeVacancie = () => {
    dispatch(addSubscribeVacanciesID(props.data.id));
    dispatch(updateSubscriptionsID({ username }));
    dispatch(fetchChangeResponded({
      id: props.data.id,
      subscribe: props.data.subscribe + 1
    }));
  };
  const onClickCancelVacancie = () => {
    dispatch(deleteSubscribeVacanciesID(props.data.id));
    dispatch(updateSubscriptionsID({ username }));
    dispatch(fetchChangeResponded({
      id: props.data.id,
      subscribe: props.data.subscribe - 1
    }));
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
      className={`relative ${props.data.is_active ? "bg-cyan-800/50" : " bg-red-900/30"} w-[20vw] h-[20vh] flex flex-col items-center justify-evenly p-3.5 m-1.5 rounded-[3px] ${check && "cursor-pointer"} `}
      onClick={() => check && setIsModalOpen(true)}
    >
      {(subscribeVacanciesID.includes(props.data.id)) && (
        <div className="absolute flex top-1 justify-end items-center p-1">

          <span className=" w-[30%] h-[20%] text-xs text-emerald-400 rounded flex ">
            <img src={checked} className="w-[17%] h-auto" alt="" />
            You responded
          </span>
        </div>
      )}
      {role === "employer" && props.title === "Cancel" &&
        <div className="absolute top-0 right-0 p-2 flex items-center">
        <img src={user} className="w-6 h-6" alt="User" />
        <span className="text-base text-emerald-400 ml-2">
          {props.data.subscribe}
        </span>
      </div>
      }

      <span className="text-center">{props.data.title}</span>
      <span className="text-center">
        {description.length > 50
          ? description.substring(0, 50) + "..."
          : description}
      </span>

      {isModalOpen && (
        <AnimatePresence>
          {role === "applicant" ?
            <ModalVacancy
              data={props.data}
              onClose={() => setIsModalOpen(false)}
              onClick={props.title === "Cancel" ? onClickCancelVacancie : onClickSubscribeVacancie}
              title={props.title}
            /> :
            <ModalVacancy
              data={props.data}
              onClose={() => setIsModalOpen(false)}
              onClick={() => dispatch(fetchChangeVacancyIsActiveFalse({ id: props.data.id }))}
              title={props.title}
            />
          }

        </AnimatePresence>
      )}
    </div>
  );
};
