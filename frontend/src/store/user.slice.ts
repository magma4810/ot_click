import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userState } from "../types";
import { changeLoading } from "./vacancies.slice";

const initialState: userState = {
    username: sessionStorage.getItem('username') || "",
    password: "",
    repeatPassword: "",
    companyName: "",
    subscribeVacanciesID: [],
    role: sessionStorage.getItem('role') || ""
};
const API_URL = import.meta.env.VITE_API_URL;

export const getInfoApplicant = createAsyncThunk(
    'user/getInfoApplicant',
    async (username: string, { dispatch }) => {
      const response = await fetch(`${API_URL}/getInfoApplicant/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные соискателя');
      }
  
      const data = await response.json();
      const applicantData = data[0];

      dispatch(changeSubscribeVacanciesID(applicantData.subscribeVacanciesID));
      dispatch(changeLoading(false));
      return applicantData; 
    }
  );

export const updateSubscriptionsID = createAsyncThunk(
    'user/updateSubscribeVacanciesID',
    async ({ username }: { username: string }, { getState }) => {
      const { user } = getState() as { user: userState };
      const response = await fetch(`${API_URL}/updateSubscribeVacanciesID/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          subscribeVacanciesID: user.subscribeVacanciesID
        }),
      });
      return response.json();
    }
  );
  
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        changePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        changeRepeatPassword: (state, action: PayloadAction<string>) => {
            state.repeatPassword = action.payload;
        },
        changeCompanyName: (state, action: PayloadAction<string>) => {
            state.companyName = action.payload;
        },
        changeRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        resetUserForm: (state) => {
            state.username = '';
            state.password = '';
            state.repeatPassword = '';
            state.companyName = '';
            state.subscribeVacanciesID = [];
            state.role = '';
          },
          addSubscribeVacanciesID: (state, action: PayloadAction<number>) => {
            state.subscribeVacanciesID = [...state.subscribeVacanciesID, action.payload];
        },
        deleteSubscribeVacanciesID: (state, action: PayloadAction<number>) => {
            state.subscribeVacanciesID = state.subscribeVacanciesID.filter((id) => id !== action.payload);
        },
        changeSubscribeVacanciesID: (state, action: PayloadAction<number[]>) => {
            state.subscribeVacanciesID = action.payload;
        },
    },
    
});

export const userReducer = userSlice.reducer;

export const { changeUsername,deleteSubscribeVacanciesID,addSubscribeVacanciesID,changeSubscribeVacanciesID, changePassword,changeRepeatPassword,changeCompanyName,changeRole,resetUserForm } = userSlice.actions;