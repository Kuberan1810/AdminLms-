import { ClipboardText, Clock, User, NotificationBing } from "iconsax-react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useInstructorNotifications } from "../../../context/InstructorNotification/InstructorNotificationContext";
import type { JSX } from "react";

interface NotificationPopupProps {
  onClose: () => void;
}

type Category = "assignment" | "reminder" | "student";

/* CATEGORY STYLE MAP */

const categoryStyles: Record<
  Category,
  { icon: JSX.Element; bg: string }
> = {
  assignment: {
    icon: <ClipboardText size={22} variant="Outline" className="text-[#F67300] dark:text-orange-400" color="currentColor" />,
    bg: "bg-[#FFF5ED] dark:bg-[#3D2B20]",
  },
  reminder: {
    icon: <Clock size={22} variant="Outline" className="text-[#F97316] dark:text-orange-400" color="currentColor" />,
    bg: "bg-orange-50 dark:bg-[#3D2B20]",
  },
  student: {
    icon: <User size={22} variant="Outline" className="text-[#F67300] dark:text-orange-400" color="currentColor" />,
    bg: "bg-[#FFF5ED] dark:bg-[#3D2B20]",
  },
};

const NotificationPopup = ({ onClose }: NotificationPopupProps) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useInstructorNotifications();

  const isToday = (date: Date) =>
    date.toDateString() === new Date().toDateString();

  const todayNotifications = notifications.filter(n => isToday(n.date));
  const yesterdayNotifications = notifications.filter(n => !isToday(n.date));

  const formatTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
    return "Yesterday";
  };

  const NotificationItem = ({ item }: any) => {
    const style =
      categoryStyles[item.category as Category] ??
      categoryStyles.assignment;

    return (
      <div
        onClick={() => markAsRead(item.id)}
        className={`bg-white dark:bg-[#2A2A2A] rounded-2xl p-4 flex gap-4 border border-[#F2EEF4] dark:border-[#363636] 
        hover:bg-gray-50 dark:hover:bg-[#333333] transition cursor-pointer
        ${!item.unread ? "opacity-60" : ""}`}
      >
        <div
          className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center`}
        >
          {style.icon}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="text-base lg:text-lg font-semibold text-[#333333] dark:text-white leading-snug">
              {item.title}
            </h4>

            <div className="flex items-center gap-1">
              <span className="text-[12px] text-[#808080] dark:text-[#A3A3A3] whitespace-nowrap">
                {formatTime(item.date)}
              </span>

              {item.unread && (
                <div className="w-2 h-2 rounded-full bg-[#F67300]" />
              )}
            </div>
          </div>

          <p className="text-[13px] md:text-[14px] text-[#626262] dark:text-[#A3A3A3] mt-1">
            {item.subtitle}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/30 z-1000 dark:bg-black/50"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="fixed top-0 right-0 h-full w-full  md:w-[420px] bg-[#fafafa] dark:bg-[#1E1E1E] z-1000 flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-colors"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#F2EEF4] dark:border-[#363636] flex justify-between items-center transition-colors">
          <div className="flex items-center gap-2">
            <h3 className="text-[20px] md:text-2xl font-semibold text-[#333] dark:text-white">
              Notifications
            </h3>

            {unreadCount > 0 && (
              <span className="bg-[#F67300] text-white text-[12px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[13px] md:text-sm text-[#F67300] dark:text-orange-400 font-semibold cursor-pointer hover:underline transition"
              >
                Mark all as read
              </button>
            )}
            <button onClick={onClose} className="cursor-pointer">
              <X size={18} className="text-[#626262] dark:text-[#A3A3A3]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full w-full text-center mt-20">
              <div className="w-[64px] h-[64px] bg-[#FFF0EF] dark:bg-[#3D2B2A] rounded-full flex items-center justify-center mb-6">
                <NotificationBing size={32} color="#EF7A02" />
              </div>
              <h3 className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium mb-1">No Notifications Found</h3>
              <p className="text-[#989898] dark:text-[#A3A3A3] text-sm max-w-[200px]">You don't have any notifications right now.</p>
            </div>
          ) : (
            <>
              {todayNotifications.length > 0 && (
                <div>
                  <h4 className="text-[#F67300] text-[14px] md:text-base font-semibold mb-4">
                    Today
                  </h4>
                  <div className="space-y-4">
                    {todayNotifications.map(item => (
                      <NotificationItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {yesterdayNotifications.length > 0 && (
                <div>
                  <h4 className="text-[#F67300] text-[14px] md:text-base font-semibold mb-4">
                    Yesterday
                  </h4>
                  <div className="space-y-4">
                    {yesterdayNotifications.map(item => (
                      <NotificationItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default NotificationPopup;
