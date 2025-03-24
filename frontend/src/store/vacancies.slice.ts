import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Vacancies,VacanciesState } from "../types";


const initialState: VacanciesState = {
    vacancies: []
}

export const vacanciesSlice = createSlice({
    name: "vacancies",
    initialState,
    reducers: {
        changeVacancies: (state, action: PayloadAction<Vacancies[]>) => {
            state.vacancies = action.payload;
        }
    }
})

export const vacanciesReducer = vacanciesSlice.reducer;
export const {
    changeVacancies,
  } = vacanciesSlice.actions;