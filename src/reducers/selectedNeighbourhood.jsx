import { createSlice } from "@reduxjs/toolkit";

export const selectedNeighbourhood = createSlice({
  name: "selectedNeighbourhood",
  initialState: {
    selectedNeighbourhood: null,
    selectedNeighbourhoodData: null,
    selectedNeighbourhoodStats: null,
  },
  reducers: {
    setSelectedNeighbourhood: (state, action) => {
      state.selectedNeighbourhood = action.payload;
    },
    setSelectedNeighbourhoodData: (state, action) => {
      state.selectedNeighbourhoodData = action.payload;
    },
    setSelectedNeighbourhoodStats: (state, action) => {
      state.selectedNeighbourhoodStats = action.payload;
    },
  },
});

export const {
  setSelectedNeighbourhood,
  setSelectedNeighbourhoodData,
  setSelectedNeighbourhoodStats,
} = selectedNeighbourhood.actions;
