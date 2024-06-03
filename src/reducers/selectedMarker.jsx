import { createSlice } from "@reduxjs/toolkit";

export const selectedMarker = createSlice({
  name: "selectedMarker",
  initialState: {
    selectedMarker: null,
  },
  reducers: {
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
  },
});

export const { setSelectedMarker } = selectedMarker.actions;
