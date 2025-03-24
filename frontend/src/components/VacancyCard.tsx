import { FC, useEffect, useState } from "react";
import { VacancyCardProps } from "../types";
import { ModalVacancy } from "./ModalVacancy";
import { AnimatePresence } from "framer-motion";

export const VacancyCard: FC<VacancyCardProps> = ({ ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const description = props.data.description;
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
      className=" bg-cyan-800/50 w-[20vw] h-[20vh] flex flex-col items-center justify-evenly p-3.5 m-1.5 rounded-[3px] cursor-pointer"
      onClick={() => setIsModalOpen(true)}
    >
      <span>{props.data.title}</span>
      <span>
        {description.length > 50
          ? description.substring(0, 50) + "..."
          : description}
      </span>

      {isModalOpen && (
        <AnimatePresence>
          <ModalVacancy
            data={props.data}
            onClose={() => setIsModalOpen(false)}
          />
        </AnimatePresence>
      )}
    </div>
  );
};
