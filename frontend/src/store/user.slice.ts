import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { memberState } from "../types";

const initialState: memberState = {
    username: "",
    password: "",
    repeatPassword: "",
    companyName: "",
    role: "",
    errorPassword: false,
    errorUsername: false,
    errorCompanyName: false,
    errorPasswordRepeat: false
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
        changeErrorPassword: (state, action: PayloadAction<boolean>) => {
            state.errorPassword = action.payload;
        },
        changeErrorPasswordRepeat: (state, action: PayloadAction<boolean>) => {
            state.errorPasswordRepeat = action.payload;
        },
        changeErrorUsername: (state, action: PayloadAction<boolean>) => {
            state.errorUsername = action.payload;
        },
        changeErrorCompanyName: (state, action: PayloadAction<boolean>) => {
            state.errorCompanyName = action.payload;
        },
        resetUserForm: (state) => {
            state.username = '';
            state.password = '';
            state.repeatPassword = '';
            state.companyName = '';
            state.errorUsername = false;
            state.errorPassword = false;
            state.errorPasswordRepeat = false;
            state.errorCompanyName = false;
          },
          resetErrors: (state) => {
            state.errorUsername = false;
            state.errorPassword = false;
            state.errorPasswordRepeat = false;
            state.errorCompanyName = false;
          }
    },
});

export const userReducer = userSlice.reducer;
export const { changeUsername, changePassword,changeRepeatPassword,changeCompanyName,changeRole,changeErrorPassword,changeErrorUsername,changeErrorCompanyName,changeErrorPasswordRepeat,resetUserForm,resetErrors } = userSlice.actions;