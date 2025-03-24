import { FC } from "react";
import { VacancyCardProps } from "../types";

export const VacancyCard: FC<VacancyCardProps> = ({...props}) => {
  const description = props.data.description;
  console.log(description)
  return ( 
    <div className=" bg-cyan-800/50 w-[20vw] h-[20vh] flex flex-col items-center justify-evenly p-3.5 m-1.5 rounded-[3px]">
      <span>{props.data.title}</span>
      <span>{description.length > 50 ? description.substring(0,50)+"..." : description}</span>
    </div>
  );
};
