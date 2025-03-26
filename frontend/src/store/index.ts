import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { vacanciesReducer } from "./vacancies.slice";
import { authReducer } from "./auth.slice";

const rootReducer = combineReducers({
  vacancies: vacanciesReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type StoreApp = ReturnType<typeof rootReducer>;
