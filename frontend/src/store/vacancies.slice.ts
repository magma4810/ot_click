import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Vacancies, VacanciesState } from "../types";

const initialState: VacanciesState = {
  vacancies: [],
  loading: true,
};

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
