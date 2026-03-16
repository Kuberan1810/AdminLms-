export interface StudentResult {
    id: string;
    studentId: string;
    name: string;
    startTime?: string;
    endTime?: string;
    status: "submitted" | "not_attended" /* | "missed" | "pending" */;
    mark?: number;
}
