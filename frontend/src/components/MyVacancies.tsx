import { FC } from "react";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import { StoreApp } from "../store";
import { VacancyCard } from "./VacancyCard";
import { MyVacanciesProps } from "../types";

export const MyVacancies: FC<MyVacanciesProps> = ({...props}) => {
  const loading = useSelector((store: StoreApp) => store.vacancies.loading);
  const vacancies = useSelector((store: StoreApp) => store.vacancies.vacancies);
  const subscribeVacanciesID = useSelector((store: StoreApp) => store.user.subscribeVacanciesID);
  
  return (
    <div className="flex min-h-0">
      <Sidebar />
        {loading ? (
          <div className="flex items-center justify-center h-[60vh] w-full text-sky-500 opacity-50 text-8xl">
            Loading...
          </div>
        ) : subscribeVacanciesID.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] w-full">
            <div className="relative w-[7vw] h-[7vw] mb-6">
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                <svg className="w-[3vw] h-[3vw] text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-medium text-gray-600 mb-2">{props.title}</h3>
            <p className="text-gray-400 max-w-md text-center">{props.description}</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-around items-start w-full p-4 overflow-y-auto">
            {vacancies
              .filter(vacancy => subscribeVacanciesID.includes(vacancy.id))
              .map(data => (
                <VacancyCard data={data} key={data.id} title={"Cancel"} />
              ))}
          </div>
        )}
      </div>
  );
};
