import { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreApp } from "../store";
import { ModalVacancy } from "./ModalVacancy";
import { Sidebar } from "./Sidebar";
import { Vacancies } from "./Vacancies";

export const ModalVacancyID: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vacancies = useSelector((store: StoreApp) => store.vacancies.vacancies);
  const vacancy = vacancies.find(v => v.id === Number(id));

  if (!vacancy) return <div className=" w-[100vw] h-[100vh] flex items-center justify-center">Вакансия не найдена</div>;;

  return (
    <>
    <Vacancies/>
    <Sidebar/>
    <ModalVacancy
      title=""
      data={vacancy}
      onClose={() => navigate("/vacancies")}
      onClick={() => {
      }}
    />
    </>
  );
};