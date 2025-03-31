import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vacancies, VacanciesState } from "../types";

const initialState: VacanciesState = {
  vacancies: [],
  loading: true,
};
const API_URL = import.meta.env.VITE_API_URL;
export const getVacancies = createAsyncThunk(
  'user/fetchApplicantData',
  async (_,{ dispatch }) => {
    const response = await fetch(`${API_URL}/getVacancies`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error('Не удалось загрузить данные соискателя');
    }

    const data = await response.json();

    dispatch(changeVacancies(data));
    dispatch(changeLoading(false));
    return data; 
  }
);

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    changeVacancies: (state, action: PayloadAction<Vacancies[]>) => {
      state.vacancies = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const vacanciesReducer = vacanciesSlice.reducer;
export const { changeVacancies, changeLoading } = vacanciesSlice.actions;
