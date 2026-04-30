import api from "../config/axios";
import { BASE_URL } from "../config/api";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Course {
    course_id: number;
    course_name: string;
}

export interface BatchResponse {
    course_id: number;
    course_name: string;
    batches: string[];
}

export interface Module {
    module_id: number;
    module_name: string;
}

export interface AssignmentResourceResponse {
    id: number;
    file_name: string;
    file_path: string;
    file_type: string | null;
    uploaded_at: string;
}

export interface AssignmentResponse {
    id: number;
    course_id: number;
    batch_name: string;
    module_name: string;
    title: string;
    description: string | null;
    objective: string | null;
    expected_outcome: string | null;
    due_date: string | null;
    created_at: string;
    resources: AssignmentResourceResponse[];
    submitted_at?: string | null;
}

export interface StudentDashboardAssignmentItem {
    assignment_id: number;
    course_code: string;
    course_name: string;
    module_name: string;
    title: string;
    due_date: string | null;
    due_time: string | null;
    status: "completed" | "in_progress" | "overdue";
    submission_id: number | null;
    grade: string | null;
    submitted_at?: string | null;
}

// ─── API Calls ────────────────────────────────────────────────────────────────

/** GET /assignments/courses */
export const getCourses = async (): Promise<Course[]> => {
    const response = await api.get("/assignments/courses");
    return response.data;
};

/** GET /assignments/batches?course_id={courseId} */
export const getBatches = async (courseId: number): Promise<string[]> => {
    const response = await api.get("/assignments/batches", {
        params: { course_id: courseId },
    });
    // The API returns { course_id, course_name, batches: string[] }
    return response.data.batches || [];
};

/** GET /assignments/modules?course_id={courseId}&batch_name={batchName} */
export const getModules = async (courseId: number, batchName: string): Promise<Module[]> => {
    const response = await api.get("/assignments/modules", {
        params: { course_id: courseId, batch_name: batchName }
    });
    return response.data;
};

/** GET /assignments/ - List all assignments (with optional filters) */
export const getAssignments = async (courseId?: number, batchName?: string): Promise<AssignmentResponse[]> => {
    const response = await api.get("/assignments/", {
        params: { course_id: courseId, batch_name: batchName }
    });
    return response.data;
};

/** GET /assignments/my/list - Student: List all visible assignments */
export const getStudentAssignments = async (): Promise<AssignmentResponse[]> => {
    const response = await api.get("/assignments/my/list");
    return response.data;
};

/** GET /assignments/{assignment_id} - Get single assignment details */
export const getAssignmentById = async (assignmentId: number | string): Promise<AssignmentResponse> => {
    const response = await api.get(`/assignments/${assignmentId}`);
    return response.data;
};

/** GET /assignments/dashboard - Student: Dashboard view with status */
export const getStudentDashboardAssignments = async (status?: string, date?: string): Promise<StudentDashboardAssignmentItem[]> => {
    const params: Record<string, string> = {};
    if (status) params.status = status;
    if (date) params.date = date;

    const response = await api.get("/assignments/dashboard", { params });
    return response.data;
};

// ─── POST API Calls ───────────────────────────────────────────────────────────

/**
 * POST /assignments/
 * Creates the assignment and optionally attaches resource files 
 * in one multipart/form-data request.
 */
export const createAssignment = async (formData: FormData): Promise<any> => {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/assignments/`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
            "accept": "application/json"
            // Let the browser set Content-Type to multipart/form-data with boundary natively
        }
    });

    if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = await response.text();
        }
        console.error("Assignment creation failed:", {
            status: response.status,
            data: errorData
        });
        throw new Error(`Assignment creation failed with status: ${response.status}. Details: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
};

