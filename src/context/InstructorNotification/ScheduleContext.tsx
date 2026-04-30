import { createContext, useContext, useState, type ReactNode } from "react";

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

interface ScheduleContextType {
    schedules: Schedule[];
    addSchedule: (schedule: Omit<Schedule, "id">) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const useSchedule = () => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error("useSchedule must be used within a ScheduleProvider");
    }
    return context;
};

// Initial Dummy Data
const today = new Date();

const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

const displayDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "2-digit",
});

const initialSchedules: Schedule[] = [
    {
        id: 1,
        title: "AM101 - AI / ML Frontier AI Engineer",
        batch: "Batch-A",
        time: "8:00 - 09:00 am",
        date: formattedDate,
        displayDate: displayDate,
        status: "join",
    },
    {
        id: 2,
        title: "AM101 - AI / ML Frontier AI Engineer",
        batch: "Batch-B",
        time: "7:00 - 8:00 am",
        date: formattedDate,
        displayDate: displayDate,
        status: "join",
    },
];

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
    const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);

    const addSchedule = (newSchedule: Omit<Schedule, "id">) => {
        setSchedules((prev) => [
            ...prev,
            { ...newSchedule, id: Date.now() }, // Simple ID generation
        ]);
    };

    return (
        <ScheduleContext.Provider value={{ schedules, addSchedule }}>
            {children}
        </ScheduleContext.Provider>
    );
};
