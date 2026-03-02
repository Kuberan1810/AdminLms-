import { createSlice } from "@reduxjs/toolkit";

interface BatchState {
  name: string | null;
}

const initialState: BatchState = {
  name: null,
};

const batchSlice = createSlice({
  name: "selectedBatch",
  initialState,
  reducers: {
    currentBatch: (state, action) => {
      state.name = action.payload;
    }
  },
});

export const { currentBatch } = batchSlice.actions;

export default batchSlice.reducer;