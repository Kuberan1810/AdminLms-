import { useMutation } from "@tanstack/react-query";
import api from "../../config/axios";
import type { ChatAttachment } from "../../types/chat";

export const useUploadChatFile = () => {
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            const res = await api.post(`/api/uploads/chat`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            return res.data as ChatAttachment;
        }
    });
};
