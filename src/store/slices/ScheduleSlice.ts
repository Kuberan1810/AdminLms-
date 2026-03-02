import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ScheduleStatus = "join" | "soon";

export interface Schedule {
    id: number;
    title: string;
    batch: string;
    time: string;
    date: string; // YYYY-MM-DD
    displayDate: string;
    status: ScheduleStatus;
}

interface ScheduleState {
    schedules: Schedule[];
}

const initialState: ScheduleState = {
    schedules: [
        {
            id: 1,
            title: "AM101 - AI / ML Frontier AI Engineer",
            batch: "Batch-A",
            time: "9:00 - 10:30 am",
            date: "2026-02-09",
            displayDate: "Feb 09, 26",
            status: "join",
        },
        {
            id: 2,
            title: "AM101 - AI / ML Frontier AI Engineer",
            batch: "Batch-B",
            time: "5:30 - 7:00 pm",
            date: "2026-02-09",
            displayDate: "Feb 09, 26",
            status: "soon",
        },
    ],
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        addSchedule: (state, action: PayloadAction<Schedule>) => {
            state.schedules.push(action.payload);
        },
    },
});

export const { addSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
