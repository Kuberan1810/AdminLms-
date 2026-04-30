import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getNotifications, markAllNotificationsRead, markNotificationRead, type NotificationGroup } from "../../services/notificationService";

interface NotificationContextType {
    notificationGroups: NotificationGroup[];
    unreadCount: number;
    markAsRead: (id: number) => Promise<void>;
    markAllAsRead: () => Promise<void>;
    fetchNotifications: () => Promise<void>;
}

const InstructorNotificationContext = createContext<NotificationContextType | null>(null);

export const InstructorNotificationProvider = ({ children }: { children: ReactNode }) => {
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
        // Optional: Implement polling every minute
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
            fetchNotifications(); // Revert on failure
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
        <InstructorNotificationContext.Provider
            value={{ notificationGroups, unreadCount, markAsRead, markAllAsRead, fetchNotifications }}
        >
            {children}
        </InstructorNotificationContext.Provider>
    );
};

export const useInstructorNotifications = () => {
    const ctx = useContext(InstructorNotificationContext);
    if (!ctx)
        throw new Error(
            "useInstructorNotifications must be used inside InstructorNotificationProvider"
        );
    return ctx;
};
