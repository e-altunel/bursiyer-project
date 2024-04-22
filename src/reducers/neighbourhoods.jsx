import { createSlice } from "@reduxjs/toolkit";

export const neighbourhoods = createSlice({
  name: "neighbourhoods",
  initialState: {
    neighbourhoods: [],
  },
  reducers: {
    setNeighbourhoods: (state, action) => {
      state.neighbourhoods = action.payload;
    },
  },
});

export const { setNeighbourhoods } = neighbourhoods.actions;
