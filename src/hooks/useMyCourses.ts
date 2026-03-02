import { useQuery } from "@tanstack/react-query";
import api from "../config/axios";
import { type Course } from "../Pages/Student/Dashboard/Sections/EnrollCoursesType";

export const useMyCourses = () => {
    return useQuery<Course[]>({
        queryKey: ["my-courses"],
        queryFn: async () => {
            const res = await api.get("/courses/my");
            const raw = Array.isArray(res.data)
                ? res.data
                : res.data?.data ?? [];

            return raw.map((c: any) => ({
                id: c.id ?? c.course_id,
                course_id: c.course_id ?? c.code ?? "",
                course_name: c.course_name ?? c.title ?? "",
                duration_months: Number(c.duration_months ?? c.duration ?? 0),
                total_lessons: Number(c.total_lessons ?? c.lessons ?? 0),
                progress: Number(c.progress ?? 0),
                status: c.status ?? "In progress",
            }));
        },

        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
