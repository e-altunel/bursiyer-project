import { createSlice } from "@reduxjs/toolkit";

export const titles = createSlice({
  name: "titles",
  initialState: {
    titles: null,
  },
  reducers: {
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
  },
});

export const { setTitles } = titles.actions;
