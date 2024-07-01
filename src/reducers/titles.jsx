import { createSlice } from "@reduxjs/toolkit";

export const titles = createSlice({
  name: "titles",
  initialState: {
    titles: null,
    title_group: null,
  },
  reducers: {
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
    setTitleGroup: (state, action) => {
      state.title_group = action.payload;
    },
  },
});

export const { setTitles, setTitleGroup } = titles.actions;
