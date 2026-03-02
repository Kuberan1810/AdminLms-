export interface Course {
    [x: string]: any;
    id: number;              // 👈 unified
    course_id: string;
    course_name: string;
    duration_months: number;
    total_lessons: number;
    progress: number;
    status: string;
}
