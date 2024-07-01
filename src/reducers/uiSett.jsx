import { createSlice } from "@reduxjs/toolkit";

export const uiSett = createSlice({
  name: "uiSett",
  initialState: {
    admin: false,
    darkMode: false,
    leftBar: {
      isOpen: false,
      leftBarSize: "3vw",
      rightBarSize: "11vw",
    },
    sidebar_base_size: 54,
    sidebar_const_size: 54,
    navbar: {
      size: "7vh",
      padding: "1vh",
    },
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setLeftBarOpen: (state, action) => {
      state.leftBarOpen = action.payload;
    },
    setSidebarBaseSize: (state, action) => {
      state.sidebar_base_size = action.payload;
    },
  },
});

export const { setAdmin, setDarkMode, setLeftBarOpen, setSidebarBaseSize } =
  uiSett.actions;
