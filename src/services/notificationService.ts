import api from "../config/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GroupedNotification {
    id: number;
    type: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    related_id?: number | null;
}

export interface NotificationGroup {
    label: string;
    notifications: GroupedNotification[];
}

export interface NotificationsResponse {
    unread_count: number;
    groups: NotificationGroup[];
}

// ─── API Calls ────────────────────────────────────────────────────────────────

/** 
 * GET /notifications/ 
 * Returns the current user's notifications sorted newest-first, grouped into Today / Yesterday / Older. 
 * Also returns the total unread count.
 */
export const getNotifications = async (): Promise<NotificationsResponse> => {
    try {
        const response = await api.get("/notifications/");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch notifications. Providing empty state.", error);
        return { unread_count: 0, groups: [] };
    }
};

/** 
 * PATCH /notifications/read-all
 * Mark all notifications as read for the current user.
 */
export const markAllNotificationsRead = async (): Promise<{ message: string }> => {
    const response = await api.patch("/notifications/read-all");
    return response.data;
};

/** 
 * PATCH /notifications/{notification_id}/read
 * Mark One Read
 */
export const markNotificationRead = async (notificationId: number): Promise<GroupedNotification> => {
    const response = await api.patch(`/notifications/${notificationId}/read`);
    return response.data;
};

/** 
 * DELETE /notifications/{notification_id}
 * Delete a notification
 */
export const deleteNotification = async (notificationId: number): Promise<any> => {
    const response = await api.delete(`/notifications/${notificationId}`);
    return response.data;
};
