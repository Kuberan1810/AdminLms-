import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TestStats {
  total: number;
  attempted: number;
  marked: number;
  unattempted: number;
}

interface CounterState {
  started: boolean;
  finished: boolean;
  timer: number;
  stats: TestStats;
}

const initialState: CounterState = {
  started: false,
  finished: false,
  timer: 2400, // 40 minutes in seconds
  stats: {
    total: 20,
    attempted: 0,
    marked: 0,
    unattempted: 20,
  },
};

const counterSlice = createSlice({
  name: "TestStatus",
  initialState,
  reducers: {
    startTest: (state) => {
      state.started = true;
      state.finished = false; // safety
      state.timer = 2400; // start fresh
    },
    tickTimer: (state) => {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
    finishTest: (state, action: PayloadAction<TestStats>) => {
      state.finished = true;
      state.stats = action.payload;
    },
    resetTest: (state) => {
      state.started = true; // Stay in the test window
      state.finished = false;
      // Intentionally do NOT reset the timer here so it resumes
    },
    fullResetTest: (state) => {
       state.started = false;
       state.finished = false;
       state.timer = 2400;
       state.stats = initialState.stats;
    }
  },
});

export const { startTest, tickTimer, finishTest, resetTest, fullResetTest } =
  counterSlice.actions;

export default counterSlice.reducer;
