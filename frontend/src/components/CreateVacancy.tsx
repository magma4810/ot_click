import { FC, useEffect } from "react";
import { Sidebar } from "./Sidebar";

import { useState } from 'react';
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeVacancies, fetchCreateVacancy } from "../store/vacancies.slice";
import { changePublishedVacanciesID, updatePublishedVacanciesID } from "../store/user.slice";

export const CreateVacancy: FC = () => {
  const role = useSelector((store: StoreApp) => store.user.role);
  const companyName = useSelector((store: StoreApp) => store.user.companyName);
  const username = useSelector((store: StoreApp) => store.user.username);
  const vacancies = useSelector((store: StoreApp) => store.vacancies.vacancies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (role === "applicant") {
      navigate("/vacancies");
    }
  }, [])
  const INITIAL_FORM_STATE = {
    title: '',
    description: '',
    location: '',
    salary: '',
    englishLvl: 'Не требуется',
    grade: 'Не указано',
    tags: '',
    experience: 'Не указано',
    skills: '',
    employmentType: 'Полная занятость',
    category_id: 'IT'
  };
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(fetchCreateVacancy({ data: { ...formData, companyName } })).unwrap();
    const newArray = await dispatch(updatePublishedVacanciesID({username: username, newPublishedVacanciesID: result[0].id}));
    dispatch(changePublishedVacanciesID(newArray.payload as number[]));
    dispatch(changeVacancies([...vacancies,result[0]]))
    setFormData(INITIAL_FORM_STATE);
  };

  return (
    <div className="flex min-h-0">
      <Sidebar />
      <div className=" w-full">
        <div className="max-w-6xl mx-auto p-6 m-6 bg-white rounded-lg shadow-md w-[70vw]">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Создать новую вакансию</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название вакансии*</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Например: Frontend Developer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Описание*</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Подробное описание вакансии"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Локация*</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Город или удалённо"
                    required
                  />
                </div>
              </div>

              {/* Детали вакансии */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Зарплата*</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="120000"
                      step="5000"
                      min={0}
                      required
                    />
                    <span className="absolute right-3 top-2 text-gray-500">₽</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Уровень английского</label>
                  <select
                    name="englishLvl"
                    value={formData.englishLvl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Не требуется</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Upper-Intermediate">Upper-Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Proficiency">Proficiency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Грейд</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Не указано</option>
                    <option value="Junior">Junior</option>
                    <option value="Middle">Middle</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Теги и навыки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Теги (через запятую)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="JavaScript, React, HTML, CSS"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Опыт работы</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Не указано</option>
                  <option value="Без опыта">Без опыта</option>
                  <option value="1-3 года">1-3 года</option>
                  <option value="3-5 лет">3-5 лет</option>
                  <option value="5+ лет">5+ лет</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ключевые навыки</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={1}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Основные технологии и навыки"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Тип занятости</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['Полная занятость', 'Частичная занятость', 'Проектная работа', 'Стажировка'].map(type => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="employmentType"
                      value={type}
                      checked={formData.employmentType === type|| 
                        (formData.employmentType === '' && type === 'Полная занятость')}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setFormData(INITIAL_FORM_STATE)}
              >
                Отменить
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Опубликовать вакансию
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
