import { X } from "lucide-react";
import { motion } from "framer-motion";
import avatarImg from "../../../assets/avatar.jpg";

interface AdminNotificationProps {
    onClose: () => void;
}

interface NotificationItem {
    id: number;
    avatar: string;
    category: string;
    time: string;
    name: string;
    message: string;
    target: string;
    actions?: { label: string; primary?: boolean }[];
    isRead: boolean;
}

interface NotificationGroup {
    label: string;
    notifications: NotificationItem[];
}

const mockNotifications: NotificationGroup[] = [
    {
        label: "Today",
        notifications: [
            {
                id: 1,
                avatar: avatarImg,
                category: "CONTENT UPDATES",
                time: "2 mins ago",
                name: "Dr. Sarah Jenkins",
                message: "uploaded new Lecture Notes for",
                target: "Advanced Algorithms",
                isRead: false,
            },
            {
                id: 2,
                avatar: avatarImg,
                category: "FACULTY ACTIVITY",
                time: "15 mins ago",
                name: "Prof. Marcus Thorne",
                message: "submitted a Lesson Plan for",
                target: "UI/UX Design",
                actions: [
                    { label: "View Submission", primary: false },
                    { label: "Approve", primary: true },
                ],
                isRead: false,
            },
            {
                id: 3,
                avatar: avatarImg,
                category: "LEAVE REQUESTS",
                time: "1 hour ago",
                name: "Elena Rodriguez",
                message: "requested sick leave for",
                target: "tomorrow",
                actions: [
                    { label: "Acknowledge", primary: true },
                    { label: "Request Details", primary: false },
                ],
                isRead: false,
            },
        ],
    },
    {
        label: "Yesterday",
        notifications: [],
    },
];

const getCategoryStyles = (category: string) => {
    switch (category) {
        case "CONTENT UPDATES":
            return "bg-[#EFF6FF] text-[#2563EB] dark:bg-[#1A2E4B] dark:text-[#66A3FF]";
        case "FACULTY ACTIVITY":
            return "bg-[#FFF7ED] text-[#EA580C] dark:bg-[#3D2B20] dark:text-[#FFA366]";
        case "LEAVE REQUESTS":
            return "bg-[#FDF2F8] text-[#DB2777] dark:bg-[#DB2777] dark:text-[#FF8080]";
        default:
            return "bg-[#F2F2F2] text-[#626262] dark:bg-[#333] dark:text-[#A3A3A3]";
    }
};

const AdminNotification = ({ onClose }: AdminNotificationProps) => {
    const unreadCount = mockNotifications.reduce(
        (acc, group) => acc + group.notifications.filter((n) => !n.isRead).length,
        0
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 z-[1000]"
                onClick={onClose}
            />

            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#FAFAFA] dark:bg-[#1E1E1E] z-[1001] flex flex-col shadow-2xl"
            >
                {/* Header */}
                <div className="px-8 py-3 flex justify-between items-center border-b border-gray-100 dark:border-[#333]">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[24px] font-medium text-[#333] dark:text-white">
                            Notifications
                        </h2>
                        {unreadCount > 0 && (
                            <span className="w-[23px] h-[23px] rounded-full bg-[#F67300] text-white flex items-center justify-center text-[16px] font-bold">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-[12px] font-semibold text-[#F67300] hover:underline transition-all cursor-pointer">
                            Mark all as read
                        </button>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-[#333] rounded-full transition-colors cursor-pointer"
                        >
                            <X size={18} className="text-[#333] dark:text-white" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
                    {mockNotifications.map((group) => (
                        <div key={group.label} className="space-y-5">
                            <h3 className="text-[#F67300] font-medium text-[16px] tracking-wide">
                                {group.label}
                            </h3>

                            <div className="space-y-5">
                                {group.notifications.length > 0 && (
                                    group.notifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white dark:bg-[#2A2A2A] rounded-[24px] p-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.02)] border-[1px] border-[#E2E8F0] dark:border-[#333] flex gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                                        >
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="w-[48px] h-[48px] rounded-full object-cover"
                                            />

                                            <div className="flex-1 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-[12px] py-[4px] rounded-full ${getCategoryStyles(item.category)}`}>
                                                        {item.category}
                                                    </span>
                                                    <span className="text-[12px] text-[#94A3B8]">
                                                        {item.time}
                                                    </span>
                                                </div>

                                                <div className="text-[#0B1C30] dark:text-gray-200 text-[16px] leading-[1.5]">
                                                    <span className="font-bold">{item.name}</span>{" "}
                                                    {item.message}{" "}
                                                    <span className="font-semibold text-[#F67300]">
                                                        {item.target}
                                                    </span>
                                                </div>

                                                {item.actions && (
                                                    <div className="flex gap-4 pt-1">
                                                        {item.actions.map((action) => {
                                                            let buttonStyle = "";
                                                            if (item.category === "FACULTY ACTIVITY") {
                                                                if (action.label === "View Submission") {
                                                                    buttonStyle = "bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0]";
                                                                } else if (action.label === "Approve") {
                                                                    buttonStyle = "bg-[#FFF5ED] text-[#EA580C] hover:bg-[#FFEBD9]";
                                                                }
                                                            } else if (item.category === "LEAVE REQUESTS") {
                                                                if (action.label === "Acknowledge") {
                                                                    buttonStyle = "bg-[#F6810C] text-white hover:bg-[#E66900]";
                                                                } else if (action.label === "Request Details") {
                                                                    buttonStyle = "bg-white text-[#F6810C] border-[1px] border-[#FFDEBD] hover:bg-[#FFF5ED]";
                                                                }
                                                            } else {
                                                                buttonStyle = action.primary
                                                                    ? "bg-[#F67300] text-white hover:bg-[#E66900]"
                                                                    : "bg-white text-[#626262] border border-[#F2EEF4] hover:bg-gray-50";
                                                            }

                                                            return (
                                                                <button
                                                                    key={action.label}
                                                                    className={`px-[16px] py-[6px] rounded-[12px] text-[13px] font-bold transition-all cursor-pointer ${buttonStyle}`}
                                                                >
                                                                    {action.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default AdminNotification;
