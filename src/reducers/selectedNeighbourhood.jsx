import { createSlice } from "@reduxjs/toolkit";

export const selectedNeighbourhood = createSlice({
  name: "selectedNeighbourhood",
  initialState: {
    selectedNeighbourhood: null,
  },
  reducers: {
    setSelectedNeighbourhood: (state, action) => {
      state.selectedNeighbourhood = action.payload;
    },
  },
});

export const { setSelectedNeighbourhood } = selectedNeighbourhood.actions;
