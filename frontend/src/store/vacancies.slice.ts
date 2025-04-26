import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Vacancies, VacanciesState } from "../types";

const initialState: VacanciesState = {
  vacancies: [],
  loading: true,
};
const API_URL = import.meta.env.VITE_API_URL;
export const fetchGetVacancies = createAsyncThunk(
  "user/fetchGetVacancies",
  async (_, { dispatch }) => {
    const response = await fetch(`${API_URL}/getVacancies`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить данные соискателя");
    }

    const data = await response.json();

    dispatch(changeVacancies(data));
    dispatch(changeLoading(false));
    return data;
  },
);
export const fetchChangeResponded = createAsyncThunk(
  "user/fetchChangeResponded",
  async (payload: { id: number; subscribe: number }, { dispatch }) => {
    const response = await fetch(`${API_URL}/updateSubscribe/${payload.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        subscribe: payload.subscribe,
      }),
    });

    if (!response.ok) {
      throw new Error("Не удалось обновить откликнувшихся");
    }
    dispatch(
      changeResponded({
        id: payload.id,
        count: payload.subscribe,
      }),
    );
  },
);
export const fetchChangeVacancyIsActive = createAsyncThunk(
  "user/fetchChangeVacancyIsActive",
  async (payload: { id: number; active: boolean }, { dispatch }) => {
    const response = await fetch(
      `${API_URL}/changeVacancyIsActive/${payload.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          active: payload.active,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Не удалось обновить откликнувшихся");
    }
    dispatch(
      changeVacancyIsActive({
        id: payload.id,
      }),
    );
  },
);

export const fetchCreateVacancy = createAsyncThunk(
  "user/fetchCreateVacancy",
  async (payload: { data: object }) => {
    const response = await fetch(`${API_URL}/createVacancy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload.data),
    });

    if (!response.ok) {
      throw new Error("Не удалось создать вакансию");
    }
    return await response.json();
  },
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
    changeResponded: (
      state,
      action: PayloadAction<{ id: number; count: number }>,
    ) => {
      const vacancy = state.vacancies.find((v) => v.id === action.payload.id);
      if (vacancy) {
        vacancy.subscribe = action.payload.count;
      }
    },
    changeVacancyIsActive: (state, action: PayloadAction<{ id: number }>) => {
      const vacancy = state.vacancies.find((v) => v.id === action.payload.id);
      if (vacancy) {
        vacancy.is_active = !vacancy.is_active;
      }
    },
  },
});

export const vacanciesReducer = vacanciesSlice.reducer;
export const {
  changeVacancies,
  changeResponded,
  changeVacancyIsActive,
  changeLoading,
} = vacanciesSlice.actions;
