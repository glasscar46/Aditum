import { configureStore } from "@reduxjs/toolkit";
import animalReducer from "./animalSlice";

export const store = configureStore({
  reducer: {
    animals: animalReducer,
  },
});
