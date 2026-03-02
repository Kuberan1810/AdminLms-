import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/TestPageSlice";
import batchReducer from "./slices/BatchDetailSlice";
import resourceReducer from "./slices/ResourcesSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    batch: batchReducer,
    resource: resourceReducer,
  },
});

// Types (important for TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
