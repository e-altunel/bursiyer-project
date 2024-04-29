import { createSlice } from "@reduxjs/toolkit";

export const uiSett = createSlice({
  name: "uiSett",
  initialState: {
    admin: false,
    darkMode: false,
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setAdmin, setDarkMode } = uiSett.actions;
