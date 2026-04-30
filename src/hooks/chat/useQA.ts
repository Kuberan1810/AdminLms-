import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios";
import type { QAPost, ChatReply } from "../../types/chat";

export const useQAFeed = (courseId: number | string, batchName: string, pinnedFirst: boolean = true, page: number = 1) => {
    return useQuery<QAPost[]>({
        queryKey: ["qa-feed", courseId, batchName, pinnedFirst, page],
        queryFn: async () => {
            const res = await api.get(`/api/courses/${courseId}/qa`, {
                params: { 
                    batch_name: batchName,
                    page, 
                    page_size: 20, 
                    status: pinnedFirst ? "pinned" : undefined 
                }
            });
            return res.data;
        },
        enabled: !!courseId && !!batchName
    });
};

export const useCreateQAPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, content, isPrivate = false }: { courseId: number | string, batchName: string, content: string, isPrivate?: boolean, attachmentIds?: number[] }) => {
            const res = await api.post(`/api/courses/${courseId}/qa`, {
                title: "", // Required according to QAPostCreate schema
                description: content,
                visibility: isPrivate ? "private" : "public"
            }, {
                params: { batch_name: batchName }
            });
            return res.data as QAPost;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const useDeleteQAPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId }: { courseId: number | string, batchName: string, questionId: number }) => {
            await api.delete(`/api/courses/${courseId}/qa/${questionId}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const usePinQAPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId }: { courseId: number | string, batchName: string, questionId: number }) => {
            const res = await api.patch(`/api/courses/${courseId}/qa/${questionId}/pin`);
            return res.data as { pinned: boolean };
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const useBookmarkQAPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId }: { courseId: number | string, batchName: string, questionId: number }) => {
            const res = await api.patch(`/api/courses/${courseId}/qa/${questionId}/bookmark`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const useUpdateQAVisibility = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, questionId, isPrivate }: { courseId: number | string, questionId: number, isPrivate: boolean }) => {
            const res = await api.patch(`/api/courses/${courseId}/qa/${questionId}/visibility`, {
                visibility: isPrivate ? "private" : "public"
            });
            return res.data as QAPost;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId] });
        }
    });
};

export const useLikeQAPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId }: { courseId: number | string, batchName: string, questionId: number }) => {
            const res = await api.post(`/api/courses/${courseId}/qa/${questionId}/like`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const useUnlikeQAPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId }: { courseId: number | string, batchName: string, questionId: number }) => {
            const res = await api.delete(`/api/courses/${courseId}/qa/${questionId}/like`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const useQAReplies = (courseId: number | string, batchName: string, questionId: number) => {
    return useQuery<ChatReply[]>({
        queryKey: ["qa-replies", courseId, questionId],
        queryFn: async () => {
            const res = await api.get(`/api/courses/${courseId}/qa/${questionId}/replies`);
            return res.data;
        },
        enabled: !!courseId && !!questionId
    });
};

export const usePostQAReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId, content }: { courseId: number | string, batchName: string, questionId: number, content: string }) => {
            const res = await api.post(`/api/courses/${courseId}/qa/${questionId}/replies`, { content });
            return res.data as ChatReply;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-replies", variables.courseId, variables.questionId] });
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const useDeleteQAReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId, replyId }: { courseId: number | string, batchName: string, questionId: number, replyId: number }) => {
            await api.delete(`/api/courses/${courseId}/qa/${questionId}/replies/${replyId}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-replies", variables.courseId, variables.questionId] });
            queryClient.invalidateQueries({ queryKey: ["qa-feed", variables.courseId, variables.batchName] });
        }
    });
};

export const useLikeQAReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId, replyId }: { courseId: number | string, batchName: string, questionId: number, replyId: number }) => {
            const res = await api.post(`/api/courses/${courseId}/qa/${questionId}/replies/${replyId}/like`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-replies", variables.courseId, variables.questionId] });
        }
    });
};

export const useUnlikeQAReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, questionId, replyId }: { courseId: number | string, batchName: string, questionId: number, replyId: number }) => {
            const res = await api.delete(`/api/courses/${courseId}/qa/${questionId}/replies/${replyId}/like`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["qa-replies", variables.courseId, variables.questionId] });
        }
    });
};
