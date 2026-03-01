import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    favoriteMeals: favoriteReducer,
  },
});
