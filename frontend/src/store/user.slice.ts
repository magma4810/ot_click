import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userState } from "../types";

const initialState: userState = {
    username: "",
    password: "",
    repeatPassword: "",
    companyName: "",
    role: sessionStorage.getItem('role') || ""
};

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
          },
    },
});

export const userReducer = userSlice.reducer;
export const { changeUsername, changePassword,changeRepeatPassword,changeCompanyName,changeRole,resetUserForm } = userSlice.actions;