import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { vacanciesReducer } from "./vacancies.slice";
import { authReducer } from "./auth.slice";
import { userReducer } from "./user.slice";

const rootReducer = combineReducers({
  vacancies: vacanciesReducer,
  auth: authReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type StoreApp = ReturnType<typeof rootReducer>;
