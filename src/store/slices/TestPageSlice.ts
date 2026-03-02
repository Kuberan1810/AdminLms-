import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  started: boolean;
  finished: boolean;
}

const initialState: CounterState = {
  started: false,
  finished: false,
};

const counterSlice = createSlice({
  name: "TestStatus",
  initialState,
  reducers: {
    startTest: (state) => {
      state.started = true;
      state.finished = false; // safety
    },
    finishTest: (state) => {
      state.finished = true;
    },
    resetTest: (state) => {
      state.started = false;
      state.finished = false;
    },
  },
});

export const { startTest, finishTest, resetTest } =
  counterSlice.actions;

export default counterSlice.reducer;
