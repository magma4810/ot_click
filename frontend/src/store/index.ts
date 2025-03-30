import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { vacanciesReducer } from "./vacancies.slice";
import { authReducer } from "./auth.slice";
import { userReducer } from "./user.slice";
import { errorsReducer } from "./errors.slice";

const rootReducer = combineReducers({
  vacancies: vacanciesReducer,
  auth: authReducer,
  user: userReducer,
  errors: errorsReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type StoreApp = ReturnType<typeof rootReducer>;
