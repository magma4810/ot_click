import { FC } from "react";
import { useSelector } from "react-redux";
import { StoreApp } from "../store";
import { VacancyCard } from "./VacancyCard";
export const Vacancies: FC = () => {
    const vacancies = useSelector(
        (store: StoreApp) => store.vacancies.vacancies,
      )
    console.log(vacancies)
    return (
        <div className=" flex flex-wrap w-[88vw] justify-around items-center ml-[12vw]">
            {vacancies.map((data) => (
                <VacancyCard data={data} key={data.id}/>
            ))}
        </div>
    )
}