import { FC } from "react";
import { useSelector } from "react-redux";
import { StoreApp } from "../store";
import { VacancyCard } from "./VacancyCard";
import { Sidebar } from "./Sidebar";

export const Vacancies: FC = () => {
  const vacancies = useSelector((store: StoreApp) => store.vacancies.vacancies);
  const loading = useSelector((store: StoreApp) => store.vacancies.loading);
  
  return (
    <div className="flex min-h-0">
      <Sidebar />
      {loading ? (
        <span className="flex items-center justify-center h-[60vh] w-[87vw] text-sky-500 opacity-50 text-8xl">
          Loading...
        </span>
      ) : (
        <div className="flex flex-wrap w-[87vw] justify-around items-start p-4 overflow-y-auto">
          {vacancies.map((data) => (
            <VacancyCard data={data} key={data.id} />
          ))}
        </div>
      )}
    </div>
  );
};
