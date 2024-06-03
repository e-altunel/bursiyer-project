import { configureStore } from "@reduxjs/toolkit";

import { neighbourhoods } from "./reducers/neighbourhoods";
import { selectedNeighbourhood } from "./reducers/selectedNeighbourhood";
import { selectedMarker } from "./reducers/selectedMarker";
import { allMarkers } from "./reducers/allMarkers";
import { uiSett } from "./reducers/uiSett";

export const store = configureStore({
  reducer: {
    neighbourhoods: neighbourhoods.reducer,
    selectedNeighbourhood: selectedNeighbourhood.reducer,
    selectedMarker: selectedMarker.reducer,
    allMarkers: allMarkers.reducer,
    uiSett: uiSett.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
