// For Vite HMR Flush
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/axios";
import type { GroupChat, GroupMessage, GroupMember, PaginatedResponse } from "../../types/chat";

export const useGroupByBatch = (courseId: number | string, batchName: string) => {
    return useQuery<GroupChat>({
        queryKey: ["group-by-batch", courseId, batchName],
        queryFn: async () => {
            const res = await api.get(`/api/chats/groups/by-batch`, {
                params: { course_id: courseId, batch_name: batchName }
            });
            return res.data;
        },
        enabled: !!courseId && !!batchName
    });
};

export const useGroupMessages = (groupId: number | string, page: number = 1) => {
    return useQuery<PaginatedResponse<GroupMessage>>({
        queryKey: ["group-messages", groupId, page],
        queryFn: async () => {
            const res = await api.get(`/api/chats/groups/${groupId}/messages`, {
                params: { page, page_size: 20 }
            });
            return res.data;
        },
        enabled: !!groupId,
        refetchInterval: 5000
    });
};

export const useSendGroupMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ groupId, content, attachmentIds = [] }: { groupId: number | string, content: string, attachmentIds?: number[] }) => {
            const res = await api.post(`/api/chats/groups/${groupId}/messages`, {
                content,
                attachment_ids: attachmentIds
            });
            return res.data as GroupMessage;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["group-messages", variables.groupId] });
        }
    });
};

export const useDeleteGroupMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ groupId, messageId }: { groupId: number | string, messageId: number }) => {
            await api.delete(`/api/chats/groups/${groupId}/messages/${messageId}`);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["group-messages", variables.groupId] });
        }
    });
};

export const usePinGroupMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ groupId, messageId }: { groupId: number | string, messageId: number }) => {
            const res = await api.patch(`/api/chats/groups/${groupId}/messages/${messageId}/pin`);
            return res.data as { pinned: boolean };
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["group-messages", variables.groupId] });
        }
    });
};

export const useGroupMembers = (groupId: number | string) => {
    return useQuery<GroupMember[]>({
        queryKey: ["group-members", groupId],
        queryFn: async () => {
            const res = await api.get(`/api/chats/groups/${groupId}/members`);
            return res.data;
        },
        enabled: !!groupId
    });
};

export const useMarkGroupRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ groupId }: { groupId: number | string }) => {
            const res = await api.patch(`/api/chats/groups/${groupId}/read`);
            return res.data as { marked_read: number };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["group-chats"] });
        }
    });
};

export const useLikeGroupMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ messageId }: { messageId: number }) => {
            const res = await api.post(`/api/chats/messages/${messageId}/like`);
            return res.data as { liked: boolean, like_count: number };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["group-messages"] });
        }
    });
};

export const useUnlikeGroupMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ messageId }: { messageId: number }) => {
            const res = await api.delete(`/api/chats/messages/${messageId}/like`);
            return res.data as { liked: false, like_count: number };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["group-messages"] });
        }
    });
};

export const useBookmarkGroupMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ messageId }: { messageId: number }) => {
            const res = await api.patch(`/api/chats/messages/${messageId}/bookmark`);
            return res.data as { bookmarked: boolean };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["group-messages"] });
        }
    });
};
