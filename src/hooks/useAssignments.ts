   import { useQuery } from "@tanstack/react-query";
import { getStudentAssignments, getStudentDashboardAssignments, getAssignmentById, getAssignments, getModules, getMySubmission } from "../services/assignmentService";
import { getBatchOverview } from "../services/batchService";
import type { AssignmentResponse, StudentDashboardAssignmentItem, Module } from "../services/assignmentService";
import type { BatchOverviewResponse } from "../services/batchService";

export const useMySubmission = (assignmentId: number | string) => {
    return useQuery({
        queryKey: ["my-submission", assignmentId],
        queryFn: () => getMySubmission(assignmentId),
        enabled: !!assignmentId,
        retry: false,
    });
};

export const useStudentAssignments = () => {
    return useQuery<AssignmentResponse[]>({
        queryKey: ["student-assignments"],
        queryFn: getStudentAssignments,
    });
};

export const useAssignmentDetails = (assignmentId: number | string) => {
    return useQuery<AssignmentResponse>({
        queryKey: ["assignment-details", assignmentId],
        queryFn: () => getAssignmentById(assignmentId),
        enabled: !!assignmentId,
    });
};

export const useStudentDashboardAssignments = (status?: string, date?: string) => {
    return useQuery<StudentDashboardAssignmentItem[]>({
        queryKey: ["student-dashboard-assignments", status, date],
        queryFn: () => getStudentDashboardAssignments(status, date),
    });
};

export const useInstructorAssignments = (courseId?: number, batchName?: string) => {
    return useQuery<AssignmentResponse[]>({
        queryKey: ["instructor-assignments", courseId, batchName],
        queryFn: () => getAssignments(courseId, batchName),
    });
};

export const useInstructorModules = (courseId: number, batchName: string) => {
    return useQuery<Module[]>({
        queryKey: ["instructor-modules", courseId, batchName],
        queryFn: () => getModules(courseId, batchName),
        enabled: !!courseId && !!batchName,
    });
};

export const useBatchOverview = (courseId: number, batchName: string) => {
    return useQuery<BatchOverviewResponse>({
        queryKey: ["batch-overview", courseId, batchName],
        queryFn: () => getBatchOverview(courseId, batchName),
        enabled: !!courseId && !!batchName,
    });
};
