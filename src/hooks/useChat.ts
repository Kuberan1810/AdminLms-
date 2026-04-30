import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/axios";

export interface ChatAuthor {
    id: number;
    name: string;
    role: string;
    student_id?: string;
}

export interface ChatReply {
    id: number;
    post_id: number;
    content: string;
    created_at: string;
    author: ChatAuthor;
}

export interface ChatPost {
    id: number;
    course_id: number;
    batch_name: string;
    content: string;
    created_at: string;
    updated_at: string;
    is_pinned: boolean;
    pinned_at: string | null;
    author: ChatAuthor;
    is_instructor: boolean;
    like_count: number;
    reply_count: number;
    is_liked_by_me: boolean;
    is_bookmarked_by_me: boolean;
    is_private: boolean;
    replies: ChatReply[];
}

export const useChatMessages = (courseId: string | number, batchName: string) => {
    return useQuery<ChatPost[]>({
        queryKey: ["chat-messages", courseId, batchName],
        queryFn: async () => {
            try {
                const res = await api.get(`/chat/${courseId}/${batchName}`);
                if (res.data && Array.isArray(res.data)) {
                    return res.data.map((p: any) => ({
                        ...p,
                        is_private: p.is_private ?? p.content?.startsWith('[PRIVATE]')
                    }));
                }
                return [];
            } catch (error) {
                console.error("Chat API error", error);
                return []; // Return empty array on failure to prevent crashing 
            }
        },
        enabled: !!courseId && !!batchName,
    });
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, content, isPrivate = false }: { courseId: string | number; batchName: string; content: string; isPrivate?: boolean }) => {
            const payload = {
                course_id: Number(courseId),
                batch_name: batchName,
                content: isPrivate ? `[PRIVATE]\n${content}` : content
            };
            const res = await api.post(`/chat/${courseId}/${batchName}`, payload);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", variables.courseId, variables.batchName] });
        },
    });
};

export const useReplyMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, postId, content }: { courseId: string | number; batchName: string; postId: number; content: string }) => {
            const res = await api.post(`/chat/${courseId}/${batchName}/${postId}/replies`, { content });
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", variables.courseId, variables.batchName] });
        },
    });
};

export const useDeleteMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, postId }: { courseId: string | number; batchName: string; postId: number }) => {
            await api.delete(`/chat/${courseId}/${batchName}/${postId}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", variables.courseId, variables.batchName] });
        },
    });
};

export const useToggleLike = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, postId }: { courseId: string | number; batchName: string; postId: number }) => {
            const res = await api.post(`/chat/${courseId}/${batchName}/${postId}/like`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", variables.courseId, variables.batchName] });
        },
    });
};

export const useToggleBookmark = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, postId }: { courseId: string | number; batchName: string; postId: number }) => {
            const res = await api.post(`/chat/${courseId}/${batchName}/${postId}/bookmark`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", variables.courseId, variables.batchName] });
        },
    });
};

export const useTogglePin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, postId }: { courseId: string | number; batchName: string; postId: number }) => {
            const res = await api.post(`/chat/${courseId}/${batchName}/${postId}/pin`);
            return res.data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", variables.courseId, variables.batchName] });
        },
    });
};

export const useGetPost = (courseId: string | number, batchName: string, postId: number) => {
    return useQuery<ChatPost>({
        queryKey: ["chat-post", courseId, batchName, postId],
        queryFn: async () => {
            const res = await api.get(`/chat/${courseId}/${batchName}/${postId}`);
            return res.data;
        },
        enabled: !!courseId && !!batchName && !!postId,
    });
};

export const useDeleteReply = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ courseId, batchName, replyId }: { courseId: string | number; batchName: string; replyId: number }) => {
            await api.delete(`/chat/${courseId}/${batchName}/replies/${replyId}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["chat-messages", variables.courseId, variables.batchName] });
        },
    });
};

export const useMyBookmarks = (courseId: string | number, batchName: string) => {
    return useQuery<ChatPost[]>({
        queryKey: ["chat-bookmarks", courseId, batchName],
        queryFn: async () => {
            try {
                const res = await api.get(`/chat/${courseId}/${batchName}/bookmarks/my`);
                return res.data || [];
            } catch (error) {
                console.error("Failed to fetch bookmarks", error);
                return [];
            }
        },
        enabled: !!courseId && !!batchName,
    });
};
