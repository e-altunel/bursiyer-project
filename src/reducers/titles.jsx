import { createSlice } from "@reduxjs/toolkit";

export const titles = createSlice({
  name: "titles",
  initialState: {
    titles: null,
    title_group: null,
    selectedTitles: [],
    selectedGroupIndex: [null, null],
    graphGroup: {
      neighbourhood: null,
    },
  },
  reducers: {
    setTitles: (state, action) => {
      state.titles = action.payload;
    },
    setTitleGroup: (state, action) => {
      state.title_group = action.payload;
    },
    setSelectedTitles: (state, action) => {
      state.selectedTitles = action.payload;
    },
    setSelectedGroupIndex: (state, action) => {
      state.selectedGroupIndex = action.payload;
    },
    setGraphGroupNeighbourhood: (state, action) => {
      state.graphGroup.neighbourhood = action.payload;
    },
  },
});

export const {
  setTitles,
  setTitleGroup,
  setSelectedTitles,
  setSelectedGroupIndex,
  setGraphGroupNeighbourhood,
} = titles.actions;
