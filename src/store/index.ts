import { configureStore } from "@reduxjs/toolkit";
import cities from './cities';
import city from './city';


export const store = configureStore({
  reducer: {
    cities,
    city,
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch