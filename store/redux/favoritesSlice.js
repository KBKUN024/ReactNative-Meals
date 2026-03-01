import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    addFavorites: (state, action) => {
      state.ids.push(action.payload);
    },
    removeFavorites: (state, action) => {
      state.ids.slice(state.ids.indexOf(action.payload, 1));
    },
  },
});

export const { addFavorites, removeFavorites } = favoriteSlice.actions;

export default favoriteSlice.reducer;
