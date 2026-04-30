import api from "../config/axios";

export interface BatchOverviewResponse {
    attendance_rate: string | number;
    attendance_window_days: number;
    total_classes: number;
    classes_total: number;
    classes_completed: number;
    classes_completion_percent: number;
    total_students: number;
    average_score: string | number | null;
    average_score_max: number;
    course_title: string;
    batch_name: string;
    // Add other fields if present in the API response
    activities?: string[];
}

/** GET /batches/{course_id}/{batch_name}/overview */
export const getBatchOverview = async (courseId: number, batchName: string): Promise<BatchOverviewResponse> => {
    // Normalize batch name for API (e.g., "Batch A" -> "Batch-A")
    const apiBatchName = batchName.replace(/\s+/g, "-");
    const response = await api.get(`/batches/${courseId}/${apiBatchName}/overview`);
    return response.data;
};
