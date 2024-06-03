import { createSlice } from "@reduxjs/toolkit";

export const allMarkers = createSlice({
  name: "allMarkers",
  initialState: {
    allMarkers: null,
  },
  reducers: {
    setAllMarkers: (state, action) => {
      state.allMarkers = action.payload;
    },
  },
});

export const { setAllMarkers } = allMarkers.actions;
