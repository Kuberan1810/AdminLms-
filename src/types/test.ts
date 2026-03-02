export interface StudentResult {
    id: string;
    studentId: string;
    name: string;
    startTime?: string;
    endTime?: string;
    status: "submitted" | "pending" | "missed";
    mark?: number;
}
