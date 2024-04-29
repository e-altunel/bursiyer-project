import { configureStore } from "@reduxjs/toolkit";

import { neighbourhoods } from "./reducers/neighbourhoods";
import { selectedNeighbourhood } from "./reducers/selectedNeighbourhood";
import { uiSett } from "./reducers/uiSett";

export const store = configureStore({
  reducer: {
    neighbourhoods: neighbourhoods.reducer,
    selectedNeighbourhood: selectedNeighbourhood.reducer,
    uiSett: uiSett.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
