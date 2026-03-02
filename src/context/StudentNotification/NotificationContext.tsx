import { createContext, useContext, useState, type ReactNode } from "react";

export type NotificationCategory = "reminder" | "score" | "system";

export interface NotificationType {
    id: number;
    title: string;
    subtitle: string;
    date: Date;
    category: NotificationCategory;
    unread: boolean;
}

interface NotificationContextType {
    notifications: NotificationType[];
    unreadCount: number;
    markAsRead: (id: number) => void;
    markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<NotificationType[]>([
        // {
        //     id: 1,
        //     title: "Schedule Reminder",
        //     subtitle: "Upcoming class : AI agent starts in 15 mins",
        //     date: new Date(Date.now() - 15 * 60000),
        //     category: "reminder",
        //     unread: true,
        // },
        // {
        //     id: 2,
        //     title: "Test Score",
        //     subtitle: "Final grades for test name have been posted",
        //     date: new Date(Date.now() - 25 * 60000),
        //     category: "score",
        //     unread: true,
        // },
        // {
        //     id: 3,
        //     title: "System Alert",
        //     subtitle: "Your Test submission was successful",
        //     date: new Date(Date.now() - 24 * 60 * 60000),
        //     category: "system",
        //     unread: true,
        // },
        // {
        //     id: 4,
        //     title: "Schedule Reminder",
        //     subtitle: "Upcoming class : AI agent starts in 15 mins",
        //     date: new Date(Date.now() - 26 * 60 * 60000),
        //     category: "reminder",
        //     unread: false,
        // },
        
    ]);

    

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(n =>
                n.id === id ? { ...n, unread: false } : n
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, unread: false }))
        );
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
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
