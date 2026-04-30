import api from "../config/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Option {
    text: string;
    is_correct: boolean;
}

export interface Question {
    text: string;
    options: Option[];
}

export interface CreateTestRequest {
    title: string;
    course_id: number;
    batch_name: string;
    module_name: string;
    description: string;
    start_time: string; // ISO format
    end_time: string;   // ISO format
    questions: Question[];
}

export interface UpdateTestRequest {
    description?: string;
    start_time?: string;
    end_time?: string;
    questions?: Question[];
}

export interface TestResponse {
    id: number;
    title: string;
    description: string;
    course_id: number;
    batch_name: string;
    module_name: string;
    start_time: string;
    end_time: string;
    created_at: string;
    questions: any[]; // Questions usually come back with IDs
}

export interface TestDetailsResponse {
    test_id: number;
    title: string;
    module_name: string;
    date: string;
    duration_minutes: number;
    start_time: string;
    end_time: string;
    total_enrolled: number;
    total_submitted: number;
    total_passed: number;
    total_failed: number;
    students: StudentResult[];
}

export interface StudentResult {
    sno: number;
    student_id: string;
    student_name: string;
    start_time: string;
    end_time: string;
    status: string;
    mark: number;
    submission_id: number;
}

export interface ReviewSubmissionResponse {
    submission_id: number;
    test_id: number;
    student_id: string;
    student_name: string;
    started_at: string;
    submitted_at: string;
    score: number;
    is_passed: boolean;
    status: string;
    answers: SubmissionAnswer[];
}

export interface SubmissionAnswer {
    question_id: number;
    question_text: string;
    selected_option_id: number;
    selected_option_text: string;
    is_correct: boolean;
    correct_option_text: string;
}

export interface SubmitTestRequest {
    answers: {
        question_id: number;
        selected_option_id: number;
    }[];
}

// ─── Types (list) ─────────────────────────────────────────────────────────────

export interface TestListItem {
    id: number;
    title: string;
    module_name: string;
    batch_name: string;
    start_time: string;
    end_time: string;
    created_at: string;
}

// ─── API Calls ────────────────────────────────────────────────────────────────

/** GET /tests/ - List Tests by course + batch */
export const listTests = async (courseId: number, batchName: string): Promise<TestListItem[]> => {
    const response = await api.get(`/tests/`, { params: { course_id: courseId, batch_name: batchName } });
    return response.data;
};

/** POST /tests/ - Create Test */
export const createTest = async (data: CreateTestRequest): Promise<TestResponse> => {
    const response = await api.post("/tests/", data);
    return response.data;
};

/** PUT /tests/{test_id} - Update Test */
export const updateTest = async (testId: number, data: UpdateTestRequest): Promise<TestResponse> => {
    const response = await api.put(`/tests/${testId}`, data);
    return response.data;
};

/** POST /tests/{test_id}/start - Start Test */
export const startTest = async (testId: number): Promise<string> => {
    const response = await api.post(`/tests/${testId}/start`);
    return response.data;
};

/** POST /tests/{test_id}/submit - Submit Test */
export const submitTest = async (testId: number, data: SubmitTestRequest): Promise<string> => {
    const response = await api.post(`/tests/${testId}/submit`, data);
    return response.data;
};

/** GET /tests/{test_id}/details - Get Test Details (Instructor) */
export const getTestDetails = async (testId: number): Promise<TestDetailsResponse> => {
    const response = await api.get(`/tests/${testId}/details`);
    return response.data;
};

/** GET /tests/{test_id}/submission/{submission_id} - Review Submission */
export const reviewSubmission = async (testId: number, submissionId: number): Promise<ReviewSubmissionResponse> => {
    const response = await api.get(`/tests/${testId}/submission/${submissionId}`);
    return response.data;
};
