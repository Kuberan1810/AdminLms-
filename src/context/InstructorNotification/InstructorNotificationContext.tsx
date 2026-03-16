import { createContext, useContext, useState, type ReactNode } from "react";

export type InstructorNotificationCategory =
    | "assignment"
    | "reminder"
    | "student";

export interface InstructorNotificationType {
    id: number;
    title: string;
    subtitle: string;
    date: Date;
    category: InstructorNotificationCategory;
    unread: boolean;
}

interface NotificationContextType {
    notifications: InstructorNotificationType[];
    unreadCount: number;
    markAsRead: (id: number) => void;
    markAllAsRead: () => void;
}

const InstructorNotificationContext =
    createContext<NotificationContextType | null>(null);

export const InstructorNotificationProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [notifications, setNotifications] = useState<
        InstructorNotificationType[]
    >([
        // {
        //     id: 1,
        //     title: "15 Students submitted assignment -3",
        //     subtitle: "Batch -02",
        //     date: new Date(),
        //     category: "assignment",
        //     unread: true,
        // },
        // {
        //     id: 2,
        //     title: "Schedule Reminder",
        //     subtitle: "Upcoming class : AI agent starts in 15 mins",
        //     date: new Date(Date.now() - 15 * 60000),
        //     category: "reminder",
        //     unread: true,
        // },
        // {
        //     id: 3,
        //     title: "New student enrolled",
        //     subtitle: "Indhu Joined AM101 Batch -02",
        //     date: new Date(Date.now() - 24 * 60 * 60000),
        //     category: "student",
        //     unread: true,
        // },
        // {
        //     id: 4,
        //     title: "Assignment Update",
        //     subtitle: "New Assignment posted in AI for Frontend engineer",
        //     date: new Date(Date.now() - 26 * 60 * 60000),
        //     category: "assignment",
        //     unread: false
        // }
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
        <InstructorNotificationContext.Provider
            value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
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
