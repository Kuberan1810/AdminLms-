import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios";
import type { DMConversation, DMMessage, PaginatedResponse } from "../../types/chat";

export const useDMConversations = () => {
    return useQuery<DMConversation[]>({
        queryKey: ["dm-conversations"],
        queryFn: async () => {
            const res = await api.get(`/api/chats/conversations`);
            return res.data;
        },
        refetchInterval: 5000
    });
};

export const useStartDMConversation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ otherUserId, courseId }: { otherUserId: number | string, courseId: number | string }) => {
            const res = await api.post(`/api/chats/conversations`, {
                other_user_id: otherUserId,
                course_id: courseId
            });
            return res.data as DMConversation;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dm-conversations"] });
        }
    });
};

export const useDMMessages = (conversationId: number | string, page: number = 1) => {
    return useQuery<PaginatedResponse<DMMessage>>({
        queryKey: ["dm-messages", conversationId, page],
        queryFn: async () => {
            const res = await api.get(`/api/chats/conversations/${conversationId}/messages`, {
                params: { page, page_size: 20 }
            });
            return res.data;
        },
        enabled: !!conversationId,
        refetchInterval: 5000
    });
};

export const useSendDMMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ conversationId, content, attachmentIds = [] }: { conversationId: number | string, content: string, attachmentIds?: number[] }) => {
            const res = await api.post(`/api/chats/conversations/${conversationId}/messages`, {
                content,
                attachment_ids: attachmentIds
            });
            return res.data as DMMessage;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["dm-messages", variables.conversationId] });
            queryClient.invalidateQueries({ queryKey: ["dm-conversations"] });
        }
    });
};

export const useDeleteDMMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ conversationId, messageId }: { conversationId: number | string, messageId: number }) => {
            await api.delete(`/api/chats/conversations/${conversationId}/messages/${messageId}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["dm-messages", variables.conversationId] });
        }
    });
};

export const useMarkDMRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ conversationId }: { conversationId: number | string }) => {
            const res = await api.patch(`/api/chats/conversations/${conversationId}/read`);
            return res.data as { marked_read: number };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dm-conversations"] });
        }
    });
};

export const useLikeDMMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ messageId }: { messageId: number }) => {
            const res = await api.post(`/api/chats/messages/${messageId}/like`);
            return res.data as { liked: boolean, like_count: number };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dm-messages"] });
        }
    });
};

export const useUnlikeDMMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ messageId }: { messageId: number }) => {
            const res = await api.delete(`/api/chats/messages/${messageId}/like`);
            return res.data as { liked: false, like_count: number };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dm-messages"] });
        }
    });
};

export const useBookmarkDMMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ messageId }: { messageId: number }) => {
            const res = await api.patch(`/api/chats/messages/${messageId}/bookmark`);
            return res.data as { bookmarked: boolean };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dm-messages"] });
        }
    });
};