/** POST /assignments/{assignment_id}/resources */
export const uploadAssignmentResources = async (assignmentId: number | string, files: File[]): Promise<any> => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append("files", file); // Must match 'files' key exactly as Swagger demands
    });

    const token = sessionStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/assignments/${assignmentId}/resources`, {
        method: "POST",
        body: formData,
        headers: {
            "Authorization": `Bearer ${token}`,
            "accept": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
    }

    return await response.json();
};

/** DELETE /assignments/{assignment_id} */
export const deleteAssignment = async (assignmentId: number | string): Promise<void> => {
    await api.delete(`/assignments/${assignmentId}`);
};

// ─── Submission Types ──────────────────────────────────────────────────────────

/** Student entry inside submissions list response */
export interface SubmissionStudent {
    student_id: string;
    student_name: string;
    status: string;          // "submitted" | "not_submitted" | ...
    submitted_at: string | null;
    grade: string | null;
    submission_id: number | null;
    submission_text?: string | null;
    file_name?: string | null;
    file_path?: string | null;
}

/** Full response from GET /assignments/{id}/submissions */
export interface SubmissionsListResponse {
    assignment_id: number;
    title: string;
    batch_name: string;
    total_enrolled: number;
    total_submitted: number;
    students: SubmissionStudent[];
}

export interface SubmissionResponse {
    id: number;
    assignment_id: number;
    student_id?: string;
    student_name?: string;
    student_user_id?: number;
    submission_text?: string | null;
    file_name?: string | null;
    file_path?: string | null;
    submitted_at: string;
    status?: string;
    grade: string | null;
    feedback?: string | null;
}

export interface SubmissionFile {
    id: number;
    file_name: string;
    file_path: string;
    file_type: string | null;
    uploaded_at: string;
}

export interface UpdateAssignmentRequest {
    title?: string;
    description?: string;
    objective?: string;
    expected_outcome?: string;
    due_date?: string;
}

// ─── Submission API Calls ──────────────────────────────────────────────────────

/**
 * POST /assignments/{assignment_id}/submit
 * Student submits an assignment with file attachments.
 */
export const submitAssignment = async (assignmentId: number | string, file: File | null, submissionText?: string): Promise<SubmissionResponse> => {
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (submissionText) formData.append("submission_text", submissionText);

    const response = await api.post(`/assignments/${assignmentId}/submit`, formData);
    return response.data;
};

/**
 * GET /assignments/{assignment_id}/my-submission
 * Student gets their own submission for an assignment.
 */
export const getMySubmission = async (assignmentId: number | string): Promise<SubmissionResponse | null> => {
    try {
        const response = await api.get(`/assignments/${assignmentId}/my-submission`);
        return response.data;
    } catch (error: any) {
        // If 404, it means no submission exists, which is a valid state
        if (error.response?.status === 404 || error.response?.status === 400 || error.response?.status === 403 || error.response?.status === 422) {
            return null;
        }
        throw error;
    }
};

/**
 * PUT /assignments/{assignment_id}
 * Instructor updates an assignment.
 */
export const updateAssignment = async (assignmentId: number | string, data: UpdateAssignmentRequest): Promise<AssignmentResponse> => {
    const response = await api.put(`/assignments/${assignmentId}`, data);
    return response.data;
};

/**
 * GET /assignments/{assignment_id}/submissions
 * Instructor views all student submissions.
 */
export const getAssignmentSubmissions = async (assignmentId: number | string): Promise<SubmissionsListResponse> => {
    const response = await api.get(`/assignments/${assignmentId}/submissions`);
    const data = response.data;
    // Normalize: if the API returns the full object, return it directly
    if (data?.students) return data as SubmissionsListResponse;
    // Fallback: if somehow a plain array is returned, wrap it
    const students = Array.isArray(data) ? data : (data?.data ?? []);
    return {
        assignment_id: Number(assignmentId),
        title: "",
        batch_name: "",
        total_enrolled: 0,
        total_submitted: students.length,
        students,
    };
};
// ─── Grading API Calls ─────────────────────────────────────────────────────────

/**
 * PUT /assignments/{assignment_id}/submissions/{submission_id}/grade
 * Instructor grades a student's submission.
 */
export const gradeSubmission = async (assignmentId: number | string, submissionId: number | string, grade: string, feedback: string = ""): Promise<any> => {
    const response = await api.put(`/assignments/${assignmentId}/submissions/${submissionId}/grade`, 
        new URLSearchParams({ grade, feedback }).toString(),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
    );
    return response.data;
};
