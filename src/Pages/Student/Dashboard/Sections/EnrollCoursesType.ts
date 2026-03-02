export interface Course {
    [x: string]: any;
    id: number;
    course_id: string;
    course_name: string;
    duration_months: number;
    total_lessons: number;
    progress: number;
    status: string;
}
