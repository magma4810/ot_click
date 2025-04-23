import { Dispatch, FC, SetStateAction } from "react";
import { Vacancies } from "../types";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { StoreApp } from "../store";

export const ModalVacancy: FC<{ title: string, data: Vacancies; onClose: () => void; onClick: Dispatch<SetStateAction<boolean>> }> = ({
  title,
  data,
  onClose,
  onClick
}) => {
  const role = useSelector((store: StoreApp) => store.user.role);

  return (

    <div className="fixed inset-0 flex items-center justify-center cursor-auto z-10">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
        <div className="prose dark:prose-invert">
          {Object.entries(data)
            .filter(([, value]) => value !== '') 
            .map(([key, value]) => (
              <Paragraph key={key} title={key} data={value} />
            ))
          }
        </div>
        {role === "applicant" && title !== "" &&
          <button className=" flex justify-center items-center w-full " onClick={(e) => {
            e.stopPropagation();
            onClick(true)
            onClose();
          }}>

            <span className="bg-emerald-400/80 text-2xl w-[15vw] h-[7vh] rounded-[100px] cursor-pointer flex items-center justify-center">
              {title}
            </span>
          </button>
        }
        {role === "employer" && location.hash === "#/active-vacancies" &&
          <button className=" flex justify-center items-center w-full " onClick={(e) => {
            e.stopPropagation();
            onClick(true)
            onClose();
          }}>

            <span className="bg-emerald-400/80 text-2xl w-[15vw] h-[7vh] rounded-[100px] cursor-pointer flex items-center justify-center">
              {title}
            </span>
          </button>
        }

      </motion.div>
    </div>
  );
};

const Paragraph: FC<{ title: string; data: string | boolean | number }> = ({
  ...props
}) => {
  const fieldNames: Record<string, string> = {
    id: "ID",
    title: "Название вакансии",
    description: "Описание",
    companyName: "Компания",
    location: "Локация",
    salary: "Зарплата",
    englishLvl: "Уровень английского",
    grade: "Грейд",
    tags: "Теги",
    is_active: "Активна",
    experience: "Опыт работы",
    skills: "Навыки",
    employmentType: "Тип занятости",
    category_id: "Категория",
    subscribe: "Откликнувшиеся",
  };

  return (
    <p>
      <strong>{fieldNames[props.title] || props.title}: </strong>
      <span className={`${props.data === false && props.title === "is_active" ? "text-red-800" : ""} `}>{formatFieldValue(props.title, props.data)}</span>
    </p>
  );
};

const formatFieldValue = (
  title: string,
  data: string | boolean | number,
): string => {
  if (typeof data === "boolean") {
    return data ? "Да" : "Нет";
  }

  switch (title) {
    case "is_active":
      return typeof data === "boolean" ? (data ? "Да" : "Нет") : String(data);
    case "salary":
      return `${new Intl.NumberFormat("ru-RU").format(Number(data))} ₽`;
    case "tags":
      return typeof data === "string"
        ? data
          .split(",")
          .map((tag) => tag.trim())
          .join(", ")
        : String(data);
    default:
      return String(data);
  }
};
