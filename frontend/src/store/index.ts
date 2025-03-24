import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { vacanciesReducer } from "./vacancies.slice";

const rootReducer = combineReducers({
    vacancies: vacanciesReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type StoreApp = ReturnType<typeof rootReducer>;