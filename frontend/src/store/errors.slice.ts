import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { errorsState } from "../types";

const initialState: errorsState = {
    errorPassword: false,
    errorUsername: false,
    errorCompanyName: false,
    errorPasswordRepeat: false,
    errorUserNotFound: false,
    errorUserPassword: false
};

export const errorsSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
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
        changeErrorUserNotFound: (state, action: PayloadAction<boolean>) => {
            state.errorUserNotFound = action.payload;
        },
        changeErrorUserPassword: (state, action: PayloadAction<boolean>) => {
            state.errorUserPassword = action.payload;
        },
          resetErrors: (state) => {
            state.errorUsername = false;
            state.errorPassword = false;
            state.errorPasswordRepeat = false;
            state.errorCompanyName = false;
            state.errorUserNotFound = false;
            state.errorUserPassword = false;
          }
    },
});

export const errorsReducer = errorsSlice.reducer;
export const { changeErrorUserNotFound,changeErrorUserPassword,changeErrorPassword,changeErrorUsername,changeErrorCompanyName,changeErrorPasswordRepeat,resetErrors } = errorsSlice.actions;