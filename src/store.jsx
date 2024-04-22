import { configureStore } from "@reduxjs/toolkit";

import { neighbourhoods } from "./reducers/neighbourhoods";
import { selectedNeighbourhood } from "./reducers/selectedNeighbourhood";

export const store = configureStore({
  reducer: {
    neighbourhoods: neighbourhoods.reducer,
    selectedNeighbourhood: selectedNeighbourhood.reducer,
  },
});
