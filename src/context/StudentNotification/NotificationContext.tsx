import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getNotifications, markAllNotificationsRead, markNotificationRead, type NotificationGroup } from "../../services/notificationService";

interface NotificationContextType {
    notificationGroups: NotificationGroup[];
    unreadCount: number;
    markAsRead: (id: number) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    fetchNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notificationGroups, setNotificationGroups] = useState<NotificationGroup[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);

    const fetchNotifications = async () => {
        try {
            const data = await getNotifications();
            setNotificationGroups(data.groups || []);
            setUnreadCount(data.unread_count || 0);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Optional polling every minute
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const markAsRead = async (id: number) => {
        try {
            // Optimistically update
            setNotificationGroups(prev => prev.map(group => ({
                ...group,
                notifications: group.notifications.map(n => 
                    n.id === id ? { ...n, is_read: true } : n
                )
            })));
            setUnreadCount(prev => Math.max(0, prev - 1));

            await markNotificationRead(id);
            fetchNotifications(); // Sync with backend state
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
            fetchNotifications();
        }
    };

    const markAllAsRead = async () => {
        try {
            // Optimistic
            setNotificationGroups(prev => prev.map(group => ({
                ...group,
                notifications: group.notifications.map(n => ({ ...n, is_read: true }))
            })));
            setUnreadCount(0);

            await markAllNotificationsRead();
            fetchNotifications();
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);
            fetchNotifications();
        }
    };

    return (
        <NotificationContext.Provider
            value={{ notificationGroups, unreadCount, markAsRead, markAllAsRead, fetchNotifications }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications must be used inside NotificationProvider");
    return ctx;
};
